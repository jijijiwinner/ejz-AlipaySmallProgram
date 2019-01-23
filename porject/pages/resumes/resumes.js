var app = getApp();
Page({
  data: {
    token: '',
    userResume: {
      headerFile: '/images/my/moren_icon.png'
    }
  },
  onLoad() {

  },
  onShow() {
    this.setData({
      token: app.token
    });
    if (this.data.token == "") {
      my.navigateTo({
        url: '../log-in/log-in'
      });
    } else {
      this.showUserResume();
    }
  },
  onUnload() {
    my.switchTab({
      url: '../my/my'
    })
  },
  editResumes() {
    my.navigateTo({
      url: '../edit-resumes/edit-resumes'
    })
  },
  showUserResume() {   //简历回显方法
    my.httpRequest({
      url: app.url + 'api/user/showUserResume.do',
      data: {
        token: this.data.token
      },
      success: (res) => {
        if (res.data.code == 0) {
          res.data.dataMap.userResume.intro = res.data.dataMap.userResume.intro.split(",")
          this.setData({
            userResume: res.data.dataMap.userResume
          })
          // my.setStorageSync({
          //   key: 'location',
          //   data: {
          //     provinceId: res.data.dataMap.userResume.provinceId,
          //     cityId: res.data.dataMap.userResume.cityId,
          //     areaId: res.data.dataMap.userResume.areaId,
          //   }
          // });
        } else if (res.data.code == 101) {
          my.navigateTo({
            url: '../log-in/log-in'
          });
        } else {
          my.alert({
            content: res.data.msg
          });
        }
      },
    });
  }

});
