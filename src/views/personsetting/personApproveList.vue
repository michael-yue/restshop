<template>
  <div class="cardlist">
    <div ref="critheader" class="critheader">
      <BranchSelector type="all" @BranchChanged="critBranchChangedEvent" />
      <div style="display:flex; align-items: center;margin-left:10px">
        <el-radio-group v-model="critStatus">
          <el-radio :label="1"> 已确认 </el-radio>
          <el-radio :label="2"> 未确认 </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <el-table
        v-loading="loading"
        ref="refTable"
        :data="tableData"
        :class="{'tablestyle': true}"
        :header-cell-style="tableheader"
        border
        size="small"
        height="100%">
        <el-table-column prop="id" label="编码" width="" header-align="center" align="left" />
        <el-table-column prop="realname" label="姓名" width="" header-align="center" align="left" />
        <el-table-column prop="branch.name" label="单位" width="" header-align="center" align="left" />
        <el-table-column prop="userType.name" label="类型" width="" header-align="center" align="left" />
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
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
    <el-dialog
      :visible.sync="dialogFormVisible"
      :fullscreen="true"
      :modal="true"
      :show-close="true"
      title="人员信息"
      top="5vh">
      <div>
        <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="80px">
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="editForm.realName" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="单位" prop="branchId">
            <BranchSelector :branch-id="editForm.branchId" @BranchChanged="BranchChangedEvent" />
          </el-form-item>
          <el-form-item label="人员类型" prop="userType">
            <UserTypeSelector :user-type-id="editForm.usertypeId" @UserTypeChanged="UserTypeChangedEvent" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="updateData">审核确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listAllUser, approveUser, deleteUser } from '@/api/person.js'
import BranchSelector from '@/components/widgets/BranchSelector'
import UserTypeSelector from '@/components/widgets/UserTypeSelector'

export default {
  name: 'PersonArpproveList',
  components: {
    BranchSelector,
    UserTypeSelector
  },
  data() {
    return {
      myHeight: '',
      loading: false,
      // data table
      tableData: [],
      total: 0,
      limit: 10,
      currentPage: 1,
      critBranch: '',
      critStatus: 1,
      // edit dialog
      dialogFormVisible: false,
      branchId: '',
      usertypeId: '',
      editForm: {
        id:'',
        openid: '',
        realName: '',
        usertypeId: '',
        branchId: ''
      },
      editFormRules: {
        realname: [{ required: true, message: '请输入顺序号', trigger: 'blur' }],
        branchname: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        usertypeId: [{ required: true, message: '请输入代码', trigger: 'blur' }]
      }
    }
  },
  watch: {
    critBranch(oldval, newval) {
      this.retrieve()
    },
    critStatus(oldval, newval) {
      this.retrieve()
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
    // this.retrieve()
  },
  methods: {
    retrieve: function() {
      this.loading = true
      listAllUser(this.critBranch, this.critStatus, this.currentPage, this.limit).then(response => {
        this.tableData = response.data
        this.total = response.totalnum
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    tableheader({ row, index }) {
      return 'background:#E4E7ED;'
    },
    // 分页处理
    pagechange: function(currentPage) {
      this.currentPage = currentPage
      this.retrieve()
    },
    handleSizeChange: function(currentSize) {
      this.limit = currentSize
      this.retrieve()
    },
    critBranchChangedEvent: function(event) {
      this.critBranch = event.branchId
    },
    BranchChangedEvent: function(event) {
      // this.branchId = event.branchId
      this.editForm.branchId = event.branchId
    },
    UserTypeChangedEvent: function(event) {
      // this.usertypeid = event.usertypeId
      this.editForm.usertypeId = event.userTypeId
    },
    closeDialog: function(){
      this.$refs['editForm'].resetFields()
      this.dialogFormVisible = false
    },
    edit: function(index, row) {
      // this.editForm = Object.assign({}, row)
      console.log(row)
      this.editForm.id = row.id
      this.editForm.openid = row.openid
      if (row.branch !== null) {
        this.editForm.branchId = row.branch.id
      } else {
        this.editForm.branchId = ''
      }
      this.editForm.realName = row.realname
      if (row.userType !== null) {
        this.editForm.usertypeId = row.userType.id
      } else {
        this.editForm.usertypeId = ''
      }
      console.log(this.editForm)
      this.dialogFormVisible = true
    },
    deleterow: function(index, row) {
      this.$confirm('确认删除吗？', '提示', {})
        .then(() => {
          const para = Object.assign({}, row)
          deleteUser(para).then(res => {
            if (res.code === 20000) {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
            }
            this.dialogFormVisible = false
            this.retrieve()
          })
        })
        .catch(e => {
          console.log(e)
        })
    },
    updateData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              const para = Object.assign({}, this.editForm)
              approveUser(para).then(res => {
                if (res.code === 20000) {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                }
                this.$refs['editForm'].resetFields()
                this.dialogFormVisible = false
                this.retrieve()
              })
            })
            .catch(e => {
              console.log(e)
            })
        }
      })
    }
  }
}
</script>
<style scoped>
.critheader { padding:10px 20px; display:flex; justify-content: flex-end}
</style>
