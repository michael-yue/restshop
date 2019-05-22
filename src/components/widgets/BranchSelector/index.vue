<template>
  <div class="branchselect">
    <el-select v-model="selectedBranchId" size="small" class="text-left">
      <div v-if="type == 'all'">
        <el-option :value="0" :key="0" label="全部" >全部</el-option>
      </div>
      <el-option v-for="item in branches" :value="item.id" :label="item.name" :key="item.id" name="branch" placeholder="请选择单位">
        {{ item.name }}
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { getBranches } from '@/api/branch'
export default {
  name: 'SelectBranch',
  props: {
    branchId: {
      default: 0,
      type: Number
    },
    type: {
      default: 'select',
      type: String
    }
  },
  data() {
    return {
      selectedBranchId: '',
      branches: []
    }
  },
  watch: {
    selectedBranchId(val, oldval) {
      this.$emit('BranchChanged', { branchId: this.selectedBranchId })
    },
    branchId(val, oldval) {
      this.selectedBranchId = this.branchId
    }
  },
  created: function() {
    if (this.branchId !== 0) {
      this.selectedBranchId = this.branchId
    }
    this.retriveBranch()
  },
  methods: {
    // 这里不对，权限
    retriveBranch: function() {
      var that = this
      getBranches().then(response => {
        that.branches = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scope>
.branchselect{display:inline-block;margin:0px}
.inlinelabel {position:relative;font-size:14px;display:inline-block;margin:0px 10px}
</style>
