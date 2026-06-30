import React from 'react';
import { Compass, BookOpen, MapPin, Info, Settings, Eye, Moon, Sun, Globe } from 'lucide-react';

interface TopNavProps {
  mapStyle: 'classic' | 'historical' | 'terrain' | 'dark' | 'satellite';
  onToggleMapStyle: () => void;
  onOpenAbout: () => void;
  onOpenSources: () => void;
  onResetView: () => void;
  onRandomExplore: () => void;
}

export default function TopNav({
  mapStyle,
  onToggleMapStyle,
  onOpenAbout,
  onOpenSources,
  onResetView,
  onRandomExplore
}: TopNavProps) {
  return (
    <header className="fixed top-4 left-4 right-4 z-[1000] flex items-center justify-between px-6 py-3 rounded-2xl border border-white/10 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl shadow-xl transition-all duration-300">
      {/* Logo Area */}
      <div 
        onClick={onResetView}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
          <span className="text-xl select-none text-white">🕌</span>
          <div className="absolute -inset-0.5 rounded-xl bg-emerald-500 opacity-0 group-hover:opacity-20 blur-sm transition-opacity" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-serif">
            Atlas of Islam
          </h1>
          <p className="text-[10px] tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono -mt-1 font-medium">
            Historical GIS Exploration
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-1">
        <button
          onClick={onResetView}
          className="flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Explore</span>
        </button>
        <button
          onClick={onRandomExplore}
          className="flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <MapPin className="w-4 h-4 text-amber-500" />
          <span>Random Explore</span>
        </button>
        <button
          onClick={onOpenSources}
          className="flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Sources</span>
        </button>
        <button
          onClick={onOpenAbout}
          className="flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <Info className="w-4 h-4 text-teal-500" />
          <span>About Atlas</span>
        </button>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Style Toggler */}
        <button
          onClick={onToggleMapStyle}
          title="Cycle Map Style (Classic → Historical → Terrain → Midnight → Satellite)"
          className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-102 active:scale-98 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            {mapStyle === 'classic' ? (
              <>
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span className="hidden sm:inline text-xs font-semibold font-mono tracking-tight text-amber-700 dark:text-amber-400 uppercase">Classic Atlas</span>
              </>
            ) : mapStyle === 'historical' ? (
              <>
                <Compass className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span className="hidden sm:inline text-xs font-semibold font-mono tracking-tight text-emerald-700 dark:text-emerald-400 uppercase">Historical Sepia</span>
              </>
            ) : mapStyle === 'terrain' ? (
              <>
                <Settings className="w-4 h-4 text-sky-500" />
                <span className="hidden sm:inline text-xs font-semibold font-mono tracking-tight text-sky-700 dark:text-sky-400 uppercase">Terrain Relief</span>
              </>
            ) : mapStyle === 'dark' ? (
              <>
                <Moon className="w-4 h-4 text-indigo-400" />
                <span className="hidden sm:inline text-xs font-semibold font-mono tracking-tight text-indigo-400 uppercase">Midnight Dark</span>
              </>
            ) : (
              <>
                <Globe className="w-4 h-4 text-purple-400" />
                <span className="hidden sm:inline text-xs font-semibold font-mono tracking-tight text-purple-400 uppercase">Satellite Ortho</span>
              </>
            )}
          </div>
        </button>

        {/* Mobile menu trigger / info fallback */}
        <div className="md:hidden">
          <button 
            onClick={onOpenAbout}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
          >
            <Info className="w-4 h-4 text-emerald-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
