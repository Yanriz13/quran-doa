// Components/QiblaCompass.js
import { calculateQibla } from "../services/qiblaService.js";

import { ref, computed, onMounted, onUnmounted, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default {
    name: "QiblaCompass",
    props: {
        location: {
            type: Object,
            required: true
        }
    },
    template: `
        <div class="qibla-tab">
            <div class="card compass-card text-center">
                <div class="compass-wrapper">
                    <!-- Compass Outer Ring -->
                    <div class="compass-bezel" :style="{ transform: 'rotate(' + (-heading) + 'deg)' }">
                        <div class="compass-dial">
                            <span class="direction n">U</span>
                            <span class="direction e">T</span>
                            <span class="direction s">S</span>
                            <span class="direction w">B</span>
                            <!-- Degree Marks -->
                            <div class="mark index-0"></div>
                            <div class="mark index-90"></div>
                            <div class="mark index-180"></div>
                            <div class="mark index-270"></div>
                        </div>
                    </div>
                    
                    <!-- Qibla Pointer (Points to Kaaba) -->
                    <div class="qibla-pointer" :style="{ transform: 'rotate(' + (qiblaAngle - heading) + 'deg)' }">
                        <div class="kaaba-icon">🕋</div>
                        <div class="pointer-arrow"></div>
                    </div>

                    <!-- Center Cap -->
                    <div class="compass-center"></div>
                </div>

                <div class="compass-info">
                    <h3 class="qibla-angle-title">Arah Kiblat</h3>
                    <p class="angle-value">{{ qiblaAngle.toFixed(1) }}° dari Utara</p>
                    <p v-if="hasOrientation" class="orientation-status green">
                        🔄 Arah kompas bergerak mengikuti gerakan perangkat Anda.
                    </p>
                    <p v-else class="orientation-status text-muted">
                        📍 Tampilan statis (Utara berada di atas). Gunakan HP Anda untuk kompas dinamis.
                    </p>
                </div>
            </div>

            <!-- Manual Coordinate / Location override description -->
            <div class="card info-card">
                <div class="flex align-center gap-3">
                    <span class="info-icon">💡</span>
                    <div>
                        <h4>Cara Menggunakan</h4>
                        <p class="text-sm text-muted">
                            Hadapkan bagian atas HP Anda searah dengan jarum Kaaba. Saat jarum Kaaba lurus ke atas dan sejajar dengan penunjuk, Anda menghadap Kiblat.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `,
    setup(props) {
        const heading = ref(0);
        const hasOrientation = ref(false);
        const permissionStatus = ref("unknown");

        const qiblaAngle = computed(() => {
            if (props.location && props.location.lat && props.location.lng) {
                return calculateQibla(props.location.lat, props.location.lng);
            }
            return 295; // Default Qibla for Jakarta/Indonesia (around 295° N)
        });

        const handleOrientation = (event) => {
            let compassHeading = null;
            
            // Check iOS device heading first
            if (event.webkitCompassHeading) {
                compassHeading = event.webkitCompassHeading;
                hasOrientation.value = true;
            } 
            // Standard Android/W3C device orientation heading
            else if (event.alpha !== null) {
                // alpha represents rotation around z-axis (0-360)
                // usually alpha is counter-clockwise, so we negate it or adjust
                compassHeading = 360 - event.alpha;
                hasOrientation.value = true;
            }

            if (compassHeading !== null) {
                heading.value = compassHeading;
            }
        };

        const requestOrientationPermission = async () => {
            if (typeof DeviceOrientationEvent !== 'undefined' && 
                typeof DeviceOrientationEvent.requestPermission === 'function') {
                try {
                    const permission = await DeviceOrientationEvent.requestPermission();
                    permissionStatus.value = permission;
                    if (permission === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation, true);
                    }
                } catch (error) {
                    console.error("Device orientation permission request failed:", error);
                }
            } else {
                // Non-iOS or older browsers
                window.addEventListener('deviceorientation', handleOrientation, true);
            }
        };

        onMounted(() => {
            // Register event listener
            if (window.DeviceOrientationEvent) {
                requestOrientationPermission();
            }
        });

        onUnmounted(() => {
            window.removeEventListener('deviceorientation', handleOrientation, true);
        });

        return {
            heading,
            qiblaAngle,
            hasOrientation,
            permissionStatus
        };
    }
};
