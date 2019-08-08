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
        <quill-editor></quill-editor>
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
          action
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="频道：">
        <my-channel></my-channel>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发表</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor }
}
</script>

<style scoped lang="less">
</style>
