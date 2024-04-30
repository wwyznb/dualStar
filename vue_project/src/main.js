import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import NPlayer from "@nplayer/vue";
import 'element-ui/lib/theme-chalk/index.css';
//导入 vue-resource
import VueResource from 'vue-resource'

//关闭生产提示
Vue.config.productionTip = false

//使用插件
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(NPlayer)

new Vue({
  render: h => h(App),
  router: router,
  store: store,
  beforeCreate(){
    Vue.prototype.$bus = this
  },
}).$mount('#app')
