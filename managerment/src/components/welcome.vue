<template>
    <h1>欢迎登录, {{ name }}</h1>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useUserStore } from "../store/user";
  const userStore = useUserStore();
  const user = userStore.user.value;
  
  const name = user.name;
  </script>