import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../store/user'


import Login from '@/components/Login.vue'
import UserList from '@/components/system/UserList.vue'
import GoodsList from '@/components/GoodsList.vue'
import Welcome from '@/components/Welcome.vue'
import MenuList from '@/components/system/MenuList.vue'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/home",
        component: import('@/components/Home.vue'),
        children: [
            {
                path: '', // /home
                // component: UserList // 显示在 home 的 <router-view> 中
                redirect: 'welcome'
            },
            {
                path: '/welcome', // /welcome
                component: Welcome // 显示在 home 的 <router-view> 中
            },
            {
                // path: 'user', // /home/user
                path: "/user", // /user
                component: UserList // 显示在 home 的 <router-view> 中
            },
            {
                // path: 'goods', // /home/goods
                path: "/goods", // /goods
                component: GoodsList // 显示在 home 的 <router-view> 中
            },
            {
                path: '/menu',
                component: MenuList
            }

        ]
    }
];

// 创建一个路由器实例
const router = createRouter({
    routes,
    history: createWebHashHistory()
});

// 路由守卫
router.beforeEach((to, from, next) => {
    // to: 要去的路由
    // from: 当前的路由
    // next: 放行
    // 判断是否登录
    if (to.path === '/login' || to.path === '/') {
        // 如果是登录页面，直接放行
        next();
    } else {
        const userStore = useUserStore();
        const user = userStore.user.value;
        // 如果不是登录页面，判断是否登录
        user ? next() : next('/login');
    }
});

// 导出路由
export default router;