<template>
  <div class="demo">
    <el-row>
      <el-col :span="12"
              style="padding:10px;display:flex">
        <div style="width:120px">输入框1：</div>
        <el-input v-model.trim="toggleCase.test1"
                  :oninput="inputCaseWrite(0, 'test1')"
                  autocomplete="off"
                  size="mini">
          <template slot="prefix">
            <el-tooltip class="item"
                        effect="dark"
                        content="勾写此项可转大写"
                        placement="top-start">
              <el-checkbox label=""
                           v-model="fieldObj[0].check"
                           @change="changeCaseWrite(0, 'test1')"></el-checkbox>
            </el-tooltip>
          </template>
        </el-input>
      </el-col>
      <el-col :span="12"
              style="padding:10px;display:flex">
        <div style="width:120px">输入框2：</div>
        <el-input v-model.trim="toggleCase.test2"
                  :oninput="inputCaseWrite(1, 'test2')"
                  autocomplete="off"
                  size="mini">
          <template slot="prefix">
            <el-tooltip class="item"
                        effect="dark"
                        content="勾写此项可转大写"
                        placement="top-start">
              <el-checkbox label=""
                           v-model="fieldObj[1].check"
                           @change="changeCaseWrite(1, 'test2')"></el-checkbox>
            </el-tooltip>
          </template>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toggleCase: {
        test1: '',
        test2: ''
      },
      fieldObj: [
        { test1: '', check: false },
        { test2: '', check: false }
      ]
    }
  },
  methods: {
    inputCaseWrite (index, Field, v) {
      if (
        this.toggleCase[Field] &&
        this.toggleCase[Field] !== this.toggleCase[Field].toUpperCase()
      ) {
        // 输入框改变储存
        this.fieldObj[index][Field] = this.toggleCase[Field]
      }
      if (this.fieldObj[index].check === true) {
        // 勾选直接改变
        if (this.toggleCase[Field]) {
          this.toggleCase[Field] = this.toggleCase[Field].toUpperCase()
        }
      }
    },
    changeCaseWrite (index, Field) {
      if (this.fieldObj[index].check === true) {
        // 直接转换大写
        if (this.toggleCase[Field]) {
          this.toggleCase[Field] = this.toggleCase[Field].toUpperCase()
        }
      } else if (this.fieldObj[index].check === false) {
        if (this.toggleCase[Field] !== '' && this.toggleCase[Field]) {
          this.toggleCase[Field] = this.fieldObj[index][Field]
            ? this.fieldObj[index][Field]
            : null
        }
      }
    }
  }
}
</script>
<style lang="scss">
.el-input__prefix,
.el-input__suffix {
  top: 6px;
}
.demo {
  width: 100%;
}
</style>
