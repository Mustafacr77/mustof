import { EraData } from './types';

export const ottomanEraData: EraData = {
  id: "ottoman",
  title: "The Ottoman Caliphate",
  dateRange: "1299 - 1922 CE",
  description: "The rise and expansion of the state centered in Istanbul (formerly Constantinople), uniting the eastern Mediterranean, the Balkans, parts of North Africa, and the Hejaz under a centralized caliphate.",
  mapCenter: [39.0, 31.0],
  zoomLevel: 4,
  borders: [
    {
      name: 'Ottoman Empire',
      color: '#dc2626', // Crimson red
      label: 'OTTOMAN EMPIRE',
      labelCoord: [39.0, 33.0],
      coordinates: [
        [43.0, 20.0], [45.0, 28.0], [41.0, 35.0], [38.0, 44.0], 
        [32.0, 37.0], [24.0, 39.0], [21.0, 40.0], [22.0, 37.0], 
        [30.0, 31.0], [32.0, 25.0], [32.0, 15.0], [36.0, 15.0], 
        [38.0, 22.0]
      ]
    },
    {
      name: 'Safavid Empire',
      color: '#d97706', // Gold/amber
      label: 'SAFAVID EMPIRE',
      labelCoord: [33.0, 53.0],
      coordinates: [
        [38.0, 46.0], [39.0, 55.0], [34.0, 61.0], [27.0, 58.0], 
        [26.0, 50.0], [32.0, 46.0]
      ]
    }
  ],
  importantCities: [
    {
      id: "istanbul",
      name: "Istanbul",
      modernCountry: "Turkey",
      coordinates: [41.0082, 28.9784],
      significance: "The imperial capital since 1453 CE. An architectural and administrative center where grand stone domed mosques and libraries defined the city profile.",
      layers: ["Centers of Knowledge", "Historic Mosques"]
    },
    {
      id: "bursa_ottoman",
      name: "Bursa",
      modernCountry: "Turkey",
      coordinates: [40.1885, 29.0610],
      significance: "The first major capital of the Ottoman state, famous for its historic Ulu Cama (Grand Mosque) and mausoleums of early Sultans.",
      layers: ["Historic Mosques"]
    }
  ],
  importantEvents: [
    {
      id: "constantinople_conquest",
      title: "Conquest of Constantinople",
      year: "1453 CE",
      description: "Sultan Mehmed II (The Conqueror) breaches the Byzantine walls using supercannons, completing the prophetic glad tidings and renaming the city Kostantiniyye.",
      coordinates: [41.0082, 28.9784]
    },
    {
      id: "caliphate_transfer",
      title: "Transfer of the Caliphate to the Ottomans",
      year: "1517 CE",
      description: "Following the conquest of Mamluk Egypt, the keys of Makkah and Madinah are handed to Sultan Selim I, initiating Ottoman stewardship of the Holy sanctuaries.",
      coordinates: [30.0444, 31.2357]
    }
  ],
  historicalMarkers: [
    {
      id: "hagia_sophia",
      name: "Hagia Sophia Grand Mosque",
      type: "landmark",
      coordinates: [41.0086, 28.9802],
      description: "Originally an imperial Orthodox cathedral, converted into a majestic mosque in 1453 with giant calligraphic medallions and Ottoman minarets."
    }
  ]
};
