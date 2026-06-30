export interface LocationData {
  id: string;
  name: string;
  region: string;
  modernCountry: string;
  coordinates: [number, number]; // [lat, lng]
  layers: string[];
  eras: string[];
  significance: string;
  keyEvents: string[];
  relatedPeople: string[];
  quranReferences: string[];
  hadithReferences: string[];
  lessons: string[];
  citations: string[];
}

export interface RouteData {
  id: string;
  name: string;
  type: 'trade' | 'empire';
  color: string;
  dashArray?: string;
  coordinates: [number, number][];
  eras: string[];
}

export const HISTORICAL_ERAS = [
  {
    id: "pre-islamic",
    name: "Pre-Islamic Arabia",
    timeline: "Before 610 CE",
    description: "The era of Jahiliyyah, characterized by tribal structures, poetic traditions, trade hubs like Makkah, and regional monotheistic or polytheistic influences before the prophetic call."
  },
  {
    id: "prophetic",
    name: "The Life of Prophet Muhammad ﷺ",
    timeline: "610 - 632 CE",
    description: "The descent of revelation, the early struggle in Makkah, the migration (Hijrah) to Madinah, the establishment of the first Islamic polity, and the consolidation of Islam across the Arabian Peninsula."
  },
  {
    id: "rashidun",
    name: "The Rashidun Caliphate",
    timeline: "632 - 661 CE",
    description: "The leadership of the Four Rightly Guided Caliphs—Abu Bakr, 'Umar, 'Uthman, and 'Ali (may Allah be pleased with them)—marked by significant expansion, codification of the Qur'an, and administrative development."
  },
  {
    id: "umayyad",
    name: "Umayyad",
    timeline: "661 - 750 CE",
    description: "The establishment of the caliphate in Damascus, rapid expansion across North Africa, Spain (Al-Andalus), and parts of Central Asia, accompanied by architectural milestones like the Dome of the Rock."
  },
  {
    id: "abbasid",
    name: "Abbasid",
    timeline: "750 - 1258 CE",
    description: "The Golden Age of Islamic civilization centered in Baghdad. Characterized by the Translation Movement, house of wisdom (Bayt al-Hikmah), scientific triumphs, and philosophical codification."
  },
  {
    id: "al-andalus",
    name: "Al-Andalus",
    timeline: "711 - 1492 CE",
    description: "The multi-century presence of Islamic civilization in the Iberian Peninsula (modern Spain and Portugal), defined by co-existence (Convivencia), monumental libraries in Cordoba, and agricultural innovations."
  },
  {
    id: "ottoman",
    name: "Ottoman",
    timeline: "1299 - 1922 CE",
    description: "The rise and expansion of the state centered in Istanbul (formerly Constantinople), uniting the eastern Mediterranean, the Balkans, parts of North Africa, and the Hejaz under a centralized caliphate."
  },
  {
    id: "modern",
    name: "Modern Era",
    timeline: "Post 1922 CE",
    description: "The contemporary landscape following the dissolution of the Ottoman state, marked by nation-states, global migration, preservation of heritage sites, and revitalized scholarship."
  }
];

export const MAP_LAYERS = [
  { id: "Sacred Places", color: "#10b981", icon: "🕌" }, // Emerald
  { id: "Seerah Locations", color: "#f59e0b", icon: "🐪" }, // Amber
  { id: "Centers of Knowledge", color: "#3b82f6", icon: "📖" }, // Blue
  { id: "Caliphates & Empires", color: "#ec4899", icon: "👑" }, // Pink
  { id: "Trade Routes", color: "#8b5cf6", icon: "🐫" }, // Violet
  { id: "Scholars", color: "#06b6d4", icon: "✒️" }, // Cyan
  { id: "Major Battles", color: "#ef4444", icon: "🛡️" }, // Red
  { id: "Historic Mosques", color: "#14b8a6", icon: "⭐" } // Teal
];

export const LOCATIONS: LocationData[] = [
  {
    id: "makkah",
    name: "Makkah",
    region: "Hejaz, Arabian Peninsula",
    modernCountry: "Saudi Arabia",
    coordinates: [21.3891, 39.8579],
    layers: ["Sacred Places", "Seerah Locations", "Historic Mosques"],
    eras: ["Pre-Islamic Arabia", "Prophetic Era", "Rashidun", "Umayyad", "Abbasid", "Ottoman", "Modern Era"],
    significance: "The absolute spiritual center of Islam. Home to the Ka'bah, the sanctuary built by Prophet Ibrahim (Abraham) and Ismail, and the birthplace of Prophet Muhammad ﷺ.",
    keyEvents: [
      "Rebuilding of the Ka'bah by Ibrahim and Ismail (peace be upon them)",
      "Birth of the Prophet Muhammad ﷺ in 570 CE",
      "Descent of the first Qur'anic revelations in Cave Hira (610 CE)",
      "The Conquest of Makkah (630 CE), purifying the Ka'bah of idols",
      "The Farewell Pilgrimage (Hajjat al-Wada') of the Prophet ﷺ"
    ],
    relatedPeople: [
      "Prophet Ibrahim (Abraham) (as)",
      "Prophet Ismail (Ishmael) (as)",
      "Hajar (Hagar) (ra)",
      "Prophet Muhammad ﷺ",
      "Khadijah bint Khuwaylid (ra)",
      "Abu Bakr al-Siddiq (ra)"
    ],
    quranReferences: [
      "Surah Al-Imran (3:96): 'Indeed, the first House [of worship] established for mankind was that at Bakkah [Makkah] - blessed and a guidance for the worlds.'",
      "Surah Ibrahim (14:37): 'Our Lord, I have settled some of my descendants in an uncultivated valley near Your sacred House...'"
    ],
    hadithReferences: [
      "Sahih al-Bukhari: 'Prayer in this mosque of mine (in Madinah) is better than a thousand prayers in any other mosque, except the Sacred Mosque (in Makkah).'"
    ],
    lessons: [
      "Centrality of pure monotheism (Tawhid) as established by Prophet Ibrahim.",
      "Patience and perseverance demonstrated during the thirteen years of the Meccan period.",
      "The power of forgiveness demonstrated at the Conquest of Makkah."
    ],
    citations: [
      "Ibn Hisham, 'Al-Seerah al-Nabawiyyah' (The Prophetic Biography)",
      "Al-Azraqi, 'Akhbar Makkah' (History of Makkah)",
      "Sahih al-Bukhari, Book of Hajj"
    ]
  },
  {
    id: "madinah",
    name: "Madinah (Yathrib)",
    region: "Hejaz, Arabian Peninsula",
    modernCountry: "Saudi Arabia",
    coordinates: [24.4672, 39.6111],
    layers: ["Sacred Places", "Seerah Locations", "Centers of Knowledge", "Historic Mosques"],
    eras: ["Pre-Islamic Arabia", "Prophetic Era", "Rashidun", "Umayyad", "Abbasid", "Ottoman", "Modern Era"],
    significance: "The sanctuary city of the Hijrah (Migration) where the first Islamic society and state were established. Burial site of Prophet Muhammad ﷺ and home of his blessed Mosque (Al-Masjid an-Nabawi).",
    keyEvents: [
      "The Hijrah (Migration) from Makkah to Yathrib in 622 CE, marking the start of the Islamic calendar",
      "Drafting of the Covenant of Madinah, establishing mutual rights among diverse populations",
      "Establishment of Al-Masjid an-Nabawi and the institution of the Adhan (Call to Prayer)",
      "Burial of the Prophet ﷺ (632 CE) and his primary companions",
      "Serving as the central administrative capital of the Rashidun Caliphate"
    ],
    relatedPeople: [
      "Prophet Muhammad ﷺ",
      "The Ansar (helpers) and Muhajirun (emigrants)",
      "Sa'd ibn Mu'adh (ra)",
      "Aisha bint Abi Bakr (ra)",
      "Imam Malik ibn Anas (ra) (the Imam of Dar al-Hijrah)"
    ],
    quranReferences: [
      "Surah At-Tawbah (9:100): 'And the first forerunners [in the faith] among the Muhajireen and the Ansar and those who followed them with good conduct - Allah is pleased with them and they are pleased with Him...'"
    ],
    hadithReferences: [
      "Sahih Muslim: 'O Allah, Ibrahim was Your servant, friend, and prophet, and he supplicated to You for Makkah. I am Your servant and prophet, and I supplicate to You for Madinah, like that which Ibrahim supplicated for Makkah, and the like of it with it.'"
    ],
    lessons: [
      "The brotherhood established between the Ansar and Muhajirun as a foundational social model.",
      "The development of detailed governance, social ethics, and legislative guidelines.",
      "The preservation of the Sunnah through the early school of Madinah scholars."
    ],
    citations: [
      "Ibn Kathir, 'Al-Bidayah wa'l-Nihayah' (The Beginning and the End)",
      "Imam Malik, 'Al-Muwatta' (Introduction on Madinah practices)",
      "Al-Samhudi, 'Wafa al-Wafa' (History of Madinah)"
    ]
  },
  {
    id: "jerusalem",
    name: "Jerusalem (Al-Quds)",
    region: "Levant",
    modernCountry: "Palestine / Israel",
    coordinates: [31.7683, 35.2137],
    layers: ["Sacred Places", "Seerah Locations", "Centers of Knowledge", "Historic Mosques"],
    eras: ["Pre-Islamic Arabia", "Prophetic Era", "Rashidun", "Umayyad", "Abbasid", "Ottoman", "Modern Era"],
    significance: "The first Qiblah (direction of prayer) of Muslims, the third holiest sanctuary (Al-Aqsa Mosque), and the site of the Prophet's miraculous Night Journey and Ascension (Al-Isra' wa'l-Mi'raj).",
    keyEvents: [
      "The Night Journey and Ascension (Isra' and Mi'raj) around 621 CE, where the Prophet ﷺ led all prophets in prayer",
      "Peaceful entry of Caliph 'Umar ibn al-Khattab (ra) in 637 CE, issuing the Assurance of 'Umar securing religious freedoms",
      "Construction of the Dome of the Rock by Umayyad Caliph 'Abd al-Malik ibn Marwan (691 CE)",
      "Liberation of Jerusalem by Salah al-Din al-Ayyubi in 1187 CE from Crusader control"
    ],
    relatedPeople: [
      "Prophet Dawud (David) and Sulayman (Solomon) (as)",
      "Prophet 'Isa (Jesus) and Maryam (as)",
      "Prophet Muhammad ﷺ",
      "Caliph 'Umar ibn al-Khattab (ra)",
      "Salah al-Din al-Ayyubi (Saladin)"
    ],
    quranReferences: [
      "Surah Al-Isra (17:1): 'Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed, to show him of Our signs...'"
    ],
    hadithReferences: [
      "Sahih al-Bukhari: 'Do not undertake a journey to visit any mosque but three: the Sacred Mosque (Makkah), this Mosque of mine (Madinah), and the Mosque of Al-Aqsa (Jerusalem).'"
    ],
    lessons: [
      "The continuous prophetic lineage linking Islam to previous revelations.",
      "Just governance and protection of minority faith populations as shown by Caliph 'Umar and Salah al-Din.",
      "The spiritual elevation of the heart represented in the ascension (Mi'raj)."
    ],
    citations: [
      "Ibn al-Jawzi, 'Fada'il al-Quds' (Virtues of Jerusalem)",
      "Mujir al-Din, 'Al-Uns al-Jalil' (The Glorious History of Jerusalem and Hebron)",
      "Al-Tabari, 'Tarikh al-Rusul wa'l-Muluk' (History of the Prophets and Kings)"
    ]
  },
  {
    id: "cairo",
    name: "Cairo (Al-Qahirah / Fustat)",
    region: "Egypt",
    modernCountry: "Egypt",
    coordinates: [30.0444, 31.2357],
    layers: ["Centers of Knowledge", "Caliphates & Empires", "Scholars", "Historic Mosques"],
    eras: ["Rashidun", "Umayyad", "Abbasid", "Ottoman", "Modern Era"],
    significance: "Founded initially as Fustat by 'Amr ibn al-'As, and later expanded as Al-Qahirah. It is the home of Al-Azhar University, one of the world's oldest and most prestigious hubs of Islamic theology and jurisprudence.",
    keyEvents: [
      "Foundation of Fustat in 641 CE under Rashidun rule",
      "Establishment of the Fatimid capital Al-Qahirah and construction of Al-Azhar Mosque (970-972 CE)",
      "Cairo becomes the intellectual and defensive bulwark during the Mongol sacking of Baghdad",
      "Re-establishment of the educational network under Mamluk and Ottoman periods"
    ],
    relatedPeople: [
      "Amr ibn al-A's (ra)",
      "Imam Al-Shafi'i (Buried in Cairo)",
      "Ibn Hajar al-Asqalani (Hadith Master)",
      "Al-Sultan Salah al-Din al-Ayyubi"
    ],
    quranReferences: [
      "Surah Yusuf (12:21): 'And the one from Egypt who bought him said to his wife, \"Make his residence comfortable...\"'",
      "Surah Yunus (10:87): 'And We inspired Moses and his brother, \"Settle your people in Egypt in houses and make your houses places of worship...\"'"
    ],
    hadithReferences: [
      "Sahih Muslim: 'You will conquer Egypt, a land where the Qirat (unit of measure) is mentioned. Treat its people well, for they have protection and lineage (through Hajar).'"
    ],
    lessons: [
      "The structural adaptation of regional capitals from military garrisons to massive scholarly cities.",
      "The intellectual continuity of Islamic legal traditions represented by Imam al-Shafi'i's Egyptian school (Al-Jadeed).",
      "Protection of heritage during times of global geopolitical chaos."
    ],
    citations: [
      "Al-Maqrizi, 'Al-Mawaiz wa al-I'tibar' (Historical Topography of Cairo)",
      "Ibn Taghribirdi, 'Al-Nujum al-Zahirah' (The Brilliant Stars of Egyptian History)",
      "Jalal al-Din al-Suyuti, 'Husn al-Muhadarah fi Tarikh Misr wa al-Qahirah'"
    ]
  },
  {
    id: "damascus",
    name: "Damascus (Dimashq)",
    region: "Levant",
    modernCountry: "Syria",
    coordinates: [33.5138, 36.2947],
    layers: ["Centers of Knowledge", "Caliphates & Empires", "Scholars", "Historic Mosques"],
    eras: ["Rashidun", "Umayyad", "Abbasid", "Ottoman", "Modern Era"],
    significance: "One of the oldest continuously inhabited cities in the world. It served as the brilliant capital of the Umayyad Caliphate and is home to the stunning Umayyad Mosque (Great Mosque of Damascus).",
    keyEvents: [
      "Peaceful expansion under Abu Ubaidah ibn al-Jarrah and Khalid ibn al-Walid in 634 CE",
      "Declared capital of the global Umayyad Empire in 661 CE by Caliph Mu'awiyah",
      "Inauguration of the Great Umayyad Mosque by Caliph Al-Walid I (715 CE)",
      "A primary regional base for scholarly compilation of Hadith and Hanafi/Hanbali law"
    ],
    relatedPeople: [
      "Khalid ibn al-Walid (ra)",
      "Umayyad Caliph Umar ibn Abd al-Aziz (ra)",
      "Ibn Taymiyyah (scholarly giant of Damascus)",
      "Ibn Kathir (historian and Qur'an commentator)"
    ],
    quranReferences: [
      "Surah At-Tin (95:1): 'By the fig and the olive' (traditionally interpreted by classical scholars like Ibn Kathir as referring to the blessed land of Damascus/Levant)."
    ],
    hadithReferences: [
      "Sunan At-Tirmidhi: 'The Prophet ﷺ said: \"How blessed is Ash-Sham (Greater Syria)!\" We said, \"Why is that, O Messenger of Allah?\" He replied, \"Because the angels of the Most Merciful spread their wings over it.\"'",
      "Sahih Muslim: 'The descent of Isa (Jesus) ibn Maryam near the white minaret in the east of Damascus.'"
    ],
    lessons: [
      "Strategic adaptation of administrative frameworks from Byzantine systems during the early Caliphate.",
      "The value of architectural aesthetics in establishing civilization landmarks.",
      "The spiritual status of Ash-Sham in theological and eschatological traditions."
    ],
    citations: [
      "Ibn 'Asakir, 'Tarikh Dimashq' (The History of Damascus - 80 volumes)",
      "Ibn Kathir, 'Al-Bidayah wa'l-Nihayah'",
      "Al-Dhahabi, 'Siyar A'lam al-Nubala' (Biographies of Noble Figures)"
    ]
  },
  {
    id: "baghdad",
    name: "Baghdad",
    region: "Iraq / Mesopotamia",
    modernCountry: "Iraq",
    coordinates: [33.3152, 44.3661],
    layers: ["Centers of Knowledge", "Caliphates & Empires", "Scholars", "Historic Mosques"],
    eras: ["Abbasid", "Ottoman", "Modern Era"],
    significance: "Founded by Abbasid Caliph Al-Mansur as the 'City of Peace' (Madinat al-Salam). It was the intellectual jewel of the world, housing the House of Wisdom (Bayt al-Hikmah) during the Islamic Golden Age.",
    keyEvents: [
      "Inauguration of the round city by Caliph Al-Mansur in 762 CE",
      "Establishment of Bayt al-Hikmah (House of Wisdom), translating thousands of philosophical works from Greek, Sanskrit, and Persian",
      "Flourishing of the four major Sunni schools of legal jurisprudence (fiqh) and scientific giants",
      "Tragic sacking of Baghdad by the Mongol Empire in 1258 CE, marking a structural end to the classical Abbasid golden era"
    ],
    relatedPeople: [
      "Abbasid Caliph Harun al-Rashid",
      "Imam Abu Hanifah (buried in Baghdad)",
      "Imam Ahmad ibn Hanbal (scholar of Baghdad)",
      "Al-Khwarizmi (inventor of Algebra)",
      "Imam Abu Hamid al-Ghazali (taught at the Nizamiyyah College)"
    ],
    quranReferences: [
      "Surah Yunus (10:25): 'And Allah invites to the Home of Peace [Dar al-Salam]...' (Classical commentators often noted this spiritual term was adapted by Al-Mansur for the city's official title)."
    ],
    hadithReferences: [
      "Hadith traditions concerning Iraq as a cradle of early tribulations, yet also a source of abundant scholars and spiritual pivots (Abdal)."
    ],
    lessons: [
      "The deep harmony between spiritual values and rational scientific exploration (astronomy, algebra, medicine).",
      "The tragedy of intellectual stagnation when central institutions fail to safeguard themselves.",
      "The synthesis of multicultural scholars working collaboratively under an Islamic framework."
    ],
    citations: [
      "Al-Khatib al-Baghdadi, 'Tarikh Baghdad' (History of Baghdad)",
      "Ibn al-Athir, 'Al-Kamil fi al-Tarikh' (The Complete History)",
      "Yaqut al-Hamawi, 'Mu'jam al-Buldan' (Dictionary of Countries)"
    ]
  },
  {
    id: "cordoba",
    name: "Cordoba (Qurtubah)",
    region: "Iberian Peninsula (Al-Andalus)",
    modernCountry: "Spain",
    coordinates: [37.8882, -4.7794],
    layers: ["Centers of Knowledge", "Caliphates & Empires", "Scholars", "Historic Mosques"],
    eras: ["Al-Andalus", "Modern Era"],
    significance: "The shining capital of the Umayyad Emirate and Caliphate of Cordoba. It stood as Western Europe's most civilized city, famed for its massive libraries, street lighting, and the Great Mosque (Mezquita).",
    keyEvents: [
      "Establishment of the independent Umayyad emirate by Abd al-Rahman I (Al-Dakhil) in 756 CE",
      "Inauguration and expansion of the Great Mosque of Cordoba (beginning 785 CE)",
      "Cordoba achieves peak growth under Abd al-Rahman III, boasting over 70 libraries and 500,000 citizens",
      "Fall of Cordoba to Castilian forces in 1236 CE"
    ],
    relatedPeople: [
      "Abd al-Rahman I (The Falcon of Quraish)",
      "Ibn Rushd (Averroes) (Polymath and Philosopher)",
      "Ibn Hazm al-Andalusi (Master scholar and author)",
      "Al-Qurtubi (classical Qur'an commentator)"
    ],
    quranReferences: [
      "Surah Al-A'raf (7:128): 'Indeed, the earth belongs to Allah. He causes to inherit it whom He wills of His servants...'"
    ],
    hadithReferences: [
      "Prophetic counsel of traveling to expand knowledge and learning from the wisdom found throughout the earth."
    ],
    lessons: [
      "The model of cross-faith coexistence (Convivencia) where Jewish, Christian, and Muslim scholars translated philosophy.",
      "Civilizational investment in infrastructure (paved roads, water mills, aqueducts, public baths).",
      "The transient nature of political power if domestic unity and ethical standards are compromised."
    ],
    citations: [
      "Al-Maqqari, 'Nafh al-Tib' (The Fragrant Breeze from Al-Andalus)",
      "Ibn Hayyan, 'Al-Muqtabis' (History of Al-Andalus)",
      "Dozy, 'Histoire des Musulmans d'Espagne'"
    ]
  },
  {
    id: "istanbul",
    name: "Istanbul (Kostantiniyye)",
    region: "Anatolia / Thrace",
    modernCountry: "Turkey",
    coordinates: [41.0082, 28.9784],
    layers: ["Sacred Places", "Centers of Knowledge", "Caliphates & Empires", "Historic Mosques"],
    eras: ["Ottoman", "Modern Era"],
    significance: "The bridging capital between East and West. Captured in 1453 by Sultan Mehmed II, fulfilling a famous prophetic prediction. It served as the final seat of the historical Ottoman Caliphate.",
    keyEvents: [
      "The Conquest of Constantinople in 1453 CE by Sultan Mehmed II (Fatih)",
      "Conversion of Hagia Sophia into a Mosque and architectural masterpieces designed by Mimar Sinan",
      "Arrival of the Caliphate relics to Topkapi Palace (1517 CE), consolidating spiritual leadership in Istanbul",
      "Serving as the global administrative capital of the Ottoman state until the early 20th century"
    ],
    relatedPeople: [
      "Abu Ayyub al-Ansari (ra) (buried in Istanbul, early companion)",
      "Sultan Mehmed II (The Conqueror)",
      "Sultan Suleiman the Magnificent",
      "Mimar Sinan (Master Architect)"
    ],
    quranReferences: [
      "Surah Saba (34:15): 'A good land [and people] and a forgiving Lord.' (Historically, Ottoman writers frequently referred to Istanbul and its blessed domains in light of this verse)."
    ],
    hadithReferences: [
      "Musnad Ahmad: 'Verily you shall conquer Constantinople. What a wonderful leader will her leader be, and what a wonderful army will that army be!'"
    ],
    lessons: [
      "The long-term patience required to realize prophetic visions across centuries.",
      "The integration of classical Islamic geometry with local Byzantine architectural styles.",
      "The logistical capability of organizing a massive, multi-ethnic empire across three continents."
    ],
    citations: [
      "Evliya Çelebi, 'Seyahatname' (Book of Travels)",
      "Aşıkpaşazade, 'Tevarih-i Al-i Osman' (Chronicles of the House of Osman)",
      "Franz Babinger, 'Mehmed the Conqueror and His Time'"
    ]
  },
  {
    id: "samarkand",
    name: "Samarkand",
    region: "Transoxiana / Central Asia",
    modernCountry: "Uzbekistan",
    coordinates: [39.6542, 66.9597],
    layers: ["Centers of Knowledge", "Caliphates & Empires", "Scholars", "Historic Mosques"],
    eras: ["Abbasid", "Ottoman", "Modern Era"],
    significance: "One of the oldest continuously inhabited cities in Central Asia. An essential trading node on the Silk Road and a legendary center of Islamic scholarship, mathematical astronomy, and architecture (The Registan).",
    keyEvents: [
      "Arrival of Islam in Transoxiana in the early 8th century under Qutayba ibn Muslim",
      "Establishment of the world's first Islamic paper mill, initiating an intellectual revolution across Asia and Europe",
      "Capital of the Timurid Empire, resulting in majestic architectural expansion (Bibi-Khanym Mosque)",
      "Constructing the Ulugh Beg Observatory (1420 CE), calculating astronomical years with unprecedented accuracy"
    ],
    relatedPeople: [
      "Qutayba ibn Muslim",
      "Imam Al-Maturidi (Foundational theologian of creed)",
      "Ulugh Beg (Sultan, Mathematician, and Astronomer)",
      "Ibn Sina (Avicenna - studied and spent years in the region)"
    ],
    quranReferences: [
      "Surah Al-An'am (6:11): 'Say, \"Travel through the land; then observe how was the end of the deniers.\"' (Central Asian scholars emphasized travel for observational science and trade)."
    ],
    hadithReferences: [
      "Hadith counseling the pursuit of knowledge across vast geographical expanses, even to remote horizons."
    ],
    lessons: [
      "The historical role of Central Asia as an intellectual bridge between China, India, and the Islamic heartlands.",
      "The role of material innovation (paper-making) in scaling religious and scientific literature.",
      "How geographic remoteness did not deter intellectual unity with the Hijaz and Iraq."
    ],
    citations: [
      "Al-Narshakhi, 'Tarikh Bukhara' (covers Transoxiana region)",
      "Ibn Battuta, 'Rihlah' (The Travels of Ibn Battuta)",
      "V.V. Barthold, 'Turkestan Down to the Mongol Invasion'"
    ]
  },
  {
    id: "bukhara",
    name: "Bukhara",
    region: "Transoxiana / Central Asia",
    modernCountry: "Uzbekistan",
    coordinates: [39.7747, 64.4286],
    layers: ["Centers of Knowledge", "Scholars", "Historic Mosques"],
    eras: ["Abbasid", "Ottoman", "Modern Era"],
    significance: "The intellectual birthplace of Imam Muhammad ibn Ismail al-Bukhari, compiler of Sahih al-Bukhari (the most authentic book after the Qur'an). A highly spiritual city housing the Kalyan Minaret and hundreds of ancient madrasas.",
    keyEvents: [
      "Establishment of Islam in Bukhara (around 709 CE)",
      "Bukhara becomes the cultural capital of the Samanid Dynasty, rivaling Baghdad's scientific circles",
      "Birth, exile, and scholarly compilation journey of Imam al-Bukhari",
      "Sustaining deep traditional theological sciences through Soviet and modern eras under extreme pressure"
    ],
    relatedPeople: [
      "Imam al-Bukhari (Master of Hadith Science)",
      "Ibn Sina (Avicenna - born in Afshana near Bukhara)",
      "Baha-ud-Din Naqshband (spiritual guide and teacher)",
      "Imam Al-Ghazali's students who settled in Central Asia"
    ],
    quranReferences: [
      "Surah Fatir (35:28): 'Only those fear Allah, from among His servants, who have knowledge...'"
    ],
    hadithReferences: [
      "Sahih al-Bukhari opening chapter: 'Actions are judged by intentions...' compiled and scrutinized by Bukhara's native son."
    ],
    lessons: [
      "The rigor of scientific critical analysis developed for compiling and authenticating historical reports.",
      "The emergence of Central Asia as the powerhouse of Islamic textual authentication.",
      "The absolute endurance of sacred traditions despite aggressive political secularization."
    ],
    citations: [
      "Al-Narshakhi, 'Tarikh Bukhara' (History of Bukhara)",
      "Ibn Khallikan, 'Wafayat al-A'yan' (Obituaries of Eminent Men)",
      "Sahih al-Bukhari, Biographical introductions"
    ]
  },
  {
    id: "taif",
    name: "Ta'if",
    region: "Hejaz, Arabian Peninsula",
    modernCountry: "Saudi Arabia",
    coordinates: [21.2631, 40.4150],
    layers: ["Seerah Locations", "Sacred Places"],
    eras: ["Pre-Islamic Arabia", "Prophetic Era", "Rashidun", "Umayyad", "Abbasid", "Ottoman", "Modern Era"],
    significance: "A high-altitude mountain city where the Prophet ﷺ sought refuge from Meccan persecution, met with intense hardship, and responded with sublime mercy and prayer rather than retribution.",
    keyEvents: [
      "The Prophet's journey to Ta'if (619 CE) and rejection by the leaders of Banu Thaqif",
      "The prayer of the Prophet ﷺ under the orchard grapevines, choosing mercy over destruction of the city",
      "The Battle and Siege of Ta'if (630 CE) following the victory at Hunayn",
      "The conversion of Banu Thaqif and subsequent transformation of Ta'if into a peaceful agricultural and academic center"
    ],
    relatedPeople: [
      "Prophet Muhammad ﷺ",
      "Zayd ibn Harithah (ra)",
      "Addas (the Christian boy who embraced the Prophet)",
      "Angel of the Mountains"
    ],
    quranReferences: [
      "Surah Az-Zukhruf (43:31): 'And they said, \"Why was this Qur'an not sent down upon a great man from one of the two cities [Makkah and Ta\'if]?\"'"
    ],
    hadithReferences: [
      "Sahih al-Bukhari: \'O Prophet of Allah, if you wish, I will bring together the two mountains (Al-Akhshabayn) upon them.\' The Prophet ﷺ replied, \'Rather, I hope that Allah will bring from their descendants those who worship Allah alone...\'"
    ],
    lessons: [
      "Choosing long-term hope and mercy over immediate retribution.",
      "The vulnerability of sincere prayer (Du'a) during moments of profound isolation.",
      "How divine openings often succeed great spiritual trials."
    ],
    citations: [
      "Ibn Ishaq, 'Sirat Rasul Allah'",
      "Martin Lings, 'Muhammad: His Life Based on the Earliest Sources'",
      "Al-Waqidi, 'Kitab al-Maghazi' (Book of Expeditions)"
    ]
  },
  {
    id: "badr",
    name: "Badr",
    region: "Hejaz, Arabian Peninsula",
    modernCountry: "Saudi Arabia",
    coordinates: [23.7788, 38.7897],
    layers: ["Seerah Locations", "Major Battles"],
    eras: ["Prophetic Era"],
    significance: "The valley where the first decisive battle of Islam occurred. A small group of poorly equipped Muslims stood firm and secured a critical spiritual and political victory against the odds.",
    keyEvents: [
      "The Battle of Badr (17th Ramadan, 2 AH / 624 CE)",
      "The Prophet's urgent night prayer in the shelter, crying out for divine assistance",
      "The miraculous descent of angels to aid and strengthen the believers on the sandhills",
      "The burial of the fourteen early Muslim martyrs in the Badr valley cemetery"
    ],
    relatedPeople: [
      "Prophet Muhammad ﷺ",
      "Abu Bakr al-Siddiq (ra)",
      "Hamzah ibn 'Abd al-Muttalib (ra)",
      "Ali ibn Abi Talib (ra)",
      "Mus'ab ibn 'Umayr (ra)"
    ],
    quranReferences: [
      "Surah Al-Imran (3:123): \'And Allah had already given you victory at [the battle of] Badr while you were few. Then fear Allah; perhaps you will be grateful.\'"
    ],
    hadithReferences: [
      "Sahih Muslim: \'O Allah, if this small band of Muslims is defeated, You will not be worshipped on this earth.\' He continued praying until his cloak fell from his shoulders."
    ],
    lessons: [
      "Victory does not depend on numbers or material superiority, but on absolute reliance on the Divine (Tawakkul).",
      "Sincerity in prayer during desperate hours is answered directly.",
      "The high spiritual status of those who stood firm in the first hours of trials."
    ],
    citations: [
      "Ibn Hisham, 'Al-Seerah al-Nabawiyyah'",
      "Safyur-Rahman Al-Mubarakpuri, 'The Sealed Nectar'",
      "Sahih Muslim, Book of Jihad and Expeditions"
    ]
  },
  {
    id: "uhud",
    name: "Mount Uhud",
    region: "Hejaz, Arabian Peninsula",
    modernCountry: "Saudi Arabia",
    coordinates: [24.5028, 39.6152],
    layers: ["Seerah Locations", "Major Battles"],
    eras: ["Prophetic Era"],
    significance: "The majestic red mountain north of Madinah, site of the critical second major battle of Islam, which offered timeless lessons about discipline, testing, and love for the Prophet ﷺ.",
    keyEvents: [
      "The Battle of Uhud (3 AH / 625 CE) where early strategic success was reversed",
      "The archers leaving their post on the hill, exposing the flank to a surprise charge",
      "The injury of the Prophet ﷺ and the fierce defense of his person by dedicated companions",
      "The martyrdom of Hamzah (ra) and 70 companions, buried on the battlefield plains"
    ],
    relatedPeople: [
      "Prophet Muhammad ﷺ",
      "Hamzah ibn 'Abd al-Muttalib (ra) (Leader of Martyrs)",
      "Mus'ab ibn 'Umayr (ra)",
      "Nusaybah bint Ka'b (Umm 'Umarah - fierce defender)",
      "Khalid ibn al-Walid (tactical commander of Quraysh flank)"
    ],
    quranReferences: [
      "Surah Al-Imran (3:152): \'And Allah had certainly fulfilled His promise to you when you were killing the enemy by His permission until [the time] when you lost courage and fell to disputing...\'"
    ],
    hadithReferences: [
      "Sahih al-Bukhari: \'Uhud is a mountain that loves us and we love it.\' The Prophet ﷺ walked upon it, and it shook, prompting him to say: \'Be firm, Uhud, for upon you is a Prophet, a Siddiq, and two martyrs.\'"
    ],
    lessons: [
      "The severe consequences of spiritual lapses and disobeying explicit prophetic guidelines.",
      "Trials and setbacks are essential filters that distinguish true commitment from superficial claims.",
      "The deep, affectionate bond between the Prophet and the natural creation, exemplified by the mountain itself."
    ],
    citations: [
      "Ibn Kathir, 'Al-Bidayah wa'l-Nihayah' (The Beginning and the End)",
      "Ibn Hisham, 'Al-Seerah al-Nabawiyyah'",
      "Sahih al-Bukhari, Book of Expeditions"
    ]
  },
  {
    id: "khaybar",
    name: "Khaybar",
    region: "Hejaz, Arabian Peninsula",
    modernCountry: "Saudi Arabia",
    coordinates: [25.6261, 39.3175],
    layers: ["Seerah Locations", "Major Battles"],
    eras: ["Prophetic Era"],
    significance: "An ancient volcanic oasis famous for its massive fortifications, date groves, and the strategic treaty/campaign of 7 AH that secured the northern flank of the early state.",
    keyEvents: [
      "The march to Khaybar (7 AH / 628 CE) following the Treaty of Hudaybiyyah",
      "The gradual capture of the formidable stone forts (Qamus, Na'im, Saab) over several days",
      "The standard of leadership given to Imam Ali (ra) to capture the final redoubt",
      "The treaty allowing farmers to remain on their lands, establishing unique early Islamic agricultural property laws"
    ],
    relatedPeople: [
      "Prophet Muhammad ﷺ",
      "Ali ibn Abi Talib (ra) (the bearer of the standard)",
      "Safiyyah bint Huyayy (ra) (who subsequently married the Prophet ﷺ)",
      "Sahl ibn Sa'd (ra)"
    ],
    quranReferences: [
      "Surah Al-Fath (48:18): \'Indeed, Allah was pleased with the believers when they pledged allegiance to you under the tree... and rewarded them with an imminent victory [often identified as Khaybar]\'"
    ],
    hadithReferences: [
      "Sahih al-Bukhari: \'Tomorrow I will give the standard to a man who loves Allah and His Messenger, and whom Allah and His Messenger love. Allah will grant victory through his hands.\'"
    ],
    lessons: [
      "True strength lies in patience and persistence against massive defensive fortifications.",
      "Fairness in post-victory contracts, upholding rights of farming communities.",
      "The standard of spiritual courage (Futuwwah) exemplified by Ali ibn Abi Talib."
    ],
    citations: [
      "Ibn Hisham, 'Al-Seerah al-Nabawiyyah'",
      "Al-Tabari, 'History of the Prophets and Kings', Vol. 8",
      "Sahih al-Bukhari, Book of Khaybar"
    ]
  },
  {
    id: "hudaybiyyah",
    name: "Hudaybiyyah",
    region: "Hejaz, Arabian Peninsula",
    modernCountry: "Saudi Arabia",
    coordinates: [21.4325, 39.6145],
    layers: ["Seerah Locations", "Sacred Places"],
    eras: ["Prophetic Era"],
    significance: "The plain where the historic Treaty of Hudaybiyyah was signed, demonstrating supreme strategic diplomacy, patience under pressure, and the Pledge of Pleasure under the tree (Bay'at al-Ridwan).",
    keyEvents: [
      "The caravan of 1,400 unarmed Muslims traveling to perform Umrah (628 CE) stopped by Quraysh forces",
      "The Pledge under the Tree (Bay'at al-Ridwan) where companions pledged their lives upon hearing false rumors of Uthman's death",
      "The signing of the Treaty of Hudaybiyyah, accepting seemingly disadvantageous terms with profound political vision",
      "The revelation of Surah Al-Fath on the return journey, declaring the peace treaty as a 'clear victory'"
    ],
    relatedPeople: [
      "Prophet Muhammad ﷺ",
      "Umar ibn al-Khattab (ra) (who grappled with the treaty's immediate terms)",
      "Uthman ibn 'Affan (ra) (whose embassy triggered the pledge)",
      "Suhayl ibn 'Amr (the negotiator for Quraysh)",
      "Umm Salamah (ra) (whose wise counsel guided the companions' transition)"
    ],
    quranReferences: [
      "Surah Al-Fath (48:1): \'Indeed, We have granted you a clear triumph [the treaty of Hudaybiyyah]...\'",
      "Surah Al-Fath (48:18): \'Indeed, Allah was pleased with the believers when they pledged allegiance to you under the tree, and He knew what was in their hearts, so He sent down tranquility...\'"
    ],
    hadithReferences: [
      "Sahih al-Bukhari: \'You consider the Conquest (of Makkah) to be the Victory, but we consider the Treaty of Hudaybiyyah to be the true Victory.\'"
    ],
    lessons: [
      "The priority of diplomatic peace-building and long-term vision over immediate emotional response.",
      "The critical counsel of women in statecraft, demonstrated by Umm Salamah.",
      "Tranquility (Sakinah) is a divine gift bestowed upon hearts aligned in commitment."
    ],
    citations: [
      "Ibn Hisham, 'Al-Seerah al-Nabawiyyah'",
      "Sahih al-Bukhari, Book of Conditions (Shurut)",
      "Ibn Kathir, 'Tafsir al-Qur'an al-Azim'"
    ]
  },
  {
    id: "yemen",
    name: "Yemen (San'a & Saba)",
    region: "Southern Arabian Peninsula",
    modernCountry: "Yemen",
    coordinates: [15.3694, 44.1910],
    layers: ["Sacred Places", "Centers of Knowledge"],
    eras: ["Pre-Islamic Arabia", "Prophetic Era", "Rashidun", "Umayyad", "Abbasid", "Ottoman", "Modern Era"],
    significance: "An ancient, highly blessed land of deep faith, wisdom, and heritage. Home to the legendary kingdom of Sheba, and blessed by the Prophet ﷺ, who praised the tender hearts and faith of its people.",
    keyEvents: [
      "The ancient dominance of the Kingdom of Saba (Sheba) and the breaking of the Marib Dam (Arim)",
      "The arrival of Ali ibn Abi Talib (ra) and Mu'adh ibn Jabal (ra) to teach the inhabitants Islam (631 CE)",
      "The foundation of the Great Mosque of San'a under direct prophetic guidelines"
    ],
    relatedPeople: [
      "Mu'adh ibn Jabal (ra)",
      "Ali ibn Abi Talib (ra)",
      "Queen Bilqis (Sheba)",
      "Wahb ibn Munabbih"
    ],
    quranReferences: [
      "Surah Saba (34:15): 'There was for [the tribe of] Saba' in their dwelling place a sign: two gardens on the right and on the left. [They were told], \"Eat from the provisions of your Lord and be grateful to Him. A good land [you have], and a forgiving Lord.\"'",
      "Surah Al-Naml (27:22): 'But the hoopoe stayed not long and said, \"I have encompassed [in knowledge] that which you have not encompassed, and I have come to you from Sheba with certain news.\"'"
    ],
    hadithReferences: [
      "Sahih al-Bukhari: The Messenger of Allah ﷺ said: 'Belief is Yemeni, and wisdom is Yemeni. The people of Yemen have the most compassionate and gentle hearts.'"
    ],
    lessons: [
      "Acknowledge and respect the pre-existing wisdom and noble character of nations when calling to the truth.",
      "The critical value of peaceful education and scholarship in establishing sustainable communities."
    ],
    citations: [
      "Al-Hamdani, 'Sifat Jazirat al-Arab' (Geography of the Arabian Peninsula)",
      "Ibn Ishaq, 'Al-Seerah al-Nabawiyyah'",
      "Sahih al-Bukhari, Book of the Virtues of Yemen"
    ]
  },
  {
    id: "petra",
    name: "Petra",
    region: "Levant",
    modernCountry: "Jordan",
    coordinates: [30.3285, 35.4444],
    layers: ["Centers of Knowledge"],
    eras: ["Pre-Islamic Arabia"],
    significance: "The spectacular hand-carved Nabataean rose-red city that served as a major trade intersection controlling the flow of incense, spices, and merchandise across Arabia and the Mediterranean in Pre-Islamic antiquity.",
    keyEvents: [
      "Establishment of Petra as the capital of the Nabataean Kingdom, controlling the lucrative desert trade networks",
      "Annexation by the Roman Empire (106 CE) and subsequent shift of trade routes to maritime lanes",
      "Devastating earthquakes and gradual abandonment under Byzantine administration"
    ],
    relatedPeople: [
      "Aretas IV Philopatris (Nabataean King)",
      "Hadrian (Roman Emperor who visited in 130 CE)"
    ],
    quranReferences: [
      "Surah Al-Hijr (15:82): 'And they used to carve from the mountains, houses, feeling secure.'"
    ],
    hadithReferences: [],
    lessons: [
      "The impermanence of empires built purely on material monopoly and trade dominance.",
      "Amazing resourcefulness in arid desert engineering, especially Nabataean hydro-engineering."
    ],
    citations: [
      "Strabo, 'Geographica'",
      "Pliny the Elder, 'Naturalis Historia'",
      "Yaqut al-Hamawi, 'Mu'jam al-Buldan'"
    ]
  },
  {
    id: "najran",
    name: "Najran",
    region: "Southern Arabian Peninsula",
    modernCountry: "Saudi Arabia",
    coordinates: [17.4933, 44.1272],
    layers: ["Seerah Locations", "Sacred Places"],
    eras: ["Pre-Islamic Arabia", "Prophetic Era"],
    significance: "An ancient fertile agricultural oasis famous for its early Christian community, the tragic trial of the People of the Ditch (Ukhdud), and the historic theological embassy to the Prophet ﷺ in Madinah.",
    keyEvents: [
      "The persecution of the monotheistic Christian population of Najran by Himyarite ruler Dhu Nuwas (c. 523 CE)",
      "The historic Najran Christian delegation to Madinah to discuss theological principles (9 AH / 631 CE)",
      "The Prophet ﷺ inviting the Christian delegation to perform their services inside his own Mosque, establishing a model of pluralistic respect"
    ],
    relatedPeople: [
      "The faithful boy of the trench (Al-Ghulām)",
      "Prophet Muhammad ﷺ",
      "Abu al-Harith (Bishop of Najran)"
    ],
    quranReferences: [
      "Surah Al-Buruj (85:4-8): 'Destroyed were the companions of the trench. [Containing] the fire full of fuel, When they were sitting near it, And they, to what they were doing against the believers, were witnesses.'"
    ],
    hadithReferences: [
      "Sahih Muslim: The detailed narrative of the magician, the monk, and the brave young believer of Najran who chose faith over temporal power."
    ],
    lessons: [
      "Unyielding spiritual conviction when facing oppressive material coercion.",
      "The supreme model of constructive interfaith dialogue, characterized by profound mutual hospitality."
    ],
    citations: [
      "Ibn Hisham, 'Al-Seerah al-Nabawiyyah'",
      "Sahih Muslim, Book of Zuhd and Softening of Hearts"
    ]
  },
  {
    id: "cave-hira",
    name: "Cave Hira (Jabal al-Nour)",
    region: "Hejaz, Arabian Peninsula",
    modernCountry: "Saudi Arabia",
    coordinates: [21.4578, 39.8592],
    layers: ["Sacred Places", "Seerah Locations"],
    eras: ["Pre-Islamic Arabia", "Prophetic Era"],
    significance: "The physical starting point of final revelation. The cave atop Jabal al-Nour where Prophet Muhammad ﷺ isolated himself in deep prayer, culminating in the historic visitation of Angel Jibril.",
    keyEvents: [
      "The Prophet's regular spiritual seclusions (Tahannuth) to escape Meccan idol worship and moral decay",
      "The historic night in Ramadan 610 CE where Angel Jibril commanded the Prophet ﷺ: 'Iqra!' (Read!)"
    ],
    relatedPeople: [
      "Prophet Muhammad ﷺ",
      "Angel Jibril (Gabriel) (as)",
      "Khadijah bint Khuwaylid (ra) (who supported and reassured him)"
    ],
    quranReferences: [
      "Surah Al-Alaq (96:1-3): 'Recite in the name of your Lord who created. Created man from a clinging substance. Recite, and your Lord is the most Generous.'"
    ],
    hadithReferences: [
      "Sahih al-Bukhari: 'The commencement of the Divine Inspiration to Allah's Messenger ﷺ was in the form of good righteous dreams... and he used to go in seclusion in the cave of Hira where he used to worship Allah alone...'"
    ],
    lessons: [
      "The absolute importance of regular introspection, solitude, and meditation to prepare the soul for immense worldly duty.",
      "The towering intellectual value of literacy and critical comprehension, framed as the first command in Islam."
    ],
    citations: [
      "Sahih al-Bukhari, Book of Revelation",
      "Ibn Hisham, 'Seerah'"
    ]
  },
  {
    id: "kufa",
    name: "Kufa",
    region: "Mesopotamia",
    modernCountry: "Iraq",
    coordinates: [32.0300, 44.4000],
    layers: ["Centers of Knowledge", "Historic Mosques"],
    eras: ["Rashidun", "Umayyad", "Abbasid"],
    significance: "Founded by Caliph Umar as a strategic garrison city, it quickly became the official capital during the Caliphate of Imam Ali (ra) and blossomed into a preeminent global academy for Arabic grammar, jurisprudence, and theology.",
    keyEvents: [
      "Establishment of Kufa by Sa'd ibn Abi Waqqas in 638 CE under the directives of Caliph 'Umar",
      "Imam Ali ibn Abi Talib (ra) relocating the main administrative center of the Caliphate here (656 CE)",
      "The flowering of the Kufan School of Law, primarily formulated by Abdullah ibn Mas'ud's intellectual descendants, which directly birthed Hanafi jurisprudence"
    ],
    relatedPeople: [
      "Ali ibn Abi Talib (ra)",
      "Abdullah ibn Mas'ud (ra)",
      "Imam Abu Hanifah (founder of the Hanafi school)",
      "Al-Kisa'i (master grammarian)"
    ],
    quranReferences: [],
    hadithReferences: [
      "Sunan al-Tirmidhi: Prominent compilation chains verifying classical reports through the foundational scholarly lineages of Kufa."
    ],
    lessons: [
      "Adaptability of administrative capitals to align with geopolitical requirements.",
      "The preservation of linguistic integrity and legal structure to protect scriptural purity."
    ],
    citations: [
      "Al-Baladhuri, 'Futuh al-Buldan' (Conquests of Lands)",
      "Yaqut al-Hamawi, 'Mu'jam al-Buldan'"
    ]
  },
  {
    id: "basra",
    name: "Basra",
    region: "Mesopotamia",
    modernCountry: "Iraq",
    coordinates: [30.5081, 47.7835],
    layers: ["Centers of Knowledge", "Historic Mosques"],
    eras: ["Rashidun", "Umayyad", "Abbasid"],
    significance: "An intellectual melting pot founded by Utbah ibn Ghazwan. Basra hosted the early schools of Arabic grammar, classical theology, and spiritual asceticism (Zuhd) led by legendary saints.",
    keyEvents: [
      "Foundation of Basra in 636 CE as a military and maritime trading hub",
      "The birth of classical Arabic grammar and phonetic compilation by Sibawayh and Al-Khalil ibn Ahmad",
      "The spiritual revival led by Hasan al-Basri, inspiring conscious asceticism in the midst of swelling imperial wealth"
    ],
    relatedPeople: [
      "Al-Hasan al-Basri",
      "Sibawayh (pioneering linguist)",
      "Al-Khalil ibn Ahmad al-Farahidi (grammarian and prosodist)",
      "Anas ibn Malik (ra) (who settled and taught here)"
    ],
    quranReferences: [],
    hadithReferences: [],
    lessons: [
      "Synthesizing scientific frameworks (like grammar) is crucial to defend sacred texts from linguistic drift.",
      "Intense material expansion must be paired with spiritual vigilance and inward asceticism."
    ],
    citations: [
      "Ibn Khallikan, 'Wafayat al-A'yan' (Biographical Dictionary)",
      "Al-Tabari, 'History'"
    ]
  }
];

export const HISTORICAL_ROUTES: RouteData[] = [
  {
    id: "silk-road",
    name: "Central Asian Silk Road Hubs",
    type: "trade",
    color: "#8b5cf6",
    dashArray: "5, 10",
    coordinates: [
      [39.7747, 64.4286], // Bukhara
      [39.6542, 66.9597], // Samarkand
      [33.3152, 44.3661], // Baghdad
      [33.5138, 36.2947], // Damascus
      [41.0082, 28.9784]  // Istanbul
    ],
    eras: ["Abbasid", "Ottoman"]
  },
  {
    id: "incense-route",
    name: "Arabian Incense & Pilgrimage Route",
    type: "trade",
    color: "#f59e0b",
    dashArray: "3, 6",
    coordinates: [
      [21.3891, 39.8579], // Makkah
      [24.4672, 39.6111], // Madinah
      [31.7683, 35.2137], // Jerusalem
      [33.5138, 36.2947]  // Damascus
    ],
    eras: ["Pre-Islamic Arabia", "Prophetic Era", "Rashidun", "Umayyad"]
  },
  {
    id: "north-african-hajj",
    name: "North African Scholar & Pilgrimage Corridor",
    type: "trade",
    color: "#10b981",
    dashArray: "5, 5",
    coordinates: [
      [37.8882, -4.7794], // Cordoba
      [30.0444, 31.2357], // Cairo
      [21.3891, 39.8579]  // Makkah
    ],
    eras: ["Al-Andalus", "Abbasid"]
  },
  {
    id: "umayyad-corridor",
    name: "Umayyad Imperial Axis",
    type: "empire",
    color: "#ec4899",
    coordinates: [
      [37.8882, -4.7794], // Cordoba
      [30.0444, 31.2357], // Cairo
      [31.7683, 35.2137], // Jerusalem
      [33.5138, 36.2947], // Damascus
      [24.4672, 39.6111], // Madinah
      [21.3891, 39.8579]  // Makkah
    ],
    eras: ["Umayyad"]
  },
  {
    id: "abbasid-axis",
    name: "Abbasid Scholarly Axis",
    type: "empire",
    color: "#06b6d4",
    coordinates: [
      [39.6542, 66.9597], // Samarkand
      [39.7747, 64.4286], // Bukhara
      [33.3152, 44.3661], // Baghdad
      [33.5138, 36.2947], // Damascus
      [30.0444, 31.2357], // Cairo
      [21.3891, 39.8579]  // Makkah
    ],
    eras: ["Abbasid"]
  }
];
