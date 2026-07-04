// Main entry point for Nuang Belajar App
import { fetchPrayerTimes, fetchPrayerTimesByCity } from "./services/prayerService.js";
import PrayerTimes from "./components/PrayerTimes.js";
import QiblaCompass from "./components/QiblaCompass.js";
import DhikrCounter from "./components/DhikrCounter.js";
import QuranShorts from "./components/QuranShorts.js";
import DoaHub from "./components/DoaHub.js";
import AppHeader from "./components/AppHeader.js";
import AppNavigation from "./components/AppNavigation.js";

import { createApp, ref, computed, onMounted, onUnmounted, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const App = {
    components: {
        PrayerTimes,
        QiblaCompass,
        DhikrCounter,
        QuranShorts,
        DoaHub,
        AppHeader,
        AppNavigation
    },
    setup() {
        const activeTab = ref("prayer");
        const currentCity = ref("Jakarta (Default)");
        const coords = ref({ lat: -6.2088, lng: 106.8456 }); // Default: Jakarta
        const prayerTimes = ref(null);
        const hijriDate = ref("Memuat...");
        const calcMethod = ref(20); // Kemenag
        const adhanSound = ref("adhan");
        const isDark = ref(true);
        const audioSrc = ref("");
        const deferredPrompt = ref(null);

        // Next prayer object holding details
        const nextPrayer = ref({
            name: "",
            time: "",
            dateTime: null,
            prevDateTime: null
        });

        // Tabs Config
        const tabs = [
            { id: "prayer", label: "Sholat", icon: "clock" },
            { id: "qibla", label: "Kiblat", icon: "compass" },
            { id: "dhikr", label: "Tasbih", icon: "activity" },
            { id: "quran", label: "Al-Quran", icon: "book-open" },
            { id: "doa", label: "Doa", icon: "bookmark" }
        ];

        // Component computed selector
        const currentComponent = computed(() => {
            switch (activeTab.value) {
                case "prayer": return "PrayerTimes";
                case "qibla": return "QiblaCompass";
                case "dhikr": return "DhikrCounter";
                case "quran": return "QuranShorts";
                case "doa": return "DoaHub";
                default: return "PrayerTimes";
            }
        });

        const themeClass = computed(() => isDark.value ? "theme-dark" : "theme-light");

        // Load configuration and data
        onMounted(async () => {
            // Listen to PWA install prompt event
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt.value = e;
                console.log('PWA: beforeinstallprompt event fired.');
            });

            window.addEventListener('appinstalled', () => {
                deferredPrompt.value = null;
                console.log('PWA: App successfully installed.');
            });

            // Load theme & settings
            const savedDark = localStorage.getItem("qolbi_settings_dark_mode");
            if (savedDark !== null) isDark.value = savedDark === "true";

            const savedMethod = localStorage.getItem("qolbi_settings_calc_method");
            if (savedMethod !== null) calcMethod.value = parseInt(savedMethod);

            const savedSound = localStorage.getItem("qolbi_settings_adhan_sound");
            if (savedSound !== null) adhanSound.value = savedSound;

            // Load saved location coordinates
            const savedLat = localStorage.getItem("qolbi_loc_lat");
            const savedLng = localStorage.getItem("qolbi_loc_lng");
            const savedCity = localStorage.getItem("qolbi_loc_city");
            
            if (savedLat && savedLng) {
                coords.value = { lat: parseFloat(savedLat), lng: parseFloat(savedLng) };
                if (savedCity) currentCity.value = savedCity;
            } else {
                // Try auto fetch location at first load
                attemptAutoLocation();
            }

            await loadPrayerTimesData();
            
            // Re-render Lucide icons periodically when active tab changes and stop Quran/Iqro/Doa audio if switching away
            watch(activeTab, (newTab, oldTab) => {
                if (oldTab === "quran" || oldTab === "doa") {
                    const audioEl = document.querySelector("audio");
                    if (audioEl) {
                        audioEl.pause();
                        audioEl.src = "";
                    }
                    window.dispatchEvent(new CustomEvent("stop-all-iqro-audio"));
                }

                setTimeout(() => {
                    if (window.lucide) window.lucide.createIcons();
                }, 100);
            });

            // Refresh icons on mount
            setTimeout(() => {
                if (window.lucide) window.lucide.createIcons();
            }, 300);

            // Timer to check for prayer alarms and updates every minute
            const alarmCheckTimer = setInterval(() => {
                checkPrayerAlarms();
                updateNextPrayerTimer();
            }, 1000); // Check every second for countdown precision

            onUnmounted(() => {
                clearInterval(alarmCheckTimer);
            });
        });

        const attemptAutoLocation = () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        coords.value = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        localStorage.setItem("qolbi_loc_lat", coords.value.lat);
                        localStorage.setItem("qolbi_loc_lng", coords.value.lng);
                        
                        // Try reverse geocoding via OpenStreetMap Nominatim API (free, no key required)
                        try {
                            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.value.lat}&lon=${coords.value.lng}&zoom=10`);
                            const data = await res.json();
                            const city = data.address.city || data.address.town || data.address.state || "Lokasi Anda";
                            currentCity.value = city;
                            localStorage.setItem("qolbi_loc_city", city);
                        } catch (e) {
                            currentCity.value = `${coords.value.lat.toFixed(2)}, ${coords.value.lng.toFixed(2)}`;
                            localStorage.setItem("qolbi_loc_city", currentCity.value);
                        }

                        await loadPrayerTimesData();
                    },
                    (error) => {
                        console.warn("Location permission denied or unavailable, using defaults.", error);
                    }
                );
            }
        };

        const triggerLocationFetch = () => {
            if ("geolocation" in navigator) {
                currentCity.value = "Mendapatkan GPS...";
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        coords.value = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        localStorage.setItem("qolbi_loc_lat", coords.value.lat);
                        localStorage.setItem("qolbi_loc_lng", coords.value.lng);

                        try {
                            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.value.lat}&lon=${coords.value.lng}&zoom=10`);
                            const data = await res.json();
                            const city = data.address.city || data.address.town || data.address.state || "Lokasi GPS";
                            currentCity.value = city;
                            localStorage.setItem("qolbi_loc_city", city);
                        } catch (e) {
                            currentCity.value = `${coords.value.lat.toFixed(2)}, ${coords.value.lng.toFixed(2)}`;
                            localStorage.setItem("qolbi_loc_city", currentCity.value);
                        }

                        await loadPrayerTimesData();
                        alert("Lokasi GPS berhasil diperbarui!");
                    },
                    (error) => {
                        currentCity.value = "Jakarta (Default)";
                        alert("Gagal mendapatkan lokasi. Pastikan GPS aktif dan izin diberikan.");
                    }
                );
            } else {
                alert("Browser Anda tidak mendukung Geolocation.");
            }
        };

        const loadPrayerTimesData = async () => {
            const data = await fetchPrayerTimes(coords.value.lat, coords.value.lng, calcMethod.value);
            if (data && data.timings) {
                prayerTimes.value = data.timings;
                
                // Formulate Hijri Date string
                const h = data.hijri;
                hijriDate.value = `${h.day} ${h.month.en} ${h.year} ${h.designation.abbreviated}`;
                
                calculateNextPrayerTime();
            }
        };

        const calculateNextPrayerTime = () => {
            if (!prayerTimes.value) return;

            const now = new Date();
            const today = now.toLocaleDateString("en-US");
            
            // Hanya 5 sholat fardhu untuk hitung mundur (tanpa Imsak & Terbit)
            const targetPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
            const indonesianNames = {
                Fajr: "Subuh",
                Dhuhr: "Zuhur",
                Asr: "Ashar",
                Maghrib: "Maghrib",
                Isha: "Isya"
            };

            const parsedPrayers = targetPrayers
                .filter(key => prayerTimes.value[key])
                .map(key => {
                const timeStr = prayerTimes.value[key];
                const [h, m] = timeStr.split(":");
                const dateObj = new Date(`${today} ${h}:${m}:00`);
                return {
                    key: key,
                    name: indonesianNames[key],
                    time: timeStr,
                    dateTime: dateObj
                };
            }).sort((a, b) => a.dateTime - b.dateTime);

            // Find first prayer that is in the future
            let next = parsedPrayers.find(p => p.dateTime > now);
            let prev = null;

            if (!next) {
                // All prayers for today have passed. Next prayer is Fajr tomorrow
                const tomorrow = new Date(now);
                tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowDateStr = tomorrow.toLocaleDateString("en-US");
                
                const tomorrowFajrTime = prayerTimes.value["Fajr"];
                const [h, m] = tomorrowFajrTime.split(":");
                const tomorrowFajrDate = new Date(`${tomorrowDateStr} ${h}:${m}:00`);

                next = {
                    key: "Fajr",
                    name: "Subuh (Esok)",
                    time: tomorrowFajrTime,
                    dateTime: tomorrowFajrDate
                };

                // Previous was Isha today
                const lastIsha = parsedPrayers.find(p => p.key === "Isha");
                prev = lastIsha ? lastIsha.dateTime : now;
            } else {
                // Find previous prayer
                const index = parsedPrayers.indexOf(next);
                if (index > 0) {
                    prev = parsedPrayers[index - 1].dateTime;
                } else {
                    // Previous was Isha yesterday
                    const yesterday = new Date(now);
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayDateStr = yesterday.toLocaleDateString("en-US");
                    const yesterdayIshaTime = prayerTimes.value["Isha"];
                    const [h, m] = yesterdayIshaTime.split(":");
                    prev = new Date(`${yesterdayDateStr} ${h}:${m}:00`);
                }
            }

            nextPrayer.value = {
                name: next.name,
                time: next.time,
                dateTime: next.dateTime,
                prevDateTime: prev
            };
        };

        const updateNextPrayerTimer = () => {
            if (!nextPrayer.value.dateTime) return;
            
            const now = new Date();
            if (now >= nextPrayer.value.dateTime) {
                // Time triggered! Recalculate next prayer
                calculateNextPrayerTime();
            }
        };

        // System alarm checks
        let lastAlarmTriggered = "";

        const checkPrayerAlarms = () => {
            if (!prayerTimes.value) return;
            
            const now = new Date();
            const currentHourMin = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            // Hanya 5 sholat fardhu yang membunyikan adzan (tanpa Imsak & Terbit)
            const adzanPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
            const indonesianNames = {
                Fajr: "Subuh",
                Dhuhr: "Zuhur",
                Asr: "Ashar",
                Maghrib: "Maghrib",
                Isha: "Isya"
            };

            for (const key of adzanPrayers) {
                const prayerTime = prayerTimes.value[key];
                if (prayerTime && prayerTime === currentHourMin && lastAlarmTriggered !== key) {
                    lastAlarmTriggered = key;
                    triggerPrayerAlarm(indonesianNames[key]);
                    break;
                }
            }
            
            // Imsak: hanya notifikasi tanpa adzan
            const imsakTime = prayerTimes.value["Imsak"];
            if (imsakTime && imsakTime === currentHourMin && lastAlarmTriggered !== "Imsak") {
                lastAlarmTriggered = "Imsak";
                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification("⏰ Waktu Imsak", {
                        body: `Imsak ${currentCity.value} pukul ${imsakTime}. Segera akhiri sahur Anda.`,
                        icon: "https://unpkg.com/lucide-static@latest/icons/bell.png"
                    });
                }
            }
            
            // Reset trigger lock when time advances past any prayer time
            const allActiveTimes = [...adzanPrayers, "Imsak"]
                .map(k => prayerTimes.value[k])
                .filter(Boolean);
            if (!allActiveTimes.includes(currentHourMin)) {
                lastAlarmTriggered = "";
            }
        };

        const triggerPrayerAlarm = (prayerName) => {
            // 1. Show browser Notification
            if ("Notification" in window && Notification.permission === "granted") {
                new Notification("Waktunya Sholat", {
                    body: `Saatnya menunaikan sholat ${prayerName} untuk wilayah ${currentCity.value} dan sekitarnya.`,
                    icon: "https://unpkg.com/lucide-static@latest/icons/bell.png"
                });
            }

            // 2. Play Sound based on settings
            playAdhanSound();

            alert(`🚨 Waktunya Sholat ${prayerName}!`);
        };

        const playAdhanSound = () => {
            const player = document.querySelector("audio");
            if (!player) return;

            if (adhanSound.value === "adhan") {
                audioSrc.value = "https://archive.org/download/AdhanMakkah/Adhan%20Makkah.mp3";
                player.src = audioSrc.value;
                player.play().catch(e => console.warn("Audio autoplay blocked by browser policy:", e));
            } else if (adhanSound.value === "short") {
                // Short double beep
                playSystemBeep();
            }
        };

        const playSystemBeep = () => {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                
                const playBeepNode = (delay) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "sine";
                    osc.frequency.value = 1000;
                    gain.gain.setValueAtTime(0.4, ctx.currentTime + delay);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.3);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + delay);
                    osc.stop(ctx.currentTime + delay + 0.3);
                };

                playBeepNode(0);
                playBeepNode(0.4);
            } catch (e) {
                console.warn("Could not play synthesized beep:", e);
            }
        };

        // Trigger manual Adhan sound test
        const playAdhan = () => {
            const player = document.querySelector("audio");
            if (!player) return;

            if (player.paused) {
                audioSrc.value = "https://www.islamcan.com/audio/adhan/azan2.mp3";
                player.src = audioSrc.value;
                player.play().catch(e => {
                    alert("Gagal memutar audio. Mohon berikan interaksi (klik/tap) terlebih dahulu pada halaman web.");
                });
            } else {
                player.pause();
                player.currentTime = 0;
            }
        };

        const audioEnded = () => {
            audioSrc.value = "";
        };

        const handleSettingsChanged = (settings) => {
            isDark.value = settings.darkMode;
            calcMethod.value = settings.calcMethod;
            adhanSound.value = settings.adhanSound;
            
            // Reload prayer times with new calculation method
            loadPrayerTimesData();
        };

        const installApp = async () => {
            if (!deferredPrompt.value) return;
            deferredPrompt.value.prompt();
            const { outcome } = await deferredPrompt.value.userChoice;
            console.log(`PWA: User choice outcome is ${outcome}`);
            if (outcome === 'accepted') {
                deferredPrompt.value = null;
            }
        };

        return {
            activeTab,
            tabs,
            currentComponent,
            themeClass,
            currentCity,
            coords,
            prayerTimes,
            nextPrayer,
            hijriDate,
            audioSrc,
            triggerLocationFetch,
            playAdhan,
            audioEnded,
            handleSettingsChanged,
            
            // PWA returns
            deferredPrompt,
            installApp
        };
    }
};

createApp(App).mount("#app");
