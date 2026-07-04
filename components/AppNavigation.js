// components/AppNavigation.js
import { onMounted, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default {
    name: "AppNavigation",
    props: {
        tabs: Array,
        activeTab: String
    },
    emits: ["update:activeTab"],
    template: `
        <nav class="app-navigation">
            <button 
                v-for="tab in tabs" 
                :key="tab.id"
                :class="['nav-item', { active: activeTab === tab.id }]"
                @click="$emit('update:activeTab', tab.id)"
            >
                <i :data-lucide="tab.icon"></i>
                <span>{{ tab.label }}</span>
            </button>
        </nav>
    `,
    setup(props) {
        const initIcons = () => {
            if (window.lucide) {
                window.lucide.createIcons();
            }
        };

        onMounted(initIcons);
        
        // Re-init icons when navigation changes
        watch(() => props.activeTab, () => {
            // Use nextTick equivalent or small timeout to ensure DOM updated
            setTimeout(initIcons, 0);
        });

        return {};
    }
};
