<template> 
  <div class="app-container">
    <el-card class="filter-container" style="padding-bottom: 0;" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="medium">
          下载明细
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          type="primary"
          @click="handleSearchList()"
          size="medium">
          查询
        </el-button>
        <el-button
          style="float:right;"
          @click="handleResetSearch()"
          size="medium">
          重置
        </el-button>
        
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="Base" label-width="140px">
          
          <el-form-item label="审批状态：" style="margin-bottom:10px">
            <el-select v-model="listQuery.status" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付状态：" style="margin-bottom:10px">
            <el-select v-model="listQuery.status" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间：" style="margin-bottom:10px">
            <el-date-picker
              v-model="time"
              type="daterange"
              minView="month"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item ><br>
          <el-form-item label="账户余额：" style="margin-bottom:0px">
            <!-- {{}} -->
          </el-form-item> <p style="font-size:14px;margin-left:60px;color:#606266; display: inline-block;margin-bottom:0px">总提现4笔，总金额1000元，未审核1000元，审核成功0元，审核失败0元，支付成功0元，支付中0元</p>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="returnApplyTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
        <el-table-column label="提现流水号" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="商家" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="提现申请金额" min-width="160" align="center">
          <template slot-scope="scope">{{scope.row.memberUsername}}</template>
        </el-table-column>
        <el-table-column label="提现手续费" min-width="160" align="center">
          <template slot-scope="scope">￥{{scope.row | formatReturnAmount}}</template>
        </el-table-column>
        <el-table-column label="实际到账金额" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="审批状态" min-width="140" align="center">
          <template slot-scope="scope">{{scope.row.handleTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="支付状态" min-width="140" align="center">
          <template slot-scope="scope">{{scope.row.handleTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="支付流水号" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.handleTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="银行名称" min-width="160" align="center">
          <template slot-scope="scope">{{scope.row.handleTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="账户名称" min-width="160" align="center">
          <template slot-scope="scope">{{scope.row.handleTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="银行账号" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.handleTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="申请日期" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.handleTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="审批日期" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.handleTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="支付日期" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.handleTime | formatTime}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container" style="margin-bottom:25px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {fetchList,deleteApply} from '@/api/returnApply';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    receiverKeyword: null,
    status: null,
    createTime: null,
    handleMan: null,
    handleTime: null
  };
  const defaultStatusOptions=[
    {
      label: '待处理',
      value: 0
    },
    {
      label: '退货中',
      value: 1
    },
    {
      label: '已完成',
      value: 2
    },
    {
      label: '已拒绝',
      value: 3
    }
  ];
  export default {
    name:'returnApplyList',
    data() {
      return {
        listQuery:Object.assign({},defaultListQuery),
        statusOptions: Object.assign({},defaultStatusOptions),
        list:null,
        total:null,
        listLoading:false,
        multipleSelection:[],
        operateType:1,
        operateOptions: [
          {
            label: "批量删除",
            value: 1
          }
        ],
        pickerOptions: {
        onPick (time) {
                  // 如果选择了只选择了一个时间
          if (!time.maxDate) {
            let timeRange = 6 * 24 * 60 * 60 * 1000 // 6天
            _minTime = time.minDate.getTime() - timeRange // 最小时间
            _maxTime = time.minDate.getTime() + timeRange // 最大时间
                     // 如果选了两个时间，那就清空本次范围判断数据，以备重选
          } else {
            _minTime = _maxTime = null
          }
        },
        disabledDate (time) {
             // onPick后触发
             // 该方法会轮询当3个月内的每一个日期，返回false表示该日期禁选
          if (_minTime && _maxTime) {
            return time.getTime() < _minTime || time.getTime() > _maxTime
          }
        }
      }
      }
    },
    created(){
      this.getList();
    },
    filters:{
      formatTime(time) {
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatStatus(status){
        for(let i=0;i<defaultStatusOptions.length;i++){
          if(status===defaultStatusOptions[i].value){
            return defaultStatusOptions[i].label;
          }
        }
      },
      formatReturnAmount(row){
        return row.productRealPrice*row.productCount;
      }
    },
    methods:{
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleViewDetail(index,row){
        this.$router.push({path:'/oms/returnApplyDetail',query:{id:row.id}})
      },
      handleBatchOperate(){
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要操作的申请',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        if(this.operateType===1){
          //批量删除
          this.$confirm('是否要进行删除操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = new URLSearchParams();
            let ids=[];
            for(let i=0;i<this.multipleSelection.length;i++){
              ids.push(this.multipleSelection[i].id);
            }
            params.append("ids",ids);
            deleteApply(params).then(response=>{
              this.getList();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });
          })
        }
      },
      handleSizeChange(val){
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.getList();
      },
      getList(){
        this.listLoading=true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
   
  }
</style>


