<template>
  <el-dialog
    :title="dataForm.id ? '修改' : '新增'"
    :close-on-click-modal="false"
    :visible.sync="visible"
     @close="close"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px" @keyup.enter.native="dataFormSubmit()" >
      <el-form-item label="银行名称" prop="bankName"  style="width:224">
        <el-select v-model="dataForm.bankId" placeholder="银行名称" @change="selectWorkName">
           <el-option v-for='item in merchantList1' :key="item.id" :label="item.bankName" :value="item.id"></el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="账户名称" prop="accountName" >
        <el-input v-model="dataForm.accountName" placeholder="请输入账户名称" :maxlength="10" />
      </el-form-item>
      <el-form-item label="银行账号" prop="bankNo">
        <el-input v-model="dataForm.bankNo" placeholder="请输入银行账号" maxlength="20"/>
      </el-form-item>
      <div class="box">
        <el-form-item label="开户省份" prop="province"  style="width:224">
        <el-select v-model="dataForm.province" placeholder="开户省份" @change="handleChange">
           <el-option v-for='item in merchantList2' :key="item.id" :label="item.name" :value="item.id"></el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="开户地市" prop="city"  style="width:224">
        <el-select v-model="dataForm.city" placeholder="开户地市">
           <el-option v-for='item in merchantList3' :key="item.id" :label="item.name" :value="item.name"></el-option>
         </el-select>
      </el-form-item>
      </div>
      <el-form-item label="开户支行信息" prop="openingBank" style="width:100%;">
        <el-input v-model="dataForm.openingBank"  placeholder="开户支行信息" />
      </el-form-item>
      <el-form-item label="预留手机" prop="phone" >
        <el-input v-model="dataForm.phone"  placeholder="预留手机" :maxlength="11"/> 
      </el-form-item>
      <el-form-item label="是否默认" prop="defaultFlag" style="width:55%;">
        <el-switch v-model="dataForm.defaultFlag" :active-value="1"
    :inactive-value="-1" active-color="#13ce66" ></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    var validateMobile = (rule, value, callback) => {
      let reg1 = /^1[0-9]{10}$/
      if (reg1.test(value)) {
        callback()
      } else {
        callback(new Error('手机号为正整数且长度在11位'))
      }
    }
    var validateCard = (rule, value, callback) => {
      let reg = /^[0-9]{5,20}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('银行账户长度在5到20位之间'))
      }
    }
    return {
      visible: false,
      merchantList1: '',
      merchantList2: '',
      merchantList3: '',
      provincesId: '',
      dataForm: {
        id: '',
        bankName: '',
        accountName: '',
        phone: '',
        bankNo: '',
        province: '',
        openingBank: '',
        defaultFlag: '',
        bankId: '',
        city: ''
      },
      menulist: [],
      selectedWorkName: {},
      dataRule: {
        bankName: [
          {required: true, message: '必选', trigger: 'blur'}
        ],
        accountName: [
          { required: true, max: 30, message: '不能为空且长度在1到30位之间', trigger: 'blur' }
        ],
        bankNo: [
          { required: true, validator: validateCard, trigger: 'change' }
        ],
        province: [
          {required: true, message: '必选', trigger: 'blur'}
        ],
        city: [
          {required: true, message: '必选', trigger: 'blur'}
        ],
        defaultFlag: [
          {required: true, message: '必选', trigger: 'blur'}
        ],
        openingBank: [
          { required: true, max: 50, message: '不能为空且长度在1到50位之间', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  created () {
  },
  methods: {
    reload () {
      this.visible = false
      this.$emit('refreshDataList')
    },
    init (row) {
      this.visible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].resetFields()
      // })
      this.$http({
        url: this.$http.adornUrl('/account/getBank'),
        method: 'get'
      }).then(({data}) => {
        this.$set(this, 'merchantList1', data.data)
      })
      this.$http({
        url: this.$http.adornUrl('/account/getProvince'),
        method: 'get'
      }).then(({ data }) => {
        this.$set(this, 'merchantList2', data.data)
      })
      if (row) {
        this.$set(this, 'dataForm', row)
        this.dataForm.id = row.id
      }
    },
    handleChange (province) {
      var selectedWorkName = {}
      selectedWorkName = this.merchantList2.find((item) => { // 这里的chargingWorkNameList就是上面遍历的数据源
        return item.id === province
         // 筛选出匹配数据，是对应数据的整个对象
      })
      console.log(selectedWorkName)
      this.provincesId = selectedWorkName.id
      this.dataForm.province = selectedWorkName.name
      this.$http({
        url: this.$http.adornUrl('/account/getCity'),
        method: 'get',
        params: this.$http.adornParams({provinceId: this.provincesId})
      }).then(({ data }) => {
        this.$set(this, 'merchantList3', data.data)
      })
    },
    selectWorkName (bankId) {
      // eslint-disable-next-line no-unused-vars
      var selectedWorkName = {}
      selectedWorkName = this.merchantList1.find((item) => { // 这里的chargingWorkNameList就是上面遍历的数据源
        return item.id === bankId
         // 筛选出匹配数据，是对应数据的整个对象
      })
      this.dataForm.bankName = selectedWorkName.bankName
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/account/updateBankInfo?id=${this.dataForm.id ? '' + this.dataForm.id : ''}`),
            method: 'post',
            params: this.$http.adornParams(this.dataForm)
          }).then(({ data }) => {
            if (data && data.code === 'ok') {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                reload () {
                  this.visible = false
                  this.$emit('refreshDataList')
                },
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    },
    close () {
      this.$set(this, 'dataForm', {
        id: '',
        bankName: '',
        accountName: '',
        phone: '',
        bankNo: '',
        province: '',
        openingBank: '',
        defaultFlag: '',
        city: ''
      })
    }
  }
}
</script>

<style lang="scss">
.box{
  display: flex;
}
  .mod-menu {
    .menu-list__input,
    .icon-list__input {
       > .el-input__inner {
        cursor: pointer;
      }
    }
    &__icon-popover {
      width: 458px;
      overflow: hidden;
    }
    &__icon-inner {
      width: 478px;
      max-height: 258px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    &__icon-list {
      width: 458px;
      padding: 0;
      margin: -8px 0 0 -8px;
      > .el-button {
        padding: 8px;
        margin: 8px 0 0 8px;
        > span {
          display: inline-block;
          vertical-align: middle;
          width: 18px;
          height: 18px;
          font-size: 18px;
        }
      }
    }
    .icon-list__tips {
      font-size: 18px;
      text-align: center;
      color: #e6a23c;
      cursor: pointer;
    }
  }
</style>
