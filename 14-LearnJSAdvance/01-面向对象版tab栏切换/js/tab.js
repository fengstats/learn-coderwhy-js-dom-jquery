var that = null
class Tab {
  // 构造函数
  constructor(id) {
    // 获取元素
    this.main = document.querySelector(id)
    // 点击事件按钮
    this.add = this.main.querySelector('.tabadd')
    // li标签的父元素ul css3选择器 :first-child
    this.ul = this.main.querySelector('.fisrstnav .tablist')
    // section父元素
    this.fsection = this.main.querySelector('.tabscon')
    // 记录标签数
    this.tabNum = 3

    // 实例化就调用初始化函数
    this.init()

    // 存储当前对象的this指向
    that = this
  }

  // 初始化函数
  init() {
    // 初始化前先更新li标签与section标签
    this.updateNode()
    // 初始化操作让相关的元素绑定事件
    for (var i = 0; i < this.lis.length; i++) {
      // 将数组下标存储，防止变量污染
      this.lis[i].index = i
      // 点击后切换tab栏
      this.lis[i].onclick = this.toggleTab
      // 删除按钮绑定点击事件
      this.removeBtn[i].onclick = this.removeTab
      // 给文字标签span添加双击事件
      this.spans[i].ondblclick = this.editTab
      // 给内容标签section添加双击事件
      this.sections[i].ondblclick = this.editTab
    }
    // 为添加按钮添加点击事件
    this.add.onclick = this.addTab
  }

  // 切换
  toggleTab() {
    // 清除其他类
    that.clearClass()

    // 当前点击的选项卡与内容显示添加显示类
    this.className = 'liactive'
    that.sections[this.index].className = 'conactive'
    console.log('当前点击标签', this.index + 1)

    // 自动滚动到选中tab的指定位置
    var left = this.offsetLeft - 160
    that.ul.scrollTo({
      left,
      top: 0,
      behavior: 'smooth'
    })
  }

  // 添加
  addTab() {
    console.log('添加标签选项卡中...')

    var num = ++that.tabNum
    // var random = Math.random()
    // 创建li元素与section元素
    var li = `<li class="liactive"><span>标签${num}</span><span class="i-del">x</span></li>`
    var section = `<section class="conactive">内容${num}</section>`

    // 清除素有兄弟的class
    that.clearClass()

    // 将创建元素追加到对应位置
    // insertAdjacentHTML("元素插入位置", 插入元素);
    // !!!注意 因为addTab()是按钮点击事件调用的 所以this的指向是add，只有使用在构造函数中定义的that才能获取到当前对象的this指向
    that.ul.insertAdjacentHTML('beforeend', li)
    that.fsection.insertAdjacentHTML('beforeend', section)

    // 因为当前创建的标签是没有绑定点击事件的 所以需要重新调用init()函数进行事件状态更新
    that.init()

    // 滚动到尾部
    that.ul.scrollTo({
      left: that.lis[that.lis.length - 1].offsetLeft,
      top: 0,
      behavior: 'smooth'
    })
  }

  // 修改
  editTab() {
    // 获取文本框数据
    var str = this.innerHTML

    // 双击禁止选定文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()

    // 生成一个文本框，将获取数据赋值
    this.innerHTML = '<input type="text" >'
    var input = this.children[0]
    input.value = str
    // 让文本框处于选定状态
    input.select()

    // 当我们离开文本框就把文本框里面的值给span标签
    input.onblur = function () {
      this.parentNode.innerHTML = this.value
    }

    // 当我们按下回车键时也保存
    input.onkeyup = function (e) {
      console.log('按下了', e.keyCode)
      if (e.keyCode === 13) {
        this.blur()
      }
    }
  }

  // 删除
  removeTab(e) {
    // (1) 阻止冒泡 防止触发li标签的切换点击事件
    e.stopPropagation()

    // 获取父级li标签的下标
    var index = this.parentNode.index
    console.log('删除第', index + 1, '个选项卡')

    // 根据获取的索引号删除对应的li和section
    // remove(): 可以直接删除元素
    that.lis[index].remove()
    that.sections[index].remove()

    // 更新状态
    that.init()

    // a. 如果删除的不是选中状态的li标签时，直接删除即可，return出去 停止执行函数内后续代码
    if (document.querySelector('.liactive')) return

    // b. 删除某一个选中状态的li标签时，让它的前一个li标签处于选中状态
    index--
    // 如果当前li标签的前一个li存在 执行点击事件 否则不触发
    that.lis[index] && that.lis[index].click()
  }

  // 清除类方法
  clearClass() {
    console.log('当前列表选项卡个数', this.lis.length)
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ''
      this.sections[i].className = ''
    }
  }

  // 更新所有li标签与section标签的个数与状态
  updateNode() {
    // a. 选项卡
    this.lis = this.main.querySelectorAll('li')
    // b. 内容显示
    this.sections = this.main.querySelectorAll('section')
    // f. 所有li标签上的删除按钮
    this.removeBtn = this.main.querySelectorAll('.i-del')
    // g. 获取所有li标签下的第一个span标签
    this.spans = this.main.querySelectorAll('.fisrstnav ul li span:first-child')
  }
}

// 2. 实例化对象
var tab = new Tab('#tab')
