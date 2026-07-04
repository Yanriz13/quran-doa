// Components/QuranShorts.js
import { ref, onMounted, onUnmounted, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { iqroData } from "../services/iqroData.js";

export default {
    name: "QuranShorts",
    template: `
        <div class="quran-tab tab-content">
            <!-- 1. MAIN SELECTION MENU -->
            <div v-if="currentSection === 'menu'" class="mengaji-menu-view">
                <div class="card welcome-card text-center mb-4">
                    <span class="welcome-emoji">📖</span>
                    <h2>Kalam & Mengaji</h2>
                    <p class="text-sm text-muted mt-1">Pilih aktivitas belajar membaca atau membaca Al-Quran hari ini</p>
                </div>

                <div class="menu-cards-container flex flex-col gap-3">
                    <!-- Option A: Al-Quran -->
                    <div class="card menu-card flex align-center gap-4" @click="currentSection = 'quran'">
                        <div class="menu-card-icon quran-bg flex align-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                        </div>
                        <div class="menu-card-info flex-1">
                            <h3>Al-Quran & Tafsir</h3>
                            <p class="text-xs text-muted">Baca 114 Surah lengkap, terjemahan, tafsir Kemenag, dan murottal audio.</p>
                        </div>
                        <div class="arrow-right">➡️</div>
                    </div>

                    <!-- Option B: Iqro Digital -->
                    <div class="card menu-card flex align-center gap-4" @click="currentSection = 'iqro'">
                        <div class="menu-card-icon iqro-bg flex align-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>
                        </div>
                        <div class="menu-card-info flex-1">
                            <h3>Belajar Iqro (1 - 6)</h3>
                            <p class="text-xs text-muted">Metode cepat belajar membaca huruf Hijaiyah, harakat, sukun, hingga tajwid dasar.</p>
                        </div>
                        <div class="arrow-right">➡️</div>
                    </div>
                </div>
            </div>

            <!-- 2. AL-QURAN SECTION -->
            <div v-if="currentSection === 'quran'" class="quran-sub-section">
                <!-- Surah List View -->
                <div v-if="!selectedSurah" class="surah-list-view">
                    <div class="surah-nav-header flex justify-between align-center mb-3">
                        <button class="btn btn-back-new" @click="currentSection = 'menu'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            <span>Menu Utama</span>
                        </button>
                    </div>

                    <div class="card search-card">
                        <div class="search-box">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <input type="text" v-model="searchQuery" placeholder="Cari surah (misal: Al-Kahfi, Ya Sin)..." />
                        </div>
                    </div>
                    
                    <div class="surah-list">
                        <div 
                            v-for="s in filteredSurahs" 
                            :key="s.nomor" 
                            class="card surah-item-card flex align-center justify-between"
                            @click="selectSurah(s.nomor)"
                        >
                            <div class="surah-item-left flex align-center gap-3">
                                <div class="surah-num">{{ s.nomor }}</div>
                                <div>
                                    <h3 class="surah-name">{{ s.namaLatin }}</h3>
                                    <span class="surah-desc text-xs text-muted">
                                        {{ s.tempatTurun === 'mekah' ? 'Makkiyah' : 'Madaniyah' }} • {{ s.jumlahAyat }} Ayat
                                    </span>
                                </div>
                            </div>
                            <div class="surah-item-right text-right">
                                <span class="surah-arabic arabic">{{ s.nama }}</span>
                                <span class="surah-meaning text-xs text-muted block">{{ s.arti }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Surah Detail Reader View -->
                <div v-else class="surah-detail-view">
                    <!-- Navigation & Action Header -->
                    <div class="surah-nav-header flex justify-between align-center mb-3">
                        <button class="btn btn-back-new" @click="closeSurah">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            <span>Daftar Surah</span>
                        </button>
                        
                        <button class="btn btn-audio-new" :class="{ playing: isAudioPlaying }" @click="toggleAudio">
                            <svg v-if="!isAudioPlaying" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                            <span>{{ isAudioPlaying ? 'Jeda Audio' : 'Murottal' }}</span>
                        </button>
                    </div>

                    <!-- Top Hero Header Card -->
                    <div class="card surah-hero-card text-center mb-3">
                        <span class="badge-revelation mb-2 inline-block">{{ selectedSurah.tempatTurun === 'mekah' ? 'Makkiyah' : 'Madaniyah' }}</span>
                        <h2 class="hero-latin-name">{{ selectedSurah.namaLatin }}</h2>
                        <h1 class="hero-arabic-name arabic">{{ selectedSurah.nama }}</h1>
                        <p class="hero-meta text-xs text-muted">
                            Surah Ke-{{ selectedSurah.nomor }} • {{ selectedSurah.jumlahAyat }} Ayat • Arti: {{ selectedSurah.arti }}
                        </p>
                    </div>

                    <!-- Reader Mode Toggle (Ayat vs Tafsir) -->
                    <div class="reader-mode-toggle flex gap-1 mb-3">
                        <button 
                            :class="['btn-toggle-tab flex-1', { active: readerMode === 'ayat' }]"
                            @click="readerMode = 'ayat'"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                            <span>Teks Ayat</span>
                        </button>
                        <button 
                            :class="['btn-toggle-tab flex-1', { active: readerMode === 'tafsir' }]"
                            @click="switchToTafsirMode"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                            <span>Tafsir Kemenag</span>
                        </button>
                    </div>

                    <!-- Murottal Player Status -->
                    <div v-if="isAudioPlaying || audioLoading" class="card audio-status-card flex align-center justify-between">
                        <div class="audio-info flex align-center gap-2">
                            <span class="pulse-icon" v-if="isAudioPlaying">🔊</span>
                            <span v-else>⏳</span>
                            <span class="text-sm">Mendengarkan Murottal (Syeikh Al-Afasy)</span>
                        </div>
                        <span class="audio-timer text-xs text-muted">{{ audioStatusText }}</span>
                    </div>

                    <!-- Surah Content - Ayat Mode -->
                    <div v-if="readerMode === 'ayat'" class="verses-list flex flex-col gap-3">
                        <!-- Bismillah Card -->
                        <div class="card bismillah-card text-center py-4" v-if="selectedSurah.nomor !== 1 && selectedSurah.nomor !== 9">
                            <span class="bismillah arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
                        </div>

                        <!-- Verses Card List -->
                        <div v-for="v in selectedSurah.ayat" :key="v.nomorAyat" class="card verse-card">
                            <div class="verse-header flex justify-between align-start mb-3">
                                <div class="verse-badge">{{ v.nomorAyat }}</div>
                                <div class="verse-arabic-container">
                                    <p class="arabic verse-arabic">{{ v.teksArab }}</p>
                                </div>
                            </div>
                            <div class="verse-body">
                                <p class="verse-latin">{{ v.teksLatin }}</p>
                                <p class="verse-translation">{{ v.teksIndonesia }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Surah Content - Tafsir Mode -->
                    <div v-if="readerMode === 'tafsir' && selectedTafsir" class="tafsir-list flex flex-col gap-3">
                        <div v-for="t in selectedTafsir.tafsir" :key="t.ayat" class="card tafsir-card">
                            <div class="tafsir-header flex align-center gap-2 mb-3">
                                <span class="verse-badge">{{ t.ayat }}</span>
                                <span class="tafsir-title">Tafsir Ayat {{ t.ayat }}</span>
                            </div>
                            
                            <!-- Small Arabic Verse Preview -->
                            <p class="arabic tafsir-verse-preview text-right mb-3 text-muted" v-if="getVerseArabic(t.ayat)">
                                {{ getVerseArabic(t.ayat) }}
                            </p>
                            
                            <!-- Tafsir Paragraph -->
                            <p class="tafsir-text">{{ t.teks }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. IQRO DIGITAL SECTION -->
            <div v-if="currentSection === 'iqro'" class="iqro-sub-section">
                <!-- Level Selector screen -->
                <div v-if="!selectedIqroLevel" class="iqro-levels-list">
                    <div class="surah-nav-header flex justify-between align-center mb-3">
                        <button class="btn btn-back-new" @click="currentSection = 'menu'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            <span>Menu Utama</span>
                        </button>
                    </div>

                    <div class="card welcome-card text-center mb-4" style="background: radial-gradient(circle at bottom right, rgba(234, 179, 8, 0.12), var(--bg-card));">
                        <span class="welcome-emoji">🎓</span>
                        <h2>Pilih Tingkat Iqro</h2>
                        <p class="text-sm text-muted mt-1">Belajar membaca Al-Quran dari jilid 1 sampai 6</p>
                    </div>

                    <div class="iqro-grid">
                        <div 
                            v-for="iqro in iqros" 
                            :key="iqro.level" 
                            class="card iqro-book-card"
                            :style="{ background: iqro.color }"
                            @click="selectIqroLevel(iqro)"
                        >
                            <div class="iqro-book-badge">Jilid {{ iqro.level }}</div>
                            <h3>{{ iqro.title }}</h3>
                            <p>{{ iqro.description }}</p>
                        </div>
                    </div>
                </div>

                <!-- Lesson List or Interactive Study Board screen -->
                <div v-else class="iqro-lesson-view">
                    <!-- Lesson selection -->
                    <div v-if="selectedIqroLesson === null" class="iqro-lessons-list-view">
                        <div class="surah-nav-header flex justify-between align-center mb-3">
                            <button class="btn btn-back-new" @click="selectedIqroLevel = null">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                <span>Pilih Jilid</span>
                            </button>
                            <span class="iqro-current-badge">{{ selectedIqroLevel.title }}</span>
                        </div>

                        <div class="card info-card mb-3">
                            <h4>Materi {{ selectedIqroLevel.title }}</h4>
                            <p class="text-xs text-muted mt-1">{{ selectedIqroLevel.description }}</p>
                        </div>

                        <div class="lessons-grid flex flex-col gap-3">
                            <div 
                                v-for="(lesson, idx) in selectedIqroLevel.lessons" 
                                :key="idx"
                                class="card lesson-item-card flex justify-between align-center"
                                @click="selectedIqroLesson = idx"
                            >
                                <div>
                                    <span class="lesson-number">Bab {{ idx + 1 }}</span>
                                    <h3 class="lesson-name">{{ lesson.name }}</h3>
                                </div>
                                <span class="arrow-right">➡️</span>
                            </div>
                        </div>
                    </div>

                    <!-- Study Board (Flashcards) -->
                    <div v-else class="iqro-study-board">
                        <div class="surah-nav-header flex justify-between align-center mb-3">
                            <button class="btn btn-back-new" @click="selectedIqroLesson = null">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                <span>Daftar Bab</span>
                            </button>
                            <span class="iqro-current-badge">{{ selectedIqroLevel.title }} - Bab {{ selectedIqroLesson + 1 }}</span>
                        </div>

                        <!-- Lesson Instruction card -->
                        <div class="card instruction-card mb-4">
                            <h4>{{ currentLesson.name }}</h4>
                            <p class="text-xs text-muted mt-1">{{ currentLesson.instruction }}</p>
                        </div>

                        <!-- Hijaiyah Flashcards Grid -->
                        <div class="iqro-cards-grid">
                            <div 
                                v-for="(item, idx) in currentLesson.items" 
                                :key="idx"
                                class="iqro-card-container"
                                @click="flipIqroCard(idx)"
                            >
                                <div :class="['iqro-card', { flipped: isCardFlipped(idx) }]">
                                    <!-- Front: Arabic Letter -->
                                    <div class="iqro-card-front">
                                        <div class="iqro-arabic-wrapper">
                                            <span class="arabic iqro-arabic-text">{{ item.ar }}</span>
                                        </div>
                                        <span class="tap-hint">Ketuk</span>
                                    </div>
                                    <!-- Back: Latin Spelling -->
                                    <div class="iqro-card-back">
                                        <div class="iqro-latin-wrapper">
                                            <span class="iqro-latin-text">{{ item.la }}</span>
                                        </div>
                                        <span class="flipped-ar arabic">{{ item.ar }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Progress Bar & Actions -->
                        <div class="card progress-action-card mt-4 flex flex-col gap-3">
                            <div class="progress-info flex justify-between text-xs">
                                <span>Kemajuan Belajar:</span>
                                <span><strong>{{ activeLessonFlippedCount }}</strong> dari <strong>{{ currentLesson.items.length }}</strong> Kartu</span>
                            </div>
                            <div class="progress-bar-bg">
                                <div class="progress-bar-fill" :style="{ width: lessonProgressPercent + '%' }"></div>
                            </div>
                            
                            <div class="flex justify-between gap-2 mt-2">
                                <button 
                                    class="btn btn-secondary flex-1" 
                                    :disabled="selectedIqroLesson === 0"
                                    @click="navigateLesson(-1)"
                                >
                                    Sebelumnya
                                </button>
                                <button 
                                    class="btn btn-primary flex-1"
                                    @click="navigateLesson(1)"
                                >
                                    {{ isLastLesson ? 'Selesai Jilid' : 'Berikutnya' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading Spinner Overlay -->
            <div v-if="loading" class="loading-overlay flex flex-col align-center justify-center">
                <div class="spinner"></div>
                <p class="mt-4">{{ loadingText }}</p>
            </div>
        </div>
    `,
    setup() {
        const currentSection = ref("menu"); // 'menu', 'quran', 'iqro'
        const searchQuery = ref("");
        const selectedSurah = ref(null);
        const selectedTafsir = ref(null);
        const readerMode = ref("ayat"); // 'ayat' or 'tafsir'
        const loading = ref(false);
        const loadingText = ref("Memuat data...");
        const audioLoading = ref(false);
        const isAudioPlaying = ref(false);
        const audioSrc = ref("");
        const audioStatusText = ref("");

        // Iqro State variables
        const selectedIqroLevel = ref(null);
        const selectedIqroLesson = ref(null);
        const flippedCards = ref({}); // key: 'level-lesson-index', value: boolean

        const iqros = ref(iqroData);

        const currentLesson = computed(() => {
            if (selectedIqroLevel.value && selectedIqroLesson.value !== null) {
                return selectedIqroLevel.value.lessons[selectedIqroLesson.value];
            }
            return null;
        });

        // Flashcards state helpers
        const isCardFlipped = (idx) => {
            if (!selectedIqroLevel.value || selectedIqroLesson.value === null) return false;
            const key = `${selectedIqroLevel.value.level}-${selectedIqroLesson.value}-${idx}`;
            return !!flippedCards.value[key];
        };

        let activeAudios = [];
        let sequenceTimeoutId = null;

        const stopAllIqroAudio = () => {
            if (sequenceTimeoutId) {
                clearTimeout(sequenceTimeoutId);
                sequenceTimeoutId = null;
            }
            activeAudios.forEach(audio => {
                try {
                    audio.pause();
                    audio.currentTime = 0;
                    audio.src = "";
                } catch (e) {
                    console.warn("Gagal menghentikan audio:", e);
                }
            });
            activeAudios = [];
        };

        const playIqroVoice = (item) => {
            try {
                // Hentikan suara yang sedang aktif terlebih dahulu
                stopAllIqroAudio();

                // Kita gunakan Google Translate TTS proxy untuk melafalkan Teks Persis yang tertulis di kartu
                const ttsUrl = `./proxy.php?tts=${encodeURIComponent(item.ar)}`;
                const audio = new Audio(ttsUrl);
                activeAudios.push(audio);
                audio.play().catch(e => console.warn("Google TTS block:", e));
                audio.onended = () => {
                    const idx = activeAudios.indexOf(audio);
                    if (idx > -1) activeAudios.splice(idx, 1);
                };
            } catch (err) {
                console.error("Gagal memutar suara Iqro:", err);
            }
        };

        const flipIqroCard = (idx) => {
            if (!selectedIqroLevel.value || selectedIqroLesson.value === null) return;
            const key = `${selectedIqroLevel.value.level}-${selectedIqroLesson.value}-${idx}`;
            
            // Toggle flip
            flippedCards.value[key] = !flippedCards.value[key];

            // Haptic Feedback
            if (navigator.vibrate) {
                navigator.vibrate(20);
            }

            // Play voice guide
            const item = currentLesson.value.items[idx];
            if (item) {
                playIqroVoice(item);
            }
        };

        const activeLessonFlippedCount = computed(() => {
            if (!currentLesson.value) return 0;
            let count = 0;
            for (let i = 0; i < currentLesson.value.items.length; i++) {
                if (isCardFlipped(i)) count++;
            }
            return count;
        });

        const lessonProgressPercent = computed(() => {
            if (!currentLesson.value) return 0;
            return Math.round((activeLessonFlippedCount.value / currentLesson.value.items.length) * 100);
        });

        const isLastLesson = computed(() => {
            if (!selectedIqroLevel.value || selectedIqroLesson.value === null) return false;
            return selectedIqroLesson.value === selectedIqroLevel.value.lessons.length - 1;
        });

        const navigateLesson = (direction) => {
            if (selectedIqroLesson.value === null) return;
            
            const nextIdx = selectedIqroLesson.value + direction;
            if (nextIdx >= 0 && nextIdx < selectedIqroLevel.value.lessons.length) {
                selectedIqroLesson.value = nextIdx;
            } else if (nextIdx >= selectedIqroLevel.value.lessons.length) {
                // Completed level
                alert(`Alhamdulillah! Anda telah menyelesaikan seluruh latihan di ${selectedIqroLevel.value.title}. Silakan lanjut ke Jilid berikutnya!`);
                selectedIqroLesson.value = null;
                selectedIqroLevel.value = null;
            }
        };

        const selectIqroLevel = (levelObj) => {
            selectedIqroLevel.value = levelObj;
            selectedIqroLesson.value = null;
        };

        // Standard 10 short surahs as initial/fallback list
        const initialSurahs = [
            { nomor: 105, namaLatin: "Al-Fil", nama: "الفيل", arti: "Gajah", tempatTurun: "mekah", jumlahAyat: 5 },
            { nomor: 106, namaLatin: "Quraysh", nama: "قريش", arti: "Suku Quraysh", tempatTurun: "mekah", jumlahAyat: 4 },
            { nomor: 107, namaLatin: "Al-Ma'un", nama: "الماعون", arti: "Barang yang Berguna", tempatTurun: "mekah", jumlahAyat: 7 },
            { nomor: 108, namaLatin: "Al-Kautsar", nama: "الكوثر", arti: "Nikmat yang Banyak", tempatTurun: "mekah", jumlahAyat: 3 },
            { nomor: 109, namaLatin: "Al-Kafirun", nama: "الكافرون", arti: "Orang-orang Kafir", tempatTurun: "mekah", jumlahAyat: 6 },
            { nomor: 110, namaLatin: "An-Nasr", nama: "النصر", arti: "Pertolongan", tempatTurun: "mekah", jumlahAyat: 3 },
            { nomor: 111, namaLatin: "Al-Lahab", nama: "اللهب", arti: "Gejolak Api", tempatTurun: "mekah", jumlahAyat: 5 },
            { nomor: 112, namaLatin: "Al-Ikhlas", nama: "الإخلاص", arti: "Maha Esa", tempatTurun: "mekah", jumlahAyat: 4 },
            { nomor: 113, namaLatin: "Al-Falaq", nama: "الفلق", arti: "Waktu Subuh", tempatTurun: "mekah", jumlahAyat: 5 },
            { nomor: 114, namaLatin: "An-Nas", nama: "الناس", arti: "Manusia", tempatTurun: "mekah", jumlahAyat: 6 }
        ];

        const surahsList = ref(initialSurahs);

        const filteredSurahs = computed(() => {
            if (!searchQuery.value) return surahsList.value;
            const query = searchQuery.value.toLowerCase();
            return surahsList.value.filter(s => 
                s.namaLatin.toLowerCase().includes(query) || 
                s.arti.toLowerCase().includes(query)
            );
        });

        // References to global audio player
        let audioPlayerEl = null;

        onMounted(async () => {
            audioPlayerEl = document.querySelector("audio");
            if (audioPlayerEl) {
                // Listen to audio events
                audioPlayerEl.addEventListener("playing", () => {
                    isAudioPlaying.value = true;
                    audioLoading.value = false;
                    audioStatusText.value = "Sedang diputar";
                });
                audioPlayerEl.addEventListener("pause", () => {
                    isAudioPlaying.value = false;
                    audioStatusText.value = "Dijeda";
                });
                audioPlayerEl.addEventListener("ended", () => {
                    isAudioPlaying.value = false;
                    audioStatusText.value = "Selesai";
                });
                audioPlayerEl.addEventListener("waiting", () => {
                    audioLoading.value = true;
                    audioStatusText.value = "Buffering...";
                });
                audioPlayerEl.addEventListener("error", (e) => {
                    console.error("Audio error:", e);
                    audioLoading.value = false;
                    isAudioPlaying.value = false;
                    audioStatusText.value = "Gagal memutar audio";
                });
            }

            // Fetch all 114 surahs online via local proxy
            try {
                const res = await fetch("./proxy.php?path=surat");
                if (res.ok) {
                    const json = await res.json();
                    if (json.code === 200 && Array.isArray(json.data)) {
                        surahsList.value = json.data;
                    }
                }
            } catch (err) {
                console.warn("Gagal mengambil daftar surah via proxy, menggunakan offline fallback:", err);
            }

            window.addEventListener("stop-all-iqro-audio", stopAllIqroAudio);
        });

        onUnmounted(() => {
            window.removeEventListener("stop-all-iqro-audio", stopAllIqroAudio);
            stopAllIqroAudio();
        });

        const selectSurah = async (nomor) => {
            loadingText.value = "Memuat ayat...";
            loading.value = true;
            readerMode.value = "ayat";
            selectedTafsir.value = null;
            
            // Stop any playing audio
            if (audioPlayerEl) {
                audioPlayerEl.pause();
                audioPlayerEl.src = "";
                isAudioPlaying.value = false;
            }

            try {
                const res = await fetch(`./proxy.php?path=surat/${nomor}`);
                if (!res.ok) throw new Error("Koneksi gagal");
                const json = await res.json();
                if (json.code === 200) {
                    selectedSurah.value = json.data;
                    
                    // Audio url from Al-Afasy (usually audioFull -> "05" is Mishary Rashid Al-Afasy)
                    const audioOptions = json.data.audioFull;
                    if (audioOptions) {
                        audioSrc.value = audioOptions["05"] || audioOptions["01"] || Object.values(audioOptions)[0];
                    }
                } else {
                    throw new Error("Surah tidak ditemukan");
                }
            } catch (err) {
                alert(`Gagal memuat ayat lengkap: ${err.message}. Harap periksa koneksi internet Anda.`);
            } finally {
                loading.value = false;
            }
        };

        const switchToTafsirMode = async () => {
            readerMode.value = "tafsir";
            if (!selectedSurah.value) return;
            
            // If already loaded for this surah, don't fetch again
            if (selectedTafsir.value && selectedTafsir.value.nomor === selectedSurah.value.nomor) return;

            loadingText.value = "Memuat tafsir Kemenag...";
            loading.value = true;

            try {
                const res = await fetch(`./proxy.php?path=tafsir/${selectedSurah.value.nomor}`);
                if (!res.ok) throw new Error("Gagal mengunduh tafsir");
                const json = await res.json();
                if (json.code === 200) {
                    selectedTafsir.value = json.data;
                } else {
                    throw new Error("Tafsir tidak ditemukan");
                }
            } catch (err) {
                alert(`Gagal memuat tafsir: ${err.message}.`);
                readerMode.value = "ayat"; // revert
            } finally {
                loading.value = false;
            }
        };

        const getVerseArabic = (ayatNumber) => {
            if (!selectedSurah.value || !selectedSurah.value.ayat) return "";
            const verse = selectedSurah.value.ayat.find(v => v.nomorAyat === ayatNumber);
            return verse ? verse.teksArab : "";
        };

        const closeSurah = () => {
            if (audioPlayerEl) {
                audioPlayerEl.pause();
                audioPlayerEl.src = "";
            }
            isAudioPlaying.value = false;
            selectedSurah.value = null;
            selectedTafsir.value = null;
            readerMode.value = "ayat";
        };

        const toggleAudio = () => {
            if (!audioPlayerEl || !audioSrc.value) return;

            if (isAudioPlaying.value) {
                audioPlayerEl.pause();
            } else {
                if (audioPlayerEl.src !== audioSrc.value) {
                    audioLoading.value = true;
                    audioStatusText.value = "Menghubungkan...";
                    audioPlayerEl.src = audioSrc.value;
                }
                audioPlayerEl.play().catch(err => {
                    console.error("Play failed:", err);
                    audioLoading.value = false;
                    alert("Interaksi pertama dibutuhkan browser sebelum memutar audio.");
                });
            }
        };

        return {
            currentSection,
            searchQuery,
            selectedSurah,
            selectedTafsir,
            readerMode,
            loading,
            loadingText,
            audioLoading,
            isAudioPlaying,
            audioStatusText,
            filteredSurahs,
            selectSurah,
            closeSurah,
            toggleAudio,
            switchToTafsirMode,
            getVerseArabic,
            
            // Iqro returns
            iqros,
            selectedIqroLevel,
            selectedIqroLesson,
            currentLesson,
            selectIqroLevel,
            flipIqroCard,
            isCardFlipped,
            activeLessonFlippedCount,
            lessonProgressPercent,
            navigateLesson,
            isLastLesson
        };
    }
};
