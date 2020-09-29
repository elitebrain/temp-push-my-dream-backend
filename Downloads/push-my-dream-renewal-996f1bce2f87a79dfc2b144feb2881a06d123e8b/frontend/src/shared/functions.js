import _ from "lodash/object";
import moment from "moment";

const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const numberWithKMB = (number) => {
  if (!number || number.length === 0 || number === 0 || number === "0") {
    return "-";
  } else if (typeof number === "number") {
    return _setIntKMB(number);
  } else {
    return _setIntKMB(parseFloat(number));
  }
};
const _setIntKMB = (number) => {
  // 1, 12, 123, 1.23k, 12.3k, 123k, 1.23m, 12.3m, 123m, 1.23b, 12.34b, 123.45b, ...
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
const dashToDot = (text) => {
  return text.replace(/-/g, ".");
};
const ymdToDotYMD = (text) => {
  return text.replace(/\B(?=(\d{2})+(?!\d))/g, ".");
};
const findSearchStringValue = (search, key) => {
  const arr = search.substr(1).split("&");
  const keyValue = arr.filter((v) => v.indexOf(key) !== -1)[0];
  const value = keyValue ? keyValue.split("=")[1] : null;
  return value ? decodeURI(value) : null;
};

const getError = (error, content) => {
  const default_content = content ? content : "서버에 문제가 발생하였습니다.";

  return _.has(error, "response.status") && error.response.status === 500
    ? "서버에 문제가 발생하였습니다."
    : _.has(error, "response.data.message")
    ? error.response.data.message
    : default_content;
};

const getInitMap = () => {
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
  return moment(date).format("YY.MM.DD HH:mm");

  const yy = date.getFullYear().toString().substr(2);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${yy}.${doubleDigitsNum(month)}.${doubleDigitsNum(
    day
  )} ${doubleDigitsNum(hour)}:${doubleDigitsNum(min)}`;
};
const dateToDotYYMDHM = (date) => {
  return moment(date).format("YYYY.MM.DD HH:mm");
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

const getCookie = (name) => {
  var nameOfCookie = name + "=";
  var x = 0;
  while (x <= document.cookie.length) {
    var y = x + nameOfCookie.length;
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

const setSearchValueOfKey = (search, key, value) => {
  const arrSearch = search.substr(1).split("&");
  let returnSearch = "?";
  let existKey = false;
  for (let i = 0; i < arrSearch.length; i++) {
    if (arrSearch[i].split("=")[0] === key) {
      returnSearch += `${key}=${value}&`;
      existKey = true;
    } else if (arrSearch[i].length > 0) {
      returnSearch += `${arrSearch[i]}&`;
    }
  }
  if (!existKey) {
    // if (returnSearch.length === 1) {
    returnSearch += `${key}=${value}&`;
    // } else {
    //   returnSearch += `&${key}=${value}&`;
    // }
  }
  return returnSearch.substr(0, returnSearch.length - 1);
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
export {
  numberWithCommas,
  numberWithKMB,
  dashToDot,
  ymdToDotYMD,
  findSearchStringValue,
  getError,
  getInitMap,
  imgOnLoad,
  dateToDotYMDHM,
  dateToDotYYMDHM,
  getCookie,
  setSearchValueOfKey,
  setOrdinal,
};
