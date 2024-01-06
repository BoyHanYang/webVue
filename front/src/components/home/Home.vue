<template>
  <a-row>
    <a-col :span="4"><home-category></home-category></a-col>
    <a-col :span="16"><home-scroll-pic></home-scroll-pic></a-col>
    <a-col :span="4"> <home-books-hot></home-books-hot> </a-col>
  </a-row>
</template>
<script setup>
import HomeCategory from "./HomeCategory.vue";
import HomeScrollPic from "./HomeScrollPic.vue";
import HomeBooksHot from "./HomeBooksHot.vue";
</script>