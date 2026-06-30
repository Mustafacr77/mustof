import React, { useState } from 'react';
import { Layers, ChevronLeft, ChevronRight, CheckCircle2, ShieldAlert, RefreshCw, Compass, MapPin } from 'lucide-react';
import { MAP_LAYERS } from '../data/locations';
import { HISTORICAL_PERSONAS } from '../data/personas';

interface LayerPanelProps {
  activeLayers: string[];
  onToggleLayer: (layerId: string) => void;
  onResetLayers: () => void;
  mapStyle: 'classic' | 'historical' | 'terrain' | 'dark' | 'satellite';
  onChangeMapStyle: (style: 'classic' | 'historical' | 'terrain' | 'dark' | 'satellite') => void;
  highlightEraRoutes: boolean;
  onToggleHighlightEraRoutes: () => void;
  selectedPersonaId: string | null;
  onSelectPersona: (id: string | null) => void;
  onFocusCoordinates?: (coords: [number, number], name: string, description: string) => void;
}

export default function LayerPanel({
  activeLayers,
  onToggleLayer,
  onResetLayers,
  mapStyle,
  onChangeMapStyle,
  highlightEraRoutes,
  onToggleHighlightEraRoutes,
  selectedPersonaId,
  onSelectPersona,
  onFocusCoordinates
}: LayerPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={`fixed top-24 left-4 z-[990] flex flex-col max-h-[calc(100vh-14rem)] w-72 rounded-2xl border border-white/10 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/85 backdrop-blur-xl shadow-xl transition-all duration-300 ${
        isCollapsed ? '-translate-x-[calc(100%-12px)] pointer-events-none' : 'translate-x-0'
      }`}
    >
      {/* Collapse/Expand Handle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 -right-10 pointer-events-auto flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 shadow-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
        title={isCollapsed ? "Expand Layer Control" : "Collapse Layer Control"}
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      <div className="flex flex-col h-full pointer-events-auto p-5 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/50 dark:border-zinc-800/50 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Map Atlas Layers
            </h2>
          </div>
          <button
            onClick={onResetLayers}
            className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            title="Reset to default active layers"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Info label */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 leading-relaxed">
          Toggle layers to superimpose sacred geographies, trade conduits, and scholastic centers onto the map.
        </p>

        {/* Map View Toggle Section */}
        <div className="mb-4 p-2.5 rounded-xl border border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-900/30">
          <span className="block text-[10px] font-bold font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase mb-2">
            Base Map Perspective
          </span>
          <div className="grid grid-cols-5 gap-0.5 bg-white dark:bg-zinc-950 p-1 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
            {(['classic', 'historical', 'terrain', 'dark', 'satellite'] as const).map((style) => (
              <button
                key={style}
                onClick={() => onChangeMapStyle(style)}
                className={`py-1 rounded-md text-[8.5px] font-semibold text-center transition-all cursor-pointer capitalize ${
                  mapStyle === style
                    ? 'bg-amber-600 dark:bg-amber-500 text-white shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                {style === 'dark' ? 'Midnight' : style === 'historical' ? 'History' : style === 'classic' ? 'Atlas' : style}
              </button>
            ))}
          </div>
        </div>

        {/* Era Connectivity Toggle */}
        <div className="mb-4 p-2.5 rounded-xl border border-zinc-200/50 dark:border-zinc-850/40 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between">
          <div className="flex flex-col pr-2">
            <span className="text-[10px] font-bold font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
              Era Connectivity
            </span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-sans leading-tight mt-0.5">
              Highlight active era trade routes & dim inactive ones
            </span>
          </div>
          <button
            onClick={onToggleHighlightEraRoutes}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              highlightEraRoutes 
                ? 'bg-emerald-600 dark:bg-emerald-500' 
                : 'bg-zinc-200 dark:bg-zinc-800'
            }`}
            role="switch"
            aria-checked={highlightEraRoutes}
            title="Toggle era connectivity trade routes filter"
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                highlightEraRoutes ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Historical Journeys Section */}
        <div className="mb-4 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-spin-slow" />
            <span className="text-[10px] font-bold font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
              Scholarly Journeys
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-1.5 mb-2">
            {HISTORICAL_PERSONAS.map(p => {
              const isSelected = selectedPersonaId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPersona(isSelected ? null : p.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-500/50 bg-amber-500/10 dark:bg-amber-500/15 text-zinc-900 dark:text-amber-400 shadow-sm'
                      : 'border-zinc-200/40 dark:border-zinc-800/40 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <span className="text-lg mb-0.5">{p.icon}</span>
                  <span className="text-[10px] font-bold leading-tight truncate w-full">{p.name}</span>
                </button>
              );
            })}
          </div>

          {selectedPersonaId && (() => {
            const activePersona = HISTORICAL_PERSONAS.find(p => p.id === selectedPersonaId);
            if (!activePersona) return null;
            return (
              <div className="mt-2 pt-2 border-t border-zinc-200/50 dark:border-zinc-800/50 font-sans">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                    {activePersona.title}
                  </h4>
                  <button 
                    onClick={() => onSelectPersona(null)}
                    className="text-[9px] font-medium text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer"
                  >
                    Clear Path
                  </button>
                </div>
                <p className="text-[9px] text-amber-600 dark:text-amber-400 font-mono mt-0.5">
                  {activePersona.timeline}
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-snug mt-1.5 line-clamp-3">
                  {activePersona.bio}
                </p>
                
                {/* Journey Stops list */}
                <div className="mt-2.5 space-y-1 max-h-36 overflow-y-auto pr-1">
                  <span className="block text-[8px] font-bold tracking-wider uppercase text-zinc-400 dark:text-zinc-500 mb-1">
                    Route stops (Click to visit)
                  </span>
                  {activePersona.points.map((pt, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (onFocusCoordinates) {
                          onFocusCoordinates(pt.coordinates, pt.name, pt.description);
                        }
                      }}
                      className="w-full flex items-center justify-between p-1.5 rounded-md text-left text-[10px] border border-zinc-100 dark:border-zinc-900 hover:border-amber-500/30 hover:bg-amber-500/5 text-zinc-600 dark:text-zinc-400 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span 
                          className="flex items-center justify-center w-3.5 h-3.5 rounded-full text-[8px] font-bold text-white shrink-0"
                          style={{ backgroundColor: activePersona.color }}
                        >
                          {index + 1}
                        </span>
                        <span className="font-semibold truncate text-zinc-800 dark:text-zinc-200">{pt.name}</span>
                      </div>
                      <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Layers List */}
        <div className="space-y-2 flex-grow">
          {MAP_LAYERS.map((layer) => {
            const isActive = activeLayers.includes(layer.id);
            return (
              <button
                key={layer.id}
                onClick={() => onToggleLayer(layer.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-emerald-600/30 bg-emerald-500/5 dark:bg-emerald-500/10 text-zinc-900 dark:text-zinc-50'
                    : 'border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm"
                    style={{ borderLeftColor: layer.color, borderLeftWidth: '3px' }}
                  >
                    {layer.icon}
                  </span>
                  <span className="text-xs font-medium">{layer.id}</span>
                </div>
                <div 
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-emerald-600 dark:bg-emerald-500 border-emerald-600 dark:border-emerald-500 text-white' 
                      : 'border-zinc-300 dark:border-zinc-700 bg-transparent'
                  }`}
                >
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Scholarly Warning Box */}
        <div className="mt-6 p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 text-[11px] text-amber-700 dark:text-amber-300 leading-normal flex gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5">Scholarly Notice</span>
            Educational draft. Content should be reviewed against qualified scholarly sources before publication.
          </div>
        </div>
      </div>
    </div>
  );
}
