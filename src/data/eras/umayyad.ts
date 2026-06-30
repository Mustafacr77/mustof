import { EraData } from './types';

export const umayyadEraData: EraData = {
  id: "umayyad",
  title: "The Umayyad Caliphate",
  dateRange: "661 - 750 CE",
  description: "The establishment of the caliphate in Damascus, rapid expansion across North Africa, Spain (Al-Andalus), and parts of Central Asia, accompanied by architectural milestones like the Dome of the Rock.",
  mapCenter: [33.0, 30.0],
  zoomLevel: 4,
  borders: [
    {
      name: 'Umayyad Caliphate (East)',
      color: '#e11d48', // Crimson
      label: 'UMAYYAD CALIPHATE',
      labelCoord: [30.0, 45.0],
      coordinates: [
        [15.0, 40.0], [15.0, 55.0], [25.0, 65.0], [35.0, 65.0], 
        [40.0, 50.0], [42.0, 40.0], [35.0, 35.0], [31.0, 32.0], 
        [30.0, 25.0], [22.0, 25.0], [18.0, 35.0]
      ]
    },
    {
      name: 'Umayyad (North Africa)',
      color: '#e11d48',
      label: 'UMAYYAD CALIPHATE',
      labelCoord: [31.0, 10.0],
      coordinates: [
        [30.0, 25.0], [33.0, 10.0], [36.0, 0.0], [32.0, -5.0], 
        [26.0, -5.0], [28.0, 10.0], [25.0, 25.0]
      ]
    },
    {
      name: 'Al-Andalus Territory',
      color: '#10b981', // Andalusian green
      label: 'AL-ANDALUS CORRIDOR',
      labelCoord: [38.5, -4.0],
      coordinates: [
        [36.0, -6.0], [39.0, -7.0], [42.0, -8.0], [42.0, -3.0], 
        [40.0, 0.0], [37.0, -2.0]
      ]
    }
  ],
  importantCities: [
    {
      id: "damascus",
      name: "Damascus",
      modernCountry: "Syria",
      coordinates: [33.5138, 36.2947],
      significance: "The political capital of the Umayyad Caliphate. A cultural powerhouse where administrative records were Arabized and the majestic Umayyad Mosque was built.",
      layers: ["Centers of Knowledge", "Historic Mosques"]
    },
    {
      id: "kairouan",
      name: "Kairouan",
      modernCountry: "Tunisia",
      coordinates: [35.6781, 10.0963],
      significance: "Founded by Uqbah ibn Nafi in 670 CE as a base for expansion into northwest Africa and Al-Andalus. Home of the famous Great Mosque of Kairouan.",
      layers: ["Centers of Knowledge", "Historic Mosques"]
    },
    {
      id: "cordoba",
      name: "Córdoba",
      modernCountry: "Spain",
      coordinates: [37.8882, -4.7794],
      significance: "Developed initially as a provincial seat under Umayyad governors, laying the groundwork for the future Emirate and Caliphate of Córdoba.",
      layers: ["Centers of Knowledge"]
    }
  ],
  importantEvents: [
    {
      id: "dome_of_rock",
      title: "Construction of the Dome of the Rock",
      year: "691 CE",
      description: "Commissioned by Caliph Abd al-Malik ibn Marwan, it represents one of the earliest and most spectacular masterpieces of Islamic architecture.",
      coordinates: [31.7780, 35.2354]
    },
    {
      id: "andalus_crossing",
      title: "Crossing into Al-Andalus",
      year: "711 CE",
      description: "Tariq ibn Ziyad lands near Gibraltar and defeats King Roderic, initiating Muslim presence in the Iberian Peninsula which lasted over seven centuries.",
      coordinates: [36.1408, -5.3536]
    }
  ],
  historicalMarkers: [
    {
      id: "umayyad_mosque_damascus",
      name: "Great Umayyad Mosque of Damascus",
      type: "landmark",
      coordinates: [33.5117, 36.3067],
      description: "Built on the site of a Christian basilica and Roman temple, it is renowned for its splendid golden mosaics and expansive courtyard."
    }
  ]
};
