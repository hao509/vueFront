import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 定义路由
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/updata',
    name: 'Updata',
    component: () => import('../views/login/Updata.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    redirect: '/memberlist',
    children: [
      {
        path: '/memberlist',
        name: 'MemberList',
        component: () => import('../views/member/MemberList.vue')
      },
      {
        path: '/memberadd',
        name: 'MemberAdd',
        component: () => import('../views/member/MemberAdd.vue')
        // props: route => ({ id: route.query.id })
      },
      {
        path: '/orderlist',
        name: 'OrderList',
        component: () => import('../views/order/OrderList.vue')
      },
      {
        path: '/foodlist',
        name: 'FoodList',
        component: () => import('../views/food/FoodList.vue')
      },
      {
        path: '/foodadd',
        name: 'FoodAdd',
        component: () => import('../views/food/FoodAdd.vue')
      },
      {
        path: '/categorylist',
        name: 'CategoryList',
        component: () => import('../views/category/CategoryList.vue')
      },
      {
        path: '/combolist',
        name: 'ComboList',
        component: () => import('../views/combo/ComboList.vue')
      },
      {
        path: '/comboadd',
        name: 'ComboAdd',
        component: () => import('../views/combo/ComboAdd.vue')
      },
      {
        path: '/backmsg',
        name: 'BackMsg',
        component: () => import('../views/evaluation/BackMsg.vue')
      }
    ]
  }
]

// 创建路由实例并传递routes配置
const router = new VueRouter({
  routes
})

export default router
