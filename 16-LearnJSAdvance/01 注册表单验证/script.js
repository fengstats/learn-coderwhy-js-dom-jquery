// 采用JQuery的方式封装我们的功能模块，以提高性能（缩短作用域链），防止变量全局污染
(function (window, document) {

  // 封装选择器 采用ES6的箭头函数写法
  const getSelector = ele => {
    return typeof ele === "string" ? document.querySelector(ele) : "";
  }

  // 登录注册的载入
  const containerShow = () => {
    var show = getSelector(".contaniner");
    // 注！！！如果需要添加多类名时前面的小空格不要忘哦~
    show.className += " container-show";
  }

  // 加载页面时 调用载入
  window.onload = containerShow;

  // 登录注册切换逻辑
  let toSignBtn = getSelector(".toSign"),
    toLoginBtn = getSelector(".toLogin"),
    loginBox = getSelector(".login-box"),
    signBox = getSelector(".sign-box");

  toLoginBtn.onclick = () => {
    signBox.className += ' animate_login';
    loginBox.className += ' animate_sign';
  }

  toSignBtn.onclick = () => {
    signBox.classList.remove("animate_login");
    loginBox.classList.remove("animate_sign");
  }

  // 注册验证
  // 表单元素获取
  var tel = getSelector("#tel");
  var pwd = getSelector("#pwd");

  // 手机号正则
  var regTel = /^1[3|4|5|7|8]\d{9}$/;
  var regPwd = /^\d{6,16}$/;

  // 表单验证函数
  function regExp(ele, reg) {
    ele.onblur = function () {
      let value = this.value.trim();
      console.log("\n\n看看输入了啥", value);
      if (value) {
        if (reg.test(this.value)) {
          this.className = "greenColor";
          // console.log("还行算你通过了吧~");
        } else {
          this.className = "redColor";
          // console.log("叫你输入手机号呢，搁着干哈呢？");
        }
      } else {
        this.className = "blackColor";
        // console.log("叫你输入 你倒是输呀 磨磨唧唧的");
      }
    }
  }

  regExp(tel, regTel);
  regExp(pwd, regPwd);

})(window, document)