<template>
  <div class="common-header">
    <div class="header-main clearfix">
      <div class="login-box pull-left">LOGO</div>
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
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    let userInfo = getUserInfo();
    this.userInfo = userInfo;
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
    }
  }
};
</script>

<style>
@import url('./style/index.min.css');
</style>