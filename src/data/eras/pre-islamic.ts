import { EraData } from './types';

export const preIslamicEraData: EraData = {
  id: "pre-islamic",
  title: "Pre-Islamic Arabia",
  dateRange: "Before 610 CE",
  description: "The era of Jahiliyyah, characterized by tribal structures, poetic traditions, trade hubs like Makkah, and regional monotheistic or polytheistic influences before the prophetic call.",
  mapCenter: [23.5, 42.0],
  zoomLevel: 5,
  borders: [
    {
      name: 'Byzantine Empire',
      color: '#a855f7', // Purple
      label: 'BYZANTINE EMPIRE',
      labelCoord: [35.0, 31.0],
      coordinates: [
        [41.0, 26.0], [41.0, 36.0], [37.0, 38.0], [33.0, 36.0], 
        [31.0, 34.0], [29.0, 34.0], [25.0, 32.0], [22.0, 31.0], 
        [30.0, 25.0], [32.0, 20.0], [35.0, 20.0], [38.0, 24.0]
      ]
    },
    {
      name: 'Sasanian Empire',
      color: '#ef4444', // Red-Orange
      label: 'SASANIAN EMPIRE',
      labelCoord: [33.0, 51.0],
      coordinates: [
        [37.0, 42.0], [38.0, 48.0], [38.0, 55.0], [34.0, 60.0], 
        [27.0, 57.0], [25.0, 50.0], [30.0, 48.0], [31.0, 45.0], 
        [34.0, 43.0]
      ]
    },
    {
      name: 'Kingdom of Aksum',
      color: '#f59e0b', // Gold
      label: 'KINGDOM OF AKSUM',
      labelCoord: [15.5, 40.0],
      coordinates: [
        [15.0, 38.0], [18.0, 37.0], [18.0, 41.0], [14.0, 42.0],
        [12.0, 40.0]
      ]
    }
  ],
  importantCities: [
    {
      id: "makkah",
      name: "Makkah",
      modernCountry: "Saudi Arabia",
      coordinates: [21.3891, 39.8579],
      significance: "An ancient sanctuary and major trade hub. Governed by the Quraysh tribe, hosting the Ka'bah which held idols of various tribes before Islamic purification.",
      layers: ["Sacred Places", "Seerah Locations"]
    },
    {
      id: "yathrib",
      name: "Yathrib (Madinah)",
      modernCountry: "Saudi Arabia",
      coordinates: [24.4672, 39.6111],
      significance: "An agricultural oasis inhabited by Jewish tribes (Banu Qaynuqa, Banu Nadir, Banu Qurayzah) and Arab tribes (Aws and Khazraj) locked in long-standing feuds.",
      layers: ["Seerah Locations"]
    },
    {
      id: "sanaa",
      name: "Sana'a",
      modernCountry: "Yemen",
      coordinates: [15.3694, 44.1910],
      significance: "Southern capital of Himyarite influence and later Aksumite/Sasanian control. Known for its trade connections along the frankincense route.",
      layers: ["Trade Routes"]
    },
    {
      id: "petra",
      name: "Petra",
      modernCountry: "Jordan",
      coordinates: [30.3285, 35.4444],
      significance: "Famous Nabataean capital carved into red sandstone, serving as an intersection of major caravan trade routes connecting Arabia to the Mediterranean.",
      layers: ["Trade Routes"]
    }
  ],
  importantEvents: [
    {
      id: "year_of_elephant",
      title: "The Year of the Elephant",
      year: "c. 570 CE",
      description: "Abraha, the Aksumite Christian ruler of Yemen, marches on Makkah with an army of war elephants intending to demolish the Ka'bah. The campaign fails miraculously as mentioned in Surah Al-Fil.",
      coordinates: [21.3891, 39.8579]
    },
    {
      id: "hilf_al_fudul",
      title: "Hilf al-Fudul (League of the Virtuous)",
      year: "c. 590 CE",
      description: "An alliance created by Meccan tribes to establish justice and protect vulnerable traders from oppression. Prophet Muhammad ﷺ participated in this pact in his youth.",
      coordinates: [21.3891, 39.8579]
    }
  ],
  historicalMarkers: [
    {
      id: "ukaz_market",
      name: "Souk Ukaz",
      type: "landmark",
      coordinates: [21.2825, 40.4072],
      description: "The most famous ancient open-air market and intellectual center where poets like Imru' al-Qais competed to hang their prize poems (Mu'allaqat) on the Ka'bah."
    },
    {
      id: "marib_dam",
      name: "Great Dam of Ma'rib",
      type: "landmark",
      coordinates: [15.3992, 45.2811],
      description: "An engineering marvel of the ancient world. Its final breach caused a catastrophic failure, triggering massive migrations of Arab tribes northward across the peninsula."
    }
  ],
  imageOverlays: [
    {
      id: "ancient_trade_routes_overlay",
      url: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000",
      bounds: [[12.0, 32.0], [35.0, 55.0]],
      opacity: 0.15,
      title: "Arabian Peninsula Silk & Spice Route Map"
    }
  ]
};
