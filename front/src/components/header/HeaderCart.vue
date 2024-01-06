<template>
  <a href="javascript:void(0);" @click.prevent="goCart">
    <a-badge :count="0" :overflow-count="99">
      <ShoppingCartOutlined />购物车
    </a-badge>
  </a>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "@store/cart";
import { useRouter } from "vue-router";
import { ShoppingCartOutlined } from "@ant-design/icons-vue";

const cartStore = useCartStore();
const router = useRouter();

const count = cartStore.itemsCount;

const goCart = () => {
  router.push("/cart");
};
</script>