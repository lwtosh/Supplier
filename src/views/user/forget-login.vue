<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="dataForm"
               :rules="loginRules"
               ref="dataForm"
               label-position="left">
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">豪享拍供应商重置密码</h2>
        <el-form-item prop="tel" label="登录手机号码">
          <el-input name="tel"
                    type="text"
                    v-model="dataForm.tel"
                    autoComplete="on"
                    placeholder="输入登录手机号码">
                    <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
         <el-form-item prop="password" label="新密码 ">
          <el-input name="password"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    v-model="dataForm.password"
                    autoComplete="on"
                    placeholder="请输入新密码">
          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>
            <span slot="suffix" @click="showPwd">
            <svg-icon icon-class="eye" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha" v-if="this.dataForm.tel">
              <el-row :gutter="20">
                <el-col :span="13">
                  <el-input v-model="dataForm.captcha" placeholder="图形验证码">
                  </el-input>
                </el-col>
                <el-col :span="10" class="login-captcha">
                  <img :src="this.captchaPath" @click="getCaptcha1()" alt="">
                </el-col>
              </el-row>
        </el-form-item>
        <el-form-item prop="send">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-input v-model="dataForm.send" placeholder="短信验证码">
                  </el-input>
                </el-col>
                <el-col :span="10" class="login-captcha">
                  <el-button type="primary"  @click="getSend" round>{{verifyCodeNotes}}</el-button>
                </el-col>
              </el-row>
            </el-form-item>
       
        
        <el-form-item style="margin-bottom: 60px">
          <el-button style="width: 40%;margin-left:25px;" type="primary" :loading="loading" @click.native.prevent="handleLogin">
            确定
          </el-button>
          <el-button style="width: 40%;text-align: center;" type="primary" :loading="loading" @click.native.prevent="cence">
            取消
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
  import login_center_bg from '@/assets/images/login_center_bg.png'

  export default {
    name: 'reg',
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
      const validateTel = (rule, value, callback) => {
         const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error('手机号输入有误'))
        }
      };
      return {
        dataForm: {
          username: '',
          password: '',
          captcha:'',
          tel:'',
          send:''
        },
        verifyCodeNotes: '获取验证码',
        flag: true,
        phoneOK: false,
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}],
          tel: [{required: true, trigger: 'blur', validator: validateTel}],
          send: [{required: true, message: '验证码不能为空',trigger: 'blur'}],
          captcha: [{required: true, message: '验证码不能为空',trigger: 'blur'}]
        },
        loading: false,
        pwdType: 'password',
        login_center_bg,
      }
    },
    created () {
      this.getCaptcha()
    },
     watch: {
      'dataForm.tel': {
        handler (newValue, oldValue) {
          const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
          if (reg.test(newValue)) {
            this.phoneOK = true
          } else {
            this.phoneOK = false
          }
        },
        deep: true
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
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            let isSupport = getSupport();
            if(isSupport===undefined||isSupport==null){
              return;
            }
            this.loading = true;
            this.$store.dispatch('Login', this.dataForm).then(() => {
              this.loading = false;
              this.$router.push({path: '/'})
            }).catch(() => {
              this.getCaptcha1()
              this.loading = false
            })
          } else {
            this.getCaptcha1()
            console.log('参数验证不合法！');
            return false
          }
        })
      },
      dialogConfirm(){
        setSupport(true);
        window.location.href=SupportUrl;
      },
      dialogCancel(){
        setSupport(false);
      },
      // 获取验证码
      getCaptcha1 () {
        this.uuid = getUUID()
        this.captchaPath = this.$http.adornUrl(`/login/genCaptcha?userName=${this.dataForm.userName}&uuid=${this.uuid}`)
      },
      getCaptcha () {
        this.getCaptcha1()
      },
      cence(){
        this.$router.push({path: '/login'})
      },
      // 获取短信验证码
      getSend () {
        if (this.phoneOK && this.flag) {
          this.flag = false
          this.$http({
            url: this.$http.adornUrl('/login/sendVerifyCode'),
            method: 'post',
            params: this.$http.adornParams({
              mobile: this.dataForm.tel,
              imgVerifyCode: this.dataForm.send
            })
          }).then(({data}) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500
            })
            if (data.code === 'ok') {
            // console.log(data.verifycode)
              let num = 60
              this.verifyCodeNotes = num + '秒后重新获取验证码'
              let timer = setInterval(() => {
                num--
                this.verifyCodeNotes = num + '秒后重新获取验证码'
                if (num <= 0) {
                  clearInterval(timer)
                  this.verifyCodeNotes = '重新获取验证码'
                  this.flag = true
                }
              }, 1000)
            } else {
              this.$message.error('服务器错误')
              this.verifyCodeNotes = '重新获取验证码'
              this.flag = true
            }
          }).catch(() => {
            this.$message.error('错误')
            this.verifyCodeNotes = '重新获取验证码'
            this.flag = true
          })
        }
      },
       reg () {
        this.$router.replace({ name: 'reg' })
      }
    }
  }
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }
  .box{
    font-size: 14px;
    
  }
  .footer{
  color: #404040;
  text-align:center;
  position: absolute;
  bottom: 40px;
  left: 50%;
  margin-left: -292px;
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
</style>
