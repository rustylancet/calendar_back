const format = function (data) {
    return JSON.parse(JSON.stringify(data))
}
const success = function (data) {
    let result = {
        data: data,
        status: 200,
        message: '操作成功'
    }
    return result;
}
//获取当前月份的总天数
function getDays() {
    var date = new Date();
    //将当前月份加1，下移到下一个月
    date.setMonth(date.getMonth() + 1);
    //将当前的日期置为0，
    date.setDate(0);
    //再获取天数即取上个月的最后一天的天数
    var days = date.getDate();
    return days;
}

/**
 * 获取当月第一天
 * @returns Date()
 */
function getFirstDayOfMonth() {
    var date = new Date();
    date.setDate(1);
    return date;
}
/**
 * 获取当月第后一天
 * @returns Date()
 */
function getEndDayOfMonth() {
    var dateObj = new Date();
    var nextMonth = dateObj.getMonth() + 1; //0-11，下一个月
    //设置当前日期为下个月的1号
    dateObj.setMonth(nextMonth);
    dateObj.setDate(1);  //1-31

    var nextMonthFirstDayTime = dateObj.getTime(); //下个月一号对应毫秒
    var theMonthLastDayTime = nextMonthFirstDayTime - 24 * 60 * 60 * 1000;  //下个月一号减去一天，正好是这个月最后一天
    var theMonthDay = (new Date(theMonthLastDayTime));

    return theMonthDay;
}


/**
 * 获取某个月的总天数
 * 
 */
function getDaysOfMonth(year, month) {
    var date = new Date(year, month, 0);
    var days = date.getDate();
    return days;
}
/**
 * 判断某个日期是否在指定范围内
 * @param {范围起始} start 
 * @param {范围结束} end 
 */
function betweenDates(val, start, end) {
    if (val >= start && val <= end) {
        return true;
    }
    return false;
}

function formTimeWithoutTime(date) {
    var tmp = new Date(date.getFullYear().toString(), date.getMonth().toString(), date.getDate().toString(), 0, 0, 0)
    return tmp;
}
module.exports = {
    format,
    success,
    getDaysOfMonth,
    getDays,
    getFirstDayOfMonth,
    getEndDayOfMonth,
    betweenDates,
    formTimeWithoutTime
}