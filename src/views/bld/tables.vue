<template>
  <div class="bldsale">
    桌台
    <div :style="{height: myHeight}" style="display:flex; flex-direction:column">
      <div style="flex: 1 0 auto; display:flex; ">
        <div style="border:1px solid #f0f0f0; margin:10px; width:100%">
          <ul class="tables">
            <li v-for="item in tables" :key="item.id">{{ item.name }}</li>
          </ul>
        </div>
      </div>
      <div style="">
        prods
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'Tables',
  data() {
    return {
      myHeight: 0,
      tables: [
        { id: 1, name: '第一台' },
        { id: 2, name: '第二台' },
        { id: 3, name: '第二台' },
        { id: 4, name: '第一台' },
        { id: 5, name: '第二台' },
        { id: 6, name: '第二台' },
        { id: 7, name: '第一台' },
        { id: 8, name: '第二台' },
        { id: 9, name: '第二台' },
        { id: 10, name: '第一台' },
        { id: 11, name: '第二台' },
        { id: 12, name: '第二台' },
      ]
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = 0 // this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 100) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - 100) + 'px'
    }
  },
  created: {
    //bldsale
  },
  methods: {

  }
}
</script>

<style scoped>
ul.tables {display:flex; flex-wrap: wrap}
ul.tables li {height:80px; width:80px;border:1px solid #f0f0f0; line-height:80px; text-align:center; margin:5px; background: cornflowerblue}
ul.tables li:active{background: crimson}
</style>
