import { EraData } from './types';

export const propheticEraData: EraData = {
  id: "prophetic",
  title: "The Life of Prophet Muhammad ﷺ",
  dateRange: "610 - 632 CE",
  description: "The descent of revelation, the early struggle in Makkah, the migration (Hijrah) to Madinah, the establishment of the first Islamic polity, and the consolidation of Islam across the Arabian Peninsula.",
  mapCenter: [23.5, 41.0],
  zoomLevel: 5,
  borders: [
    {
      name: 'Islamic State of Madinah',
      color: '#10b981', // Emerald Green
      label: 'STATE OF MADINAH (HEJAZ)',
      labelCoord: [23.5, 39.0],
      coordinates: [
        [26.2, 37.0], [26.2, 41.0], [20.0, 41.5], [19.0, 40.0],
        [21.0, 38.0], [24.0, 37.5]
      ]
    },
    {
      name: 'Byzantine Empire',
      color: '#a855f7',
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
      color: '#ef4444',
      label: 'SASANIAN EMPIRE',
      labelCoord: [33.0, 51.0],
      coordinates: [
        [37.0, 42.0], [38.0, 48.0], [38.0, 55.0], [34.0, 60.0], 
        [27.0, 57.0], [25.0, 50.0], [30.0, 48.0], [31.0, 45.0], 
        [34.0, 43.0]
      ]
    }
  ],
  importantCities: [
    {
      id: "makkah",
      name: "Makkah",
      modernCountry: "Saudi Arabia",
      coordinates: [21.3891, 39.8579],
      significance: "The spiritual cradle. Here, Prophet Muhammad ﷺ received the first revelation, faced early persecution, and returned victoriously in 630 CE to peacefully cleanse the Ka'bah of polytheism.",
      layers: ["Sacred Places", "Seerah Locations"]
    },
    {
      id: "madinah",
      name: "Madinah (Yathrib)",
      modernCountry: "Saudi Arabia",
      coordinates: [24.4672, 39.6111],
      significance: "The administrative and military capital. After the Hijrah in 622 CE, it became the foundation of the first Islamic constitution, brotherhood, and state.",
      layers: ["Sacred Places", "Seerah Locations", "Centers of Knowledge"]
    },
    {
      id: "taif",
      name: "Ta'if",
      modernCountry: "Saudi Arabia",
      coordinates: [21.2631, 40.4150],
      significance: "A mountainous city of orchards, initially hostile to the message where the Prophet ﷺ showed unmatched compassion when persecuted, later accepting Islam in 630 CE.",
      layers: ["Seerah Locations"]
    },
    {
      id: "jerusalem",
      name: "Jerusalem (Al-Quds)",
      modernCountry: "Palestine / Israel",
      coordinates: [31.7683, 35.2137],
      significance: "The destination of the Isra' (Night Journey) where the Prophet ﷺ led all prior Prophets in prayer, and from where he ascended to the heavens (Mi'raj).",
      layers: ["Sacred Places", "Seerah Locations"]
    }
  ],
  importantEvents: [
    {
      id: "first_revelation",
      title: "The First Revelation",
      year: "610 CE",
      description: "At age 40, Prophet Muhammad ﷺ receives the first five verses of Surah Al-Alaq from Angel Jibril (Gabriel) in Cave Hira, initiating his prophethood.",
      coordinates: [21.4583, 39.8653]
    },
    {
      id: "hijrah",
      title: "The Hijrah (The Migration)",
      year: "622 CE",
      description: "Fleeing persecution in Makkah, Muslims migrate to Yathrib (renamed Madinat al-Nabi), marking Year 1 of the Islamic lunar calendar (AH).",
      coordinates: [24.4672, 39.6111]
    },
    {
      id: "treaty_hudaybiyyah",
      title: "Treaty of Hudaybiyyah",
      year: "628 CE",
      description: "A pivotal 10-year truce signed between Muslims and Quraysh, which allowed peaceful propagation and was declared a 'clear victory' in Surah Al-Fath.",
      coordinates: [21.4325, 39.6382]
    },
    {
      id: "conquest_makkah",
      title: "The Conquest of Makkah",
      year: "630 CE",
      description: "Following a treaty violation by Quraysh, the Prophet ﷺ leads an army of 10,000. Makkah is entered peacefully, amnesty is declared, and the Ka'bah is purified.",
      coordinates: [21.3891, 39.8579]
    }
  ],
  historicalMarkers: [
    {
      id: "cave_hira",
      name: "Cave Hira",
      type: "sacred",
      coordinates: [21.4583, 39.8653],
      description: "Located on Jabal al-Nour. The sanctuary of solitude where the Prophet ﷺ meditated and received the first divine revelation."
    },
    {
      id: "quba_mosque",
      name: "Quba Mosque",
      type: "sacred",
      coordinates: [24.4393, 39.6172],
      description: "The first mosque built in the history of Islam, established by the Prophet ﷺ immediately upon his arrival in the outskirts of Madinah."
    },
    {
      id: "badr_battlefield",
      name: "Battlefield of Badr",
      type: "battle",
      coordinates: [23.7388, 38.7905],
      description: "Site of the first decisive military encounter (624 CE) where 313 Muslims defeated a heavily armed Quraysh army, demonstrating divine support."
    },
    {
      id: "mount_uhud",
      name: "Mount Uhud",
      type: "battle",
      coordinates: [24.5028, 39.6148],
      description: "The site of the second major encounter (625 CE) where the graves of 70 companions are located, including Hamzah ibn Abdul-Muttalib (ra)."
    }
  ]
};
