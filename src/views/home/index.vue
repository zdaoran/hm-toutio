<template>
  <el-container class="container-a">
    <el-aside
      :width="isCollapse?'64px':'200px'"
      style="background-color: #002033"
      v-model="isCollapse"
    >
      <div class="logo" :class="{small:isCollapse}"></div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse-transition="false"
        :collapse="isCollapse"
        router
      >
        <el-menu-item index="/welcome">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="change"></span>
        <span>江苏传智播客科技教育有限公司</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link" style="vertical-align: middle">
            <img :src="photo" />
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div></div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '@/components/eventBus'
import store from '@/store'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  methods: {
    change () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      store.clearUser()
      this.$router.push('/login')
    },
    handleCommand (command) {
      this[command]()
    }
  },
  created () {
    eventBus.$on('upDateName', (name) => {
      this.name = name
    })
    eventBus.$on('upDatePhoto', (photo) => {
      this.photo = photo
    })
    const userInfo = store.getUser()
    this.name = userInfo.name
    this.photo = userInfo.photo
  }
}
</script>

<style lang="less" scoped>
.container-a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .el-header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    span {
      vertical-align: middle;
    }
    .el-icon-s-fold {
      font-size: 26px;
      padding-right: 10px;
    }
    .el-dropdown {
      float: right;
      font-weight: 700;
      img {
        height: 30px;
        width: 30px;
        vertical-align: middle;
      }
    }
  }
  .el-aside {
    background-color: #002033;
    .el-menu {
      border-right: 0;
    }
    .logo {
      height: 60px;
      background: #002244 url(../../assets/images/logo_admin.png) no-repeat
        center / 130px auto;
    }
    .small {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
  }
}
</style>
