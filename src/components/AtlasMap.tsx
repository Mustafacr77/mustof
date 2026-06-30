import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { LocationData, HISTORICAL_ROUTES, LOCATIONS } from '../data/locations';
import { HISTORICAL_PERSONAS } from '../data/personas';
import { ERAS_DATA, getEraDataById, BorderData, ImportantCity, ImportantEvent, HistoricalMarker, ImageOverlayData } from '../data/eras';
import { RefreshCw, ZoomIn, ZoomOut, Compass, Activity, Layers, MapPin, Ruler } from 'lucide-react';

interface AtlasMapProps {
  mapStyle: 'classic' | 'historical' | 'terrain' | 'dark' | 'satellite';
  activeLayers: string[];
  selectedEraId: string;
  searchQuery: string;
  selectedLocationId: string | null;
  onSelectLocation: (location: LocationData) => void;
  onResetViewTrigger: number;
  focusedLocation: LocationData | null;
  highlightEraRoutes?: boolean;
  selectedPersonaId?: string | null;
  onSelectPersona?: (id: string | null) => void;
  focusedCustomPoint?: { coordinates: [number, number]; name: string; description: string } | null;
}

// Safety helpers to guard Leaflet against NaN and malformed coordinates
const isValidCoords = (coords: any): coords is [number, number] => {
  return Array.isArray(coords) && 
         coords.length === 2 && 
         typeof coords[0] === 'number' && 
         typeof coords[1] === 'number' && 
         !isNaN(coords[0]) && 
         !isNaN(coords[1]);
};

const getValidPathCoords = (coordsArray: any): [number, number][] => {
  if (!Array.isArray(coordsArray)) return [];
  return coordsArray.filter(isValidCoords) as [number, number][];
};

export default function AtlasMap({
  mapStyle,
  activeLayers,
  selectedEraId,
  searchQuery,
  selectedLocationId,
  onSelectLocation,
  onResetViewTrigger,
  focusedLocation,
  highlightEraRoutes = false,
  selectedPersonaId = null,
  focusedCustomPoint = null
}: AtlasMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  
  // Storage for rendered layers to allow direct, flicker-free cleanup
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const routesRef = useRef<L.Polyline[]>([]);
  const bordersRef = useRef<(L.Polygon | L.Marker)[]>([]);
  const overlaysRef = useRef<L.ImageOverlay[]>([]);
  const personaLayersRef = useRef<L.Layer[]>([]);

  // Diagnostics & performance tracker
  const [diagnosticInfo, setDiagnosticInfo] = useState({
    activeMarkers: 0,
    activeRoutes: 0,
    geoJsonFeatures: 0,
    renderTimeMs: 0
  });
  const [showDiagnostics, setShowDiagnostics] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Distance Measurement Tool State
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<L.LatLng[]>([]);
  const [measuredDistanceKm, setMeasuredDistanceKm] = useState<number | null>(null);
  const measureMarkersRef = useRef<L.Marker[]>([]);
  const measurePolylineRef = useRef<L.Polyline | null>(null);

  const clearMeasurement = () => {
    measureMarkersRef.current.forEach(m => m.remove());
    measureMarkersRef.current = [];
    if (measurePolylineRef.current) {
      measurePolylineRef.current.remove();
      measurePolylineRef.current = null;
    }
    setMeasurePoints([]);
    setMeasuredDistanceKm(null);
  };

  // Ref to avoid stale closure in Leaflet event listeners
  const onSelectLocationRef = useRef(onSelectLocation);
  useEffect(() => {
    onSelectLocationRef.current = onSelectLocation;
  }, [onSelectLocation]);

  // 1. Initialize Map exactly once
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      let initialCenter: L.LatLngExpression = [26.0, 39.0]; // Centered around Hijrah route
      let initialZoom = 5;

      try {
        const savedCenter = sessionStorage.getItem('atlas_map_center');
        if (savedCenter) {
          const parsed = JSON.parse(savedCenter);
          if (isValidCoords(parsed)) {
            initialCenter = parsed as L.LatLngExpression;
          }
        }
        const savedZoom = sessionStorage.getItem('atlas_map_zoom');
        if (savedZoom) {
          const parsed = parseInt(savedZoom, 10);
          if (!isNaN(parsed)) {
            initialZoom = parsed;
          }
        }
      } catch (e) {
        console.error('Failed to parse saved map state', e);
      }

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        zoomControl: false,
        minZoom: 2,
        maxZoom: 18
      });

      // Save state on navigation
      map.on('moveend', () => {
        const center = map.getCenter();
        if (center && typeof center.lat === 'number' && typeof center.lng === 'number' && !isNaN(center.lat) && !isNaN(center.lng)) {
          sessionStorage.setItem('atlas_map_center', JSON.stringify([center.lat, center.lng]));
        }
      });

      map.on('zoomend', () => {
        const zoom = map.getZoom();
        sessionStorage.setItem('atlas_map_zoom', zoom.toString());
      });

      // Standard OSM base tile layer
      const defaultUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      const tiles = L.tileLayer(defaultUrl, {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
        zIndex: 1
      }).addTo(map);

      tileLayerRef.current = tiles;
      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        tileLayerRef.current = null;
      }
    };
  }, []);

  // 2. Map Style Switcher (reuses the single base TileLayer instance seamlessly)
  useEffect(() => {
    if (tileLayerRef.current) {
      let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      let attribution = '&copy; OpenStreetMap contributors';

      if (mapStyle === 'historical') {
        url = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
        attribution = '&copy; OpenStreetMap &copy; CARTO';
      } else if (mapStyle === 'dark') {
        url = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
        attribution = '&copy; OpenStreetMap &copy; CARTO';
      } else if (mapStyle === 'terrain') {
        url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
        attribution = 'Tiles &copy; Esri &mdash; DeLorme, FAO, USGS';
      } else if (mapStyle === 'satellite') {
        url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        attribution = 'Tiles &copy; Esri &mdash; Source: Esri, USDA, USGS';
      }

      tileLayerRef.current.setUrl(url);
      tileLayerRef.current.options.attribution = attribution;

      const map = mapRef.current;
      if (map && (map as any).attributionControl) {
        try {
          ((map as any).attributionControl)._update();
        } catch (e) {
          // bypass
        }
      }

      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 100);
    }
  }, [mapStyle]);

  // Handle flyTo focused location
  useEffect(() => {
    if (focusedLocation && mapRef.current) {
      const coords = focusedLocation.coordinates;
      if (isValidCoords(coords)) {
        mapRef.current.flyTo(coords, 6, {
          animate: true,
          duration: 2.0
        });
      }
    }
  }, [focusedLocation]);

  // Handle flyTo focused custom point (personas)
  useEffect(() => {
    if (focusedCustomPoint && mapRef.current) {
      const { coordinates, name, description } = focusedCustomPoint;
      if (isValidCoords(coordinates)) {
        mapRef.current.flyTo(coordinates, 6, {
          duration: 1.5
        });

        const popupContent = `
          <div class="p-2 bg-zinc-950 text-white rounded-xl border border-zinc-800 shadow-2xl max-w-[240px] font-sans">
            <div class="flex items-center gap-1.5 border-b border-zinc-800 pb-1 mb-1.5">
              <span class="flex items-center justify-center w-5 h-5 rounded-full text-[10px] bg-amber-500 font-bold text-zinc-950">
                📌
              </span>
              <h4 class="text-[11px] font-bold text-amber-400 font-serif">${name}</h4>
            </div>
            <p class="text-[10px] text-zinc-300 leading-relaxed">${description}</p>
          </div>
        `;

        setTimeout(() => {
          if (mapRef.current && isValidCoords(coordinates)) {
            L.popup({
              className: 'custom-leaflet-popup',
              maxWidth: 240,
              closeButton: true,
              offset: [0, -10]
            })
            .setLatLng(coordinates)
            .setContent(popupContent)
            .openOn(mapRef.current);
          }
        }, 300);
      }
    }
  }, [focusedCustomPoint]);

  // 3. Distance Measurement Tool Click Listeners
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!isMeasuring) {
      clearMeasurement();
      map.getContainer().classList.remove('cursor-crosshair-map');
      return;
    }

    map.getContainer().classList.add('cursor-crosshair-map');

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      setMeasurePoints(prev => {
        if (prev.length >= 2) {
          return [e.latlng];
        } else {
          return [...prev, e.latlng];
        }
      });
    };

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
    };
  }, [isMeasuring]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    measureMarkersRef.current.forEach(m => m.remove());
    measureMarkersRef.current = [];

    if (measurePolylineRef.current) {
      measurePolylineRef.current.remove();
      measurePolylineRef.current = null;
    }

    if (measurePoints.length === 0) {
      setMeasuredDistanceKm(null);
      return;
    }

    const newMarkers: L.Marker[] = [];
    measurePoints.forEach((pt, idx) => {
      const iconHtml = `
        <div class="flex items-center justify-center select-none pointer-events-none">
          <div class="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-lg ring-4 ring-white/35 dark:ring-zinc-950/45 border border-emerald-400">
            ${idx === 0 ? 'A' : 'B'}
          </div>
        </div>
      `;
      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-measure-marker-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker(pt, { icon: customIcon, zIndexOffset: 2000 }).addTo(map);
      newMarkers.push(marker);
    });

    measureMarkersRef.current = newMarkers;

    if (measurePoints.length === 2) {
      const dist = measurePoints[0].distanceTo(measurePoints[1]) / 1000;
      setMeasuredDistanceKm(dist);

      const polyline = L.polyline(measurePoints, {
        color: '#10b981',
        weight: 3,
        dashArray: '8, 8',
        lineCap: 'round',
        interactive: false
      }).addTo(map);

      measurePolylineRef.current = polyline;
    } else {
      setMeasuredDistanceKm(null);
    }
  }, [measurePoints]);

  // 4. MAIN LAYER RE-DRAW ENGINGE: SWITCHING ERAS, RE-RENDERING CHRONOLOGY & LAYERS
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const renderStart = performance.now();
    let markerCount = 0;
    let routeCount = 0;
    let borderCount = 0;

    // A. CLEAR ALL PREVIOUS ERA LAYERS (To keep map initialized exactly once)
    bordersRef.current.forEach(layer => map.removeLayer(layer));
    bordersRef.current = [];

    routesRef.current.forEach(line => map.removeLayer(line));
    routesRef.current = [];

    overlaysRef.current.forEach(overlay => map.removeLayer(overlay));
    overlaysRef.current = [];

    personaLayersRef.current.forEach(layer => map.removeLayer(layer));
    personaLayersRef.current = [];

    Object.keys(markersRef.current).forEach(id => {
      map.removeLayer(markersRef.current[id]);
    });
    markersRef.current = {};

    // B. FETCH CURRENT SELECTED ERA DETAILS
    const currentEra = selectedEraId !== 'all' ? getEraDataById(selectedEraId) : null;

    // C. LAYER FILTERS HELPERS
    const matchesSearch = (name: string, region: string, modernCountry: string, significance: string) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        name.toLowerCase().includes(q) ||
        region.toLowerCase().includes(q) ||
        modernCountry.toLowerCase().includes(q) ||
        significance.toLowerCase().includes(q)
      );
    };

    const matchesLayers = (layers: string[]) => {
      return layers.some(l => activeLayers.includes(l));
    };

    // D. FLOW: CAMERA ANIMATION IF ERA CHANGED
    if (currentEra && !focusedLocation && !focusedCustomPoint) {
      const center = currentEra.mapCenter;
      if (isValidCoords(center)) {
        map.flyTo(center, currentEra.zoomLevel, {
          animate: true,
          duration: 1.5,
          easeLinearity: 0.25
        });
      }
    } else if (selectedEraId === 'all' && !focusedLocation && !focusedCustomPoint) {
      const center: [number, number] = [26.0, 39.0];
      if (isValidCoords(center)) {
        map.flyTo(center, 4, {
          animate: true,
          duration: 1.5
        });
      }
    }

    // E. RENDER SEPARATED DATA PER HISTORICAL ERA
    if (currentEra) {
      // 1. Draw Era-Specific Borders/Boundaries (Polygons)
      if (activeLayers.includes('Caliphates & Empires')) {
        currentEra.borders.forEach(border => {
          try {
            const validBorders = getValidPathCoords(border.coordinates);
            if (validBorders.length > 2) {
              const polygon = L.polygon(validBorders, {
                color: border.color,
                weight: 2.5,
                dashArray: '6, 6',
                fillColor: border.color,
                fillOpacity: 0.12,
                className: 'geojson-empire-polygon animate-boundary-drawing'
              }).addTo(map);

              polygon.bindTooltip(`
                <div class="px-2.5 py-1 bg-zinc-950/95 text-stone-100 text-[10px] rounded-lg border border-zinc-800/80 backdrop-blur-md shadow-md">
                  <span class="font-bold block text-amber-400 font-serif tracking-wide">${border.name}</span>
                </div>
              `, { sticky: true, className: 'custom-leaflet-tooltip' });

              bordersRef.current.push(polygon);
              borderCount++;
            }

            // Centroid Label for boundary
            if (isValidCoords(border.labelCoord)) {
              const labelIcon = L.divIcon({
                html: `<div class="historical-map-label text-[10px] font-serif uppercase tracking-[0.22em] font-bold text-stone-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none pointer-events-none text-center whitespace-nowrap">${border.label}</div>`,
                className: 'custom-historical-label-container',
                iconSize: [200, 20],
                iconAnchor: [100, 10]
              });
              const labelMarker = L.marker(border.labelCoord, { icon: labelIcon, interactive: false }).addTo(map);
              bordersRef.current.push(labelMarker);
            }
          } catch (e) {
            console.error('Error drawing border:', e);
          }
        });
      }

      // 2. Draw Optional Historical Image Overlays
      if (currentEra.imageOverlays) {
        currentEra.imageOverlays.forEach(overlay => {
          try {
            if (overlay.bounds && isValidCoords(overlay.bounds[0]) && isValidCoords(overlay.bounds[1])) {
              const imgOverlay = L.imageOverlay(overlay.url, overlay.bounds, {
                opacity: overlay.opacity || 0.2,
                attribution: overlay.attribution || ''
              }).addTo(map);
              overlaysRef.current.push(imgOverlay);
            }
          } catch (e) {
            console.error('Error drawing image overlay:', e);
          }
        });
      }

      // 3. Draw Era-Specific Important Cities
      currentEra.importantCities.forEach(city => {
        if (!isValidCoords(city.coordinates)) return;

        // Find corresponding location record in global LOCATIONS to inherit full significance details if selected
        const fullLocation = LOCATIONS.find(l => l.id === city.id) || null;
        const dispName = city.name;
        const modernCountry = city.modernCountry;
        const significance = fullLocation?.significance || city.significance;
        const layers = fullLocation?.layers || city.layers;

        if (!matchesSearch(dispName, fullLocation?.region || '', modernCountry, significance) || !matchesLayers(layers)) {
          return;
        }

        const isSelected = selectedLocationId === city.id;
        let targetState: 'selected' | 'default' = isSelected ? 'selected' : 'default';

        let innerHtml = '';
        if (targetState === 'selected') {
          innerHtml = `
            <span class="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-amber-500/40"></span>
            <span class="relative flex items-center justify-center rounded-full h-7 w-7 bg-amber-500 border-2 border-zinc-950 shadow-xl text-xs font-bold text-zinc-950 select-none">🕌</span>
          `;
        } else {
          innerHtml = `
            <span class="animate-pulse absolute inline-flex h-6 w-6 rounded-full bg-emerald-500/20"></span>
            <span class="relative flex items-center justify-center rounded-full h-4.5 w-4.5 bg-emerald-600 border border-emerald-300 dark:border-emerald-500 shadow-md">
              <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
          `;
        }

        const customIcon = L.divIcon({
          html: `<div id="marker-wrapper-${city.id}" class="marker-transition-wrapper marker-state-${targetState}" data-state="${targetState}">${innerHtml}</div>`,
          className: 'custom-map-marker-icon-container',
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });

        try {
          const marker = L.marker(city.coordinates, { icon: customIcon }).addTo(map)
            .on('click', () => {
              if (fullLocation) {
                onSelectLocationRef.current(fullLocation);
              } else {
                onSelectLocationRef.current({
                  id: city.id,
                  name: city.name,
                  region: 'Historical Node',
                  modernCountry: city.modernCountry,
                  coordinates: city.coordinates,
                  layers: city.layers,
                  eras: [selectedEraId],
                  significance: city.significance,
                  keyEvents: [],
                  relatedPeople: [],
                  quranReferences: [],
                  hadithReferences: [],
                  lessons: [],
                  citations: []
                });
              }
            });

          marker.bindTooltip(`
            <div class="px-3 py-1.5 bg-zinc-950/95 text-stone-100 rounded-xl border border-zinc-800 shadow-2xl text-center font-sans">
              <p class="text-xs font-bold font-serif">${dispName}</p>
              <p class="text-[9px] tracking-wider text-amber-400 font-mono uppercase font-semibold mt-0.5">${modernCountry}</p>
            </div>
          `, { direction: 'top', offset: [0, -10], className: 'custom-leaflet-tooltip' });

          markersRef.current[city.id] = marker;
          markerCount++;
        } catch (e) {
          console.error('Error drawing city marker:', e);
        }
      });

      // 4. Draw Era-Specific Important Events
      currentEra.importantEvents.forEach(event => {
        if (!event.coordinates || !isValidCoords(event.coordinates)) return;

        if (!matchesSearch(event.title, '', '', event.description)) return;

        const eventIcon = L.divIcon({
          html: `
            <div class="relative flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-amber-500/20"></span>
              <span class="relative flex items-center justify-center rounded-full h-6 w-6 bg-amber-500 border border-amber-300 shadow-lg text-[10px] select-none">📜</span>
            </div>
          `,
          className: 'custom-event-marker-container',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        try {
          const marker = L.marker(event.coordinates, { icon: eventIcon }).addTo(map);
          marker.bindPopup(`
            <div class="p-3 bg-zinc-950 text-white rounded-2xl border border-zinc-800 shadow-2xl max-w-[240px] font-sans">
              <div class="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2">
                <span class="text-[9px] font-mono font-semibold text-amber-400 uppercase tracking-wide bg-amber-400/10 px-1.5 py-0.5 rounded-md">${event.year}</span>
                <span class="text-[9px] font-mono text-zinc-500">Event Node</span>
              </div>
              <h4 class="text-xs font-bold text-zinc-100 font-serif leading-snug mb-1.5">${event.title}</h4>
              <p class="text-[10px] text-zinc-400 leading-relaxed">${event.description}</p>
            </div>
          `, { className: 'custom-leaflet-popup', closeButton: true });

          marker.bindTooltip(`
            <div class="px-2 py-1 bg-zinc-900/95 border border-zinc-800 text-stone-100 rounded-lg text-[10px] font-serif">
              <span class="text-amber-400 font-bold">[${event.year}]</span> ${event.title}
            </div>
          `, { direction: 'top', offset: [0, -5], className: 'custom-leaflet-tooltip' });

          markersRef.current[event.id] = marker;
          markerCount++;
        } catch (e) {
          console.error('Error drawing event marker:', e);
        }
      });

      // 5. Draw Era-Specific Historical Markers
      currentEra.historicalMarkers.forEach(hm => {
        if (!isValidCoords(hm.coordinates)) return;
        if (!matchesSearch(hm.name, '', '', hm.description)) return;

        let emoji = '📍';
        let bgClass = 'bg-stone-100 dark:bg-stone-800 border-amber-500 text-stone-900 dark:text-stone-100';
        if (hm.type === 'battle') {
          emoji = '🛡️';
          bgClass = 'bg-red-500 border-red-300 text-white';
        } else if (hm.type === 'treaty') {
          emoji = '✒️';
          bgClass = 'bg-purple-600 border-purple-400 text-white';
        } else if (hm.type === 'sacred') {
          emoji = '🕌';
          bgClass = 'bg-emerald-600 border-emerald-400 text-white';
        }

        const hmIcon = L.divIcon({
          html: `
            <div class="relative flex items-center justify-center cursor-pointer hover:scale-115 transition-transform">
              <span class="relative flex items-center justify-center rounded-full h-6 w-6 border shadow-md text-[10px] ${bgClass}">
                ${emoji}
              </span>
            </div>
          `,
          className: 'custom-historical-marker-container',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        try {
          const marker = L.marker(hm.coordinates, { icon: hmIcon }).addTo(map);
          marker.bindPopup(`
            <div class="p-3 bg-zinc-950 text-stone-100 rounded-2xl border border-zinc-800/80 shadow-2xl max-w-[240px] font-sans">
              <div class="flex items-center gap-1.5 border-b border-zinc-800 pb-1.5 mb-2">
                <span class="text-xs shrink-0">${emoji}</span>
                <span class="text-[9px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">${hm.type} node</span>
              </div>
              <h4 class="text-xs font-bold text-amber-400 font-serif leading-snug mb-1">${hm.name}</h4>
              <p class="text-[10px] text-zinc-400 leading-relaxed">${hm.description}</p>
            </div>
          `, { className: 'custom-leaflet-popup', closeButton: true });

          marker.bindTooltip(`
            <div class="px-2 py-1 bg-zinc-900/95 border border-zinc-800 text-stone-200 rounded-lg text-[10px] font-sans">
              ${hm.name}
            </div>
          `, { direction: 'top', offset: [0, -5], className: 'custom-leaflet-tooltip' });

          markersRef.current[hm.id] = marker;
          markerCount++;
        } catch (e) {
          console.error('Error drawing historical marker:', e);
        }
      });

      // 6. Draw Era-Specific Trade Routes
      HISTORICAL_ROUTES.forEach(route => {
        const isTrade = route.type === 'trade' && activeLayers.includes('Trade Routes');
        const isEmpire = route.type === 'empire' && activeLayers.includes('Caliphates & Empires');

        if (isTrade || isEmpire) {
          const isEraRelevant = route.eras.includes(selectedEraId) || route.eras.some(e => e.toLowerCase() === selectedEraId.toLowerCase());
          if (!isEraRelevant && !highlightEraRoutes) return;

          let opacity = isEraRelevant ? 0.75 : 0.15;
          let weight = isEraRelevant ? 3.5 : 1.5;

          try {
            const validCoords = getValidPathCoords(route.coordinates);
            if (validCoords.length > 1) {
              const line = L.polyline(validCoords, {
                color: route.color,
                weight,
                opacity,
                lineCap: 'round',
                lineJoin: 'round',
                className: isEraRelevant ? 'animated-trade-route-line' : ''
              }).addTo(map);

              line.bindTooltip(`
                <div class="px-3 py-1.5 bg-zinc-950 text-white text-[10px] font-mono rounded-xl border border-zinc-800 shadow-xl">
                  <span class="font-bold text-emerald-400 block">${route.name}</span>
                  <span class="text-zinc-400 text-[9px]">Type: ${route.type === 'trade' ? 'Trade Caravan Route' : 'Empire Axis'}</span>
                </div>
              `, { sticky: true, className: 'custom-leaflet-tooltip' });

              routesRef.current.push(line);
              routeCount++;
            }
          } catch (e) {
            console.error('Error drawing route:', e);
          }
        }
      });

    } else {
      // F. UNIVERSAL BACKWARD COMPATIBILITY MODE ('all' selected)
      LOCATIONS.forEach(location => {
        if (!isValidCoords(location.coordinates)) return;

        if (!matchesSearch(location.name, location.region, location.modernCountry, location.significance) || !matchesLayers(location.layers)) {
          return;
        }

        const isSelected = selectedLocationId === location.id;
        let targetState: 'selected' | 'default' = isSelected ? 'selected' : 'default';

        let innerHtml = '';
        if (targetState === 'selected') {
          innerHtml = `
            <span class="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-amber-500/40"></span>
            <span class="relative flex items-center justify-center rounded-full h-7 w-7 bg-amber-500 border-2 border-zinc-950 shadow-xl text-xs font-bold text-zinc-950 select-none">🕌</span>
          `;
        } else {
          innerHtml = `
            <span class="animate-pulse absolute inline-flex h-6 w-6 rounded-full bg-blue-500/20"></span>
            <span class="relative flex items-center justify-center rounded-full h-4.5 w-4.5 bg-zinc-800 border border-zinc-600 shadow-md">
              <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
          `;
        }

        const customIcon = L.divIcon({
          html: `<div id="marker-wrapper-${location.id}" class="marker-transition-wrapper marker-state-${targetState}" data-state="${targetState}">${innerHtml}</div>`,
          className: 'custom-map-marker-icon-container',
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });

        try {
          const marker = L.marker(location.coordinates, { icon: customIcon }).addTo(map)
            .on('click', () => {
              onSelectLocationRef.current(location);
            });

          marker.bindTooltip(`
            <div class="px-3 py-1.5 bg-zinc-950/95 text-stone-100 rounded-xl border border-zinc-800 shadow-2xl text-center font-sans">
              <p class="text-xs font-bold font-serif">${location.name}</p>
              <p class="text-[9px] tracking-wider text-emerald-400 font-mono uppercase font-semibold mt-0.5">${location.modernCountry}</p>
            </div>
          `, { direction: 'top', offset: [0, -10], className: 'custom-leaflet-tooltip' });

          markersRef.current[location.id] = marker;
          markerCount++;
        } catch (e) {
          console.error('Error drawing global marker:', e);
        }
      });

      // Draw all global routes
      HISTORICAL_ROUTES.forEach(route => {
        const isTrade = route.type === 'trade' && activeLayers.includes('Trade Routes');
        const isEmpire = route.type === 'empire' && activeLayers.includes('Caliphates & Empires');

        if (isTrade || isEmpire) {
          try {
            const validCoords = getValidPathCoords(route.coordinates);
            if (validCoords.length > 1) {
              const line = L.polyline(validCoords, {
                color: route.color,
                weight: 3.0,
                opacity: 0.65,
                lineCap: 'round',
                lineJoin: 'round',
                className: 'animated-trade-route-line'
              }).addTo(map);

              line.bindTooltip(`
                <div class="px-3 py-1.5 bg-zinc-950 text-white text-[10px] font-mono rounded-xl border border-zinc-800 shadow-xl">
                  <span class="font-bold text-emerald-400 block">${route.name}</span>
                  <span class="text-zinc-400 text-[9px]">Global Track</span>
                </div>
              `, { sticky: true, className: 'custom-leaflet-tooltip' });

              routesRef.current.push(line);
              routeCount++;
            }
          } catch (e) {
            console.error('Error drawing global route:', e);
          }
        }
      });
    }

    // G. RENDER HISTORICAL PERSONA JOURNEYS IF SELECTED
    if (selectedPersonaId) {
      const persona = HISTORICAL_PERSONAS.find(p => p.id === selectedPersonaId);
      if (persona) {
        const coords = getValidPathCoords(persona.points.map(pt => pt.coordinates));
        if (coords.length > 1) {
          try {
            const pathLine = L.polyline(coords, {
              color: persona.color,
              weight: 4,
              opacity: 0.9,
              dashArray: '8, 8',
              lineCap: 'round',
              className: 'animated-persona-path-line'
            }).addTo(map);

            pathLine.bindTooltip(`
              <div class="px-2.5 py-1 bg-zinc-950/95 text-stone-100 text-[10px] rounded-lg border border-zinc-800 shadow-md">
                <span class="font-bold block text-amber-400 font-serif tracking-wide">${persona.name}'s Journey</span>
              </div>
            `, { sticky: true, className: 'custom-leaflet-tooltip' });

            personaLayersRef.current.push(pathLine);
            routeCount++;
          } catch (e) {
            console.error('Error drawing persona path:', e);
          }
        }

        persona.points.forEach((point, idx) => {
          if (!isValidCoords(point.coordinates)) return;
          try {
            const pIcon = L.divIcon({
              html: `
                <div class="relative flex items-center justify-center cursor-pointer">
                  <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-30" style="background-color: ${persona.color};"></span>
                  <span class="relative flex items-center justify-center rounded-full h-7 w-7 text-white font-mono text-xs font-bold border-2 border-zinc-900 shadow-lg" style="background-color: ${persona.color};">
                    ${idx + 1}
                  </span>
                </div>
              `,
              className: 'custom-persona-marker-icon-container',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            });

            const pMarker = L.marker(point.coordinates, { icon: pIcon }).addTo(map);

            pMarker.bindPopup(`
              <div class="p-3 bg-zinc-950 text-white rounded-xl border border-zinc-800 shadow-2xl max-w-[240px] font-sans">
                <div class="flex items-center gap-1.5 border-b border-zinc-800 pb-1 mb-1.5">
                  <span class="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold text-white" style="background-color: ${persona.color};">${idx + 1}</span>
                  <h4 class="text-[11px] font-bold text-amber-400 font-serif">${point.name}</h4>
                </div>
                <p class="text-[10px] text-zinc-300 leading-relaxed">${point.description}</p>
              </div>
            `, { className: 'custom-leaflet-popup', closeButton: true });

            personaLayersRef.current.push(pMarker);
            markerCount++;
          } catch (e) {
            console.error('Error drawing persona stop marker:', e);
          }
        });
      }
    }

    const duration = performance.now() - renderStart;
    setDiagnosticInfo({
      activeMarkers: markerCount,
      activeRoutes: routeCount,
      geoJsonFeatures: borderCount,
      renderTimeMs: duration
    });

    // Staggered layout invalidate to fit cleanly on screen resizes
    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(resizeTimer);
    };
  }, [selectedEraId, activeLayers, searchQuery, selectedLocationId, highlightEraRoutes, selectedPersonaId, focusedCustomPoint]);

  // Handle map zoom helpers
  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();

  // Reset to current era center & zoom level
  const handleResetView = () => {
    const map = mapRef.current;
    if (!map) return;

    const currentEra = selectedEraId !== 'all' ? getEraDataById(selectedEraId) : null;
    const center = currentEra?.mapCenter || [26.0, 39.0];
    const zoom = currentEra?.zoomLevel || 5;

    if (isValidCoords(center)) {
      map.flyTo(center, zoom, {
        animate: true,
        duration: 1.2
      });
    }
  };

  // Hard refresh and clear distance measurements
  const handleMapRefresh = () => {
    setIsRefreshing(true);
    clearMeasurement();
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize({ animate: true });
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.TileLayer) {
            layer.redraw();
          }
        });
      }
      setIsRefreshing(false);
    }, 400);
  };

  // Handle reset camera view trigger from top nav
  useEffect(() => {
    if (onResetViewTrigger > 0) {
      handleResetView();
    }
  }, [onResetViewTrigger]);

  return (
    <div className="relative w-full h-full">
      {/* Map Element */}
      <div 
        ref={mapContainerRef} 
        className={`w-full h-full z-0 outline-none map-style-${mapStyle} map-era-${selectedEraId}`}
        style={{ 
          background: 
            mapStyle === 'dark' ? '#0b0f19' : 
            mapStyle === 'historical' ? '#faf5eb' :
            mapStyle === 'terrain' ? '#edf2f7' :
            mapStyle === 'satellite' ? '#020617' : '#f4f4f5' 
        }}
      />

      {/* Control Overlay Buttons */}
      <div className="absolute bottom-40 sm:bottom-48 right-4 z-[990] flex flex-col gap-2">
        <button
          onClick={() => setIsMeasuring(prev => !prev)}
          className={`flex items-center justify-center w-10 h-10 rounded-xl border shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer ${
            isMeasuring 
              ? 'bg-emerald-500 hover:bg-emerald-600 border-emerald-400 text-white animate-pulse' 
              : 'border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
          }`}
          title="Distance Measurement"
        >
          <Ruler className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomIn}
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 text-zinc-700 dark:text-zinc-300 shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 text-zinc-700 dark:text-zinc-300 shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={handleResetView}
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 text-zinc-700 dark:text-zinc-300 shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Reset View to Current Era Default"
        >
          <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </button>
        <button
          onClick={handleMapRefresh}
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 text-zinc-700 dark:text-zinc-300 shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Refresh Map Canvas"
        >
          <RefreshCw className={`w-5 h-5 text-emerald-600 dark:text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Measurement Panel */}
      {isMeasuring && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[990] w-[calc(100vw-2rem)] sm:w-96 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-4 shadow-xl flex flex-col gap-3 pointer-events-auto">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-2">
            <div className="flex items-center gap-2">
              <Ruler className="w-4.5 h-4.5 text-emerald-500" />
              <span className="text-xs font-bold tracking-wider text-zinc-900 dark:text-zinc-100 uppercase font-sans">
                Distance Calculator
              </span>
            </div>
            <button
              onClick={() => {
                setIsMeasuring(false);
                clearMeasurement();
              }}
              className="text-[10px] font-semibold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer uppercase tracking-wider"
            >
              Exit
            </button>
          </div>

          {measurePoints.length === 0 && (
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center py-2">
              Click on the map to place start point <strong className="text-emerald-500 font-bold">A</strong>.
            </p>
          )}

          {measurePoints.length === 1 && (
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center py-2">
              Click another location to place end point <strong className="text-emerald-500 font-bold">B</strong>.
            </p>
          )}

          {measurePoints.length === 2 && measuredDistanceKm !== null && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center py-2 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 dark:border-emerald-500/20 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Approximate Distance
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100">
                    {measuredDistanceKm.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                  </span>
                  <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">km</span>
                  <span className="text-zinc-300 dark:text-zinc-700 mx-1">|</span>
                  <span className="text-lg font-bold font-mono text-zinc-700 dark:text-zinc-300">
                    {(measuredDistanceKm * 0.621371).toLocaleString(undefined, { maximumFractionDigits: 1 })}
                  </span>
                  <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">miles</span>
                </div>
              </div>

              {/* Historical Benchmarks */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/30 flex flex-col">
                  <span className="font-medium text-zinc-500">🐫 Caravan</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {Math.ceil(measuredDistanceKm / 28)} {Math.ceil(measuredDistanceKm / 28) === 1 ? 'day' : 'days'}
                  </span>
                  <span className="text-[9px] text-zinc-400">~28 km/day</span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/30 flex flex-col">
                  <span className="font-medium text-zinc-500">🐎 Horse Relay</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {Math.ceil(measuredDistanceKm / 70)} {Math.ceil(measuredDistanceKm / 70) === 1 ? 'day' : 'days'}
                  </span>
                  <span className="text-[9px] text-zinc-400">~70 km/day</span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/30 flex flex-col">
                  <span className="font-medium text-zinc-500">🚶 Pedestrian</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {Math.ceil(measuredDistanceKm / 22)} {Math.ceil(measuredDistanceKm / 22) === 1 ? 'day' : 'days'}
                  </span>
                  <span className="text-[9px] text-zinc-400">~22 km/day</span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/30 flex flex-col">
                  <span className="font-medium text-zinc-500"> dhow</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {Math.ceil(measuredDistanceKm / 100)} {Math.ceil(measuredDistanceKm / 100) === 1 ? 'day' : 'days'}
                  </span>
                  <span className="text-[9px] text-zinc-400">~100 km/day</span>
                </div>
              </div>

              <button
                onClick={clearMeasurement}
                className="py-1.5 text-center text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Clear Points
              </button>
            </div>
          )}
        </div>
      )}

      {/* Diagnostics Panel */}
      <div className="absolute bottom-40 sm:bottom-48 left-4 z-[990] flex flex-col items-start gap-1">
        {showDiagnostics ? (
          <div className="flex flex-col w-56 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-3 shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100 dark:border-zinc-800/60 mb-2">
              <span className="text-[10px] font-bold tracking-wider text-zinc-900 dark:text-zinc-100 uppercase font-sans">
                Map Diagnostics
              </span>
              <button
                onClick={() => setShowDiagnostics(false)}
                className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Hide
              </button>
            </div>

            <div className="flex flex-col gap-1.5 font-mono text-[10px] text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center justify-between">
                <span className="font-sans text-zinc-500">Active Markers</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{diagnosticInfo.activeMarkers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-sans text-zinc-500">Active Routes</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{diagnosticInfo.activeRoutes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-sans text-zinc-500">Boundaries</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{diagnosticInfo.geoJsonFeatures}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-dashed border-zinc-100 dark:border-zinc-800/60 mt-1">
                <span className="font-sans text-zinc-500">Render Latency</span>
                <span className="font-bold text-emerald-500">{diagnosticInfo.renderTimeMs.toFixed(1)}ms</span>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDiagnostics(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 text-zinc-700 dark:text-zinc-300 shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer text-[10px] font-medium font-sans"
          >
            <Activity className="w-3 h-3 text-emerald-500" />
            <span>Show Diagnostics</span>
          </button>
        )}
      </div>
    </div>
  );
}
