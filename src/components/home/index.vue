<template>
  <div :class="{drag:dragging}"
       :style="{ 'min-height': documentClientHeight - 105 + 'px' }">
    <div class="layout-container">
      <div :class="key"
           v-for="(item, key) in mainData"
           :key="key">
        <draggable v-bind="dragOptions"
                   class="list-group"
                   :list="item"
                   @end="onEnd"
                   @start="onStart">
          <transition-group name="list">
            <template v-for="(element, index) in item">
              <div :key="index"
                   class="list-group-item">
                <h4 class="drag-handle"
                    style="margin:0">{{ element.title }}</h4>
                <div class="component-box">
                  <component :is="element.name"
                             :ref="element.ref" />
                </div>
              </div>
            </template>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import {
  toggleCase,
  canvasCode
} from './component'

export default {
  components: {
    toggleCase,
    canvasCode,
    draggable
  },
  computed: {
    // 展示iframe页面数据
    documentClientHeight: {
      get () {
        return this.$store.state.common.documentClientHeight
      },
      set (obj) {
        this.$store.commit('common/updateDocumentClientHeight', obj)
      }
    },
    dragOptions () {
      return {
        animation: 30,
        handle: '.drag-handle',
        group: 'description',
        ghostClass: 'ghost',
        chosenClass: 'sortable',
        forceFallback: true
      }
    }
  },
  data () {
    return {
      dragging: false,
      componentList: [
        { name: 'toggleCase', title: '大写转换', id: 1 },
        { name: 'canvasCode', title: 'canvas唯一标识', id: 2 }
      ],
      layout: {
        left: [1],
        right: [2]
      },
      mainData: {}
    }
  },
  mounted () {
    this.getLayout()
  },
  created () { },
  methods: {
    onStart () {
      this.dragging = true
    },
    onEnd () {
      this.dragging = false
      this.setLayout()
    },
    getLayout () {
      // 获取本地缓存
      let obj = JSON.parse(window.localStorage.getItem('kon')) || {}
      let myLayout = {}
      if (Object.keys(obj).length !== 0 && (obj.left.length + obj.right.length) === (this.layout.left.length + this.layout.right.length)) {
        myLayout = obj// 首页组件个数：缓存 === 代码 => 以缓存排序为准(避免组件添加,与本地缓存不一致而报错)
      } else {
        myLayout = this.layout// 首页组件个数：缓存 !== 代码 => 以代码排序为准
      }
      const newLayout = {}
      for (const side in myLayout) {
        newLayout[side] = myLayout[side].map(i => {
          return this.componentList.find(c => c.id === i)
        })
      }
      this.mainData = newLayout
    },
    setLayout () {
      const res = {}
      for (const side in this.mainData) {
        const item = this.mainData[side].map(i => i.id)
        res[side] = item
      }
      window.localStorage.setItem('kon', JSON.stringify(res))
    }
  }
}
</script>
<style lang="scss" >
.layout-container {
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: #dcdfe6;
  .left {
    width: 60%;
    height: 100%;
    margin-right: 20px;
  }
  .right {
    width: 40%;
    height: 100%;
  }
  .list-group-item {
    margin-bottom: 20px;
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
  }
  .component-box {
    width: 100%;
    padding: 20px;
  }
  .drag-handle {
    cursor: move;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    padding: 0 20px;
    background: #fff;
  }
  h4 {
    padding: 8px 0;
    box-shadow: 0px 1px 0px 0px rgba(232, 232, 232, 1);
    color: #0068b7;
    font-family: PingFangSC-Medium;
    font-weight: 500;

    &:before {
      content: "";
      display: inline-block;
      width: 3px;
      height: 16px;
      margin: 12px 6px 0 11px;
      background: #0068b7;
      vertical-align: top;
    }
  }
}
.drag {
  height: 100%;
  width: 100%;
  display: flex;
  .component-box {
    display: none;
  }
}

.list-enter-active {
  transition: all 0.3s linear;
}
.list-enter,
.list-leave-to {
  opacity: 0.5;
}

.sortable {
  .component-box {
    display: none;
    height: 0;
  }
}
.list-group {
  > span {
    display: block;
    min-height: 20px;
  }
}

.ghost {
  .drag-handle {
    background: rgb(129, 168, 187);
  }
}
</style>
