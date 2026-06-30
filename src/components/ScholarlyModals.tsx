import React from 'react';
import { X, Book, Scale, Globe, ShieldCheck, Heart, FileText } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/50 dark:border-zinc-800/50">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold font-serif text-zinc-900 dark:text-zinc-50">
              About the Atlas of Islam
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-serif">
          <p>
            Welcome to the <strong>Atlas of Islam</strong> (Version 1), a state-of-the-art interactive geographical information system (GIS) designed to map, track, and examine the expansive historical milestones of Islamic history.
          </p>
          
          <p>
            Rather than reading history as a series of isolated abstract dates, this application models history <em>geographically</em>. By visualising the absolute locations of early cities, trading junctions, caliphates, and scholastic centers, users can explore how ideas, books, and scholars traveled.
          </p>

          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-4">
            Version 1 Structural Scope
          </h3>
          <ul className="list-disc pl-4 space-y-1.5 text-zinc-500 dark:text-zinc-400">
            <li><strong>Core Interactive Canvas:</strong> A direct geographic viewport focusing on Levant, Hejaz, Egypt, Mesopotamia, Anatolia, and Central Asia.</li>
            <li><strong>Chronological Engine:</strong> An interactive timeline slider mapping epochs from Pre-Islamic Arabia, through the Umayyad, Abbasid, and Ottoman Caliphates, into the modern day.</li>
            <li><strong>Layer Integration:</strong> Dynamically filter sites by Sacred Spaces, Seerah Milestones, Scholarly Houses, Battles, and ancient Trade Routes.</li>
            <li><strong>Scholarly Citation Drawers:</strong> Tap any node to access localized historical summaries, references in the Qur'an and Hadith, civilizational lessons, and traditional footnotes.</li>
          </ul>

          <div className="p-3.5 rounded-xl border border-amber-500/10 bg-amber-500/[0.02] dark:bg-amber-500/[0.04] text-[11px] text-amber-700 dark:text-amber-300 flex gap-2.5">
            <Scale className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Advisory Notice</span>
              This is an educational draft. Content should be reviewed against qualified scholarly sources before publication. No prophets ﷺ are visually represented, and historical claims are referenced against standard classical texts.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
          >
            Acknowledge & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export function SourcesModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/50 dark:border-zinc-800/50">
          <div className="flex items-center gap-2">
            <Book className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold font-serif text-zinc-900 dark:text-zinc-50">
              Sources & Methodology
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-serif">
          <p>
            The geographical coordinates, event timelines, and civilizational descriptions inside the Atlas of Islam are mapped based on classical scholarly texts and modern geographical database audits.
          </p>

          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-4 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Primary Sources Consulted</span>
          </h3>
          <div className="space-y-3 pl-2">
            <div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">1. Prophetic Biography & Early Seerah</span>
              <p className="text-zinc-500 dark:text-zinc-400 pl-3">
                • <em>Al-Seerah al-Nabawiyyah</em> by Ibn Hisham (d. 218 AH) — The foundational biography detailing exact campaigns, tribal alliances, and early migration coordinates.
              </p>
            </div>
            <div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">2. Historical Topography & Geography</span>
              <p className="text-zinc-500 dark:text-zinc-400 pl-3">
                • <em>Mu'jam al-Buldan</em> (Dictionary of Countries) by Yaqut al-Hamawi (d. 626 AH) — The classical geographical encyclopedia documenting distances, coordinate limits, and regional scholarly associations.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 pl-3">
                • <em>Al-Mawaiz wa al-I'tibar</em> by Al-Maqrizi — Elaborating the structural topography of Cairo, Egyptian channels, and Nile delta routes.
              </p>
            </div>
            <div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">3. Chronicles & Biography Compilations</span>
              <p className="text-zinc-500 dark:text-zinc-400 pl-3">
                • <em>Tarikh al-Rusul wa'l-Muluk</em> by Al-Tabari and <em>Al-Bidayah wa'l-Nihayah</em> by Ibn Kathir — Preserving chronological event timelines from the Prophetic call through the early Umayyad eras.
              </p>
            </div>
          </div>

          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-4 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>GIS Methodology & Coordinate Approximations</span>
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 pl-2">
            Due to ancient shifting coastlines, renamed hubs, and desert route erosion, coordinates for trade corridors (e.g. Incense Route and Silk Road segments) are designated as illustrative segments connecting major attested historical cities. All city locations correspond to their modern metropolitan core coordinates for maximum navigational ease.
          </p>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200/50 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 flex gap-2">
            <Heart className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
            <p className="leading-normal">
              Our ongoing goal is to integrate real-time academic peer review feedback. Corrections, recommendations, and coordinates should be shared with certified history scholars.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
}
