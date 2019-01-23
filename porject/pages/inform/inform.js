var app = getApp();
var time = require('../../utils/utils.js'); //引入微信自带的日期格式化
Page({
  data: {
    token: app.token,
    data: '',
    pageNo: 0,
    data: {
      dataMap: {
        userInformList: []
      }
    }
  },
  onLoad() {
    this.setData({
      token: app.token,
    });
    if (this.data.token === "") {
      my.navigateTo({
        url: '../log-in/log-in'
      });
    } else {
      this.getUserInform()
    }
  },
  onReachBottom() {
    this.getUserInform()
  },
  getUserInform() {
    this.data.pageNo++;
    my.httpRequest({
      url: app.url + 'api/user/inform/getUserInform.do',
      method: 'POST',
      data: {
        token: this.data.token,
        pageNo: this.data.pageNo,
      },
      dataType: 'json',
      success: (res) => {
        if (res.data.code == 0) {
          if (res.data.dataMap.userInformList == undefined) {
            return
          }
          let comms = res.data.dataMap.userInformList;
          let cc = this.data.data.dataMap.userInformList;
          for (let c in comms) {
            comms[c].createdDateTop = time.formatTimeTwo(comms[c].createdDate, 'M月D日 h:m:s');
            comms[c].createdDate = time.formatTimeTwo(comms[c].createdDate, 'Y-M-D h:m:s');
          }
          this.data.data.dataMap.userInformList = [...cc, ...comms];
          this.setData({
            data: this.data.data
          })
        } else {
          my.alert({ content: res.data.msg });
        }
      },
      fail: (res) => {
        my.alert({ content: 'fail' });
      },
      complete: (res) => {
        my.hideLoading();
      }
    });
  }
});
