$(function () {

  // 节流阀控制滚动事件
  var flag = true;

  // 今日推荐距离顶部距离
  var toolTop = $(".recommend").offset().top;
  // 加载滚动判断函数
  toggleTool();

  /* 判断滚动函数 */
  function toggleTool() {
    // 如果滚动距离大于或等于今日推荐距离顶部距离时 显示国定顶部的导航选项卡
    if ($(document).scrollTop() >= toolTop) {
      $(".fixedtool").fadeIn();
    } else {
      $(".fixedtool").fadeOut();
    }
  }

  // 1. 显示隐藏电梯导航
  $(window).scroll(function () {
    toggleTool();

    if (flag) {
      // 3. 当页面滚动到某个内容区域，左侧电梯导航小li响应添加与删除current类名
      $.each($(".floor .w"), function (index, ele) {
        if ($(document).scrollTop() >= $(ele).offset().top) {
          console.log("索引", index);
          // console.log("元素顶部距离", $(ele).offset().top);
          $(".fixedtool li").eq(index).addClass("current").siblings().removeClass("current");
        }
      })
    }
  })

  // 2. 点击对应电梯导航中的li标签 获取索引号 找到对应的大盒子求它的offset().top
  $(".fixedtool li").click(function () {
    flag = false;
    // console.log("当前索引号", $(this).index());

    // a. 当我们每次点击li标签需要计算出 页面要去往的位置距离
    var current = $(".floor .w").eq($(this).index()).offset().top;
    // console.log("需要滚动的距离", current);

    // b. 页面滚动
    $("body, html").stop().animate({
      scrollTop: current
    }, function () {
      flag = true;
    })
    // c. 样式添加与清除
    $(this).addClass("current").siblings().removeClass("current");

  })


  // bug: 当点击电梯导航中某一个标签时，会依次前面的li标签添加一个背景颜色
  // 4. 当我们点击了li标签 此时不需要执行页面滚动事件li标签的背景选择current类添加
  // 使用 节流阀（互斥锁）


})