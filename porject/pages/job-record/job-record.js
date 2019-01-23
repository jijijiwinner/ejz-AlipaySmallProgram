var app = getApp();
var time = require('../../utils/utils.js'); //引入微信自带的日期格式化
Page({
  data: {
    token: '',
    jobId: '',
    data: '',
    createdDate: ''
  },
  onLoad(options) {
    let res = my.getStorageSync({ key: 'token' });
    this.setData({
      jobId: options.jobId,
      token: res.data.token
    });
    my.httpRequest({
      url: app.url + 'api/jobRequest/getShangGangJiLu.do',
      data: {
        token: this.data.token,
        jobId: this.data.jobId
      },
      success: (res) => {
        this.setData({
          data: res.data,
          createdDate: time.formatTimeTwo(res.data.dataMap.jobOffline.createdDate, 'Y-M-D'),
          picName: time.PicName(res.data.dataMap.jobOffline.jobSubtypeId)
        })
      },
    });
  },
});
