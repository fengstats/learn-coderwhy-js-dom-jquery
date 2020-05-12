function animate(obj, target, callback) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    // 整数问题: 往上取整 ceil() 天花板函数
    var step = (target - obj.offsetLeft) / 10;
    // 三元表达式写法
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    // 设置停止条件 让动画到400像停止
    if (obj.offsetLeft == target) {
      clearInterval(obj.timer);
      if (callback) {
        callback(obj);
      }
    }
    obj.style.left = obj.offsetLeft + step + 'px';
  }, 15);
}
