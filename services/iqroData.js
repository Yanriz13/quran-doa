// services/iqroData.js
export const iqroData = [
    {
        level: 1,
        title: "Iqro 1",
        description: "Mengenal huruf Hijaiyah tunggal dengan tanda baca Fathah (suara 'a')",
        color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        lessons: [
            {
                name: "Huruf Alif - Ba - Ta",
                instruction: "Baca dengan pendek dan cepat. Jangan dipanjangkan.",
                items: [
                    { ar: "أَ", la: "a" }, { ar: "بَ", la: "ba" }, { ar: "تَ", la: "ta" },
                    { ar: "أَ بَ", la: "a - ba" }, { ar: "بَ أَ", la: "ba - a" }, { ar: "تَ أَ بَ", la: "ta - a - ba" }
                ]
            },
            {
                name: "Huruf Tsa - Jim - Ha",
                instruction: "Tsa diujung lidah. Jim dibaca mantap. Ha bersih dari tenggorokan.",
                items: [
                    { ar: "ثَ", la: "tsa" }, { ar: "جَ", la: "ja" }, { ar: "حَ", la: "ha" },
                    { ar: "ثَ جَ", la: "tsa - ja" }, { ar: "حَ أَ ثَ", la: "ha - a - tsa" }, { ar: "جَ حَ بَ", la: "ja - ha - ba" }
                ]
            },
            {
                name: "Huruf Kho - Dal - Dzal",
                instruction: "Kho serak tenggorokan atas. Dal tipis. Dzal lembut di ujung gigi seri.",
                items: [
                    { ar: "خَ", la: "kho" }, { ar: "دَ", la: "da" }, { ar: "ذَ", la: "dza" },
                    { ar: "خَ دَ", la: "kho - da" }, { ar: "ذَ أَ خَ", la: "dza - a - kho" }, { ar: "دَ خَ ذَ", la: "da - kho - dza" }
                ]
            }
        ]
    },
    {
        level: 2,
        title: "Iqro 2",
        description: "Membaca huruf bersambung pendek (2-3 suku kata)",
        color: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
        lessons: [
            {
                name: "Pengenalan Huruf Sambung",
                instruction: "Perhatikan bentuk huruf saat di awal, di tengah, dan di akhir kata.",
                items: [
                    { ar: "بَا", la: "baa" }, { ar: "تَا", la: "taa" }, { ar: "بَتَا", la: "ba - taa" },
                    { ar: "تَابَ", la: "taa - ba" }, { ar: "بَابَا", la: "baa - baa" }, { ar: "ثَبَتَا", la: "tsa - ba - taa" }
                ]
            },
            {
                name: "Ejaan 3 Huruf Pendek",
                instruction: "Baca sekaligus secara cepat, tidak boleh dieja terputus-putus.",
                items: [
                    { ar: "كَتَبَ", la: "ka - ta - ba" }, 
                    { ar: "ضَرَبَ", la: "dho - ro - ba" }, 
                    { ar: "خَلَقَ", la: "kho - lo - qo" },
                    { ar: "جَلَسَ", la: "ja - la - sa" }, 
                    { ar: "صَدَقَ", la: "sho - da - qo" }, 
                    { ar: "قَرَأَ", la: "qo - ro - a" }
                ]
            }
        ]
    },
    {
        level: 3,
        title: "Iqro 3",
        description: "Mengenal Harakat Kasrah ('i'), Dhummah ('u'), dan Mad Asli (panjang)",
        color: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
        lessons: [
            {
                name: "Kasrah ( ِ ) dan Dhummah ( ُ )",
                instruction: "Bunyi Fathah = a, Kasrah = i, Dhummah = u.",
                items: [
                    { ar: "اِ", la: "i" }, { ar: "بِ", la: "bi" }, { ar: "اُ", la: "u" },
                    { ar: "بُ", la: "bu" }, { ar: "اِ بُ", la: "i - bu" }, { ar: "اَ بِ يْ", la: "a - bii" }
                ]
            },
            {
                name: "Harakat Campuran & Panjang",
                instruction: "Hati-hati dalam membedakan bunyi pendek (1 ketukan) dan panjang (2 ketukan).",
                items: [
                    { ar: "كُتِبَ", la: "ku - ti - ba" }, 
                    { ar: "رُسِلَ", la: "ru - si - la" }, 
                    { ar: "كِتَابٌ", la: "ki - taa - bun" },
                    { ar: "غَفُوْرٌ", la: "gho - fuu - run" }, 
                    { ar: "سَمِيْعٌ", la: "sa - mii - 'un" }, 
                    { ar: "عَبِيْدُ", la: "a - bii - du" }
                ]
            }
        ]
    },
    {
        level: 4,
        title: "Iqro 4",
        description: "Mengenal Tanwin, Sukun (mati), dan huruf memantul (Qalqalah)",
        color: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
        lessons: [
            {
                name: "Tanwin (ً   ٍ   ٌ)",
                instruction: "Fathatain berbunyi 'an', kasratain 'in', dhummatain 'un'.",
                items: [
                    { ar: "كِتَابًا", la: "ki - taa - ban" }, 
                    { ar: "رَحْمَةً", la: "roh - ma - tan" }, 
                    { ar: "عَمَلٌ", la: "a - ma - lun" },
                    { ar: "عَذَابٍ", la: "a - żaa - bin" }, 
                    { ar: "سَمِعًا", la: "sa - mii - an" }, 
                    { ar: "اَحَدٌ", la: "a - ha - dun" }
                ]
            },
            {
                name: "Sukun (Mati) & Qalqalah",
                instruction: "Huruf mati dibaca jelas. Huruf Qalqalah (ب, j, d, th, q) memantul saat mati.",
                items: [
                    { ar: "أَبْتَرَ", la: "ab - ta - ro" }, 
                    { ar: "يَجْعَلْ", la: "yaj - al (pantulkan j)" }, 
                    { ar: "فَلَقْ", la: "fa - laq (pantulkan q)" },
                    { ar: "تَعْبُدُ", la: "ta' - bu - du" }, 
                    { ar: "أَرْسَلَ", la: "ar - sa - la" }, 
                    { ar: "يَدْخُلْ", la: "yad - khul (pantulkan d)" }
                ]
            }
        ]
    },
    {
        level: 5,
        title: "Iqro 5",
        description: "Mengenal Tasydid (double), Waqaf (berhenti), dan Alif Lam",
        color: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
        lessons: [
            {
                name: "Tasydid ( ّ )",
                instruction: "Tekan suara huruf selama 2 harakat (diberi penekanan ganda).",
                items: [
                    { ar: "رَبَّ", la: "rob - ba" }, 
                    { ar: "ثُمَّ", la: "tsum - ma" }, 
                    { ar: "اِنَّ", la: "in - na" },
                    { ar: "فَعَّالٌ", la: "fa' - 'aal" }, 
                    { ar: "كَذَّبَ", la: "każ - ża - ba" }, 
                    { ar: "سَبَّحَ", la: "sab - ba - ha" }
                ]
            },
            {
                name: "Latihan Waqaf (Henti)",
                instruction: "Huruf terakhir dibaca mati/sukun saat waqaf.",
                items: [
                    { ar: "عَمَلٌ صَالِحٌ", la: "a-ma-lun shoo-lih" }, 
                    { ar: "يَوْمِ الدِّيْنِ", la: "yaw-mid-diin" }, 
                    { ar: "الْقَارِعَةُ", la: "al-qoo-ri-'ah" },
                    { ar: "نَسْتَعِيْنُ", la: "nas-ta-'iin" }, 
                    { ar: "الْكَوْثَرَ", la: "al-kaw-tsar" }
                ]
            }
        ]
    },
    {
        level: 6,
        title: "Iqro 6",
        description: "Aturan Tajwid (Nun/Mim mati, Ikhfa, Idgham) dan Mad Lazim",
        color: "linear-gradient(135deg, #ca8a04 0%, #a16207 100%)",
        lessons: [
            {
                name: "Ikhfa & Idgham",
                instruction: "Ikhfa dibaca mendengung samar. Idgham dibaca melebur masuk ke huruf berikutnya.",
                items: [
                    { ar: "مِنْ قَبْلِ", la: "ming-qob-li (Ikhfa)" }, 
                    { ar: "مَنْ يَقُوْلُ", la: "may-ya-quu-lu (Idgham)" },
                    { ar: "عَنْ صَلَاتِهِمْ", la: "ngan-sholaa-tihim" }, 
                    { ar: "مِنْ مَاءٍ", la: "mim-maa-in" }
                ]
            },
            {
                name: "Mad Lazim & Panjang",
                instruction: "Dibaca sangat panjang (5-6 ketukan).",
                items: [
                    { ar: "جَاۤءَتْ", la: "jaaaa-at" }, 
                    { ar: "الضَّآلِّيْنَ", la: "adh-dhooooool-liin" },
                    { ar: "خَاۤئِفِيْنَ", la: "khoooo-i-fiin" }, 
                    { ar: "وَلَا الضَّآلِّ", la: "wa ladh-dhooool" }
                ]
            }
        ]
    }
];
