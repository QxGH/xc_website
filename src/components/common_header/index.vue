<template>
  <div class="common-header" :class="{'scroll-bottom': scrollBottom}">
    <div class="header-main clearfix">
      <div class="login-box pull-left">
        <div class="svg">
          <Logo></Logo>
        </div>
        <!-- <embed class="svg" width="50" height="48" src="https://cdn.xingchen.cn/69cdc911-6073-4197-8dc1-4ddd8ca3f911" type="image/svg+xml" /> -->
        <img class="name" src="https://cdn.xingchen.cn/a470a275-49fe-4c4d-9a6c-e3177d5c9be0" alt="">
        
        <i class="dot"></i>
        <span class="slogan">专注用户运营的技术服务商</span>
      </div>
      <div class="power-box pull-right" v-if="!hideAccount">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toAccountManage">账户管理</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <button v-if="ifCreatePlatform" class="create-platform-btn" @click="createPlatform">创建平台</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, clearCookie } from '@/tools/Cookie'
import Logo from '@/components/logo'

export default {
  name: "CommonHeader",
  props: {
    ifCreatePlatform: {
      type: Boolean,
      default: false
    },
    hideAccount: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Logo
  },
  data() {
    return {
      userInfo: {},
      scrollBottom: false
    }
  },
  created() {
    let userInfo = getUserInfo();
    this.userInfo = userInfo;
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    createPlatform() {
      this.$emit('createPlatform', '')
    },
    toAccountManage() {
      this.$router.push('/accountManage')
    },
    logout() {
      clearCookie()
      this.$router.push('/login')
    },
    handleScroll() {
      let scrollTop = document.getElementById('loginMain').scrollTop
      if(scrollTop >= 50) {
        this.scrollBottom = true;
      } else {
        this.scrollBottom = false;
      };
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, true);
  }
};
</script>

<style>
@import url('./style/index.min.css');
</style>