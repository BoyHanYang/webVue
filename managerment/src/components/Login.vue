<template>
  <div id="app">
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/favicon.ico" />
        <span class="title">{{ systemName }}</span>
      </div>
      <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
    </div>
    <div class="login">
      <a-form ref="formRef" :model="formState" :rules="rules">
        <a-tabs
          size="large"
          :tabBarStyle="{ textAlign: 'center' }"
          style="padding: 0 2px"
        >
          <a-tab-pane tab="账户密码登录" key="1">
            <a-alert
              type="error"
              :closable="true"
              v-show="error"
              :message="error"
              showIcon
              style="margin-bottom: 24px"
            />
            <a-form-item name="username" has-feedback>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="请输入用户名"
                v-model:value="formState.username"
              >
                <template #prefix>
                  <user-outlined />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password" has-feedback>
              <a-input-password
                size="large"
                placeholder="请输入密码"
                autocomplete="autocomplete"
                v-model:value="formState.password"
                type="password"
              >
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane tab="手机号登录" key="2">
            <a-form-item>
              <a-input size="large" placeholder="手机号">
                <a-icon slot="prefix" type="mobile" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-row :gutter="8" style="margin: 0 -4px">
                <a-col :span="16">
                  <a-input size="large" placeholder="验证码">
                    <a-icon slot="prefix" type="mail" />
                  </a-input>
                </a-col>
                <a-col :span="8" style="padding-left: 4px">
                  <a-button
                    style="width: 100%"
                    class="captcha-button"
                    size="large"
                    >获取验证码</a-button
                  >
                </a-col>
              </a-row>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <div>
          <a-checkbox :checked="true">自动登录</a-checkbox>
          <a style="float: right">忘记密码</a>
        </div>
        <a-form-item>
          <a-button
            :loading="loading"
            style="width: 100%; margin-top: 24px"
            size="large"
            type="primary"
            @click="onSubmit"
            >登录</a-button
          >
        </a-form-item>
        <div>
          其他登录方式
          <a-icon class="icon" type="alipay-circle" />
          <a-icon class="icon" type="taobao-circle" />
          <a-icon class="icon" type="weibo-circle" />
          <router-link style="float: right" to="/dashboard/workplace"
            >注册账户</router-link
          >
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRaw } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/user.js";

// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useUserStore();
/*
 useRouter 和 useRoute 是 vue-router@4 的新特性,
 区别在于 useRouter 是返回一个路由实例, 而 useRoute 是返回一个路由信息对象
 useRouter 主要用于在组件内部进行路由跳转, 而 useRoute 主要用于获取当前路由信息
*/
const router = useRouter();

// 系统名称
const systemName = ref("开发喵商城后台管理系统");
// 表单名称
const formRef = ref();
// 表单状态
const formState = reactive({});
// 错误信息
const error = ref("");
// 加载状态
const loading = ref(false);
// 表单验证规则
const validateUsername = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("请输入用户名");
  } else if (!/^[a-zA-Z][a-zA-Z0-9]{4,20}$/.test(value)) {
    // 字母开头，允许5-20字符，允许字母数字
    return Promise.reject("用户名必须是字母开头的5-20位字母或数字组合");
  } else {
    return Promise.resolve();
  }
};

const validatePass = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("请输入密码");
  } else if (!/^[a-zA-Z0-9]{6,20}$/.test(value)) {
    return Promise.reject("密码必须是6-20位数字或字母组合");
  } else {
    return Promise.resolve();
  }
};
const rules = {
  username: [
    {
      required: true,
      validator: validateUsername,
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      validator: validatePass,
      trigger: "change",
    },
  ],
};

// 登录表单
const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      loading.value = true;
      console.log(toRaw(formState));
      // 发送登录请求
      axios.post("/mock/login.json", toRaw(formState)).then((res) => {
        loading.value = false;
        console.log(res);
        if (res.data.code === 200) {
          // 登录成功
          console.log("登录成功");
          // res.data.data // 用户信息
          // 保存用户信息
          store.user.value = res.data.data;
          message.success("登录成功", 2, () => {
            // 路由跳转
            // router.push("/home");
            router.push({ path: "/home" });
          });
        } else {
          error.value = res.data.message;
        }
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
};
</script>

<style scoped>
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
.logo {
  height: 44px;
  vertical-align: top;
  margin-right: 16px;
}
.title {
  font-size: 33px;
  color: #000;
  font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}
.desc {
  font-size: 14px;
  color: #000;
  margin-top: 12px;
  margin-bottom: 40px;
}

.login {
  width: 368px;
  margin: 0 auto;
}
</style>