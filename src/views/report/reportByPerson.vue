<template>
  <div class="orderlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <BranchSelector typeclass="all" @BranchChanged="branchChangedEvent"/>
        <span style="font-size:14px">选择日期：</span>
        <!-- <el-date-picker v-model="transDate" type="date" placeholder="选择日期" /> -->
        <el-date-picker
          v-model="dateRange"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期" />
        <el-button :loading="downloading" type="primary" plain size="small" icon="document" @click="handleDownload">导出excel</el-button>
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
import { getTransList, getTransListAll, deleteTrans } from '@/api/report'
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
      dateRange: [],
      // transDate: '',
      downloading: false,
      exportlabel: [{ value: '时间' }, { value: '姓名' }, { value: '金额'} ],
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
    dateRange: function(val, oldval) {
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
      if (this.dateRange.length === 0) {
        return
      }
      if (this.selectedBranch === '') {
        return
      }
      this.loading = true
      var repdatefrom = parseTime(new Date(this.dateRange[0]), '{y}-{m}-{d}')
      var repdateto = parseTime(new Date(this.dateRange[1]), '{y}-{m}-{d}')
      this.repdate = parseTime(new Date(this.dateRange[0]), '{y}年{m}月{d}日') +
      '到' + parseTime(new Date(this.dateRange[1]), '{y}年{m}月{d}日')
      getTransList(this.selectedBranch, repdatefrom, repdateto, this.currentPage, this.limit).then(response => {
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
          const param = { transid: row.id }
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
    },
    handleDownload: function() {
      this.downloading = true
      if (this.dateRange.length === 0) {
        return
      }
      if (this.selectedBranch === '') {
        return
      }
      var repdatefrom = parseTime(new Date(this.dateRange[0]), '{y}-{m}-{d}')
      var repdateto = parseTime(new Date(this.dateRange[1]), '{y}-{m}-{d}')
      getTransListAll(this.selectedBranch, repdatefrom, repdateto).then(response => {
        this.JSONToExcelConvertor(response.data, "规谷食堂就餐明细", this.exportlabel)
        this.downloading = false
      }).catch(error => {
        console.log(error)
      })
    },
    JSONToExcelConvertor(JSONData, FileName, ShowLabel) {
      var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData
      var excel = '<table>'
      //设置表头
      var row = '<tr>'
      for (var i = 0, l = ShowLabel.length; i < l; i++) {
        row += '<td>' + ShowLabel[i].value + '</td>'
      } 
      //换行
      excel += row + '</tr>'
      //设置数据
      for (var i = 0; i < arrData.length; i++) {
        var row = '<tr>'
        row += '<td>' + parseTime(arrData[i].transDate.time, '{y}年{m}月{d}日 {h}:{i}:{s}') + '</td>'
        row += '<td>' + arrData[i].user.realname + '</td>'
        row += '<td>' + arrData[i].amount + '</td>'
        excel += row + '</tr>'
      }
      excel += '</table>'
      var excelFile = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
      excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
      excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel'
      excelFile += '; charset=UTF-8">'
      excelFile += '<head>'
      excelFile += '<!--[if gte mso 9]>'
      excelFile += '<xml>'
      excelFile += '<x:ExcelWorkbook>'
      excelFile += '<x:ExcelWorksheets>'
      excelFile += '<x:ExcelWorksheet>'
      excelFile += '<x:Name>'
      excelFile += 'Sheet1'
      excelFile += '</x:Name>'
      excelFile += '<x:WorksheetOptions>'
      excelFile += '<x:DisplayGridlines/>'
      excelFile += '</x:WorksheetOptions>'
      excelFile += '</x:ExcelWorksheet>'
      excelFile += '</x:ExcelWorksheets>'
      excelFile += '</x:ExcelWorkbook>'
      excelFile += '</xml>'
      excelFile += '<![endif]-->'
      excelFile += '</head>'
      excelFile += '<body>'
      excelFile += excel
      excelFile += '</body>'
      excelFile += '</html>'      
      var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile)
      var link = document.createElement('a')
      link.href = uri
      link.style = 'visibility:hidden'
      link.download = FileName + '.xls'      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    // var JSON_DATA = {
    //       "title":[
    //              {"value":"司机", "type":"ROW_HEADER_HEADER", "datatype":"string"},
    //              {"value":"日期", "type":"ROW_HEADER_HEADER", "datatype":"string"},
    //              {"value":"物流单数量", "type":"ROW_HEADER_HEADER", "datatype":"string"},
    //              {"value":"退货单数量", "type":"ROW_HEADER_HEADER", "datatype":"string"},
    //              {"value":"发货总件数", "type":"ROW_HEADER_HEADER", "datatype":"string"},
    //              {"value":"退货总件数", "type":"ROW_HEADER_HEADER", "datatype":"string"},
    //              {"value":"拒收总件数", "type":"ROW_HEADER_HEADER", "datatype":"string"},
    //              {"value":"取消发货总件数", "type":"ROW_HEADER_HEADER", "datatype":"string"},
    //              {"value":"物流费总金额    ", "type":"ROW_HEADER_HEADER", "datatype":"string"},
    //              {"value":"代收手续费总金额", "type":"ROW_HEADER_HEADER", "datatype":"string"},
    //              {"value":"代收货款总金额", "type":"ROW_HEADER_HEADER", "datatype":"string"}
    //     ],
    //    "data":[ 
    //     ] 
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
