<template>
  <div class="container">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt="logo" />
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login_bg.jpg") no-repeat center / cover;
  .box-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 300px;
    img {
      display: block;
      height: 46px;
      margin: 0 auto;
    }
  }
}
</style>
