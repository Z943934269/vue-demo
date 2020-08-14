<template>
  <div>
    <iframe :src="navMenu.iframeSrc"
            ref="iframe"
            width="100%"
            :style="{'min-height':documentClientHeight-105+'px'}"
            style="border-radius: 10px;border:2px #fff solid"
            frameborder="0"
            scrolling="auto">
    </iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {}
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
  methods: {}
}
</script>
