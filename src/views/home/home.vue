<template>
  <div class="home">
    <div class="page-header">
      <div class="btn-box clearfix">
        <div class="btn-item">
          <button class="btn white-btn">注册</button>
        </div>
        <div class="btn-item login" @mouseenter="mouseoverHandle" @mouseleave="mouseoutHandle">
          <button class="btn blue-btn">登录</button>
          <transition name="el-zoom-in-top">
            <ul class="dropdown-list" v-show="showDropdown">
              <li class="item">
                <button class="btn blue-btn">登录新平台</button>
              </li>
              <li class="item">
                <button class="btn blue-btn">登录旧平台</button>
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>
    <SlideVerifyDialog
      v-if="showVerifyDialog"
      @success="verifySuccess"
      @close='closeVerifyDialog'
    ></SlideVerifyDialog>
  </div>
</template>

<script>
import SlideVerifyDialog from '@/components/slide_verify_dialog/'

export default {
  name: "Home",
  data() {
    return {
      showDropdown: false,  // 登录 下拉
      showVerifyDialog: true // 是否显示滑动验证
    };
  },
  components: {
    SlideVerifyDialog
  },
  methods: {
    mouseoverHandle() {
      // 鼠标移入登录按钮
      console.log("mouseoverHandle");
      if (this.showDropdown) {
        return;
      }
      this.showDropdown = true;
    },
    mouseoutHandle() {
      // 鼠标移出登录按钮
      console.log("mouseoutHandle");
      this.showDropdown = false;
    },
    verifySuccess(val) {
      this.showVerifyDialog = false
    },
    closeVerifyDialog() {
      this.showVerifyDialog = false
    }
  }
};
</script>

<style>
@import url("./style/home.min.css");
</style>