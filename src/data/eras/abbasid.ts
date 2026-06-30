import { EraData } from './types';

export const abbasidEraData: EraData = {
  id: "abbasid",
  title: "The Abbasid Caliphate",
  dateRange: "750 - 1258 CE",
  description: "The Golden Age of Islamic civilization centered in Baghdad. Characterized by the Translation Movement, house of wisdom (Bayt al-Hikmah), scientific triumphs, and philosophical codification.",
  mapCenter: [33.0, 44.0],
  zoomLevel: 4,
  borders: [
    {
      name: 'Abbasid Caliphate Heartland',
      color: '#1d4ed8', // Royal blue
      label: 'ABBASID CALIPHATE',
      labelCoord: [33.0, 45.0],
      coordinates: [
        [15.0, 40.0], [15.0, 55.0], [25.0, 62.0], [35.0, 62.0], 
        [38.0, 48.0], [37.0, 40.0], [33.0, 38.0], [28.0, 35.0], 
        [20.0, 38.0]
      ]
    },
    {
      name: 'Fatimid Caliphate',
      color: '#10b981', // Fatimid green
      label: 'FATIMID CALIPHATE',
      labelCoord: [28.0, 31.0],
      coordinates: [
        [30.0, 31.0], [34.0, 36.0], [32.0, 37.0], [28.0, 34.0], 
        [25.0, 32.0], [30.0, 25.0]
      ]
    },
    {
      name: 'Emirate of Córdoba',
      color: '#0d9488', // Andalusian teal
      label: 'EMIRATE OF CÓRDOBA',
      labelCoord: [38.5, -4.0],
      coordinates: [
        [36.0, -6.0], [39.0, -7.0], [41.0, -5.0], [40.0, -1.0], 
        [37.0, -1.5]
      ]
    }
  ],
  importantCities: [
    {
      id: "baghdad",
      name: "Baghdad",
      modernCountry: "Iraq",
      coordinates: [33.3152, 44.3661],
      significance: "The Round City, custom built by Caliph al-Mansur in 762 CE. The global capital of scholarship and science during the Golden Age, housing the House of Wisdom.",
      layers: ["Centers of Knowledge"]
    },
    {
      id: "cairo_fatimid",
      name: "Cairo",
      modernCountry: "Egypt",
      coordinates: [30.0444, 31.2357],
      significance: "Founded by the Fatimids in 969 CE, becoming a rival caliphal center. Built Al-Azhar Mosque and University, a beacon of learning.",
      layers: ["Centers of Knowledge", "Historic Mosques"]
    },
    {
      id: "nishapur",
      name: "Nishapur",
      modernCountry: "Iran",
      coordinates: [36.2133, 58.7958],
      significance: "A prosperous capital of Khorasan. Home to the illustrious Nizamiyyah school, producing scholars like Imam al-Ghazali.",
      layers: ["Centers of Knowledge"]
    }
  ],
  importantEvents: [
    {
      id: "founding_baghdad",
      title: "Founding of the Round City of Baghdad",
      year: "762 CE",
      description: "Caliph Abu Ja'far al-Mansur commissions a perfectly circular walled city on the Tigris, serving as the central node of empire and culture.",
      coordinates: [33.3152, 44.3661]
    },
    {
      id: "house_wisdom",
      title: "Flourishing of Bayt al-Hikmah",
      year: "c. 830 CE",
      description: "Under Caliph al-Ma'mun, the House of Wisdom becomes the center of the Translation Movement, translating major Greek, Persian, and Sanskrit scientific treatises into Arabic.",
      coordinates: [33.3152, 44.3661]
    }
  ],
  historicalMarkers: [
    {
      id: "al_azhar_mosque",
      name: "Al-Azhar Mosque",
      type: "landmark",
      coordinates: [30.0458, 31.2625],
      description: "Founded in 970 CE under the Fatimids, it quickly developed into one of the world's oldest degree-granting universities, preserving Sunni scholarship."
    }
  ]
};
