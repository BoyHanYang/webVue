<template>
    <a-row>
      <a-col :offset="2" :span="20">
        <Header />
        <Menu />
        <RouterView />
      </a-col>
    </a-row>
  </template>
  
  <script setup>
  import Header from "@components/header/Header.vue";
  import Menu from "@components/Menu.vue";
  </script>