import { EraData } from './types';

export const rashidunEraData: EraData = {
  id: "rashidun",
  title: "The Rashidun Caliphate",
  dateRange: "632 - 661 CE",
  description: "The leadership of the Four Rightly Guided Caliphs—Abu Bakr, 'Umar, 'Uthman, and 'Ali (may Allah be pleased with them)—marked by significant expansion, codification of the Qur'an, and administrative development.",
  mapCenter: [27.0, 43.0],
  zoomLevel: 4,
  borders: [
    {
      name: 'Rashidun Caliphate',
      color: '#b45309', // Warm clay
      label: 'RASHIDUN CALIPHATE',
      labelCoord: [27.0, 43.0],
      coordinates: [
        [15.0, 44.0], [15.0, 49.0], [22.0, 59.0], [30.0, 57.0], 
        [38.0, 52.0], [38.0, 43.0], [35.0, 36.0], [31.0, 33.0], 
        [31.0, 28.0], [22.0, 31.0], [20.0, 38.0]
      ]
    }
  ],
  importantCities: [
    {
      id: "madinah",
      name: "Madinah",
      modernCountry: "Saudi Arabia",
      coordinates: [24.4672, 39.6111],
      significance: "The spiritual and administrative capital of the Caliphate for the three first Caliphs, where central consultations (Shura) and strategy took place.",
      layers: ["Sacred Places", "Centers of Knowledge"]
    },
    {
      id: "kufa",
      name: "Kufa",
      modernCountry: "Iraq",
      coordinates: [32.0289, 44.4011],
      significance: "Founded as a garrison town under Caliph 'Umar, it became the administrative capital of the Caliphate during the tenure of Caliph 'Ali.",
      layers: ["Centers of Knowledge"]
    },
    {
      id: "basra",
      name: "Basra",
      modernCountry: "Iraq",
      coordinates: [30.5081, 47.7835],
      significance: "Established under Caliph 'Umar, serving as a critical military, trade, and grammatical hub where Islamic scholarship and Arabic linguistics later flourished.",
      layers: ["Centers of Knowledge"]
    },
    {
      id: "fustat",
      name: "Fustat (Cairo)",
      modernCountry: "Egypt",
      coordinates: [30.0167, 31.2500],
      significance: "The first capital of Egypt under Muslim rule, founded by the general Amr ibn al-Aas in 641 CE after the conquest of Byzantine Egypt.",
      layers: ["Centers of Knowledge"]
    },
    {
      id: "jerusalem",
      name: "Jerusalem",
      modernCountry: "Palestine / Israel",
      coordinates: [31.7683, 35.2137],
      significance: "Entered peacefully by Caliph 'Umar ibn al-Khattab in 637 CE, who granted the famous 'Assurance of Umar' guaranteeing the safety of Christian holy sites and inhabitants.",
      layers: ["Sacred Places", "Historic Mosques"]
    }
  ],
  importantEvents: [
    {
      id: "quran_codification",
      title: "Codification of the Holy Qur'an",
      year: "633 CE",
      description: "Triggered by the martyrdom of many memorizers at the Battle of Yamama, Caliph Abu Bakr commissions Zayd ibn Thabit to gather and compile the Qur'an into a unified written manuscript.",
      coordinates: [24.4672, 39.6111]
    },
    {
      id: "battle_yarmouk",
      title: "Battle of Yarmouk",
      year: "636 CE",
      description: "A colossal confrontation where Muslim forces led by Khalid ibn al-Walid defeat the Byzantine army, securing the Levant and marking the end of Byzantine rule in Syria.",
      coordinates: [32.8123, 35.9525]
    },
    {
      id: "battle_qadisiyyah",
      title: "Battle of al-Qadisiyyah",
      year: "636 CE",
      description: "The main encounter between Muslim forces led by Sa'd ibn Abi Waqqas and the Persian Sasanian army led by Rostam. The decisive Muslim victory paved the way for Iraq and Persia.",
      coordinates: [31.5894, 44.1500]
    },
    {
      id: "umar_jerusalem_entry",
      title: "Umar's Peaceful Entry into Jerusalem",
      year: "637 CE",
      description: "Caliph 'Umar travels in person to receive the keys of Jerusalem. He writes the 'Assurance of Umar' securing the rights of Christians, and refuses to pray inside the Church of the Holy Sepulchre so Muslims would not convert it into a mosque.",
      coordinates: [31.7683, 35.2137]
    }
  ],
  historicalMarkers: [
    {
      id: "mosque_amr",
      name: "Mosque of Amr ibn al-Aas",
      type: "landmark",
      coordinates: [30.0101, 31.2331],
      description: "The first mosque built in Egypt and all of Africa (641 CE), standing as a monumental symbol of early Islamic presence."
    },
    {
      id: "great_mosque_kufa",
      name: "Great Mosque of Kufa",
      type: "landmark",
      coordinates: [32.0289, 44.4011],
      description: "One of the oldest mosques in Iraq, built in 639 CE, which served as the center of Caliph Ali's governance and a hotbed of early scholarly activity."
    }
  ]
};
