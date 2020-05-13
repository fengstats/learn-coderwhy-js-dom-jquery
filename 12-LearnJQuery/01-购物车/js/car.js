$(function () {
  // 元素获取
  var checkall = $(".checkall");
  var checkbox = $(".j-checkbox");
  var addBtn = $(".increment");
  var decBtn = $(".decrement");
  var checkboxLen = checkbox.length;
  // 1. 全选 全不选 功能模块
  // a. 将全选按钮状态(checked)赋值给三个小按钮(j-checkbox)就可以了 事件可以使用 change 
  checkall.change(
    function () {
      var checkedState = $(this).prop("checked");
      $(".j-checkbox, .checkall").prop("checked", checkedState);
    }
  )


  // 2. 复选框全部选上时，全选选上，否则不做处理
  checkbox.change(function () {
    var len = $(".j-checkbox:checked").length;
    console.log("被选中的复选框个数为", len);
    console.log("总复选框个数为", checkboxLen);
    if (len == checkboxLen) {
      // 被选中的复选框个数 等于 购物车内复选框总个数: 选中全选
      checkall.prop("checked", true);
    } else {
      // 否则 不选
      checkall.prop("checked", false);
    }
  })


  // 3. 增减商品数量模块 首先声明一个变量
  // a. 当我们点击+号(increment) 就让这个值++，然后赋值给文本框
  addBtn.click(
    function () {
      var n = $(this).siblings('.itxt').val();
      n++;
      $(this).siblings('.itxt').val(n);

      // 商品小计 根据获取的文本框值 乘以 当前商品价格
      getNum($(this), n);
    }
  )
  // b. 当我们点击-号(increment) 就让这个值--，然后赋值给文本框
  decBtn.click(
    function () {
      var n = $(this).siblings('.itxt').val();
      if (n == 1) {
        // 如果只有一件商品则无法在减了
        return false
      }
      n--;
      $(this).siblings('.itxt').val(n);
      // 商品小计 根据获取的文本框值 乘以 当前商品价格
      getNum($(this), n);
    }
  )


  // 4. 商品小计修改
  function getNum(obj, n) {
    // 商品小计 根据获取的文本框值 乘以 当前商品价格
    // 祖先元素.p-num 后续重复使用 变量存储
    var parentPnum = obj.parents('.p-num');
    // a. 获取商品单价
    var price = parentPnum.siblings(".p-price").html();
    // b. 截取: 去除￥符号
    price = price.substr(1);
    // c. 设置商品小计 toFixed(n): 保留n位小数 
    parentPnum.siblings(".p-sum").html("￥" + (price * n).toFixed(2));
  }


  // 5. 用户直接修改文本框的值 计算 小计模块
  $(".itxt").change(
    function () {
      var n = $(this).val();
      console.log(n);
      if (n < 1 || isNaN(parseInt(n))) {
        n = 1;
        $(this).val(n);
      }
      getNum($(this), n);
    }
  )


})