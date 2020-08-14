<template>
  <el-menu :default-active="activeIndex"
           class="el-menu-demo"
           mode="horizontal"
           @select="handleSelect"
           background-color="#303133"
           text-color="#fff"
           style="padding:0 124px"
           active-text-color="#409EFF">
    <template v-for="(item,first) in navMenuList">
      <!-- 一层——开始 -->
      <template v-if="!item.subset">
        <el-menu-item :index="item.address"
                      :key="first">{{item.title}}</el-menu-item>
      </template>
      <!-- 一层——结束 -->
      <!-- 多级一层——开始 -->
      <template v-if="item.subset">
        <el-submenu :index="item.address"
                    :key="first">
          <template slot="title">{{item.title}}</template>
          <template v-for="(i,second) in item.subset">
            <!-- 二层——开始 -->
            <template v-if="!i.subset">
              <el-menu-item :key="second"
                            :index="i.address">
                {{i.title}}
              </el-menu-item>
            </template>
            <!-- 二层——结束 -->
            <!-- 多级二层——开始 -->
            <template v-if="i.subset">
              <el-submenu :index="i.address"
                          :key="second">
                <template slot="title">{{i.title}}</template>
                <!-- 三层——开始 -->
                <el-menu-item v-for="(j,third) in i.subset"
                              :key="third"
                              :index="j.address">
                  {{j.title}}
                </el-menu-item>
              </el-submenu>
              <!-- 三层——结束 -->
            </template>
            <!-- 多级二层——结束 -->
          </template>
        </el-submenu>
      </template>
      <!-- 多级一层——结束 -->
    </template>
  </el-menu>
</template>
<script>
export default {
  data () {
    return {
      // 初始菜单位置
      activeIndex: '/home',
      navMenuList: [
        { title: '首页', address: '/home' },
        {
          title: '我的工作台',
          address: '/workingTable',
          subset: [
            {
              title: '项目地址',
              address: '/projectAddress',
              subset: [
                { title: '深圳市大创科技信息有限公司', address: 'http://www.dachuangtech.com/#/meeting' },
                { title: '国泰通门户', address: 'http://dc.sinotraffic.cn/agent/index.html' },
                { title: '深圳市华讯方舟企业服务有限公司', address: 'http://www.cct-hbs.com' }
              ]
            }
          ]
        },
        {
          title: 'UI',
          address: '/uiAddress',
          subset: [
            { title: 'VUE', address: 'https://cn.vuejs.org/' },
            { title: 'Element', address: 'https://element.eleme.cn/#/zh-CN/component/installation' },
            { title: 'Echarts', address: 'https://echarts.apache.org/examples/zh/index.html' }
          ]
        },
        {
          title: '论坛',
          address: '/forumAddress',
          subset: [
            { title: '思否', address: 'https://segmentfault.com/channel/frontend' }
          ]
        }
      ]
    }
  },
  computed: {
    // 展示iframe页面数据
    navMenu: {
      get () {
        return this.$store.state.common.navMenu
      },
      set (val) {
        this.$store.commit('common/updateNavMenu', val)
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key.indexOf('http:') !== -1 || key.indexOf('https:') !== -1) {
        this.$router.push({ path: '/' })
        this.$nextTick(() => {
          this.$router.push({ name: 'repository', query: { url: key } })
        })
        this.navMenu = {
          key: key,
          keyPath: keyPath,
          iframeSrc: key
        }
      } else {
        this.navMenu = {
          key: '',
          keyPath: '',
          iframeSrc: ''
        }
        this.$router.push({ path: key, query: {} })
      }
    }
  }
}
</script>
