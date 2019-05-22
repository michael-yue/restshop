<template>
  <div class="navbarwrapper">
    <el-menu class="navbar" mode="horizontal">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
      <breadcrumb />
      <div class="avatar-container">
        <el-button v-if="device === 'desktop'" size="mini" style="margin-right:10px" @click="toggle">全屏</el-button>
        <el-dropdown trigger="click">
          <div class="avatar-wrapper">
            <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
            <div>{{ name }}</div>
            <i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item>
              <span style="display:block;" @click="UpdatePassword">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">注销</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
    <el-dialog
      :visible.sync="dialogVisible"
      :fullscreen="false"
      :modal="true"
      :show-close="true"
      width="400px"
      title="修改密码"
      top="5vh">
      <div>
        <el-form ref="passwordForm" :model="editForm" :rules="rules" label-width="120px">
          <el-form-item label="旧密码" prop="oldpassword" required>
            <el-input v-model="editForm.oldpassword" type="password" size="small" />
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword" required>
            <el-input v-model="editForm.newpassword" type="password" size="small" />
          </el-form-item>
          <el-form-item label="重输入" prop="repassword" required>
            <el-input v-model="editForm.repassword" type="password" size="small" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="updateData">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateNormalPassword } from '@/api/login.js'
import store from '@/store'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.editForm.newpassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      name: 'NavBar',
      fullscreen: false,
      dialogVisible: false,
      editForm: {
        userLoginId: '',
        oldpassword: '',
        newpassword: '',
        repassword: ''
      },
      rules: {
        oldpassword: [
          { required: true, message: '请输入旧密码', tigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', tigger: 'blur' }
        ],
        newpassword: [
          { required: true, message: '请输入新密码', tigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', tigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '重新输入新密码', tigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', tigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    device() {
      return this.$store.state.app.device
    }
  },
  created: function() {
    this.name = store.getters.name
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    toggle: function() {
      if (this.fullscreen) { // 退出全屏
        var de1 = document
        if (de1.exitFullscreen) {
          de1.exitFullscreen()
        } else if (de1.mozCancelFullScreen) {
          de1.mozCancelFullScreen()
        } else if (de1.webkitCancelFullScreen) {
          de1.webkitCancelFullScreen()
        }
        this.fullscreen = false
      } else { // 进入全屏
        var de = document.documentElement
        if (de.requestFullscreen) {
          de.requestFullscreen()
        } else if (de.mozRequestFullScreen) {
          de.mozRequestFullScreen()
        } else if (de.webkitRequestFullScreen) {
          de.webkitRequestFullScreen()
        }
        this.fullscreen = true
      }
    },
    UpdatePassword: function() {
      this.editForm = {
        oldpassword: '',
        newpassword: '',
        repassword: ''
      }
      this.dialogVisible = true
    },
    updateData: function() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          updateNormalPassword(this.$store.getters.token, this.editForm.oldpassword, this.editForm.newpassword).then(response => {
            this.$message.error('密码已经修改！')
            this.$refs['passwordForm'].resetFields()
            this.dialogVisible = false
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error')
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    // height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 0px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>
