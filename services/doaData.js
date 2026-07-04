// services/doaData.js
export const doaData = [
    // === NEW: FULL UNIFIED STEP-BY-STEP SHOLAT GUIDE ===
    {
        category: "sholat-wajib",
        categoryLabel: "Tuntunan Lengkap",
        id: "tata-cara-sholat-lengkap",
        title: "Tuntunan Gerakan Sholat Lengkap (Takbir s/d Salam)",
        description: "Panduan lengkap tata cara gerakan dan bacaan sholat wajib berturut-turut dari awal (Takbiratul Ihram) hingga selesai (Salam). Dilengkapi audio asli murottal/imam.",
        steps: [
            {
                name: "1. Niat & Takbiratul Ihram",
                ar: "اللهُ أَكْبَرُ",
                la: "Allahu Akbar.",
                id: "Allah Maha Besar. (Berdiri tegak menghadap kiblat, mengangkat kedua tangan sejajar telinga bagi laki-laki atau sejajar dada bagi perempuan, lalu bersedekap di atas perut).",
                audio: "" // Fallback to TTS (clean "Allahu Akbar")
            },
            {
                name: "2. Membaca Doa Iftitah (Sunnah)",
                ar: "اللهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلَّهِ كَثِيرًا وَسُبْحَانَ اللهِ بُكْرَةً وَأَصِيلاً. إِنِّي وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالأَرْضَ حَنِيفًا مُسْلِمًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ. إِنَّ صَلاَتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ. لاَ شَرِيكَ لَهُ وَبِذَلِكَ أُمِرْتُ وَأَنَا مِنَ الْمُسْلِمِينَ",
                la: "Allahu akbar kabira walhamdulillahi katsira wa subhanallahi bukratan wa ashila. Inni wajjahtu wajhiya lilladzi fatharas samawati wal ardha hanifam muslimaw wa ma ana minal musyrikin. Inna shalati wa nusuki wa mahyaya wa mamati lillahi rabbil 'alamin. La syarika lahu wa bidzalika umirtu wa ana minal muslimin.",
                id: "Allah Maha Besar lagi Sempurna Kebesaran-Nya, segala puji bagi Allah sebanyak-banyaknya, dan Maha Suci Allah sepanjang pagi dan sore. Sesungguhnya aku hadapkan wajahku kepada Zat yang menciptakan langit dan bumi dengan keadaan lempeng dan menyerahkan diri, dan aku bukanlah dari golongan orang musyrik. Sesungguhnya sholatku, ibadahku, hidupku dan matiku hanya untuk Allah, Tuhan semesta alam. Tidak ada sekutu bagi-Nya, dan dengan demikianlah aku diperintahkan dan aku termasuk golongan orang-orang muslim.",
                audio: "https://akuislam.com/wp-content/uploads/2019/07/Doa-iftitah.mp3.mp3" // Real human voice!
            },
            {
                name: "3. Membaca Surah Al-Fatihah (Wajib / Rukun)",
                ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ (١) الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ (٢) الرَّحْمَٰنِ الرَّحِيمِ (٣) مَالِكِ يَوْمِ الدِّينِ (٤) إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ (٥) اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ (٦) صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ (٧)",
                la: "Bismillahirrahmaanirrahiim. Alhamdu lillahi rabbil 'alamiin. Ar-Rahmanir Rahiim. Maaliki yaumid diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinas-siraatal-mustaqiim. Siraatal-ladziina an'amta 'alaihim ghairil-maghduubi 'alaihim wa lad-dhaalliin.",
                id: "Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam. Yang Maha Pengasih lagi Maha Penyayang. Pemilik hari pembalasan. Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan. Tunjukkanlah kami jalan yang lurus. (yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.",
                audio: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/1.mp3" // Professional Murottal (Mishary Rashid Al-Afasy)
            },
            {
                name: "4. Gerakan & Bacaan Ruku",
                ar: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ",
                la: "Subhana rabbiyal 'azhimi wa bihamdih. (Dibaca 3x)",
                id: "Maha Suci Tuhanku Yang Maha Agung dan segala puji bagi-Nya.",
                audio: "https://akuislam.com/wp-content/uploads/2019/07/11-Ruku.mp3" // Real human voice!
            },
            {
                name: "5. Gerakan & Bacaan I'tidal",
                ar: "سَمِعَ اللهُ Lِمَنْ حَمِدَهُ. رَبَّنَا لَكَ الْحَمْدُ مِلْءُ السَّمَوَاتِ وَمِلْءُ الْأَرْضِ وَمِلْءُ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ",
                la: "Sami'allahu liman hamidah. Rabbana lakal hamdu mil'us samawati wa mil'ul ardhi wa mil'u ma syi'ta min syai'in ba'du.",
                id: "Allah Maha Mendengar orang yang memuji-Nya. Ya Tuhan kami, segala puji bagi-Mu, sepenuh langit dan sepenuh bumi serta sepenuh apa saja yang Engkau kehendaki setelah itu.",
                audio: "https://akuislam.com/wp-content/uploads/2019/07/12-Itidal.mp3" // Real human voice!
            },
            {
                name: "6. Gerakan & Bacaan Sujud",
                ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ",
                la: "Subhana rabbiyal a'la wa bihamdih. (Dibaca 3x)",
                id: "Maha Suci Tuhanku Yang Maha Tinggi dan segala puji bagi-Nya.",
                audio: "https://akuislam.com/wp-content/uploads/2019/07/13-Sujud.mp3" // Real human voice!
            },
            {
                name: "7. Duduk di Antara Dua Sujud (Iftirasy)",
                ar: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي",
                la: "Rabbighfirlii warhamnii wajburnii warfa'nii warzuqnii wahdinii wa 'aafinii wa'fu 'annii.",
                id: "Ya Tuhanku ampunilah aku, rahmatilah aku, cukupkanlah aku, tinggikanlah derajatku, berilah aku rezeki, berilah aku petunjuk, sehatkanlah aku, dan ampunilah aku.",
                audio: "" // Fallback to clean TTS
            },
            {
                name: "8. Duduk & Bacaan Tasyahud Awal",
                ar: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُwَ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ. اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
                la: "At-tahiyyatu al-mubarakatu as-salawatu at-tayyibatu lillah. As-salamu 'alaika ayyuhan nabiyyu wa rahmatullahi wa barakatuh. As-salamu 'alaina wa 'ala 'ibadillahis shalihin. Asyhadu alla ilaha illallah wa asyhadu anna Muhammadar rasulullah. Allahumma shalli 'ala Muhammad.",
                id: "Segala penghormatan yang penuh keberkahan, shalawat yang baik adalah milik Allah. Semoga keselamatan, rahmat Allah, dan berkah-Nya tetap tercurah kepadamu, wahai Nabi. Semoga keselamatan tetap tercurah kepada kami dan kepada hamba-hamba Allah yang saleh. Aku bersaksi bahwa tiada Tuhan selain Allah dan aku bersaksi bahwa Muhammad adalah utusan Allah. Ya Allah, limpahkanlah rahmat kepada Muhammad.",
                audio: "https://akuislam.com/wp-content/uploads/2019/07/Tahiyat-Awal.mp3" // Real human voice!
            },
            {
                name: "9. Duduk & Bacaan Tasyahud Akhir",
                ar: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ... اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ وَبَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
                la: "At-tahiyyatu al-mubarakatu as-salawatu at-tayyibatu lillah... Allahumma shalli 'ala Muhammad wa 'ala ali Muhammad kama shallaita 'ala Ibrahim wa 'ala ali Ibrahim, wa barik 'ala Muhammad wa 'ala ali Muhammad kama barakta 'ala Ibrahim wa 'ala ali Ibrahim, fil 'alamina innaka hamidum majid.",
                id: "Segala penghormatan yang berkah adalah milik Allah... Ya Allah, limpahkanlah rahmat kepada Muhammad dan keluarga Muhammad sebagaimana Engkau limpahkan rahmat kepada Ibrahim dan keluarga Ibrahim. Dan berkahilah Muhammad dan keluarga Muhammad sebagaimana Engkau berkahi Ibrahim dan keluarga Ibrahim di seluruh alam semesta. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.",
                audio: "https://akuislam.com/wp-content/uploads/2019/07/Tahiyat-Akhir.mp3" // Real human voice!
            },
            {
                name: "10. Mengucapkan Salam",
                ar: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ",
                la: "As-salamu 'alaikum wa rahmatullah. (Menoleh ke kanan lalu menoleh ke kiri)",
                id: "Semoga keselamatan dan rahmat Allah terlimpah kepadamu.",
                audio: "" // Fallback to TTS
            }
        ]
    },

    // === CATEGORY: SHOLAT WAJIB (Fardhu & Niat & Gerakan) ===
    {
        category: "sholat-wajib",
        categoryLabel: "Niat Sholat Wajib",
        id: "niat-subuh",
        title: "Niat Sholat Subuh (2 Rakaat)",
        description: "Dikerjakan pada waktu fajar/subuh sebelum terbit matahari. Terdiri dari 2 rakaat dengan doa qunut (sunnah).",
        steps: [
            {
                name: "Bacaan Niat Sholat Subuh",
                ar: "أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
                la: "Usollii fardhas subhi rak'ataini mustaqbilal qiblati adaa-an lillaahi ta'aalaa.",
                id: "Aku niat sholat fardhu Subuh dua rakaat menghadap kiblat karena Allah Ta'ala.",
                audio: "https://akuislam.com/wp-content/uploads/2019/07/19-Niat-Subuh-Single.mp3" // Real human voice!
            }
        ]
    },
    {
        category: "sholat-wajib",
        categoryLabel: "Niat Sholat Wajib",
        id: "niat-zuhur",
        title: "Niat Sholat Zuhur (4 Rakaat)",
        description: "Dikerjakan di siang hari saat matahari tergelincir ke barat hingga bayangan sama panjang dengan tinggi benda.",
        steps: [
            {
                name: "Bacaan Niat Sholat Zuhur",
                ar: "أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
                la: "Usollii fardhadzh dzhuhri arba'a raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aalaa.",
                id: "Aku niat sholat fardhu Zuhur empat rakaat menghadap kiblat karena Allah Ta'ala.",
                audio: "https://akuislam.com/wp-content/uploads/2019/07/22-Niat-Zuhur-Single.mp3" // Real human voice!
            }
        ]
    },
    {
        category: "sholat-wajib",
        categoryLabel: "Niat Sholat Wajib",
        id: "niat-asar",
        title: "Niat Sholat Asar (4 Rakaat)",
        description: "Dikerjakan di sore hari mulai dari panjang bayangan melebihi tinggi benda hingga matahari terbenam.",
        steps: [
            {
                name: "Bacaan Niat Sholat Asar",
                ar: "أُصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
                la: "Usollii fardhal 'ashri arba'a raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aalaa.",
                id: "Aku niat sholat fardhu Asar empat rakaat menghadap kiblat karena Allah Ta'ala.",
                audio: "https://akuislam.com/wp-content/uploads/2019/07/Niat-Asar.mp3" // Real human voice!
            }
        ]
    },
    {
        category: "sholat-wajib",
        categoryLabel: "Niat Sholat Wajib",
        id: "niat-magrib",
        title: "Niat Sholat Magrib (3 Rakaat)",
        description: "Dikerjakan setelah terbenamnya matahari hingga hilangnya mega merah di langit barat.",
        steps: [
            {
                name: "Bacaan Niat Sholat Magrib",
                ar: "أُصَلِّي فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
                la: "Usollii fardhal maghribi tsalaatsa raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aalaa.",
                id: "Aku niat sholat fardhu Magrib tiga rakaat menghadap kiblat karena Allah Ta'ala.",
                audio: "https://akuislam.com/wp-content/uploads/2019/07/Niat-Maghrib.mp3" // Real human voice!
            }
        ]
    },
    {
        category: "sholat-wajib",
        categoryLabel: "Niat Sholat Wajib",
        id: "niat-isya",
        title: "Niat Sholat Isya (4 Rakaat)",
        description: "Dikerjakan mulai dari hilangnya mega merah hingga menjelang fajar shadiq.",
        steps: [
            {
                name: "Bacaan Niat Sholat Isya",
                ar: "أُصَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
                la: "Usollii fardhal 'isyaa-i arba'a raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aalaa.",
                id: "Aku niat sholat fardhu Isya empat rakaat menghadap kiblat karena Allah Ta'ala.",
                audio: "" // Fallback to TTS
            }
        ]
    },
    {
        category: "sholat-wajib",
        categoryLabel: "Bacaan & Gerakan Sholat",
        id: "ruku",
        title: "Gerakan & Bacaan Ruku",
        description: "Membungkukkan badan membentuk sudut 90 derajat dengan telapak tangan memegang lutut secara thuma'ninah.",
        steps: [
            {
                name: "Bacaan Ruku (Dibaca 3x)",
                ar: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ",
                la: "Subhana rabbiyal 'azhimi wa bihamdih.",
                id: "Maha Suci Tuhanku Yang Maha Agung dan segala puji bagi-Nya.",
                audio: "https://akuislam.com/wp-content/uploads/2019/07/11-Ruku.mp3" // Real human voice!
            }
        ]
    },
    {
        category: "sholat-wajib",
        categoryLabel: "Bacaan & Gerakan Sholat",
        id: "itidal",
        title: "Gerakan & Bacaan I'tidal (Bangkit dari Ruku)",
        description: "Kembali tegak berdiri setelah ruku sebelum turun untuk bersujud.",
        steps: [
            {
                name: "Bacaan Samiallah & Rabbana Lakal Hamdu",
                ar: "سَمِعَ اللهُ لِمَنْ حَمِدَهُ. رَبَّنَا لَكَ الْحَمْدُ مِلْءُ السَّمَوَاتِ وَمِلْءُ الْأَرْضِ وَمِلْءُ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ",
                la: "Sami'allahu liman hamidah. Rabbana lakal hamdu mil'us samawati wa mil'ul ardhi wa mil'u ma syi'ta min syai'in ba'du.",
                id: "Allah Maha Mendengar orang yang memuji-Nya. Ya Tuhan kami, segala puji bagi-Mu, sepenuh langit dan sepenuh bumi serta sepenuh apa saja yang Engkau kehendaki setelah itu.",
                audio: "https://akuislam.com/wp-content/uploads/2019/07/12-Itidal.mp3" // Real human voice!
            }
        ]
    },
    {
        category: "sholat-wajib",
        categoryLabel: "Bacaan & Gerakan Sholat",
        id: "sujud",
        title: "Gerakan & Bacaan Sujud",
        description: "Meletakkan dahi, hidung, kedua telapak tangan, kedua lutut, dan ujung jari kaki di lantai secara thuma'ninah.",
        steps: [
            {
                name: "Bacaan Sujud (Dibaca 3x)",
                ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ",
                la: "Subhana rabbiyal a'la wa bihamdih.",
                id: "Maha Suci Tuhanku Yang Maha Tinggi dan segala puji bagi-Nya.",
                audio: "https://akuislam.com/wp-content/uploads/2019/07/13-Sujud.mp3" // Real human voice!
            }
        ]
    },
    {
        category: "sholat-wajib",
        categoryLabel: "Bacaan & Gerakan Sholat",
        id: "duduk-antara-dua-sujud",
        title: "Gerakan & Bacaan Duduk Iftirasy",
        description: "Duduk bertumpu pada kaki kiri sementara telapak kaki kanan ditegakkan dan jari-jarinya menekuk menghadap kiblat.",
        steps: [
            {
                name: "Doa Duduk di Antara Dua Sujud",
                ar: "رَبِّ اغْفِرْ لِي وَارْحَمْنII وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي",
                la: "Rabbighfirlii warhamnii wajburnii warfa'nii warzuqnii wahdinii wa 'aafinii wa'fu 'annii.",
                id: "Ya Tuhanku ampunilah aku, rahmatilah aku, cukupkanlah aku, tinggikanlah derajatku, berilah aku rezeki, berilah aku petunjuk, sehatkanlah aku, dan ampunilah aku.",
                audio: "" // Fallback to TTS
            }
        ]
    },
    {
        category: "sholat-wajib",
        categoryLabel: "Bacaan & Gerakan Sholat",
        id: "tasyahud-akhir",
        title: "Bacaan Tasyahud (Tahiyyat) Akhir",
        description: "Duduk tawarruk pada rakaat terakhir sholat sebelum mengucapkan salam untuk mengakhiri ibadah.",
        steps: [
            {
                name: "Bacaan Tasyahud Akhir",
                ar: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ... اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ وَبَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِIDٌ",
                la: "At-tahiyyatu al-mubarakatu as-salawatu at-tayyibatu lillah... Allahumma shalli 'ala Muhammad wa 'ala ali Muhammad kama shallaita 'ala Ibrahim wa 'ala ali Ibrahim, wa barik 'ala Muhammad wa 'ala ali Muhammad kama barakta 'ala Ibrahim wa 'ala ali Ibrahim, fil 'alamina innaka hamidum majid.",
                id: "Segala penghormatan yang penuh keberkahan, shalawat yang baik adalah milik Allah... Ya Allah, limpahkanlah rahmat kepada Muhammad dan keluarga Muhammad sebagaimana Engkau limpahkan rahmat kepada Ibrahim dan keluarga Ibrahim. Dan berkahilah Muhammad dan keluarga Muhammad sebagaimana Engkau berkahi Ibrahim dan keluarga Ibrahim di seluruh alam semesta. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.",
                audio: "https://akuislam.com/wp-content/uploads/2019/07/Tahiyat-Akhir.mp3" // Real human voice!
            }
        ]
    },

    // === CATEGORY: SHOLAT SUNNAH ===
    {
        category: "sholat-sunnah",
        categoryLabel: "Sholat Sunnah Pengiring",
        id: "sholat-rawatib",
        title: "Niat Sholat Sunnah Rawatib",
        description: "Sholat sunnah pengiring sholat fardhu, dilakukan sebelum sholat fardhu (Qabliyah) atau sesudahnya (Ba'diyah).",
        steps: [
            {
                name: "Niat Sholat Rawatib Qobliyah (Sebelum Sholat)",
                ar: "أُصَلِّي سُنَّةَ الظُّهْرِ رَكْعَتَيْنِ قَبْلِيَّةً لِلَّهِ تَعَالَى",
                la: "Usollii sunnatadh dzhuhri rak'ataini qabliyyatan lillaahi ta'aalaa.",
                id: "Aku niat sholat sunnah sebelum Zuhur dua rakaat karena Allah Ta'ala.",
                audio: ""
            },
            {
                name: "Niat Sholat Rawatib Ba'diyah (Sesudah Sholat)",
                ar: "أُصَلِّي سُنَّةَ الظُّهْرِ رَكْعَتَيْنِ بَعْدِيَّةً لِلَّهِ تَعَالَى",
                la: "Usollii sunnatadh dzhuhri rak'ataini ba'diyyatan lillaahi ta'aalaa.",
                id: "Aku niat sholat sunnah sesudah Zuhur dua rakaat karena Allah Ta'ala.",
                audio: ""
            }
        ]
    },
    {
        category: "sholat-sunnah",
        categoryLabel: "Sholat Sunnah Malam",
        id: "sholat-tahajud",
        title: "Niat & Doa Sholat Tahajud",
        description: "Sholat malam yang dikerjakan setelah bangun tidur (sepertiga malam terakhir). Sangat dianjurkan untuk kedekatan spiritual.",
        steps: [
            {
                name: "Niat Sholat Tahajud",
                ar: "أُصَلِّي سُنَّةَ التَّهَجُّدِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
                la: "Usollii sunnatat tahajjudi rak'ataini lillaahi ta'aalaa.",
                id: "Aku niat sholat sunnah Tahajud dua rakaat karena Allah Ta'ala.",
                audio: ""
            }
        ]
    },
    {
        category: "sholat-sunnah",
        categoryLabel: "Sholat Sunnah Pagi",
        id: "sholat-dhuha",
        title: "Niat & Doa Sholat Dhuha",
        description: "Sholat sunnah pagi hari sejak matahari naik setinggi tombak hingga menjelang Zuhur. Berkhasiat melapangkan rezeki.",
        steps: [
            {
                name: "Niat Sholat Dhuha",
                ar: "أُصَلِّي سُنَّةَ الضُّحَى رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
                la: "Usolli sunnatadh dhuha rak'ataini lillahi ta'ala.",
                id: "Aku niat sholat sunnah Dhuha dua rakaat karena Allah Ta'ala.",
                audio: ""
            },
            {
                name: "Doa Setelah Sholat Dhuha",
                ar: "اَللّٰهُمَّ اِنَّ الضُّحَآءَ ضُحَآؤُكَ وَالْبَهَآءَ بَهَاؤُكَ وَالْجَمَالَ جَمَالُكَ وَالْقُوَّةَ قُوَّتُكَ وَالْقُدْرَةَ قُدْرَتُكَ وَالْعِصْمَةَ عِصْمَتُكَ. اَللّٰهُمَّ اِنْ كَانَ رِزْقِى فِى السَّمَآءِ فَأَنْزِلْهُ وَاِنْ كَانَ فِى اْlaَرْضِ فَأَخْرِجْهُ",
                la: "Allahumma innad dhuha'a dhuha'uka, wal baha'a baha'uka, wal jamala jamaluka, wal quwwata quwwatuka, wal qudrata qudratuka, wal 'ismata 'ismatuka. Allahumma in kana rizqi fis sama-i fa anzilhu, wa in kana fil ardhi fa akhrijhu.",
                id: "Ya Allah, sesungguhnya waktu dhuha adalah waktu dhuha-Mu, keindahan adalah keindahan-Mu, keindahan adalah keindahan-Mu, kekuatan adalah kekuatan-Mu, kekuasaan adalah kekuasaan-Mu, dan perlindungan adalah perlindungan-Mu. Ya Allah, jika rezekiku berada di atas langit maka turunkanlah, jika berada di dalam bumi maka keluarkanlah.",
                audio: ""
            }
        ]
    },
    {
        category: "sholat-sunnah",
        categoryLabel: "Sholat Sunnah Penutup",
        id: "sholat-witir",
        title: "Niat Sholat Witir",
        description: "Sholat sunnah dengan rakaat ganjil (minimal 1 rakaat) sebagai penutup sholat-sholat sunnah malam hari.",
        steps: [
            {
                name: "Niat Sholat Witir (1 Rakaat)",
                ar: "أُصَلِّي سُنَّةَ الْوِتْرِ رَكْعَةً لِلَّهِ تَعَالَى",
                la: "Usollii sunnatal witri rak'atan lillaahi ta'aalaa.",
                id: "Aku niat sholat sunnah Witir satu rakaat karena Allah Ta'ala.",
                audio: ""
            },
            {
                name: "Niat Sholat Witir (2 Rakaat sebagai pembuka)",
                ar: "أُصَلِّي سُنَّةَ الْوِtْرِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
                la: "Usollii sunnatal witri rak'ataini lillaahi ta'aalaa.",
                id: "Aku niat sholat sunnah Witir dua rakaat karena Allah Ta'ala.",
                audio: ""
            }
        ]
    },
    {
        category: "sholat-sunnah",
        categoryLabel: "Sholat Sunnah Khusus",
        id: "sholat-hari-raya",
        title: "Niat Sholat Hari Raya (Idul Fitri / Idul Adha)",
        description: "Dikerjakan setahun sekali sebanyak 2 rakaat berjamaah pada pagi hari raya Idul Fitri (1 Syawal) dan Idul Adha (10 Dzulhijjah).",
        steps: [
            {
                name: "Niat Sholat Idul Fitri (Sebagai Makmum)",
                ar: "أُصَلِّي سُنَّةً لِعِيدِ الْفِطْرِ رَكْعَتَيْنِ مَأْمُومًا لِلَّهِ تَعَالَى",
                la: "Usollii sunnatal li'iidil fitri rak'ataini ma'muman lillaahi ta'aalaa.",
                id: "Aku niat sholat sunnah Idul Fitri dua rakaat sebagai makmum karena Allah Ta'ala.",
                audio: ""
            },
            {
                name: "Niat Sholat Idul Adha (Sebagai Makmum)",
                ar: "أُصَلِّي سُنَّةً لِعِيدِ الْأَضْحَى رَكْعَتَيْنِ مَأْمُومًا لِلَّهِ تَعَالَى",
                la: "Usollii sunnatal li'iidil adha rak'ataini ma'muman lillaahi ta'aalaa.",
                id: "Aku niat sholat sunnah Idul Adha dua rakaat sebagai makmum karena Allah Ta'ala.",
                audio: ""
            }
        ]
    },
    {
        category: "sholat-sunnah",
        categoryLabel: "Sholat Sunnah Ramadhan",
        id: "sholat-tarawih",
        title: "Niat Sholat Tarawih",
        description: "Sholat sunnah yang khusus dikerjakan secara berjamaah pada malam hari bulan suci Ramadhan setelah sholat Isya.",
        steps: [
            {
                name: "Niat Sholat Tarawih (2 Rakaat - Sebagai Makmum)",
                ar: "أُصَلِّي سُنَّةَ التَّرَاوِيحِ رَكْعَتَيْنِ مَأْمُومًا لِلَّهِ تَعَالَى",
                la: "Usollii sunnatat taraawiihi rak'ataini ma'muman lillaahi ta'aalaa.",
                id: "Aku niat sholat sunnah Tarawih dua rakaat sebagai makmum karena Allah Ta'ala.",
                audio: ""
            }
        ]
    },
    {
        category: "sholat-sunnah",
        categoryLabel: "Sholat Sunnah Khusus",
        id: "sholat-hajat",
        title: "Niat Sholat Hajat",
        description: "Sholat sunnah 2 rakaat untuk memohon agar suatu hajat, kebutuhan, atau impian dikabulkan oleh Allah SWT.",
        steps: [
            {
                name: "Niat Sholat Hajat",
                ar: "أُصَلِّي سُنَّةَ الْحَاجَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
                la: "Usollii sunnatal haajati rak'ataini lillaahi ta'aalaa.",
                id: "Aku niat sholat sunnah Hajat dua rakaat karena Allah Ta'ala.",
                audio: ""
            }
        ]
    },
    {
        category: "sholat-sunnah",
        categoryLabel: "Sholat Sunnah Khusus",
        id: "sholat-istikharah",
        title: "Niat Sholat Istikharah",
        description: "Sholat sunnah 2 rakaat yang dikerjakan saat seseorang dihadapkan pada kebimbangan untuk memohon petunjuk pilihan terbaik.",
        steps: [
            {
                name: "Niat Sholat Istikharah",
                ar: "أُصَلِّي سُنَّةَ الاِسْتِخَارَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
                la: "Usollii sunnatal istikhaarati rak'ataini lillaahi ta'aalaa.",
                id: "Aku niat sholat sunnah Istikharah dua rakaat karena Allah Ta'ala.",
                audio: ""
            }
        ]
    },
    {
        category: "sholat-sunnah",
        categoryLabel: "Sholat Sunnah Khusus",
        id: "sholat-gerhana",
        title: "Niat & Panduan Sholat Gerhana (Kusuf / Khusuf)",
        description: "Sholat sunnah 2 rakaat yang dilakukan ketika terjadi gerhana matahari (Kusuf) atau bulan (Khusuf) dengan tata cara 2x ruku per rakaat.",
        steps: [
            {
                name: "Niat Sholat Gerhana Bulan (Khusuf - Sebagai Makmum)",
                ar: "أُصَلِّي سُنَّةَ الْخُسُوفِ رَكْعَتَيْنِ مَأْمُومًا لِلَّهِ تَعَالَى",
                la: "Usolli sunnatal khusufi rak'ataini ma'muman lillahi ta'ala.",
                id: "Aku niat sholat sunnah gerhana bulan dua rakaat sebagai makmum karena Allah Ta'ala.",
                audio: ""
            },
            {
                name: "Tata Cara Unik Sholat Gerhana",
                ar: "الرَّكْعَةُ الأُولَى: تَكْبِيرَةُ الإِحْرَامِ، الْقِرَاءَةُ... ثُمَّ الرُّكُوعُ الثَّانِي، ثُمَّ السُّجُودُ دُفْعَتَيْنِ",
                la: "Rakaat Pertama: Takbiratul Ihram, baca Al-Fatihah, lalu Ruku. Bangkit berdiri lagi, baca Al-Fatihah kedua, ruku kedua, lalu sujud.",
                id: "Setiap rakaat terdiri dari dua kali berdiri membaca surah dan dua kali gerakan ruku sebelum turun untuk sujud.",
                audio: ""
            }
        ]
    },
    {
        category: "sholat-sunnah",
        categoryLabel: "Sholat Sunnah Khusus",
        id: "sholat-tahiyyatul-masjid",
        title: "Niat Sholat Tahiyyatul Masjid",
        description: "Sholat sunnah dua rakaat yang dikerjakan saat seseorang baru memasuki pintu masjid sebagai bentuk penghormatan bagi baitullah.",
        steps: [
            {
                name: "Niat Sholat Tahiyyatul Masjid",
                ar: "أُصَلِّي سُنَّةَ تَحِيَّةِ الْمَسْجِدِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
                la: "Usollii sunnata tahiyyatil masjidi rak'ataini lillaahi ta'aalaa.",
                id: "Aku niat sholat sunnah penghormatan masjid dua rakaat karena Allah Ta'ala.",
                audio: ""
            }
        ]
    },
    {
        category: "sholat-sunnah",
        categoryLabel: "Sholat Sunnah Khusus",
        id: "sholat-tobat",
        title: "Niat & Doa Sholat Tobat",
        description: "Sholat sunnah 2 rakaat yang dikerjakan ketika seseorang ingin memohon ampunan dari segala kesalahan dan dosa.",
        steps: [
            {
                name: "Niat Sholat Tobat",
                ar: "أُصَلِّي سُنَّةَ التَّوْبَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
                la: "Usolli sunnatat tawbati rak'ataini lillahi ta'ala.",
                id: "Aku niat sholat sunnah tobat dua rakaat karena Allah Ta'ala.",
                audio: ""
            },
            {
                name: "Istighfar Setelah Sholat (Dibaca 100x)",
                ar: "أَسْتَغْفِرُ اللهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
                la: "Astaghfirullahal 'azhim alladzi la ilaha illa huwal hayyul qayyumu wa atubu ilaih.",
                id: "Aku memohon ampun kepada Allah Yang Maha Agung, tiada Tuhan selain Dia yang Maha Hidup lagi terus menerus mengurus makhluk-Nya, dan aku bertobat kepada-Nya.",
                audio: ""
            }
        ]
    }
];
