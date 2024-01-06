<template>
  <a-input-search
    v-model:value="keywords"
    placeholder="搜索"
    enter-button="搜索"
    size="large"
    @search="search"
  />
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const keywords = ref("");

const search = () => {
  // 如果关键词不为空，且关键词不等于当前路由的关键词
  if (keywords.value && keywords.value.trim() != route.query.wd) {
    router.push({
      path: "/search",
      query: {
        wd: keywords.value,
      },
    });
  }
};
</script>