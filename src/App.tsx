/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import TopNav from './components/TopNav';
import LayerPanel from './components/LayerPanel';
import SearchBar from './components/SearchBar';
import TimelineControl from './components/TimelineControl';
import LocationDrawer from './components/LocationDrawer';
import AtlasMap from './components/AtlasMap';
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
    } else {
      setFocusedCustomPoint(null);
    }
  };

  const handleFocusCoordinates = (coords: [number, number], name: string, description: string) => {
    setFocusedCustomPoint({ coordinates: coords, name, description });
    setSelectedLocationId(null);
    setFocusedLocation(null);
  };

  const [targetEraId, setTargetEraId] = useState<string | null>(null);
  const [isEraTransitioning, setIsEraTransitioning] = useState<boolean>(false);

  // Era Transition Logic
  const handleSelectEra = (eraId: string) => {
    if (eraId === selectedEraId) return;
    setTargetEraId(eraId);
    setIsEraTransitioning(true);
  };

  useEffect(() => {
    if (isEraTransitioning && targetEraId !== null) {
      // 1. Give 500ms for overlay to fade in fully
      const timer1 = setTimeout(() => {
        setSelectedEraId(targetEraId);
      }, 500);

      // 2. Keep visible for a brief moment, then fade out
      const timer2 = setTimeout(() => {
        setIsEraTransitioning(false);
        setTargetEraId(null);
      }, 1800);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isEraTransitioning, targetEraId]);

  const targetEra = useMemo(() => {
    if (!targetEraId) return null;
    return HISTORICAL_ERAS.find(e => e.id === targetEraId) || null;
  }, [targetEraId]);

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

      {/* Cinematic Temporal Shift Transition Overlay */}
      <AnimatePresence>
        {isEraTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950/95 backdrop-blur-md text-stone-100 select-none pointer-events-auto"
          >
            {/* Soft Ambient Light Rays */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08),transparent_70%)] pointer-events-none opacity-85" />

            {/* Glowing Astrolabe/Compass Centerpiece */}
            <motion.div
              initial={{ scale: 0.85, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: 360, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="relative mb-8 p-6 rounded-full border border-amber-500/20 bg-amber-500/5 shadow-2xl shadow-amber-500/5 flex items-center justify-center"
            >
              {/* Spinning compass rings */}
              <div className="absolute inset-0.5 rounded-full border border-dashed border-amber-500/35 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-amber-500/10 animate-[spin_20s_linear_infinite_reverse]" />
              
              <Compass className="w-16 h-16 text-amber-500 animate-pulse" />
            </motion.div>

            {/* Era Details */}
            <div className="max-w-xl text-center px-6 z-10">
              <motion.span
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 0.6 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="block text-[10px] font-bold font-mono uppercase tracking-[0.25em] text-amber-500 mb-2"
              >
                Recalibrating Chronology
              </motion.span>
              
              <motion.h2
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight text-white mb-3"
              >
                {targetEraId === 'all' ? 'Universal History' : targetEra?.name}
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "circOut" }}
                className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mb-4"
              />

              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-sm font-mono text-amber-400/90 font-medium tracking-wide mb-4"
              >
                {targetEraId === 'all' ? 'Across the Sands of Time' : targetEra?.timeline}
              </motion.p>

              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif max-w-lg mx-auto"
              >
                {targetEraId === 'all' 
                  ? 'Merging all recorded centuries, ancient corridors, trade networks, and centers of classical knowledge into a single synchronized atlas.'
                  : targetEra?.description}
              </motion.p>
            </div>

            {/* Subtle shifting background grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
