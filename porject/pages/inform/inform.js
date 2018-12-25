var app = getApp();
var time = require('../../utils/utils.js'); //引入微信自带的日期格式化FF
Page({
  data: {
    token: '',
    data: '',
    pageNo: 1,
    data: {
      dataMap: {
        userInformList: []
      }
    }
  },
  onLoad() {
  },
  onShow() {
    var that = this;
    let res = my.getStorageSync({ key: 'token' });
    if (res.data == undefined) {
      my.navigateTo({
        url: '../log-in/log-in'
      });
    } else {
      this.setData({
        token: res.data.token,
      });
      my.httpRequest({
        url: app.url + 'api/user/inform/getUserInform.do',
        method: 'POST',
        data: {
          token: this.data.token,
          pageNo: 1,
        },
        dataType: 'json',
        success: (res) => {
          if (res.data.code == 0) {
            let comms = res.data.dataMap.userInformList;
            // let cc = this.data.data.dataMap.userInformList;
            for (let c in comms) {
              let createdDateTop = time.formatTimeTwo(comms[c].createdDate, 'M月D日 h:m:s');
              let createdDate = time.formatTimeTwo(comms[c].createdDate, 'Y-M-D h:m:s');
              comms[c].createdDate = createdDate;
              comms[c].createdDateTop = createdDateTop;
            }
            // comms = cc != undefined ? [...cc, ...comms] : comms;
            this.data.data.dataMap.userInformList = comms;
            this.setData({
              data: this.data.data
            })
          } else if (res.data.code == 101) {
            my.navigateTo({
              url: '../log-in/log-in'
            });
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
          let comms = res.data.dataMap.userInformList;
          let cc = this.data.data.dataMap.userInformList;
          for (let c in comms) {
            let createdDateTop = time.formatTimeTwo(comms[c].createdDate, 'M月D日 h:m:s');
            let createdDate = time.formatTimeTwo(comms[c].createdDate, 'Y-M-D h:m:s');
            comms[c].createdDate = createdDate;
            comms[c].createdDateTop = createdDateTop;
          }
          comms = cc != undefined ? [...cc, ...comms] : comms;
          this.data.data.dataMap.userInformList = comms;
          this.setData({
            data: this.data.data
          })
        } else if (res.data.code == 101) {
          my.navigateTo({
            url: '../log-in/log-in'
          });
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
