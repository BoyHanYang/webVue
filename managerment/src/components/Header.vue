<template>
  <a-layout-header :style="headerStyle">
    <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
      <a-col :offset="20" :span="2">{{ name }}</a-col>
      <a-col :span="2">
        <a-popconfirm title="确定要退出吗？" @confirm="logout">
          <template #icon
            ><question-circle-outlined style="color: red"
          /></template>
          <a href="#">退出</a>
        </a-popconfirm>
      </a-col>
    </a-row>
  </a-layout-header>
</template>
<script setup>
import { useUserStore } from "@/store/user";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const name = userStore.user.value.name;
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};

const router = useRouter();
const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>