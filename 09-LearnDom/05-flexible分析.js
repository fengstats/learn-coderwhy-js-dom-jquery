// 1. 编写一个立即执行函数，设置函数名为flexible
(function flexible(window, document) {

  // 获取html根元素
  var docEl = document.documentElement

  // dpr: 物理像素比 通常 pc: 移动  1: 2
  // 表达式1 || 表达式2: 如果表达式1为真 返回表达式1 否则返回表达式2
  var dpr = window.devicePixelRatio || 1

  // body字体大小初始化
  function setBodyFontSize() {
    if (document.body) {
      // 查找页面元素是否存在body
      // 设置字体按照物理像素比进行设置
      document.body.style.fontSize = (12 * dpr) + 'px'
    } else {
      // 如果页面元素无body 等待页面主要DOM元素加载完毕后再去设置body字体大小
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // html元素大小初始化
  // set 1rem = vieWidth / 10
  function setRemUnit() {
    // 屏幕可视区域的10分之一
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }
  setRemUnit()


  // 监听页面尺寸大小发生变化的时候 重新设置rem大小
  window.addEventListener('resize', setRemUnit)
  // 只要页面重新加载就调用
  window.addEventListener('pageshow', function (e) {
    // e.peristed 返回为true 就是说如果页面是从缓存取过来的页面，也需要重新计算一些rem的大小
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports: 某些移动端浏览器不支持0.5像素写法
  if (dpr >= 2) {
    // 通过代码设置支持
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))