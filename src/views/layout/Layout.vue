<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="!anonymous && !normal">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    </div>
    <div v-if="!anonymous && !normal"><sidebar class="sidebar-container"/></div>
    <div v-if="!anonymous && !normal">
      <div class="main-container">
        <div v-if="!anonymous && !normal"><navbar/></div>
        <app-main/>
      </div>
    </div>
    <div v-else >
      <div v-if="!anonymous && !normal"><navbar/></div>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    anonymous() {
      return this.$store.getters.roles.includes('anonymous')
    },
    normal() {
      return this.$store.getters.roles.includes('normal')
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
