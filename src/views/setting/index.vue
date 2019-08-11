<template>
  <el-card>
    <div slot="header">
      <my-bread>个人设置</my-bread>
    </div>
    <el-row>
      <el-col :span="12">
        <el-form label-width="120px">
          <el-form-item label="编号：">{{userData.id}}</el-form-item>
          <el-form-item label="手机：">{{userData.mobile}}</el-form-item>
          <el-form-item label="媒体名称：">
            <el-input v-model="userData.name" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍：">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="userData.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="userData.email" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="upDateUser">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-upload class="avatar-uploader" action :http-request="myUpload" :show-file-list="false">
          <img v-if="userData.photo" :src="userData.photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p style="font-size:14px;text-align:center">修改头像</p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      userData: {}
    }
  },
  methods: {
    // 获取用户信息
    async loadData () {
      try {
        const {
          data: { data }
        } = await this.$http.get('user/profile')
        this.userData = data
      } catch (err) {
        this.$message.error('获取个人信息失败')
      }
    },
    // 编辑用户信息
    async upDateUser () {
      await this.$http.patch('user/profile', {
        name: this.userData.name,
        intro: this.userData.intro,
        email: this.userData.email
      })
      this.$message.success('保存设置成功')
      store.setUser({ name: this.userData.name })
      eventBus.$emit('upDateName', this.userData.name)
    },
    // 编辑用户头像
    myUpload (result) {
      const formData = new FormData()
      formData.append('photo', result.file)
      this.$http
        .patch('user/photo', formData)
        .then(res => {
          this.userData.photo = res.data.data.photo
          store.setUser({ photo: this.userData.photo })
          eventBus.$emit('upDatePhoto', this.userData.photo)
          this.$message.success('修改头像成功')
        })
    }
  },
  created () {
    this.loadData()
  }
}
</script>

<style scoped lang="less">
</style>
