<template>
  <div class="cardlist">
    <div ref="critheader" class="critheader">
      <el-button type="primary" plain size="small" style="margin-left:20px" @click="add" >新建</el-button>
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
        <el-table-column prop="branchId" label="单位编码" width="100" header-align="center" align="right" />
        <el-table-column prop="name" label="单位名称" header-align="center" align="left" />
        <el-table-column
          fixed="right"
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
      :fullscreen="false"
      :modal="true"
      :show-close="true"
      title="单位信息"
      top="5vh">
      <div>
        <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="80px">
          <el-form-item label="单位代码" size="small" prop="branchId">
            <el-input v-model="editForm.branchId" maxlength="10"/>
          </el-form-item>
          <el-form-item label="名称" size="small" prop="branchName">
            <el-input v-model="editForm.name" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listAllBranches, addBranch, updateBranch, deleteBranch } from '@/api/branch.js'
import BranchTypeSelector from '@/components/widgets/BranchSelector'

export default {
  name: 'BranchList',
  components: {
    BranchTypeSelector
  },
  data() {
    return {
      myHeight: '',
      loading: false,
      // 表格变量
      tableData: [],
      total: 0,
      limit: 10,
      currentPage: 1,
      // flag: false
      branchTypeSelected: '',
      dialogFormVisible: false,
      dialogStatus: '',
      editForm: {
        id: 0,
        name: '',
        shortname: '',
        typeId: 0
      },
      editFormRules: {
        branchId: [{ required: true, message: '请输入代码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        branchName: [{ required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 40, message: '长度在 4 到 40 个字符', trigger: 'blur' }],
        branchShortName: [{ required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }]
      }
    }
  },
  watch: {
    branchTypeSelected(val, oldval) {
      this.retrieve()
    },
    limit(val, oldval) {
      this.retrieve()
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    // const statHeight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 100) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - 100) + 'px'
    }
  },
  created: function() {
    this.retrieve()
  },
  methods: {
    retrieve: function() {
      this.loading = true
      listAllBranches(this.branchTypeSelected, this.currentPage, this.limit).then(response => {
        this.tableData = response.data
        this.total = response.totalnum
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    tableheader({ row, index }) {
      return 'background:#DCDFE6;'
    },
    // 分页处理
    pagechange: function(currentPage) {
      this.currentPage = currentPage
      this.retrieve()
    },
    handleSizeChange: function(currentSize) {
      this.limit = currentSize
    },
    BranchTypeSelectedEvent: function(event) {
      this.branchTypeSelected = event.branchTypeId
    },
    addformBranchTypeSelectedEvent: function(event) {
      this.editForm.typeId = event.branchTypeId
    },
    add: function() {
      this.editForm = {
        id: 0,
        branchId: '',
        branchName: '',
        branchShortName: '',
        typeId: 0
      }
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    edit: function(index, row) {
      this.editForm = {
        id: row.id,
        branchId: row.branchId,
        branchName: row.branchName,
        branchShortName: row.branchShortName,
        typeId: row.type.id
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    deleterow: function(index, row) {
      this.$confirm('确认删除吗？', '提示', {})
        .then(() => {
          const para = Object.assign({}, row)
          deleteBranch(para).then(res => {
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
    createData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              const para = Object.assign({}, this.editForm)
              addBranch(para).then(res => {
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
    },
    updateData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              const para = Object.assign({}, this.editForm)
              updateBranch(para).then(res => {
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
.critheader {padding:10px 20px; display: flex; justify-content: space-between}
</style>
