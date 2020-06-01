<template>
  <div style="margin-top: 30px">
    <el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px"  size="Base">
      <div class="box">
        <el-form-item label="商品名称：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="商品货号：">
        <el-input v-model="value.firstLetter"></el-input>
      </el-form-item>
      </div>
      <div class="box">
        <el-form-item label="地标分类：" prop="logo" >
        <el-select
          v-model="value.name"
          @change="handleBrandChange"
          placeholder="请选择"  class="input-width" >
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上架商城：" prop="logo">
        <el-select v-model="value.name" @change="handleBrandChange"  class="input-width"  placeholder="请选择">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label"  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      </div>
      <p style="margin-left:50px">商品分类</p>
      <div class="box">
        
        <el-form-item label="一级分类：" prop="logo">
        <el-select v-model="value.name"  class="input-width"  @change="handleBrandChange" placeholder="请选择">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label"  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类：" prop="logo">
        <el-select v-model="value.name"  class="input-width"  @change="handleBrandChange" placeholder="请选择">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label"  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类：" prop="logo">
        <el-select v-model="value.name"  class="input-width"  @change="handleBrandChange" placeholder="请选择">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label"  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      </div>
      <div class="box">
        <el-form-item label="请选择品牌：" prop="logo">
        <el-select v-model="value.name"  class="input-width"  @change="handleBrandChange" placeholder="请选择">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label"  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="快递费：">
          <el-input v-model="value.firstLetter"></el-input>
        </el-form-item>
      </div>
      
      <div class="box">
        <el-form-item label="市场价：">
          <el-input v-model="value.firstLetter"></el-input>
        </el-form-item>
        <el-form-item label="销售价：">
          <el-input v-model="value.firstLetter"></el-input>
        </el-form-item>
        <el-form-item label="供货价：">
          <el-input v-model="value.firstLetter"></el-input>
        </el-form-item>
        
      </div>
      <div class="box">
        <el-form-item label="库存：">
          <el-input v-model="value.firstLetter"></el-input>
        </el-form-item>
        <el-form-item label="" prop="logo">
        <el-select v-model="value.name"  class="input-width"  @change="handleBrandChange" placeholder="单位">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label"  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品推荐值：">
          <el-input v-model="value.firstLetter"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="商品介绍：">
          <el-input v-model="value.firstLetter" type="textarea" :rows="4"></el-input>
        </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {fetchListWithChildren} from '@/api/productCate'
  import {fetchList as fetchBrandList} from '@/api/brand'
  import {getProduct} from '@/api/product';

  export default {
    name: "ProductInfoDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        hasEditCreated:false,
        //选中商品分类的值
        selectProductCateValue: [],
        productCateOptions: [],
        brandOptions: [],
        rules: {
          name: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          subTitle: [{required: true, message: '请输入商品副标题', trigger: 'blur'}],
          productCategoryId: [{required: true, message: '请选择商品分类', trigger: 'blur'}],
          brandId: [{required: true, message: '请选择商品品牌', trigger: 'blur'}],
          description: [{required: true, message: '请输入商品介绍', trigger: 'blur'}],
          requiredProp: [{required: true, message: '该项为必填项', trigger: 'blur'}]
        }
      };
    },
    created() {
      this.getProductCateList();
      this.getBrandList();
    },
    computed:{
      //商品的编号
      productId(){
        return this.value.id;
      }
    },
    watch: {
      productId:function(newValue){
        if(!this.isEdit)return;
        if(this.hasEditCreated)return;
        if(newValue===undefined||newValue==null||newValue===0)return;
        this.handleEditCreated();
      },
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length === 2) {
          this.value.productCategoryId = newValue[1];
          this.value.productCategoryName= this.getCateNameById(this.value.productCategoryId);
        } else {
          this.value.productCategoryId = null;
          this.value.productCategoryName=null;
        }
      }
    },
    methods: {
      //处理编辑逻辑
      handleEditCreated(){
        if(this.value.productCategoryId!=null){
          this.selectProductCateValue.push(this.value.cateParentId);
          this.selectProductCateValue.push(this.value.productCategoryId);
        }
        this.hasEditCreated=true;
      },
      getProductCateList() {
        fetchListWithChildren().then(response => {
          let list = response.data;
          this.productCateOptions = [];
          for (let i = 0; i < list.length; i++) {
            let children = [];
            if (list[i].children != null && list[i].children.length > 0) {
              for (let j = 0; j < list[i].children.length; j++) {
                children.push({label: list[i].children[j].name, value: list[i].children[j].id});
              }
            }
            this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
          }
        });
      },
      getBrandList() {
        fetchBrandList({pageNum: 1, pageSize: 100}).then(response => {
          this.brandOptions = [];
          let brandList = response.data.list;
          for (let i = 0; i < brandList.length; i++) {
            this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
          }
        });
      },
      getCateNameById(id){
        let name=null;
        for(let i=0;i<this.productCateOptions.length;i++){
          for(let j=0;i<this.productCateOptions[i].children.length;j++){
            if(this.productCateOptions[i].children[j].value===id){
              name=this.productCateOptions[i].children[j].label;
              return name;
            }
          }
        }
        return name;
      },
      handleNext(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('nextStep');
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      handleBrandChange(val) {
        let brandName = '';
        for (let i = 0; i < this.brandOptions.length; i++) {
          if (this.brandOptions[i].value === val) {
            brandName = this.brandOptions[i].label;
            break;
          }
        }
        this.value.brandName = brandName;
      }
    }
  }
</script>

<style scoped>
.form-container {
    width: 1200px;
  }
    .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 1px;
}
.el-tabs__item {
  padding: 0 157px;;
}
  .box{
    display: flex;
  }
   .input-width {
    width: 203px;
  }
</style>
