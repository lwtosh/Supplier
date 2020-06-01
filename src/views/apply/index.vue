<template> 
  <el-card class="form-container">
    <div class="title" style="font-size: 22px ;">在线入驻流程</div>
    <el-steps :active="active" finish-status="success" simple align-center>
      <el-step title="阅读规则并同意"></el-step>
      <el-step icon="el-icon-edit" title="填写信息及资料"></el-step>
      <el-step title="审核结果"></el-step>
    </el-steps>
    <product-info-detail
      v-show="showStatus[0]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep">
    </product-info-detail>
    <product-sale-detail
      v-show="showStatus[1]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      @prevStep="prevStep">
    </product-sale-detail>
    <product-attr-detail
      v-show="showStatus[2]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      @prevStep="prevStep"
      @finishCommit="finishCommit">
    </product-attr-detail>
  </el-card>
</template>
<script>
  import ProductInfoDetail from './one';
  import ProductSaleDetail from './two';
  import ProductAttrDetail from './three';
  import {createProduct,getProduct,updateProduct} from '@/api/product';

  const defaultProductParam = {
    albumPics: '',
    brandId: null,
    brandName: '',
    deleteStatus: '',
    description: '',
    detailDesc: '',
    detailHtml: '',
    detailMobileHtml: '',
    detailTitle: '',
    feightTemplateId: '',
    flashPromotionCount: '',
    flashPromotionId: '',
    flashPromotionPrice: '',
    flashPromotionSort: '',
    giftPoint: '',
    giftGrowth: '',
    keywords: '',
    lowStock: '',
    name: '',
    send:'',
    newStatus: '',
    note: '',
    originalPrice: '',
    pic: '',
    //会员价格{memberLevelId: 0,memberPrice: 0,memberLevelName: null}
    memberPriceList: [],
    //商品满减
    productFullReductionList: [{fullPrice: 0, reducePrice: 0}],
    //商品阶梯价格
    productLadderList: [{count: 0,discount: 0,price: 0}],
    previewStatus: '',
    price: '',
    productAttributeCategoryId: null,
    //商品属性相关{productAttributeId: 0, value: ''}
    productAttributeValueList: [],
    //商品sku库存信息{lowStock: 0, pic: '', price: 0, sale: 0, skuCode: '', sp1: '', sp2: '', sp3: '', stock: 0}
    skuStockList: [],
    //商品相关专题{subjectId: 0}
    subjectProductRelationList: [],
    //商品相关优选{prefrenceAreaId: 0}
    prefrenceAreaProductRelationList: [],
    productCategoryId: null,
    productCategoryName: '',
    productSn: '',
    promotionEndTime: '',
    promotionPerLimit: '',
    promotionPrice: null,
    promotionStartTime: '',
    promotionType: '',
    publishStatus: '',
    recommandStatus: '',
    sale: '',
    serviceIds: '',
    sort: '',
    stock: '',
    subTitle: '',
    unit: '',
    usePointLimit: '',
    verifyStatus: '',
    weight: ''
  };
  export default {
    name: 'ProductDetail',
    components: {ProductInfoDetail, ProductSaleDetail, ProductAttrDetail},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: 0,
        productParam: Object.assign({}, defaultProductParam),
        showStatus: [true, false, false, false]
      }
    },
    created(){
      if(this.isEdit){
        getProduct(this.$route.query.id).then(response=>{
          this.productParam=response.data;
        });
      }
    },
    methods: {
      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },
      prevStep() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      nextStep() {
        if (this.active < this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      finishCommit(isEdit) {
        this.$confirm('是否要提交该产品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(isEdit){
            updateProduct(this.$route.query.id,this.productParam).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              this.$router.back();
            });
          }else{
            createProduct(this.productParam).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              location.reload();
            });
          }
        })
      }
    }
  }
</script>
<style>
  .form-container {
    width: 1300px;
  }
  .el-card{
    overflow:initial;
    border: none;
  }
  .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 0p;
}
p{
  font-size: 15px;
}
.title{
  
  font-weight: 700;
  color: #ec0e0e;
  margin-top: -20px;
  margin-bottom: 20px;
}
</style>


