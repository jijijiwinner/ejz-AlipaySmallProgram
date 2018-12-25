App({
  url: 'http://openapi.ejzhi.com/',   //            http://localtestapi.ejzhi.com/
  data: {
    token: ''
  },
  onLaunch(options) {
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
