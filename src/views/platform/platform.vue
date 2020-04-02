<template>
  <div class="platform">
    <CommonHeader :ifCreatePlatform="true" @createPlatform="createPlatform"></CommonHeader>
    <div class="page-main">
      <template v-if="platformList.length == 0">
        <div class="create-tips">
          <p class="tips-text">您还为创建平台，请先创建</p>
          <button class="create-tips-btn" @click="createPlatform">创建平台</button>
        </div>
      </template>
      <template v-else>
        <div class="platform-list">
          <div class="platform-list-main">
            <div class="search-box" v-windowClick="windowClick">
              <transition>
                <el-input
                  @keyup.enter.native="searchHandle"
                  class="search-input"
                  :style="{width: showSearchInput ? '220px' : '40px', opacity: showSearchBtn ? '1' : '0'}"
                  placeholder="请输入内容"
                  v-model="searchValue"
                >
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </transition>
              <button class="search-btn" @click.stop="showSearchHandle" v-show="!showSearchBtn">
                <i class="el-icon-search search-icon"></i>
              </button>
            </div>
            <el-row :gutter="20">
              <template v-for="(item, index) in platformList">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" :key="index">
                  <div class="platform-item">
                    <div
                      class="platform-img"
                      :class="{'imgRotate': imgRotateIndex === index}"
                      @dblclick="platformImgDbclick(index)"
                    >
                      <img :src="item.img" alt class="img" />
                    </div>
                    <div class="platform-info">
                      <p class="platform-name">{{item.name}}</p>
                      <p class="platform-date">创建时间：{{item.date}}</p>
                    </div>
                  </div>
                </el-col>
              </template>
            </el-row>
          </div>
        </div>
      </template>
    </div>
    <el-dialog title="创建平台" :visible.sync="createPlatformDialog" width="480px" center>
      <div class="dialog-body">
        <el-form :model="form" :rules="rules" ref="createPlatformDialog" label-width="80px">
          <el-form-item label="平台名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createPlatformDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmCreate">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="平台信息" :visible.sync="platformInfoDialog" width="30%">
      <span>平台信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="platformInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="platformInfoDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CommonHeader from "@/components/common_header";
export default {
  name: "Platform",
  components: {
    CommonHeader
  },
  data() {
    return {
      showSearchInput: false,
      showSearchBtn: false,
      closeSearchLater: null, // 关闭搜索框定时器
      searchValue: "",
      imgRotateIndex: "", // 双击 平台图片 添加动画的 index
      imgRotateIndexLater: null,
      platformInfoDialog: false,  // 平台信息 弹窗
      platformList: [
        {
          img: "https://cdn.xingchen.cn/FkF2bvcCIkb2CvMMkVQzLMIsTVlV",
          name: "平台名称",
          date: "2020-12-25"
        },
        {
          img: "https://cdn.xingchen.cn/FkF2bvcCIkb2CvMMkVQzLMIsTVlV",
          name: "平台名称",
          date: "2020-12-25"
        },
        {
          img: "https://cdn.xingchen.cn/FkF2bvcCIkb2CvMMkVQzLMIsTVlV",
          name: "平台名称",
          date: "2020-12-25"
        },
        {
          img: "https://cdn.xingchen.cn/FkF2bvcCIkb2CvMMkVQzLMIsTVlV",
          name: "平台名称",
          date: "2020-12-25"
        }
      ],
      createPlatformDialog: false,
      form: {
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入平台名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    windowClick() {
      this.showSearchInput = false;
      this.closeSearchLater = setTimeout(() => {
        this.showSearchBtn = false;
        clearTimeout(this.closeSearchLater);
        this.closeSearchLater = null;
      }, 500);
    },
    platformImgDbclick(index) {
      this.imgRotateIndex = index;
      this.imgRotateIndexLater = setTimeout(() => {
        this.platformInfoDialog = true;
        this.imgRotateIndex = "";
        clearTimeout(this.imgRotateIndexLater);
        this.imgRotateIndexLater = null;
      }, 800);
    },
    showSearchHandle() {
      this.showSearchInput = true;
      this.showSearchBtn = true;
    },
    searchHandle() {
      this.$message.success("search");
    },
    createPlatform() {
      this.createPlatformDialog = true;
    },
    confirmCreate() {
      this.$refs["createPlatformDialog"].validate(valid => {
        if (valid) {
          this.$message.success("success");
        } else {
          return false;
        }
      });
    }
  },
  directives: {
    windowClick: {
      // 初始化指令
      bind(el, binding, vnode) {
        function documentHandler(e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false;
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
          }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      update() {},
      unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    }
  },
  beforeDestroy() {
    // 清除 搜索框 定时器
    if (this.closeSearchLater) {
      clearTimeout(this.closeSearchLater);
      this.closeSearchLater = null;
    }
    if (this.imgRotateIndexLater) {
      clearTimeout(this.imgRotateIndexLater);
      this.imgRotateIndexLater = null;
    }
  }
};
</script>

<style>
@import url("./style/platform.min.css");
</style>