import {createRouter, RouteRecordRaw, Router, createWebHistory} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/components/index.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path:'/good',
        name:'GoodItem',
        component:()=>import('@/components/goods/goodItem.vue')
    },
    {
        path:'/cart',
        name:'Cart',
        component:()=>import('@/components/cart/index.vue')
    },
    {
        path:'/categories',
        name:'Categories',
        component:()=>import('@/components/goods/categories.vue')
    },
    {
        path:'/userCenter',
        name:'UserCenter',
        component:()=>import('@/components/userCenter/index.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue'),
        meta: {
            title: '404'
        }
    }
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes
})

export default router