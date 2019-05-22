<template>
  <div class="orderlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card >
        <div style="display:flex">
          <span style="font-size:14px;margin:10px">选择日期：</span>
          <el-date-picker v-model="selectedDate" type="date" size="small" placeholder="选择日期" style="width:140px"/>
          <div style="display:flex; align-items: center;margin-left:10px; position:relative">
            <el-radio-group v-model="critStatus">
              <el-radio :label="1"> 所有预定 </el-radio>
              <el-radio :label="0"> 已经付货 </el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <div ref="tableheader" style="display:flex;flex-direction:column;padding:10px">
        <div style="width:100%;text-align:center;font-size:16px;color:#606266">统计报表</div>
        <!-- <div style="display:flex; font-size:14px;color:#606266">
          <div style="flex:1 1 auto; text-align:right"> 报表日期：{{ repdate }}</div>
        </div> -->
      </div>
      <el-table :data="orders" :header-cell-style="tableheader" border size="small" height="100%">
        <el-table-column prop="prodname" label="产品" align="right"/>
        <el-table-column prop="qty" label="数量" align="right"/>
      </el-table>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { parseTime } from '@/utils'
import { getScheduleSummary } from '@/api/report'
export default {
  name: 'ScheduleReport',
  data() {
    return {
      orders: [],
      myHeight: '',
      repdate: '',
      selectedDate: '',
      critStatus: 1
    }
  },
  watch: {
    selectedDate: function(val, oldval) {
      this.retrieveData()
    },
    critStatus: function(val, oldval) {
      this.retrieveData()
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    const tableheaderheight = this.$refs.tableheader.offsetHeight
    this.myHeight = (h - critheaderheight - tableheaderheight - 50) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - tableheaderheight - 50) + 'px'
    }
  },
  created: function() {
    //
  },
  methods: {
    retrieveData() {
      this.orders = []
      if (this.selectedDate === '') {
        return
      }
      const repdate = parseTime(this.selectedDate, '{y}-{m}-{d}')
      getScheduleSummary(repdate, this.critStatus).then(response => {
        this.orders = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    /*
    * 以下设置class
    */
    tableheader({ row, index }) {
      return 'background:#DCDFE6;'
    }
  }
}
</script>

<style scoped>
.orderlist{display: flex; flex-direction: column;flex-flow: column;align-items: stretch;height:100%}
.el-card >>> .el-card__body {height:100%}
.el-card{height:100%}
.ordercontents {display:flex; padding:5px; font-size:14px}
.billtype {flex:1 1 200px}
.amount{flex:1 1 200px; text-align: right}
</style>
