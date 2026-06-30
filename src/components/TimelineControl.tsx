import React from 'react';
import { Clock, Book, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { HISTORICAL_ERAS } from '../data/locations';

interface TimelineControlProps {
  selectedEraId: string; // 'all' or one of the ids
  onSelectEra: (eraId: string) => void;
}

export default function TimelineControl({
  selectedEraId,
  onSelectEra
}: TimelineControlProps) {
  
  // Find current era info
  const currentEra = HISTORICAL_ERAS.find(e => e.id === selectedEraId);

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[990] flex flex-col gap-3 max-w-5xl mx-auto pointer-events-auto">
      {/* Era Summary Card (glassmorphism panel) */}
      <div className="hidden sm:block rounded-2xl border border-white/10 dark:border-zinc-800/40 bg-white/70 dark:bg-zinc-950/75 backdrop-blur-xl p-4 shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                {selectedEraId === 'all' ? 'All Eras Combined' : currentEra?.timeline}
              </span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 font-serif">
              {selectedEraId === 'all' ? 'Universal History Mode' : currentEra?.name}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1.5 leading-relaxed line-clamp-2 md:line-clamp-none">
              {selectedEraId === 'all' 
                ? 'Displaying all recorded cities, ancient nodes, trade routes, and empires globally across all epochs. Select a specific era below to watch history unfold chronologically.'
                : currentEra?.description}
            </p>
          </div>
          {selectedEraId !== 'all' && (
            <div className="hidden md:flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-500/5 border border-zinc-200/50 dark:border-zinc-800/50 max-w-[140px] text-center shrink-0">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Epoch Marker</span>
              <span className="text-[11px] font-mono font-semibold text-zinc-800 dark:text-zinc-300 mt-1">
                {currentEra?.timeline}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Actual Horizontal Timeline Slider */}
      <div className="relative flex items-center w-full px-1.5 py-2.5 rounded-2xl border border-white/10 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/85 backdrop-blur-xl shadow-xl">
        <div className="flex items-center w-full overflow-x-auto no-scrollbar gap-2 px-3">
          {/* "All Eras" Trigger */}
          <button
            onClick={() => onSelectEra('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-tight shrink-0 transition-all cursor-pointer border ${
              selectedEraId === 'all'
                ? 'bg-zinc-900 dark:bg-stone-100 text-stone-100 dark:text-zinc-950 shadow-md border-zinc-800 dark:border-white'
                : 'text-zinc-600 dark:text-zinc-400 bg-transparent border-transparent hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60'
            }`}
          >
            All Eras
          </button>

          {/* Divider */}
          <span className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 shrink-0" />

          {/* Era Nodes */}
          {HISTORICAL_ERAS.map((era, index) => {
            const isSelected = selectedEraId === era.id;
            return (
              <React.Fragment key={era.id}>
                {index > 0 && (
                  <span className={`w-5 h-[1.5px] shrink-0 self-center transition-colors duration-300 ${
                    isSelected ? 'bg-amber-500' : 'bg-zinc-200 dark:bg-zinc-800'
                  }`} />
                )}
                <button
                  onClick={() => onSelectEra(era.id)}
                  className={`relative flex flex-col items-start justify-center px-4 py-2 rounded-xl text-left shrink-0 transition-all duration-300 border cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 dark:bg-stone-100 text-stone-100 dark:text-zinc-950 shadow-lg border-zinc-800 dark:border-white scale-102 pl-4 border-l-2 border-l-amber-500 dark:border-l-amber-500'
                      : 'text-zinc-600 dark:text-zinc-400 bg-transparent border-transparent hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 border-l border-transparent'
                  }`}
                >
                  <span className={`text-[9px] font-mono font-bold uppercase block transition-colors ${
                    isSelected ? 'text-amber-500 dark:text-amber-600' : 'opacity-65 text-zinc-400'
                  }`}>
                    {era.timeline}
                  </span>
                  <span className="text-xs font-bold tracking-tight mt-0.5">
                    {era.name}
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
