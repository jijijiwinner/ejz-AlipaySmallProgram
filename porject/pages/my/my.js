var app = getApp();
Page({
  data: {
    token: app.token,
    data: {
      dataMap: {
        userResume: {
          realName: '登陆注册',
          headerFile: '/images/my/moren_icon.png'
        }
      }
    }
  },
  onShow() {
    this.setData({
      token: app.token
    })
    if (this.data.token === '') {
      // my.alert({
      //   content: '请进行登录'
      // });
    } else {
      my.httpRequest({
        url: app.url + 'api/user/showUserResume.do',
        data: {
          token: this.data.token
        },
        success: (res) => {
          if (res.data.code == 0) {
            this.setData({
              data: res.data
            })
          } else {
            my.alert({
              content: res.data.msg
            });
          }
        },
      });
    }
  },

  IntoLogIn() {
    if (this.data.token != '') {

    } else {
      my.navigateTo({
        url: '../log-in/log-in'
      });
    }
  },
  resumes() {        //我的简历
    if (this.data.token == '') {
      my.navigateTo({
        url: '../log-in/log-in'
      });

    } else {
      my.navigateTo({
        url: '../resumes/resumes'
      });
    }
  },
  mysend() {         //我的投递
    if (this.data.token == '') {
      my.navigateTo({
        url: '../log-in/log-in'
      });

    } else {
      my.navigateTo({
        url: '../MySend/MySend'
      });
    }
  },
  ContactUs() {       //联系我们
    my.navigateTo({
      url: '../contact-us/contact-us'
    });
  },

});
