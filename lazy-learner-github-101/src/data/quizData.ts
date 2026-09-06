export type LanguageMode = 'en' | 'ms' | 'dual';

export interface VocabPair {
  en: string;
  ms: string;
  partOfSpeech: string;
}

export interface QuizQuestion {
  id: string;
  categoryId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionEn: string;
  questionMs: string;
  optionsEn: string[];
  optionsMs: string[];
  correctIndex: number;
  explanationEn: string;
  explanationMs: string;
  culturalFactEn?: string;
  culturalFactMs?: string;
  vocabSpotlight: VocabPair[];
  xpReward: number;
}

export interface QuizCategory {
  id: string;
  titleEn: string;
  titleMs: string;
  subtitleEn: string;
  subtitleMs: string;
  icon: string;
  accentColor: string;
  bgGradient: string;
  badgeNameEn: string;
  badgeNameMs: string;
}

export interface CulturalBadge {
  id: string;
  nameEn: string;
  nameMs: string;
  descEn: string;
  descMs: string;
  iconType: 'wau' | 'hornbill' | 'hibiscus' | 'kopitiam' | 'rafflesia' | 'keris';
  requiredXp: number;
}

export const CULTURAL_BADGES: CulturalBadge[] = [
  {
    id: 'badge-wau',
    nameEn: 'Wau Bulan Sky Flyer',
    nameMs: 'Penerbang Wau Bulan',
    descEn: 'Completed your first quiz journey in the Nusantara Arcade!',
    descMs: 'Menamatkan pengembaraan kuiz pertama anda di Arked Nusantara!',
    iconType: 'wau',
    requiredXp: 50,
  },
  {
    id: 'badge-hibiscus',
    nameEn: 'Bunga Raya Scholar',
    nameMs: 'Cendekiawan Bunga Raya',
    descEn: 'Earned 150+ XP mastering bilingual English & Malay knowledge.',
    descMs: 'Mengumpul 150+ XP menguasai ilmu dwi-bahasa Inggeris & Melayu.',
    iconType: 'hibiscus',
    requiredXp: 150,
  },
  {
    id: 'badge-hornbill',
    nameEn: 'Kenyalang Streak Master',
    nameMs: 'Jaguh Kombo Kenyalang',
    descEn: 'Reached 300+ XP with sharp bilingual accuracy!',
    descMs: 'Mencapai 300+ XP dengan ketepatan dwi-bahasa yang tajam!',
    iconType: 'hornbill',
    requiredXp: 300,
  },
  {
    id: 'badge-rafflesia',
    nameEn: 'Rainforest Polyglot Crown',
    nameMs: 'Mahkota Poliglot Rimba',
    descEn: 'Earned 500+ XP across Science, Culture, and Language!',
    descMs: 'Mengumpul 500+ XP merentasi Sains, Budaya, dan Bahasa!',
    iconType: 'rafflesia',
    requiredXp: 500,
  },
];

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'heritage',
    titleEn: 'Malaysian & Nusantara Heritage',
    titleMs: 'Warisan Malaysia & Nusantara',
    subtitleEn: 'Culture, traditional crafts, food & history',
    subtitleMs: 'Budaya, kraf tradisional, makanan & sejarah',
    icon: '🪁',
    accentColor: '#FF5E3A',
    bgGradient: 'from-orange-500/15 to-amber-500/10',
    badgeNameEn: 'Heritage Guardian',
    badgeNameMs: 'Penjaga Warisan',
  },
  {
    id: 'language',
    titleEn: 'English ↔ Malay Word Mastery',
    titleMs: 'Kuasaan Kata Inggeris ↔ Melayu',
    subtitleEn: 'Idioms, Peribahasa, vocabulary & expressions',
    subtitleMs: 'Peribahasa, simpulan bahasa & kosa kata',
    icon: '🗣️',
    accentColor: '#00B894',
    bgGradient: 'from-emerald-500/15 to-teal-500/10',
    badgeNameEn: 'Bilingual Maestro',
    badgeNameMs: 'Maestro Dwi-Bahasa',
  },
  {
    id: 'science',
    titleEn: 'Tropical Nature & Fun Science',
    titleMs: 'Alam Tropika & Sains Ceria',
    subtitleEn: 'Rainforest wildlife, physics & ecology',
    subtitleMs: 'Hidupan liar hutan hujan, fizik & ekologi',
    icon: '🌺',
    accentColor: '#2ECC71',
    bgGradient: 'from-green-500/15 to-emerald-500/10',
    badgeNameEn: 'Rainforest Explorer',
    badgeNameMs: 'Peneroka Hutan Hujan',
  },
  {
    id: 'math',
    titleEn: 'Kopitiam Logic & Math Puzzles',
    titleMs: 'Logik Kopitiam & Matematik Pintar',
    subtitleEn: 'Everyday mental math & clever riddles',
    subtitleMs: 'Kiraan pantas harian & teka-teki pintar',
    icon: '☕',
    accentColor: '#F39C12',
    bgGradient: 'from-amber-500/15 to-yellow-500/10',
    badgeNameEn: 'Kopitiam Calculator',
    badgeNameMs: 'Kalkulator Kopitiam',
  },
  {
    id: 'geography',
    titleEn: 'ASEAN & World Explorer',
    titleMs: 'Peneroka ASEAN & Dunia',
    subtitleEn: 'Mountains, straits, islands & landmarks',
    subtitleMs: 'Gunung, selat, pulau & mercu tanda',
    icon: '🌏',
    accentColor: '#3498DB',
    bgGradient: 'from-sky-500/15 to-blue-500/10',
    badgeNameEn: 'Archipelago Navigator',
    badgeNameMs: 'Jurumudi Nusantara',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ================= HERITAGE (WARISAN) =================
  {
    id: 'her-1',
    categoryId: 'heritage',
    difficulty: 'easy',
    questionEn: 'What is the traditional crescent-moon kite from Kelantan that is an iconic symbol of Malaysian craftsmanship?',
    questionMs: 'Apakah nama layang-layang tradisional berbentuk bulan sabit dari Kelantan yang menjadi simbol ikonik seni kraf Malaysia?',
    optionsEn: ['Wau Bulan', 'Gasing Uri', 'Congkak Papan', 'Wayang Kulit'],
    optionsMs: ['Wau Bulan', 'Gasing Uri', 'Congkak Papan', 'Wayang Kulit'],
    correctIndex: 0,
    explanationEn: 'Wau Bulan ("Moon Kite") is intricately decorated with floral motifs (awan larat) and gets its name from its crescent moon-shaped tail.',
    explanationMs: 'Wau Bulan dihiasi indah dengan motif ukiran awan larat dan mendapat namanya daripada bentuk ekornya yang menyerupai bulan sabit.',
    culturalFactEn: 'Did you know? The Wau Bulan is featured on the reverse side of the Malaysian 50 sen coin and is the logo of Malaysia Airlines!',
    culturalFactMs: 'Tahukah anda? Wau Bulan diabadikan pada belakang syiling 50 sen Malaysia dan menjadi lambang syarikat penerbangan Malaysia Airlines!',
    vocabSpotlight: [
      { en: 'Crescent moon', ms: 'Bulan sabit', partOfSpeech: 'noun' },
      { en: 'Craftsmanship', ms: 'Pertukangan / Seni kraf', partOfSpeech: 'noun' },
      { en: 'Intricately decorated', ms: 'Dihiasi dengan halus', partOfSpeech: 'phrase' }
    ],
    xpReward: 25,
  },
  {
    id: 'her-2',
    categoryId: 'heritage',
    difficulty: 'medium',
    questionEn: 'Which UNESCO World Heritage textile art involves applying hot liquid wax (lilin) onto fabric before dyeing it?',
    questionMs: 'Seni tekstil Warisan Dunia UNESCO manakah yang melibatkan teknik mencanting lilin panas di atas kain sebelum dicelup warna?',
    optionsEn: ['Batik Canting', 'Tenun Pahang', 'Tekat Emas', 'Anyaman Mengkuang'],
    optionsMs: ['Batik Canting', 'Tenun Pahang', 'Tekat Emas', 'Anyaman Mengkuang'],
    correctIndex: 0,
    explanationEn: 'Batik uses a copper wax-pen tool called a "canting" to draw wax patterns that resist dye, creating vibrant multi-layered colors.',
    explanationMs: 'Batik menggunakan alat tembaga dipanggil "canting" untuk melukis corak lilin yang menahan warna celupan, menghasilkan seni berlapis yang memukau.',
    culturalFactEn: 'Malaysian batik is famous for bright floral and geometric motifs and rarely depicts human or animal figures.',
    culturalFactMs: 'Batik Malaysia terkenal dengan motif bunga-bungaan dan geometri yang cerah serta jarang memaparkan figura manusia atau haiwan.',
    vocabSpotlight: [
      { en: 'Liquid wax', ms: 'Lilin cair', partOfSpeech: 'noun' },
      { en: 'Fabric dye', ms: 'Pewarna kain', partOfSpeech: 'noun' },
      { en: 'Heritage', ms: 'Warisan', partOfSpeech: 'noun' }
    ],
    xpReward: 30,
  },
  {
    id: 'her-3',
    categoryId: 'heritage',
    difficulty: 'easy',
    questionEn: 'In the traditional game of Congkak, what are the small shells, seeds, or marbles moved around the wooden board called?',
    questionMs: 'Dalam permainan tradisional Congkak, apakah panggilan bagi guli, biji getah, atau kulit kerang yang digerakkan di dalam lubang papan?',
    optionsEn: ['Buah Congkak (Seeds/Pieces)', 'Anak Panah (Arrows)', 'Batu Seremban (Pebbles)', 'Gundu Gasing (Strikers)'],
    optionsMs: ['Buah Congkak', 'Anak Panah', 'Batu Seremban', 'Gundu Gasing'],
    correctIndex: 0,
    explanationEn: 'Players scoop and distribute the "Buah Congkak" clockwise into the "kampung" (small holes) and "rumah" (storehouse) holes.',
    explanationMs: 'Pemain mengambil dan mengagihkan "Buah Congkak" mengikut pusingan jam ke dalam lubang "kampung" dan lubang besar "rumah".',
    vocabSpotlight: [
      { en: 'Storehouse / Home base', ms: 'Rumah (Lubang Besar)', partOfSpeech: 'noun' },
      { en: 'Clockwise', ms: 'Ikut arah jam', partOfSpeech: 'adverb' },
      { en: 'Wooden board', ms: 'Papan kayu', partOfSpeech: 'noun' }
    ],
    xpReward: 25,
  },
  {
    id: 'her-4',
    categoryId: 'heritage',
    difficulty: 'hard',
    questionEn: 'Which aromatic leaf gives Nasi Lemak and traditional Malay kuih their signature sweet, grassy fragrance?',
    questionMs: 'Daun beraroma manakah yang memberikan Nasi Lemak dan kuih-muih tradisional bau wangi semula jadi yang memikat?',
    optionsEn: ['Pandan Leaf (Daun Pandan)', 'Curry Leaf (Daun Kari)', 'Turmeric Leaf (Daun Kunyit)', 'Kaffir Lime Leaf (Daun Limau Purut)'],
    optionsMs: ['Daun Pandan', 'Daun Kari', 'Daun Kunyit', 'Daun Limau Purut'],
    correctIndex: 0,
    explanationEn: 'Pandan leaf (Pandanus amaryllifolius) is often called the "Vanilla of Southeast Asia" and is knotted into coconut rice while cooking.',
    explanationMs: 'Daun Pandan sering digelar "Vanila Asia Tenggara" dan disimpul di dalam periuk nasi lemak bersama santan ketika dimasak.',
    vocabSpotlight: [
      { en: 'Aromatic fragrance', ms: 'Aroma wangi', partOfSpeech: 'noun' },
      { en: 'Coconut milk', ms: 'Santan kelapa', partOfSpeech: 'noun' },
      { en: 'Knotted leaf', ms: 'Daun yang disimpul', partOfSpeech: 'phrase' }
    ],
    xpReward: 35,
  },

  // ================= LANGUAGE (BAHASA & PERIBAHASA) =================
  {
    id: 'lang-1',
    categoryId: 'language',
    difficulty: 'easy',
    questionEn: 'What is the closest English meaning of the famous Malay proverb (peribahasa): "Bagai aur dengan tebing"?',
    questionMs: 'Apakah maksud yang paling tepat dalam Bahasa Inggeris bagi peribahasa Melayu terkenal: "Bagai aur dengan tebing"?',
    optionsEn: [
      'Close cooperation where people support and depend on each other',
      'A person who forgets their origins after becoming successful',
      'Doing something pointless like pouring water onto a taro leaf',
      'Two people who constantly argue whenever they meet'
    ],
    optionsMs: [
      'Kerjasama erat di mana masyarakat saling membantu dan memerlukan',
      'Seseorang yang melupakan asal-usul setelah berjaya',
      'Melakukan kerja sia-sia seperti mencurah air ke daun keladi',
      'Dua orang yang sentiasa bertengkar apabila bertemu'
    ],
    correctIndex: 0,
    explanationEn: 'Literally "Like bamboo (aur) and the riverbank (tebing)" — bamboo roots hold the soil together, while the riverbank supports the bamboo!',
    explanationMs: 'Secara harfiah bermaksud "Seperti buluh aur dengan tebing sungai" — akar buluh mencengkam tanah tebing daripada runtuh, manakala tebing memberi tempat buluh tumbuh!',
    vocabSpotlight: [
      { en: 'Riverbank', ms: 'Tebing sungai', partOfSpeech: 'noun' },
      { en: 'Bamboo grove', ms: 'Rumpun aur / buluh', partOfSpeech: 'noun' },
      { en: 'Mutual support', ms: 'Saling bantu-membantu', partOfSpeech: 'noun' }
    ],
    xpReward: 30,
  },
  {
    id: 'lang-2',
    categoryId: 'language',
    difficulty: 'medium',
    questionEn: 'Choose the correct Bahasa Melayu idiom (Simpulan Bahasa) for someone who is an avid reader or "Bookworm":',
    questionMs: 'Pilih Simpulan Bahasa Melayu yang tepat bagi seseorang yang sangat suka membaca buku ("Bookworm"):',
    optionsEn: ['Ulat Buku', 'Kaki Bangku', 'Tangan Panas', 'Otak Cair'],
    optionsMs: ['Ulat Buku', 'Kaki Bangku', 'Tangan Panas', 'Otak Cair'],
    correctIndex: 0,
    explanationEn: '"Ulat Buku" literally translates to "Book Caterpillar/Worm"! Meanwhile, "Otak Cair" means very clever/quick-witted, and "Kaki Bangku" means bad at football.',
    explanationMs: '"Ulat Buku" merujuk kepada orang yang rajin membaca. Manakala "Otak Cair" bermaksud pintar, dan "Kaki Bangku" bermaksud tidak pandai bermain bola.',
    vocabSpotlight: [
      { en: 'Bookworm / Avid reader', ms: 'Ulat buku', partOfSpeech: 'idiom' },
      { en: 'Quick-witted / Clever', ms: 'Otak cair', partOfSpeech: 'idiom' },
      { en: 'Unskilled at sports', ms: 'Kaki bangku', partOfSpeech: 'idiom' }
    ],
    xpReward: 25,
  },
  {
    id: 'lang-3',
    categoryId: 'language',
    difficulty: 'medium',
    questionEn: 'In English and Bahasa Melayu, some words look similar but can be tricky! What does the Malay word "Perasaan" mean in English?',
    questionMs: 'Dalam Bahasa Inggeris dan Bahasa Melayu, apakah terjemahan Bahasa Inggeris yang tepat bagi perkataan Melayu "Perasaan"?',
    optionsEn: ['Feelings / Emotion', 'Seasoning / Flavor', 'Imagination', 'Celebration'],
    optionsMs: ['Feelings / Emotion (Emosi & Rasa Hati)', 'Seasoning / Flavor (Perasa Makanan)', 'Imagination (Imaginasi)', 'Celebration (Sambutan)'],
    correctIndex: 0,
    explanationEn: 'Watch out for spelling! "Perasaan" (with double "a") means Feelings/Emotion. "Perasa" (single "a") means food flavoring/seasoning!',
    explanationMs: 'Berhati-hati dengan ejaan! "Perasaan" (dua huruf "a") bermaksud emosi atau rasa hati ("feelings"). "Perasa" pula bermaksud bahan penambah rasa makanan ("flavoring").',
    vocabSpotlight: [
      { en: 'Feelings / Emotion', ms: 'Perasaan', partOfSpeech: 'noun' },
      { en: 'Food flavoring', ms: 'Bahan perasa', partOfSpeech: 'noun' },
      { en: 'To feel', ms: 'Merasa / Berasa', partOfSpeech: 'verb' }
    ],
    xpReward: 30,
  },
  {
    id: 'lang-4',
    categoryId: 'language',
    difficulty: 'hard',
    questionEn: 'Which proverb means "Where there is a will, there is a way" in Bahasa Melayu?',
    questionMs: 'Peribahasa Melayu manakah yang membawa maksud sama seperti ungkapan Inggeris: "Where there is a will, there is a way"?',
    optionsEn: [
      'Di mana ada kemahuan, di situ ada jalan',
      'Sediakan payung sebelum hujan',
      'Sepandai-pandai tupai melompat, akhirnya jatuh ke tanah juga',
      'Air yang tenang jangan disangka tiada buaya'
    ],
    optionsMs: [
      'Di mana ada kemahuan, di situ ada jalan',
      'Sediakan payung sebelum hujan',
      'Sepandai-pandai tupai melompat, akhirnya jatuh ke tanah juga',
      'Air yang tenang jangan disangka tiada buaya'
    ],
    correctIndex: 0,
    explanationEn: '"Di mana ada kemahuan (will/desire), di situ ada jalan (way/path)" is an exact match for determination overcoming obstacles!',
    explanationMs: '"Di mana ada kemahuan, di situ ada jalan" membawa maksud apabila kita mempunyai kesungguhan yang tinggi, pasti ada cara untuk berjaya!',
    vocabSpotlight: [
      { en: 'Strong will / Determination', ms: 'Kemahuan / Keazaman', partOfSpeech: 'noun' },
      { en: 'Prepare before trouble hits', ms: 'Sediakan payung sebelum hujan', partOfSpeech: 'proverb' }
    ],
    xpReward: 35,
  },

  // ================= SCIENCE (SAINS & ALAM TROPIKA) =================
  {
    id: 'sci-1',
    categoryId: 'science',
    difficulty: 'easy',
    questionEn: 'Found in the rainforests of Sabah and Sarawak, what is the world\'s largest individual flower that can grow up to 1 meter wide?',
    questionMs: 'Ditemui di hutan hujan Sabah dan Sarawak, apakah bunga tunggal terbesar di dunia yang boleh membesar sehingga 1 meter lebar?',
    optionsEn: ['Rafflesia (Bunga Pakma)', 'Hibiscus (Bunga Raya)', 'Pitcher Plant (Periuk Kera)', 'Orchid (Bunga Orkid)'],
    optionsMs: ['Rafflesia (Bunga Pakma)', 'Hibiscus (Bunga Raya)', 'Periuk Kera (Pitcher Plant)', 'Bunga Orkid (Orchid)'],
    correctIndex: 0,
    explanationEn: 'The Rafflesia (Bunga Pakma) has no leaves, roots, or stem! It is a parasitic plant that blooms for only 5 to 7 days.',
    explanationMs: 'Rafflesia (Bunga Pakma) tidak mempunyai daun, akar, atau batang! Ia merupakan tumbuhan parasit yang hanya mekar selama 5 hingga 7 hari sahaja.',
    culturalFactEn: 'To attract carrion flies for pollination, the Rafflesia emits an odor similar to rotting meat, earning it the nickname "Corpse Flower".',
    culturalFactMs: 'Untuk menarik perhatian lalat bagi pendebungaan, Rafflesia mengeluarkan bau unik, menjadikannya salah satu keajaiban biologi dunia.',
    vocabSpotlight: [
      { en: 'Pollination', ms: 'Pendebungaan', partOfSpeech: 'noun' },
      { en: 'To bloom', ms: 'Mekar / Berkembang', partOfSpeech: 'verb' },
      { en: 'Rainforest canopy', ms: 'Kanopi hutan hujan', partOfSpeech: 'noun' }
    ],
    xpReward: 25,
  },
  {
    id: 'sci-2',
    categoryId: 'science',
    difficulty: 'medium',
    questionEn: 'Why is the Rhinoceros Hornbill (Burung Enggang Badak) vital to the survival of tropical rainforest trees?',
    questionMs: 'Mengapakah Burung Enggang Badak (Rhinoceros Hornbill) sangat penting untuk kelangsungan hidup pokok-pokok di hutan hujan tropika?',
    optionsEn: [
      'It swallows large tree fruits whole and disperses the seeds across miles of forest',
      'It digs underground tunnels that aerate the soil around tree roots',
      'It builds dams in forest rivers to prevent flooding',
      'It pollinates flowers at night like a bat'
    ],
    optionsMs: [
      'Ia menelan buah-buahan hutan dan menyebarkan biji benih merentasi kawasan hutan yang luas',
      'Ia menggali terowong bawah tanah untuk mengudarakan akar pokok',
      'Ia membina empangan di sungai hutan untuk mengelakkan banjir',
      'Ia mendebungakan bunga pada waktu malam seperti kelawar'
    ],
    correctIndex: 0,
    explanationEn: 'Hornbills are called the "Farmers of the Rainforest" because they disperse seeds of towering fruit trees like figs and nutmegs!',
    explanationMs: 'Burung Enggang digelar "Petani Hutan Hujan" kerana tabiatnya menyebarkan biji benih pokok buah-buahan hutan seperti pokok ara dan buah pala!',
    vocabSpotlight: [
      { en: 'Seed dispersal', ms: 'Penyebaran biji benih', partOfSpeech: 'noun' },
      { en: 'Beak / Casque', ms: 'Paruh / Tanduk atas paruh', partOfSpeech: 'noun' },
      { en: 'Ecosystem', ms: 'Ekosistem', partOfSpeech: 'noun' }
    ],
    xpReward: 30,
  },
  {
    id: 'sci-3',
    categoryId: 'science',
    difficulty: 'medium',
    questionEn: 'Which coastal ecosystem acts as a natural shield against tsunami waves and stores up to 4 times more carbon than land forests?',
    questionMs: 'Ekosistem pesisir pantai manakah yang bertindak sebagai perisai semula jadi ombak besar dan menyimpan 4 kali ganda lebih karbon berbanding hutan darat?',
    optionsEn: ['Mangrove Swamp Forest (Hutan Paya Bakau)', 'Sandy Desert Dunes (Gumuk Pasir)', 'Alpine Meadow (Padang Rumput Gunung)', 'Tundra Ice Sheet (Litupan Ais)'],
    optionsMs: ['Hutan Paya Bakau (Mangrove Forest)', 'Gumuk Pasir Gurun', 'Padang Rumput Alp', 'Litupan Ais Tundra'],
    correctIndex: 0,
    explanationEn: 'Mangrove trees (Pokok Bakau) have tangled stilt roots that absorb wave energy and serve as nurseries for baby fish, crabs, and shrimp!',
    explanationMs: 'Pokok bakau mempunyai sistem akar jangkang yang menyerap hempasan ombak dan menjadi tempat perlindungan anak ikan, ketam, dan udang!',
    vocabSpotlight: [
      { en: 'Mangrove swamp', ms: 'Paya bakau', partOfSpeech: 'noun' },
      { en: 'Coastal erosion', ms: 'Hakisan pantai', partOfSpeech: 'noun' },
      { en: 'Stilt roots', ms: 'Akar jangkang', partOfSpeech: 'noun' }
    ],
    xpReward: 30,
  },

  // ================= MATH (MATEMATIK & LOGIK KOPITIAM) =================
  {
    id: 'math-1',
    categoryId: 'math',
    difficulty: 'easy',
    questionEn: 'At Uncle Lim\'s Kopitiam, 1 cup of Teh Tarik costs RM 2.50 and 1 plate of Roti Bakar costs RM 3.20. If Siti orders 2 Teh Tarik and 1 Roti Bakar, how much is her total bill?',
    questionMs: 'Di Kopitiam Pakcik Lim, 1 cawan Teh Tarik berharga RM 2.50 dan 1 pinggan Roti Bakar berharga RM 3.20. Jika Siti memesan 2 Teh Tarik dan 1 Roti Bakar, berapakah jumlah bayarannya?',
    optionsEn: ['RM 8.20', 'RM 7.50', 'RM 8.90', 'RM 5.70'],
    optionsMs: ['RM 8.20', 'RM 7.50', 'RM 8.90', 'RM 5.70'],
    correctIndex: 0,
    explanationEn: '2 cups of Teh Tarik = 2 × RM 2.50 = RM 5.00. Add 1 Roti Bakar (RM 3.20): RM 5.00 + RM 3.20 = RM 8.20!',
    explanationMs: '2 cawan Teh Tarik = 2 × RM 2.50 = RM 5.00. Tambah 1 Roti Bakar (RM 3.20): RM 5.00 + RM 3.20 = RM 8.20!',
    vocabSpotlight: [
      { en: 'Total bill', ms: 'Jumlah bil / bayaran', partOfSpeech: 'noun' },
      { en: 'Change (money returned)', ms: 'Baki wang', partOfSpeech: 'noun' },
      { en: 'To order food', ms: 'Memesan makanan', partOfSpeech: 'verb' }
    ],
    xpReward: 25,
  },
  {
    id: 'math-2',
    categoryId: 'math',
    difficulty: 'medium',
    questionEn: 'A traditional Congkak board has 2 rows of 7 small holes ("kampung") each. At the start of a game, each small hole is filled with 7 marbles. How many marbles are placed in all small holes combined?',
    questionMs: 'Sebuah papan Congkak mempunyai 2 baris yang masing-masing ada 7 lubang "kampung". Pada permulaan permainan, setiap lubang diisi 7 biji guli. Berapakah jumlah keseluruhan guli di dalam semua lubang kampung?',
    optionsEn: ['98 marbles (98 biji guli)', '84 marbles (84 biji guli)', '105 marbles (105 biji guli)', '49 marbles (49 biji guli)'],
    optionsMs: ['98 biji guli', '84 biji guli', '105 biji guli', '49 biji guli'],
    correctIndex: 0,
    explanationEn: 'Total small holes = 2 rows × 7 holes = 14 holes. Each hole has 7 marbles: 14 × 7 = 98 marbles!',
    explanationMs: 'Jumlah lubang kampung = 2 baris × 7 lubang = 14 lubang. Setiap lubang ada 7 biji guli: 14 × 7 = 98 biji guli!',
    vocabSpotlight: [
      { en: 'Multiply / Times', ms: 'Darab (×)', partOfSpeech: 'verb' },
      { en: 'Equal rows', ms: 'Baris yang sama', partOfSpeech: 'noun' }
    ],
    xpReward: 30,
  },

  // ================= GEOGRAPHY (GEOGRAFI ASEAN & DUNIA) =================
  {
    id: 'geo-1',
    categoryId: 'geography',
    difficulty: 'easy',
    questionEn: 'Standing at 4,095 meters in Sabah, what is the highest mountain peak in Malaysia and Borneo?',
    questionMs: 'Berdiri megah setinggi 4,095 meter di Sabah, apakah puncak gunung tertinggi di Malaysia dan pulau Borneo?',
    optionsEn: ['Mount Kinabalu (Gunung Kinabalu)', 'Mount Tahan (Gunung Tahan)', 'Mount Mulu (Gunung Mulu)', 'Mount Santubong (Gunung Santubong)'],
    optionsMs: ['Gunung Kinabalu', 'Gunung Tahan', 'Gunung Mulu', 'Gunung Santubong'],
    correctIndex: 0,
    explanationEn: 'Mount Kinabalu in Crocker Range, Sabah, is a UNESCO World Heritage Site renowned for having more plant species than all of Europe and North America combined!',
    explanationMs: 'Gunung Kinabalu di Banjaran Crocker, Sabah, merupakan Tapak Warisan Dunia UNESCO yang terkenal dengan biodiversiti flora yang luar biasa!',
    vocabSpotlight: [
      { en: 'Mountain summit / peak', ms: 'Puncak gunung', partOfSpeech: 'noun' },
      { en: 'Mountain range', ms: 'Banjaran gunung', partOfSpeech: 'noun' },
      { en: 'Elevation / Altitude', ms: 'Ketinggian dari aras laut', partOfSpeech: 'noun' }
    ],
    xpReward: 25,
  },
  {
    id: 'geo-2',
    categoryId: 'geography',
    difficulty: 'medium',
    questionEn: 'Which historic maritime waterway flows between Peninsular Malaysia and the Indonesian island of Sumatra, connecting the Indian Ocean to the South China Sea?',
    questionMs: 'Laluan perairan maritim bersejarah manakah yang terletak di antara Semenanjung Malaysia dan Pulau Sumatera, menghubungkan Lautan Hindi dengan Laut China Selatan?',
    optionsEn: ['Strait of Malacca (Selat Melaka)', 'Strait of Tebrau (Selat Tebrau)', 'Sunda Strait (Selat Sunda)', 'Karimata Strait (Selat Karimata)'],
    optionsMs: ['Selat Melaka (Strait of Malacca)', 'Selat Tebrau', 'Selat Sunda', 'Selat Karimata'],
    correctIndex: 0,
    explanationEn: 'The Strait of Malacca (Selat Melaka) is one of the world\'s most important shipping lanes and was the heart of the historic spice trade!',
    explanationMs: 'Selat Melaka ialah salah satu laluan perkapalan paling sibuk di dunia dan menjadi nadi perdagangan rempah ratus sejak zaman Kesultanan Melayu Melaka!',
    vocabSpotlight: [
      { en: 'Strait (narrow sea passage)', ms: 'Selat', partOfSpeech: 'noun' },
      { en: 'Peninsula', ms: 'Semenanjung', partOfSpeech: 'noun' },
      { en: 'Shipping lane', ms: 'Laluan perkapalan', partOfSpeech: 'noun' }
    ],
    xpReward: 30,
  },
];
