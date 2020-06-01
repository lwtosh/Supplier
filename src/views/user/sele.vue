<template>
  <div class="sele">
          <el-button type="primary" class="btn" ><router-link to='/apply'>申请供应商</router-link></el-button>
          <el-button type="success" class="btn">加入供应商</el-button>
    <p style="text-align:left;">提示：你目前未加入任何供应商或者未申请供应商</p>
    <div class="footer">
            <p>工作时间：9:00-18:00 地址：成都金牛高新技术产业园区蜀西路46号</p>
            <p>Copyright @ 2019 四川乐享拍网络科技有限公司 版权所有 :蜀ICP备19018827号</p>
      </div>
  </div>
</template>
<script>
export default {

}
</script>

<style>
.sele{
  width: 700px;
  margin: 260px auto;
}
.btn{
  height:120px;
  width: 300px;
  font-size: 18px;
  margin-bottom: 100px;
}
 .footer{
  color: #404040;
  text-align:center;
  position: absolute;
  bottom: 40px;
  left: 50%;
  margin-left: -292px;
}
</style>
