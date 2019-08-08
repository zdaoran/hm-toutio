<template>
  <el-select :value="value" placeholder="请选择" clearable @change="fn">
    <el-option v-for="item in checkOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  data () {
    return {
      checkOptions: []
    }
  },
  props: ['value'],
  methods: {
    async getOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.checkOptions = data.channels
    },
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
    }
  },
  created () {
    this.getOptions()
  }
}
</script>

<style scoped lang="less">
</style>
