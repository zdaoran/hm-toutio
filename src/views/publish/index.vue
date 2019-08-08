<template>
  <el-card>
    <div slot="header">
      <my-bread>发布文章</my-bread>
    </div>
    <el-form label-width="100px">
      <el-form-item label="标题：" style="width:500px">
        <el-input v-model="input" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <el-input type="textarea" :rows="15"></el-input>
      </el-form-item>
      <el-form-item label="封面：">
        <el-radio-group v-model="radio">
          <el-radio :label="3">单图</el-radio>
          <el-radio :label="6">三图</el-radio>
          <el-radio :label="9">无图</el-radio>
          <el-radio :label="9">自动</el-radio>
        </el-radio-group>
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          style="border: 1px dashed #ddd;width:150px;height:150px"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
      </el-form-item>
      <el-form-item label="频道：">
        <el-select v-model='channels' placeholder='请选择' clearable>
            <el-option
              v-for='item in channels'
              :key='item.id'
              :label='item.name'
              :value='item.id'
            ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发表</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #ddd;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
