var time = require('../../utils/utils.js'); //引入微信自带的日期格式化
var app = getApp();
Page({
  data: {
    siteState: '',
    fatSalary: '',     //是否高薪
    jobOfflinePage: {},
    pageNo: 0,
    settlementType: '',
    mainJobType: '',
    subJobType: '',
    cityName: '',
    location: {},
    apiurl: '',
    latitude: '',   //维度
    longitude: ''   //经度
  },
  onLoad(options) {
    let that = this;
    my.getLocation({     //获取用户所在城市
      cacheTimeout: 30,
      type: 1,
      success(res) {
        my.hideLoading();
        that.setData({
          hasLocation: true,
          location: res
        })
        if (options.siteState == 'site') {
          that.setData({
            latitude: res.latitude,   //维度
            longitude: res.longitude //经度
          })
        }

      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败' });
      },
    });
    // 判断位置的是否显示开始
    this.setData({
      siteState: options.siteState,
      fatSalary: options.fatSalary,
      settlementType: options.settlementType,
      mainJobType: options.mainJobType,
      subJobType: options.subJobType,
    })
  },
  onShow() {
    this.setData({
      jobOfflinePage: {}
    })
    this.getCityId(this.data.location.city)
  },
  getCityId(cityName) {
    my.httpRequest({
      url: app.url + 'api/city/getCity.do',     //获取城市id
      data: {
        cityName: cityName
      },
      success: (res) => {
        this.setData({
          cityId: res.data.dataMap.cityId,
        })
        this.judgeUrl();
        this.getJobList()
      },
    });
  },

  judgeUrl() {     //判断路径
    if (this.data.fatSalary == 'fatSalary') {   //高薪
      this.setData({
        apiurl: app.url + 'api/job/offline/getHighSalaryList.do'
      })
    } else {
      this.setData({
        apiurl: app.url + 'api/job/offline/getList.do'
      })
    }
  },

  onReachBottom() {   //上拉触底时触发
    this.data.pageNo++;
    this.getJobList()
  },
  getJobList() {          //获取list  http
    my.httpRequest({
      url: this.data.apiurl,
      method: 'POST',
      data: {
        settlementType: this.data.settlementType,   //结算类型
        mainJobType: this.data.mainJobType,         //主
        subJobType: this.data.subJobType,           //子
        cityId: this.data.cityId,
        pageNo: this.data.pageNo,
        latitude: this.data.latitude,   //维度
        longitude: this.data.longitude  //经度
      },
      dataType: 'json',
      success: (res) => {
        let comms = res.data.dataMap.jobOfflinePage.dataList,
          cc = this.data.jobOfflinePage.dataList;
        for (let c in comms) {
          let startdate = time.formatTimeTwo(comms[c].startDate, 'Y-M-D');
          let enddate = time.formatTimeTwo(comms[c].endDate, 'Y-M-D');
          let picName = time.PicName(comms[c].jobTypeStr.split(',')[1])
          comms[c].startDate = startdate;
          comms[c].endDate = enddate;
          comms[c].picName = picName;
        }
        comms = cc != undefined ? [...cc, ...comms] : comms;
        this.data.jobOfflinePage.dataList = comms;
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



});
