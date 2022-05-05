function getFrontMonths(timestamp = new Date().getTime(), num = 12) {
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

const numberAddZero = (num) => num >= 0 && num <= 9 ? num = '0' + num : num;

// console.log(getFrontMonths(+new Date()));


// const str = '2022-03';
function isBelongTheMonth(timestamp, str) {
  const datetime = new Date(parseInt(timestamp));
  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  if (year == str.substr(0, 4) && month == str.substr(5, 2)) {
    return true;
  }
  return false;
}

// console.log(isBelongTheMonth(1647525808194, str));
// console.log(isBelongTheMonth(1624685411626, str));

function timestampToTime(timestamp) {
  const datetime = new Date(parseInt(timestamp));
  const year = datetime.getFullYear();
  const month = numberAddZero(datetime.getMonth() + 1);
  return `${year}-${month}`;
}
// console.log(timestampToTime(1624685411626));



function isTheMorningAtNoonOrEvening(timestamp = +new Date()) {
  const datetime = new Date(parseInt(timestamp));
  const hour = datetime.getHours();
  if (hour >= 5 && hour <= 10) {
    //早上【5:00 - 10:59】
    return 'morning';
  } else if(hour >= 11 && hour <= 18) {
    //中午【11:00 - 18:59】
    return 'nonn';
  } else {
    //晚上 其余时间
    return 'evening';
  }
}

console.log(isTheMorningAtNoonOrEvening());