import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/index'
import repository from '@/components/repository'
import toggleCase from '@/components/toggleCase'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: home
    },
    {// 首页
      path: '/home',
      name: 'home',
      component: home
    },
    {// iframe
      path: '/repository',
      name: 'repository',
      component: repository
    },
    {// 大小写转换
      path: '/toggleCase',
      name: 'toggleCase',
      component: toggleCase
    }
  ],
  mode: 'history'
})

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
