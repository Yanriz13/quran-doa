// Components/Settings.js
import { ref, onMounted, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default {
    name: "Settings",
    emits: ["settings-changed"],
    template: `
        <div class="settings-tab tab-content">
            <!-- Theme Settings -->
            <div class="card settings-card">
                <div class="card-header">
                    <h3>Tampilan & Tema</h3>
                </div>
                <div class="setting-item flex align-center justify-between py-3 border-b">
                    <div>
                        <span class="setting-title block">Mode Gelap</span>
                        <span class="setting-desc text-xs text-muted">Gunakan warna gelap untuk kenyamanan mata</span>
                    </div>
                    <label class="switch">
                        <input type="checkbox" v-model="darkMode" @change="saveSettings" />
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>

            <!-- Calculation Method -->
            <div class="card settings-card">
                <div class="card-header">
                    <h3>Metode Hitung Jadwal Sholat</h3>
                </div>
                <div class="setting-item py-3">
                    <label class="setting-title block mb-2" for="calc-method">Metode Perhitungan</label>
                    <select id="calc-method" v-model="calcMethod" @change="saveSettings" class="select-input">
                        <option v-for="m in methods" :key="m.id" :value="m.id">
                            {{ m.name }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Notification Settings -->
            <div class="card settings-card">
                <div class="card-header">
                    <h3>Notifikasi & Suara</h3>
                </div>
                <div class="setting-item flex align-center justify-between py-3 border-b">
                    <div>
                        <span class="setting-title block">Notifikasi Browser</span>
                        <span class="setting-desc text-xs text-muted">Kirim notifikasi saat masuk waktu sholat</span>
                    </div>
                    <button 
                        :disabled="notifPermission === 'granted' || notifPermission === 'denied'"
                        :class="['btn btn-sm', notifPermission === 'granted' ? 'btn-success' : 'btn-primary']"
                        @click="requestNotifPermission"
                    >
                        {{ notifPermissionText }}
                    </button>
                </div>
                
                <div class="setting-item py-3">
                    <label class="setting-title block mb-2" for="adhan-sound">Suara Pengingat Sholat</label>
                    <select id="adhan-sound" v-model="adhanSound" @change="saveSettings" class="select-input">
                        <option value="adhan">Adzan Lengkap</option>
                        <option value="short">Beep Pendek</option>
                        <option value="silent">Senyap / Getar Saja</option>
                    </select>
                </div>
            </div>

            <!-- Info / About -->
            <div class="card about-card text-center">
                <span class="app-icon-large">🕌</span>
                <h3 class="mt-2">Nuang Belajar v1.0.0</h3>
                <p class="text-xs text-muted mt-1">Aplikasi Asisten Muslim Modern & Pengingat Sholat</p>
                <div class="footer-note mt-4 border-t pt-3">
                    <p class="text-xs text-muted">Dibuat dengan ❤️ untuk menemani ibadah harian Anda.</p>
                </div>
            </div>
        </div>
    `,
    setup(props, { emit }) {
        const darkMode = ref(true);
        const calcMethod = ref(20); // Default: Kemenag RI
        const adhanSound = ref("adhan");
        const notifPermission = ref("default");

        const methods = [
            { id: 20, name: "Kementerian Agama RI (Indonesia)" },
            { id: 3, name: "Muslim World League (MWL)" },
            { id: 2, name: "Islamic Society of North America (ISNA)" },
            { id: 4, name: "Umm Al-Qura University, Makkah" },
            { id: 5, name: "Egyptian General Authority of Survey" },
            { id: 11, name: "MUIS (Singapura)" },
            { id: 15, name: "JAKIM (Malaysia)" }
        ];

        const notifPermissionText = computed(() => {
            if (notifPermission.value === "granted") return "Aktif ✔";
            if (notifPermission.value === "denied") return "Ditolak";
            return "Aktifkan";
        });

        onMounted(() => {
            // Load saved settings
            const savedDarkMode = localStorage.getItem("qolbi_settings_dark_mode");
            if (savedDarkMode !== null) darkMode.value = savedDarkMode === "true";

            const savedMethod = localStorage.getItem("qolbi_settings_calc_method");
            if (savedMethod !== null) calcMethod.value = parseInt(savedMethod);

            const savedSound = localStorage.getItem("qolbi_settings_adhan_sound");
            if (savedSound !== null) adhanSound.value = savedSound;

            if ("Notification" in window) {
                notifPermission.value = Notification.permission;
            }
        });

        const saveSettings = () => {
            localStorage.setItem("qolbi_settings_dark_mode", darkMode.value);
            localStorage.setItem("qolbi_settings_calc_method", calcMethod.value);
            localStorage.setItem("qolbi_settings_adhan_sound", adhanSound.value);
            
            // Emit changes to parent
            emit("settings-changed", {
                darkMode: darkMode.value,
                calcMethod: calcMethod.value,
                adhanSound: adhanSound.value
            });
        };

        const requestNotifPermission = async () => {
            if (!("Notification" in window)) {
                alert("Browser ini tidak mendukung notifikasi.");
                return;
            }

            try {
                const permission = await Notification.requestPermission();
                notifPermission.value = permission;
                if (permission === "granted") {
                    new Notification("Nuang Belajar", {
                        body: "Notifikasi pengingat sholat telah diaktifkan!",
                        icon: "https://unpkg.com/lucide-static@latest/icons/bell.png"
                    });
                }
            } catch (err) {
                console.error("Gagal meminta izin notifikasi:", err);
            }
        };

        return {
            darkMode,
            calcMethod,
            adhanSound,
            notifPermission,
            notifPermissionText,
            methods,
            saveSettings,
            requestNotifPermission
        };
    }
};
