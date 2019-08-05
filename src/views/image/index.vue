<template>
  <el-card>
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <div class="header" style="margin-bottom:20px">
      <el-button-group>
        <el-button type="primary" size="small">全部</el-button>
        <el-button size="small">收藏</el-button>
      </el-button-group>
      <el-button type="success" size="small" style="float:right">添加素材</el-button>
    </div>
  </el-card>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.image {
  width: 160px;
  height: 160px;
}
</style>
