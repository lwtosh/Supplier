<template>
  <div class="app-container">
    <el-form :inline="true" :model="dataForm" ref="dataForm" @keyup.enter.native="getDataList()" label-width="80px">
      <el-form-item label-width="120px" label="可提现金额">
        {{this.dataForm.cashMoney}}
      </el-form-item>
      <br>
         <el-form-item label="选择银行卡" prop="bankId" label-width="120px" :rules="[
      { required: true, message: '必选'},
    ]">
         <el-select v-model="dataForm.bankId" placeholder="选择银行卡" @change="selectWorkName">
           <el-option v-for='item in merchantList1' :key="item.id" :label="item.bankName" :value="item.id"></el-option>
         </el-select>
        </el-form-item>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      border
      :data="dataList"
      style="width: 100%;"
    >
      <el-table-column
        prop="bankName"
        header-align="center"
        align="center"
        width="150"
        label="银行名称">
        {{this.dataForm.bankName}}
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="150"
        prop="accountName"
        label="账户名称"
      >
      {{this.dataForm.accountName}}
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="120"
        label="银行账号"
        prop="bankNo"
      >
      {{this.dataForm.bankNo}}
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="120"
        label="开户省份"
        prop="province"
      >
      {{this.dataForm.province}}
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        max-width="150"
        prop="city"
        label="开户地市"
      >
      {{this.dataForm.city}}
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        max-width="120"
        prop="openingBank"
        label="开户支行信息"
       >
       {{this.dataForm.openingBank}}
      </el-table-column>
    </el-table>
    <br>
    <br>
    <hr>
    <br>
    <br>
    <el-form :model="dataForm" ref="dataForm" :rules="dataRule" @keyup.enter.native="getDataList()" label-width="120px">
    <el-form-item label="提现金额" prop="money" >
        <el-input v-model="dataForm.money"  placeholder="提现金额" @keyup.native="proving1" clearable style="width:50%"/>
      </el-form-item>
    <el-form-item label="手续费">
        {{dataForm.money ?  commission.toFixed(2) : ' '}}  &nbsp; &nbsp; &nbsp;
        <span style="color:#666" >(基础手续费{{this.base}}元每笔+提现金额的{{this.commissionRate * 100}}%)</span>
      </el-form-item>
    <el-form-item label="实际到账">
        {{ dataForm.money ? (receipts.toFixed(2)) - this.base : ' '}}
      </el-form-item>
      <div class="center">
          <el-button type="primary" @click="dataFormSubmit()" :disabled="hide" >提交</el-button>
      </div>
      
    </el-form>
  </div>
  <!-- <div v-else>您的提交正在审核，可以在提现明细中查看结果！</div> -->
</template>

<script>
// import Vue from 'vue'
export default {
  data () {
    var validateMobile = (rule, value, callback) => {
      let reg1 = /^[0-9]{1,10}$/
      if (value > this.commission && value < this.dataForm.cashMoney && reg1.test(value)) {
        callback()
      } else {
        callback(new Error('提现金额为整数大于实际到账，小于可提现余额'))
      }
    }
    return {
      dataForm: {
        money: '',
        cashMoney: '',
        accountName: '',
        accountNo: '',
        bankId: '',
        bankName: '',
        commission: '',
        receipts: ''
      },
      dataList: [],
      hide: false,
      base: '',
      start: '',
      maxMoney: '',
      minMoney: '',
      commissionRate: '',
      merchantList1: [],
      defaultFlag: '',
      dataListLoading: false,
      dataRule: {
        money: [
          { required: true, validator: validateMobile, trigger: 'change' }
        ]
      }
    }
  },
  activated () {
    this.getDataList()
  },
  computed: {
    commission () {
      return ((this.dataForm.money - this.start) * this.commissionRate) + this.base
    },
    receipts () {
      return this.dataForm.money * (1 - this.commissionRate)
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    proving1 () {
      // eslint-disable-next-line no-useless-escape
      this.dataForm.money = this.dataForm.money.replace(/[^\.\d]/g, '')
      this.dataForm.money = this.dataForm.money.replace('.', '')
      this.hide = false
    },
    // 获取数据列表
    getDataList () {
      // this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/account/getWithdrawNeeded'),
        method: 'get'
      }).then(({data}) => {
        this.dataForm.cashMoney = data.data.cashMoney
        this.commissionRate = data.data.commission / 10000
        this.base = data.data.base
        this.start = data.data.start
        this.maxMoney = data.data.maxMoney
        this.minMoney = data.data.minMoney
      })
      this.$http({
        url: this.$http.adornUrl('/account/fetchBankInfo'),
        method: 'get'
      }).then(({data}) => {
        this.$set(this, 'merchantList1', data.data.resultList.content)
        for (var i = 0; i < this.merchantList1.length; i++) {
          if (this.merchantList1[i].defaultFlag === 1) {
            this.dataForm.bankId = this.merchantList1[i].bankName
            this.bankId = this.merchantList1[i].bankId
            this.id = this.merchantList1[i].id
            this.dataForm.accountName = this.merchantList1[i].accountName
            this.dataForm.accountNo = this.merchantList1[i].bankNo
            this.dataForm.bankName = this.merchantList1[i].bankName
            this.dataList = [this.merchantList1[i]]
          }
        }
      })
    },

    // 提交
    dataFormSubmit () {
      if (this.dataForm.bankId === '') {
        this.$message.error('请选择银行卡')
      } else if (this.dataForm.money < this.minMoney) {
        this.hide = true
        this.$message.error('提现金额需大于' + this.minMoney)
      } else if (this.dataForm.money > this.dataForm.cashMoney) {
        this.hide = true
        this.$message.error('余额不足')
      } else if (this.dataForm.money > this.maxMoney) {
        this.hide = true
        this.$message.error('提现金额需小于' + this.maxMoney)
      } else {
        this.$http({
          url: this.$http.adornUrl('/account/withdraw'),
          method: 'post',
          params: this.$http.adornParams({
            accountName: this.dataForm.accountName,
            accountNo: this.dataForm.accountNo,
            bankId: this.bankId,
            id: this.id,
            money: this.dataForm.money,
            bankName: this.dataForm.bankName
          })
        }).then(({ data }) => {
          if (data && data.code === 'ok') {
            this.$message({
              message: '您的提交正在审核，可以在提现明细中查看结果',
              type: 'error',
              duration: 1500,
              onClose: () => {
                this.dataList = []
                this.dataForm.bankId = ''
                this.$refs.dataForm.resetFields()
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.message)
            this.hide = true
          }
        })
      }
    },
    // 获取表格信息
    selectWorkName (id) {
      // eslint-disable-next-line no-unused-vars
      var selectedWorkName = {}
      selectedWorkName = this.merchantList1.find((item) => { // 这里的chargingWorkNameList就是上面遍历的数据源
        return item.id === id
         // 筛选出匹配数据，是对应数据的整个对象
      })
      this.dataList = [selectedWorkName]
      this.dataForm.accountName = selectedWorkName.accountName
      this.dataForm.bankName = selectedWorkName.bankName
      this.id = selectedWorkName.id
      this.bankId = selectedWorkName.bankId
      this.dataForm.accountNo = selectedWorkName.bankNo
    }
  }
}
</script>
<style scoped>
.center{
  margin-left: 200px;
}
</style>
