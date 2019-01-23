var app = getApp();
Page({
  data: {
    mobile: '',
    password: '',
    data: ''

  },
  onLoad() {
    my.setNavigationBar({
      title: '登陆',
      color: "rgb(51,51,51)",
    });
  },
  mobileInput(e) {
    this.setData({
      mobile: e.detail.value,
    });
  },
  passwordInput(e) {
    this.setData({
      password: e.detail.value,
    });
  },
  logIn() {
    var mobile = this.data.mobile;
    var password = this.data.password;
    var RegExMobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (mobile == '') {
      my.alert({
        content: '手机号为空'
      })
    } else if (mobile.length != 11) {
      my.alert({
        content: '手机号长度有误'
      })
    } else if (!RegExMobile.test(mobile)) {
      my.alert({
        content: '手机号有误'
      })
    } else if (password == '') {
      my.alert({
        content: '密码为空'
      })
    } else if (password.length < 6) {
      my.alert({
        content: '密码长度有误'
      })
    } else {
      my.httpRequest({
        url: app.url + 'api/user/login.do',
        data: {
          phoneNumber: this.data.mobile,
          password: this.data.password
        },
        success: (res) => {
          if (res.data.code == 0) {
            app.token = res.data.dataMap.token;
            my.setStorageSync({
              key: 'token',
              data: {
                token: res.data.dataMap.token
              },
            });
            my.navigateBack({
              delta: 1
            });
          } else {
            my.alert({
              content: res.data.msg
            })
          }
        },

      });
    }
  },
  forget() {
    my.navigateTo({
      url: '../forget/forget'
    });
  },
  register() {
    my.navigateTo({
      url: '../register/register'
    });
  }

});
