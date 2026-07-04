// components/AppHeader.js
import { onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default {
    name: "AppHeader",
    props: {
        hijriDate: String,
        currentCity: String
    },
    emits: ["location-request"],
    template: `
        <header class="app-header">
            <div class="header-top">
                <div class="brand">
                    <span class="brand-logo">🕌</span>
                    <div>
                        <h1>Nuang Belajar</h1>
                        <span class="hijri-date">{{ hijriDate }}</span>
                    </div>
                </div>
                <div class="location-badge" @click="$emit('location-request')">
                    <i data-lucide="map-pin"></i>
                    <span>{{ currentCity }}</span>
                </div>
            </div>
        </header>
    `,
    setup() {
        onMounted(() => {
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });
    }
};
