<template>
    <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
  </template>
  <script setup>
  import { h, ref } from "vue";
  const current = ref(["index"]);
  const items = ref([
    {
      key: "index",
      label: "首页",
      title: "首页",
      path: "/index",
    },
    {
      key: "newBooks",
      label: "新书",
      title: "新书",
      path: "/newBooks",
    },
    {
      key: "hotBooks",
      label: "热门",
      title: "热门",
      path: "/hotBooks",
    },
  ]);
  </script>