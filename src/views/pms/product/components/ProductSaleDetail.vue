<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productSaleForm" :rules="rules" label-width="120px" style="width: 600px" size="Base">
     <el-form-item label="缩略图：" prop="url">
        <el-upload
         action="#"
         list-type="picture-card"
         :auto-upload="false">
           <i slot="default" class="el-icon-plus"></i>
           <div slot="file" slot-scope="{file}">
           <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
           <span class="el-upload-list__item-actions">
              <span  class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
               <i class="el-icon-zoom-in"></i>
            </span>
           <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
              <i class="el-icon-download"></i>
           </span>
           <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
           </span>
           </span>
           </div>
         </el-upload>
      </el-form-item>
      <el-form-item label="商品图：" prop="url2">
        <el-upload
         action="#"
         list-type="picture-card"
         :auto-upload="false">
           <i slot="default" class="el-icon-plus"></i>
           <div slot="file" slot-scope="{file}">
           <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
           <span class="el-upload-list__item-actions">
              <span  class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
               <i class="el-icon-zoom-in"></i>
            </span>
           <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
              <i class="el-icon-download"></i>
           </span>
           <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
           </span>
           </span>
           </div>
         </el-upload>
      </el-form-item>
      <el-form-item label="商品详情图：" prop="url3">
        <el-upload
         action="#"
         list-type="picture-card"
         :auto-upload="false">
           <i slot="default" class="el-icon-plus"></i>
           <div slot="file" slot-scope="{file}">
           <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
           <span class="el-upload-list__item-actions">
              <span  class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
               <i class="el-icon-zoom-in"></i>
            </span>
           <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
              <i class="el-icon-download"></i>
           </span>
           <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
           </span>
           </span>
           </div>
         </el-upload>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
  </div>
</template>

<script>
  import {fetchList as fetchMemberLevelList} from '@/api/memberLevel'

  export default {
    name: "ProductSaleDetail",
    props: {
      value: Object,
       dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        //日期选择器配置
        rules: {
          url: [{required: true, message: '请输入商品副标题', trigger: 'blur'}],
          url2: [{required: true, message: '请选择商品分类', trigger: 'blur'}],
          url3: [{required: true, message: '请选择商品品牌', trigger: 'blur'}],
        }
      }
    },
    created() {
      if (this.isEdit) {
        // this.handleEditCreated();
      } else {
        fetchMemberLevelList({defaultStatus: 0}).then(response => {
          let memberPriceList = [];
          for (let i = 0; i < response.data.length; i++) {
            let item = response.data[i];
            memberPriceList.push({memberLevelId: item.id, memberLevelName: item.name})
          }
          this.value.memberPriceList = memberPriceList;
        });
      }
    },
    computed: {
      //选中的服务保证
      selectServiceList: {
        get() {
          let list = [];
          if (this.value.serviceIds === undefined || this.value.serviceIds == null || this.value.serviceIds === '') return list;
          let ids = this.value.serviceIds.split(',');
          for (let i = 0; i < ids.length; i++) {
            list.push(Number(ids[i]));
          }
          return list;
        },
        set(newValue) {
          let serviceIds = '';
          if (newValue != null && newValue.length > 0) {
            for (let i = 0; i < newValue.length; i++) {
              serviceIds += newValue[i] + ',';
            }
            if (serviceIds.endsWith(',')) {
              serviceIds = serviceIds.substr(0, serviceIds.length - 1)
            }
            this.value.serviceIds = serviceIds;
          } else {
            this.value.serviceIds = null;
          }
        }
      }
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
      handlePrev() {
        this.$emit('prevStep')
      },
      handleNext() {
        this.$emit('nextStep')
      }
    }
  }
</script>

<style scoped>
.form-container {
    width: 1200px;
  }
  .littleMargin {
    margin-top: 10px;
  }
    .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 1px;
}
.el-tabs__item {
  padding: 0 157px;;
}
</style>
