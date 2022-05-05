//常用工具函数

/**
 * 将时间戳转换为日期时间格式
 * @param {*} timestamp 时间戳
 */
export const timestampToTime = (timestamp) => {
    const datetime = new Date(parseInt(timestamp));

    const year = numberAddZero(datetime.getFullYear());
    const month = numberAddZero(datetime.getMonth() + 1);
    const day = numberAddZero(datetime.getDate());
    const hour = numberAddZero(datetime.getHours());
    const minutes = numberAddZero(datetime.getMinutes());
    const seconds = numberAddZero(datetime.getSeconds());
    const weekArr = ['星期天', '星期一','星期二','星期三','星期四','星期五','星期六'];
    const week = weekArr[datetime.getDay()];

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds} ${week}`;
};

/**
 * 给数字前面进行补零操作
 * @param {*} num 数字
 */
const numberAddZero = (num) => num >= 0 && num <= 9 ? num = '0' + num : num;


/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result
  
    const later = function() {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp
  
      // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }
  
    return function(...args) {
      context = this
      timestamp = +new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }
  
      return result
    }
}

/**['22-01', '22-02', '22-03']
 * 获取包括当前月份的前十二个月月份
 * @param {*} datetime 
 */
export function getFrontMonths(timestamp = new Date().getTime(), num = 12) {
  const datetime = new Date(parseInt(timestamp));
  let arr = [];
  let currentYear = datetime.getFullYear();  
  let currentMonth = numberAddZero(datetime.getMonth() + 1);        
  for (let i = 0; i < num; i++) {   
    if (currentMonth - i > 0) {    
      let year = numberAddZero(currentYear);       
      let month = numberAddZero(currentMonth - i);
      let time = `${year}-${month}`;
      arr.push(time);
    } else {
      let year = numberAddZero(currentYear - 1);
      let month = numberAddZero(12 - (Math.abs(currentMonth - i)));
      if (month <= 0) {
          month = numberAddZero(12);
      }
      let time = `${year}-${month}`;
      arr.push(time);
    }
  }
  return arr;
}

/**
 * 判断某个时间戳是否属于某个年月
 * @param {*} timestamp 
 * @param {*} str 
 * @returns 
 */
export function isBelongTheMonth(timestamp, str) {
  const datetime = new Date(parseInt(timestamp));
  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  if (year == str.substr(0, 4) && month == str.substr(5, 2)) {
    return true;
  }
  return false;
}

/***
 * 事件戳转时间
 */
export function timestampToTimeStr(timestamp) {
  const datetime = new Date(parseInt(timestamp));
  const year = datetime.getFullYear();
  const month = numberAddZero(datetime.getMonth() + 1);
  return `${year}-${month}`;
}
