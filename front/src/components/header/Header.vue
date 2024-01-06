<template>
  <a-row
    :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }"
    justify="space-evenly"
    align="middle"
  >
    <a-col>
      <a-avatar :src="logo" :size="64" class="logo"></a-avatar>
    </a-col>
    <a-col>
      <h1>开发喵网上商城</h1>
    </a-col>
    <a-col :offset="4" :span="6">
      <HeaderSearch />
    </a-col>
    <a-col :offset="2">
      <HeaderCart />
    </a-col>
    <a-col>
      <span v-if="!user">
        你好，请<router-link to="/login">登录</router-link> 免费
        <router-link to="/register">注册</router-link>
      </span>
      <span v-else>
        欢迎你，{{ user.username }}
        <a href="javascript:void(0);" @click.prevent="logout">退出</a>
      </span>
    </a-col>
  </a-row>
</template>

<script setup>
import HeaderCart from "@components/header/HeaderCart.vue";
import HeaderSearch from "@components/header/HeaderSearch.vue";

import { useRouter } from "vue-router";
import { useUserStore } from "@store/user";
import { ref } from "vue";
import logo from "@assets/img/favicon.ico";

const router = useRouter();
const userStore = useUserStore();

const user = ref(userStore.user.value);

const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.logo {
  width: 80px;
  height: 80px;
}
</style>