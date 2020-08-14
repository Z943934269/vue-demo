<template>
  <el-container id="app">
    <el-header style="padding:0;">
      <!-- 菜单栏 -->
      <navMenu></navMenu>
    </el-header>
    <div :class="navMenu.iframeSrc!==''?'iframe':''"
         :style="{'min-height':documentClientHeight-105+'px'}">
      <router-view />
    </div>
  </el-container>
</template>

<script>
import navMenu from '@/components/navMenu'

export default {
  components: {
    navMenu// 头部菜单
  },
  data () {
    return {}
  },
  watch: {
    navMenu: {
      handler (newName, oldName) {
        console.log('watch:', newName, oldName)
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    this.$router.push({ name: 'home' })
    this.navMenu = {
      key: '',
      keyPath: '',
      iframeSrc: ''
    }
  },
  activated () {

  },
  computed: {
    // 展示iframe页面数据
    navMenu: {
      get () {
        return this.$store.state.common.navMenu
      },
      set (obj) {
        this.$store.commit('common/updateNavMenu', obj)
      }
    },
    // 页面高度
    documentClientHeight: {
      get () {
        return this.$store.state.common.documentClientHeight
      },
      set (obj) {
        this.$store.commit('common/updateDocumentClientHeight', obj)
      }
    }
  },
  mounted () {
    this.resetDocumentClientHeight()
  },
  methods: {
    // 重置窗口可视高度
    resetDocumentClientHeight () {
      this.documentClientHeight = document.documentElement['clientHeight']
      window.onresize = () => {
        this.documentClientHeight = document.documentElement['clientHeight']
      }
      console.log('浏览器窗口可视高度', this.documentClientHeight)
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  a {
    color: #ffffff;
    text-decoration: none;
    &:link {
      text-decoration: none;
      color: #ffffff;
    }
    &:visited {
      text-decoration: none;
      color: #ffffff;
    }
    &:hover {
      text-decoration: none;
      color: #ffffff;
    }
    &:active {
      text-decoration: none;
      color: #ffffff;
    }
  }
  h3 {
    font-size: 30px;
    color: #409eff;
  }
}
html,
body {
  background: #dcdfe6;
  min-width: 1280px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style lang="scss" scoped>
#app .iframe {
  background: #303133;
  padding: 20px;
}
</style>
