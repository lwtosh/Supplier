<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
      <div class="box">
        <el-form-item label="商品名称：" prop="name">
        <el-input v-model="brand.name"></el-input>
      </el-form-item>
      <el-form-item label="商品货号：">
        <el-input v-model="brand.firstLetter"></el-input>
      </el-form-item>
      </div>
      <div class="box">
        <el-form-item label="地标分类：" prop="logo" >
        <el-select
          v-model="brand.name"
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
        <el-select v-model="brand.name" @change="handleBrandChange"  class="input-width"  placeholder="请选择">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label"  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      </div>
      <p style="margin-left:50px">商品分类</p>
      <div class="box">
        
        <el-form-item label="一级分类：" prop="logo">
        <el-select v-model="brand.name"  class="input-width"  @change="handleBrandChange" placeholder="请选择">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label"  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类：" prop="logo">
        <el-select v-model="brand.name"  class="input-width"  @change="handleBrandChange" placeholder="请选择">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label"  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类：" prop="logo">
        <el-select v-model="brand.name"  class="input-width"  @change="handleBrandChange" placeholder="请选择">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label"  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      </div>
      <div class="box">
        <el-form-item label="请选择品牌：" prop="logo">
        <el-select v-model="brand.name"  class="input-width"  @change="handleBrandChange" placeholder="请选择">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label"  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="快递费：">
          <el-input v-model="brand.firstLetter"></el-input>
        </el-form-item>
      </div>
      
      <div class="box">
        <el-form-item label="市场价：">
          <el-input v-model="brand.firstLetter"></el-input>
        </el-form-item>
        <el-form-item label="销售价：">
          <el-input v-model="brand.firstLetter"></el-input>
        </el-form-item>
        <el-form-item label="供货价：">
          <el-input v-model="brand.firstLetter"></el-input>
        </el-form-item>
        
      </div>
      <div class="box">
        <el-form-item label="库存：">
          <el-input v-model="brand.firstLetter"></el-input>
        </el-form-item>
        <el-form-item label="" prop="logo">
        <el-select v-model="brand.name"  class="input-width"  @change="handleBrandChange" placeholder="单位">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label"  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品推荐值：">
          <el-input v-model="brand.firstLetter"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="商品介绍：">
          <el-input v-model="brand.firstLetter" type="textarea" :rows="4"></el-input>
        </el-form-item>
      <el-form-item label="缩略图：">
        <single-upload v-model="brand.bigPic"></single-upload>
      </el-form-item>
      <el-form-item label="商品图片：">
        <single-upload v-model="brand.bigPic"></single-upload>
      </el-form-item>
      <el-form-item label="商品详情图：">
        <single-upload v-model="brand.bigPic"></single-upload>
      </el-form-item>
      <div style="margin:auto">
        <el-form-item label-width="45%">
        <el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
       </el-form-item>
      </div>
      
    </el-form>
  </el-card>
</template>
<script>
  import {createBrand, getBrand, updateBrand} from '@/api/brand'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultBrand={
    bigPic: '',
    brandStory: '',
    factoryStatus: 0,
    firstLetter: '',
    logo: '',
    name: '',
    showStatus: 0,
    sort: 0
  };
  export default {
    name: 'BrandDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        brand:Object.assign({}, defaultBrand),
        rules: {
          name: [
            {required: true, message: '请输入品牌名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          logo: [
            {required: true, message: '请输入品牌logo', trigger: 'blur'}
          ],
          sort: [
            {type: 'number', message: '排序必须为数字'}
          ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        getBrand(this.$route.query.id).then(response => {
          this.brand = response.data;
        });
      }else{
        this.brand = Object.assign({},defaultBrand);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateBrand(this.$route.query.id, this.brand).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createBrand(this.brand).then(response => {
                  this.$refs[formName].resetFields();
                  this.brand = Object.assign({},defaultBrand);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });

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
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.brand = Object.assign({},defaultBrand);
      }
    }
  }
</script>
<style scoped>
.form-container {
    width: 1200px;
  }
  .box{
    display: flex;
  }
   .input-width {
    width: 203px;
  }
</style>


