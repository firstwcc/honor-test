import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

  const routes = [
  {path:'/login',name:'login',component:Login,meta:{isPublic:true}},
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path:"/categories/create",component:CategoryEdit},
      //点击编辑跳转到CategoryEdit页面，即使用相同的Category页面组件，
      //props表示"/categories/edit/:id"里的参数都注入到CategoryEdit页面里
      {path:"/categories/edit/:id",component:CategoryEdit,props:true},
      {path:'/categories/list',component:CategoryList},
      
      {path:'/items/create',component:ItemEdit},
      {path:'/items/edit/:id',component:ItemEdit,props:true},
      {path:'/items/list',component:ItemList},

      {path:'/heroes/create',component:HeroEdit},
      {path:'/heroes/edit/:id',component:HeroEdit,props:true},
      {path:'/heroes/list',component:HeroList},

      {path:'/articles/create',component:ArticleEdit},
      {path:'/articles/edit/:id',component:ArticleEdit,props:true},
      {path:'/articles/list',component:ArticleList},

      {path:'/ads/create',component:AdEdit},
      {path:'/ads/edit/:id',component:AdEdit,props:true},
      {path:'/ads/list',component:AdList},

      {path:'/admin_users/create',component:AdminUserEdit},
      {path:'/admin_users/edit/:id',component:AdminUserEdit,props:true},
      {path:'/admin_users/list',component:AdminUserList},
  ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = new VueRouter({
  routes
})

//路由守卫
router.beforeEach((to,from,next)=>{
  if (!to.meta.isPublic && !localStorage.token) {
    return next('./login')
  }
  next()
})


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router