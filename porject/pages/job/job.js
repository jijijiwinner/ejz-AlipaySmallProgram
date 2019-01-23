var app = getApp();
var time = require('../../utils/utils.js'); //引入微信自带的日期格式化
Page({
  data: {
    navlist: [
      {
        parameter: ''
      }
    ],      //nav导航栏
    messageList: {},
    city: false,
    profession: false,
    Clearing: false,
    sort: false,
    cityName: '',
    screeningCondition: {},
    checkurl: '/images/job/havaSelected.png',
    unchecked: '/images/job/uncheck.png',
    jobtypeIndex: 0,
    pageNo: -1,
    positionTypeIndex: 0,
    dataList: [],
    location: '',
    cityId: '',          //城市ID,多个时以","分割ID拼接字符串
    mainJobType: '',      //兼职主类型
    subJobType: '',       //兼职子类型
    settlementType: '',   //结算类型,多个时以","分割ID拼接字符串
    sortType: '',         //排序方式
    latitude: '',          //纬度
    longitude: '',          //经度
    searchkey: '',          //搜索关键字
    pageNo: 0,             //查询页码值
  },
  onLoad() {
    var that = this;
    my.getLocation({     //获取用户所在城市
      cacheTimeout: 30,
      type: 1,
      success(res) {
        my.hideLoading();
        that.setData({
          hasLocation: true,
          location: res,
        })
        that.getCityId(res.province)     //获取城市id
      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败' });
      },
    });
  },
  getCityId(cityName) {
    my.httpRequest({
      url: app.url + 'api/city/getCity.do',     //获取城市id
      data: {
        cityName: cityName
      },
      success: (res) => {
        this.setData({
          cityId: res.data.dataMap.cityId
        })
        this.showHome(res.data.dataMap.cityId)
        this.getConditions(res.data.dataMap.cityId)
        this.screen();               //第一次加载渲染页面
      },
    });
  },
  getConditions(cityId) {
    my.httpRequest({
      url: app.url + 'api/job/offline/getConditions.do',   //筛选条件
      method: 'POST',
      data: {
        cityId: cityId
      },
      dataType: 'json',
      success: (res) => {
        this.setData({
          screeningCondition: res.data.dataMap,
          fatherData: res.data.dataMap.jobTypeList[0]
        });
      },
      fail: (res) => {
        my.alert({ content: '网络请求超时' });
      },
      complete: (res) => {
        my.hideLoading();
      }
    });
  },
  showHome(cityId) {
    my.httpRequest({
      url: app.url + '/showHome.do',   //广告栏
      method: 'POST',
      data: {
        cityId: cityId
      },
      dataType: 'json',
      success: (res) => {
        this.setData({
          messageList: res.data.dataMap.messageList,
        });
      },
      fail: (res) => {
        my.alert({ content: '网络请求超时' });
      },
      complete: (res) => {
        my.hideLoading();
      }
    });
  },
  screen() {    //进行筛序
    my.httpRequest({
      url: app.url + 'api/job/offline/getList.do',  //兼职筛选joblist
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      data: {
        cityId: this.data.cityId,                //城市ID,多个时以","分割ID拼接字符串
        mainJobType: this.data.mainJobType,      //兼职主类型
        subJobType: this.data.subJobType,        //兼职子类型
        settlementType: this.data.settlementType,//结算类型,多个时以","分割ID拼接字符串
        sortType: this.data.sortType,            //排序方式
        latitude: this.data.latitude,            //纬度
        longitude: this.data.longitude,          //经度
        searchkey: this.data.searchkey,          //搜索关键字
        // searchkey: '商场室内派单',          //搜索关键字
        pageNo: this.data.pageNo,             //查询页码值
        pageSize: 20
      },
      dataType: 'json',
      success: (res) => {
        let comms = res.data.dataMap.jobOfflinePage.dataList,
          cc = this.data.dataList;
        for (let c in comms) {
          let startdate = time.formatTimeTwo(comms[c].startDate, 'Y-M-D');
          let enddate = time.formatTimeTwo(comms[c].endDate, 'Y-M-D');
          let picName = time.PicName(comms[c].jobSubtypeId);
          comms[c].startDate = startdate;
          comms[c].endDate = enddate;
          comms[c].picName = picName;
        }
        comms = cc != undefined ? [...cc, ...comms] : comms;
        this.data.dataList = comms;
        this.setData({
          dataList: this.data.dataList
        });
      },
      fail: (res) => {
        my.alert({ content: '网络请求超时' });
      },
      complete: (res) => {
        my.hideLoading();
      }
    });
  },
  onReachBottom() {  //上拉触底
    let pageNo = this.data.pageNo + 1;
    this.setData({
      pageNo: pageNo
    })
    this.screen();
  },
  bindKeyInput(e) {
    this.setData({
      searchkey: e.detail.value,
    });
  },
  search(e) {   //input的搜索关键词
    this.setData({
      pageNo: 1,
      dataList: [],
    })
    this.screen()
  },
  search_job() {     //进行职位的筛选
    let cityStr = [];
    let settlementStr = [];
    let sortStr = [];

    let cityList = this.data.screeningCondition.cityList;
    let settlementList = this.data.screeningCondition.settlementList;
    let sortTypeList = this.data.screeningCondition.sortTypeList;

    for (let i in cityList) {
      let item = cityList[i];
      if (item.flag) {
        cityStr.push(item.value)
      }
    }
    for (let i in settlementList) {
      let item = settlementList[i];
      if (item.flag) {
        settlementStr.push(item.value)
      }
    }
    for (let i in sortTypeList) {
      let item = sortTypeList[i];
      if (item.flag) {
        sortStr.push(item.value)
      }
    }
    let mainJobType = this.data.screeningCondition.jobTypeList[this.data.jobtypeIndex].value;
    let subJobType = this.data.screeningCondition.jobTypeList[this.data.jobtypeIndex].childrenList[this.data.positionTypeIndex].value;
    this.setData({
      dataList: []
    })
    this.setData({
      cityId: cityStr.join(),                //城市ID,多个时以","分割ID拼接字符串
      mainJobType: mainJobType,      //兼职主类型
      subJobType: subJobType,        //兼职子类型
      settlementType: settlementStr.join(),//结算类型,多个时以","分割ID拼接字符串
      sortType: sortStr.join(),            //排序方式
      pageNo: 0,
      city: false,   //隐藏城市模块
      profession: false,
      Clearing: false,
      sort: false,
    })
    this.screen()
  },
  selectCity(e) {    //选择城市
    let itm = e.currentTarget.dataset.item;
    let sourcedata = this.data.screeningCondition.cityList;
    for (let i in sourcedata) {
      if (sourcedata[0].value == itm.value) {
        sourcedata[i].flag = false
        sourcedata[0].flag = true
      } else {
        sourcedata[0].flag = false
        if (sourcedata[i].value == itm.value) {
          sourcedata[i].flag = !sourcedata[i].flag;
        }
      }

    }
    this.setData({
      screeningCondition: this.data.screeningCondition
    })
  },
  jobtype(e) {       //点击职业类型
    let jobtypeIndex = e.currentTarget.dataset.index;
    this.setData({
      jobtypeIndex: jobtypeIndex
    })
  },
  PositionType(e) {   //职业类型子级
    let positionTypeIndex = e.currentTarget.dataset.index;
    for (let jobTypeList in this.data.screeningCondition.jobTypeList) {
      for (let i in this.data.screeningCondition.jobTypeList[jobTypeList].childrenList) {
        if (!this.data.screeningCondition.jobTypeList[jobTypeList].childrenList[positionTypeIndex] || (positionTypeIndex != i)) {
          this.data.screeningCondition.jobTypeList[jobTypeList].childrenList[i].flag = false;
        }
      }
    }
    this.data.screeningCondition.jobTypeList[this.data.jobtypeIndex].childrenList[positionTypeIndex].flag = !this.data.screeningCondition.jobTypeList[this.data.jobtypeIndex].childrenList[positionTypeIndex].flag;
    this.setData({
      screeningCondition: this.data.screeningCondition,
      positionTypeIndex: positionTypeIndex
    })
  },
  Clearingtype(e) {   //结算方式
    let itm = e.currentTarget.dataset.item;
    let sourcedata = this.data.screeningCondition.settlementList;
    for (let i in sourcedata) {
      if (sourcedata[0].value == itm.value) {
        sourcedata[i].flag = false
        sourcedata[0].flag = true
      } else {
        sourcedata[0].flag = false
        if (sourcedata[i].value == itm.value) {
          sourcedata[i].flag = !sourcedata[i].flag;
        }
      }

    }
    this.setData({
      screeningCondition: this.data.screeningCondition
    })
  },
  Sorttype(e) {       //默认排序
    let itm = e.currentTarget.dataset.item;
    let sourcedata = this.data.screeningCondition.sortTypeList;

    for (let i in sourcedata) {
      sourcedata[i].flag = false
      if (sourcedata[i].value == itm.value) {
        sourcedata[i].flag = !sourcedata[i].flag;
      }
    }
    this.setData({
      screeningCondition: this.data.screeningCondition
    })
  },
  city() {
    var that = this;
    that.setData({
      city: (!that.data.city),
      profession: false,
      Clearing: false,
      sort: false
    })
  },
  profession() {
    var that = this;
    that.setData({
      city: false,
      profession: (!that.data.profession),
      Clearing: false,
      sort: false
    })
  },
  Clearing() {
    var that = this;
    that.setData({
      city: false,
      profession: false,
      Clearing: (!that.data.Clearing),
      sort: false
    })
  },
  sort() {
    var that = this;
    that.setData({
      city: false,
      profession: false,
      Clearing: false,
      sort: (!that.data.sort)
    })
  }
});