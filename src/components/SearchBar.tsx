import React from 'react';
import { Search, X, MapPin, Filter } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  matchCount: number;
  onSelectSuggestion: (id: string) => void;
  suggestions: Array<{ id: string; name: string; region: string }>;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  matchCount,
  onSelectSuggestion,
  suggestions
}: SearchBarProps) {
  return (
    <div className="fixed top-24 left-4 md:left-[20rem] z-[990] w-[calc(100vw-2rem)] md:w-80 flex flex-col gap-1.5 pointer-events-auto">
      {/* Search Input Container */}
      <div className="relative flex items-center w-full h-12 rounded-2xl border border-white/10 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/85 backdrop-blur-xl shadow-lg transition-all">
        <Search className="absolute left-4 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search places, eras, events..."
          className="w-full h-full pl-11 pr-20 bg-transparent text-xs font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 border-none outline-none focus:ring-0"
        />

        {/* Clear and Counter Button */}
        <div className="absolute right-3 flex items-center gap-1.5">
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="px-2.5 py-1 text-[10px] font-mono font-semibold tracking-tight text-amber-800 dark:text-amber-300 bg-amber-500/10 dark:bg-amber-500/20 rounded-md">
            {matchCount} {matchCount === 1 ? 'place' : 'places'}
          </span>
        </div>
      </div>

      {/* Dynamic Suggestions List */}
      {searchQuery && suggestions.length > 0 && (
        <div className="max-h-60 overflow-y-auto w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl backdrop-blur-md p-2 space-y-0.5">
          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-2.5 py-1.5 font-semibold">
            Matching Locations
          </p>
          {suggestions.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectSuggestion(item.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-left rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/60 group transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                    {item.region}
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 group-hover:translate-x-0.5 transition-transform">
                Explore →
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
