<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productAttrForm"  label-width="140px" style="width:800px;margin-left:50px;" size="Base">
      <div class="title">公司信息</div>
      <el-form-item label="公司名称：">
        <el-input v-model="value.originalPrice" placeholder="请填写公司名称"></el-input>
      </el-form-item>
      <div class="box">
      <el-form-item label="法人代表：">
        <el-input v-model="value.stock" placeholder="请填写法人代表"></el-input>
      </el-form-item>
        <el-form-item label="法人身份证：">
        <el-input v-model="value.stock" placeholder="请填写法人身份证信息"></el-input>
      </el-form-item>
      </div>
      <el-form-item label="统一社会信用代码：">
        <el-input v-model="value.stock" placeholder="统一社会信用代码（或税号或者营业执照编号）"></el-input>
      </el-form-item>
        <el-form-item label="公司地址：">
        <el-input v-model="value.stock" placeholder="请填写公司办公地址"></el-input>
      </el-form-item>
      <el-form-item label="公司邮编：">
        <el-input v-model="value.stock" placeholder="请填写公司邮编"></el-input>
      </el-form-item>
        <el-form-item label="公司网站（选填）：">
        <el-input v-model="value.stock" placeholder="请填写公司网站地址"></el-input>
      </el-form-item> 
      <el-form-item label="经营范围 ：">
        <el-input v-model="value.stock" type="textarea"  maxlength="500" :autosize="{ minRows: 2, maxRows: 6}" placeholder="请填写经营范围"></el-input>
      </el-form-item><br><br>
      <div class="title">资质信息</div>
      <p class="red">请确保图片清晰，文字可辨并有清晰的红色公章；附件文件名请勿包含！@#（）等特殊字符。 <br> 建议使用Chrome/FireFox等主流浏览器上传</p>
      <el-form-item label="营业执照:" prop="url2">
        <el-upload
         action="#"
         list-type="picture-card"
         :auto-upload="false">
           <i slot="default" class="el-icon-plus"></i>
           <div slot="file" slot-scope="{file}">
           <img class="el-upload-list__item-thumbnail" :src="file.url" alt="（必选：复印件加盖公章）">
           
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
       （必选：复印件加盖公章）
      </el-form-item>
      <el-form-item label="开户许可证：" prop="url2">
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
           
         </el-upload>（必传：复印件加盖公章）
      </el-form-item>
      <el-form-item label="商品图片：" prop="url2">
        <el-upload
         action="#"
         multiple
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
           
         </el-upload>（必传：可上传多张）
      </el-form-item>
      <el-form-item label="资质许可证：" prop="url2">
        <el-upload
         action="#"
         multiple
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
           
         </el-upload>（可选：可上传多张，含特征许可、授权证书、委托加工协议、报关文件等）
      </el-form-item><br><br>
      <div class="title">财务信息（请填写对公账户）</div>
      <el-form-item label="账户名称：">
        <el-input v-model="value.originalPrice" placeholder="请填写账户名称"></el-input>
      </el-form-item>
      <div class="box">
      <el-form-item label="账号：">
        <el-input v-model="value.stock" placeholder="请填写账号"></el-input>
      </el-form-item>
        <el-form-item label="开户行：">
        <el-input v-model="value.stock" placeholder="请填写开户行信息"></el-input>
      </el-form-item>
      </div>
      <el-form-item label="开户行省份：">
        <el-input v-model="value.stock" placeholder="请填写开户行省份信息"></el-input>
      </el-form-item>
        <el-form-item label="开户行地市：">
        <el-input v-model="value.stock" placeholder="请填写开户行地市"></el-input>
      </el-form-item>
      <el-form-item label="开户行号：">
        <el-input v-model="value.stock" placeholder="请填写开户行号"></el-input>
      </el-form-item>
        <el-form-item label="银行预留手机：">
        <el-input v-model="value.stock" placeholder="请填写银行预留手机"></el-input>
      </el-form-item>
      <div class="box">
          <el-form-item label="财务手机：">
             <el-input v-model="value.stock" placeholder="请填写财务手机"></el-input>
          </el-form-item>
           <el-form-item prop="send">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-input v-model="value.send" placeholder="短信验证码">
                  </el-input>
                </el-col>
                <el-col :span="10" class="login-captcha">
                  <el-button type="primary"  @click="getSend" round>{{verifyCodeNotes}}</el-button>
                </el-col>
              </el-row>
            </el-form-item>
      </div>
      <p style="margin-left:50px;margin-top:-10px;font-size:14px; margin-bottom: 30px;">**财务手机号码，作为以后提现验证号码，修改、添加银行卡信息**</p>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步</el-button>
        <el-button type="primary" size="medium" @click="handleNext">保存提交，下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {fetchList as fetchProductAttrCateList} from '@/api/productAttrCate'
  import {fetchList as fetchProductAttrList} from '@/api/productAttr'

  export default {
    name: "ProductAttrDetail",
    props: {
      value: Object,
    },
    data() {
      return {
         verifyCodeNotes: '获取验证码',
        flag: true,
        phoneOK: false,
        //编辑模式时是否初始化成功
        hasEditCreated:false,
        //商品属性分类下拉选项
        productAttributeCategoryOptions: [],
        //选中的商品属性
        selectProductAttr: [],
        //选中的商品参数
        selectProductParam: [],
        //选中的商品属性图片
        selectProductAttrPics: [],
        //可手动添加的商品属性
        addProductAttrValue: '',
        //商品富文本详情激活类型
        activeHtmlName: 'pc'
      }
    },
    computed: {
      //是否有商品属性图片
      hasAttrPic() {
        if (this.selectProductAttrPics.length < 1) {
          return false;
        }
        return true;
      },
      //商品的编号
      productId(){
        return this.value.id;
      },
      //商品的主图和画册图片
      selectProductPics:{
        get:function () {
          let pics=[];
          if(this.value.pic===undefined||this.value.pic==null||this.value.pic===''){
            return pics;
          }
          pics.push(this.value.pic);
          if(this.value.albumPics===undefined||this.value.albumPics==null||this.value.albumPics===''){
            return pics;
          }
          let albumPics = this.value.albumPics.split(',');
          for(let i=0;i<albumPics.length;i++){
            pics.push(albumPics[i]);
          }
          return pics;
        },
        set:function (newValue) {
          if (newValue == null || newValue.length === 0) {
            this.value.pic = null;
            this.value.albumPics = null;
          } else {
            this.value.pic = newValue[0];
            this.value.albumPics = '';
            if (newValue.length > 1) {
              for (let i = 1; i < newValue.length; i++) {
                this.value.albumPics += newValue[i];
                if (i !== newValue.length - 1) {
                  this.value.albumPics += ',';
                }
              }
            }
          }
        }
      }
    },
    created() {
      this.getProductAttrCateList();
    },
    watch: {
      productId:function (newValue) {
        if(!this.isEdit)return;
        if(this.hasEditCreated)return;
        if(newValue===undefined||newValue==null||newValue===0)return;
        this.handleEditCreated();
      }
    },
    methods: {
       // 获取短信验证码
      getSend () {
        if (this.phoneOK && this.flag) {
          this.flag = false
          this.$http({
            url: this.$http.adornUrl('/login/sendVerifyCode'),
            method: 'post',
            params: this.$http.adornParams({
              mobile: this.dataForm.tel,
              imgVerifyCode: this.dataForm.send
            })
          }).then(({data}) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500
            })
            if (data.code === 'ok') {
            // console.log(data.verifycode)
              let num = 60
              this.verifyCodeNotes = num + '秒后重新获取验证码'
              let timer = setInterval(() => {
                num--
                this.verifyCodeNotes = num + '秒后重新获取验证码'
                if (num <= 0) {
                  clearInterval(timer)
                  this.verifyCodeNotes = '重新获取验证码'
                  this.flag = true
                }
              }, 1000)
            } else {
              this.$message.error('服务器错误')
              this.verifyCodeNotes = '重新获取验证码'
              this.flag = true
            }
          }).catch(() => {
            this.$message.error('错误')
            this.verifyCodeNotes = '重新获取验证码'
            this.flag = true
          })
        }
      },
      handleEditCreated() {
        //根据商品属性分类id获取属性和参数
        if(this.value.productAttributeCategoryId!=null){
          this.handleProductAttrChange(this.value.productAttributeCategoryId);
        }
        this.hasEditCreated=true;
      },
      getProductAttrCateList() {
        let param = {pageNum: 1, pageSize: 100};
        fetchProductAttrCateList(param).then(response => {
          this.productAttributeCategoryOptions = [];
          let list = response.data.list;
          for (let i = 0; i < list.length; i++) {
            this.productAttributeCategoryOptions.push({label: list[i].name, value: list[i].id});
          }
        });
      },
      getProductAttrList(type, cid) {
        let param = {pageNum: 1, pageSize: 100, type: type};
        fetchProductAttrList(cid, param).then(response => {
          let list = response.data.list;
          if (type === 0) {
            this.selectProductAttr = [];
            for (let i = 0; i < list.length; i++) {
              let options = [];
              let values = [];
              if (this.isEdit) {
                if (list[i].handAddStatus === 1) {
                  //编辑状态下获取手动添加编辑属性
                  options = this.getEditAttrOptions(list[i].id);
                }
                //编辑状态下获取选中属性
                values = this.getEditAttrValues(i);
              }
              this.selectProductAttr.push({
                id: list[i].id,
                name: list[i].name,
                handAddStatus: list[i].handAddStatus,
                inputList: list[i].inputList,
                values: values,
                options: options
              });
            }
            if(this.isEdit){
              //编辑模式下刷新商品属性图片
              this.refreshProductAttrPics();
            }
          } else {
            this.selectProductParam = [];
            for (let i = 0; i < list.length; i++) {
              let value=null;
              if(this.isEdit){
                //编辑模式下获取参数属性
                value= this.getEditParamValue(list[i].id);
              }
              this.selectProductParam.push({
                id: list[i].id,
                name: list[i].name,
                value: value,
                inputType: list[i].inputType,
                inputList: list[i].inputList
              });
            }
          }
        });
      },
      //获取设置的可手动添加属性值
      getEditAttrOptions(id) {
        let options = [];
        for (let i = 0; i < this.value.productAttributeValueList.length; i++) {
          let attrValue = this.value.productAttributeValueList[i];
          if (attrValue.productAttributeId === id) {
            let strArr = attrValue.value.split(',');
            for (let j = 0; j < strArr.length; j++) {
              options.push(strArr[j]);
            }
            break;
          }
        }
        return options;
      },
      //获取选中的属性值
      getEditAttrValues(index) {
        let values = [];
        if (index === 0) {
          for (let i = 0; i < this.value.skuStockList.length; i++) {
            let sku = this.value.skuStockList[i];
            if (sku.sp1 != null && values.indexOf(sku.sp1) === -1) {
              values.push(sku.sp1);
            }
          }
        } else if (index === 1) {
          for (let i = 0; i < this.value.skuStockList.length; i++) {
            let sku = this.value.skuStockList[i];
            if (sku.sp2 != null && values.indexOf(sku.sp2) === -1) {
              values.push(sku.sp2);
            }
          }
        } else {
          for (let i = 0; i < this.value.skuStockList.length; i++) {
            let sku = this.value.skuStockList[i];
            if (sku.sp3 != null && values.indexOf(sku.sp3) === -1) {
              values.push(sku.sp3);
            }
          }
        }
        return values;
      },
      //获取属性的值
      getEditParamValue(id){
        for(let i=0;i<this.value.productAttributeValueList.length;i++){
          if(id===this.value.productAttributeValueList[i].productAttributeId){
            return this.value.productAttributeValueList[i].value;
          }
        }
      },
      handleProductAttrChange(value) {
        this.getProductAttrList(0, value);
        this.getProductAttrList(1, value);
      },
      getInputListArr(inputList) {
        return inputList.split(',');
      },
      handleAddProductAttrValue(idx) {
        let options = this.selectProductAttr[idx].options;
        if (this.addProductAttrValue == null || this.addProductAttrValue == '') {
          this.$message({
            message: '属性值不能为空',
            type: 'warning',
            duration: 1000
          });
          return
        }
        if (options.indexOf(this.addProductAttrValue) !== -1) {
          this.$message({
            message: '属性值不能重复',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.selectProductAttr[idx].options.push(this.addProductAttrValue);
        this.addProductAttrValue = null;
      },
      handleRemoveProductAttrValue(idx, index) {
        this.selectProductAttr[idx].options.splice(index, 1);
      },
      getProductSkuSp(row, index) {
        if (index === 0) {
          return row.sp1;
        } else if (index === 1) {
          return row.sp2;
        } else {
          return row.sp3;
        }
      },
      handleRefreshProductSkuList() {
        this.$confirm('刷新列表将导致sku信息重新生成，是否要刷新', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.refreshProductAttrPics();
          this.refreshProductSkuList();
        });
      },
      handleSyncProductSkuPrice(){
        this.$confirm('将同步第一个sku的价格到所有sku,是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.value.skuStockList!==null&&this.value.skuStockList.length>0){
            let price=this.value.skuStockList[0].price;
            for(let i=0;i<this.value.skuStockList.length;i++){
              this.value.skuStockList[i].price=price;
            }
          }
        });
      },
      refreshProductSkuList() {
        this.value.skuStockList = [];
        let skuList = this.value.skuStockList;
        //只有一个属性时
        if (this.selectProductAttr.length === 1) {
          let values = this.selectProductAttr[0].values;
          for (let i = 0; i < values.length; i++) {
            skuList.push({
              sp1: values[i]
            });
          }
        } else if (this.selectProductAttr.length === 2) {
          let values0 = this.selectProductAttr[0].values;
          let values1 = this.selectProductAttr[1].values;
          for (let i = 0; i < values0.length; i++) {
            if (values1.length === 0) {
              skuList.push({
                sp1: values0[i]
              });
              continue;
            }
            for (let j = 0; j < values1.length; j++) {
              skuList.push({
                sp1: values0[i],
                sp2: values1[j]
              });
            }
          }
        } else {
          let values0 = this.selectProductAttr[0].values;
          let values1 = this.selectProductAttr[1].values;
          let values2 = this.selectProductAttr[2].values;
          for (let i = 0; i < values0.length; i++) {
            if (values1.length === 0) {
              skuList.push({
                sp1: values0[i]
              });
              continue;
            }
            for (let j = 0; j < values1.length; j++) {
              if (values2.length === 0) {
                skuList.push({
                  sp1: values0[i],
                  sp2: values1[j]
                });
                continue;
              }
              for (let k = 0; k < values2.length; k++) {
                skuList.push({
                  sp1: values0[i],
                  sp2: values1[j],
                  sp3: values2[k]
                });
              }
            }
          }
        }
      },
      refreshProductAttrPics() {
        this.selectProductAttrPics = [];
        if (this.selectProductAttr.length >= 1) {
          let values = this.selectProductAttr[0].values;
          for (let i = 0; i < values.length; i++) {
            let pic=null;
            if(this.isEdit){
              //编辑状态下获取图片
              pic=this.getProductSkuPic(values[i]);
            }
            this.selectProductAttrPics.push({name: values[i], pic: pic})
          }
        }
      },
      //获取商品相关属性的图片
      getProductSkuPic(name){
        for(let i=0;i<this.value.skuStockList.length;i++){
          if(name===this.value.skuStockList[i].sp1){
            return this.value.skuStockList[i].pic;
          }
        }
        return null;
      },
      //合并商品属性
      mergeProductAttrValue() {
        this.value.productAttributeValueList = [];
        for (let i = 0; i < this.selectProductAttr.length; i++) {
          let attr = this.selectProductAttr[i];
          if (attr.handAddStatus === 1 && attr.options != null && attr.options.length > 0) {
            this.value.productAttributeValueList.push({
              productAttributeId: attr.id,
              value: this.getOptionStr(attr.options)
            });
          }
        }
        for (let i = 0; i < this.selectProductParam.length; i++) {
          let param = this.selectProductParam[i];
          this.value.productAttributeValueList.push({
            productAttributeId: param.id,
            value: param.value
          });
        }
      },
      //合并商品属性图片
      mergeProductAttrPics() {
        for (let i = 0; i < this.selectProductAttrPics.length; i++) {
          for (let j = 0; j < this.value.skuStockList.length; j++) {
            if (this.value.skuStockList[j].sp1 === this.selectProductAttrPics[i].name) {
              this.value.skuStockList[j].pic = this.selectProductAttrPics[i].pic;
            }
          }
        }
      },
      getOptionStr(arr) {
        let str = '';
        for (let i = 0; i < arr.length; i++) {
          str += arr[i];
          if (i != arr.length - 1) {
            str += ',';
          }
        }
        return str;
      },
      handleRemoveProductSku(index, row) {
        let list = this.value.skuStockList;
        if (list.length === 1) {
          list.pop();
        } else {
          list.splice(index, 1);
        }
      },
      getParamInputList(inputList) {
        return inputList.split(',');
      },
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
      handlePrev() {
        this.$emit('prevStep')
      },
      handleNext() {
        this.mergeProductAttrValue();
        this.mergeProductAttrPics();
        this.$emit('nextStep')
      }
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
