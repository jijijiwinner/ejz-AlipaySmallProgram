var time = require('../../utils/utils.js'); //引入微信自带的日期格式化
// var upload = require('../../upload/upload.js');
var app = getApp();
Page({
  data: {
    imgsrc: '',
    time: '',
    files: '/images/edit-resumes/already_icon.png',
    jobtypeList: [
      { key: "校园类", sort: 0, value: 1 },
      { key: "活动类", sort: 0, value: 4 },
      { key: "教育类", sort: 0, value: 10 },
      { key: "市场类", sort: 0, value: 13 },
      { key: "服务类", sort: 0, value: 18 },
      { key: "文案类", sort: 0, value: 23 },
      { key: "IT类", sort: 0, value: 28 },
      { key: "其他", sort: 0, value: 33 }
    ],            //期望职位
    provinceList: [{
      "id": '',
      "fullName": "请选择",
    }],        //省级城市
    cityList: [{
      "id": '',
      "fullName": "请选择",
    }],
    areaList: [{
      "id": '',
      "fullName": "请选择",
    }],
    token: app.token,           //用户身份认证
    provinceId: '',      //省份ID
    cityId: '',          //城市ID
    areaId: '',          //区县ID
    birthday: '',         //用户生日日期，格式为"YYYY-MM-DD"
    weight: '',            //体重
    height: '',            //身高
    degree: '',            //学历
    mobile: '',            //电话
    weChat: '',            //微信
    intro: '',             //简介
    headImageName: '',     //用户头像保存在OSS上的文件名称
    headerFile: '/images/my/moren_icon.png',
    introList: [{
      text: '高颜值'
    }, {
      text: '高学历'
    }, {
      text: '吃苦耐劳'
    }, {
      text: '服从管理'
    }, {
      text: '大长腿'
    }, {
      text: '责任心强'
    }, {
      text: '诚实守信'
    }, {
      text: '擅长沟通'
    }],
    profession: '',        //专业
    qq: '',                //qq号码
    gender: '',             //性别，0女1男
    realName: '',           //真实姓名
    school: '',             //学校
    startSchool: '',        //入学年份
    jobTypeId: '',          //期望职位(职位类型的id,多个id传 , 隔开的字符串)
    email: '',              //邮箱
    experience: '',         //工作经历
    eduSituation: '',       //教育情况(数字形式0在校生 1已毕业)
    postValue: '',          //期望职位
    postIndex: '',          //期望职位  
    dataDufference: 0,
    degreeIndex: 0,
    provinceIdIndex: 0,
    cityIdIndex: 0,
    areaIdIddex: 0,
    education: ['小学', '初中', '高中', '专科', '本科', '硕士', '博士'],
    genderList: [
      { name: '男', value: '男', text: 1 },
      { name: '女', value: '女', text: 0 }
    ],
    educationList: [
      { name: '在校生', value: '在校生', text: 0 },
      { name: '已毕业', value: '已毕业', text: 1 }
    ]
  },
  onShow() {
    this.setData({
      token: app.token,
    });
    // if (location.data != undefined) {
    //   this.setData({
    //     provinceIdIndex: location.data.provinceIdIndex,
    //     cityIdIndex: location.data.cityIdIndex,
    //     areaIdIddex: location.data.areaIdIddex,
    //   })
    // }

    my.httpRequest({
      url: app.url + 'api/user/showUserResume.do',      //内容回显
      data: {
        token: this.data.token
      },
      success: (res) => {
        if (res.data.code == 0) {
          let jobtypeids = res.data.dataMap.userResume.jobtypeids.join(',');          //期望id 数组
          let jobtypeList = this.data.jobtypeList;
          for (let i in jobtypeList) {
            if (jobtypeids.search(jobtypeList[i].value) != -1) {
              jobtypeList[i].flag = true
            } else {

            }
          }
          this.data.jobtypeList = jobtypeList;

          let introarr = res.data.dataMap.userResume.intro;
          let introList = this.data.introList;
          for (let i in introList) {
            if (introarr.search(introList[i].text) != -1) {
              introList[i].flag = true
            } else {

            }
          }
          this.data.introList = introList;

          // 位置的回显
          var userResume = res.data.dataMap.userResume
          // this.getProvince()
          // this.getChildrenCity(userResume.provinceId)
          // this.getArea(userResume.cityId)

          my.httpRequest({
            url: app.url + 'api/city/getProvince.do',   //获取省级城市
            method: 'POST',
            dataType: 'json',
            success: (res) => {
              this.setData({
                provinceList: res.data.dataMap.CityList,
              })
              let provinceList = this.data.provinceList;
              for (let i in provinceList) {
                if (provinceList[i].id == userResume.provinceId) {
                  this.setData({
                    provinceIdIndex: i
                  })
                }
              }
            },
            fail: (res) => {
              my.alert({ content: '网络请求超时' });
            },
            complete: (res) => {
              my.hideLoading();
            }
          });

          my.httpRequest({
            url: app.url + 'api/city/getChildrenCity.do',   //获取市级城市接口
            data: {
              parentId: userResume.provinceId
            },
            method: 'POST',
            dataType: 'json',
            success: (res) => {
              this.setData({
                cityList: res.data.dataMap.childsList,
                areaList: [
                  {
                    "id": '',
                    "fullName": "请选择",
                  }
                ]
              })
              let cityList = this.data.cityList;
              for (let i in cityList) {
                if (cityList[i].id == userResume.cityId) {
                  this.setData({
                    cityIdIndex: i
                  })
                }
              }
            },
            fail: (res) => {
              my.alert({ content: 'fail' });
            },
            complete: (res) => {
              my.hideLoading();
            }
          });

          my.httpRequest({
            url: app.url + 'api/city/getArea.do',   //获取区域城市
            data: {
              parentId: userResume.cityId
            },
            method: 'POST',
            dataType: 'json',
            success: (res) => {
              this.setData({
                areaList: res.data.dataMap.childsList
              })
              let areaList = this.data.areaList;
              for (let i in areaList) {
                if (areaList[i].id == userResume.areaId) {
                  this.setData({
                    areaIdIddex: i
                  })
                }
              }

            },
            fail: (res) => {
              my.alert({ content: 'fail' });
            },
            complete: (res) => {
              my.hideLoading();
            }
          });



          this.setData({
            time: '',
            introList: this.data.introList,                         //简介
            provinceId: res.data.dataMap.userResume.provinceId,      //省份ID
            cityId: res.data.dataMap.userResume.cityId,          //城市ID
            areaId: res.data.dataMap.userResume.areaId,          //区县ID
            headerFile: res.data.dataMap.userResume.headerFile,
            birthday: time.formatTimeTwo(res.data.dataMap.userResume.birthdayDate, 'Y-M-D'),         //用户生日日期，格式为"YYYY-MM-DD"
            weight: res.data.dataMap.userResume.weight,            //体重
            height: res.data.dataMap.userResume.height,            //身高
            degree: res.data.dataMap.userResume.degree,            //学历
            mobile: res.data.dataMap.userResume.mobile,            //电话
            intro: res.data.dataMap.userResume.intro,             //简介
            profession: res.data.dataMap.userResume.profession,        //专业
            qq: res.data.dataMap.userResume.qq,                //qq号码
            gender: res.data.dataMap.userResume.gender,             //性别，0女1男
            realName: res.data.dataMap.userResume.realName,           //真实姓名
            school: res.data.dataMap.userResume.school,             //学校
            startSchool: res.data.dataMap.userResume.startSchool,        //入学年份
            jobtypeList: this.data.jobtypeList,          //期望职位
            jobTypeId: res.data.dataMap.userResume.jobtypeids.join(),
            email: res.data.dataMap.userResume.email,              //邮箱
            experience: res.data.dataMap.userResume.experience,         //工作经历
            eduSituation: res.data.dataMap.userResume.eduSituation,       //教育情况(数字形式0在校生 1已毕业)

          })
        } else {
          my.alert({
            content: res.data.msg
          });
        }
      },
    });


  },

  birth() {
    my.datePicker({    //出生年月
      format: 'yyyy-MM-dd',
      currentDate: this.data.birthday,
      startDate: '1900-12-15',
      endDate: '2020-12-15',
      success: (res) => {
        this.setData({
          birthday: res.date
        })
      },
    });
  },
  startSchooltime() {
    my.datePicker({    //入学
      format: 'yyyy',
      currentDate: this.data.startSchool,
      startDate: '1900-12-12',
      endDate: '2020-12-13',
      success: (res) => {
        this.setData({
          startSchool: res.date
        })
      },
    });

  },
  getProvince() {
    my.httpRequest({
      url: app.url + 'api/city/getProvince.do',   //获取省级城市
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        this.setData({
          provinceList: res.data.dataMap.CityList,
        })
      },
      fail: (res) => {
        my.alert({ content: '网络请求超时' });
      },
      complete: (res) => {
        my.hideLoading();
      }
    });
  },
  getChildrenCity(parentIdnub) {
    my.httpRequest({
      url: app.url + 'api/city/getChildrenCity.do',   //获取市级城市接口
      data: {
        parentId: parentIdnub
      },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        this.setData({
          cityList: res.data.dataMap.childsList,
          areaList: [
            {
              "id": '',
              "fullName": "请选择",
            }
          ]
        })
      },
      fail: (res) => {
        my.alert({ content: 'fail' });
      },
      complete: (res) => {
        my.hideLoading();
      }
    });
  },
  getArea(parentIdnub) {
    my.httpRequest({
      url: app.url + 'api/city/getArea.do',   //获取区域城市
      data: {
        parentId: parentIdnub
      },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        this.setData({
          areaList: res.data.dataMap.childsList
        })
      },
      fail: (res) => {
        my.alert({ content: 'fail' });
      },
      complete: (res) => {
        my.hideLoading();
      }
    });
  },
  TapIntro(e) {   //自我简述
    let introListStr = [];
    let itm = e.currentTarget.dataset.item;
    let introList = this.data.introList;
    for (let i in introList) {
      if (introList[i].text == itm) {
        introList[i].flag = !introList[i].flag;
      }
    }
    this.setData({
      introList: this.data.introList
    })
    for (let i in this.data.introList) {
      let item = introList[i];
      if (item.flag) {
        introListStr.push(item.text)
      }
    }
    this.setData({
      intro: introListStr.join()
    })
  },
  bindDegreePickerChange(e) {
    this.setData({
      degreeIndex: e.detail.value,
    });
  },
  bindProvincePickerChange(e) {
    this.setData({
      provinceIdIndex: e.detail.value,
      provinceId: this.data.provinceList[e.detail.value].id,
      cityId: '',
      areaId: '',
      cityIdIndex: 0,
      areaIdIddex: 0,
    });
    this.getChildrenCity(this.data.provinceList[e.detail.value].id)
  },
  bindCityPickerChange(e) {
    this.setData({
      cityIdIndex: e.detail.value,
      cityId: this.data.cityList[e.detail.value].id,
      areaId: '',
      areaIdIddex: 0,
    });
    this.getArea(this.data.cityList[e.detail.value].id)
  },
  bindAreaPickerChange(e) {
    this.setData({
      areaIdIddex: e.detail.value,
      areaId: this.data.areaList[e.detail.value].id
    });
  },
  radioChangeGender: function(e) {    //性别
    var str = null;
    for (let value of this.data.genderList) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({ radioStr: str });
  },
  post(e) {     //期望职位
    let jobTypeId = [];
    let itm = e.currentTarget.dataset.item;
    let sourcedata = this.data.jobtypeList;
    for (let i in sourcedata) {
      if (sourcedata[i].value == itm.value) {
        sourcedata[i].flag = !sourcedata[i].flag;
      }
    }

    this.setData({
      jobtypeList: this.data.jobtypeList
    })
    let jobtypeList = this.data.jobtypeList;
    for (let i in jobtypeList) {
      let item = jobtypeList[i];
      if (item.flag) {
        jobTypeId.push(item.value)
      }
    }
    this.setData({
      jobTypeId: jobTypeId.join()
    })
  },
  formSubmit: function(e) {
    if (e.detail.value.username == '') {
      my.alert({
        content: '请填写名字'
      });
    } else if (e.detail.value.school == '') {
      my.alert({
        content: '请填写学校'
      });
    } else if (e.detail.value.profession == '') {
      my.alert({
        content: '请填写专业'
      })
    } else if (this.data.jobTypeId == '') {
      my.alert({
        content: '请选择期望职位'
      })
    } else if (this.data.provinceId == '' || this.data.cityId == '' || this.data.areaId == '') {
      my.alert({
        content: '请选择所在城市'
      })
    } else if (e.detail.value.mobile == '') {
      my.alert({
        content: '请填写手机号'
      });
    }
    else {
      my.httpRequest({
        url: app.url + 'api/user/editUserInfo.do',
        method: 'POST',
        data: {
          token: this.data.token,          //用户身份认证
          provinceId: this.data.provinceId,       //省份ID
          cityId: this.data.cityId,            //城市ID
          areaId: this.data.areaId,            //区县ID
          headImageName: this.data.headImageName,     //用户头像保存在OSS上的文件名称
          birthday: this.data.birthday,         //用户生日日期，格式为"YYYY-MM-DD"
          weight: e.detail.value.weight,            //体重
          height: e.detail.value.height,            //身高
          degree: this.data.education[e.detail.value.degree],            //学历
          mobile: e.detail.value.mobile,            //电话
          intro: this.data.intro,             //简介
          profession: e.detail.value.profession,        //专业
          qq: e.detail.value.qq,                //qq号码
          gender: e.detail.value.gender,             //性别，0女1男
          realName: e.detail.value.realName,           //真实姓名
          school: e.detail.value.school,             //学校
          startSchool: this.data.startSchool,        //入学年份
          jobTypeId: this.data.jobTypeId,          //期望职位(职位类型的id,多个id传 , 隔开的字符串)
          email: e.detail.value.email,              //邮箱
          experience: e.detail.value.experience,         //工作经历
          eduSituation: e.detail.value.eduSituation      //教育情况(数字形式0在校生 1已毕业)
        },
        dataType: 'json',
        success: (res) => {
          if (res.data.code == 0) {
            // my.setStorageSync({
            //   key: 'location',
            //   data: {
            //     provinceIdIndex: this.data.provinceIdIndex,
            //     cityIdIndex: this.data.cityIdIndex,
            //     areaIdIddex: this.data.areaIdIddex,
            //   }
            // });
            my.navigateTo({
              url: '../resumes/resumes'
            });
          } else {
            my.alert({
              content: res.data.msg
            });
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
  chooseImage: function(e) {
    var that = this
    my.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let apFile = res.apFilePaths[0];
        my.httpRequest({
          url: app.url + 'ali/osstoken.do',
          success: (res) => {
            let dataMpa = res.data.dataMap
            my.uploadFile({
              url: 'http://localtestapi.ejzhi.com/oss/uploadFile.do',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              filePath: apFile,
              fileType: 'image',
              fileName: 'image',
              formData: {
                accessid: dataMpa.accessid,
                expire: dataMpa.expire,
                fileName: dataMpa.fileName,
                host: dataMpa.host,
                policy: dataMpa.policy,
                signature: dataMpa.signature
              },
              success: function(res) {
                let data = JSON.parse(res.data)
                // let url = data.dataMap.url;
                // let pos = url.lastIndexOf("/");
                // let headImageName = url.substring(pos + 1)
                // console.log(headImageName)
                if (data.code == 0) {
                  that.setData({
                    headerFile: data.dataMap.url,
                    headImageName: data.dataMap.url
                  })
                } else {
                  my.alert({
                    content: data.msg
                  })
                }
              },
              fail(res) {
                my.alert({
                  content: '网络请求超时'
                })
              },
            })
          },
        });
      }
    })
  }
});
