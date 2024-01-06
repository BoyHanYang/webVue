<template>
    <h1 style="text-align: center; color: #fff">{{ title }}</h1>
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="state.collapsed"
      :items="items"
      @click="handleClick"
    ></a-menu>
  </template>
  <script setup>
  import { reactive, watch, h, defineProps } from "vue";
  import {
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
  } from "@ant-design/icons-vue";
  import { useRouter } from "vue-router";
  // props 传递过来的值
  const props = defineProps(["title"]);
  const title = props.title;
  const router = useRouter();
  const state = reactive({
    collapsed: false,
    selectedKeys: [sessionStorage.getItem("selectedKeys") || "welcome"],
    openKeys: [sessionStorage.getItem("openKeys") || ""],
    preOpenKeys: [],
  });
  const items = reactive([
    {
      key: "welcome",
      icon: () => h(PieChartOutlined),
      label: "首页",
      title: "首页",
      path: "/welcome",
    },
    {
      key: "goods",
      icon: () => h(DesktopOutlined),
      label: "商品管理",
      title: "商品管理",
      path: "/goods",
    },
  
    {
      key: "system",
      icon: () => h(MailOutlined),
      label: "系统管理",
      title: "系统管理",
      children: [
        {
          key: "user",
          icon: () => h(InboxOutlined),
          label: "用户管理",
          title: "用户管理",
          path: "/user",
        },
        {
          key: "role",
          icon: () => h(InboxOutlined),
          label: "角色管理",
          title: "角色管理",
          path: "/role",
        },
        {
          key: "menu",
          icon: () => h(InboxOutlined),
          label: "菜单管理",
          title: "菜单管理",
          path: "/menu",
        },
      ],
    },
  ]);
  watch(
    () => state.openKeys,
    (_val, oldVal) => {
      state.preOpenKeys = oldVal;
    }
  );
  const handleClick = ({ item, key, keyPath }) => {
    sessionStorage.setItem("selectedKeys", key);
    state.selectedKeys = [key];
    if (keyPath.length > 1) {
      // 有子菜单
      state.openKeys = [keyPath[0]];
      sessionStorage.setItem("openKeys", keyPath[0]);
    } else {
      state.openKeys = [];
      sessionStorage.setItem("openKeys", "");
    }
    // 路由跳转
    router.push(item.path);
  };
  </script>