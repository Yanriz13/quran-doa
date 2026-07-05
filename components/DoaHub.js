// components/DoaHub.js
import { ref, computed, onMounted, onUnmounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { fetchApiData, buildTtsUrl } from '../services/apiClient.js';

export default {
    name: "DoaHub",
    template: `
        <div class="doa-hub-tab tab-content">
            <!-- 1. DOAS LIST VIEW -->
            <div v-if="!selectedDoa" class="doa-list-view">
                <div class="card welcome-card text-center mb-4" style="background: radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.15), var(--bg-card));">
                    <span class="welcome-emoji">🤲</span>
                    <h2>Kumpulan Doa Harian</h2>
                    <p class="text-sm text-muted mt-1">Daftar lengkap 200+ doa dan dzikir harian dari e-Quran.id</p>
                </div>

                <!-- Cohesive Filter Panel Card -->
                <div class="card filter-panel-card mb-3" style="padding: 12px 14px; position: relative; z-index: 50;">
                    <div class="search-box mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input type="text" v-model="searchQuery" placeholder="Cari doa berdasarkan nama atau terjemahan..." />
                    </div>
                    
                    <div class="flex gap-2">
                        <!-- Custom Category Dropdown -->
                        <div class="custom-select-wrapper flex-1 relative">
                            <div class="custom-select-btn" @click.stop="toggleCategoryDropdown">
                                <span>{{ selectedCategory === 'all' ? '📁 Semua Kategori' : selectedCategory }}</span>
                                <span class="chevron" :class="{ open: isCategoryDropdownOpen }">▼</span>
                            </div>
                            
                            <div v-if="isCategoryDropdownOpen" class="custom-dropdown-menu">
                                <div 
                                    class="custom-dropdown-item" 
                                    :class="{ active: selectedCategory === 'all' }"
                                    @click="selectCategory('all')"
                                >
                                    📁 Semua Kategori
                                </div>
                                <div 
                                    v-for="cat in uniqueCategories" 
                                    :key="cat"
                                    class="custom-dropdown-item"
                                    :class="{ active: selectedCategory === cat }"
                                    @click="selectCategory(cat)"
                                >
                                    {{ cat }}
                                </div>
                            </div>
                        </div>

                        <!-- Custom Tag Dropdown -->
                        <div class="custom-select-wrapper flex-1 relative">
                            <div class="custom-select-btn" @click.stop="toggleTagDropdown">
                                <span>{{ selectedTag === 'all' ? '🏷️ Semua Tag' : selectedTag }}</span>
                                <span class="chevron" :class="{ open: isTagDropdownOpen }">▼</span>
                            </div>
                            
                            <div v-if="isTagDropdownOpen" class="custom-dropdown-menu tag-menu">
                                <div 
                                    class="custom-dropdown-item" 
                                    :class="{ active: selectedTag === 'all' }"
                                    @click="selectTag('all')"
                                >
                                    🏷️ Semua Tag
                                </div>
                                <div 
                                    v-for="tag in uniqueTags" 
                                    :key="tag"
                                    class="custom-dropdown-item"
                                    :class="{ active: selectedTag === tag }"
                                    @click="selectTag(tag)"
                                >
                                    {{ tag }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Shimmer Loading State -->
                <div v-if="loading" class="flex flex-col gap-3">
                    <div v-for="n in 6" :key="n" class="card shimmer-card flex align-center justify-between" style="height: 70px;">
                        <div class="flex align-center gap-3">
                            <div class="shimmer-elem circle" style="width: 42px; height: 42px;"></div>
                            <div class="flex flex-col gap-2">
                                <div class="shimmer-elem line" style="width: 80px; height: 10px;"></div>
                                <div class="shimmer-elem line" style="width: 150px; height: 14px;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Doas Grid (Grouped by Category) -->
                <div v-else class="doas-grid flex flex-col gap-4">
                    <div v-for="group in groupedDoas" :key="group.name" class="doa-group-section">
                        <h4 class="doa-group-header mb-2 px-2 text-muted text-xs font-bold uppercase tracking-wider">{{ group.name }}</h4>
                        <div class="flex flex-col gap-2.5">
                            <div 
                                v-for="doa in group.items" 
                                :key="doa.id" 
                                class="card doa-item-card flex align-center justify-between"
                                @click="selectDoa(doa)"
                            >
                                <div class="doa-item-left flex align-center gap-3">
                                    <div class="category-icon harian flex align-center justify-center">
                                        ✨
                                    </div>
                                    <div>
                                        <span class="doa-category-label">{{ doa.tag && doa.tag.length ? doa.tag.join(', ') : 'Doa Harian' }}</span>
                                        <h3 class="doa-title-text">{{ doa.nama }}</h3>
                                    </div>
                                </div>
                                <span class="arrow-right">➡️</span>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="groupedDoas.length === 0" class="text-center py-6 text-muted text-xs">
                        Tidak ada doa harian yang cocok dengan kriteria filter Anda.
                    </div>
                </div>
            </div>

            <!-- 2. DOA DETAIL VIEW -->
            <div v-else class="doa-detail-view">
                <div class="surah-nav-header flex justify-between align-center mb-3">
                    <button class="btn btn-back-new" @click="closeDoa">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        <span>Kembali</span>
                    </button>
                    <span class="iqro-current-badge">Doa Harian</span>
                </div>

                <!-- Hero Info -->
                <div class="card surah-hero-card text-center mb-3" style="background: radial-gradient(circle at bottom right, rgba(234, 179, 8, 0.05), var(--bg-card));">
                    <h2 class="hero-latin-name" style="color: var(--text-main); font-size: 18px; font-weight: 800;">{{ selectedDoa.nama }}</h2>
                    <p class="hero-meta text-xs text-muted mt-2 px-3">
                        Grup: {{ selectedDoa.grup }}
                    </p>
                </div>

                <!-- Step/Content Card -->
                <div class="doa-steps flex flex-col gap-3">
                    <div class="card verse-card relative">
                        <div class="flex justify-between align-start mb-3">
                            <span class="step-num-badge">Lafadz</span>
                            <button 
                                class="btn-voice-doa flex align-center justify-center" 
                                :class="{ playing: isAudioPlaying }"
                                @click="playDoaVoice(selectedDoa.ar)"
                                title="Putar Suara"
                            >
                                <svg v-if="!isAudioPlaying" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                            </button>
                        </div>
                        
                        <div class="verse-arabic-container text-right mb-3">
                            <p class="arabic verse-arabic" style="font-size: 26px; line-height: 1.8;">{{ selectedDoa.ar }}</p>
                        </div>
                        <div class="verse-body">
                            <p class="verse-latin"><em>{{ selectedDoa.tr }}</em></p>
                            <p class="verse-translation mt-2">{{ selectedDoa.idn }}</p>
                        </div>

                        <!-- Source / Reference Note if present -->
                        <div v-if="selectedDoa.tentang" class="mt-4 pt-3 border-t text-muted text-xs" style="border-top: 1px solid var(--border-color); line-height: 1.4;">
                            <strong style="color: var(--text-main); display: block; margin-bottom: 2px;">Referensi / Keterangan:</strong>
                            {{ selectedDoa.tentang }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        const searchQuery = ref("");
        const selectedCategory = ref("all");
        const selectedTag = ref("all");
        
        const selectedDoa = ref(null);
        const doaList = ref([]);
        const loading = ref(true);
        const isAudioPlaying = ref(false);

        // Custom dropdown open states
        const isCategoryDropdownOpen = ref(false);
        const isTagDropdownOpen = ref(false);

        const toggleCategoryDropdown = () => {
            isCategoryDropdownOpen.value = !isCategoryDropdownOpen.value;
            isTagDropdownOpen.value = false;
        };

        const toggleTagDropdown = () => {
            isTagDropdownOpen.value = !isTagDropdownOpen.value;
            isCategoryDropdownOpen.value = false;
        };

        const selectCategory = (cat) => {
            selectedCategory.value = cat;
            isCategoryDropdownOpen.value = false;
        };

        const selectTag = (tag) => {
            selectedTag.value = tag;
            isTagDropdownOpen.value = false;
        };

        const closeAllDropdowns = () => {
            isCategoryDropdownOpen.value = false;
            isTagDropdownOpen.value = false;
        };

        // Fetch doas from local proxy or direct API fallback
        const loadDoaList = async () => {
            loading.value = true;
            try {
                const json = await fetchApiData("doa");
                if (json && Array.isArray(json.data)) {
                    doaList.value = json.data;
                }
            } catch (err) {
                console.error("Gagal memuat list doa dari API:", err);
            } finally {
                loading.value = false;
            }
        };

        // Extract unique Categories (groups) dynamically
        const uniqueCategories = computed(() => {
            const cats = new Set();
            doaList.value.forEach(d => {
                if (d.grup) cats.add(d.grup);
            });
            return Array.from(cats).sort();
        });

        // Extract unique Tags dynamically
        const uniqueTags = computed(() => {
            const tags = new Set();
            doaList.value.forEach(d => {
                if (Array.isArray(d.tag)) {
                    d.tag.forEach(t => {
                        if (t) tags.add(t);
                    });
                }
            });
            return Array.from(tags).sort();
        });

        // Filter and Group Doas
        const groupedDoas = computed(() => {
            let list = doaList.value;

            // 1. Filter by Search Query
            if (searchQuery.value) {
                const q = searchQuery.value.toLowerCase();
                list = list.filter(d => 
                    d.nama.toLowerCase().includes(q) || 
                    d.idn.toLowerCase().includes(q)
                );
            }

            // 2. Filter by Selected Category (grup)
            if (selectedCategory.value !== "all") {
                list = list.filter(d => d.grup === selectedCategory.value);
            }

            // 3. Filter by Selected Tag
            if (selectedTag.value !== "all") {
                list = list.filter(d => Array.isArray(d.tag) && d.tag.includes(selectedTag.value));
            }

            // Group by the "grup" field
            const groupsMap = {};
            list.forEach(item => {
                const groupName = item.grup || "Umum";
                if (!groupsMap[groupName]) {
                    groupsMap[groupName] = [];
                }
                groupsMap[groupName].push(item);
            });

            // Convert to sorted array
            return Object.keys(groupsMap).map(name => ({
                name,
                items: groupsMap[name]
            })).sort((a, b) => a.name.localeCompare(b.name));
        });

        // Audio controls
        let activeAudios = [];

        const stopAllDoaAudio = () => {
            isAudioPlaying.value = false;
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

        const playDoaVoice = (arabicText) => {
            if (isAudioPlaying.value) {
                stopAllDoaAudio();
                return;
            }

            stopAllDoaAudio();
            isAudioPlaying.value = true;

            try {
                const ttsUrl = buildTtsUrl(arabicText);
                const audio = new Audio(ttsUrl);
                activeAudios.push(audio);

                audio.play().catch(e => {
                    console.warn("Autoplay blocked:", e);
                    isAudioPlaying.value = false;
                });

                audio.onended = () => {
                    isAudioPlaying.value = false;
                    const idx = activeAudios.indexOf(audio);
                    if (idx > -1) activeAudios.splice(idx, 1);
                };

                audio.onerror = () => {
                    isAudioPlaying.value = false;
                };
            } catch (err) {
                console.error("Gagal memutar audio doa:", err);
                isAudioPlaying.value = false;
            }
        };

        const selectDoa = (doa) => {
            stopAllDoaAudio();
            selectedDoa.value = doa;
        };

        const closeDoa = () => {
            stopAllDoaAudio();
            selectedDoa.value = null;
        };

        onMounted(() => {
            loadDoaList();
            window.addEventListener("stop-all-iqro-audio", stopAllDoaAudio);
            document.addEventListener("click", closeAllDropdowns);
        });

        onUnmounted(() => {
            window.removeEventListener("stop-all-iqro-audio", stopAllDoaAudio);
            document.removeEventListener("click", closeAllDropdowns);
            stopAllDoaAudio();
        });

        return {
            searchQuery,
            selectedCategory,
            selectedTag,
            selectedDoa,
            loading,
            isAudioPlaying,
            uniqueCategories,
            uniqueTags,
            groupedDoas,
            selectDoa,
            closeDoa,
            playDoaVoice,

            // Custom dropdown fields
            isCategoryDropdownOpen,
            isTagDropdownOpen,
            toggleCategoryDropdown,
            toggleTagDropdown,
            selectCategory,
            selectTag
        };
    }
};
