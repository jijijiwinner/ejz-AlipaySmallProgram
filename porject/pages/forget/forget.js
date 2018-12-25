var app = getApp();
var interval = null //倒计时函数
Page({
  data: {
    time: '获取验证码',
    currentTime: 61,
    disabled: false,
    mobile: '',
    code: '',
    password: ''
  },
  onLoad() { },
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
  getCode(options) {
    var that = this;
    var RegExMobile = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
    var currentTime = that.data.currentTime
    if (this.data.mobile == '') {
      my.alert({
        content: '手机号为空'
      })
    } else if (this.data.mobile.length != 11) {
      my.alert({
        content: '手机号长度有误'
      })
    } else if (!RegExMobile.test(this.data.mobile)) {
      my.alert({
        content: '手机号有误'
      })
    } else {
      my.httpRequest({
        url: app.url + 'api/user/sendFindBackSMS.do',
        data: {
          phoneNumber: this.data.mobile
        },
        success: (res) => {
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
      });

    }



  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  resetPasswords() {
    var mobile = this.data.mobile;
    var code = this.data.code;
    var password = this.data.password;
    var RegExMobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (mobile == '') {
      my.alert({
        content: '手机号不能为空'
      });
    } else if (mobile.length != 11) {
      my.alert({
        content: '手机号长度有误'
      });
    } else if (!RegExMobile.test(mobile)) {
      my.alert({
        content: '手机号有误'
      });
    } else if (code == '') {
      my.alert({
        content: '验证码不能为空'
      });
    } else if (code.length != '6') {
      my.alert({
        content: '验证码长度有误'
      });
    } else if (password == '') {
      my.alert({
        content: '密码不能为空'
      });
    } else if (password.length < 6) {
      my.alert({
        content: '密码长度有误'
      });
    } else {
      my.httpRequest({
        url: app.url + 'api/user/findPassword.do',
        data: {
          phoneNumber: this.data.mobile,
          validateCode: this.data.code,
          password: this.data.password
        },
        success: (res) => {
          if (res.data.code == 0) {
            my.navigateTo({
              url: '../job/job'
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
      });
    }
  }

});
