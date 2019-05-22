<template>
  <div class="orderlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <BranchSelector typeclass="all" @BranchChanged="branchChangedEvent"/>
        <span style="font-size:14px">选择日期：</span>
        <el-date-picker type="date" placeholder="选择日期" v-model="transDate" />
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <el-table :data="orders" :header-cell-style="tableheader" border size="small" height="100%">
        <el-table-column prop="user.realname" label="姓名" />
        <el-table-column prop="transDate" label="时间">
          <template slot-scope="scope">
            <div>{{ scope.row.transDate.time | formatDate }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额" align="right"/>
        <el-table-column prop="id" label="操作" align="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleterow(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px; text-align: right">
        <el-pagination
          :current-page="currentPage"
          :page-size="limit"
          :total="total"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="pagechange" />
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import BranchSelector from '@/components/widgets/BranchSelector'
import { getTransList, deleteTrans } from '@/api/report'
import { parseTime, getYesterday, getThisPeriodStart, getThisPeriodEnd,
  getLastPeriodStart, getLastPeriodEnd, getThisMonthStart, getThisMonthEnd,
  getLastMonthStart, getLastMonthEnd } from '@/utils'
export default {
  name: 'CashReport',
  components: {
    BranchSelector
  },
  filters: {
    formatDate(time) {
      const date = new Date(time)
      return parseTime(date, '{h}:{i}:{s}')
    }
  },
  data() {
    return {
      selectedBranch: '',
      branches: [],
      orders: [],
      myHeight: '',
      total: 0,
      limit: 10,
      currentPage: 1,
      repdate: '',
      transDate: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '昨日',
            onClick(picker) {
              picker.$emit('pick', [getYesterday(), getYesterday()])
            }
          }, {
            text: '本期',
            onClick(picker) {
              picker.$emit('pick', [getThisPeriodStart(), getThisPeriodEnd()])
            }
          }, {
            text: '上期',
            onClick(picker) {
              picker.$emit('pick', [getLastPeriodStart(), getLastPeriodEnd()])
            }
          }, {
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [getThisMonthStart(), getThisMonthEnd()])
            }
          }, {
            text: '上月',
            onClick(picker) {
              picker.$emit('pick', [getLastMonthStart(), getLastMonthEnd()])
            }
          }
        ]
      }
    }
  },
  watch: {
    transDate: function(val, oldval) {
      this.retrieveData()
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 100) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - 100) + 'px'
    }
  },
  created: function() {
    //
  },
  methods: {
    branchChangedEvent(event) {
      this.selectedBranch = event.branchId
      this.retrieveData()
    },
    retrieveData() {
      this.orders = []
      if (this.transDate.length === 0) {
        return
      }
      if (this.selectedBranch === '') {
        return
      }
      this.loading = true
      var startdate = parseTime(new Date(this.transDate), '{y}-{m}-{d}')
      getTransList(this.selectedBranch, startdate, startdate, this.currentPage, this.limit).then(response => {
        this.orders = response.data
        this.total = response.totalnum
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    deleterow: function(index, row) {
      this.$confirm('确认删除吗？', '提示', {})
        .then(() => {
        const param = {transid: row.id}
        deleteTrans(param).then(response => {
          this.retrieveData()
        }).catch(error => {
          console.log(error)
        })
      })
    },
    // 分页处理
    pagechange: function(currentPage) {
      console.log('pagechange')
      this.currentPage = currentPage
      this.retrieveData()
    },
    handleSizeChange: function(currentSize) {
      this.limit = currentSize
      this.retrieveData()
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
.critheader { padding:10px 20px; display:flex; justify-content: flex-end}
.orderlist{display: flex; flex-direction: column;flex-flow: column;align-items: stretch;height:100%}
.el-card >>> .el-card__body {height:100%}
.el-card{height:100%}
.ordercontents {display:flex; padding:5px; font-size:14px}
.billtype {flex:1 1 200px}
.amount{flex:1 1 200px; text-align: right}
</style>
