var time = require('../../utils/utils.js'); //引入微信自带的日期格式化
var app = getApp();
Page({
  data: {
    dataMap: '',
    startDate: '',
    endDate: '',
    startDatetime: '',
    endDatetime: '',
    token: app.token,
    isdeliver: '',
    picName: '',
    jobOfflineId: ''
  },
  onLoad(options) {
    var JobOfflineId = options.JobOfflineId;
    this.setData({
      jobOfflineId: JobOfflineId
    })
  },
  onShow() {
    this.setData({
      token: app.token
    })
    this.getSingle()
    this.getisdeliver();
  },
  getisdeliver() {   //是否投递了简历接口
    my.httpRequest({
      url: app.url + 'api/job/offline/getisdeliver.do',  //是否投递了简历接口
      method: 'POST',
      data: {
        token: this.data.token,
        jobOfflineId: this.data.jobOfflineId
      },
      dataType: 'json',
      success: (res) => {
        this.setData({
          isdeliver: res.data.dataMap.isdeliver
        })
      }
    })
  },
  getSingle() {     //通过线下兼职ID获取兼职信息
    my.httpRequest({    //通过线下兼职ID获取兼职信息
      url: app.url + 'api/job/offline/getSingle.do',
      method: 'POST',
      data: {
        JobOfflineId: this.data.jobOfflineId,
      },
      dataType: 'json',
      success: (res) => {
        if (res.data.code == 0) {
          let createdDate = time.formatTimeTwo(res.data.dataMap.jobOffline.createdDate, 'Y-M-D h:m:s');
          let startDate = time.formatTimeTwo(res.data.dataMap.jobOffline.startDate, 'Y-M-D');
          let endDate = time.formatTimeTwo(res.data.dataMap.jobOffline.endDate, 'Y-M-D');
          let startDatetime = time.formatTimeTwo(res.data.dataMap.jobOffline.startDate, 'h:m:s');
          let endDatetime = time.formatTimeTwo(res.data.dataMap.jobOffline.endDate, 'h:m:s');
          let picName = time.PicName(res.data.dataMap.jobOffline.jobSubtypeId);
          this.setData({
            createdDate: createdDate || '',
            startDate: startDate || '',
            endDate: endDate || '',
            startDatetime: startDatetime || '',
            endDatetime: endDatetime || '',
            picName: picName || ''
          })
          this.setData({
            dataMap: res.data.dataMap,
          });
        } else {
          my.alert({
            content: res.data.msg
          });
        }
      },
      fail: (res) => {
        my.alert({ content: '网络请求超时' });
      },
      complete: (res) => {
        my.hideLoading();
      }
    });

  },
  accuse() {   //投诉电话
    my.makePhoneCall({ number: '4006818618' });
  },
  deliver(e) {  //进行投递 判断是否完善了简历
    this.getisdeliver();
    if (this.data.token == '') {
      my.navigateTo({
        url: '../log-in/log-in'
      });
    } else if (this.data.isdeliver) {
      my.alert({
        content: '您已经投递完成'
      });
    } else {
      let itm = e.currentTarget.dataset.item;
      my.httpRequest({
        url: app.url + 'api/job/offline/deliverResume.do',
        method: 'POST',
        data: {
          token: this.data.token,
          jobOfflineId: this.data.dataMap.jobOffline.id,
        },
        dataType: 'json',
        success: (res) => {
          if (res.data.code == 0) {
            this.setData({
              isdeliver: true
            })
            my.alert({
              content: '投递成功'
            })
          } else if (res.data.code == 2) {
            my.alert({
              content: '请完善简历'
            })
          } else if (res.data.code == 1) [
            my.alert({
              content: '投递失败'
            })
          ]
        },
        fail: (res) => {
          my.alert({ content: '网络请求超时' });
        },
        complete: (res) => {
          my.hideLoading();
        }
      })
    }
  }
  ,
  ringUp() {    //打电话
    if (this.data.isdeliver) {
      if (this.data.dataMap.jobOffline.mobile == '') {
        my.alert({
          content: '该职位为提供联系方式'
        });
      } else {
        my.makePhoneCall({ number: this.data.dataMap.jobOffline.mobile });
      }
    } else {
      my.alert({
        content: '请先进行投递'
      });
    }

  }
});
