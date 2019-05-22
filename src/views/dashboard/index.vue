<template>
  <div>
    HomePage
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  watch: {
  },
  created: function() {
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
p{ line-height:30px}
.hljs {
  line-height: 1.8;
  // font-family: Menlo,Monaco,Consolas,Courier,monospace;
  font-size: 12px;
  padding: 18px 24px;
  background-color: #fafafa;
  border: 1px solid #eaeefb;
  margin-bottom: 25px;
  border-radius: 4px;
  -webkit-font-smoothing: auto;
  color:#000
}
</style>

<style scoped>
.main-cnt{
  height: calc(100% - 50px);
  margin-top: 0px;
}

.el-scrollbar__wrap{
  overflow: scroll;
  overflow-y:auto
}

.effect{
  box-shadow:0px 1px 4px rgba(0,0,0,0.3),0 0 40px rgba(0,0,0,0.1) inset;
	/* webkit-box-shadow:0px 1px 4px rgba(0,0,0,0.3),0 0 40px rgba(0,0,0,0.1) inset;
	moz-box-shadow:0px 1px 4px rgba(0,0,0,0.3),0 0 40px rgba(0,0,0,0.1) inset;
	o-box-shadow:0px 1px 4px rgba(0,0,0,0.3),0 0 40px rgba(0,0,0,0.1) inset; */
}
.effect:after,.effect:before{
	content:" ";
	/* background:#f00; */
	position:absolute;
	top:50%;
	bottom:0px;
	left:10px;
	right:10px;
	box-shadow:0 0 20px rgba(0,0,0,0.8);
	/* webkit-box-shadow:0 0 20px rgba(0,0,0,0.8);
	moz-box-shadow:0 0 20px rgba(0,0,0,0.8);
	o-box-shadow:0 0 20px rgba(0,0,0,0.8); */
	border-radius:100px/10px;
	z-index:-1;
}
</style>
