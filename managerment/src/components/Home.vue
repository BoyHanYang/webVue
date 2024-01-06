<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <Menu :title="systemTitle"></Menu>
    </a-layout-sider>
    <a-layout>
      <Header></Header>
      <a-layout-content :style="contentStyle">
        <RouterView></RouterView>
      </a-layout-content>
      <a-layout-footer :style="footerStyle">Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import Menu from "@/components/Menu.vue";
import Header from "@/components/Header.vue";
import { RouterView } from "vue-router";
import { reactive, watch, h, ref } from "vue";

const systemTitle = ref("开发喵商城");
const collapsed = ref(false);

// 获取当前视窗高度
const height = window.innerHeight - 64 * 2;

const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
  height: height + "px",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};
</script>