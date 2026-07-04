// Components/PrayerTimes.js
import { ref, computed, onMounted, onUnmounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { doaData } from "../services/doaData.js";

export default {
    name: "PrayerTimes",
    props: {
        prayerTimes: {
            type: Object,
            required: true
        },
        nextPrayer: {
            type: Object,
            required: true
        },
        location: {
            type: Object,
            default: () => ({ lat: null, lng: null })
        },
        deferredPrompt: {
            type: Object,
            default: null
        }
    },
    emits: ["location-request", "play-adhan", "install-click"],
    template: `
        <div class="prayer-times-tab">
            <!-- 1. MAIN PRAYER TIMES VIEW -->
            <div v-if="!showPanduan" class="prayer-main-view">
                <!-- Next Prayer Hero Countdown Card -->
                <div class="card countdown-card">
                    <div class="countdown-circle">
                        <svg class="progress-ring" width="160" height="160">
                            <circle class="progress-ring-bg" stroke="rgba(255,255,255,0.05)" stroke-width="8" fill="transparent" r="70" cx="80" cy="80"/>
                            <circle class="progress-ring-fg" stroke="var(--primary-color)" stroke-width="8" :stroke-dasharray="strokeDasharray" :stroke-dashoffset="strokeDashoffset" fill="transparent" r="70" cx="80" cy="80" stroke-linecap="round"/>
                        </svg>
                        <div class="countdown-text">
                            <span class="next-label">Selanjutnya</span>
                            <h2 class="next-name">{{ nextPrayer.name || 'Loading...' }}</h2>
                            <span class="time-countdown">{{ countdownStr }}</span>
                        </div>
                    </div>
                    
                    <div class="quick-status">
                        <p class="status-msg">{{ statusMessage }}</p>
                    </div>
                </div>

                <!-- Custom PWA Install Banner -->
                <div v-if="deferredPrompt" class="card install-banner flex align-center justify-between mb-3" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.04) 100%); border: 1px solid rgba(16, 185, 129, 0.2); padding: 12px 16px;">
                    <div class="flex align-center gap-3">
                        <span style="font-size: 20px; filter: drop-shadow(0 2px 4px rgba(16,185,129,0.3));">📲</span>
                        <div style="text-align: left; flex: 1;">
                            <h3 style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">Instal Nuang Belajar</h3>
                            <p class="text-xs text-muted" style="line-height: 1.3;">Pasang di layar HP untuk akses instan & luring.</p>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-sm" style="background: var(--primary-color); border: none; box-shadow: 0 2px 6px var(--primary-glow); font-weight: 700; padding: 6px 12px;" @click="$emit('install-click')">
                        Pasang
                    </button>
                </div>

                <!-- TRIGGER CARD: Panduan & Bacaan Sholat -->
                <div class="card menu-card flex align-center gap-4 mb-3" @click="openPanduan">
                    <div class="menu-card-icon flex align-center justify-center" style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3); border-radius: 12px; width: 42px; height: 42px; color: white; flex-shrink: 0;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                    </div>
                    <div class="menu-card-info flex-1">
                        <h3 style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">Panduan & Bacaan Sholat</h3>
                        <p class="text-xs text-muted" style="line-height: 1.3;">Tuntunan gerakan sholat wajib & tata cara sholat sunnah lengkap.</p>
                    </div>
                    <div class="arrow-right">➡️</div>
                </div>

                <!-- Geolocation Prompt if lat/lng is missing -->
                <div v-if="!location.lat" class="card warning-card flex align-center justify-between mb-3">
                    <div class="warning-text">
                        <h3>Gunakan Lokasi GPS</h3>
                        <p>Izinkan akses lokasi untuk jadwal yang lebih akurat sesuai lokasi Anda saat ini.</p>
                    </div>
                    <button class="btn btn-primary btn-sm" @click="$emit('location-request')">
                        Aktifkan
                    </button>
                </div>

                <!-- Prayer Times List -->
                <div class="card timings-list-card">
                    <div class="card-header">
                        <h3>Jadwal Sholat Hari Ini</h3>
                    </div>
                    <div class="timings-list">
                        <div 
                            v-for="p in formattedTimings" 
                            :key="p.name"
                            :class="['timing-row', { active: nextPrayer.name === p.name, passed: p.isPassed }]"
                        >
                            <div class="timing-left">
                                <span class="p-icon">{{ p.icon }}</span>
                                <div class="p-info">
                                    <div class="p-name-row flex align-center gap-2">
                                        <span class="p-name">{{ p.name }}</span>
                                        <span v-if="p.rakaat" class="p-rakaat-badge">{{ p.rakaat }} Rakaat</span>
                                    </div>
                                    <p v-if="p.desc" class="p-desc">{{ p.desc }}</p>
                                </div>
                            </div>
                            <div class="timing-right">
                                <span class="p-time">{{ p.time }}</span>
                                <button 
                                    v-if="nextPrayer.name === p.name"
                                    class="btn-play-alarm"
                                    title="Putar Adzan Percobaan"
                                    @click="testAdhan"
                                >
                                    🔔
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. PANDUAN SHOLAT VIEW (SUB-SECTION) -->
            <div v-else class="sholat-panduan-view">
                <!-- If showing Panduan List -->
                <div v-if="!selectedDoa" class="panduan-list-screen">
                    <div class="surah-nav-header flex justify-between align-center mb-3">
                        <button class="btn btn-back-new" @click="closePanduan">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            <span>Jadwal Sholat</span>
                        </button>
                    </div>

                    <div class="card welcome-card text-center mb-3" style="background: radial-gradient(circle at bottom right, rgba(99, 102, 241, 0.1), var(--bg-card));">
                        <span class="welcome-emoji">🕌</span>
                        <h2>Tuntunan & Doa Sholat</h2>
                        <p class="text-sm text-muted mt-1">Panduan lengkap tata cara serta bacaan sholat wajib dan sunnah</p>
                    </div>

                    <!-- Category Tabs (Sholat Wajib vs Sholat Sunnah) -->
                    <div class="reader-mode-toggle flex gap-1 mb-3">
                        <button 
                            :class="['btn-toggle-tab flex-1', { active: activeCategory === 'sholat-wajib' }]"
                            @click="setTab('sholat-wajib')"
                        >
                            Sholat Wajib
                        </button>
                        <button 
                            :class="['btn-toggle-tab flex-1', { active: activeCategory === 'sholat-sunnah' }]"
                            @click="setTab('sholat-sunnah')"
                        >
                            Sholat Sunnah
                        </button>
                    </div>

                    <!-- Cohesive Search & Sub-category Filter Panel -->
                    <div class="card filter-panel-card mb-3" style="padding: 12px 14px; position: relative; z-index: 60;">
                        <div class="search-box mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <input type="text" v-model="sholatSearchQuery" placeholder="Cari tuntunan sholat..." />
                        </div>
                        
                        <!-- Custom Dropdown select for Sub-Categories -->
                        <div class="custom-select-wrapper w-full relative">
                            <div class="custom-select-btn" @click.stop="toggleSubCategoryDropdown">
                                <span>{{ selectedSubCategory === 'all' ? '📁 Semua Sub-Kategori' : selectedSubCategory }}</span>
                                <span class="chevron" :class="{ open: isSubCategoryDropdownOpen }">▼</span>
                            </div>
                            
                            <div v-if="isSubCategoryDropdownOpen" class="custom-dropdown-menu w-full" style="max-width: 100%; box-sizing: border-box;">
                                <div 
                                    class="custom-dropdown-item" 
                                    :class="{ active: selectedSubCategory === 'all' }"
                                    @click="selectSubCategory('all')"
                                >
                                    📁 Semua Sub-Kategori
                                </div>
                                <div 
                                    v-for="sub in uniqueSubCategories" 
                                    :key="sub"
                                    class="custom-dropdown-item"
                                    :class="{ active: selectedSubCategory === sub }"
                                    @click="selectSubCategory(sub)"
                                >
                                    {{ sub }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Panduan Items List -->
                    <div class="panduan-items-list flex flex-col gap-3">
                        <div 
                            v-for="item in filteredDoas" 
                            :key="item.id"
                            class="card doa-item-card flex justify-between align-center"
                            @click="selectedDoa = item"
                        >
                            <div>
                                <span class="lesson-number" style="color: var(--secondary-color);">{{ item.categoryLabel }}</span>
                                <h3 class="lesson-name" style="font-size: 14px; font-weight:700;">{{ item.title }}</h3>
                            </div>
                            <span class="arrow-right">➡️</span>
                        </div>
                        
                        <div v-if="filteredDoas.length === 0" class="text-center py-6 text-muted text-xs">
                            Tidak ada panduan sholat yang cocok dengan kriteria filter Anda.
                        </div>
                    </div>
                </div>

                <!-- If showing Panduan Steps/Detail -->
                <div v-else class="panduan-detail-screen">
                    <div class="surah-nav-header flex justify-between align-center mb-3">
                        <button class="btn btn-back-new" @click="selectedDoa = null; stopAllSholatAudio()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            <span>Daftar Panduan</span>
                        </button>
                        <span class="iqro-current-badge">{{ selectedDoa.categoryLabel }}</span>
                    </div>

                    <div class="card surah-hero-card text-center mb-3" style="background: radial-gradient(circle at bottom right, rgba(99, 102, 241, 0.06), var(--bg-card));">
                        <h2 class="hero-latin-name" style="color: var(--text-main);">{{ selectedDoa.title }}</h2>
                        <p class="hero-meta text-xs text-muted mt-2 px-3">
                            {{ selectedDoa.description }}
                        </p>
                    </div>

                    <!-- Steps List -->
                    <div class="doa-steps flex flex-col gap-3">
                        <div v-for="(step, idx) in selectedDoa.steps" :key="idx" class="card verse-card relative">
                            <div class="flex justify-between align-start mb-3">
                                <span class="step-num-badge">Langkah {{ idx + 1 }}</span>
                                <button 
                                    class="btn-voice-doa flex align-center justify-center" 
                                    :class="{ playing: playingStepId === idx }"
                                    @click="playSholatVoice(step, idx)"
                                    title="Putar Suara"
                                >
                                    <svg v-if="playingStepId !== idx" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                </button>
                            </div>
                            
                            <h4 class="step-name text-xs mb-2">{{ step.name }}</h4>
                            <div class="verse-arabic-container text-right mb-3">
                                <p class="arabic verse-arabic" style="font-size: 26px; line-height: 1.8;">{{ step.ar }}</p>
                            </div>
                            <div class="verse-body">
                                <p class="verse-latin"><em>{{ step.la }}</em></p>
                                <p class="verse-translation mt-2">{{ step.id }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    setup(props, { emit }) {
        const timeNow = ref(new Date());
        let timerInterval = null;

        // Panduan Sholat state
        const showPanduan = ref(false);
        const activeCategory = ref("sholat-wajib");
        const selectedDoa = ref(null);
        const playingStepId = ref(null);

        // Search & Sub-category filter states
        const sholatSearchQuery = ref("");
        const selectedSubCategory = ref("all");
        const isSubCategoryDropdownOpen = ref(false);

        const toggleSubCategoryDropdown = () => {
            isSubCategoryDropdownOpen.value = !isSubCategoryDropdownOpen.value;
        };

        const selectSubCategory = (sub) => {
            selectedSubCategory.value = sub;
            isSubCategoryDropdownOpen.value = false;
        };

        const closeAllDropdowns = () => {
            isSubCategoryDropdownOpen.value = false;
        };

        const setTab = (cat) => {
            activeCategory.value = cat;
            selectedSubCategory.value = "all";
            sholatSearchQuery.value = "";
            isSubCategoryDropdownOpen.value = false;
        };

        // Extract unique sub-categories based on active main tab
        const uniqueSubCategories = computed(() => {
            const subs = new Set();
            doaData
                .filter(d => d.category === activeCategory.value)
                .forEach(d => {
                    if (d.categoryLabel) subs.add(d.categoryLabel);
                });
            return Array.from(subs).sort();
        });

        // Filter sholat list
        const filteredDoas = computed(() => {
            let list = doaData.filter(d => d.category === activeCategory.value);
            
            // 1. Filter by search query
            if (sholatSearchQuery.value) {
                const q = sholatSearchQuery.value.toLowerCase();
                list = list.filter(d => 
                    d.title.toLowerCase().includes(q) || 
                    d.description.toLowerCase().includes(q) ||
                    d.categoryLabel.toLowerCase().includes(q)
                );
            }
            
            // 2. Filter by sub-category
            if (selectedSubCategory.value !== "all") {
                list = list.filter(d => d.categoryLabel === selectedSubCategory.value);
            }
            
            return list;
        });

        // Audio controls
        let activeAudios = [];

        const stopAllSholatAudio = () => {
            playingStepId.value = null;
            activeAudios.forEach(audio => {
                try {
                    audio.pause();
                    audio.currentTime = 0;
                    audio.src = "";
                } catch (e) {
                    console.warn(e);
                }
            });
            activeAudios = [];
        };

        const playSholatVoice = (step, index) => {
            if (playingStepId.value === index) {
                stopAllSholatAudio();
                return;
            }

            stopAllSholatAudio();
            playingStepId.value = index;

            try {
                const audioUrl = step.audio ? step.audio : `./proxy.php?tts=${encodeURIComponent(step.ar)}`;
                const audio = new Audio(audioUrl);
                activeAudios.push(audio);

                audio.play().catch(e => {
                    console.warn("Autoplay blocked:", e);
                    playingStepId.value = null;
                });

                audio.onended = () => {
                    playingStepId.value = null;
                    const idx = activeAudios.indexOf(audio);
                    if (idx > -1) activeAudios.splice(idx, 1);
                };

                audio.onerror = () => {
                    playingStepId.value = null;
                };
            } catch (err) {
                console.error("Gagal memutar audio:", err);
                playingStepId.value = null;
            }
        };

        const openPanduan = () => {
            showPanduan.value = true;
            selectedDoa.value = null;
            activeCategory.value = "sholat-wajib";
            selectedSubCategory.value = "all";
            sholatSearchQuery.value = "";
        };

        const closePanduan = () => {
            stopAllSholatAudio();
            showPanduan.value = false;
            selectedDoa.value = null;
        };

        onMounted(() => {
            timerInterval = setInterval(() => {
                timeNow.value = new Date();
            }, 1000);
            
            if (window.lucide) {
                window.lucide.createIcons();
            }

            // Stop audio if tab changes
            window.addEventListener("stop-all-iqro-audio", stopAllSholatAudio);
            document.addEventListener("click", closeAllDropdowns);
        });

        onUnmounted(() => {
            clearInterval(timerInterval);
            window.removeEventListener("stop-all-iqro-audio", stopAllSholatAudio);
            document.removeEventListener("click", closeAllDropdowns);
            stopAllSholatAudio();
        });

        // Map English API names to Indonesian and add icons — hanya 5 sholat fardhu
        const prayerDetails = {
            Fajr:    { name: "Subuh",   icon: "🌅", rakaat: 2, desc: "Dari fajar menyingsing hingga sebelum matahari terbit." },
            Dhuhr:   { name: "Zuhur",   icon: "🌤️", rakaat: 4, desc: "Setelah matahari tergelincir ke barat hingga bayangan sama panjang dengan bendanya." },
            Asr:     { name: "Ashar",   icon: "⛅", rakaat: 4, desc: "Saat bayangan benda lebih panjang dari bendanya hingga matahari terbenam." },
            Maghrib: { name: "Maghrib", icon: "🌇", rakaat: 3, desc: "Setelah matahari terbenam hingga mega merah menghilang." },
            Isha:    { name: "Isya",    icon: "🌃", rakaat: 4, desc: "Setelah mega merah menghilang hingga menjelang waktu Subuh." },
        };

        const formattedTimings = computed(() => {
            if (!props.prayerTimes) return [];
            
            return Object.entries(props.prayerTimes)
                .filter(([key]) => prayerDetails[key])
                .map(([key, value]) => {
                    const detail = prayerDetails[key];
                    const [h, m] = value.split(":");
                    const pDate = new Date(timeNow.value);
                    pDate.setHours(parseInt(h), parseInt(m), 0, 0);
                    
                    return {
                        apiName: key,
                        name: detail.name,
                        icon: detail.icon,
                        rakaat: detail.rakaat,
                        desc: detail.desc,
                        time: value,
                        isPassed: timeNow.value > pDate
                    };
                }).sort((a, b) => {
                    const order = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
                    return order.indexOf(a.apiName) - order.indexOf(b.apiName);
                });
        });

        const countdownStr = computed(() => {
            if (!props.nextPrayer || !props.nextPrayer.time) return "--:--:--";
            
            const targetTime = props.nextPrayer.dateTime;
            const diffMs = targetTime - timeNow.value;
            
            if (diffMs <= 0) {
                return "Waktunya Sholat!";
            }
            
            const secs = Math.floor((diffMs / 1000) % 60);
            const mins = Math.floor((diffMs / (1000 * 60)) % 60);
            const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
            
            const pad = (num) => String(num).padStart(2, '0');
            return `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
        });

        const radius = 70;
        const circumference = 2 * Math.PI * radius;
        
        const strokeDasharray = computed(() => {
            return circumference;
        });

        const strokeDashoffset = computed(() => {
            if (!props.nextPrayer || !props.nextPrayer.time || !props.nextPrayer.prevDateTime) {
                return 0;
            }
            
            const totalDuration = props.nextPrayer.dateTime - props.nextPrayer.prevDateTime;
            const elapsed = timeNow.value - props.nextPrayer.prevDateTime;
            
            if (totalDuration <= 0 || elapsed < 0) return 0;
            
            const percentage = Math.min(Math.max(elapsed / totalDuration, 0), 1);
            return circumference * (1 - percentage);
        });

        const statusMessage = computed(() => {
            if (!props.nextPrayer || !props.nextPrayer.time) return "";
            return `Waktu Sholat ${props.nextPrayer.name} pada pukul ${props.nextPrayer.time}`;
        });

        const testAdhan = () => {
            emit("play-adhan");
        };

        return {
            formattedTimings,
            countdownStr,
            strokeDasharray,
            strokeDashoffset,
            statusMessage,
            testAdhan,
            
            // Panduan Sholat returns
            showPanduan,
            activeCategory,
            selectedDoa,
            playingStepId,
            filteredDoas,
            openPanduan,
            closePanduan,
            playSholatVoice,
            stopAllSholatAudio,

            // Filter returns
            sholatSearchQuery,
            selectedSubCategory,
            isSubCategoryDropdownOpen,
            uniqueSubCategories,
            toggleSubCategoryDropdown,
            selectSubCategory,
            setTab
        };
    }
};
