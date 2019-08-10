<template>
  <div class="my-upload">
    <div class="upload">
      <img :src="value || defaultImage" object-fit="contain" @click="showDialog" />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group v-model="imagesList.collect" size="mini" @change="changeCollect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <ul style="padding:0px;margin-left:15px">
            <li
              class="img-item"
              v-for="item in images"
              :key="item.id"
              @click="seclectedImage(item.url)"
              :class="{seclected:item.url === seclectedImageUrl}"
            >
              <img :src="item.url" object-fit="contain" />
            </li>
          </ul>
          <el-pagination
            v-if="total > imagesList.per_page"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="imagesList.per_page"
            :current-page="imagesList.page"
            @current-change="changePager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="requestHeaders"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImage from '@/assets/images/default.png'
export default {
  name: 'my-upload',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      imagesList: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      requestHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      seclectedImageUrl: null,
      uploadImageUrl: defaultImage,
      defaultImage
    }
  },
  methods: {
    showDialog () {
      this.uploadImageUrl = defaultImage
      this.seclectedImageUrl = null
      this.getImages()
      this.dialogVisible = true
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.imagesList })
      this.images = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.imagesList.page = newPage
      this.getImages()
    },
    changeCollect () {
      this.imagesList.page = 1
      this.getImages()
    },
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传成功')
    },
    seclectedImage (url) {
      this.seclectedImageUrl = url
    },
    confirmImage () {
      if (this.activeName === 'image') {
        this.$emit('input', this.seclectedImageUrl)
      } else {
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="less">
</style>
