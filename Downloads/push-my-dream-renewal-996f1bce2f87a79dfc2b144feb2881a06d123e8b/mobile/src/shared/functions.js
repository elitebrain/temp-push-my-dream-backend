import moment from "moment";
import Router from "next/router";

const numberWithCommas = (number) => {
  // 10000 -> '10,000'
  if (number) {
    if (number.toString().substr(0, 1) === "0") {
      return number
        .toString()
        .substr(1)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  } else {
    return "0";
  }
};
const strToInt = (str) => {
  // '10000' -> 10000, '10,000' -> 10000, 10000 -> 10000
  if (/^[0-9,]*$/.test(str)) {
    if (typeof str === "number") {
      return str;
    } else {
      return parseInt(str.replace(/,/g, ""), 10);
    }
  } else {
    return "";
  }
};
const numberWithKMB = (number) => {
  if (!number || number.length === 0 || number === 0 || number === "0") {
    return "-";
  } else if (typeof number === "number") {
    return _setKMB(number);
  } else {
    return _setKMB(parseFloat(number));
  }
};
const _setKMB = (number) => {
  if (number < 1000) {
    return number;
  } else if (number < 10000) {
    return `${(number / 1000).toFixed(2)}k`;
  } else if (number < 100000) {
    return `${(number / 1000).toFixed(1)}k`;
  } else if (number < 1000000) {
    return `${(number / 1000).toFixed(0)}k`;
  } else if (number < 10000000) {
    return `${(number / 1000000).toFixed(2)}m`;
  } else if (number < 100000000) {
    return `${(number / 1000000).toFixed(1)}m`;
  } else if (number < 1000000000) {
    return `${(number / 1000000).toFixed(0)}m`;
  } else {
    return `${(number / 1000000000).toFixed(2)}b`;
  }
};
export const dashToDot = (text) => {
  return text.replace(/-/g, ".");
};
export const ymdToDotYMD = (text) => {
  return text.replace(/\B(?=(\d{2})+(?!\d))/g, ".");
};
export const findSearchStringValue = (search, key) => {
  const arr = search.substr(1).split("&");
  const keyValue = arr.filter((v) => v.indexOf(key) !== -1)[0];
  const value = keyValue ? keyValue.split("=")[1] : null;
  return value ? decodeURI(value) : null;
};

export const getError = (error, content) => {
  const default_content = content
    ? content
    : `서버가 응답하지 않습니다.\n
  잠시 후 다시 이용해 주세요!`;

  //   페이지를 정상 표시할 수 없습니다.
  // 관리자에게 문의해주세요!

  // 서버가 응답하지 않습니다.
  // 서비스 이용에 불편드려 죄송합니다.
  // 문제가 반복되면 고객센터로 문의해주세요.
  // 고객센터: 02-6101-9285

  return error && error.response && error.response.status === 500
    ? `서버가 응답하지 않습니다.\n
    잠시 후 다시 이용해 주세요!`
    : (error &&
        error.response &&
        error.response.data &&
        error.response.data.message) ||
        (error && error.response && error.response.data) ||
        default_content;
};

export const getInitMap = () => {
  const container = document.getElementById("map");

  // https://devtalk.kakao.com/t/api-api/36757
  // http://apis.map.kakao.com/web/documentation/#load

  window.kakao.maps.load(function () {
    const options = {
      center: new window.kakao.maps.LatLng(37.482029, 126.898977),
      level: 4,
    };

    const map = new window.kakao.maps.Map(container, options);

    // 마커가 표시될 위치입니다
    const markerPosition = new window.kakao.maps.LatLng(37.4821, 126.89898);

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  });
};
const imgOnLoad = (e, setWidth, setHeight, width = 1, height = 1) => {
  const ratio = e.target.naturalWidth / e.target.naturalHeight;
  const baseRatio = width / height;
  if (ratio > baseRatio) {
    setWidth("auto");
    setHeight("100%");
  } else {
    setWidth("100%");
    setHeight("auto");
  }
};

const dateToDotYMDHM = (date) => {
  // date -> 20.04.14 15:02
  const yy = date.getFullYear().toString().substr(2);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${yy}.${doubleDigitsNum(month)}.${doubleDigitsNum(
    day
  )} ${doubleDigitsNum(hour)}:${doubleDigitsNum(min)}`;
};
const dateToDotMD = (date) => {
  // date -> 04.14
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${doubleDigitsNum(month)}.${doubleDigitsNum(day)}`;
};
const dateToDotYYMD = (date) => {
  // date -> 2020.04.14
  const yyyy = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${yyyy}.${doubleDigitsNum(month)}.${doubleDigitsNum(day)}`;
};
const dateToDotYYMDHM = (date) => {
  // date -> 2020.04.14 15:02
  const yyyy = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${yyyy}.${doubleDigitsNum(month)}.${doubleDigitsNum(
    day
  )} ${doubleDigitsNum(hour)}:${doubleDigitsNum(min)}`;
};

const doubleDigitsNum = (num) => {
  return num < 10 ? `0${num}` : num;
};

const setControlBarPosition = () => {
  const arrControlBar = document.querySelectorAll(
    ".swiper-slide .vjs-control-bar"
  );
  const arrBottom = document.querySelectorAll(".swiper-slide .bottom");
  // const diff =
  //   document.querySelector(".swiper-container").offsetHeight -
  //   window.innerHeight +
  //   51;
  // // if (diff !== 0) {
  // //   for (let i = 0; i < arrControlBar.length; i++) {
  // //     arrControlBar[i].style.bottom = "75px";
  // //   }
  // //   for (let i = 0; i < arrBottom.length; i++) {
  // //     arrBottom[i].style.bottom = "125px";
  // //   }
  // // } else {
  // //   for (let i = 0; i < arrControlBar.length; i++) {
  // //     arrControlBar[i].style.bottom = "0px";
  // //   }
  // //   for (let i = 0; i < arrBottom.length; i++) {
  // //     arrBottom[i].style.bottom = "50px";
  // //   }
  // // }
  // if (diff !== 0) {
  //   for (let i = 0; i < arrControlBar.length; i++) {
  //     arrControlBar[i].style.bottom = `${diff}px`;
  //   }
  //   for (let i = 0; i < arrBottom.length; i++) {
  //     arrBottom[i].style.bottom = `${diff + 50}px`;
  //   }
  // } else {
  //   for (let i = 0; i < arrControlBar.length; i++) {
  //     arrControlBar[i].style.bottom = "0px";
  //   }
  //   for (let i = 0; i < arrBottom.length; i++) {
  //     arrBottom[i].style.bottom = "50px";
  //   }
  // }
};

const setSearchValueOfKey = (search, key, value) => {
  const arrSearch = search.substr(1).split("&");
  let returnSearch = "?";
  let existKey = false;
  for (let i = 0; i < arrSearch.length; i++) {
    if (arrSearch[i].split("=")[0] === key) {
      returnSearch += `${key}=${value}&`;
      existKey = true;
    } else {
      returnSearch += `${arrSearch[i]}&`;
    }
  }
  if (!existKey) {
    if (returnSearch.length === 1) {
      returnSearch += `${key}=${value}&`;
    } else {
      returnSearch += `&${key}=${value}&`;
    }
  }
  return returnSearch.substr(0, returnSearch.length - 1);
};

const checkFormPhone = (text) => {
  return /^([0-9]{10,20})$/.test(text);
};
const checkFormEmail = (text) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    text
  );
};

/**
 * t 이상의 number format을 지원하려면 알고리즘을 다시 만드러야합니다.
 * ex) 1,235t
 */

const setNumberFormat = (number) => {
  const tempNumber =
    Number(number) === Number(0) ? String(0) : numberWithCommas(number);

  const commaSplit = tempNumber.split(",");

  const numberForamt = { 1: "", 2: "k", 3: "m", 4: "b", 5: "t" };

  return `${
    commaSplit[0].length < 3 && commaSplit.length > 1
      ? `${commaSplit[0]}${
          Boolean(Number(commaSplit[1].slice(0, 3 - commaSplit[0].length)))
            ? `.${commaSplit[1].slice(0, 3 - commaSplit[0].length)}`
            : ""
        }`
      : commaSplit[0]
  }${numberForamt[commaSplit.length]}`;
};

/**
 * 참고 : https://falsy.me/javascript-%EC%9E%85%EB%A0%A5%ED%95%9C-%EB%82%A0%EC%A7%9C%EC%9D%98-%ED%95%B4%EB%8B%B9-%EB%8B%AC-%EA%B8%B0%EC%A4%80-%EC%A3%BC%EC%B0%A8-%EA%B5%AC%ED%95%98%EA%B8%B0/
 */
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

const dateToKorYYMDHMS = (date) => {
  // date -> 2020년 04월 08일 17:19:30
  const year = date.getFullYear();
  const month = setDigit(date.getMonth() + 1);
  const day = setDigit(date.getDate());
  const hours = setDigit(date.getHours());
  const minutes = setDigit(date.getMinutes());
  const seconds = setDigit(date.getSeconds());
  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
};
const dateToKorYYMD = (date) => {
  // date -> 2020년 04월 08일
  const year = date.getFullYear();
  const month = setDigit(date.getMonth() + 1);
  const day = setDigit(date.getDate());
  return `${year}년 ${month}월 ${day}일`;
};
const dateToDashYYMD = (date) => {
  // date -> 2020-04-14
  const year = date.getFullYear();
  const month = setDigit(date.getMonth() + 1);
  const day = setDigit(date.getDate());
  return `${year}-${month}-${day}`;
};
const dateToKorYYM = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}년 ${month}월`;
};
const dateToHMS = (date) => {
  // date -> 15:03:30
  const hours = setDigit(date.getHours());
  const minutes = setDigit(date.getMinutes());
  const seconds = setDigit(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
};
const setDigit = (num) => {
  // 10 -> 10, 9 -> 09
  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
};

const setPeriod = (
  periodGubun,
  setIsDirectPeriod,
  setEndDate,
  setStartDate
) => {
  const now = new Date();
  if (periodGubun !== "direct") {
    setIsDirectPeriod(false);
    setEndDate(dateToDashYYMD(now));
  }
  if (periodGubun === "week") {
    setStartDate(
      dateToDashYYMD(
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 6,
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        )
      )
    );
  } else if (periodGubun === "month") {
    setStartDate(
      dateToDashYYMD(
        new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate() + 1,
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        )
      )
    );
  } else if (periodGubun === "threemonth") {
    setStartDate(
      dateToDashYYMD(
        new Date(
          now.getFullYear(),
          now.getMonth() - 3,
          now.getDate() + 1,
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        )
      )
    );
  } else if (periodGubun === "direct") {
    setIsDirectPeriod(true);
  }
};

const setOrdinal = (number) => {
  let num = typeof number === "number" ? number : parseInt(number);
  if (num === 1) {
    return "1st";
  } else if (num === 2) {
    return "2nd";
  } else if (num === 3) {
    return "3rd";
  } else {
    return `${num}th`;
  }
};

function weekOfMonth(m) {
  return m.week() - moment(m).startOf("month").week() + 1;
}

function formatRatio(ratio, unit) {
  return ratio.replace(/[.]0/, "") + unit;
}

/**
 * 숫자 3자리수 사이에 ,를 붙힌다.
 * 숫자가 만약 0이라면 -를 표시한다.
 */
function numberWithCommasAndCheckNone(number, unit) {
  const _number = Number(number);

  return _number > 0
    ? `${numberWithCommas(_number)}${unit ? ` ${unit}` : ""}`
    : "-";
}

const checkPcOrMobile = () => {
  const agent = navigator.userAgent.toLowerCase();
  if (agent.indexOf("mobile") === -1) {
    return "pc";
  } else {
    return "mobile";
  }
};

const getCookie = (name) => {
  const nameOfCookie = `${name}=`;
  let x = 0;
  while (x <= document.cookie.length) {
    const y = x + nameOfCookie.length;
    if (document.cookie.substring(x, y) == nameOfCookie) {
      let endOfCookie;
      if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
        endOfCookie = document.cookie.length;
      return unescape(document.cookie.substring(y, endOfCookie));
    }
    x = document.cookie.indexOf(" ", x) + 1;
    if (x == 0) break;
  }
  return "";
};

const handleRedirectUrl = (url) => {
  if (url) {
    // url에 protocol이 포함되어 있으면 location.href, pathname만 있으면 Router.push
    if (url.indexOf("https://") === -1 && url.indexOf("http://") === -1) {
      Router.push(url);
    } else {
      window.location.href = url;
    }
  }
};

export {
  weekOfMonth,
  imgOnLoad,
  dateToDotMD,
  dateToDotYMDHM,
  dateToDotYYMD,
  dateToDotYYMDHM,
  setControlBarPosition,
  setSearchValueOfKey,
  checkFormPhone,
  checkFormEmail,
  numberWithKMB,
  numberWithCommas,
  numberWithCommasAndCheckNone,
  strToInt,
  setNumberFormat,
  getWeekOfMonth,
  dateToKorYYMDHMS,
  dateToKorYYMD,
  dateToDashYYMD,
  dateToHMS,
  setPeriod,
  dateToKorYYM,
  setOrdinal,
  formatRatio,
  checkPcOrMobile,
  getCookie,
  handleRedirectUrl,
};
