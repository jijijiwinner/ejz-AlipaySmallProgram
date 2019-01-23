var app = getApp();
var time = require('../../utils/utils.js'); 
Page({
  data: {
    cityId: '',
    data: {
      dataMap: {
        pushList: []
      }
    },
    pageNo: 0
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
          comms[c].pushDate = time.formatTimeTwo(comms[c].pushDate, 'Y-M-D');
          comms[c].pushjobInfo.startDate = time.formatTimeTwo(comms[c].pushjobInfo.startDate, 'Y-M-D');
          comms[c].pushjobInfo.endDate = time.formatTimeTwo(comms[c].pushjobInfo.endDate, 'Y-M-D');
          comms[c].pushjobInfo.picName = time.PicName(comms[c].pushjobInfo.jobSubtypeId);
        }
        this.data.data.dataMap.pushList = [...cc, ...comms];
        this.setData({
          data: this.data.data
        })
      },
    });
  }

});
