
<template>
  <div class="app-container">
    <el-card class="filter-container"  shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据统计</span>
    <el-form :inline="true" :model="dataForm" style="margin-top:15px;">
        <el-form-item style="margin-left:40px;margin-bottom:0px;" label="账户累计收入："> &nbsp;￥{{this.money}}</el-form-item>
        <el-form-item style="margin-left:40px;margin-bottom:0px" label="账户剩余余额：">&nbsp;￥{{this.money}}</el-form-item>
        <el-form-item style="margin-left:40px;margin-bottom:0px" label="累计提现：">&nbsp;￥{{this.money}}</el-form-item>
        <el-form-item style="margin-left:40px;margin-bottom:0px" label="交易中金额（未结算金额）："> &nbsp;￥{{this.money}}</el-form-item>
    </el-form>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
       <el-button size="medium"  type="primary" @click="addOrUpdateHandle()" style="margin-left:30px;">新增</el-button>
    </el-card>
    <el-table
      :data="dataList"
      border
      class="table-container"
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        prop="bankName"
        header-align="center"
        align="center"
        max-width="180"
        label="银行名称">
      </el-table-column>
      <el-table-column
        prop="accountName"
        header-align="center"
        align="center"
        max-width="120"
        label="账户名称">
      </el-table-column>
      <el-table-column
        prop="bankNo"
        header-align="center"
        align="center"
        width="190"
        label="银行账号">
      </el-table-column>
      <el-table-column
        prop="province"
        header-align="center"
        align="center"
        width="180"
        label="开户省份">
      </el-table-column>
      <el-table-column
        prop="city"
        header-align="center"
        align="center"
         width="180"
        label="开户地市">
      </el-table-column>
      <el-table-column
        prop="openingBank"
        header-align="center"
        align="center"
        width="180"
        label="开户支行信息">
      </el-table-column>
      <el-table-column
        prop="defaultFlag"
        header-align="center"
        align="center"
        width="120"
        label="默认状态">
         <template slot-scope="scope">
          <el-tag v-if="scope.row.defaultFlag === 1" size="small">是</el-tag>
          <el-tag v-if="scope.row.defaultFlag === -1" type="success" size="small">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="190"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary"  icon="el-icon-edit" @click="addOrUpdateHandle(scope.row)" size="mini" plain round>修改</el-button>
          <el-button type="danger"  icon="el-icon-delete" @click="deleteHandle(scope.row.id)" size="mini" plain round>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import addOrUpdate from './info-add-or-update'

  export default {
    data () {
      return {
        id: '',
        money: 300,
        dataForm: {
          accessCode: '',
          telphone: ''
        },
        accessPlatformId: '',
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },

    components: {
      addOrUpdate
    },
    provide () {
      return {
        reload: this.reload
      }
    },
    activated () {
      this.getDataList()
    },
    methods: {
      reload () {
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/account/fetchBankInfo'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'size': this.pageSize
          })
        }).then(({data}) => {
          if (data && data.code === 'ok') {
            this.dataList = data.data.resultList.content
            this.totalPage = data.data.resultList.total
            this.money = data.data.money
            if (this.dataList.length > 3) {
              this.$message.warning('一个人最多可以添加3张卡,您已超过')
            }
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        console.log(val)
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        console.log(val)
        this.getDataList()
      },
      // 新增 / 修改
      addOrUpdateHandle (row) {
        // eslint-disable-next-line no-redeclare
        if (this.dataList.length >= 3 && !row) {
          this.$message.warning('一个人最多可以添加3张卡,您不能再添加')
          this.addOrUpdateVisible = false
        } else {
          this.addOrUpdateVisible = true
          this.$nextTick(() => {
            this.$refs.addOrUpdate.init(row)
          })
        }
      },
      ext () {
        this.$router.push({ name: 'Balance-details' })
      },
      // 删除
      deleteHandle (id) {
        // eslint-disable-next-line no-unused-vars
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定删除银行卡吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/account/deleteBankInfo'),
            method: 'post',
            params: this.$http.adornParams({id: id})
          }).then(({data}) => {
            if (data && data.code === 'ok') {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.message)
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
<style scoped>
img{
  width: 100% !important;
}
.box{
  width: 100%;
  display: flex;
}
</style>