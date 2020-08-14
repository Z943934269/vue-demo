export default {
  namespaced: true,
  state: {
    // 展示iframe页面数据
    navMenu: {
      key: '',
      keyPath: '',
      iframeSrc: ''
    },
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0
  },
  mutations: {
    updateNavMenu (state, navMenu) {
      state.navMenu = navMenu
    },
    updateDocumentClientHeight (state, documentClientHeight) {
      state.documentClientHeight = documentClientHeight
    }
  }
}
