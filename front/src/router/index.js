import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@components/home/Home.vue'
import Index from '@components/Index.vue'


const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        children: [
            {
                path: "",
                redirect: "/home"
            },
            {
                path: "/home",
                name: "home",
                component: Home,
            },
        ]
    },



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
    if (to.path === '/home' || to.path === '/') {
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