var app = getApp();
var time = require('../../utils/utils.js'); //引入微信自带的日期格式化
Page({
  data: {
    token: app.token,
    currentTab: 0,
    data: {},
    page: 0,
    jobOfflinePage: []

  },
  onLoad() {
    this.setData({
      token: app.token
    })
    this.getJobOfflineList()
  },
  getJobOfflineList() {    //请求全部投递的列表
    my.httpRequest({
      url: app.url + 'api/jobRequest/getJobOfflineList.do',    //全部
      method: 'POST',
      data: {
        token: this.data.token,
        page: this.data.page
      },
      dataType: 'json',
      success: (res) => {
        if (res.data.dataMap.jobOfflinePage == undefined) {
          return
        }
        let comms = res.data.dataMap.jobOfflinePage,
          cc = this.data.jobOfflinePage;
        for (let c in comms) {
          comms[c].solrJobOffline.startDate = time.formatTimeTwo(comms[c].solrJobOffline.startDate, 'Y-M-D');
          comms[c].solrJobOffline.endDate = time.formatTimeTwo(comms[c].solrJobOffline.endDate, 'Y-M-D');
          comms[c].solrJobOffline.picName = time.PicName(comms[c].solrJobOffline.jobSubtypeId);
        }
        this.data.jobOfflinePage = [...cc, ...comms];
        this.setData({
          jobOfflinePage: this.data.jobOfflinePage
        });
      },
      fail: (res) => {
        my.alert({ content: 'fail' });
      },
      complete: (res) => {
        my.hideLoading();
      }
    });
  },
  getDaiLuYongList() {     //录用
    my.httpRequest({
      url: app.url + 'api/jobRequest/getDaiLuYongList.do',
      method: 'POST',
      data: {
        token: this.data.token,
        page: this.data.page
      },
      dataType: 'json',
      success: (res) => {
        if (res.data.dataMap.jobOfflinePage == undefined) {
          return
        }
        let comms = res.data.dataMap.jobOfflinePage,
          cc = this.data.jobOfflinePage;
        for (let c in comms) {
          comms[c].solrJobOffline.startDate = time.formatTimeTwo(comms[c].solrJobOffline.startDate, 'Y-M-D');
          comms[c].solrJobOffline.endDate = time.formatTimeTwo(comms[c].solrJobOffline.endDate, 'Y-M-D');
          comms[c].solrJobOffline.picName = time.PicName(comms[c].solrJobOffline.jobSubtypeId);
        }
        this.data.jobOfflinePage = [...cc, ...comms];
        this.setData({
          jobOfflinePage: this.data.jobOfflinePage
        });
      },
      fail: (res) => {
        my.alert({ content: 'fail' });
      },
      complete: (res) => {
        my.hideLoading();
      }
    });
  },
  getDaiShangGangList() {     //上岗
    my.httpRequest({
      url: app.url + 'api/jobRequest/getDaiShangGangList.do',
      method: 'POST',
      data: {
        token: this.data.token,
        page: this.data.page
      },
      dataType: 'json',
      success: (res) => {
        if (res.data.dataMap.jobOfflinePage == undefined) {
          return
        }
        let comms = res.data.dataMap.jobOfflinePage,
          cc = this.data.jobOfflinePage;
        for (let c in comms) {
          comms[c].solrJobOffline.startDate = time.formatTimeTwo(comms[c].solrJobOffline.startDate, 'Y-M-D');
          comms[c].solrJobOffline.endDate = time.formatTimeTwo(comms[c].solrJobOffline.endDate, 'Y-M-D');
          comms[c].solrJobOffline.picName = time.PicName(comms[c].solrJobOffline.jobSubtypeId);
        }
        this.data.jobOfflinePage = [...cc, ...comms];
        this.setData({
          jobOfflinePage: this.data.jobOfflinePage
        });
      },
      fail: (res) => {
        my.alert({ content: 'fail' });
      },
      complete: (res) => {
        my.hideLoading();
      }
    });
  },
  getDaiJieSuanList() {      //结算
    my.httpRequest({
      url: app.url + 'api/jobRequest/getDaiJieSuanList.do',
      method: 'POST',
      data: {
        token: this.data.token,
        page: this.data.page
      },
      dataType: 'json',
      success: (res) => {
        if (res.data.dataMap.jobOfflinePage == undefined) {
          return
        }
        let comms = res.data.dataMap.jobOfflinePage,
          cc = this.data.jobOfflinePage;
        for (let c in comms) {
          comms[c].solrJobOffline.startDate = time.formatTimeTwo(comms[c].solrJobOffline.startDate, 'Y-M-D');
          comms[c].solrJobOffline.endDate = time.formatTimeTwo(comms[c].solrJobOffline.endDate, 'Y-M-D');
          comms[c].solrJobOffline.picName = time.PicName(comms[c].solrJobOffline.jobSubtypeId);
        }
        this.data.jobOfflinePage = [...cc, ...comms];
        this.setData({
          jobOfflinePage: this.data.jobOfflinePage
        });
      },
      fail: (res) => {
        my.alert({ content: 'fail' });
      },
      complete: (res) => {
        my.hideLoading();
      }
    });
  },
  swichNav(e) {    //切换tab
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
      if (this.data.currentTab == 0) {
        this.setData({
          jobOfflinePage: [],
          page: 0
        })
        this.getJobOfflineList()
      } else if (this.data.currentTab == 1) {
        this.setData({
          jobOfflinePage: [],
          page: 0
        })
        this.getDaiLuYongList()
      } else if (this.data.currentTab == 2) {
        this.setData({
          jobOfflinePage: [],
          page: 0
        })
        this.getDaiShangGangList()
      } else if (this.data.currentTab == 3) {
        this.setData({
          jobOfflinePage: [],
          page: 0
        })
        this.getDaiJieSuanList()
      }
    }
  },
  cancel(e) {  //取消投递接口
    let jobOfflineId = e.currentTarget.dataset.item.jobId;
    my.httpRequest({
      url: app.url + 'api/job/offline/deldeliverResume.do',
      data: {
        token: this.data.token,
        jobOfflineId: jobOfflineId
      },
      success: (res) => {
        this.setData({
          jobOfflinePage: []
        })
        this.getDaiLuYongList()
      },
    });
  },
  ringUp(e) {
    let mobile = e.currentTarget.dataset.item.solrJobOffline.mobile;
    console.log(mobile)
    if (mobile == '') {
      my.alert({
        content: '该职位为提供联系方式'
      });
    } else {
      my.makePhoneCall({ number: mobile });
    }
  },
  onReachBottom() {
    this.data.page++
    this.setData({
      page: this.data.page
    })
    if (this.data.currentTab == 0) {
      this.getJobOfflineList()
    } else if (this.data.currentTab == 1) {

      this.getDaiLuYongList()
    } else if (this.data.currentTab == 2) {

      this.getDaiShangGangList()
    } else if (this.data.currentTab == 3) {

      this.getDaiJieSuanList()
    }
  }

});
