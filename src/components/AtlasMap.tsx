import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { LocationData, HISTORICAL_ROUTES, LOCATIONS } from '../data/locations';
import { HISTORICAL_PERSONAS } from '../data/personas';
import { RefreshCw, ZoomIn, ZoomOut, Compass, Activity, Layers, MapPin, Ruler, ArrowRight } from 'lucide-react';
import { convertTerritoriesToGeoJSON } from '../utils/geojsonHelper';

interface AtlasMapProps {
  mapStyle: 'classic' | 'historical' | 'terrain' | 'dark' | 'satellite';
  activeLayers: string[];
  selectedEraId: string;
  searchQuery: string;
  selectedLocationId: string | null;
  onSelectLocation: (location: LocationData) => void;
  onResetViewTrigger: number; // Increment to trigger flyTo center
  focusedLocation: LocationData | null;
  highlightEraRoutes?: boolean;
  selectedPersonaId?: string | null;
  onSelectPersona?: (id: string | null) => void;
  focusedCustomPoint?: { coordinates: [number, number]; name: string; description: string } | null;
}

interface PoliticalTerritory {
  eraId: string;
  name: string;
  color: string;
  label: string;
  labelCoord: [number, number];
  coordinates: [number, number][];
}

const POLITICAL_TERRITORIES: PoliticalTerritory[] = [
  // 1. Pre-Islamic Arabia
  {
    eraId: 'pre-islamic',
    name: 'Byzantine Empire',
    color: '#a855f7', // Purple
    label: 'BYZANTINE EMPIRE',
    labelCoord: [35.0, 31.0],
    coordinates: [
      [41.0, 26.0], [41.0, 36.0], [37.0, 38.0], [33.0, 36.0], 
      [31.0, 34.0], [29.0, 34.0], [25.0, 32.0], [22.0, 31.0], 
      [30.0, 25.0], [32.0, 20.0], [35.0, 20.0], [38.0, 24.0]
    ]
  },
  {
    eraId: 'pre-islamic',
    name: 'Sasanian Empire',
    color: '#ef4444', // Red-Orange
    label: 'SASANIAN EMPIRE',
    labelCoord: [33.0, 51.0],
    coordinates: [
      [37.0, 42.0], [38.0, 48.0], [38.0, 55.0], [34.0, 60.0], 
      [27.0, 57.0], [25.0, 50.0], [30.0, 48.0], [31.0, 45.0], 
      [34.0, 43.0]
    ]
  },
  {
    eraId: 'pre-islamic',
    name: 'Kingdom of Aksum',
    color: '#f59e0b', // Gold
    label: 'KINGDOM OF AKSUM',
    labelCoord: [15.5, 40.0],
    coordinates: [
      [15.0, 38.0], [18.0, 37.0], [18.0, 41.0], [14.0, 42.0],
      [12.0, 40.0]
    ]
  },

  // 2. Prophetic Era
  {
    eraId: 'prophetic',
    name: 'Islamic State of Madinah',
    color: '#10b981', // Emerald
    label: 'STATE OF MADINAH (HEJAZ)',
    labelCoord: [23.5, 39.0],
    coordinates: [
      [26.2, 37.0], [26.2, 41.0], [20.0, 41.5], [19.0, 40.0],
      [21.0, 38.0], [24.0, 37.5]
    ]
  },
  {
    eraId: 'prophetic',
    name: 'Byzantine Empire',
    color: '#a855f7',
    label: 'BYZANTINE EMPIRE',
    labelCoord: [35.0, 31.0],
    coordinates: [
      [41.0, 26.0], [41.0, 36.0], [37.0, 38.0], [33.0, 36.0], 
      [31.0, 34.0], [29.0, 34.0], [25.0, 32.0], [22.0, 31.0], 
      [30.0, 25.0], [32.0, 20.0], [35.0, 20.0], [38.0, 24.0]
    ]
  },
  {
    eraId: 'prophetic',
    name: 'Sasanian Empire',
    color: '#ef4444',
    label: 'SASANIAN EMPIRE',
    labelCoord: [33.0, 51.0],
    coordinates: [
      [37.0, 42.0], [38.0, 48.0], [38.0, 55.0], [34.0, 60.0], 
      [27.0, 57.0], [25.0, 50.0], [30.0, 48.0], [31.0, 45.0], 
      [34.0, 43.0]
    ]
  },

  // 3. Rashidun Era
  {
    eraId: 'rashidun',
    name: 'Rashidun Caliphate',
    color: '#b45309', // Warm clay
    label: 'RASHIDUN CALIPHATE',
    labelCoord: [27.0, 43.0],
    coordinates: [
      [15.0, 44.0], [15.0, 49.0], [22.0, 59.0], [30.0, 57.0], 
      [38.0, 52.0], [38.0, 43.0], [35.0, 36.0], [31.0, 33.0], 
      [31.0, 28.0], [22.0, 31.0], [20.0, 38.0]
    ]
  },

  // 4. Umayyad Era
  {
    eraId: 'umayyad',
    name: 'Umayyad Caliphate (East)',
    color: '#e11d48', // Crimson
    label: 'UMAYYAD CALIPHATE',
    labelCoord: [30.0, 45.0],
    coordinates: [
      [15.0, 40.0], [15.0, 55.0], [25.0, 65.0], [35.0, 65.0], 
      [40.0, 50.0], [42.0, 40.0], [35.0, 35.0], [31.0, 32.0], 
      [30.0, 25.0], [22.0, 25.0], [18.0, 35.0]
    ]
  },
  {
    eraId: 'umayyad',
    name: 'Umayyad (North Africa)',
    color: '#e11d48',
    label: 'UMAYYAD CALIPHATE',
    labelCoord: [31.0, 10.0],
    coordinates: [
      [30.0, 25.0], [33.0, 10.0], [36.0, 0.0], [32.0, -5.0], 
      [26.0, -5.0], [28.0, 10.0], [25.0, 25.0]
    ]
  },
  {
    eraId: 'umayyad',
    name: 'Al-Andalus Territory',
    color: '#10b981', // Andalusian green
    label: 'AL-ANDALUS CORRIDOR',
    labelCoord: [38.5, -4.0],
    coordinates: [
      [36.0, -6.0], [39.0, -7.0], [42.0, -8.0], [42.0, -3.0], 
      [40.0, 0.0], [37.0, -2.0]
    ]
  },

  // 5. Abbasid Era
  {
    eraId: 'abbasid',
    name: 'Abbasid Caliphate Heartland',
    color: '#1d4ed8', // Royal blue
    label: 'ABBASID CALIPHATE',
    labelCoord: [33.0, 45.0],
    coordinates: [
      [15.0, 40.0], [15.0, 55.0], [25.0, 62.0], [35.0, 62.0], 
      [38.0, 48.0], [37.0, 40.0], [33.0, 38.0], [28.0, 35.0], 
      [20.0, 38.0]
    ]
  },
  {
    eraId: 'abbasid',
    name: 'Fatimid Caliphate',
    color: '#10b981', // Fatimid green
    label: 'FATIMID CALIPHATE',
    labelCoord: [28.0, 31.0],
    coordinates: [
      [30.0, 31.0], [34.0, 36.0], [32.0, 37.0], [28.0, 34.0], 
      [25.0, 32.0], [30.0, 25.0]
    ]
  },
  {
    eraId: 'abbasid',
    name: 'Emirate of Córdoba',
    color: '#0d9488', // Andalusian teal
    label: 'EMIRATE OF CÓRDOBA',
    labelCoord: [38.5, -4.0],
    coordinates: [
      [36.0, -6.0], [39.0, -7.0], [41.0, -5.0], [40.0, -1.0], 
      [37.0, -1.5]
    ]
  },

  // 6. Al-Andalus Era
  {
    eraId: 'al-andalus',
    name: 'Caliphate of Córdoba / Al-Andalus',
    color: '#0f766e', // Teal
    label: 'CALIPHATE OF CÓRDOBA',
    labelCoord: [38.5, -4.0],
    coordinates: [
      [36.0, -6.0], [39.0, -7.0], [41.0, -5.0], [40.0, -1.0], 
      [37.0, -1.5]
    ]
  },

  // 7. Ottoman Era
  {
    eraId: 'ottoman',
    name: 'Ottoman Empire',
    color: '#dc2626', // Crimson red
    label: 'OTTOMAN EMPIRE',
    labelCoord: [39.0, 33.0],
    coordinates: [
      [43.0, 20.0], [45.0, 28.0], [41.0, 35.0], [38.0, 44.0], 
      [32.0, 37.0], [24.0, 39.0], [21.0, 40.0], [22.0, 37.0], 
      [30.0, 31.0], [32.0, 25.0], [32.0, 15.0], [36.0, 15.0], 
      [38.0, 22.0]
    ]
  },
  {
    eraId: 'ottoman',
    name: 'Safavid Empire',
    color: '#d97706', // Gold/amber
    label: 'SAFAVID EMPIRE',
    labelCoord: [33.0, 53.0],
    coordinates: [
      [38.0, 46.0], [39.0, 55.0], [34.0, 61.0], [27.0, 58.0], 
      [26.0, 50.0], [32.0, 46.0]
    ]
  }
];

const isLocationInEra = (location: LocationData, eraId: string) => {
  if (eraId === 'all') return true;
  const eraNames: { [key: string]: string } = {
    'pre-islamic': 'Pre-Islamic Arabia',
    'prophetic': 'Prophetic Era',
    'rashidun': 'Rashidun',
    'umayyad': 'Umayyad',
    'abbasid': 'Abbasid',
    'al-andalus': 'Al-Andalus',
    'ottoman': 'Ottoman',
    'modern': 'Modern Era'
  };
  const targetName = eraNames[eraId] || '';
  return location.eras.some(
    e => e.toLowerCase() === eraId.toLowerCase() || 
         (targetName && e.toLowerCase() === targetName.toLowerCase())
  );
};

const getEraOverlayColor = (eraId: string, style: string): string => {
  const isDark = style === 'dark' || style === 'satellite';
  switch (eraId) {
    case 'pre-islamic':
      // Warm Amber / sand tones
      return isDark ? 'rgba(245, 158, 11, 0.15)' : 'rgba(217, 119, 6, 0.08)';
    case 'prophetic':
      // Sacred Deep Emerald
      return isDark ? 'rgba(16, 185, 129, 0.18)' : 'rgba(4, 120, 87, 0.08)';
    case 'rashidun':
      // Earthy Clay / Slate / Muted brown-gray
      return isDark ? 'rgba(168, 162, 158, 0.12)' : 'rgba(120, 113, 108, 0.08)';
    case 'umayyad':
      // Rose gold / Terracotta / Orange-red
      return isDark ? 'rgba(244, 63, 94, 0.14)' : 'rgba(225, 29, 72, 0.06)';
    case 'abbasid':
      // Golden-Age Blue/Indigo / Astrolabe Violet
      return isDark ? 'rgba(59, 130, 246, 0.14)' : 'rgba(29, 78, 216, 0.06)';
    case 'al-andalus':
      // Tile teal / Olive green
      return isDark ? 'rgba(20, 184, 166, 0.15)' : 'rgba(15, 118, 110, 0.08)';
    case 'ottoman':
      // Imperial Tulip Crimson / Deep Red
      return isDark ? 'rgba(239, 68, 68, 0.12)' : 'rgba(185, 28, 28, 0.06)';
    case 'modern':
      // Steel indigo / Slate
      return isDark ? 'rgba(99, 102, 241, 0.12)' : 'rgba(67, 56, 202, 0.05)';
    default:
      return 'transparent';
  }
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
  onSelectPersona,
  focusedCustomPoint = null
}: AtlasMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const routesRef = useRef<L.Polyline[]>([]);
  const politicalLayersRef = useRef<(L.Polygon | L.Marker)[]>([]);
  const personaLayersRef = useRef<L.Layer[]>([]);

  // Selected Persona Auto-Framing Effect
  useEffect(() => {
    if (selectedPersonaId && mapRef.current) {
      const persona = HISTORICAL_PERSONAS.find(p => p.id === selectedPersonaId);
      if (persona && persona.points.length > 0) {
        const coords = persona.points.map(pt => pt.coordinates);
        const bounds = L.latLngBounds(coords);
        mapRef.current.flyToBounds(bounds, {
          padding: [80, 80],
          maxZoom: 6,
          duration: 1.5
        });
      }
    }
  }, [selectedPersonaId]);

  // Custom Point Focus and Popup Effect
  useEffect(() => {
    if (focusedCustomPoint && mapRef.current) {
      const { coordinates, name, description } = focusedCustomPoint;
      
      // Fly to custom point coordinates
      mapRef.current.flyTo(coordinates, 6, {
        duration: 1.2
      });

      const activePersona = selectedPersonaId ? HISTORICAL_PERSONAS.find(p => p.id === selectedPersonaId) : null;
      const color = activePersona?.color || '#f59e0b';

      const popupContent = `
        <div class="p-2 bg-zinc-950 text-white rounded-xl border border-zinc-800 shadow-2xl max-w-[240px] font-sans">
          <div class="flex items-center gap-1.5 border-b border-zinc-800 pb-1 mb-1.5">
            <span class="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold text-white shrink-0" style="background-color: ${color};">
              📌
            </span>
            <h4 class="text-[11px] font-bold text-amber-400 font-serif">${name}</h4>
          </div>
          <p class="text-[10px] text-zinc-300 leading-relaxed">${description}</p>
        </div>
      `;

      setTimeout(() => {
        if (mapRef.current) {
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
  }, [focusedCustomPoint]);

  // Diagnostic state for performance and active map feature tracking
  const [diagnosticInfo, setDiagnosticInfo] = useState({
    activeMarkers: 0,
    activeRoutes: 0,
    geoJsonFeatures: 0,
    renderTimeMs: 0
  });
  const [showDiagnostics, setShowDiagnostics] = useState(true); // Default to true so it is discoverable
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
  };

  // Ref to avoid stale closure in Leaflet event listeners
  const onSelectLocationRef = useRef(onSelectLocation);
  useEffect(() => {
    onSelectLocationRef.current = onSelectLocation;
  }, [onSelectLocation]);

  // 1. Initialize Map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      let initialCenter: L.LatLngExpression = [30.0, 32.0];
      let initialZoom = 4;

      try {
        const savedCenter = sessionStorage.getItem('atlas_map_center');
        if (savedCenter) {
          const parsed = JSON.parse(savedCenter);
          if (Array.isArray(parsed) && parsed.length === 2 && typeof parsed[0] === 'number' && typeof parsed[1] === 'number') {
            initialCenter = parsed as L.LatLngExpression;
          }
        }
      } catch (e) {
        console.error('Failed to parse saved map center', e);
      }

      try {
        const savedZoom = sessionStorage.getItem('atlas_map_zoom');
        if (savedZoom) {
          const parsed = parseInt(savedZoom, 10);
          if (!isNaN(parsed)) {
            initialZoom = parsed;
          }
        }
      } catch (e) {
        console.error('Failed to parse saved map zoom', e);
      }

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        zoomControl: false,
        minZoom: 2,
        maxZoom: 18
      });

      // Save center and zoom to sessionStorage on change
      map.on('moveend', () => {
        const center = map.getCenter();
        sessionStorage.setItem('atlas_map_center', JSON.stringify([center.lat, center.lng]));
      });

      map.on('zoomend', () => {
        const zoom = map.getZoom();
        sessionStorage.setItem('atlas_map_zoom', zoom.toString());
      });

      // Create and mount the permanent base map TileLayer exactly once
      const defaultUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      const defaultAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      const tiles = L.tileLayer(defaultUrl, {
        attribution: defaultAttribution,
        maxZoom: 18,
        zIndex: 1,
        pane: 'tilePane',
        subdomains: 'abc'
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

  // 2. Handle Map Style / Tiles (seamless URL update without recreating/removing TileLayer)
  useEffect(() => {
    if (mapRef.current && tileLayerRef.current) {
      let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

      if (mapStyle === 'historical') {
        url = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
        attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
      } else if (mapStyle === 'dark') {
        url = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
        attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
      } else if (mapStyle === 'terrain') {
        url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
        attribution = 'Tiles &copy; Esri &mdash; Esri, DeLorme, FAO, NOAA, USGS, EPA';
      } else if (mapStyle === 'satellite') {
        url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP';
      }

      // Seamlessly update the tile URL without destroying or removing the base layer instance
      tileLayerRef.current.setUrl(url);

      // Invalidate size to guarantee tiles load correctly
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 100);
    }
  }, [mapStyle]);

  // Handle a delayed map invalidateSize layout recalculation shortly after mounting to ensure perfect responsive fit
  useEffect(() => {
    const timer = setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // 3. Handle Zoom controls and Reset flyover triggers
  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const handleResetView = () => {
    mapRef.current?.flyTo([30.0, 32.0], 4, {
      animate: true,
      duration: 1.5
    });
  };

  const handleMapRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);

    // 1. Clear any active measurements
    clearMeasurement();

    // 2. Redraw map tiles and invalidate size to resolve any layout or rendering glitches
    if (mapRef.current) {
      mapRef.current.invalidateSize({ animate: true });
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          layer.redraw();
        }
      });
    }

    // 3. Reset the camera view
    handleResetView();
  };

  useEffect(() => {
    if (onResetViewTrigger > 0) {
      handleResetView();
    }
  }, [onResetViewTrigger]);

  // 4. Handle flyTo focused location
  useEffect(() => {
    if (focusedLocation && mapRef.current) {
      mapRef.current.flyTo(focusedLocation.coordinates, 6, {
        animate: true,
        duration: 2.5,
        easeLinearity: 0.15
      });
    }
  }, [focusedLocation]);

  // 4.5. Handle smooth centering and zoom transitions when the timeline era changes
  useEffect(() => {
    if (!mapRef.current) return;

    // If there is a currently focused location from the drawer, let that handle the view centering
    if (focusedLocation) return;

    let targetCenter: L.LatLngExpression = [30.0, 32.0];
    let targetZoom = 4;

    switch (selectedEraId) {
      case 'pre-islamic':
        targetCenter = [23.0, 44.0]; // Centered on Arabian Peninsula
        targetZoom = 5;
        break;
      case 'prophetic':
        targetCenter = [23.8, 39.5]; // Hejaz
        targetZoom = 6;
        break;
      case 'rashidun':
        targetCenter = [28.0, 38.0]; // Middle East (Capital moved from Madinah to Kufa)
        targetZoom = 4.5;
        break;
      case 'umayyad':
        targetCenter = [33.0, 25.0]; // Expansive Mediterranean / Damascus
        targetZoom = 4;
        break;
      case 'abbasid':
        targetCenter = [33.3, 44.4]; // Iraq & Persia (Baghdad)
        targetZoom = 5;
        break;
      case 'al-andalus':
        targetCenter = [38.5, -4.0]; // Andalusian peninsula
        targetZoom = 6;
        break;
      case 'ottoman':
        targetCenter = [38.0, 30.0]; // Turkey & Hejaz
        targetZoom = 4.5;
        break;
      case 'modern':
        targetCenter = [30.0, 35.0]; // Levant & Hejaz
        targetZoom = 4.5;
        break;
      case 'all':
      default:
        targetCenter = [30.0, 32.0]; // Global perspective
        targetZoom = 4;
        break;
    }

    mapRef.current.flyTo(targetCenter, targetZoom, {
      animate: true,
      duration: 1.8,
      easeLinearity: 0.2
    });
  }, [selectedEraId, focusedLocation]);

  // 4.8. Distance Measurement Map Listeners & Drawing
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!isMeasuring) {
      clearMeasurement();
      const container = map.getContainer();
      container.classList.remove('cursor-crosshair-map');
      return;
    }

    const container = map.getContainer();
    container.classList.add('cursor-crosshair-map');

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

    // Remove previous markers
    measureMarkersRef.current.forEach(m => m.remove());
    measureMarkersRef.current = [];

    // Remove previous polyline
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
      const htmlHtml = `
        <div class="flex items-center justify-center select-none pointer-events-none">
          <div class="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-lg ring-4 ring-white/30 dark:ring-zinc-950/40 border border-emerald-400">
            ${idx === 0 ? 'A' : 'B'}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: htmlHtml,
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
        color: '#10b981', // emerald-500
        weight: 3,
        dashArray: '8, 8',
        lineCap: 'round',
        lineJoin: 'round',
        interactive: false
      }).addTo(map);

      measurePolylineRef.current = polyline;
    } else {
      setMeasuredDistanceKm(null);
    }
  }, [measurePoints]);

  // 5. Draw Markers, Routes & Political Boundaries (filtered dynamically with smooth transitions)
  useEffect(() => {
    if (!mapRef.current) return;

    const renderStart = performance.now();
    let localGeoJsonCount = 0;
    let localRouteCount = 0;
    let localMarkerCount = 0;

    // A. Clear existing route polylines
    routesRef.current.forEach(line => {
      mapRef.current?.removeLayer(line);
    });
    routesRef.current = [];

    // B. Clear existing political layers
    politicalLayersRef.current.forEach(layer => {
      mapRef.current?.removeLayer(layer);
    });
    politicalLayersRef.current = [];

    // Clear existing persona layers
    personaLayersRef.current.forEach(layer => {
      mapRef.current?.removeLayer(layer);
    });
    personaLayersRef.current = [];

    // C. Helper functions to match filters
    const matchesSearch = (loc: LocationData) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        loc.name.toLowerCase().includes(q) ||
        loc.region.toLowerCase().includes(q) ||
        loc.modernCountry.toLowerCase().includes(q) ||
        loc.significance.toLowerCase().includes(q) ||
        loc.keyEvents.some(ev => ev.toLowerCase().includes(q)) ||
        loc.relatedPeople.some(p => p.toLowerCase().includes(q))
      );
    };

    const matchesLayers = (loc: LocationData) => {
      return loc.layers.some(l => activeLayers.includes(l));
    };

    // D. Render political empire boundaries and labels (using standard GeoJSON FeatureCollection with entry animations)
    if (activeLayers.includes('Caliphates & Empires') && selectedEraId !== 'all') {
      const territories = POLITICAL_TERRITORIES.filter(t => t.eraId === selectedEraId);
      localGeoJsonCount += territories.length;
      if (territories.length > 0 && mapRef.current) {
        // Generate standard GeoJSON Feature Collection dynamically with reversed [lng, lat] coordinate layout
        const geoJSONData = convertTerritoriesToGeoJSON(territories);

        // Create elegant GeoJSON layer with custom styles and CSS classes for timeline animated transition
        const geojsonLayer = L.geoJSON(geoJSONData as any, {
          style: (feature: any) => ({
            color: feature.properties.color,
            weight: 2,
            dashArray: '6, 6',
            fillColor: feature.properties.color,
            fillOpacity: 0.12,
            className: 'geojson-empire-polygon animate-boundary-drawing'
          }),
          onEachFeature: (feature: any, layer: any) => {
            layer.bindTooltip(`
              <div class="px-2.5 py-1 bg-zinc-950/95 text-stone-100 text-[10px] rounded-lg border border-zinc-800/80 backdrop-blur-md shadow-md">
                <span class="font-bold block text-amber-400 font-serif tracking-wide">${feature.properties.name}</span>
              </div>
            `, { sticky: true, className: 'custom-leaflet-tooltip' });
          }
        }).addTo(mapRef.current);

        // Track layer to allow dynamic cleanup upon timeline sliding
        politicalLayersRef.current.push(geojsonLayer);

        // Draw elegant historical tag label at text centroid
        geoJSONData.features.forEach(feature => {
          if (!mapRef.current) return;
          const { label, labelCoord } = feature.properties;

          const labelIcon = L.divIcon({
            html: `<div class="historical-map-label text-[10px] font-serif uppercase tracking-[0.25em] font-bold text-stone-200 dark:text-stone-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none pointer-events-none text-center whitespace-nowrap animate-label-fade-in">${label}</div>`,
            className: 'custom-historical-label-container',
            iconSize: [200, 20],
            iconAnchor: [100, 10]
          });

          const labelMarker = L.marker(labelCoord, { icon: labelIcon, interactive: false }).addTo(mapRef.current);
          politicalLayersRef.current.push(labelMarker);
        });
      }
    }

    // E. Render matching polylines (Trade routes & Empire axes)
    const selectedLocation = selectedLocationId ? LOCATIONS.find(l => l.id === selectedLocationId) : null;

    HISTORICAL_ROUTES.forEach(route => {
      if (!mapRef.current) return;

      const showTrade = route.type === 'trade' && activeLayers.includes('Trade Routes');
      const showEmpire = route.type === 'empire' && activeLayers.includes('Caliphates & Empires');

      if (showTrade || showEmpire) {
        // Matches current era if selected, or matches any of route's eras
        const isEraRelevant = selectedEraId === 'all' || route.eras.includes(selectedEraId) || 
                              route.eras.some(e => e.toLowerCase() === selectedEraId.toLowerCase());
        
        let isDimmed = false;
        // If specific era selected and this route is not part of this era
        if (selectedEraId !== 'all' && !isEraRelevant) {
          if (highlightEraRoutes && route.type === 'trade') {
            isDimmed = true;
          } else {
            return;
          }
        }

        // Find if this route is related to the selected location
        const isRouteRelated = selectedLocation && (
          route.eras.some(e => selectedLocation.eras.includes(e)) ||
          route.name.toLowerCase().includes(selectedLocation.name.toLowerCase())
        );

        let weight = isEraRelevant ? 3.5 : 1.5;
        let opacity = isEraRelevant ? 0.75 : 0.15;

        if (isDimmed) {
          weight = 1.0;
          opacity = 0.15;
        }

        if (selectedLocationId) {
          if (isRouteRelated) {
            opacity = isDimmed ? 0.25 : 0.95;
            weight = isDimmed ? 1.5 : 5;
          } else {
            opacity = 0.05;
            weight = 0.8;
          }
        }

        const line = L.polyline(route.coordinates, {
          color: route.color,
          weight,
          opacity,
          lineCap: 'round',
          lineJoin: 'round',
          className: isDimmed ? '' : (route.type === 'trade' ? 'animated-trade-route-line' : 'animated-empire-line')
        }).addTo(mapRef.current);

        // Tooltip displaying details of route
        line.bindTooltip(`
          <div class="px-3 py-1.5 bg-zinc-950 dark:bg-black text-white text-[10px] font-mono font-medium rounded-xl border border-zinc-800 shadow-xl">
            <span class="font-bold text-emerald-400 block">${route.name}</span>
            <span class="text-zinc-400">Layer: ${route.type === 'trade' ? 'Trade Route' : 'Empire corridor'}</span>
            <span class="text-[9px] block text-zinc-500 mt-0.5">Eras: ${route.eras.join(', ')}</span>
          </div>
        `, {
          sticky: true,
          className: 'custom-leaflet-tooltip',
          opacity: 0.95
        });

        routesRef.current.push(line);
        localRouteCount++;
      }
    });

    // F. Persist and Transition Markers
    LOCATIONS.forEach(location => {
      if (!mapRef.current) return;

      const isEraRelevant = isLocationInEra(location, selectedEraId);
      
      // If we are on a specific era, only pins relevant to this era are visible!
      const isVisible = matchesSearch(location) && matchesLayers(location) && (selectedEraId === 'all' || isEraRelevant);
      
      const isSelected = selectedLocationId === location.id;
      const isHighlighted = selectedEraId === 'all' || isEraRelevant;
      
      let targetState: 'hidden' | 'selected' | 'highlighted' | 'dimmed' | 'default' = 'default';
      
      if (!isVisible) {
        targetState = 'hidden';
      } else if (selectedEraId !== 'all' && !isEraRelevant) {
        // Double guard to guarantee hiding of foreign pins
        targetState = 'hidden';
      } else if (selectedLocationId) {
        if (selectedLocationId === location.id) {
          targetState = 'selected';
        } else {
          const isRelated = selectedLocation && (
            location.eras.some(e => selectedLocation.eras.includes(e)) ||
            location.relatedPeople.some(p => selectedLocation.relatedPeople.includes(p)) ||
            location.region === selectedLocation.region
          );
          targetState = isRelated ? 'highlighted' : 'dimmed';
        }
      } else {
        targetState = 'default';
      }

      // If the marker should be hidden, remove it from the map and delete from cache
      if (targetState === 'hidden') {
        const marker = markersRef.current[location.id];
        if (marker) {
          mapRef.current.removeLayer(marker);
          delete markersRef.current[location.id];
        }
        return;
      }

      localMarkerCount++;

      // Helper to identify primary layer style
      const getPrimaryLayer = (layers: string[]) => {
        if (layers.includes("Sacred Places")) return "Sacred Places";
        if (layers.includes("Seerah Locations")) return "Seerah Locations";
        if (layers.includes("Centers of Knowledge")) return "Centers of Knowledge";
        if (layers.includes("Major Battles")) return "Major Battles";
        if (layers.includes("Scholars")) return "Scholars";
        if (layers.includes("Historic Mosques")) return "Historic Mosques";
        if (layers.includes("Caliphates & Empires")) return "Caliphates & Empires";
        return layers[0] || "Sacred Places";
      };

      const primaryLayer = getPrimaryLayer(location.layers);

      let innerHtml = '';
      if (targetState === 'selected') {
        innerHtml = `
          <span class="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-amber-500/40"></span>
          <span class="relative flex items-center justify-center rounded-full h-7 w-7 bg-amber-500 border-2 border-zinc-950 shadow-xl text-xs font-bold text-zinc-950 select-none">
            ⭐
          </span>
        `;
      } else if (targetState === 'highlighted' || targetState === 'default') {
        if (primaryLayer === 'Sacred Places') {
          innerHtml = `
            <span class="animate-pulse absolute inline-flex h-7 w-7 rounded-full bg-amber-500/25"></span>
            <span class="relative flex items-center justify-center rounded-full h-4.5 w-4.5 bg-amber-500 border border-amber-300 dark:border-amber-600 shadow-md">
              <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
          `;
        } else if (primaryLayer === 'Seerah Locations') {
          innerHtml = `
            <span class="animate-pulse absolute inline-flex h-7 w-7 rounded-full bg-emerald-500/20"></span>
            <span class="relative flex items-center justify-center rounded-full h-4.5 w-4.5 bg-emerald-600 border border-emerald-300 dark:border-emerald-500 shadow-md">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-100"></span>
            </span>
          `;
        } else if (primaryLayer === 'Centers of Knowledge') {
          innerHtml = `
            <span class="animate-pulse absolute inline-flex h-7 w-7 rounded-full bg-blue-500/20"></span>
            <span class="relative flex items-center justify-center rounded-full h-4.5 w-4.5 bg-blue-600 border border-blue-300 dark:border-blue-500 shadow-md">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-100"></span>
            </span>
          `;
        } else if (primaryLayer === 'Major Battles') {
          innerHtml = `
            <span class="animate-pulse absolute inline-flex h-7 w-7 rounded-full bg-red-500/20"></span>
            <span class="relative flex items-center justify-center rounded-full h-4.5 w-4.5 bg-red-600 border border-red-300 dark:border-red-500 shadow-md">
              <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
          `;
        } else if (primaryLayer === 'Scholars') {
          innerHtml = `
            <span class="animate-pulse absolute inline-flex h-7 w-7 rounded-full bg-purple-500/20"></span>
            <span class="relative flex items-center justify-center rounded-full h-4.5 w-4.5 bg-purple-600 border border-purple-300 dark:border-purple-500 shadow-md">
              <span class="w-1.5 h-1.5 rounded-full bg-purple-100"></span>
            </span>
          `;
        } else if (primaryLayer === 'Historic Mosques') {
          innerHtml = `
            <span class="animate-pulse absolute inline-flex h-7 w-7 rounded-full bg-teal-500/20"></span>
            <span class="relative flex items-center justify-center rounded-full h-4.5 w-4.5 bg-stone-100 border border-amber-500 shadow-md">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            </span>
          `;
        } else {
          innerHtml = `
            <span class="animate-pulse absolute inline-flex h-7 w-7 rounded-full bg-zinc-500/20"></span>
            <span class="relative flex items-center justify-center rounded-full h-4 w-4 bg-zinc-600 border border-zinc-400 shadow-md">
              <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
          `;
        }
      } else if (targetState === 'dimmed') {
        innerHtml = `
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-zinc-400/80 border border-zinc-200/50 dark:border-zinc-800/80 shadow-sm"></span>
        `;
      }

      let marker = markersRef.current[location.id];
      if (!marker) {
        // Create the marker with its initial target state and HTML wrapper
        const customIcon = L.divIcon({
          html: `<div id="marker-wrapper-${location.id}" class="marker-transition-wrapper marker-state-${targetState}" data-state="${targetState}">${innerHtml}</div>`,
          className: 'custom-map-marker-icon-container',
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });

        marker = L.marker(location.coordinates, { icon: customIcon })
          .addTo(mapRef.current)
          .on('click', () => {
            onSelectLocationRef.current(location);
          });

        // Bind elegant modern tooltip showing city info
        const tooltipContent = `
          <div class="px-3 py-1.5 bg-zinc-950/95 dark:bg-zinc-950 text-white rounded-xl border border-zinc-800 shadow-2xl text-center">
            <p class="text-xs font-bold font-serif text-zinc-50">${location.name}</p>
            <p class="text-[9px] tracking-wider text-amber-400 font-mono uppercase font-semibold mt-0.5">${location.modernCountry}</p>
            ${!isHighlighted ? '<p class="text-[8px] text-zinc-500 font-mono italic mt-1">Inactive in selected era</p>' : ''}
          </div>
        `;
        marker.bindTooltip(tooltipContent, {
          direction: 'top',
          offset: [0, -10],
          className: 'custom-leaflet-tooltip',
          opacity: 0.95
        });

        markersRef.current[location.id] = marker;
      } else {
        // Marker already exists, update its style/classes via DOM if painted, otherwise recreate icon
        const wrapper = document.getElementById(`marker-wrapper-${location.id}`);
        if (wrapper) {
          const currentState = wrapper.getAttribute('data-state');
          if (currentState !== targetState) {
            wrapper.setAttribute('data-state', targetState);
            wrapper.className = `marker-transition-wrapper marker-state-${targetState}`;
            wrapper.innerHTML = innerHtml;
          }
        } else {
          // Fallback if not currently in the visible viewport DOM
          const customIcon = L.divIcon({
            html: `<div id="marker-wrapper-${location.id}" class="marker-transition-wrapper marker-state-${targetState}" data-state="${targetState}">${innerHtml}</div>`,
            className: 'custom-map-marker-icon-container',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
          });
          marker.setIcon(customIcon);
        }

        // Update tooltip content dynamically
        const tooltipContent = `
          <div class="px-3 py-1.5 bg-zinc-950/95 dark:bg-zinc-950 text-white rounded-xl border border-zinc-800 shadow-2xl text-center">
            <p class="text-xs font-bold font-serif text-zinc-50">${location.name}</p>
            <p class="text-[9px] tracking-wider text-emerald-400 font-mono uppercase font-semibold mt-0.5">${location.modernCountry}</p>
            ${!isHighlighted ? '<p class="text-[8px] text-zinc-500 font-mono italic mt-1">Inactive in selected era</p>' : ''}
          </div>
        `;
        marker.setTooltipContent(tooltipContent);
      }
    });

    // G. Render Selected Historical Persona Path and Connection Points
    if (selectedPersonaId && mapRef.current) {
      const persona = HISTORICAL_PERSONAS.find(p => p.id === selectedPersonaId);
      if (persona) {
        const coords = persona.points.map(pt => pt.coordinates);

        // 1. Draw Polyline Path
        const pathLine = L.polyline(coords, {
          color: persona.color,
          weight: 4,
          opacity: 0.9,
          dashArray: '8, 8',
          lineCap: 'round',
          lineJoin: 'round',
          className: 'animated-persona-path-line animate-pulse'
        }).addTo(mapRef.current);

        pathLine.bindTooltip(`
          <div class="px-2.5 py-1 bg-zinc-950/95 text-stone-100 text-[10px] rounded-lg border border-zinc-800/80 backdrop-blur-md shadow-md">
            <span class="font-bold block text-amber-400 font-serif tracking-wide">${persona.name}'s Journey</span>
            <span class="text-zinc-400 font-sans text-[9px]">${persona.timeline}</span>
          </div>
        `, { sticky: true, className: 'custom-leaflet-tooltip' });

        personaLayersRef.current.push(pathLine);
        localRouteCount++;

        // 2. Draw sequential node markers
        persona.points.forEach((point, idx) => {
          if (!mapRef.current) return;

          // Standard divIcon showing sequence number
          const pIcon = L.divIcon({
            html: `
              <div class="relative flex items-center justify-center cursor-pointer">
                <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-35" style="background-color: ${persona.color};"></span>
                <span class="relative flex items-center justify-center rounded-full h-7 w-7 text-white font-mono text-xs font-bold border-2 border-zinc-900 shadow-lg hover:scale-125 transition-transform" style="background-color: ${persona.color}; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
                  ${idx + 1}
                </span>
              </div>
            `,
            className: 'custom-persona-marker-icon-container',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });

          const pMarker = L.marker(point.coordinates, { icon: pIcon }).addTo(mapRef.current);

          const popupContent = `
            <div class="p-2 bg-zinc-950 text-white rounded-xl border border-zinc-800 shadow-2xl max-w-[240px] font-sans">
              <div class="flex items-center gap-1.5 border-b border-zinc-800 pb-1 mb-1.5">
                <span class="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold text-white" style="background-color: ${persona.color};">
                  ${idx + 1}
                </span>
                <h4 class="text-[11px] font-bold text-amber-400 font-serif">${point.name}</h4>
              </div>
              <p class="text-[10px] text-zinc-300 leading-relaxed">${point.description}</p>
            </div>
          `;

          pMarker.bindPopup(popupContent, {
            className: 'custom-leaflet-popup',
            maxWidth: 240,
            closeButton: false,
            offset: [0, -10]
          });

          // Bind a simple tooltip too so it's discoverable on hover
          pMarker.bindTooltip(`
            <div class="px-2 py-1 bg-zinc-950/95 text-stone-100 text-[10px] rounded-lg border border-zinc-800/80 shadow-md">
              <span class="font-bold text-amber-400">Stop ${idx + 1}: ${point.name}</span>
            </div>
          `, { direction: 'top', offset: [0, -5], className: 'custom-leaflet-tooltip' });

          personaLayersRef.current.push(pMarker);
          localMarkerCount++;
        });
      }
    }

    const duration = performance.now() - renderStart;
    setDiagnosticInfo({
      activeMarkers: localMarkerCount,
      activeRoutes: localRouteCount,
      geoJsonFeatures: localGeoJsonCount,
      renderTimeMs: duration
    });

  }, [activeLayers, selectedEraId, searchQuery, selectedLocationId, highlightEraRoutes, selectedPersonaId]);

  return (
    <div className="relative w-full h-full">
      {/* Map Target Div */}
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


      {/* Floating Zoom & Compass Map Overlay Controls (Bottom Right) */}
      <div className="absolute bottom-40 sm:bottom-48 right-4 z-[990] flex flex-col gap-2">
        <button
          onClick={() => setIsMeasuring(prev => !prev)}
          className={`flex items-center justify-center w-10 h-10 rounded-xl border shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer ${
            isMeasuring 
              ? 'bg-emerald-500 hover:bg-emerald-600 border-emerald-400 text-white animate-pulse' 
              : 'border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
          }`}
          title={isMeasuring ? "Deactivate Distance Measurement Tool" : "Activate Distance Measurement Tool"}
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
          title="Reset Camera to Center"
        >
          <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </button>
        <button
          onClick={handleMapRefresh}
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 text-zinc-700 dark:text-zinc-300 shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Refresh Map & Clear Measurements"
        >
          <RefreshCw className={`w-5 h-5 text-emerald-600 dark:text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Floating Distance Measurement Panel */}
      {isMeasuring && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[990] w-[calc(100vw-2rem)] sm:w-96 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-4 shadow-xl transition-all duration-300 flex flex-col gap-3 pointer-events-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-2">
            <div className="flex items-center gap-2">
              <Ruler className="w-4.5 h-4.5 text-emerald-500" />
              <span className="text-xs font-bold tracking-wider text-zinc-900 dark:text-zinc-100 uppercase font-sans">
                Historical Distance Calculator
              </span>
            </div>
            <button
              onClick={() => {
                setIsMeasuring(false);
                clearMeasurement();
              }}
              className="text-[10px] font-semibold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer uppercase tracking-wider"
            >
              Exit Tool
            </button>
          </div>

          {/* Guidelines / Status */}
          {measurePoints.length === 0 && (
            <div className="text-xs text-zinc-500 dark:text-zinc-400 py-1 flex flex-col gap-1 text-center">
              <p className="font-medium text-zinc-800 dark:text-zinc-200">
                Measurement Mode Active
              </p>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                Click anywhere on the map to place point <strong className="text-emerald-500 font-bold">A</strong> (start location).
              </p>
            </div>
          )}

          {measurePoints.length === 1 && (
            <div className="text-xs text-zinc-500 dark:text-zinc-400 py-1 flex flex-col gap-1 text-center">
              <p className="font-medium text-zinc-800 dark:text-zinc-200">
                Point A Set Successfully
              </p>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                Click another location to place point <strong className="text-emerald-500 font-bold">B</strong> and compute historical travel time.
              </p>
            </div>
          )}

          {measurePoints.length === 2 && measuredDistanceKm !== null && (
            <div className="flex flex-col gap-3.5">
              {/* Distance Display */}
              <div className="flex flex-col items-center py-2.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 dark:border-emerald-500/20 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Approximate Distance
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-2xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {measuredDistanceKm.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                  </span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    km
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-700 mx-1">|</span>
                  <span className="text-lg font-bold font-mono text-zinc-700 dark:text-zinc-300">
                    {(measuredDistanceKm * 0.621371).toLocaleString(undefined, { maximumFractionDigits: 1 })}
                  </span>
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    miles
                  </span>
                </div>
              </div>

              {/* Historical Travel Speed Benchmarks */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Historical Travel Times
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* Camel Caravan */}
                  <div className="flex flex-col p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/30">
                    <span className="font-sans font-medium text-zinc-500 flex items-center gap-1">
                      🐫 Caravan
                    </span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 mt-1">
                      {Math.ceil(measuredDistanceKm / 28)} {Math.ceil(measuredDistanceKm / 28) === 1 ? 'day' : 'days'}
                    </span>
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500">
                      ~28 km / day pace
                    </span>
                  </div>

                  {/* Fast Horse Courier */}
                  <div className="flex flex-col p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/30">
                    <span className="font-sans font-medium text-zinc-500 flex items-center gap-1">
                      🐎 Horse Relay
                    </span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 mt-1">
                      {Math.ceil(measuredDistanceKm / 70)} {Math.ceil(measuredDistanceKm / 70) === 1 ? 'day' : 'days'}
                    </span>
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500">
                      ~70 km / day relay
                    </span>
                  </div>

                  {/* Foot Traveler */}
                  <div className="flex flex-col p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/30">
                    <span className="font-sans font-medium text-zinc-500 flex items-center gap-1">
                      🚶 Foot Traveler
                    </span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 mt-1">
                      {Math.ceil(measuredDistanceKm / 22)} {Math.ceil(measuredDistanceKm / 22) === 1 ? 'day' : 'days'}
                    </span>
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500">
                      ~22 km / day walking
                    </span>
                  </div>

                  {/* Sailing Vessel */}
                  <div className="flex flex-col p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/30">
                    <span className="font-sans font-medium text-zinc-500 flex items-center gap-1">
                      ⛵ Coastal Dhow
                    </span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 mt-1">
                      {Math.ceil(measuredDistanceKm / 100)} {Math.ceil(measuredDistanceKm / 100) === 1 ? 'day' : 'days'}
                    </span>
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500">
                      ~100 km / day sailing
                    </span>
                  </div>
                </div>
              </div>

              {/* Clear Button */}
              <div className="flex gap-2">
                <button
                  onClick={clearMeasurement}
                  className="flex-1 py-1.5 text-center text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Clear Points
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Real-time Map & Performance Diagnostics Panel */}
      <div className="absolute bottom-40 sm:bottom-48 left-4 z-[990] flex flex-col items-start gap-1">
        {showDiagnostics ? (
          <div className="flex flex-col w-56 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-3.5 shadow-xl transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/60 mb-2.5">
              <span className="text-[11px] font-bold tracking-wider text-zinc-900 dark:text-zinc-100 uppercase font-sans">
                Map Diagnostics
              </span>
              <button
                onClick={() => setShowDiagnostics(false)}
                className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Hide
              </button>
            </div>

            {/* Performance Stats List */}
            <div className="flex flex-col gap-2 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-sans font-medium text-zinc-500">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  Active Markers
                </span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  {diagnosticInfo.activeMarkers}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-sans font-medium text-zinc-500">
                  <Compass className="w-3.5 h-3.5 text-purple-500" />
                  Active Routes
                </span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  {diagnosticInfo.activeRoutes}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-sans font-medium text-zinc-500">
                  <Layers className="w-3.5 h-3.5 text-blue-500" />
                  Boundaries (GeoJSON)
                </span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  {diagnosticInfo.geoJsonFeatures}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1.5 border-t border-dashed border-zinc-100 dark:border-zinc-800/60 mt-1">
                <span className="flex items-center gap-1.5 font-sans font-medium text-zinc-500">
                  <Activity className="w-3.5 h-3.5 text-amber-500" />
                  Render Latency
                </span>
                <span className={`font-bold ${diagnosticInfo.renderTimeMs > 25 ? 'text-amber-500' : 'text-emerald-500 dark:text-emerald-400'}`}>
                  {diagnosticInfo.renderTimeMs.toFixed(1)}ms
                </span>
              </div>
            </div>

            {/* Performance Level */}
            <div className="mt-2.5 text-[9px] font-sans font-semibold tracking-wide text-center uppercase py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400 border border-zinc-200/30 dark:border-zinc-800/30">
              {diagnosticInfo.renderTimeMs < 12 ? 'Excellent (60 FPS)' : 'Optimized rendering'}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDiagnostics(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 text-zinc-700 dark:text-zinc-300 shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer text-[11px] font-medium font-sans hover:scale-105 active:scale-95"
            title="Show Map Diagnostics"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            <span>Map Diagnostics</span>
          </button>
        )}
      </div>
    </div>
  );
}
