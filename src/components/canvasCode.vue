<template>
  <div>
    <el-row>
      <el-col :span="24"
              style="padding:0 10px">
        <b>sdk：</b>{{canvasCode}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
import sdk from './utils/sdk'

export default {
  data () {
    return {
      canvasCode: ''
    }
  },
  mounted () {
    this.canvasCode = sdk.getCanvasCode()
  }
}
</script>
