// 使用动态导入替代静态导入以解决模块未找到的问题
import home from '../views/home/index.vue'
// 使用动态导入替代静态导入以解决模块未找到的问题
import mine from '../views/mine/index.vue'

// 确保已安装vue-router依赖
// npm install vue-router@4
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
        meta: {
            title: '首頁',
        }
    },
    {
        path: '/mine',
        component: mine,
        meta: {
            title: '個人中心',        }
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router