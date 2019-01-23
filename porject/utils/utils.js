function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

// 转换图片name 
function PicName(picName) {
  const picBox = {
    2: '/images/offline/offline_practice.png',
    3: '/images/offline/offline_in_school.png',
    5: '/images/offline/offline_show.png',
    6: '/images/offline/offline_ceremony.png',
    7: '/images/offline/offline_model.png',
    8: '/images/offline/offline_host.png',
    9: '/images/offline/offline_security.png',
    11: '/images/offline/offline_tutor.png',
    12: '/images/offline/offline_assistant.png',
    14: '/images/offline/offline_dispatch.png',
    15: '/images/offline/offline_scan_code.png',
    16: '/images/offline/offline_promotion.png',
    17: '/images/offline/offline_sale.png',
    19: '/images/offline/offline_waiter.png',
    20: '/images/offline/offline_custom_service.png',
    21: '/images/offline/offline_room_service.png',
    22: '/images/offline/offline_express.png',
    24: '/images/offline/offline_translate.png',
    25: '/images/offline/offline_clerk.png',
    26: '/images/offline/offline_plan.png',
    27: '/images/offline/offline_editor.png',
    29: '/images/offline/offline_technology.png',
    30: '/images/offline/offline_product.png',
    31: '/images/offline/offline_operate.png',
    32: '/images/offline/offline_design.png',
    34: '/images/offline/offline_volunteer.png',
    35: '/images/offline/offline_casual.png',
    36: '/images/offline/offline_accounting.png',
    37: '/images/offline/offline_other.png'
  }
  return picBox[picName] || [];
}

module.exports = {
  formatTime: formatTime,
  formatTimeTwo: formatTimeTwo,
  PicName: PicName
}