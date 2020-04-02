<template>
  <div class="home">
    <template v-if="!isMobile">
      <header class="page-header">
        <!-- 登录注册按钮 start -->
        <div class="btn-box clearfix">
          <div class="btn-item">
            <button class="btn white-btn" @click="regist">注册</button>
          </div>
          <div class="btn-item login" @mouseenter="mouseoverHandle" @mouseleave="mouseoutHandle">
            <button class="btn blue-btn">登录</button>
            <transition name="el-zoom-in-top">
              <ul class="dropdown-list" v-show="showDropdown">
                <li class="item">
                  <button class="btn blue-btn" @click="toNewPlatform">登录新平台</button>
                </li>
                <li class="item">
                  <button class="btn blue-btn" @click="toOldPlatform">登录旧平台</button>
                </li>
              </ul>
            </transition>
          </div>
        </div>
        <!-- 登录注册按钮 end -->
        <!-- 头部主体 start -->
        <div class="header-cont">
          <div class="header-main">
            <div class="info">
              <h1 class="title">星辰小程序</h1>
              <p class="details">为企业建立全面、有效的用户运营体系，助力企业连接用户。</p>
              <button class="open-btn" @click="regist">立即开通</button>
            </div>
            <div id="headerAxial3d" class="axial-img"></div>
          </div>
        </div>

        <!-- 头部主体 end -->
      </header>
      <!-- 头部区域 end -->
      <div class="main">
        <!-- 积分运营 start -->
        <div class="integral">
          <div id="integralAxial3d" class="axial-img"></div>
          <div class="info">
            <h1 class="title">积分运营</h1>
            <h2 class="sub-title">一站式积分运营解决方案</h2>
            <div class="details">
              <p class="details-item">一键创建积分商城</p>
              <p class="details-item">一键创建积分商城</p>
              <p class="details-item">促进用户存留增长</p>
              <p class="details-item">权益商品无限供应</p>
            </div>
          </div>
        </div>
        <!-- 积分运营 end -->
        <!-- 互动营销 start -->
        <div class="interact">
          <div class="info">
            <h1 class="title">互动营销</h1>
            <h2 class="sub-title">解决营销活动所有问题</h2>
            <div class="details">
              <p class="details-item">玩转用户运营</p>
              <p class="details-item">促进裂变增长</p>
              <p class="details-item">助力品牌宣传</p>
              <p class="details-item">提升付费转化</p>
            </div>
          </div>
          <div id="interactAxial3d" class="axial-img"></div>
        </div>
        <!-- 互动营销 end -->
        <!-- 定制服务 start -->
        <div class="custom">
          <div id="customAxial3d" class="axial-img"></div>
          <div class="info">
            <h1 class="title">定制服务</h1>
            <h2 class="sub-title">以更低的成本，更高的效率，满足企业个性化需求。</h2>
            <div class="details">
              <p class="details-item">全套页面自定义</p>
              <p class="details-item">企业其他系统无缝打通</p>
              <p class="details-item">微营销工具定制</p>
              <p class="details-item">一站式服务和资源支持</p>
            </div>
          </div>
        </div>
        <!-- 定制服务 end -->
        <!-- 星辰助力企业连接用户 start -->
        <div class="assist">
          <h1 class="title">星辰助力企业连接用户</h1>
          <button class="open-btn" @click="regist">立即开通</button>
          <div id="assistAxial3d" class="axial-img"></div>
        </div>
        <!-- 星辰助力企业连接用户 end -->
        <!-- 合作伙伴 start -->
        <div class="partners">
          <div class="partners-cont">
            <div class="title">和他们一起使用星辰</div>
            <div class="partners-list">
              <div
                class="item"
                style="background-image: url('https://cdn.xingchen.cn/FmV8aRhOt6kq7G_DuF_lHaSdaLHn');"
              ></div>
              <div
                class="item"
                style="background-image: url('https://cdn.xingchen.cn/Fvs9SMfbg4NixCIqdrfM8WGg7YkQ');"
              ></div>
              <div
                class="item"
                style="background-image: url('https://cdn.xingchen.cn/Ft9CszmpadEzzMSX0mirYS-J4D-p');"
              ></div>
              <div
                class="item"
                style="background-image: url('https://cdn.xingchen.cn/FiApuprqjvRnJV91Jn7TRWcHnSmG');"
              ></div>
              <div
                class="item"
                style="background-image: url('https://cdn.xingchen.cn/FrndCkjSiStYOeNaKxlRo8G2OZ_C');"
              ></div>
              <div
                class="item"
                style="background-image: url('https://cdn.xingchen.cn/FlSEWh1zy6b-RNaHuBYa8gKWAR2C');"
              ></div>
              <div
                class="item"
                style="background-image: url('https://cdn.xingchen.cn/FgXYNFC5GJaxHg4Gm7JlWHnmr5v-');"
              ></div>
              <div
                class="item"
                style="background-image: url('https://cdn.xingchen.cn/FqPC2FJHKbUC4_hiCLa0Sab6riCA');"
              ></div>
            </div>
          </div>
        </div>
        <!-- 合作伙伴 end -->
      </div>
      <footer class="page-footer">
        <div class="footer-cont">
          <div>
            <div class="item">
              <img src="https://cdn.xingchen.cn/FhhpPJPPeX_7a2-HRYe-zJxozH59" alt />
              <a href="tel:029-85576630">座机：029-85576630</a>
            </div>
            <div class="item" style="margin-top: 5px">
              <img src="https://cdn.xingchen.cn/FhmUqQUpmRIo2VOHprdHd_hQ9g_B" alt />
              <a href="tel:18109211262">电话：181-0921-1262</a>
            </div>
          </div>

          <div class="item-map">
            <div style="color: #fff">陕西省西安市曲江新区翠华路1688号曲江创客大街20层2004室</div>
          </div>
          <div class="item">
            <a href>西安星辰云计算有限公司 陕ICP备19007242号-3</a>
          </div>
          <div class="code">
            <img class="code_img" src="https://cdn.xingchen.cn/FnRuyABZkq9Sl8OGYzd5Qh3XAKC2" alt />
            <img class="icon" src="https://cdn.xingchen.cn/FrnrcKzvlLR_xgxaYc4vzdcqLrE5" alt />
          </div>
        </div>
      </footer>
    </template>
    <template v-else>
      <div class="mobile">
        <header class="page-header">
          <!-- 头部主体 start -->
          <div class="header-cont">
            <div class="header-main">
              <div class="info">
                <h1 class="title">星辰小程序</h1>
                <p class="details">为企业建立全面、有效的用户运营体系，助力企业连接用户。</p>
                <button class="open-btn" @click="regist">立即开通</button>
              </div>
            </div>
          </div>
          <!-- 头部主体 end -->
        </header>
        <!-- 头部区域 end -->
        <div class="main">
          <!-- 积分运营 start -->
          <div class="integral">
            <div class="info">
              <h1 class="title">积分运营</h1>
              <h2 class="sub-title">一站式积分运营解决方案</h2>
              <div class="details">
                <p class="details-item">一键创建积分商城</p>
                <p class="details-item">一键创建积分商城</p>
                <p class="details-item">促进用户存留增长</p>
                <p class="details-item">权益商品无限供应</p>
              </div>
            </div>
            <div class="axial-img">
              <img src="https://qiniu.xingchen.cn/FriS69lzHIy3T1dAkUri0s2Gasz2" alt class="img" />
            </div>
          </div>
          <!-- 积分运营 end -->
          <!-- 互动营销 start -->
          <div class="interact">
            <div class="info">
              <h1 class="title">互动营销</h1>
              <h2 class="sub-title">解决营销活动所有问题</h2>
              <div class="details">
                <p class="details-item">玩转用户运营</p>
                <p class="details-item">促进裂变增长</p>
                <p class="details-item">助力品牌宣传</p>
                <p class="details-item">提升付费转化</p>
              </div>
            </div>
            <div class="axial-img">
              <img src="https://cdn.xingchen.cn/FtSqOyqSWKVRGlNtM3P15YKMAWaK" alt class="img" />
            </div>
          </div>
          <!-- 互动营销 end -->
          <!-- 定制服务 start -->
          <div class="custom">
            <div class="info">
              <h1 class="title">定制服务</h1>
              <h2 class="sub-title">以更低的成本，更高的效率，满足企业个性化需求。</h2>
              <div class="details">
                <p class="details-item">全套页面自定义</p>
                <p class="details-item">企业其他系统无缝打通</p>
                <p class="details-item">微营销工具定制</p>
                <p class="details-item">一站式服务和资源支持</p>
              </div>
            </div>
            <div class="axial-img">
              <img src="https://cdn.xingchen.cn/FtYfxBis3KNMSh9zut-SZlCIbGzR" alt class="img" />
            </div>
          </div>
          <!-- 定制服务 end -->
          <!-- 星辰助力企业连接用户 start -->
          <div class="assist">
            <h1 class="title">星辰助力企业连接用户</h1>
            <button class="open-btn" @click="regist">立即开通</button>
            <div class="axial-img">
              <img src="https://cdn.xingchen.cn/FpEK4wMZgtNS8kqaEsD05dmGVC_a" alt class="img" />
            </div>
          </div>
          <!-- 星辰助力企业连接用户 end -->
          <!-- 合作伙伴 start -->
          <div class="partners">
            <div class="partners-cont">
              <div class="title">和他们一起使用星辰</div>
              <div class="partners-list">
                <div
                  class="item"
                  style="background-image: url('https://cdn.xingchen.cn/FmV8aRhOt6kq7G_DuF_lHaSdaLHn');"
                ></div>
                <div
                  class="item"
                  style="background-image: url('https://cdn.xingchen.cn/Fvs9SMfbg4NixCIqdrfM8WGg7YkQ');"
                ></div>
                <div
                  class="item"
                  style="background-image: url('https://cdn.xingchen.cn/Ft9CszmpadEzzMSX0mirYS-J4D-p');"
                ></div>
                <div
                  class="item"
                  style="background-image: url('https://cdn.xingchen.cn/FiApuprqjvRnJV91Jn7TRWcHnSmG');"
                ></div>
                <div
                  class="item"
                  style="background-image: url('https://cdn.xingchen.cn/FrndCkjSiStYOeNaKxlRo8G2OZ_C');"
                ></div>
                <div
                  class="item"
                  style="background-image: url('https://cdn.xingchen.cn/FlSEWh1zy6b-RNaHuBYa8gKWAR2C');"
                ></div>
                <div
                  class="item"
                  style="background-image: url('https://cdn.xingchen.cn/FgXYNFC5GJaxHg4Gm7JlWHnmr5v-');"
                ></div>
                <div
                  class="item"
                  style="background-image: url('https://cdn.xingchen.cn/FqPC2FJHKbUC4_hiCLa0Sab6riCA');"
                ></div>
              </div>
            </div>
          </div>
          <!-- 合作伙伴 end -->
        </div>
      </div>
      <div class="p_footer">
        <div class="desc">
          <div class="item">
            <img src="https://cdn.xingchen.cn/FhhpPJPPeX_7a2-HRYe-zJxozH59" alt />
            <a href="tel:029-85576630">座机：029-85576630</a>
          </div>
          <div class="item">
            <img src="https://cdn.xingchen.cn/FhmUqQUpmRIo2VOHprdHd_hQ9g_B" alt />
            <a href="tel:18109211262">电话：181-0921-1262</a>
          </div>
          <div class="item">
            <!-- <img src="./picture/dizhi.png" alt=""> -->
            陕西省西安市曲江新区翠华路1688号曲江创客大街20层2004室
          </div>
        </div>
        <div class="code">
          <img class="code_img" src="https://cdn.xingchen.cn/FnRuyABZkq9Sl8OGYzd5Qh3XAKC2" alt />
          <div>微信公众号</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axial3d from "axial3d";
export default {
  name: "Home",
  data() {
    return {
      isMobile: false, // 是否为移动设备
      showDropdown: false, // 登录 下拉
      customAxial3dEl: null, // 定制服务
      assistAxial3dEl: null, // 星辰助力企业连接用户
      headerAxial3dEL: null,
      integralAxial3dEL: null,
      interactAxial3dEL: null
    };
  },
  components: {
    axial3d
  },
  created() {
    this.isMobileHandle()
  },
  mounted() {
    let documentWidth = document.body.offsetWidth;
    if (documentWidth >= 1280) {
      this.headerAxial3d();
      this.integralAxial3d();
      this.interactAxial3d();
      this.customAxial3d(); // 定制服务
      this.assistAxial3d(); // 星辰助力企业连接用户
    }
    window.onresize = () => {
      this.isMobileHandle()
    }
  },
  methods: {
    isMobileHandle() {
      let documentWidth = document.body.offsetWidth;
      if (documentWidth >= 1280) {
        this.isMobile = false;
      } else {
        this.isMobile = true;
      }
    },
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
    regist() {
      this.$router.push({
        path: "/login",
        query: {
          type: "regist"
        }
      });
    },
    toNewPlatform() {
      this.$router.push({
        path: "/login",
        query: {
          type: "login"
        }
      });
    },
    toOldPlatform() {
      window.location.href = "https://www.xingchen.cn/v1";
    },
    headerAxial3d() {
      this.headerAxial3dEL = null;
      let option = {
        selector: "#headerAxial3d",
        swing: 6,
        imgs: [
          {
            src: "https://cdn.xingchen.cn/Fll6rYXYULJad1T_7B6oS7cpSI7J",
            left: "0px",
            top: "81px",
            zIndex: 1
          },
          {
            src: "https://cdn.xingchen.cn/Fu0x2q5DJ5rZ5QdXQK1Hi6OZwrZM",
            left: "120px",
            top: "669px",
            zIndex: 1,
            static: true
          },
          {
            src: "https://cdn.xingchen.cn/Ft_CPsybAukUEOiJ7AUpARfxtCO1",
            left: "32px",
            top: "271px",
            zIndex: 2
          },
          {
            src: "https://cdn.xingchen.cn/FtXn0g-OcOZZdSVoC0jvEorqwvZc",
            left: "167px",
            top: "149px",
            zIndex: 2
          },
          {
            src: "https://cdn.xingchen.cn/FreMqhRFa7Trm_8CEV-cujTC6MLO",
            left: "182px",
            top: "414px",
            zIndex: 2
          },
          {
            src: "https://cdn.xingchen.cn/FqmighGZ0xq41kjdKNIKVDgP_cvM",
            left: "520px",
            top: "411px",
            zIndex: 2,
            static: true
          },
          {
            src: "https://cdn.xingchen.cn/FotkWja6zPOKafF8cfS8cGUstcER",
            left: "298px",
            top: "124px",
            zIndex: 3
          }
        ]
      };
      this.headerAxial3dEL = new Axial3d(option);
    },
    integralAxial3d() {
      this.integralAxial3dEL = null;
      let option = {
        selector: "#integralAxial3d",
        transform: "rotate",
        imgs: [
          {
            src: "https://qiniu.xingchen.cn/FriS69lzHIy3T1dAkUri0s2Gasz2",
            left: "0px",
            top: "0px",
            zIndex: 1
          }
        ]
      };
      this.integralAxial3dEL = new Axial3d(option);
    },
    interactAxial3d() {
      this.interactAxial3dEL = null;
      let option = {
        selector: "#interactAxial3d",
        swing: 3,
        imgs: [
          {
            // src: "https://cdn.xingchen.cn/FtoRxOcgifcLTyDKqw3C6peHrREj",
            src: "https://cdn.xingchen.cn/Fj5WOsr1N1szAWV1fBQv8LyNfHnI",
            left: "0px",
            top: "0px",
            zIndex: 1,
            static: true
          },
          {
            // 左眼
            src: "https://cdn.xingchen.cn/Fl6jQsqZQoB8psBrYkIqgiVq2KSl",
            left: "782px",
            top: "257px",
            zIndex: 2
          },
          {
            // 右眼
            src: "https://cdn.xingchen.cn/FsbO4CLzmHKR7LIP80Xn8K0gRc4Z",
            left: "821px",
            top: "256px",
            zIndex: 2
          },
          {
            src: "https://cdn.xingchen.cn/FrcAm79tLU0kNPcuUNRKvqeYYgFc",
            left: "880px",
            top: "-108px",
            zIndex: 2
          },
          {
            src: "https://cdn.xingchen.cn/FrUzKg6fjarl_4YhGFXam3vyGjI2",
            left: "437px",
            top: "0px",
            zIndex: 2
          }
        ]
      };
      this.interactAxial3dEL = new Axial3d(option);
    },
    customAxial3d() {
      this.customAxial3dEl = null;
      let option = {
        selector: "#customAxial3d",
        imgs: [
          {
            src: "https://cdn.xingchen.cn/FqVZQKJlIq58oNk-1MukTpUf69Tw",
            left: "527px",
            top: "349px",
            zIndex: 1
          },
          {
            src: "https://cdn.xingchen.cn/Fr3h2yPVPbPK-SNkSCdHPjjDx8wS",
            left: "454px",
            top: "102px",
            zIndex: 2
          },
          {
            src: "https://cdn.xingchen.cn/FnilsegpJ3f4PQiypafOPLWmG18x",
            left: "175px",
            top: "103px",
            zIndex: 3
          }
        ]
      };
      this.customAxial3dEl = new Axial3d(option);
    },
    assistAxial3d() {
      this.assistAxial3dEl = null;
      let option = {
        selector: "#assistAxial3d",
        imgs: [
          {
            src: "https://cdn.xingchen.cn/Fhpx-ayEO09wCGYeXoXcJlaAf9bp",
            left: "19px",
            top: "10px",
            zIndex: 1
          },
          {
            src: "https://cdn.xingchen.cn/FlDK6Udg7xMffqdMJvJSo7VxKkOO",
            left: "218px",
            top: "34px",
            zIndex: 1
          },
          {
            src: "https://cdn.xingchen.cn/Fg95fo2tkbM2WRlYLGhfaWTyy7bL",
            left: "457px",
            top: "177px",
            zIndex: 1
          },
          {
            src: "https://cdn.xingchen.cn/FqAwwlgSYMY5SDVR2UBjxOSS9h7b",
            left: "0px",
            top: "248px",
            zIndex: 2,
            static: true
          },
          {
            src: "https://cdn.xingchen.cn/FtWlc7Nr67jHWJpBvZQyESJNSS-f",
            left: "416px",
            top: "0px",
            zIndex: 2
          },
          {
            src: "https://cdn.xingchen.cn/Fi3Y-dVj9MvWrmmsrT6oaF64h8xC",
            left: "425px",
            top: "248px",
            zIndex: 2,
            static: true
          },
          {
            src: "https://cdn.xingchen.cn/FmRlHLY29oJ5BcArYQ-Lw8IZtOrs",
            left: "95px",
            top: "53px",
            zIndex: 3
          },
          {
            src: "https://cdn.xingchen.cn/FhK1oDnfY9kKugTMkFSOLRmQ29VH",
            left: "276px",
            top: "142px",
            zIndex: 3
          },
          {
            src: "https://cdn.xingchen.cn/Fsdf1FEz_YScjbHXUoY1lHc-6__S",
            left: "560px",
            top: "46px",
            zIndex: 3
          }
        ]
      };
      this.assistAxial3dEl = new Axial3d(option);
    }
  },
  beforeDestroy() {
    this.headerAxial3dEL.destory();
    this.headerAxial3dEL = null;
    this.integralAxial3dEL.destory();
    this.integralAxial3dEL = null;
    this.interactAxial3dEL.destory();
    this.interactAxial3dEL = null;
    this.customAxial3dEl.destory();
    this.customAxial3dEl = null;
    this.assistAxial3dEl.destory();
    this.assistAxial3dEl = null;
  }
};
</script>

<style>
@import url("./style/home.min.css");
</style>