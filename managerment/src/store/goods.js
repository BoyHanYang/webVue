import { defineStore } from "pinia";
export const useGoodsStore = defineStore("goods", () =>{
    const goods = ref({});
    return{
        goods
    }
})