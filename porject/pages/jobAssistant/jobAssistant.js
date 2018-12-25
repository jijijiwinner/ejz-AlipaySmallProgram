var app = getApp();
var time = require('../../utils/utils.js'); //引入微信自带的日期格式化
Page({
  data: {
    cityId: '',
    data: {
      dataMap: {
        pushList: []
      }
    },
    pageNo: -1
  },
  onLoad() {
    this.getJobPushList();
  },
  onReachBottom() {
    this.getJobPushList()
  },
  getJobPushList() {
    this.data.pageNo++
    my.httpRequest({
      url: app.url + 'api/job/offline/getJobPushList.do',
      data: {
        cityId: 3924,
        pageNo: this.data.pageNo
      },
      success: (res) => {
        let comms = res.data.dataMap.pushList;
        let cc = this.data.data.dataMap.pushList;
        for (let c in comms) {
          let pushDate = time.formatTimeTwo(comms[c].pushDate, 'Y-M-D');
          let startDate = time.formatTimeTwo(comms[c].pushjobInfo.startDate, 'Y-M-D');
          let endDate = time.formatTimeTwo(comms[c].pushjobInfo.endDate, 'Y-M-D');
          let picName = time.PicName(comms[c].pushjobInfo.jobTypeStr.split(',')[1])
          comms[c].pushDate = pushDate;
          comms[c].pushjobInfo.startDate = startDate;
          comms[c].pushjobInfo.endDate = endDate;
          comms[c].pushjobInfo.picName = picName;
        }
        comms = cc != undefined ? [...cc, ...comms] : comms;
        this.data.data.dataMap.pushList = comms;
        console.log(this.data.data)
        this.setData({
          data: this.data.data
        })
      },
    });
  }

});
