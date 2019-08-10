import MyBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'
import MyUpload from '@/components/my-upload.vue'

export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyUpload.name, MyUpload)
  }
}
