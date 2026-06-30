/**
 * Types representing the data structure of a historical era.
 */

export interface BorderData {
  name: string;
  color: string;
  label: string;
  labelCoord: [number, number]; // [lat, lng]
  coordinates: [number, number][]; // Array of [lat, lng] for polygon boundary
}

export interface ImportantCity {
  id: string;
  name: string;
  modernCountry: string;
  coordinates: [number, number]; // [lat, lng]
  significance: string;
  layers: string[];
}

export interface ImportantEvent {
  id: string;
  title: string;
  year: string;
  description: string;
  coordinates?: [number, number]; // Optional [lat, lng] where event took place
}

export interface HistoricalMarker {
  id: string;
  name: string;
  type: 'battle' | 'treaty' | 'landmark' | 'sacred' | 'scholar';
  coordinates: [number, number]; // [lat, lng]
  description: string;
}

export interface ImageOverlayData {
  id: string;
  url: string;
  bounds: [[number, number], [number, number]]; // [[SouthWestLat, SouthWestLng], [NorthEastLat, NorthEastLng]]
  opacity?: number;
  attribution?: string;
  title: string;
}

export interface EraData {
  id: string;
  title: string;
  dateRange: string;
  description: string;
  mapCenter: [number, number]; // [lat, lng]
  zoomLevel: number;
  borders: BorderData[];
  importantCities: ImportantCity[];
  importantEvents: ImportantEvent[];
  historicalMarkers: HistoricalMarker[];
  imageOverlays?: ImageOverlayData[];
}
