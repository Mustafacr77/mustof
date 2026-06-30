export interface PersonaPoint {
  name: string;
  coordinates: [number, number]; // [lat, lng]
  description: string;
}

export interface PersonaData {
  id: string;
  name: string;
  title: string;
  timeline: string;
  bio: string;
  color: string;
  icon: string;
  points: PersonaPoint[];
}

export const HISTORICAL_PERSONAS: PersonaData[] = [
  {
    id: "ibn-battuta",
    name: "Ibn Battuta",
    title: "The Supreme Traveler of Dar al-Islam",
    timeline: "1304 - 1369 CE",
    bio: "Shams al-Din Ibn Battuta was a Moroccan Islamic scholar and traveler who left his home in Tangier at age 21 for Hajj. His journey lasted 30 years, covering over 73,000 miles across Africa, the Middle East, India, Southeast Asia, and China, documenting the diverse cultures of the medieval Islamic world.",
    color: "#06b6d4", // Cyan
    icon: "🐫",
    points: [
      {
        name: "Tangier",
        coordinates: [35.7595, -5.8340],
        description: "Birthplace and starting point of his monumental 30-year journey in 1325 CE."
      },
      {
        name: "Cairo",
        coordinates: [30.0444, 31.2357],
        description: "Apostrophized Cairo as the 'mother of cities', marveling at its bustling markets, mosques, and scholarship."
      },
      {
        name: "Damascus",
        coordinates: [33.5138, 36.2947],
        description: "Studied under renowned teachers and praised the unparalleled beauty and civic organization of the Great Umayyad Mosque."
      },
      {
        name: "Makkah",
        coordinates: [21.3891, 39.8579],
        description: "Completed his first Hajj pilgrimage here, spending several subsequent years in intense study of Islamic jurisprudence."
      },
      {
        name: "Baghdad",
        coordinates: [33.3152, 44.3661],
        description: "Visited the former Abbasid capital, describing its recovering colleges, bathhouses, and historical neighborhoods."
      },
      {
        name: "Aden",
        coordinates: [12.7855, 45.0186],
        description: "Sailed to this key port city, chronicling it as a prosperous maritime crossroads linking the Red Sea, East Africa, and India."
      },
      {
        name: "Delhi",
        coordinates: [28.6139, 77.2090],
        description: "Resided for nearly eight years as a chief Qadi (judge) appointed by Sultan Muhammad bin Tughluq of the Delhi Sultanate."
      },
      {
        name: "Guangzhou",
        coordinates: [23.1291, 113.2644],
        description: "Reached the Far East, marveling at Chinese ceramics, paper currency, and the safety of imperial shipping lanes."
      }
    ]
  },
  {
    id: "al-ghazali",
    name: "Imam Al-Ghazali",
    title: "Hujjat al-Islam (The Proof of Islam)",
    timeline: "1058 - 1111 CE",
    bio: "Abu Hamid al-Ghazali was one of the most influential theologians, jurists, and philosophers of Islamic history. He served as the head of Baghdad's premier university before undergoing a profound existential crisis that led him to adopt a life of spiritual retreat and author his masterpiece, the 'Ihya Ulum al-Din'.",
    color: "#10b981", // Emerald
    icon: "📖",
    points: [
      {
        name: "Tus",
        coordinates: [36.4833, 59.5667],
        description: "Birthplace in Khorasan, where he received his early training in Islamic sciences and literature."
      },
      {
        name: "Nishapur",
        coordinates: [36.2133, 58.7958],
        description: "Studied under the celebrated theologian Imam al-Haramayn al-Juwayni at the famous Nizamiyya Academy."
      },
      {
        name: "Baghdad",
        coordinates: [33.3152, 44.3661],
        description: "Appointed rector of the premier Nizamiyya Madrasah, reaching the pinnacle of academic prestige and political influence."
      },
      {
        name: "Damascus",
        coordinates: [33.5138, 36.2947],
        description: "Left his post in Baghdad in pursuit of spiritual truth, living in seclusion inside the minaret of the Umayyad Mosque."
      },
      {
        name: "Jerusalem",
        coordinates: [31.7683, 35.2137],
        description: "Retreated to Al-Aqsa Mosque to engage in deep contemplation, starting the composition of his magnum opus, 'Ihya Ulum al-Din'."
      },
      {
        name: "Makkah",
        coordinates: [21.3891, 39.8579],
        description: "Performed the Hajj pilgrimage to seal his spiritual reformation and vow to avoid royal court politics."
      },
      {
        name: "Tus",
        coordinates: [36.4833, 59.5667],
        description: "Returned home to spend his final years teaching in a small Sufi khanqah (monastery) and madrasah."
      }
    ]
  },
  {
    id: "al-bukhari",
    name: "Imam Al-Bukhari",
    title: "The Master of Hadith Transmission",
    timeline: "810 - 870 CE",
    bio: "Muhammad ibn Isma'il al-Bukhari was a legendary scholar of Persian origin who compiled the 'Sahih al-Bukhari', widely regarded as the most authentic book after the Qur'an. He traveled continuously for 16 years across the Islamic world to filter through over 600,000 traditions.",
    color: "#f59e0b", // Amber
    icon: "✒️",
    points: [
      {
        name: "Bukhara",
        coordinates: [39.7747, 64.4286],
        description: "Born in Transoxiana, where he memorized thousands of Hadith as a child and began critiquing transmitters."
      },
      {
        name: "Makkah",
        coordinates: [21.3891, 39.8579],
        description: "Traveled with his mother and brother for Hajj at age 16, remaining in the sacred city to study under resident masters."
      },
      {
        name: "Madinah",
        coordinates: [24.4672, 39.6111],
        description: "Wrote his pioneering biographical encyclopedia, 'Tarikh al-Kabir', by moonlight next to the Prophet's Mosque ﷺ."
      },
      {
        name: "Basra",
        coordinates: [30.5081, 47.7835],
        description: "Resided in Iraq for long periods, rigorously documenting oral chains of narration and debating jurists."
      },
      {
        name: "Baghdad",
        coordinates: [33.3152, 44.3661],
        description: "Publicly tested by Baghdad's master scholars on mixed-up Hadith chains, proving his flawless, photographic memory."
      },
      {
        name: "Nishapur",
        coordinates: [36.2133, 58.7958],
        description: "Received a hero's welcome by Khorasan scholars; here he mentored Imam Muslim, compiler of Sahih Muslim."
      },
      {
        name: "Khartank",
        coordinates: [39.7523, 67.0315],
        description: "Passed away in a quiet village near Samarkand following political tensions with the governor of Bukhara."
      }
    ]
  },
  {
    id: "ibn-khaldun",
    name: "Ibn Khaldun",
    title: "The Pioneer of Historiography & Sociology",
    timeline: "1332 - 1406 CE",
    bio: "Abd al-Rahman Ibn Khaldun was an Andalusian-Moroccan polymath who pioneered modern sociology, historiography, and economics. Through a turbulent political career in North Africa and Spain, he analyzed the rise and fall of civilizations based on the concept of 'Asabiyyah (social cohesion).",
    color: "#ec4899", // Pink
    icon: "👑",
    points: [
      {
        name: "Tunis",
        coordinates: [36.8065, 10.1815],
        description: "Born to a prominent family from Seville, receiving an elite education until the Black Plague decimated Tunis."
      },
      {
        name: "Fez",
        coordinates: [34.0181, -5.0078],
        description: "Appointed to the royal court of the Marinid dynasty, working in the royal secretariat and debating global scholars."
      },
      {
        name: "Granada",
        coordinates: [37.1773, -3.5986],
        description: "Sent on a highly sensitive peace mission to Seville to negotiate with King Pedro of Castile on behalf of the Sultan of Granada."
      },
      {
        name: "Tlemcen",
        coordinates: [34.8817, -1.3167],
        description: "Sheltered in the Castle of Ibn Salama among tribal chiefs, penning the legendary 'Muqaddimah' (The Introduction)."
      },
      {
        name: "Cairo",
        coordinates: [30.0444, 31.2357],
        description: "Found sanctuary in Egypt, serving as the Grand Maliki Judge of Cairo and lecturing at the historic Al-Azhar Mosque."
      },
      {
        name: "Damascus",
        coordinates: [33.5138, 36.2947],
        description: "Famously lowered in a basket from the Damascus city walls to hold a series of fascinating intellectual audiences with the conqueror Tamerlane."
      }
    ]
  }
];
