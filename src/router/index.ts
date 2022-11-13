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

    // 购物车
    {
        path:'/cart',
        name:'Cart',
        component:()=>import('@/components/cart/index.vue')
    },

    // 商品详情
    {
        path:'/goods',
        name:'GoodsItem',
        component:()=>import('@/components/goods/goodsItem.vue')
    },
    // 分类
    {
        path:'/categories',
        name:'Categories',
        component:()=>import('@/components/goods/categories.vue')
    },
    
    // 搜索页
    {
        path:'/search',
        name:'Search',
        component:()=>import('@/components/goods/searchGoods.vue')
    },

    // 添加商品
    {
        path:'/publishGoods',
        name:'PublishGoods',
        component:()=>import('@/components/goods/publishGoods.vue')
    },
    
    // 用户区域
    {
        path:'/userCenter',
        name:'UserCenter',
        component:()=>import('@/components/userCenter/index.vue')
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import(/* webpackChunkName: "setting" */ '@/components/userCenter/setting.vue'),
        meta: {
          index: 2
        }
    },
    {
        path:'/myOrder',
        name:'MyOrder',
        component:()=>import('@/components/userCenter/myOrder.vue')
    },
    // 订单详情
    {
        path:'/orderDetail',
        name:'OrderDetail',
        component:()=>import('@/components/userCenter/orderDetail.vue')
    },

    {
        path:'/myPublish',
        name:'MyPublish',
        component:()=>import('@/components/userCenter/myPublish.vue')
    },
    // 编辑商品
    {
        path:'/update',
        name:'UpdatePublish',
        component:()=>import('@/components/userCenter/updatePublish.vue')
    },
    
    {
        path:'/changePwd',
        name:'ChangePwd',
        component:()=>import('@/components/userCenter/changePwd.vue')
    },

    // 登录注册
    {
        path:'/login',
        name:'Login',
        component:()=>import('@/components/login.vue')
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