import axios from "axios"
import Vue from "vue"
import Router from "../router"


const http = axios.create({
    //表示webpack打包后的环境变量。里面有VUE_APP的API
    //baseURL: Process.env.VUE_APP这里是固定的写法， _API_URL跟的才是自己的变量名
    //_API_URL这个字段是生产环境的，'/admin/api'是开发环境的，总之，将地址转换的动态的可以实现公用的目的
    baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    //baseURL:'http://localhost:3000/admin/api'
})

//intercepors拦截器
http.interceptors.request.use(function (config) {
    //在config上加请求头，用于授权
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

//全局捕获数据,用于处理服务端返回的错误。比如密码错误等
http.interceptors.response.use(res => {
    return res
},err => {
    if (err.response.data.message) {
        console.log(err.response)
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        })
        if(err.response.status === 401) {
            Router.push('/login')
        }
    }
    return Promise.reject(err)
})

export default http