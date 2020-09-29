module.exports = (function () {
  const { NODE_ENV: env } = process.env;

  //NICE평가정보에서 발급한 본인인증 서비스 개발 정보(사이트 코드 , 사이트 패스워드)
  const sSiteCode = "BQ694";
  const sSitePW = "N8JNCxpvBW7Y";

  //IPIN 모듈의 절대 경로(권한:755 , FTP업로드방식 : binary)
  // ex) sModulePath = "C:\\module\\CPClient.exe";
  //     sModulePath = "/root/modile/CPClient";

  const sModulePath =
    env === "development"
      ? "C:\\work\\checkplus\\CPClient.exe"
      : "/root/modile/CPClient_64bit";

  const sAuthType = "M"; //없으면 기본 선택화면, X: 공인인증서, M: 핸드폰, C: 카드
  const sPopGubun = "Y"; //Y : 취소버튼 있음 / N : 취소버튼 없음
  const sCustomize = ""; //없으면 기본 웹페이지 / Mobile : 모바일페이지
  const sGender = ""; // 없으면 기본 선택화면, 0: 여자, 1: 남자

  // 본인인증 처리 후, 결과 데이타를 리턴 받기위해 다음예제와 같이 http부터 입력합니다.
  // 리턴url은 인증 전 인증페이지를 호출하기 전 url과 동일해야 합니다. ex) 인증 전 url : https://www.~ 리턴 url : https://www.~
  const sReturnUrl =
    env === "production"
      ? `${process.env.SERVER_URL}:4000/api/v2/checkplus/success`
      : env === "test"
      ? `${process.env.SERVER_URL_TEST}:4000/api/v2/checkplus/success`
      : "http://127.0.0.1:4000/api/v2/checkplus/success"; // 성공시 이동될 URL (방식 : 프로토콜을 포함한 절대 주소)
  const sErrorUrl =
    env === "production"
      ? `${process.env.SERVER_URL}:4000/api/v2/checkplus/fail`
      : env === "test"
      ? `${process.env.SERVER_URL_TEST}:4000/api/v2/checkplus/fail`
      : "http://127.0.0.1:4000/api/v2/checkplus/fail"; // 실패시 이동될 URL (방식 : 프로토콜을 포함한 절대 주소)

  const sReturnUrlInMobile =
    env === "production"
      ? `${process.env.SERVER_URL}:4000/api/v2/checkplus/mobile/success`
      : env === "test"
      ? `${process.env.SERVER_URL_TEST}:4000/api/v2/checkplus/mobile/success`
      : "http://127.0.0.1:4000/api/v2/checkplus/mobile/success";
  const sErrorUrlInMobile =
    env === "production"
      ? `${process.env.SERVER_URL}:4000/api/v2/checkplus/mobile/fail`
      : env === "test"
      ? `${process.env.SERVER_URL_TEST}:4000/api/v2/checkplus/mobile/fail`
      : "http://127.0.0.1:4000/api/v2/checkplus/mobile/fail";

  console.log(sReturnUrl, sErrorUrl, sReturnUrlInMobile, sErrorUrlInMobile);

  function getENCCMD(mobile) {
    const d = new Date();
    const sCPRequest = sSiteCode + "_" + d.getTime();

    const _returnUrl = mobile ? sReturnUrlInMobile : sReturnUrl;
    const _errorUrl = mobile ? sErrorUrlInMobile : sErrorUrl;

    //전달 원문 데이터 초기화
    let sPlaincData = "";

    sPlaincData =
      "7:REQ_SEQ" +
      sCPRequest.length +
      ":" +
      sCPRequest +
      "8:SITECODE" +
      sSiteCode.length +
      ":" +
      sSiteCode +
      "9:AUTH_TYPE" +
      sAuthType.length +
      ":" +
      sAuthType +
      "7:RTN_URL" +
      _returnUrl.length +
      ":" +
      _returnUrl +
      "7:ERR_URL" +
      _errorUrl.length +
      ":" +
      _errorUrl +
      "11:POPUP_GUBUN" +
      sPopGubun.length +
      ":" +
      sPopGubun +
      "9:CUSTOMIZE" +
      sCustomize.length +
      ":" +
      sCustomize +
      "6:GENDER" +
      sGender.length +
      ":" +
      sGender;

    const cmd =
      sModulePath +
      " " +
      "ENC" +
      " " +
      sSiteCode +
      " " +
      sSitePW +
      " " +
      sPlaincData;

    return cmd;
  }

  function getDECCMD(sEncData) {
    const cmd =
      sModulePath +
      " " +
      "DEC" +
      " " +
      sSiteCode +
      " " +
      sSitePW +
      " " +
      sEncData;

    return cmd;
  }

  function getValue(plaindata, key) {
    var arrData = plaindata.split(":");
    var value = "";
    for (i in arrData) {
      var item = arrData[i];
      if (item.indexOf(key) == 0) {
        var valLen = parseInt(item.replace(key, ""));
        arrData[i++];
        value = arrData[i].substr(0, valLen);
        break;
      }
    }
    return value;
  }

  return { getENCCMD, getDECCMD, getValue };
})();
