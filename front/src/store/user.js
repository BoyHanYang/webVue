import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {

    const user = ref({});      // 用户信息

    const logout = () => {
        user.value = {};
        sessionStorage.clear();
    }


    return {
        user,
        logout
    }
}, {
    presist: {
        enabled: true,
        // 保存到 sessionStorage
        storage: window.sessionStorage,
    }
})