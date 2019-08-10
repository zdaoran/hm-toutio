<template>
  <el-card>
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <div class="header">
      <el-button-group>
        <el-radio-group v-model="imagesList.collect" @change="changeCollected" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
      </el-button-group>
      <el-button type="success" size="small" style="float:right" @click="showDialog">添加素材</el-button>
    </div>
    <ul style="padding:0">
      <li v-for="item in images" :key="item.id">
        <img :src="item.url" alt />
        <div class="footer">
          <span
            class="el-icon-star-off"
            :class="{seclected: item.is_collected}"
            @click="toggleCollected(item)"
          ></span>
          <span class="el-icon-delete" @click="del(item.id)"></span>
        </div>
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
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <div class="main">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :on-success="handleSuccess"
          :headers="requestHeaders"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      props: [],
      imagesList: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      requestHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  methods: {
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
    changeCollected () {
      this.imagesList.page = 1
      this.getImages()
    },
    async toggleCollected (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      item.is_collected = data.collect
    },
    del (id) {
      this.$confirm('老铁，此操作将永久删除该素材, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${id}`)
          this.getImages()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {})
    },
    showDialog () {
      this.imageUrl = null
      this.dialogVisible = true
    },
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.imagesList.page = 1
        this.getImages()
      }, 2000)
    }
  },
  created () {
    this.getImages()
  }
}
</script>

<style scoped lang="less">
ul {
  overflow: hidden;
}
li {
  list-style: none;
  height: 160px;
  width: 160px;
  float: left;
  margin: 0 50px 20px 0;
  border: 1px dashed #ddd;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    text-align: center;
    span {
      margin: 0 20px;
      color: #fff;
      cursor: pointer;
    }
    .seclected {
      color: red;
    }
  }
}
.main {
  text-align: center;
}
</style>
