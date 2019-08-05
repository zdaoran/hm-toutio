<template>
  <el-card>
    <div slot="header">
      <my-bread>个人设置</my-bread>
    </div>
    <el-row>
      <el-col :span="12">
        <el-form :label-position="labelPosition" label-width="120px">
          <el-form-item label="编号：">{{settingData.id}}</el-form-item>
          <el-form-item label="手机：">{{settingData.mobile}}</el-form-item>
          <el-form-item label="媒体名称：">
            <el-input v-model="settingData.name" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍：">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="settingData.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="settingData.email" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="myUload"
          :show-file-list="false"
        >
          <img v-if="settingData.photo" :src="settingData.photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'right',
      settingData: {},
      myUpload: ''
    }
  },
  methods: {
    async loadData () {
      try {
        const {
          data: { data }
        } = await this.$http.get('user/profile')
        this.settingData = data
      } catch (err) {
        this.$message.error('获取个人信息失败')
      }
    }
  },
  created () {
    this.loadData()
  }
}
</script>

<style scoped lang="less">
.avatar-uploader {
  margin: 0 auto;
  width: 178px;
  height: 178px;
  line-height: 178px;
  border: 1px dashed #ddd;
  border-radius: 6px;
  text-align: center;
  .avatar {
    display: block;
    height: 100%;
    width: 100%;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
</style>
