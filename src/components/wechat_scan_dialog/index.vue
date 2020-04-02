<template>
  <div class="wechat-scan-dialog">
    <div class="dialog-content">
      <div class="dialog-header">
        星辰用户运营平台登录
        <div class="icon-box">
          <span class="icon-item" @click="refresh">
            <i class="el-icon-refresh-right icon"></i>
          </span>
          <span class="icon-item" @click="close()">
            <i class="el-icon-close icon"></i>
          </span>
        </div>
      </div>
      <div class="dialog-body">
        <div class="title">
          微信登录
        </div>
        <div class="qrcode-box">
          <img :src="code" alt="" class="img">
        </div>
        <div class="sort">
          扫码 ＞ 关注 ＞ 登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WechatScanDialog',
  data() {
    return {
      code: ''
    }
  },
  methods: {
    refresh() {
      this.$message.success('refresh');
    },
    close(type = false) {
      this.$emit('close', type)
    }
  }
}
</script>

<style>
@import url('./style/index.min.css');
</style>