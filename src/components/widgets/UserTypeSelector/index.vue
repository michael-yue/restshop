<template>
  <div class="usertypeselect">
    <el-select v-model="selectedUserTypeId" size="small" class="text-left">
      <el-option v-if="type == 'all'" :value="0" :key="0" label="全部">全部</el-option>
      <el-option v-for="item in usertypes" :value="item.id" :label="item.name" :key="item.id" name="usertype" placeholder="请选择人员类型">
        {{ item.name }}
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { getUserTypes } from '@/api/branch'
export default {
  name: 'SelectUserType',
  props: {
    userTypeId: {
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
      selectedUserTypeId: '',
      usertypes: []
    }
  },
  watch: {
    selectedUserTypeId(val, oldval) {
      this.$emit('UserTypeChanged', { userTypeId: this.selectedUserTypeId })
    },
    userTypeId(val, oldval) {
      this.selectedUserTypeId = this.userTypeId
    }
  },
  created: function() {
    if (this.userTypeId !== 0) {
      this.selectedUserTypeId = this.userTypeId
    }
    this.retrieve()
  },
  methods: {
    retrieve: function() {
      var that = this
      getUserTypes().then(response => {
        that.usertypes = response.data
        console.log(this.usertypes)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scope>
.usertypeselect{display:inline-block;margin:0px}
</style>
