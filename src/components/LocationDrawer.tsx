import React from 'react';
import { X, MapPin, Calendar, Users, Book, Scroll, Compass, Heart, AlertCircle, Quote, Star, Anchor } from 'lucide-react';
import { LocationData } from '../data/locations';

interface LocationDrawerProps {
  location: LocationData | null;
  onClose: () => void;
  onFocusLocation: (loc: LocationData) => void;
}

const getHeroBackdrop = (id: string) => {
  switch (id) {
    case 'makkah':
      return {
        className: 'from-zinc-950 via-amber-950/60 to-zinc-950',
        glowColor: 'rgba(245, 158, 11, 0.15)',
        subtitle: 'The Mother of Cities • First Sanctuary of Mankind',
        icon: '🕋'
      };
    case 'madinah':
      return {
        className: 'from-emerald-950/90 via-zinc-900 to-emerald-950/80',
        glowColor: 'rgba(16, 185, 129, 0.15)',
        subtitle: 'The Radiant City • Refuge & Sanctuary of the Prophet ﷺ',
        icon: '🌴'
      };
    case 'quds':
      return {
        className: 'from-amber-950/90 via-yellow-900/50 to-zinc-950',
        glowColor: 'rgba(217, 119, 6, 0.2)',
        subtitle: 'The Holy Sanctuary • Al-Aqsa & Land of Prophets',
        icon: '🕌'
      };
    case 'damascus':
      return {
        className: 'from-stone-900 via-amber-950/30 to-stone-950',
        glowColor: 'rgba(124, 45, 18, 0.12)',
        subtitle: 'Pearl of the East • Umayyad Caliphal Hub',
        icon: '🏛️'
      };
    case 'baghdad':
      return {
        className: 'from-slate-950 via-blue-950/50 to-slate-900',
        glowColor: 'rgba(37, 99, 235, 0.15)',
        subtitle: 'Bayt al-Hikmah • Cradle of the Scholastic Translation Golden Age',
        icon: '📖'
      };
    case 'cairo':
      return {
        className: 'from-amber-950/80 via-zinc-900 to-stone-900',
        glowColor: 'rgba(194, 65, 12, 0.12)',
        subtitle: 'The City of Minarets • Shield of Islamic Heritage',
        icon: '✒️'
      };
    case 'cordoba':
      return {
        className: 'from-amber-950/40 via-stone-900 to-rose-950/40',
        glowColor: 'rgba(225, 29, 72, 0.1)',
        subtitle: 'Ornament of Al-Andalus • Coexistence & High Science',
        icon: '🍊'
      };
    case 'istanbul':
      return {
        className: 'from-indigo-950/80 via-zinc-900 to-blue-950/40',
        glowColor: 'rgba(99, 102, 241, 0.15)',
        subtitle: 'The Sublime Gate • Confluence of Continents & Empires',
        icon: '⛵'
      };
    default:
      return {
        className: 'from-zinc-900 via-neutral-800 to-zinc-950',
        glowColor: 'rgba(217, 119, 6, 0.1)',
        subtitle: 'Ancient Historical Crossroads • Regional GIS Node',
        icon: '🧭'
      };
  }
};

export default function LocationDrawer({
  location,
  onClose,
  onFocusLocation
}: LocationDrawerProps) {
  if (!location) return null;

  const backdrop = getHeroBackdrop(location.id);

  return (
    <div className="fixed top-24 right-4 bottom-4 z-[1000] w-[calc(100vw-2rem)] sm:w-[460px] rounded-2xl border border-zinc-200/50 dark:border-zinc-800/60 bg-stone-50/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl flex flex-col pointer-events-auto transition-all duration-500 ease-out animate-in slide-in-from-right no-scrollbar">
      
      {/* 1. HERO GRADIENT HEADER */}
      <div className={`relative overflow-hidden p-6 rounded-t-2xl bg-gradient-to-br ${backdrop.className} text-stone-100 border-b border-zinc-200/10`}>
        
        {/* Glow ambient background element */}
        <div 
          className="absolute right-0 top-0 w-44 h-44 rounded-full blur-[60px] pointer-events-none transition-all duration-500"
          style={{ backgroundColor: backdrop.glowColor }}
        />

        {/* Top bar controls */}
        <div className="flex items-center justify-between mb-4 z-10 relative">
          <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-500/20">
            Historical Atlas Node
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-all cursor-pointer"
            title="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Large city label and symbol */}
        <div className="flex items-start gap-3 mt-4 z-10 relative">
          <span className="text-3xl shrink-0 p-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-inner select-none">
            {backdrop.icon}
          </span>
          <div>
            <h2 className="text-3xl font-bold font-serif text-white tracking-tight leading-none mb-1">
              {location.name}
            </h2>
            <p className="text-[10px] font-medium text-stone-300 font-mono tracking-wider">
              {backdrop.subtitle}
            </p>
          </div>
        </div>

        {/* Quick geographic pills inside header */}
        <div className="flex flex-wrap items-center gap-1.5 mt-6 z-10 relative">
          <span className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-md">
            <MapPin className="w-2.5 h-2.5" />
            {location.modernCountry}
          </span>
          <span className="text-[10px] text-stone-300 font-semibold bg-white/5 px-2.5 py-0.5 rounded-md border border-white/5">
            {location.region}
          </span>
        </div>

        {/* Floating astrolabe action pill */}
        <button
          onClick={() => onFocusLocation(location)}
          className="absolute bottom-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-[10px] font-bold uppercase tracking-wider shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer border border-amber-600/20"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Focus Map</span>
        </button>
      </div>

      {/* 2. SCROLLABLE BODY CARDS CONTAINER */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">

        {/* CARD A: HISTORICAL SIGNIFICANCE NARRATIVE */}
        <div className="p-5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/60 shadow-sm relative overflow-hidden group">
          <div className="absolute right-3 top-3 opacity-10 text-stone-400 select-none pointer-events-none">
            <Quote className="w-10 h-10" />
          </div>
          <h3 className="text-[10px] font-bold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-3 flex items-center gap-1.5">
            <Star className="w-3 h-3 text-amber-500" />
            <span>Historical Significance</span>
          </h3>
          <p className="text-sm text-zinc-800 dark:text-zinc-100 leading-relaxed font-serif">
            <span className="text-2xl font-bold font-serif text-amber-600 dark:text-amber-400 float-left mr-1.5 leading-none">
              {location.significance.charAt(0)}
            </span>
            {location.significance.substring(1)}
          </p>
        </div>

        {/* CARD B: CHRONOLOGICAL TIMELINE CHRONICLES */}
        <div className="p-5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/60 shadow-sm">
          <h3 className="text-[10px] font-bold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-4 flex items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
            <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Chronological Milestones</span>
          </h3>
          <div className="relative pl-3 border-l border-amber-500/30 dark:border-amber-500/20 space-y-4">
            {location.keyEvents.map((event, index) => {
              // Extract the potential year prefix (e.g. "Birth of Prophet Muhammad ﷺ in 570 CE")
              const parts = event.split(':');
              const hasPrefix = parts.length > 1;
              return (
                <div key={index} className="relative transition-all hover:translate-x-0.5">
                  {/* Glowing core dot */}
                  <span className="absolute -left-[18.5px] top-1.5 flex items-center justify-center w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-white dark:border-zinc-950 shadow-md group-hover:scale-110 transition-transform" />
                  <div className="text-xs">
                    {hasPrefix ? (
                      <>
                        <span className="font-bold text-zinc-900 dark:text-zinc-200 font-serif block mb-0.5">
                          {parts[0]}
                        </span>
                        <span className="text-zinc-600 dark:text-zinc-300 leading-relaxed block">
                          {parts.slice(1).join(':')}
                        </span>
                      </>
                    ) : (
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif">
                        {event}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CARD C: ASSOCIATED HISTORICAL FIGURES */}
        {location.relatedPeople.length > 0 && (
          <div className="p-5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/60 shadow-sm">
            <h3 className="text-[10px] font-bold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-3 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Associated Historical Figures</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {location.relatedPeople.map(person => (
                <span 
                  key={person}
                  className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-stone-100 dark:bg-zinc-800/60 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded-lg transition-all"
                >
                  {person}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CARD D: CLASSICAL QUR'ANIC TEXT REFERENCES */}
        {location.quranReferences.length > 0 && (
          <div className="p-5 rounded-xl border border-amber-500/10 dark:border-amber-500/20 bg-amber-500/[0.02] dark:bg-amber-500/[0.03] shadow-inner relative overflow-hidden">
            <div className="absolute right-3 top-3 opacity-5 text-amber-600 select-none pointer-events-none">
              <Book className="w-12 h-12" />
            </div>
            <h3 className="text-[10px] font-bold font-mono tracking-widest text-amber-700 dark:text-amber-400 uppercase mb-3 flex items-center gap-1.5">
              <Book className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Quranic Reference Point</span>
            </h3>
            <div className="space-y-3">
              {location.quranReferences.map((ref, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl border border-amber-500/10 bg-white/60 dark:bg-zinc-950/60 text-xs font-serif text-zinc-700 dark:text-zinc-300 leading-relaxed italic relative"
                  style={{ borderLeft: '3px solid #d97706' }}
                >
                  {ref}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CARD E: CLASSICAL HADITH LITERATURE */}
        {location.hadithReferences.length > 0 && (
          <div className="p-5 rounded-xl border border-stone-300 dark:border-zinc-800 bg-stone-100/50 dark:bg-zinc-900/30 shadow-inner relative overflow-hidden">
            <div className="absolute right-3 top-3 opacity-5 text-zinc-600 select-none pointer-events-none">
              <Scroll className="w-12 h-12" />
            </div>
            <h3 className="text-[10px] font-bold font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mb-3 flex items-center gap-1.5">
              <Scroll className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Classical Hadith Literature</span>
            </h3>
            <div className="space-y-3">
              {location.hadithReferences.map((ref, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl border border-stone-200/60 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/85 text-xs font-serif text-zinc-700 dark:text-zinc-300 leading-relaxed italic"
                  style={{ borderLeft: '3px solid #059669' }}
                >
                  {ref}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CARD F: CIVILIZATIONAL LESSONS & LEGACY */}
        {location.lessons.length > 0 && (
          <div className="p-5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/60 shadow-sm relative">
            <h3 className="text-[10px] font-bold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-3.5 flex items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-800 pb-1.5">
              <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>Civilizational Lessons & Takeaways</span>
            </h3>
            <ul className="space-y-3 pl-1">
              {location.lessons.map((lesson, idx) => (
                <li key={idx} className="flex gap-2 text-xs text-zinc-700 dark:text-zinc-200 leading-relaxed font-serif">
                  <span className="text-amber-500 mt-0.5 select-none shrink-0">•</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CARD G: SCHOLARLY CITATIONS & ARCHIVES */}
        <div className="p-4 rounded-xl bg-zinc-500/5 border border-zinc-200/50 dark:border-zinc-800/50">
          <h4 className="text-[10px] font-bold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-2">
            Historical Sources & Citations
          </h4>
          <div className="space-y-1">
            {location.citations.map((cite, index) => (
              <p key={index} className="text-[11px] text-zinc-500 dark:text-zinc-400 font-serif leading-tight">
                • {cite}
              </p>
            ))}
          </div>
        </div>

        {/* WARNING STATEMENT FOOTER */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/40 flex gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-zinc-400 mt-0.5" />
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-normal">
            Content is optimized for educational GIS and chronological synchronization. Verify against certified classical sources for publishing.
          </p>
        </div>

      </div>
    </div>
  );
}
