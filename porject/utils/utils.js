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
    if (picName == '业务员') {
        return 'yewuyan'
    } else if (picName == '临时工') {
        return 'linshigong'
    } else if (picName == '主持') {
        return 'zhuchi'
    } else if (picName == '产品') {
        return 'chanpin'
    } else if (picName == '会计') {
        return 'kuaiji'
    } else if (picName == '促销') {
        return 'cuxiao'
    } else if (picName == '其他') {
        return 'qita'
    } else if (picName == '助教') {
        return 'zhujiao'
    } else if (picName == '安保') {
        return 'zhujiao'
    } else if (picName == '实习') {
        return 'shixi'
    } else if (picName == '客服') {
        return 'kefu'
    } else if (picName == '家教') {
        return 'jiajiao'
    } else if (picName == '志愿者') {
        return 'zhiyuanzhe'
    } else if (picName == '快递') {
        return 'kuaidi'
    } else if (picName == '扫码') {
        return 'saoma'
    } else if (picName == '技术') {
        return 'jishu'
    } else if (picName == '服务员') {
        return 'fuwuyuan'
    } else if (picName == '模特') {
        return 'mote'
    } else if (picName == '派单') {
        return 'paidan'
    } else if (picName == '演出') {
        return 'yanchu'
    } else if (picName == '礼仪') {
        return 'liyi'
    } else if (picName == '运营') {
        return 'yunying'
    } else if (picName == '业务员') {
        return 'yewuyuan'
    } else if (picName == '销售') {
        return 'xiaoXiaoshou'
    } else if (picName == '校内') {
        return 'xiaonei'
    } else if (picName == '文员') {
        return 'wenyuan'
    } else if (picName == '送餐') {
        return 'songcan'
    } else if (picName == '设计') {
        return 'sheji'
    } else if (picName == '翻译') {
        return 'fanyi'
    } else if (picName == '策划') {
        return 'chehua'
    } else {
        return 'qita'
    }
}

module.exports = {
    formatTime: formatTime,
    formatTimeTwo: formatTimeTwo,
    PicName: PicName
}