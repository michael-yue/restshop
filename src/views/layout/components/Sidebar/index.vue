<template>
  <div wrap-class="scrollbar-wrapper">
    <div style="height:50px;background-color:rgb(255, 255, 255);padding:0px 0px; display:flex;border-bottom:1px solid #e6e6e6">
      <!-- <img src="@/assets/logo.png" width="36px" height="36px" style="padding:3px; margin:7px 0px"> -->
      <!-- <span style="color:rgb(64, 158, 255);font-size:18px;height:50px; line-height:50px; font-weight:600;margin:0px 10px">规谷食堂</span> -->
    </div>
    <el-scrollbar>
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped>
.el-scrollbar{height:100%}
.el-scrollbar >>> .el-scrollbar__wrap{height:100%}
.el-scrollbar >>> .el-scrollbar__view{height:100%}
</style>
