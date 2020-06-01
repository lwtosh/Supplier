<template>
  <div style="margin-top: 50px">
   
       <el-card class="operate-container" shadow="never">
         <div> 
           <p>1：处于【待审核】状态，你可对本次已提交信息进行修改。</p>
           <p>2：初审1-2个工作日，重审3-5个工作日</p>
         </div>
       </el-card><br>
       <div>供应商信息<el-button size="primary"  style="margin-left:50px;" @click="handlePrev">修改</el-button></div> 
       <el-card class="operate-container" shadow="never">
          <el-form :model="value" ref="productAttrForm" label-width="120px" style="width: 720px" size="small">
            <el-form-item label="入驻编号：">
                {{value.stock}}
           </el-form-item>
           <el-form-item label="公司名称：">
               {{value.stock}}
           </el-form-item>
           <el-form-item label="营业执照：">
                {{value.stock}}
           </el-form-item>
           <el-form-item label="公司账号：">
                {{value.stock}}
           </el-form-item>
           <el-form-item label="开户银行：">
                {{value.stock}}
           </el-form-item>
          </el-form>
       </el-card>
       <p>入驻状态</p>
       <el-card class="operate-container" shadow="never">
          <el-form :model="value" ref="productAttrForm" label-width="120px" style="width: 720px" size="small">
            <el-form-item label="状态：">
                {{value.stock}}
           </el-form-item>
          </el-form>
       </el-card>
  </div>
</template>

<script>
  import {fetchList as fetchProductAttrCateList} from '@/api/productAttrCate'
  import {fetchList as fetchProductAttrList} from '@/api/productAttr'

  export default {
    name: "ProductAttrDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      }
    },
    created() {
      this.getProductAttrCateList();
    },
    methods: {
      handlePrev() {
        this.$emit('prevStep')
      },
      handleNext() {
        this.$emit('nextStep')
      }
    }
  }
</script>

<style>
.el-card{
  border:1px solid #ebeef5;
}
</style>
