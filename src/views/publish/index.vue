<template>
  <el-card class="publish">
    <div slot="header">
      <my-bread>{{articleId?'修改文章':'发布文章'}}</my-bread>
    </div>
    <el-form label-width="100px">
      <el-form-item label="标题：" style="width:500px">
        <el-input v-model="articleForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
      </el-form-item>
      <el-form-item label="封面：">
        <el-radio-group v-model="articleForm.cover.type" @change="toggle">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <div v-if="articleForm.cover.type===1">
          <my-upload v-model="articleForm.cover.images[0]"></my-upload>
        </div>
        <div v-if="articleForm.cover.type===3">
          <my-upload v-model="articleForm.cover.images[0]"></my-upload>
          <my-upload v-model="articleForm.cover.images[1]"></my-upload>
          <my-upload v-model="articleForm.cover.images[2]"></my-upload>
        </div>
      </el-form-item>
      <el-form-item label="频道：">
        <my-channel v-model="articleForm.channel_id"></my-channel>
      </el-form-item>
      <el-form-item v-if="!articleId">
        <el-button type="primary" @click="submit(false)">发表</el-button>
        <el-button @click="submit(true)">存入草稿</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="success" @click="edit(false)">修改</el-button>
        <el-button @click="edit(true)">存入草稿</el-button>
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
  components: { quillEditor },
  data () {
    return {
      articleId: null,
      articleForm: {
        title: null,
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  methods: {
    toggle () {
      this.articleForm.cover.images = []
    },
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$router.push('/article')
      this.$message.success(draft ? '文章存入草稿成功' : '文章发布成功')
    },
    async getArticle (id) {
      const {
        data: { data }
      } = await this.$http.get('articles/' + id)
      this.articleForm = data
    },
    async edit (draft) {
      await this.$http.put(
        `articles/${this.articleId}?draft=${draft}`,
        this.articleForm
      )
      this.$router.push('/article')
      this.$message.success(draft ? '文章存入草稿成功' : '编辑文章成功')
    }
  },
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) {
      this.getArticle(this.articleId)
    }
  },
  watch: {
    $route () {
      this.articleId = null
      this.articleForm = {
        title: null,
        content: '',
        cover: {
          type: 1,
          images: []
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
