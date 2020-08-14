// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import el from 'element-ui'
import vuedraggable from 'vuedraggable'
import 'element-ui/lib/theme-chalk/index.css'
import cloneDeep from 'lodash/cloneDeep'
import echarts from 'echarts'

Vue.use(el, { size: 'mini', zIndex: 10000 })
Vue.use(echarts)
Vue.use(vuedraggable)
Vue.use(cloneDeep)
Vue.config.productionTip = false

// 挂载全局
Vue.prototype.$echarts = echarts
Vue.prototype.$message = el.Message
Vue.prototype.$loading = el.Loading.service

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
