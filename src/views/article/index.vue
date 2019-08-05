<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form size="small">
        <el-form-item label-width="80px" label="状态：">
          <el-radio-group v-model="formData.radio">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="80px" label="频道：">
          <el-select v-model="formData.value" placeholder="请选择">
            <el-option
              v-for="item in checkOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="80px" label="日期：">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">根据筛选条件共查询到 0 条结果：</div>
      <el-table :data="tableData">
        <el-table-column prop="image" label="封面"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="createTime" label="发布时间"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkOptions: [
        {
          name: 'js',
          value: 1
        }
      ],
      formData: {
        radio: null,
        value: ''
      },
      value1: [],
      tableData: [
        {
          iamge: '',
          title: '',
          status: '',
          createTime: ''
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
  .el-table-column {
    width: 20%;
  }
  .page {
    margin-top: 26px;
    text-align: center;
  }
}
</style>
