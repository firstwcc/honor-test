import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './stylesheet/style.css'

Vue.config.productionTip = false

import http from "./model/http.js"


//mixin是用于让每个组件都能使用的代码块
Vue.mixin({
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods:{
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

//将axios加载到Vue实例原型上，任何地方都可以用this.$http数据请求接口
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
