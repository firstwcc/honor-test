import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children:[
      {path:"/",name:"home",component:() => import('../views/Home/Home.vue')},
      {path:"/article/:id",name:"article",component:() => import('../views/Article/Article.vue'),props:true}
    ]
  },
  {
    path:'/heroes/:id',
    name:"heroes",
    component:() => import('../views/Hero/Hero.vue'),
    props: true

  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
