<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productAttrForm"  label-width="200px" style="width:800px;margin-left:50px;" size="Base">
      <div class="title">公司信息</div><br>
      <el-form-item label="公司名称：">
        {{value.originalPrice}}
      </el-form-item>
      <div class="box">
      <el-form-item label="法人代表：">
         {{value.originalPrice}}
      </el-form-item>
        <el-form-item label="法人身份证：">
           {{value.originalPrice}}
        </el-form-item>
      </div>
      <el-form-item label="统一社会信用代码：">
         {{value.originalPrice}}
      </el-form-item>
        <el-form-item label="公司地址：">
         {{value.originalPrice}}
      </el-form-item>
      <el-form-item label="公司邮编：">
         {{value.originalPrice}}
      </el-form-item>
        <el-form-item label="公司网站（选填）：">
          {{value.originalPrice}}
      </el-form-item> 
      <el-form-item label="经营范围 ：">
          {{value.originalPrice}}
      </el-form-item><br><br>
      <div class="title">资质信息</div><br>
      <el-form-item label="营业执照：" prop="url2">
        <img src="" alt="">
      </el-form-item>
      <el-form-item label="开户许可证：" prop="url2">
        <img src="" alt="">
      </el-form-item>
      <el-form-item label="商品图片：" prop="url2">
        <img src="" alt="">
      </el-form-item>
      <el-form-item label="资质许可证：" prop="url2">
        <img src="" alt="">
      </el-form-item><br><br>
      <div class="title">财务信息（请填写对公账户）</div><br>
      <div class="box">
      <el-form-item label="账户名称：">
         {{value.originalPrice}}
      </el-form-item>
      <el-form-item label="账号：">
         {{value.originalPrice}}
      </el-form-item>
      </div>
        <el-form-item label="开户行：">
         {{value.originalPrice}}
      </el-form-item>
      
      <el-form-item label="开户行省份：">
         {{value.originalPrice}}
      </el-form-item>
        <el-form-item label="开户行地市：">
         {{value.originalPrice}}
      </el-form-item>
      <el-form-item label="开户行号：">
         {{value.originalPrice}}
      </el-form-item>
        <el-form-item label="银行预留手机：">
        {{value.originalPrice}}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import MultiUpload from '@/components/Upload/multiUpload'
  export default {
    name: "ProductAttrDetail",
    data() {
      return {
        value:{
           originalPrice:''
        },
        //编辑模式时是否初始化成功
        hasEditCreated:false,
      }
    },
    computed: {
    },
    created() {
    },
    methods: {
       handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
    }
  }
</script>

<style>
  .littleMarginLeft {
    margin-left: 10px;
  }

  .littleMarginTop {
    margin-top: 10px;
  }

  .paramInput {
    width: 250px;
  }

  .paramInputLabel {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 10px
  }

  .cardBg {
    background: #F8F9FC;
   
  }
  .box{
    display: flex;
  }
  .title{
    color: #ec0e0e;
    font-size: 18px;
    font-weight: 600;
  }
  .red{
    color: #ec0e0e;
    font-size: 14px;
  }
</style>
