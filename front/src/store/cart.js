import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {

    const items = ref([]);      // 购物车商品列表
    // 购物车商品数量
    const itemsCount = computed(() => {
        return items.value.length;
    });

    return {
        items,
        itemsCount
    }
})