import { EraData } from './types';

export const modernEraData: EraData = {
  id: "modern",
  title: "The Modern Era",
  dateRange: "Post 1922 CE",
  description: "The contemporary landscape following the dissolution of the Ottoman state, marked by nation-states, global migration, preservation of heritage sites, and revitalized scholarship.",
  mapCenter: [25.0, 35.0],
  zoomLevel: 3,
  borders: [], // Modern era is defined by contemporary borders, no pre-defined caliphal boundaries
  importantCities: [
    {
      id: "makkah_modern",
      name: "Makkah",
      modernCountry: "Saudi Arabia",
      coordinates: [21.3891, 39.8579],
      significance: "Hosting millions of pilgrims annually for the Hajj. Extensively expanded to accommodate global worshippers while preserving historical sites.",
      layers: ["Sacred Places"]
    },
    {
      id: "madinah_modern",
      name: "Madinah",
      modernCountry: "Saudi Arabia",
      coordinates: [24.4672, 39.6111],
      significance: "An international destination for visitation, housing Al-Masjid an-Nabawi, the Prophet's tomb, and numerous Islamic universities.",
      layers: ["Sacred Places", "Centers of Knowledge"]
    }
  ],
  importantEvents: [
    {
      id: "caliphate_dissolution",
      title: "Dissolution of the Ottoman Caliphate",
      year: "1924 CE",
      description: "The Turkish Grand National Assembly officially abolishes the caliphate, ending over six centuries of imperial administrative unity and giving rise to the modern nation-state system.",
      coordinates: [41.0082, 28.9784]
    }
  ],
  historicalMarkers: [
    {
      id: "masjid_haram_modern",
      name: "Al-Masjid al-Haram Expansion",
      type: "sacred",
      coordinates: [21.4225, 39.8262],
      description: "The modern expansion of the Holy Sanctuary in Makkah, incorporating state-of-the-art logistics and structure while preserving the central Ka'bah."
    }
  ]
};
