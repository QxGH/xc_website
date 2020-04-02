<template>
  <div class="account-manage">
    <CommonHeader></CommonHeader>
    <div class="page-wrap">
      <div class="page-cont">
        <div class="page-main">
          <div class="main-title">账号设置</div>
          <div class="form-box">
            <!-- form-group -->
            <div class="form-group text-form">
              <label class="form-label">手机号：</label>
              <div class="form-ctrl">{{userInfo.mobile}}</div>
            </div>
            <div class="form-group text-form">
              <label class="form-label">账号绑定微信：</label>
              <div class="form-ctrl">
                <span class="nickname">{{userInfo.name}}</span>
                <span class="unlockBind" @click="unlockBindingHandle">解除绑定</span>
                <span class="lockBind" @click="bindWechat">绑定微信登录</span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">昵称：</label>
              <div class="form-ctrl">
                <input type="text" v-model="form.name" class="input-ctrl" placeholder="请输入昵称" />
              </div>
            </div>
            <div class="form-group text-form">
              <label class="form-label">头像：</label>
              <div class="form-ctrl">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
            <div class="sub-title">修改密码</div>
            <div class="form-group">
              <label class="form-label">验证码：</label>
              <div class="form-ctrl">
                <input type="text" v-model="form.verifyCode" class="input-ctrl" placeholder="请输入验证码" />
                <button
                  class="send-btn"
                  :class="{'diabled': sendCodeDisable}"
                  @click="sendCode"
                  :disabled="sendCodeDisable"
                >{{sendCodeDisable ? sendCodeTime+'s' : '发送验证码'}}</button>
                <div class="code-tips">请注意查收{{userInfo.mobile}}接收的手机验证码</div>
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.verifyCodeNoTest">
                    <i class="err-icon"></i> 验证码错误
                  </div>
                </transition>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">新密码：</label>
              <div class="form-ctrl">
                <input
                  :type="lookNewPassword ? 'text' : 'password'"
                  v-model="form.newPassword"
                  class="input-ctrl"
                  placeholder="请输入新密码"
                />
                <div class="password-icon-box" @click="lookNewPwdHandle">
                  <template v-if="lookNewPassword">
                    <i class="open-icon"></i>
                  </template>
                  <template v-else>
                    <i class="close-icon"></i>
                  </template>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">确认密码：</label>
              <div class="form-ctrl">
                <input
                  :type="lookConfirmPassword ? 'text' : 'password'"
                  v-model="form.confirmPassword"
                  class="input-ctrl"
                  placeholder="请输入新密码"
                />
                <div class="password-icon-box" @click="lookConfirmPwdHandle">
                  <template v-if="lookConfirmPassword">
                    <i class="open-icon"></i>
                  </template>
                  <template v-else>
                    <i class="close-icon"></i>
                  </template>
                </div>
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.confirmPasswordNoTest">
                    <i class="err-icon"></i> 两次输入密码不一致
                  </div>
                </transition>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label"></label>
              <div class="form-ctrl form-btn">
                <el-button>返 回</el-button>
                <el-button type="primary">确认修改</el-button>
              </div>
            </div>
            <!-- form-group -->
          </div>
        </div>
      </div>
    </div>
    <SlideVerifyDialog
      v-if="showVerifyDialog"
      :verifyType="verifyType"
      @success="verifySuccess"
      @close="closeVerifyDialog"
    ></SlideVerifyDialog>
    <WechatScanDialog v-if="showWechatScanDialog" @close="wechatScanClose"></WechatScanDialog>
  </div>
</template>

<script>
import { getUserInfo } from '@/tools/Cookie'
import CommonHeader from "@/components/common_header";
import SlideVerifyDialog from "@/components/slide_verify_dialog/";
import WechatScanDialog from "@/components/wechat_scan_dialog"

export default {
  name: "AccountManage",
  data() {
    return {
      userInfo: {},
      sendCodeDisable: false,
      sendCodeLater: null,
      sendCodeTime: 60,
      lookNewPassword: false,
      lookConfirmPassword: false,
      showVerifyDialog: false, // 是否显示滑动验证
      verifyType: "sendCode", // sendCode  login  // 图片验证类型
      form: {
        nickname: "",
        avatar: "",
        verifyCode: '',
        newPassword: "",
        confirmPassword: ""
      },
      formRule: {
        verifyCodeNoTest: false,
        confirmPasswordNoTest: false
      },
      showWechatScanDialog: false,  // 微信扫码弹窗
    };
  },
  components: {
    CommonHeader,
    SlideVerifyDialog,
    WechatScanDialog
  },
  created() {
    let userInfo = getUserInfo();
    this.userInfo = userInfo;
  },
  methods: {
    lookNewPwdHandle() {
      // 查看新密码 切换
      let lookPassword = !this.lookNewPassword;
      this.lookNewPassword = lookPassword;
    },
    lookConfirmPwdHandle() {
      // 查看确认新密码 切换
      let lookPassword = !this.lookConfirmPassword;
      this.lookConfirmPassword = lookPassword;
    },
    handleAvatarSuccess() {},
    beforeAvatarUpload() {},
    sendCode() {
      // 发送验证码
      if(this.sendCodeLater) {
        return;
      };
      this.resetFomrRule();
      this.verifyType = "sendCode";
      this.showVerifyDialog = true;
    },
    verifySuccess(val) {
      // 图形验证成功
      this.showVerifyDialog = false;
      if (val == "sendCode") {
        this.getcode();
      }
    },
    getcode() {
      if (this.sendCodeLater) {
        clearInterval(this.sendCodeLater);
        this.sendCodeLater = null;
      }
      this.sendCodeTime = 60;
      this.sendCodeDisable = true;
      this.form.verifyCode = "";
      this.sendCodeLater = setInterval(() => {
        if (this.sendCodeTime > 0) {
          this.sendCodeTime--;
        } else {
          this.sendCodeDisable = false;
          this.sendCodeTime = 60;
          clearInterval(this.sendCodeLater);
          this.sendCodeLater = null;
        }
      }, 1000);
    },
    closeVerifyDialog() {
      this.showVerifyDialog = false;
    },
    resetFomrRule() {
      this.formRule = {
        verifyCodeNoTest: false,
        confirmPasswordNoTest: false
      }
    },
    bindWechat() {
      this.showWechatScanDialog = true;
    },
    unlockBindingHandle() {
      this.$confirm('解除绑定之后，将不能再使用该微信扫码登录', '重要提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '解绑成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解绑'
          });          
        });
    },
    wechatScanClose(val) {
      if(val) {
        this.$message.success('扫码成功')
      } else {
        this.$message.error('未扫码')
      };
      this.showWechatScanDialog = false;
    }
  }
};
</script>

<style>
@import url("./style/account.min.css");
</style>