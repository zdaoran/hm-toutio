return JSONBig.parse(data)<template>
  <div class='container'>
    <el-card>
      <div slot='header'>
        <my-bread>内容管理</my-bread>
      </div>
      <el-form size='small' v-model="formData">
        <el-form-item label-width='80px' label='状态：'>
          <el-radio-group v-model='formData.status'>
            <el-radio :label='null'>全部</el-radio>
            <el-radio :label='0'>草稿</el-radio>
            <el-radio :label='1'>待审核</el-radio>
            <el-radio :label='2'>审核通过</el-radio>
            <el-radio :label='3'>审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width='80px' label='频道：'>
          <my-channel v-model="formData.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label-width='80px' label='日期：'>
          <el-date-picker
            v-model='dateArr'
            type='daterange'
            range-separator='至'
            start-placeholder='开始日期'
            end-placeholder='结束日期'
            value-format='yyyy-MM-dd'
            @change='changeDate'
          ></el-date-picker>
        </el-form-item>
        <el-form-item label-width='80px'>
          <el-button type='primary' @click='search()'>筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot='header'>根据筛选条件共查询到 {{total}} 条结果：</div>
      <el-table :data='articles'>
        <el-table-column label='封面'>
          <template slot-scope='scope'>
            <el-image fit='contain' :src='scope.row.cover.images[0]' alt style='width:120px;height:80px'>
              <div slot='error' class='image-slot'>
                <img src='../../assets/images/error.gif' alt style='width:120px;height:80px' />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop='title' label='标题'></el-table-column>
        <el-table-column label='状态'>
          <template slot-scope='scope'>
            <el-tag v-if='scope.row.status === 0' type='info'>草稿</el-tag>
            <el-tag v-if='scope.row.status === 1'>待审核</el-tag>
            <el-tag v-if='scope.row.status === 2' type='success'>审核通过</el-tag>
            <el-tag v-if='scope.row.status === 3' type='warning'>审核失败</el-tag>
            <el-tag v-if='scope.row.status === 4' type='danger'>已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop='pubdate' label='发布时间'></el-table-column>
        <el-table-column label='操作' width='120px'>
          <template slot-scope='scope'>
            <el-button type='primary' icon='el-icon-edit' circle plain @click='edit(scope.row.id)'></el-button>
            <el-button type='danger' icon='el-icon-delete' circle plain @click='del(scope.row.id)'></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class='page'>
        <el-pagination
          background
          layout='prev, pager, next'
          :total='total'
          :page-size='formData.per_page'
          :current-page='formData.page'
          @current-change='changePager'
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 日期数据
      dateArr: [],
      // 文章列表
      articles: [],
      // 文章总条数
      total: 0
    }
  },
  created () {
    this.getArticleData()
  },
  methods: {
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)
          this.$message.success('删除文章成功')
          this.getArticleData()
        })
        .catch(() => {})
    },
    search () {
      this.formData.page = 1
      this.getArticleData()
    },
    async getArticleData () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.formData })
      this.articles = data.results
      this.total = data.total_count
    },
    changeDate (dateArr) {
      if (dateArr) {
        this.formData.begin_pubdate = this.dateArr[0]
        this.formData.end_pubdate = this.dateArr[1]
      } else {
        this.formData.begin_pubdate = null
        this.formData.end_pubdate = null
      }
    },
    changePager (newPage) {
      this.formData.page = newPage
      this.getArticleData()
    }
  }
}
</script>

<style lang='less' scoped>
.el-card {
  margin-bottom: 20px;
  .page {
    margin-top: 26px;
    text-align: center;
  }
}
</style>
