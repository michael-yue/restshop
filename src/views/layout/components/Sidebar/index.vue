<template>
  <div wrap-class="scrollbar-wrapper">
    <div style="height:150px; background:#304156; padding:0px 0px; display:flex;">
    <!-- <img src="@/assets/logo.png" width="36px" height="36px" style="padding:3px; margin:7px 0px;border-bottom:1px solid #c0c0C0"> -->
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
.el-scrollbar >>> .el-scrollbar__wrap{height:100%; overflow: hidden;margin-right: 0px;}
.el-scrollbar >>> .el-scrollbar__view{height:100%}
</style>
