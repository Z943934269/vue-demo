// import $ from '@/utils/jQuery-v3.5.1'
const sdk = {
  getCanvasCode () {
    var canvasCode = String(getCanvasFp()) // 设置uid
    function getCanvasFp () { // 计算唯一标识码
      var result = ''
      // Very simple now, need to make it more complex (geo shapes etc)
      var canvas = document.createElement('canvas')
      canvas.width = 2000
      canvas.height = 200
      canvas.style.display = 'inline'
      var ctx = canvas.getContext('2d')
      // detect browser support of canvas winding
      // http://t.cn/R7wzrRy
      // http://t.cn/AiFHoZG5
      ctx.rect(0, 0, 10, 10)
      ctx.rect(2, 2, 6, 6)
      result +=
        'canvas winding:' +
        (ctx.isPointInPath(5, 5, 'evenodd') === false ? 'yes' : 'no')

      ctx.textBaseline = 'alphabetic'
      ctx.fillStyle = '#f60'
      ctx.fillRect(125, 1, 62, 20)
      ctx.fillStyle = '#069'
      // http://t.cn/AiFHoZGx
      ctx.font = '11pt no-real-font-123'

      ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 2, 15)
      ctx.fillStyle = 'rgba(102, 204, 0, 0.2)'
      ctx.font = '18pt Arial'
      ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 4, 45)

      // canvas blending
      // http://t.cn/AiFHoZGt
      // http://t.cn/AiFHoZGM
      ctx.globalCompositeOperation = 'multiply'
      ctx.fillStyle = 'rgb(255,0,255)'
      ctx.beginPath()
      ctx.arc(50, 50, 50, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = 'rgb(0,255,255)'
      ctx.beginPath()
      ctx.arc(100, 50, 50, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = 'rgb(255,255,0)'
      ctx.beginPath()
      ctx.arc(75, 100, 50, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = 'rgb(255,0,255)'
      // canvas winding
      // http://t.cn/R7wzrRy
      // http://t.cn/AiFHoZGf
      ctx.arc(75, 75, 75, 0, Math.PI * 2, true)
      ctx.arc(75, 75, 25, 0, Math.PI * 2, true)
      ctx.fill('evenodd')

      if (canvas.toDataURL) {
        result += ';canvas fp:' + canvas.toDataURL()
      }
      return hashstr(result)
    }
    function hashstr (s) {
      var hash = 0
      if (s.length === 0) return hash
      for (var i = 0; i < s.length; i++) {
        var char = s.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash = hash & hash // Convert to 32bit integer
      }
      return hash
    }
    return canvasCode
  }
}
export default sdk
