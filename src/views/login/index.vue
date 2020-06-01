<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">豪享拍供应商</h2>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
          <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码">
          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>
            <span slot="suffix" @click="showPwd">
            <svg-icon icon-class="eye" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha" v-if="this.loginForm.username">
              <el-row :gutter="20">
                <el-col :span="13">
                  <el-input v-model="loginForm.captcha" placeholder="图形验证码">
                  </el-input>
                </el-col>
                <el-col :span="10" class="login-captcha">
                  <img :src="this.captchaPath" @click="getCaptcha1()" alt="">
                </el-col>
              </el-row>
        </el-form-item>
        <div style="display:flex;flex:1;justify-content:space-between;align-items:center;">
           <router-link to="/reg" style="color:#409EFF;padding:0px 0 15px;">注册账号</router-link>
           <router-link to="/forget-login" style="color:#409EFF;padding:0px 0 15px;">忘记密码？</router-link>
        </div>
        <el-form-item style="margin-bottom: 60px">
          <el-button style="width: 100%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
    <div class="footer">
            <p>工作时间：9:00-18:00 地址：成都金牛高新技术产业园区蜀西路46号</p>
            <p>Copyright @ 2019 四川乐享拍网络科技有限公司 版权所有 :蜀ICP备19018827号</p>
    </div>
  </div>
</template>

<script>
  // import {isvalidUsername} from '@/utils/validate';
  import login_center_bg from '@/assets/images/login_center_bg.png'

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value.length > 5) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码不能小于3位'))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          username: 'admin',
          password: '123456',
          captcha:''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}],
          captcha: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        captchaPath:'',
        loading: false,
        pwdType: 'password',
        login_center_bg,
        // dialogVisible:false
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false;
              this.$router.push({path: '/'})
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('参数验证不合法！');
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }
  .box{
    font-size: 14px;
  }
.forget1{
  float: left;
  color: #409EFF;
  cursor: pointer;
  margin-bottom: 10px ;
}
.forget2{
  float: right;
  cursor: pointer;
  color: #409EFF;
  margin-bottom: 10px ;
}
  .login-title {
    text-align: center;
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
  .footer{
  color: #404040;
  text-align:center;
  position: absolute;
  bottom: 40px;
  left: 50%;
  margin-left: -292px;
}
</style>
