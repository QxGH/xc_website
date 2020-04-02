import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import routerBeforeEach from '@/router/beforeEach'
import api from '@/api'
Vue.prototype.$api = api;

Vue.use(ElementUI);


Vue.config.productionTip = false

/* Router 全局前置守卫 */
router.beforeEach(routerBeforeEach)


new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app')
