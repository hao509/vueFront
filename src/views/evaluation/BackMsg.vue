<template>
    <div class="dashboard-container" id="member-app">
      <div class="container">
        <el-table
                :data="tableData"
                stripe
                class="tableBox"
        >
          <el-table-column
                  prop="setmealname"
                  label="套餐名"
          ></el-table-column>
          <el-table-column
                  prop="dishname"
                  label="菜品名"
          ></el-table-column>
          <el-table-column
                  prop="phone"
                  label="手机号"
          ></el-table-column>
            <el-table-column
                  prop="comment"
                  label="评论"
          ></el-table-column>
        </el-table>
        <el-pagination
                class="pageList"
                :page-sizes="[2]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="counts"
                :current-page.sync="page"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
</template>

<script>

import { BackmsgApi } from '../../utils/api/evaluation'
export default {
  name: 'MemberList',
  data () {
    return {
      input: '',
      counts: 0,
      page: 1,
      pageSize: 2,
      tableData: [],
      id: '',
      status: ''
    }
  },
  computed: {},
  created () {
    this.init()
    if (localStorage.getItem('userInfo') != null) {
      // 获取当前登录员工的账号，并赋值给模型数据user
      this.user = JSON.parse(localStorage.getItem('userInfo')).data.username
    }
  },
  mounted () {
  },
  methods: {
    async init () {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        name: this.input ? this.input : undefined
      }
      await BackmsgApi(params).then(res => {
        if (String(res.data.code) === '1') {
          this.tableData = res.data.data.records || []
          // console.log(res)
          this.counts = res.data.data.total
        }
      }).catch(err => {
        this.$message.error('请求出错了：' + err)
      })
    },
    handleQuery () {
      this.page = 1
      this.init()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.page = val
      this.init()
    }
  }
}
</script>
<style lang="scss">
@import url('../../styles/common.css');
@import url('../../styles/page.css');
#member-app  .notAdmin::after{
  border: 0 !important;
}
</style>
