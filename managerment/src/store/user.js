import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
export const useUserStore = defineStore('user', () => {
    const user = ref({});
    const logout = () => {
        user.value = {};
        sessionStorage.clear();
    };
    return {
        user,
        logout
    }
}, {
    persist: {
        enabled: true, // 启用持久化
        strategies: [
            { storage: sessionStorage, paths: ["user"] },
            // { storage: localStorage, paths: ['accessToken'] },
        ],
    }
})