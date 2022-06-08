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
                <el-form-item prop="password1">
                    <el-input v-model="loginForm.password1" type="password" placeholder="当前密码" prefix-icon="iconfont icon-lock" maxlength="20"
                              @keyup.enter.native="handleLogin" />
                </el-form-item>
                <el-form-item prop="password2">
                    <el-input v-model="loginForm.password2" type="password" placeholder="新密码" prefix-icon="iconfont icon-lock" maxlength="20"
                              @keyup.enter.native="handleLogin" />
                </el-form-item>
                <el-form-item style="width:100%;">
                  <el-button style="width:40%;" @click="goBack">返回</el-button>
                  <el-button :loading="loading" class="login-btn" size="medium" type="primary" style="width:40%;"
                              @click.native.prevent="Updatapwd">
                      <span v-if="!loading">修改密码</span>
                      <span v-else>修改...</span>
                  </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</div>
</template>

<script>
import { updataApi } from '../../utils/api/login'
export default {
  name: 'Updata',
  data () {
    return {
      loginForm: {
        username: '',
        password1: '',
        password2: ''
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
    async Updatapwd () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          const res = await updataApi(this, this.loginForm)
          if (String(res.data.code) === '1') { // 1表示登录成功
            localStorage.setItem('userInfo', JSON.stringify(res.data.data))
          } else {
            this.$message.error(res.msg)
            this.loading = false
          }
        }
      })
    },
    goBack () {
      this.$router.replace('/')
    }
  }
}
</script>
