<template>
  <div class="login">
    <el-card header="请先登录" class="login-card">
      <!-- 监听表单的提交事件@submit.native.prevent -->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default{
  data(){
    return {
      model:{}
    }
  },
  methods:{
    async login(){
      const res = await this.$http.post('login',this.model)
      //sessionStorage表示关闭浏览器以后存储被清空
      localStorage.token = res.data.token
      this.$router.push('/')
      this.$message({
        type:'success',
        message:'登陆成功'
      })
      
    }
  }
}

</script>

<style>
  .login-card{
    width: 30rem;
    margin:6rem auto;
  }
</style>
