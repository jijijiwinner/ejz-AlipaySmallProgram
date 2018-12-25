var app = getApp();
var interval = null //倒计时函数
Page({
  data: {
    time: '获取验证码',
    currentTime: 61,
    disabled: false,
    mobile: '',
    code: '',
    password: '',
    confirmPassword: '',
    screeningCondition: ''
  },
  mobileInput(e) {
    this.setData({
      mobile: e.detail.value,
    });
  },
  codeInput(e) {
    this.setData({
      code: e.detail.value,
    });
  },
  passwordInput(e) {
    this.setData({
      password: e.detail.value,
    });
  },
  confirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail.value,
    });
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime;
    var mobile = that.data.mobile;
    var RegExMobile = /^((1[3578][0-9])|(14[57])|(17[0678])|(19[7]))\d{8}$/;
    if (this.data.mobile == "") {
      my.alert({
        content: '手机号为空'
      });
    } else if (mobile.length != 11) {
      my.alert({
        content: '手机号长度有误'
      });
    }
    else if (!RegExMobile.test(this.data.mobile)) {
      my.alert({
        content: '手机号有误'
      })
    } else {
      my.httpRequest({
        url: app.url + 'api/user/sendRegisterSMS.do',
        method: 'POST',
        data: {
          phoneNumber: this.data.mobile
        },
        dataType: 'json',
        success: (res) => {
          console.log(res)
          if (res.data.code == 0) {
            interval = setInterval(function () {
              currentTime--;
              that.setData({
                time: currentTime + '秒'
              })
              if (currentTime <= 0) {
                clearInterval(interval)
                that.setData({
                  time: '重新发送',
                  currentTime: 61,
                  disabled: false
                })
              }
            }, 1000)
          } else {
            my.alert({
              content: res.data.msg
            });
          }
        },
        fail: (res) => {
          my.alert({ content: '请求超时' });
        }
      })

    }

  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  onLoad() {
    my.setNavigationBar({
      title: '注册',
      color: "rgb(51,51,51)"
    });
  },
  register() {    //完成注册
    var mobile = this.data.mobile;
    var code = this.data.code;
    var password = this.data.password;
    var confirmPassword = this.data.confirmPassword;
    var RegExMobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (mobile == '') {
      my.alert({
        content: "手机号为空"
      })
    } else if (mobile.length != 11) {
      my.alert({
        content: "手机号长度有误"
      })
    } else if (!RegExMobile.test(mobile)) {
      my.alert({
        content: "手机号有误"
      })
    } else if (code == '') {
      my.alert({
        content: "验证码为空"
      })
    } else if (code.length != '6') {
      my.alert({
        content: "验证码长度有误"
      })
    } else if (password == '' && confirmPassword == '') {
      my.alert({
        content: "密码为空"
      })
    } else if (password.length < 6 || confirmPassword.length < 6) {
      my.alert({
        content: "密码长度有误"
      })
    } else if (password !== confirmPassword) {
      my.alert({
        content: "两次密码不一致"
      });
    } else {
      my.httpRequest({
        url: app.urlTest + 'api/user/register.do',
        method: 'POST',
        data: {
          phoneNumber: this.data.mobile,
          validateCode: this.data.code,
          password: this.data.password,
        },
        dataType: 'json',
        success: (res) => {
          console.log(res)
          if (res.data.code == 0) {
            my.httpRequest({
              url: app.url + 'api/user/login.do',
              data: {
                phoneNumber: this.data.mobile,
                password: this.data.password
              },
              success: (res) => {
                if (res.data.code == 0) {
                  this.setData({
                    data: res.data
                  });
                  my.setStorageSync({
                    key: 'token',
                    data: {
                      token: this.data.data.dataMap.token
                    }
                  });
                  my.navigateTo({
                    url: '../edit-resumes/edit-resumes'
                  });
                } else {
                  my.alert({
                    content: res.data.msg
                  })
                }
                console.log(res)
              },

            });
          } else {
            my.alert({
              content: res.data.msg
            });
          }
        },
        fail: (res) => {
          my.alert({ content: '请求超时' });
        }
      })
    }
  },
  protocol() {
    my.navigateTo({
      url: '../edit-resumes/edit-resumes'
    });
  }
});
