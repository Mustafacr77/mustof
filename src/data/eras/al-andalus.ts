import { EraData } from './types';

export const alAndalusEraData: EraData = {
  id: "al-andalus",
  title: "Al-Andalus",
  dateRange: "711 - 1492 CE",
  description: "The multi-century presence of Islamic civilization in the Iberian Peninsula (modern Spain and Portugal), defined by co-existence (Convivencia), monumental libraries in Cordoba, and agricultural innovations.",
  mapCenter: [37.5, -4.0],
  zoomLevel: 5,
  borders: [
    {
      name: 'Caliphate of Córdoba / Al-Andalus',
      color: '#0f766e', // Teal
      label: 'CALIPHATE OF CÓRDOBA',
      labelCoord: [38.5, -4.0],
      coordinates: [
        [36.0, -6.0], [39.0, -7.0], [41.0, -5.0], [40.0, -1.0], 
        [37.0, -1.5]
      ]
    }
  ],
  importantCities: [
    {
      id: "cordoba_andalus",
      name: "Córdoba",
      modernCountry: "Spain",
      coordinates: [37.8882, -4.7794],
      significance: "The jewel of Al-Andalus. At its peak under Abd al-Rahman III, it boasted paved lit streets, 70 libraries, hundreds of baths, and the legendary Great Mosque.",
      layers: ["Centers of Knowledge", "Historic Mosques"]
    },
    {
      id: "sevilla_andalus",
      name: "Seville (Ishbiliya)",
      modernCountry: "Spain",
      coordinates: [37.3891, -5.9845],
      significance: "A major economic and agricultural center, famous for its grand Giralda minaret and Almohad gardens.",
      layers: ["Centers of Knowledge"]
    },
    {
      id: "granada_andalus",
      name: "Granada (Garnatah)",
      modernCountry: "Spain",
      coordinates: [37.1773, -3.5986],
      significance: "The last Muslim stronghold in Al-Andalus governed by the Nasrid Dynasty, which constructed the world-famous Alhambra Palace complex.",
      layers: ["Centers of Knowledge"]
    }
  ],
  importantEvents: [
    {
      id: "mezquita_foundation",
      title: "Founding of the Great Mosque of Córdoba",
      year: "785 CE",
      description: "Abd al-Rahman I (the Umayyad survivor) purchases half of a cathedral to construct a majestic mosque with double-tiered red-and-white stone arches.",
      coordinates: [37.8797, -4.7794]
    },
    {
      id: "granada_fall",
      title: "The Capitulation and Fall of Granada",
      year: "1492 CE",
      description: "Emir Muhammad XII (Boabdil) surrenders Granada to the Catholic Monarchs Isabella and Ferdinand, concluding the last Muslim sovereignty in Spain.",
      coordinates: [37.1773, -3.5986]
    }
  ],
  historicalMarkers: [
    {
      id: "alhambra_palace",
      name: "The Alhambra",
      type: "landmark",
      coordinates: [37.1760, -3.5900],
      description: "The sprawling hilltop fortress and palace complex of Granada, renowned for its delicate Arabesque stuccowork, reflecting pools, and courtyards."
    }
  ]
};
