const fs = require("fs");
const os = require("os");
// escapeQuot - value에 quotation(')이 포함 되어 있으면 escape
const escapeQuot = (value) => {
  if (!value && value !== 0) {
    return `''`;
  } else if (typeof value === "number") {
    return value;
  } else {
    let v = value;
    if (typeof value === "string") {
      v = value.replace(/'/g, "\\'");
    }
    return `'${v}'`;
  }
};
// escapeQuotAllowNull - value에 quotation(')이 포함 되어 있으면 escape & value가 null|undefined|0 이면 null
const escapeQuotAllowNull = (value) => {
  console.log("\nvalue : ", value);
  if (!value && value !== 0) {
    return null;
  } else if (typeof value === "number") {
    return value;
  } else if (typeof value === "boolean") {
    return value ? 1 : 0;
  } else {
    let v = value;
    if (typeof value === "string") {
      v = value.replace(/'/g, "\\'");
    }
    return `'${v}'`;
  }
};

function getDatetimeType(_date) {
  const year = new Date(_date).getFullYear();
  const month = new Date(_date).getMonth() + 1;
  const date = new Date(_date).getDate();

  const hours = new Date(_date).getHours();
  const minutes = new Date(_date).getMinutes();
  const seconds = new Date(_date).getSeconds();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    date < 10 ? `0${date}` : date
  } ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}
// date -> 2018-10-01
const dashFormYYMD = (date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  const YYMD = year + "-" + month + "-" + day;
  return YYMD;
};

// date -> 2019-04-16 14:34:30
const dashFormYYMDHMS = (date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let sec = date.getSeconds();
  if (sec < 10) {
    sec = "0" + sec;
  }
  const YYMDHMS =
    year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
  return YYMDHMS;
};
const YYMDtoKorMDForm = (str) => {
  // 20200324 -> 03월 24일
  if (typeof str === "number") {
    return `${str.toString().substr(4, 2)}월 ${str.toString().substr(6, 2)}일`;
  } else {
    return `${str.substr(4, 2)}월 ${str.substr(6, 2)}일`;
  }
};
const YYMDtoDashForm = (str) => {
  // 20200408 -> 2020-04-08
  if (!str || str.length === 0) {
    return null;
  } else if (typeof str === "number") {
    const toStr = str.toString();
    return `'${toStr.substr(0, 4)}-${toStr.substr(4, 2)}-${toStr.substr(
      6,
      2
    )}'`;
  } else {
    return `'${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)}'`;
  }
};
const numberWithCommas = (number) => {
  // 10000 -> '10,000'
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const setLog = (name, content) => {
  const now = new Date();
  const fileName = dashFormYYMD(now) + `_temp`;
  const log = `\n[${dashFormYYMDHMS(now)}][temp] '${name}' ${JSON.stringify(
    content
  )}`;
  try {
    // 폴더 미존재시
    if (!fs.existsSync("src/logs/temp")) {
      fs.mkdirSync("src/logs/temp");
    }
    // 파일 미존재시
    if (!fs.existsSync(`src/logs/temp/${fileName}.txt`)) {
      fs.writeFileSync(`src/logs/temp/${fileName}.txt`, log);
    }

    fs.readFileSync(`src/logs/temp/${fileName}.txt`, "utf8");
    fs.appendFileSync(`src/logs/temp/${fileName}.txt`, log);
  } catch (error) {
    fs.writeFileSync(`src/logs/temp/${fileName}.txt`, log);
  }
};

const getWeekOfMonth = (inputDate) => {
  // 인풋의 년, 월
  const _year = inputDate.getFullYear();

  const _setMonthWeek = (_date) => {
    const month = _date.getMonth();
    const date = _date.getDate();

    const base = _date.getDay() + 2;
    if (base > date) {
      return { month, weekNo: 1 };
    } else if (base > date - 7 * 1) {
      return { month, weekNo: 2 };
    } else if (base > date - 7 * 2) {
      return { month, weekNo: 3 };
    } else if (base > date - 7 * 3) {
      return { month, weekNo: 4 };
    } else if (base > date - 7 * 4) {
      const lastDay = new Date(_year, month + 1, 0);

      if (
        lastDay.getDay() === 6 ||
        _date.getDate() + 6 - _date.getDay() < lastDay.getDate()
      ) {
        return { month, weekNo: 5 };
      } else {
        return { month: month + 1, weekNo: 1 };
      }
    } else if (base > date - 7 * 5) {
      return { month: month + 1, weekNo: 1 };
    }
  };

  let { month: _month, weekNo } = _setMonthWeek(inputDate);

  const date = new Date(_year, _month);

  const [year, month] = [date.getFullYear(), date.getMonth() + 1];

  return {
    year,
    month,
    weekNo,
    format: `${year}년 ${month}월 ${weekNo}주차`,
    monthFormat: `${year}년 ${month}월`,
  };
};

const getServerIp = () => {
  let ifaces = os.networkInterfaces();
  let result = "";
  for (var dev in ifaces) {
    let alias = 0;
    ifaces[dev].forEach((details) => {
      if (details.family == "IPv4" && details.internal === false) {
        result = details.address;
        ++alias;
      }
    });
  }
  return result;
};
// function getServerIp() {
//   var ifaces = os.networkInterfaces();
//   var result = '';
//   for (var dev in ifaces) {
//       var alias = 0;
//       ifaces[dev].forEach(function(details) {
//           if (details.family == 'IPv4' && details.internal === false) {
//               result = details.address;
//               ++alias;
//           }
//       });
//   }

//   return result;
// }
module.exports = {
  escapeQuot,
  escapeQuotAllowNull,
  getDatetimeType,
  dashFormYYMD,
  dashFormYYMDHMS,
  YYMDtoKorMDForm,
  numberWithCommas,
  setLog,
  YYMDtoDashForm,
  getWeekOfMonth,
  getServerIp,
};
