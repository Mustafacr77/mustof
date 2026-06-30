/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import TopNav from './components/TopNav';
import LayerPanel from './components/LayerPanel';
import SearchBar from './components/SearchBar';
import TimelineControl from './components/TimelineControl';
import LocationDrawer from './components/LocationDrawer';
import AtlasMap from './components/AtlasMap';
import TourController from './components/TourController';
import { AboutModal, SourcesModal } from './components/ScholarlyModals';
import { LOCATIONS, LocationData, HISTORICAL_ERAS } from './data/locations';

const DEFAULT_LAYERS = ["Sacred Places", "Seerah Locations", "Centers of Knowledge", "Historic Mosques", "Trade Routes"];

export default function App() {
  // State variables
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [selectedEraId, setSelectedEraId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLayers, setActiveLayers] = useState<string[]>(() => {
    try {
      const saved = sessionStorage.getItem('atlas_active_layers');
      return saved ? JSON.parse(saved) : DEFAULT_LAYERS;
    } catch {
      return DEFAULT_LAYERS;
    }
  });
  const [mapStyle, setMapStyle] = useState<'classic' | 'historical' | 'terrain' | 'dark' | 'satellite'>(() => {
    try {
      const saved = sessionStorage.getItem('atlas_map_style') as any;
      const allowed = ['classic', 'historical', 'terrain', 'dark', 'satellite'];
      return allowed.includes(saved) ? saved : 'classic';
    } catch {
      return 'classic';
    }
  });

  const [highlightEraRoutes, setHighlightEraRoutes] = useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem('atlas_highlight_era_routes');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Persist activeLayers and mapStyle in sessionStorage
  useEffect(() => {
    sessionStorage.setItem('atlas_active_layers', JSON.stringify(activeLayers));
  }, [activeLayers]);

  useEffect(() => {
    sessionStorage.setItem('atlas_map_style', mapStyle);
  }, [mapStyle]);

  useEffect(() => {
    sessionStorage.setItem('atlas_highlight_era_routes', JSON.stringify(highlightEraRoutes));
  }, [highlightEraRoutes]);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);
  const [showSourcesModal, setShowSourcesModal] = useState<boolean>(false);
  const [resetViewTrigger, setResetViewTrigger] = useState<number>(0);
  const [focusedLocation, setFocusedLocation] = useState<LocationData | null>(null);
  const [isTourActive, setIsTourActive] = useState<boolean>(false);

  // Historical Personas and Stops State
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
  const [focusedCustomPoint, setFocusedCustomPoint] = useState<{ coordinates: [number, number]; name: string; description: string } | null>(null);

  const handleSelectPersona = (id: string | null) => {
    setSelectedPersonaId(id);
    if (id !== null) {
      // Clear location focus so the journey is the hero
      setSelectedLocationId(null);
      setFocusedLocation(null);
      setFocusedCustomPoint(null);
      setIsTourActive(false); // Disable tour mode when launching a persona journey
    } else {
      setFocusedCustomPoint(null);
    }
  };

  const handleFocusCoordinates = (coords: [number, number], name: string, description: string) => {
    setFocusedCustomPoint({ coordinates: coords, name, description });
    setSelectedLocationId(null);
    setFocusedLocation(null);
    setIsTourActive(false); // Disable tour mode on custom focus
  };

  // Era Selection Logic - Instant and unblurred
  const handleSelectEra = (eraId: string) => {
    if (eraId === selectedEraId) return;
    setSelectedEraId(eraId);
  };

  // 1. Get current selected location object
  const selectedLocation = useMemo(() => {
    return LOCATIONS.find(loc => loc.id === selectedLocationId) || null;
  }, [selectedLocationId]);

  // 2. Handle toggling layers
  const handleToggleLayer = (layerId: string) => {
    setActiveLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId) 
        : [...prev, layerId]
    );
  };

  const handleResetLayers = () => {
    setActiveLayers(DEFAULT_LAYERS);
  };

  // 3. Compute suggestions based on Search Query
  const searchSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    const q = searchQuery.toLowerCase();
    return LOCATIONS.filter(loc => 
      loc.name.toLowerCase().includes(q) ||
      loc.region.toLowerCase().includes(q) ||
      loc.modernCountry.toLowerCase().includes(q)
    ).map(loc => ({
      id: loc.id,
      name: loc.name,
      region: loc.region
    }));
  }, [searchQuery]);

  // 4. Compute overall matching locations count based on Search and Layers filters
  const filteredLocationCount = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return LOCATIONS.filter(loc => {
      // Must match search if present
      const matchesSearch = !searchQuery || (
        loc.name.toLowerCase().includes(q) ||
        loc.region.toLowerCase().includes(q) ||
        loc.modernCountry.toLowerCase().includes(q) ||
        loc.significance.toLowerCase().includes(q)
      );
      
      // Must match active layers
      const matchesLayers = loc.layers.some(l => activeLayers.includes(l));
      
      return matchesSearch && matchesLayers;
    }).length;
  }, [searchQuery, activeLayers]);

  // 5. Handle selecting a location
  const handleSelectLocation = (location: LocationData) => {
    setSelectedLocationId(location.id);
    setFocusedLocation(location);
  };

  // 6. Handle suggestion clicks
  const handleSelectSuggestion = (id: string) => {
    const loc = LOCATIONS.find(l => l.id === id);
    if (loc) {
      handleSelectLocation(loc);
      setSearchQuery(''); // clear query on selection
    }
  };

  // 7. Handle resetting visual focus
  const handleResetView = () => {
    setSelectedLocationId(null);
    setFocusedLocation(null);
    setSelectedPersonaId(null);
    setFocusedCustomPoint(null);
    setIsTourActive(false);
    setResetViewTrigger(prev => prev + 1);
  };

  // 8. Select a random marker (Random Explore)
  const handleRandomExplore = () => {
    const randomIndex = Math.floor(Math.random() * LOCATIONS.length);
    const loc = LOCATIONS[randomIndex];
    handleSelectLocation(loc);
  };

  // 9. Close information drawer
  const handleCloseDrawer = () => {
    setSelectedLocationId(null);
    setFocusedLocation(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-zinc-950 text-zinc-50 select-none">
      
      {/* 1. Full-Screen Interactive GIS Map Canvas */}
      <main className="absolute inset-0 w-full h-full z-0">
        <AtlasMap 
          mapStyle={mapStyle}
          activeLayers={activeLayers}
          selectedEraId={selectedEraId}
          searchQuery={searchQuery}
          selectedLocationId={selectedLocationId}
          onSelectLocation={handleSelectLocation}
          onResetViewTrigger={resetViewTrigger}
          focusedLocation={focusedLocation}
          highlightEraRoutes={highlightEraRoutes}
          selectedPersonaId={selectedPersonaId}
          onSelectPersona={handleSelectPersona}
          focusedCustomPoint={focusedCustomPoint}
        />
      </main>

      {/* 2. Floating Top Navigation Bar */}
      <TopNav 
        mapStyle={mapStyle}
        onToggleMapStyle={() => setMapStyle(prev => {
          if (prev === 'classic') return 'historical';
          if (prev === 'historical') return 'terrain';
          if (prev === 'terrain') return 'dark';
          if (prev === 'dark') return 'satellite';
          return 'classic';
        })}
        onOpenAbout={() => setShowAboutModal(true)}
        onOpenSources={() => setShowSourcesModal(true)}
        onResetView={handleResetView}
        onRandomExplore={handleRandomExplore}
      />

      {/* 3. Floating Search and Autocomplete Panel */}
      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        matchCount={filteredLocationCount}
        onSelectSuggestion={handleSelectSuggestion}
        suggestions={searchSuggestions}
      />

      {/* 4. Left-Side Layer Filtering Controls */}
      <LayerPanel 
        activeLayers={activeLayers}
        onToggleLayer={handleToggleLayer}
        onResetLayers={handleResetLayers}
        mapStyle={mapStyle}
        onChangeMapStyle={setMapStyle}
        highlightEraRoutes={highlightEraRoutes}
        onToggleHighlightEraRoutes={() => setHighlightEraRoutes(prev => !prev)}
        selectedPersonaId={selectedPersonaId}
        onSelectPersona={handleSelectPersona}
        onFocusCoordinates={handleFocusCoordinates}
      />

      {/* 5. Bottom Historical Chronology Timeline */}
      <TimelineControl 
        selectedEraId={selectedEraId}
        onSelectEra={handleSelectEra}
      />

      {/* 6. Right-Side Slide-out Geographic Details Drawer */}
      <LocationDrawer 
        location={selectedLocation}
        onClose={handleCloseDrawer}
        onFocusLocation={handleSelectLocation}
      />

      {/* 7. Intellectual Context Dialogs (About & Sources Modals) */}
      <AboutModal 
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
      <SourcesModal 
        isOpen={showSourcesModal}
        onClose={() => setShowSourcesModal(false)}
      />

      {/* 8. Guided Tour Mode Controller */}
      <TourController 
        selectedEraId={selectedEraId}
        locations={LOCATIONS}
        selectedLocationId={selectedLocationId}
        onSelectLocation={handleSelectLocation}
        isTourActive={isTourActive}
        onToggleTour={setIsTourActive}
      />

    </div>
  );
}
