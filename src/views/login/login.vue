<template>
  <div class="login">
    <header class="login-header">
      <CommonHeader :hideAccount="true"></CommonHeader>
    </header>
    <div class="main" id="loginMain">
      <div class="login-cont clearfix">
        <div class="banner">
          <slider ref="slider" :options="slider.options">
            <!-- 直接使用slideritem slot -->
            <slideritem v-for="(item, index) in slider.imgList" :key="index">
              <img :src="item" alt="banner-img" class="banner-img" draggable="false" />
            </slideritem>
            <!-- 设置loading,可自定义 -->
            <div slot="loading">loading...</div>
          </slider>
        </div>
        <div class="form-box" :class="{'form-box-pad-top': pageType == 'retrievePassword'}">
          <div
            class="goback-login"
            @click="gobackLogin"
            v-if="pageType == 'phoneRegist' || pageType == 'scanRegist' || pageType == 'bindPhone' || pageType == 'retrievePassword'"
          >
            <i class="el-icon-arrow-left icon"></i>
            <span class="tips">返回登录</span>
          </div>
          <div
            class="code-tggle-box"
            @click="pageType == 'phoneRegist' ? toCodeRegist() : toCodeLogin()"
            v-if="pageType == 'smsLogin' || pageType == 'accountLogin'  || pageType == 'phoneRegist'"
          >
            <div class="bubble">
              <img src="https://cdn.xingchen.cn/FiVs3adv6ngtuuYeUEoDBkOhKZZo" alt class="img" />
              <span class="text">
                <template v-if="pageType == 'phoneRegist'">微信扫码注册</template>
                <template v-else>微信扫码登录</template>
              </span>
            </div>
          </div>
          <div
            class="code-tggle-box to-phone"
            @click="toPhoneLogin"
            v-if="pageType == 'scanLogin' || pageType == 'scanRegist'"
          >
            <div class="bubble">
              <img src="https://cdn.xingchen.cn/FopA6uWaXfWtxnp7oV2Wqc0gKvRO" alt class="img" />
              <span class="text">手机号登录</span>
            </div>
          </div>
          <div class="tabs-box" v-if="pageType == 'smsLogin' || pageType == 'accountLogin'">
            <div
              class="tabs-main clearfix"
              :class="{'smsActive': tabsName == 'sms', 'accountActive': tabsName == 'account'}"
            >
              <div
                class="tabs-item"
                :class="{'active': tabsName == 'sms'}"
                @click="changeTabs('sms')"
              >
                <div class="tabs-text">短信快捷登录</div>
              </div>
              <div
                class="tabs-item"
                :class="{'active': tabsName == 'account'}"
                @click="changeTabs('account')"
              >
                <div class="tabs-text">帐号密码登录</div>
              </div>
            </div>
          </div>
          <div class="page-title" v-if="pageType == 'phoneRegist'">注册</div>
          <div class="page-title" v-if="pageType == 'bindPhone'">绑定手机号</div>
          <div class="page-title" v-if="pageType == 'retrievePassword'">找回密码</div>
          <div class="wx-title" v-if="pageType == 'scanRegist' || pageType == 'scanLogin'">
            <i class="wx-icon"></i>
            <span class="title-text">
              <template v-if="pageType == 'scanRegist'">微信扫码注册</template>
              <template v-if="pageType == 'scanLogin'">微信扫码登录</template>
            </span>
          </div>
          <div
            class="form-main"
            v-if="pageType == 'smsLogin' || pageType == 'accountLogin' || pageType == 'phoneRegist' || pageType == 'bindPhone' || pageType == 'retrievePassword'"
          >
            <div
              class="form-group"
              v-if="pageType == 'smsLogin' || pageType == 'phoneRegist' || pageType == 'bindPhone' || pageType == 'retrievePassword'"
            >
              <label class="form-label">手机号码</label>
              <div class="form-ctrl">
                <input
                  type="text"
                  v-model="form.phone"
                  class="input-ctrl"
                  placeholder="请输入手机号码"
                  maxlength="11"
                />
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.phoneRegistered">
                    <i class="err-icon"></i> 手机号未注册
                  </div>
                </transition>
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.phoneNoTest">
                    <i class="err-icon"></i> 手机号格式错误
                  </div>
                </transition>
              </div>
            </div>
            <div class="form-group" v-if="pageType == 'accountLogin'">
              <label class="form-label">账号</label>
              <div class="form-ctrl">
                <input type="text" v-model="form.account" class="input-ctrl" placeholder="请输入账号" />
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.accountNoTest">
                    <i class="err-icon"></i> 账号不能为空
                  </div>
                </transition>
              </div>
            </div>
            <div class="form-group" v-if="pageType == 'accountLogin'">
              <label class="form-label">密码</label>
              <div class="form-ctrl">
                <input
                  :type="lookPassword ? 'text' : 'password'"
                  class="input-ctrl"
                  v-model="form.password"
                  placeholder="请输入密码"
                />
                <div class="password-icon-box" @click="lookPwdHandle">
                  <template v-if="lookPassword">
                    <i class="open-icon"></i>
                  </template>
                  <template v-else>
                    <i class="close-icon"></i>
                  </template>
                </div>
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.passwordError">
                    <i class="err-icon"></i> 账号或密码错误
                  </div>
                </transition>
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.passwordNoTest">
                    <i class="err-icon"></i> 密码不能为空
                  </div>
                </transition>
              </div>
            </div>
            <div
              class="form-group"
              v-if="pageType == 'smsLogin' || pageType == 'phoneRegist' || pageType == 'bindPhone' || pageType == 'retrievePassword'"
            >
              <label class="form-label">验证码</label>
              <div class="form-ctrl">
                <input
                  type="text"
                  v-model="form.verifyCode"
                  class="input-ctrl"
                  placeholder="请输入验证码"
                  maxlength="8"
                />
                <button
                  class="send-btn"
                  :class="{'diabled': sendCodeDisable}"
                  @click="sendCode"
                  :disabled="sendCodeDisable"
                >{{sendCodeDisable ? sendCodeTime+'s' : '发送验证码'}}</button>
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.verifyCodeNoTest">
                    <i class="err-icon"></i> 验证码错误
                  </div>
                </transition>
              </div>
            </div>
            <div class="form-group" v-if="pageType == 'retrievePassword'">
              <label class="form-label">新密码</label>
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
            <div class="form-group" v-if="pageType == 'retrievePassword'">
              <label class="form-label">确认新密码</label>
              <div class="form-ctrl">
                <input
                  :type="lookConfirmPassword ? 'text' : 'password'"
                  v-model="form.confirmPassword"
                  class="input-ctrl"
                  placeholder="请输入确认密码"
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
            <div class="form-group" v-if="pageType == 'phoneRegist' || pageType == 'bindPhone'">
              <label class="form-label">邀请码</label>
              <div class="form-ctrl">
                <input
                  type="text"
                  v-model="form.invitationCode"
                  class="input-ctrl"
                  placeholder="请输入邀请码"
                />
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.invitationCodeInvalid">
                    邀请码无效，请联系客服
                    <span class="add-customer" @click="addCustomerHandle">添加客服微信</span>
                  </div>
                </transition>
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.invitationCodeLimit">
                    邀请码次数已达上限
                    <span class="add-customer" @click="addCustomerHandle">添加客服微信</span>
                  </div>
                </transition>
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.invitationCodeMust">
                    <i class="err-icon"></i> 该手机号未注册，需输入邀请码
                  </div>
                </transition>
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.invitationCodeNoMust">
                    <i class="err-icon"></i> 该手机号已注册，无需输入邀请码
                  </div>
                </transition>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label login-btn-label"></label>
              <div class="form-ctrl">
                <template v-if="pageType == 'phoneRegist'">
                  <button class="login-btn" @click="registHandle">注 册</button>
                </template>
                <template v-else-if="pageType == 'retrievePassword'">
                  <button
                    class="login-btn"
                    style="font-size: 18px;"
                    @click="resetPasswordHandle"
                  >重置密码</button>
                </template>
                <template v-else>
                  <button class="login-btn" @click="loginHandle">登 录</button>
                </template>
                <div
                  class="other-btn clearfix"
                  v-if="pageType == 'smsLogin' || pageType == 'accountLogin'"
                >
                  <button
                    class="forgetPwd-btn"
                    @click="retrievePasswordHandle"
                    v-show="pageType == 'accountLogin'"
                  >忘记密码？</button>
                  <button class="toRegist-btn" @click="toPhoneRegist">立即注册</button>
                </div>
                <div class="bind-phone-tips" v-if="pageType == 'bindPhone'">为了您的账户安全，请绑定手机号</div>
              </div>
            </div>
          </div>
          <!-- form end -->
          <div class="scan-show-box" v-if="pageType == 'scanLogin' || pageType == 'scanRegist'">
            <div class="code-box">
              <img src class="img" alt />
            </div>
            <div class="tips-box">
              <i class="tips-icon"></i>
              <span class="tips">
                <template v-if="pageType == 'scanRegist'">打开微信，扫一扫注册</template>
                <template v-if="pageType == 'scanLogin'">打开微信，扫一扫登录</template>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="particles-box">
      <VueParticles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="90"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="200"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      ></VueParticles>
    </div>
    <SlideVerifyDialog
      v-if="showVerifyDialog"
      :verifyType="verifyType"
      @success="verifySuccess"
      @close="closeVerifyDialog"
    ></SlideVerifyDialog>
    <el-dialog
      title="客服二维码"
      :visible.sync="customerDialog"
      width="320px"
      center
      custom-class="customer-dialog"
    >
      <div class="customer-dialog-body">
        <div class="code-box">
          <img src alt class="code-img" />
        </div>
        <div class="tips">微信扫码添加星辰客服</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="customerDialog = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { AesEncrypt, AesDecrypt } from "@/tools/Crypto";
import { slider, slideritem } from "vue-concise-slider";
import SlideVerifyDialog from "@/components/slide_verify_dialog/";
import VueParticles from "@/components/vue_particles/index.vue";
import CommonHeader from "@/components/common_header";

// VueParticles - option
// color: String类型。默认'#dedede'。粒子颜色。
// particleOpacity: Number类型。默认0.7。粒子透明度。
// particlesNumber: Number类型。默认80。粒子数量。
// shapeType: String类型。默认'circle'。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
// particleSize: Number类型。默认80。单个粒子大小。
// linesColor: String类型。默认'#dedede'。线条颜色。
// linesWidth: Number类型。默认1。线条宽度。
// lineLinked: 布尔类型。默认true。连接线是否可用。
// lineOpacity: Number类型。默认0.4。线条透明度。
// linesDistance: Number类型。默认150。线条距离。
// moveSpeed: Number类型。默认3。粒子运动速度。
// hoverEffect: 布尔类型。默认true。是否有hover特效。
// hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
// clickEffect: 布尔类型。默认true。是否有click特效。
// clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"

export default {
  name: "Login",
  components: {
    slider,
    slideritem,
    SlideVerifyDialog,
    VueParticles,
    CommonHeader
  },
  data() {
    return {
      /**
       * @pageType
       * smsLogin-短信登录
       * accountLogin-账号登录
       * scanLogin-扫码登录
       * phoneRegist-手机注册
       * scanRegist-扫码注册
       * bindPhone-绑定手机
       * retrievePassword-找回密码
       */
      pageType: "smsLogin",
      tabsName: "sms", // account sms
      lookPassword: false,
      lookNewPassword: false,
      lookConfirmPassword: false,
      sendCodeDisable: false, // 发送验证码 disabled 防止点击
      sendCodeLater: null, // 发送验证码 定时器
      sendCodeTime: 60, // 发送验证码倒计时 时间
      
      verifyType: "sendLoginCode", // sendCode  login  // 图片验证类型
      /** 
       * @verifyType
      // sendLoginCode 登录验证码
      // sendRegistCode 注册验证码
      // sendBindCode 绑定手机号 验证码
      // sendRePwdCode 找回密码验证码
      */
      form: {
        phone: "",
        verifyCode: "",
        account: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
        invitationCode: "" // 邀请码
      },
      formRule: {
        phoneRegistered: false, // 手机号已注册
        phoneNoTest: false, // 手机号格式不正确
        verifyCodeNoTest: false, // 验证码错误
        accountNoTest: false, // 账号不能为空
        passwordNoTest: false, // 密码不能为空
        passwordError: false, // 密码错误
        confirmPasswordNoTest: false, // 确认密码不一致
        invitationCodeInvalid: false, // 邀请码无效
        invitationCodeLimit: false, // 邀请码已达上限
        invitationCodeMust: false, // 该手机号未注册，需输入邀请码
        invitationCodeNoMust: false // 该手机号已注册，无需输入邀请码
      },
      requireInvitationCode: false, // 需要邀请码
      customerDialog: false,
      showVerifyDialog: false, // 是否显示滑动验证
      slider: {
        imgList: ["https://cdn.xingchen.cn/Fincwz89qvZLvIHK4fJtN8yTwIVR"],
        options: {
          pagination: false, // 显示页码
          currentPage: 0, //当前页码
          thresholdDistance: 100, //滑动判定距离
          thresholdTime: 300, //滑动判定时间
          autoplay: 3000, //自动滚动[ms]
          loop: true, //循环滚动
          direction: "horizontal", //方向设置，垂直滚动 vertical horizontal
          loopedSlides: 1, //无限滚动前后遍历数
          slidesToScroll: 1, //每次滑动项数
          timingFunction: "ease",
          speed: 500
        }
      }
    };
  },
  created() {
    if (this.$route.query.type && this.$route.query.type == "regist") {
      this.pageType = "phoneRegist";
    }
  },
  methods: {
    lookPwdHandle() {
      // 查看密码 切换
      let lookPassword = !this.lookPassword;
      this.lookPassword = lookPassword;
    },
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
    changeTabs(type) {
      // tabs 切换
      this.tabsName = type;
      if (type == "sms") {
        this.pageType = "smsLogin";
      } else if (type == "account") {
        this.pageType = "accountLogin";
      }
    },
    gobackLogin() {
      if (this.tabsName == "account") {
        this.pageType = "accountLogin";
      } else {
        this.pageType = "smsLogin";
      }
    },
    toCodeLogin() {
      // 切换扫码登录
      this.pageType = "scanLogin";
    },
    toCodeRegist() {
      // 切换扫码注册
      this.pageType = "scanRegist";
    },
    toPhoneLogin() {
      // 切换手机登录
      this.tabsName == "sms";
      this.pageType = "smsLogin";
    },
    toPhoneRegist() {
      // 切换注册
      this.pageType = "phoneRegist";
    },
    retrievePasswordHandle() {
      // 找回密码
      this.pageType = "retrievePassword";
    },
    sendCode() {
      // 发送验证码
      this.resetFomrRule();
      if (this.testPhone(this.form.phone)) {
        if (this.pageType == "smsLogin") {
          // 短信登录 发送验证码
          this.verifyType = "sendLoginCode";
        } else if (this.pageType == "phoneRegist") {
          // 手机号注册 发送验证码
          this.verifyType = "sendRegistCode";
        } else if (this.pageType == "bindPhone") {
          // 绑定手机号 发送验证码
          this.verifyType = "sendBindCode";
        } else if (this.pageType == "retrievePassword") {
          // 忘记密码 发送验证码
          this.verifyType = "sendRePwdCode";
        }
        this.showVerifyDialog = true;
      } else {
        this.formRule.phoneNoTest = true;
      }
    },
    registHandle() {
      this.resetFomrRule();
      if (this.pageType == "phoneRegist") {
        if (!this.testPhone(this.form.phone)) {
          this.formRule.phoneNoTest = true;
          return;
        }
        if (!this.form.verifyCode) {
          this.formRule.verifyCodeNoTest = true;
          return;
        }
        this.regist();
      }
    },
    regist() {
      let formData = {
        phone: this.form.phone,
        invite_code: this.form.invitationCode,
        code: this.form.verifyCode,
        type: "2"
      };
      this.$api.user
        .register(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            // resData = {
            //   authorize: {
            //     exp: 1588319874,
            //     iat: 1587715074,
            //     nbf: 1587715074,
            //     token:
            //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6IiIsImF1ZCI6ImxvY2FsaG9zdCIsImp0aSI6IiJ9.eyJpc3MiOiIiLCJhdWQiOiJsb2NhbGhvc3QiLCJqdGkiOiIiLCJpYXQiOjE1ODc3MTUwNzQsIm5iZiI6MTU4NzcxNTA3NCwiZXhwIjoxNTg4MzE5ODc0LCJyb2xlIjoiYnVzaW5lc3MiLCJiaWQiOjIsImJ0b2tlbiI6Ijk2OTJlZmQyMTdiNzg1ZGM3ZGE2NWIxN2NiYWUyYmM0IiwibmFtZSI6IjE3NjkxMzQ4NDU5IiwicGhvbmUiOiIxNzY5MTM0ODQ1OSJ9._FyJfuzNhCKKZGT974kLvCu7WQ2s25LjN-u8yBntJS4"
            //   },
            //   btoken: "9692efd217b785dc7da65b17cbae2bc4",
            //   name: "17691348459",
            //   phone: "17691348459"
            // };
            this.$message.success("注册成功！");
          } else {
            this.$message.waring(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetPasswordHandle() {
      this.resetFomrRule();
      if (!this.testPhone(this.form.phone)) {
        this.formRule.phoneNoTest = true;
        return;
      }
      if (!this.form.verifyCode) {
        this.formRule.verifyCodeNoTest = true;
        return;
      }
      if (this.form.newPassword !== this.form.confirmPassword) {
        this.formRule.confirmPasswordNoTest = true;
        return;
      };
      let formData = {
        name: this.form.phone,
        code: this.form.verifyCode,
        password: this.form.newPassword
      };
      this.$api.user
        .resetPassword(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success("密码重置成功！");
          } else {
            this.$message.waring(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });

    },
    loginHandle() {
      // 登录手柄
      this.resetFomrRule();
      if (this.pageType == "accountLogin") {
        // 账号登录
        if (!this.form.account) {
          this.formRule.accountNoTest = true;
          return;
        }
        if (!this.form.password) {
          this.formRule.passwordNoTest = true;
          return;
        }
        this.verifyType = "login";
        this.showVerifyDialog = true;
      } else if (this.pageType == "smsLogin") {
        if (!this.testPhone(this.form.phone)) {
          this.formRule.phoneNoTest = true;
          return;
        }
        if (!this.form.verifyCode) {
          this.formRule.verifyCodeNoTest = true;
          return;
        }
        this.login();
      } else if (this.pageType == "bindPhone") {
        if (!this.testPhone(this.form.phone)) {
          this.formRule.phoneNoTest = true;
          return;
        }
        if (!this.form.verifyCode) {
          this.formRule.verifyCodeNoTest = true;
          return;
        }
        if (this.requireInvitationCode && !this.form.invitationCode) {
          this.formRule.invitationCodeMust = true;
          return;
        }
        this.login();
      }
    },
    login() {
      let formData = {};
      if(this.pageType == "smsLogin") {
        // 短信登录
        formData = {
          name: this.form.phone,
          type: '2',
          password: this.form.verifyCode
        } 
      } else if (this.pageType == "accountLogin") {
        // 密码
        formData = {
          name: this.form.account,
          type: '1',
          password: this.form.password
        }
      };

      this.$api.user
        .login(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            this.$message.success("登录成功！");
            let userInfo = {
              name: resData.name,
              phone: resData.phone,
              btoken: resData.btoken
            };
            let userToken = resData.authorize.token;
            Cookies.set("userInfo", userInfo);
            Cookies.set("userToken", userToken);
            this.$router.push("/platform");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
      // this.$api.user.login().then(res => {
      //   if (res.data.code === 0) {
      //     let resData = res.data.data;
      //     Cookies.set("userToken", resData.userToken);
      //     Cookies.set("userRoles", AesEncrypt(JSON.stringify(resData.roles)));
      //     Cookies.set("userInfo", resData.userInfo);
      //     Cookies.set("storeToken", resData.storeToken);
      //     this.$message.success("登录成功！");
      //     this.$router.push("/platform");
      //   } else {
      //     this.$message.warning("登录失败！");
      //   }
      // });
    },
    verifySuccess(val) {
      // 图形验证成功
      this.showVerifyDialog = false;
      if (val == "sendRegistCode") {
        this.startCodeLater();
        this.getRegistCode();
      } else if (val == "sendLoginCode") {
        // 获取登录验证码
        this.startCodeLater();
        this.getLoginCode();
      } else if (val == "sendRePwdCode") {
        // 忘记密码 验证码
        this.startCodeLater();
        this.getRePwdCode();
      } else if (val == "login") {
        this.login();
      }
    },
    addCustomerHandle() {
      this.customerDialog = true;
    },
    startCodeLater() {
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
    getRegistCode() {
      // 手机号注册 获取 验证码
      let formData = {
        phone: this.form.phone
      };
      this.$api.user
        .sendRegisterCode(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success("短信验证码发送成功！");
          } else {
            this.$message.error("短信验证码发送失败！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLoginCode() {
      // 手机号登录 获取 验证码
      let formData = {
        name: this.form.phone
      };
      this.$api.user
        .sendLoginCode(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success("短信验证码发送成功！");
          } else {
            this.$message.error("短信验证码发送失败！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRePwdCode() {
      // 找回密码 验证码
      let formData = {
        name: this.form.phone
      };
      this.$api.user
        .sendRePwdCode(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success("短信验证码发送成功！");
          } else {
            this.$message.error("短信验证码发送失败！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //验证时间倒计时
    getCodeText: function() {
      // 更新发送验证码按钮文字
      if (this.sendCodeTime > 0) {
        return this.sendCodeTime + "s后获取";
      }
    },
    closeVerifyDialog() {
      this.showVerifyDialog = false;
    },
    resetFomrRule() {
      this.formRule = {
        phoneRegistered: false, // 手机号已注册
        phoneNoTest: false, // 手机号格式不正确
        verifyCodeNoTest: false, // 验证码错误
        accountNoTest: false, // 账号不能为空
        passwordNoTest: false, // 密码不能为空
        passwordError: false, // 密码错误
        confirmPasswordNoTest: false, // 确认密码不一致
        invitationCodeInvalid: false, // 邀请码无效
        invitationCodeLimit: false, // 邀请码已达上限
        invitationCodeMust: false, // 该手机号未注册，需输入邀请码
        invitationCodeNoMust: false // 该手机号已注册，无需输入邀请码
      };
    },
    testPhone(phone) {
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style>
@import url("./style/login.min.css");
</style>