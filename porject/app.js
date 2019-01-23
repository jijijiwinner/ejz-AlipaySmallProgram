App({
  url: 'http://openapi.ejzhi.com/',   //            http://localtestapi.ejzhi.com/
  token: '',
  onLaunch(options) {
    try {
      let tokenData = my.getStorageSync({ key: 'token' });
      this.token = tokenData.data.token;
    } catch (error) {

    }
  },
  onShow(options) {

    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
