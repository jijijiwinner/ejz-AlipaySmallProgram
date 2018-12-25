Page({
  data: {},
  onLoad() { },
  onShow() { },
  intoJobAssistant() {
    my.navigateTo({
      url: '../jobAssistant/jobAssistant'
    });
  },
  intoInform() {
    let res = my.getStorageSync({ key: 'token' });
    if (res.data == undefined) {
      my.navigateTo({
        url: '../log-in/log-in'
      });
    } else {
      my.navigateTo({
        url: '../inform/inform'
      });
    }
  }
});
