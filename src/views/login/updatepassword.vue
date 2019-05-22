<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">修改密码</h3>
      <!-- <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="登录名" />
      </el-form-item> -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="密码"
          maxlength="20" />
      </el-form-item>
      <el-form-item prop="repassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.repassword"
          name="repassword"
          auto-complete="on"
          placeholder="密码"
          maxlength="20" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="updatePassword">
          修改
        </el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      :visible.sync="dialogVisible"
      :fullscreen="true"
      :modal="true"
      :show-close="true"
      title="修改密码"
      top="5vh">
      <div>
        <!-- <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="120px">
          <el-form-item label="测评活动名称" required>
            <test-selector :test-id="editForm.testId" @TestChanged="addformtestChangeEvent" />
          </el-form-item>
          <el-form-item label="测评表名称" required>
            <el-input v-model="editForm.name" size="small" />
          </el-form-item>
          <el-form-item label="类型">
            <user-position-selector :user-position-id="editForm.type" @PositionChanged="addformUserPositionChangeEvent"/>
          </el-form-item>
        </el-form> -->
        <el-form ref="editForm" :model="editForm" label-width="120px">
          <el-form-item label="新密码" required>
            <el-input v-model="newpassword" size="small" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="updatePassword">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import store from '@/store'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      // console.log(rule, value)
      // if (!isvalidUsername(value)) {
      //   callback(new Error('请输入正确的用户名'))
      // } else {
      //   callback()
      // }
      callback()
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('密码不能小于2位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: 'dashboard',
      updateredirect: 'updatepassword',
      anonymousredirect: 'selectEval',
      dialogVisible: false,
      newpassword: '',
      editForm: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created: function() {
    console.log(store.getters.device)
  },
  methods: {
    updatePassword() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          console.log('role')
          console.log(store.getters.roles)
          this.$store.dispatch('Login', this.loginForm).then(() => {
            console.log(this.$store.getters.passwordupdated)
            this.loading = false
            if (!this.$store.getters.passwordupdated) {
              // this.dialogVisible = true
              this.$router.push({ path: this.updateredirect || '/' })
            } else {
              this.$router.push({ path: this.redirect || '/' })
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        box-shadow: 0;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
