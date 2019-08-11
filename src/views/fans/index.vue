<template>
  <el-card>
    <div slot="header">
      <my-bread>粉丝管理</my-bread>
    </div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="粉丝列表" name="fansList">
        <ul class="fansList">
          <li class="fans-item" v-for="item in fansList" :key="item.id.toString()">
            <el-avatar :src="item.photo" style="width:80px;height:80px"></el-avatar>
            <p style="font-size:14px">{{item.name}}</p>
            <el-button type="primary" plain size="small">+ 关注</el-button>
          </li>
        </ul>
        <el-pagination
          v-if="total > reqParams.per_page"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="粉丝画像" name="fansBar">
        <div style="width:700px;height:500px;" ref="dom">1</div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'fansList',
      fansList: [],
      reqParams: {
        page: 1,
        per_page: 24
      },
      total: 0
    }
  },
  methods: {
    async getFansList () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqParams })
      this.fansList = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    },
    initBar () {
      const myChart = echarts.init(this.$refs.dom)
      console.log(this.$refs.dom)
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  created () {
    this.getFansList()
  },
  mounted () {
    this.initBar()
  }
}
</script>

<style scoped lang="less">
.fansList {
  width: 100%;
  .fans-item {
    display: inline-block;
    text-align: center;
    width: 130px;
    height: 180px;
    padding-top: 15px;
    margin-bottom: 20px;
    margin-right: 40px;
    border: 1px dashed #ddd;
  }
}
</style>
