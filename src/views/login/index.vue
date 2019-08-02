<template>
  <div class="container">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt="logo" />
      <el-form ref="loginForm" :model="loginForm" :rules="rules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" class="mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" class="code" placeholder="请输入验证码"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()" :plain="true">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkPhone = (rule, value, callback) => {
      if (!/^1[3-9][\d]{9}$/.test(value)) {
        return callback(new Error('请输入正确的手机号'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.loginForm
            )
            .then(res => {
              this.$router.push('/')
            })
            .catch(error => {
              console.log(error)
              this.$message.error('手机号或验证码输入有误')
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped >
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login_bg.jpg") no-repeat center / cover;
  .box-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 350px;
    img {
      display: block;
      height: 46px;
      margin: 0 auto 26px;
    }
    .code {
      width: 236px;
      margin-right: 10px;
    }
  }
}
</style>
