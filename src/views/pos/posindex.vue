<template>
  <div class="pos">
    <div class="critheader" ref="critheader">
      <el-card>
        <div style="display:flex">
          <div :span="4" style="margin:10px">扫码</div>
          <div :span="10" sty>
            <el-input v-model="qrcode" size="small" @keyup.enter.native="submit"/>
          </div>
          <audio id="bgMusic" src="/static/audio/payed.mp3" preload></audio>
        </div>
      </el-card>
    </div>
    <div class="maincontainer">
      <div :style="{height: myHeight}" v-show="showLunch" style="border:1px solid #f0f0f0;">
        <ul>
          <li v-for="item in listpayed" :key="item.username" class="paylist">
            <div class="name">{{item.username}}</div>
            <div class="amount">{{item.payfee}}</div>
          </li>
        </ul>
      </div>
      <div :style="{height: myHeight}" v-show="showBreakfast" style="border:1px solid #f0f0f0;padding:20px; font-size:24px">
        <div style="display:flex; border-bottom: solid 1px #333;padding:20px 0">
          <div style="flex: 0 0 20%">{{breakfast.username}}</div>
          <div style="flex: 0 0 40%">单位：{{breakfast.userbranch}}</div>
          <div style="flex: 0 0 20%">金额：{{breakfast.payedamount}}</div>
          <div v-if="breakfast.commited == 1" style="flex: 0 0 20%;color:#fb3333">已取餐</div>
        </div>
        <ul style="margin:30px">
          <li v-for="item in breakfast.lines" :key="item.username" class="schedulelist">
            <div class="qty">{{item.qty}}</div>
            <div class="name">{{item.prodname}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { payQrcode } from '@/api/pos.js'
export default {
  name: 'posindex',
  data() {
    return {
      qrcode: '',
      listpayed: [],
      myHeight: '',
      showLunch: true,
      showBreakfast: false,
      breakfast: {
        username: '',
        usertype: '',
        order: {}
      }
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    // const tableheaderheight = this.$refs.tableheader.offsetHeight
    const tableheaderheight = 0
    this.myHeight = (h - critheaderheight - tableheaderheight - 50) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - tableheaderheight - 50) + 'px'
    }
  },
  created: function() {
  },
  methods: {
    submit:function(){
      if (this.qrcode === '') {
        return
      }
      const param = {qrcode : this.qrcode}
      payQrcode(param).then(res => {
        // 20001???
        this.qrcode = ''
        this.breakfast = {}
        if (res.type === 2) {
          this.listpayed.unshift(res)
          this.gamemuiscs1 = new Audio('/static/audio/payed.mp3')
          this.gamemuiscs1.play()
          this.showLunch = true
          this.showBreakfast = false
        } else if (res.type === 1) {
          this.breakfast = res.data
          this.showLunch = false
          this.showBreakfast = true
        }
      }).catch(error => {
        console.log(error)
      })
   } 
  }
}
</script>

<style scoped>
.pos {padding:10px}
.el-card >>> .el-card__body {height:100%}
.el-card{height:100%}
/* .critheader { padding:10px 20px; display:flex;} */
.maincontainer{margin-top:10px;}
.paylist {display:flex; padding-bottom: 5px; padding-left:10px}
.paylist .name{min-width: 100px}
.schedulelist {display:flex; padding:10px}
.schedulelist .qty{flex: 0 0 20%}
.schedulelist .name{min-width: 100px}
</style>