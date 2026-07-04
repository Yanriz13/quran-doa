// Components/DhikrCounter.js
import { ref, computed, onMounted, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default {
    name: "DhikrCounter",
    template: `
        <div class="dhikr-tab tab-content">
            <!-- Selector for Dhikr Phrase -->
            <div class="card selector-card">
                <div class="phrase-picker">
                    <button 
                        v-for="(phrase, idx) in phrases" 
                        :key="idx"
                        :class="['phrase-btn', { active: activePhraseIdx === idx }]"
                        @click="changePhrase(idx)"
                    >
                        {{ phrase.transliteration }}
                    </button>
                </div>
                <div class="phrase-display text-center">
                    <h2 class="arabic">{{ activePhrase.arabic }}</h2>
                    <p class="meaning">"{{ activePhrase.translation }}"</p>
                </div>
            </div>

            <!-- Main Counter Ring -->
            <div class="card counter-main-card text-center">
                <div class="target-badge">Target: {{ activeTarget }}</div>
                
                <div class="counter-display" @click="incrementCount">
                    <div class="ripple" v-if="rippling"></div>
                    <div class="counter-circle-inner">
                        <span class="count-number">{{ count }}</span>
                        <span class="tap-label">TAP</span>
                    </div>
                </div>

                <div class="counter-actions">
                    <button class="btn-reset-new" @click="resetCount" title="Reset Counter">
                        <i data-lucide="rotate-ccw" style="width: 14px; height: 14px;"></i> Reset
                    </button>
                    
                    <div class="target-selector">
                        <button 
                            v-for="target in targets" 
                            :key="target"
                            :class="['btn-target', { active: activeTarget === target }]"
                            @click="setTarget(target)"
                        >
                            {{ target }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Statistics / History -->
            <div class="card history-card">
                <div class="card-header flex justify-between align-center">
                    <h3>Riwayat Dzikir</h3>
                    <button class="btn-clear-history text-xs text-muted flex align-center gap-1" @click="clearHistory" v-if="history.length > 0">
                        <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i> Bersihkan
                    </button>
                </div>
                <div class="history-list" v-if="history.length > 0">
                    <div v-for="(item, idx) in history" :key="idx" class="history-row">
                        <div class="history-info">
                            <span class="history-phrase">{{ item.phrase }}</span>
                            <span class="history-date">{{ item.date }}</span>
                        </div>
                        <span class="history-count">{{ item.count }}x</span>
                    </div>
                </div>
                <p v-else class="empty-msg text-center py-4">
                    Belum ada riwayat hari ini.
                </p>
            </div>
        </div>
    `,
    setup() {
        const count = ref(0);
        const activePhraseIdx = ref(0);
        const activeTarget = ref(33);
        const rippling = ref(false);
        const history = ref([]);

        const targets = [33, 99, 100, 1000];

        const phrases = [
            { arabic: "سُبْحَانَ ٱللَّٰهِ", transliteration: "Subhanallah", translation: "Maha Suci Allah" },
            { arabic: "ٱلْحَمْدُ لِلَّٰهِ", transliteration: "Alhamdulillah", translation: "Segala puji bagi Allah" },
            { arabic: "ٱللَّٰهُ أَكْبَرُ", transliteration: "Allahu Akbar", translation: "Allah Maha Besar" },
            { arabic: "أَسْتَغْفِرُ ٱللَّٰهَ", transliteration: "Astaghfirullah", translation: "Aku memohon ampun kepada Allah" },
            { arabic: "لاَ إِلَهَ إِلاَّ الله", transliteration: "Laa ilaaha illallah", translation: "Tiada Tuhan selain Allah" }
        ];

        const activePhrase = computed(() => phrases[activePhraseIdx.value]);

        // Load data from localStorage
        onMounted(() => {
            if (window.lucide) {
                window.lucide.createIcons();
            }

            const savedCount = localStorage.getItem("qolbi_dhikr_count");
            if (savedCount !== null) count.value = parseInt(savedCount);

            const savedPhraseIdx = localStorage.getItem("qolbi_dhikr_phrase_idx");
            if (savedPhraseIdx !== null) activePhraseIdx.value = parseInt(savedPhraseIdx);

            const savedTarget = localStorage.getItem("qolbi_dhikr_target");
            if (savedTarget !== null) activeTarget.value = parseInt(savedTarget);

            const savedHistory = localStorage.getItem("qolbi_dhikr_history");
            if (savedHistory !== null) history.value = JSON.parse(savedHistory);
        });

        // Watch state and sync to local storage
        watch(count, (newVal) => {
            localStorage.setItem("qolbi_dhikr_count", newVal);
        });

        const changePhrase = (idx) => {
            // Save current session to history if there is count
            saveCurrentSessionToHistory();
            
            activePhraseIdx.value = idx;
            count.value = 0;
            localStorage.setItem("qolbi_dhikr_phrase_idx", idx);
        };

        const setTarget = (target) => {
            activeTarget.value = target;
            localStorage.setItem("qolbi_dhikr_target", target);
        };

        const incrementCount = () => {
            // Haptic Feedback (Vibration API)
            if (navigator.vibrate) {
                navigator.vibrate(40);
            }
            
            // Animation effect
            rippling.value = true;
            setTimeout(() => {
                rippling.value = false;
            }, 300);

            count.value++;

            // Target reached alert
            if (count.value === activeTarget.value) {
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]); // Long double vibration
                }
                
                // Play notification beep if browser supports AudioContext
                playTargetBeep();
                
                setTimeout(() => {
                    alert(`Alhamdulillah, target dzikir ${activePhrase.value.transliteration} (${activeTarget.value}x) telah tercapai!`);
                }, 200);
            }
        };

        const resetCount = () => {
            saveCurrentSessionToHistory();
            count.value = 0;
        };

        const saveCurrentSessionToHistory = () => {
            if (count.value > 0) {
                const now = new Date();
                const dateStr = now.toLocaleDateString("id-ID", { 
                    day: "numeric", 
                    month: "short", 
                    hour: "2-digit", 
                    minute: "2-digit" 
                });
                
                const newRecord = {
                    phrase: activePhrase.value.transliteration,
                    count: count.value,
                    date: dateStr
                };

                history.value.unshift(newRecord);
                // Keep only top 10 histories
                if (history.value.length > 10) history.value.pop();

                localStorage.setItem("qolbi_dhikr_history", JSON.stringify(history.value));
            }
        };

        const clearHistory = () => {
            history.value = [];
            localStorage.removeItem("qolbi_dhikr_history");
        };

        const playTargetBeep = () => {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = "sine";
                osc.frequency.value = 880; // A5 note
                
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.5);
            } catch (err) {
                console.warn("Could not play synthesized target beep:", err);
            }
        };

        return {
            count,
            phrases,
            activePhraseIdx,
            activePhrase,
            activeTarget,
            targets,
            rippling,
            history,
            changePhrase,
            setTarget,
            incrementCount,
            resetCount,
            clearHistory
        };
    }
};
