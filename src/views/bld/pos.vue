<template>
  <div class="bldsale">
    便利店
    <div style="display:flex;">
      <div style="flex: 0 0 30%; border:1px solid #f0f0f0; margin:10px">
        ordered
      </div>
      <div :style="{height: myHeight}" style="flex: 1 0 auto; display:flex; flex-direction:column;">
        <div style="flex: 0 0 auto">
          <ul class="producttype">
            <li v-for="item in prodtypes" :key="item.id">{{ item.name }}</li>
          </ul>
        </div>
        <div style="flex: 1 0 auto; background：#f0f0f0">
          <ul class="products">
            <li v-for="item in products" :key="item.id">{{ item.name }}</li>
          </ul>
        </div>
        <div style="flex: 0 0 auto">
          adfasd
        </div>
      </div>
    </div>    
  </div>  
</template>

<script>
export default {
  name: 'Bld',
  data() {
    return {
      myHeight: 0,
      prodtypes: [
        { id: 1, name: '菜品' },
        { id: 2, name: '面条弹弹' },
        { id: 3, name: '菜品' },
        { id: 4, name: '面条弹弹' },
        { id: 5, name: '菜品' },
        { id: 6, name: '面条弹弹' },
        { id: 7, name: '菜品' },
        { id: 8, name: '面条弹弹' }
      ],
      products: [
        { id: 1, name: '面对面（鸡蛋酱）', price: 19 },
        { id: 2, name: '冷饮买一送一A' , price: 10},
        { id: 3, name: '冷饮买一送一A' , price: 10},
        { id: 4, name: '面对面（鸡蛋酱）', price: 19 },
        { id: 5, name: '冷饮买一送一A' , price: 10},
        { id: 6, name: '面对面（鸡蛋酱）', price: 19 },
        { id: 7, name: '冷饮买一送一A' , price: 10},
        { id: 8, name: '面对面（鸡蛋酱）', price: 19 },
        { id: 9, name: '冷饮买一送一A' , price: 10},
        { id: 10, name: '面对面（鸡蛋酱）', price: 19 },
        { id: 11, name: '冷饮买一送一A' , price: 10},
      ]
    }
  },
  created: {
    
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight =  0 //this.$refs.critheader.offsetHeight
    // const statHeight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 80) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - 80) + 'px'
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.bldsale {display:flex; flex-direction: column}

ul.producttype {display:flex; margin: 2px;}
ul.producttype li {height:60px; width:100px;border:1px solid #f0f0f0; line-height:60px; text-align:center; margin:2px;background:lightpink;}

ul.products {display:flex; flex-wrap: wrap}
ul.products li {height:80px; border:1px solid #f0f0f0; line-height:80px; text-align:center; flex: 0 0 100px;
  margin:2px; display:flex; font-size:12px; background:lightgreen; color: #333}
</style>
