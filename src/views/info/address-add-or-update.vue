<template>
  <el-dialog
    :title="dataForm.id ? '修改退货地址' : '新增退货地址'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="close"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="120px"
    >
      <el-form-item
        label="收货人："
        prop="userName"
      >
        <el-input
          v-model="dataForm.userName"
          placeholder="请填写申请人姓名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机号码："
        prop="telphone">
        <el-input
          v-model="dataForm.telphone"
          placeholder="请填写申请人移动电话（此号码是登录名）"
        ></el-input>
      </el-form-item>
      <div class="box">
         <el-form-item
        label="省份："
        prop="province"
        style="width:50%;">
      <el-select @change="handleChange" v-model="dataForm.province" class="input-width" placeholder="请选择省" clearable>
        <el-option v-for="item in dataList3" 
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
      </el-select>
      </el-form-item>
      <el-form-item
        label="市区"
        prop="urban"
        >
        <el-select v-model="dataForm.urban" class="input-width" placeholder="请选择市" clearable>
        <el-option v-for="item in dataList4" 
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
      </el-select>
      </el-form-item>
      </div>
      <el-form-item
        label="详细地址："
        prop="userCode"
      >
        <el-input
          v-model="dataForm.userCode"
          type="password"
          placeholder="请输入详细地址"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="邮政编码："
        prop="userCode"
      >
        <el-input
          v-model="dataForm.userCode"
          type="password"
          placeholder="请输入邮政编码"
        ></el-input>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="visible = false">取消</el-button>
      <el-button
        type="primary"
        @click="dataFormSubmit()"
      >确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { isMobile } from '@/utils/validate'
export default {
  data () {
    var validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      roleList: [],
      dataList3:[],
      dataList4:[],
      dataForm: {
        id: '',
        userName: '',
        userCode: '',
        telphone: ''
      },
      dataRule: {
        userName: [
           { required: true, message: '用户类型不能为空', trigger: 'blur' }
        ],
        telphone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        userCode: [
          { required: true, message: '登录账户不能为空', trigger: '' }
        ]
      }
    }
  },
  methods: {
    init (id) {
      this.dataForm.id = id || ''
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
      this.$http({
        url: this.$http.adornUrl('/m/roleAll'),
        method: 'get'
      }).then(({ data }) => {
        this.$set(this, 'roleList', data.res.data)
      })
      if (id) {
        this.$http({
          url: this.$http.adornUrl('/m/user/' + id),
          method: 'get'
        }).then(res => {
          this.$set(this, 'dataForm', res.data.res.data)
          if (!res.data.res.data.ids) {
            this.$set(this.dataForm, 'ids', [])
          }
        })
      }
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/m/user/change${this.dataForm.id ? '/' + this.dataForm.id : ''}`),
            method: this.dataForm.id ? 'put' : 'post',
            data: JSON.stringify(this.dataForm)
          }).then(({ data }) => {
            if (data && data.code === '200') {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 500,
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
        userName: '',
        ids: [],
        userPwd: '',
        oldPwd: '',
        salt: '',
        email: '',
        telphone: '',
        userCode: '',
        userType: ''
      })
    }
  }
}
</script>
<style>
.box{
  display: flex;
}
</style>
