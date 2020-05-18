$(function () {
  // 入口函数
  // alert("查看是否引入成功");

  // 1. 当用户按下回车后 将完整数据 存储到本地存储中
  // 数据格式
  /* [
    {
      title: "xxx",
      done: false
    }
  ] */
  $("#title").on("keydown", function (e) {
    // 空格ASCLL码值: 13
    if (e.keyCode === 13) {
      // a. 先读取本地存储中已经存在的数据
      var local = getLocalData();

      // b. 将当前写的数据追加到本地存储数据后面
      var currentData = $(this).val();
      if (currentData !== "") {
        // 输入数据不为空时 进行保存
        var data = {
          title: currentData,
          done: false
        }
        // 往数组后追加 push()
        local.push(data);
        // 调用保存本地存储数据函数
        saveLocalData(local);
        // 清空表单数据
        $(this).val("");
        loadLocalData();
      } else {
        alert("请输入您需要进行的任务");
      }
    }
  })


  // 2. 用户点击删除操作
  $("ol, ul").on("click", "a", function () {
    // a. 获取本地存储
    var data = getLocalData();

    // b. 修改数据
    var index = $(this).data("index");

    // 从下标index开始删除1个元素
    data.splice(index, 1);
    // c. 保存本地存储
    saveLocalData(data);

    // d. 重新渲染页面元素
    loadLocalData();
  })


  // 3. 用户点击复选框
  $("ol, ul").on("click", "input", function () {
    // a. 获取本地存储
    var data = getLocalData();

    // b. 修改数据 checked状态与done值同步
    // 获取a中添加的自定义属性 索引号
    var index = $(this).siblings("a").data("index");
    data[index].done = $(this).prop("checked");

    // c. 保存本地存储
    saveLocalData(data);

    // d. 重新渲染页面元素
    loadLocalData();
  })


  /* 读取本地存储数据函数 */
  function getLocalData() {
    var data = localStorage.getItem("todolist");
    if (data !== null) {
      // 如果数据不为空: 转换为对象格式 返回
      return JSON.parse(data);
    } else {
      // 否则: 返回空数组
      return [];
    }
  }


  /* 保存本地存储数据 */
  function saveLocalData(data) {
    localStorage.setItem("todolist", JSON.stringify(data));
  }


  /* 渲染加载页面 */
  function loadLocalData() {
    var data = getLocalData();

    // 定义计数器 记录当前正在进行任务与完成任务个数
    doneCount = 0;
    todoCount = 0;

    // a. 遍历元素添加之前需要先将原有数据清空
    // ps: 数据重复bug
    $("ol, ul").empty();
    $.each(data, function (index, ele) {
      // b. 生成元素格式
      /* 
      <li>
        <input type="checkbox">
        <p>牛皮</p>
        <a href="javaScript:;">-</a>
      </li> 
      */
      var li = $("<li><input type='checkbox'><p>" + ele.title + "</p></p><a href='javaScript:;' data-index=" + index + ">-</a></li>")
      // c. 遍历元素 追加展示数据
      if (ele.done) {
        doneCount++;
        $("ul").prepend(li);
        $("ul li input").prop("checked", ele.done);
      } else {
        todoCount++;
        $("ol").prepend(li);
      }
    })

    // 页面展示
    $("#todocount").text(todoCount);
    $("#donecount").text(doneCount);
  }


  // 每次加载时自动获取数据
  loadLocalData();

})