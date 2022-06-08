<template>
    <div class="login" id="login-app">
    <div class="login-box">
      <img src="../../styles/images/login/login-l.png" alt="">
      <div class="login-form">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" >
          <div class="login-form-title">
            <img src="../../styles/images/login/logo.png" style="width:139px;height:42px;" alt="" />
          </div>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号" maxlength="20"
              prefix-icon="iconfont icon-user" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="密码" prefix-icon="iconfont icon-lock" maxlength="20"
              @keyup.enter.native="handleLogin" />
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button :loading="loading" class="login-btn" size="medium" type="primary" style="width:100%;"
              @click.native.prevent="handleLogin">
              <span v-if="!loading">登录</span>
              <span v-else>登录中...</span>
            </el-button>
            <el-button type="text" @click="updatepwd">修改密码</el-button>
            <!-- <el-link :underline="false" type="warning" to="this.$router.push('/updata')">修改密码</el-link> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi } from '../../utils/api/login'
// import '../../utils/api/login'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loading: false
    }
  },
  computed: {
    loginRules () {
      const validateUsername = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码必须在6位以上'))
        } else {
          callback()
        }
      }
      return {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      }
    }
  },
  created () {
  },
  methods: {
    async handleLogin () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          const res = await loginApi(this, this.loginForm)
          console.log(res)
          if (String(res.data.code) === '1') { // 1表示登录成功
            console.log(111111)
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            // window.location.href = '/backend/index.html'
            this.$router.replace('/index')
          } else {
            this.$message.error(res.msg)
            this.loading = false
          }
        }
      })
    },
    updatepwd () {
      this.$router.push('/updata')
    }
  }
}
</script>

<style>
@import url("../../styles/login.css");
@import url('../../styles/common.css');
@import url('../../styles/icon/iconfont.css');
.body{
    min-width: 1366px;
}
#update:hover{
  cursor: pointer;
}
</style>
