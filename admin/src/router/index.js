import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {path:'/login',name:'login',component:import('../views/Login/Login.vue'),meta:{isPublic:true}},
  {
    path: '/',
    name: 'Main',
    component: import('../views/Main.vue'),
    children:[
      {path:"/categories/create",component:import('../views/Category/CategoryEdit.vue')},
      //点击编辑跳转到CategoryEdit页面，即使用相同的Category页面组件，
      //props表示"/categories/edit/:id"里的参数都注入到CategoryEdit页面里
      {path:"/categories/edit/:id",component:import('../views/Category/CategoryEdit.vue'),props:true},
      {path:'/categories/list',component:import('../views/Category/CategoryList.vue')},
      
      {path:'/items/create',component:import('../views/Item/ItemEdit.vue')},
      {path:'/items/edit/:id',component:import('../views/Item/ItemEdit.vue'),props:true},
      {path:'/items/list',component:import('../views/Item/ItemList.vue')},

      {path:'/heroes/create',component:import('../views/Hero/HeroEdit.vue')},
      {path:'/heroes/edit/:id',component:import('../views/Hero/HeroEdit.vue'),props:true},
      {path:'/heroes/list',component:import('../views/Hero/HeroList.vue')},

      {path:'/articles/create',component:import('../views/Article/ArticleEdit.vue')},
      {path:'/articles/edit/:id',component:import('../views/Article/ArticleEdit.vue'),props:true},
      {path:'/articles/list',component:import('../views/Article/ArticleList.vue')},

      {path:'/ads/create',component:import('../views/Ad/AdEdit.vue')},
      {path:'/ads/edit/:id',component:import('../views/Ad/AdEdit.vue'),props:true},
      {path:'/ads/list',component:import('../views/Ad/AdList.vue')},

      {path:'/admin_users/create',component:import('../views/AdminUser/AdminUserEdit.vue')},
      {path:'/admin_users/edit/:id',component:import('../views/AdminUser/AdminUserEdit.vue'),props:true},
      {path:'/admin_users/list',component:import('../views/AdminUser/AdminUserList.vue')},
  ]
  }
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
