import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, X, Compass, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { LocationData, HISTORICAL_ERAS } from '../data/locations';

interface TourControllerProps {
  selectedEraId: string;
  locations: LocationData[];
  selectedLocationId: string | null;
  onSelectLocation: (location: LocationData) => void;
  isTourActive: boolean;
  onToggleTour: (active: boolean) => void;
}

const TOUR_DURATION_MS = 8000; // 8 seconds per stop

export default function TourController({
  selectedEraId,
  locations,
  selectedLocationId,
  onSelectLocation,
  isTourActive,
  onToggleTour
}: TourControllerProps) {
  // Filter locations for the current tour
  const tourLocations = React.useMemo(() => {
    if (selectedEraId === 'all') {
      // For All Eras, take a curated set of prominent locations to make a beautiful, cohesive journey
      const curatedIds = [
        'makkah', 'madinah', 'jerusalem', 'damascus', 'baghdad', 
        'cairo', 'cordoba', 'istanbul', 'bukhara', 'samarkand'
      ];
      const found = curatedIds
        .map(id => locations.find(loc => loc.id === id))
        .filter((loc): loc is LocationData => !!loc);
      
      // If we didn't match enough, fallback to first 10 locations
      return found.length >= 4 ? found : locations.slice(0, 10);
    } else {
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
      const targetName = eraNames[selectedEraId] || '';
      return locations.filter(loc => 
        loc.eras.some(
          e => e.toLowerCase() === selectedEraId.toLowerCase() || 
               (targetName && e.toLowerCase() === targetName.toLowerCase())
        )
      );
    }
  }, [selectedEraId, locations]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const eraName = React.useMemo(() => {
    if (selectedEraId === 'all') return 'Universal Islamic History';
    const era = HISTORICAL_ERAS.find(e => e.id === selectedEraId);
    return era ? era.name : 'Selected Era';
  }, [selectedEraId]);

  // Reset index when starting a new tour or switching eras
  useEffect(() => {
    if (isTourActive) {
      setCurrentIndex(0);
      setIsPlaying(true);
      setProgress(0);
      if (tourLocations.length > 0) {
        onSelectLocation(tourLocations[0]);
      }
    } else {
      setIsPlaying(false);
      setProgress(0);
    }
  }, [isTourActive, selectedEraId, tourLocations.length]);

  // Synchronize currentIndex if the location changes externally (e.g. user clicks on the map)
  useEffect(() => {
    if (isTourActive && selectedLocationId) {
      const idx = tourLocations.findIndex(loc => loc.id === selectedLocationId);
      if (idx !== -1 && idx !== currentIndex) {
        setCurrentIndex(idx);
        setProgress(0); // reset progress on manual shift
      }
    }
  }, [selectedLocationId, isTourActive, tourLocations]);

  // Auto-advance logic and smooth progress updates
  useEffect(() => {
    if (!isTourActive || !isPlaying || tourLocations.length === 0) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const intervalMs = 100; // update progress every 100ms for smoothness
    const step = (intervalMs / TOUR_DURATION_MS) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Time's up! Advance to next location
          setCurrentIndex(prevIndex => {
            const nextIndex = (prevIndex + 1) % tourLocations.length;
            onSelectLocation(tourLocations[nextIndex]);
            return nextIndex;
          });
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isTourActive, isPlaying, tourLocations, onSelectLocation]);

  if (!isTourActive) {
    // Return a sleek launch button when tour mode is inactive
    return (
      <button
        onClick={() => onToggleTour(true)}
        className="fixed bottom-40 left-4 z-[995] flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-500/30 bg-zinc-950/90 hover:bg-zinc-900 text-amber-500 hover:text-amber-400 font-sans text-xs font-bold shadow-lg shadow-amber-500/5 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] cursor-pointer"
        id="btn-start-guided-tour"
      >
        <Compass className="w-4 h-4 animate-spin-slow" />
        <span>🧭 Start Guided Tour</span>
      </button>
    );
  }

  const currentLocation = tourLocations[currentIndex];

  const handleNext = () => {
    if (tourLocations.length === 0) return;
    const nextIdx = (currentIndex + 1) % tourLocations.length;
    setCurrentIndex(nextIdx);
    onSelectLocation(tourLocations[nextIdx]);
    setProgress(0);
  };

  const handlePrev = () => {
    if (tourLocations.length === 0) return;
    const prevIdx = (currentIndex - 1 + tourLocations.length) % tourLocations.length;
    setCurrentIndex(prevIdx);
    onSelectLocation(tourLocations[prevIdx]);
    setProgress(0);
  };

  const handlePauseToggle = () => {
    setIsPlaying(prev => !prev);
  };

  const handleExit = () => {
    onToggleTour(false);
  };

  return (
    <div 
      className="fixed bottom-36 sm:bottom-40 left-4 right-4 sm:right-auto sm:w-[420px] z-[995] rounded-2xl border border-amber-500/30 bg-zinc-950/95 backdrop-blur-xl shadow-2xl p-4 transition-all duration-500 animate-in fade-in slide-in-from-bottom-5 font-sans"
      id="guided-tour-hud-panel"
    >
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
        <div className="flex items-center gap-1.5 min-w-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[10px] font-bold font-mono tracking-wider text-amber-400 uppercase truncate">
            Guided Tour: {eraName}
          </span>
        </div>
        <button
          onClick={handleExit}
          className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          title="Exit Tour Mode"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {tourLocations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <AlertCircle className="w-8 h-8 text-zinc-500 mb-2" />
          <p className="text-xs text-zinc-400 font-semibold">No key locations registered for this era.</p>
          <button
            onClick={handleExit}
            className="mt-3 px-3 py-1 text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-md cursor-pointer"
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          {/* Active Stop Details */}
          <div className="mb-4">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-bold font-mono text-zinc-400">
                Stop {currentIndex + 1} of {tourLocations.length}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-zinc-400">
                <MapPin className="w-3 h-3 text-emerald-500" />
                {currentLocation.region}, {currentLocation.modernCountry}
              </span>
            </div>
            
            <h3 className="text-sm font-bold text-white font-serif tracking-tight mt-0.5">
              {currentLocation.name}
            </h3>
            
            <p className="text-xs text-zinc-300 leading-relaxed mt-2 line-clamp-3">
              {currentLocation.significance}
            </p>
          </div>

          {/* Autoplay Progress Bar */}
          <div className="relative w-full h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
            <div 
              className="absolute left-0 top-0 h-full bg-amber-500 transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Tour Interactive Controls */}
          <div className="flex items-center justify-between gap-4 bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-2 px-3">
            {/* Playback buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-all cursor-pointer"
                title="Previous Stop"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handlePauseToggle}
                className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/25 transition-all cursor-pointer"
                title={isPlaying ? "Pause Autoplay" : "Resume Autoplay"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-all cursor-pointer"
                title="Next Stop"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Auto-advance label */}
            <div className="text-[10px] font-mono font-medium text-zinc-400">
              {isPlaying ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Auto-cycling...
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-amber-500/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Paused
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
