const exec = require("child_process").exec; // child_process 모듈 추가
const nice = require("libs/nice");

const { Container } = require("typedi");

const CheckplusQuery = require("queries/CheckplusQuery");

const checkplusQuery = Container.get(CheckplusQuery);

exports.getCheckPlus = (req, res) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  //전달 암호화 데이터 초기화
  let sEncData = "";
  //처리 결과 메시지
  let sRtnMSG = "";

  const cmd = nice.getENCCMD();

  const child = exec(cmd, { encoding: "euc-kr" });

  child.stdout.on("data", function (data) {
    sEncData += data;
  });
  child.on("close", function () {
    //console.log(sEncData);
    //이곳에서 result처리 해야함.

    //처리 결과 확인
    if (sEncData == "-1") {
      sRtnMSG = "암/복호화 시스템 오류입니다.";
    } else if (sEncData == "-2") {
      sRtnMSG = "암호화 처리 오류입니다.";
    } else if (sEncData == "-3") {
      sRtnMSG = "암호화 데이터 오류 입니다.";
    } else if (sEncData == "-9") {
      sRtnMSG =
        "입력값 오류 : 암호화 처리시, 필요한 파라미터 값을 확인해 주시기 바랍니다.";
    } else {
      sRtnMSG = "";
    }

    res.render("checkplus_main.ejs", { sEncData, sRtnMSG });
  });
};

exports.checkPlusSuccess = (req, res) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  const sEncData = req.body.EncodeData;
  let cmd = "";
  let requestnumber = "";
  let authtype = "";
  let errcode = "";
  let sRtnMSG = "입력값 오류";

  if (/^0-9a-zA-Z+\/=/.test(sEncData) == true) {
    res.render("checkplus_fail.ejs", {
      sRtnMSG,
      requestnumber,
      authtype,
      errcode,
    });
  }

  if (sEncData != "") {
    cmd = nice.getDECCMD(sEncData);
  }

  let sDecData = "";

  const child = exec(cmd, { encoding: "euc-kr" });
  child.stdout.on("data", function (data) {
    sDecData += data;
  });
  child.on("close", async function () {
    //console.log(sDecData);

    //처리 결과 메시지
    let sRtnMSG = "";
    let requestnumber = "";
    let responsenumber = "";
    let authtype = "";
    let name = "";
    let birthdate = "";
    let gender = "";
    let nationalinfo = "";
    let dupinfo = "";
    let conninfo = "";
    let mobileno = "";
    let mobileco = "";

    //처리 결과 확인
    if (sDecData == "-1") {
      sRtnMSG = "암/복호화 시스템 오류";
    } else if (sDecData == "-4") {
      sRtnMSG = "복호화 처리 오류";
    } else if (sDecData == "-5") {
      sRtnMSG = "HASH값 불일치 - 복호화 데이터는 리턴됨";
    } else if (sDecData == "-6") {
      sRtnMSG = "복호화 데이터 오류";
    } else if (sDecData == "-9") {
      sRtnMSG = "입력값 오류";
    } else if (sDecData == "-12") {
      sRtnMSG = "사이트 비밀번호 오류";
    } else {
      //항목의 설명은 개발 가이드를 참조
      requestnumber = decodeURIComponent(nice.getValue(sDecData, "REQ_SEQ")); //CP요청 번호 , main에서 생성한 값을 되돌려준다. 세션등에서 비교 가능
      responsenumber = decodeURIComponent(nice.getValue(sDecData, "RES_SEQ")); //고유 번호 , 나이스에서 생성한 값을 되돌려준다.
      authtype = decodeURIComponent(nice.getValue(sDecData, "AUTH_TYPE")); //인증수단
      name = decodeURIComponent(nice.getValue(sDecData, "UTF8_NAME")); //이름
      birthdate = decodeURIComponent(nice.getValue(sDecData, "BIRTHDATE")); //생년월일(YYYYMMDD)
      gender = decodeURIComponent(nice.getValue(sDecData, "GENDER")); //성별
      nationalinfo = decodeURIComponent(
        nice.getValue(sDecData, "NATIONALINFO")
      ); //내.외국인정보
      dupinfo = decodeURIComponent(nice.getValue(sDecData, "DI")); //중복가입값(64byte)
      conninfo = decodeURIComponent(nice.getValue(sDecData, "CI")); //연계정보 확인값(88byte)
      mobileno = decodeURIComponent(nice.getValue(sDecData, "MOBILE_NO")); //휴대폰번호(계약된 경우)
      mobileco = decodeURIComponent(nice.getValue(sDecData, "MOBILE_CO")); //통신사(계약된 경우)
    }

    // await api.post("/", {
    //   sRtnMSG,
    //   requestnumber,
    //   responsenumber,
    //   authtype,
    //   name,
    //   birthdate,
    //   gender,
    //   nationalinfo,
    //   dupinfo,
    //   conninfo,
    //   mobileno,
    //   mobileco
    // });

    await checkplusQuery.setCheckplusLog({
      sEncData,
      sRtnMSG,
      requestnumber,
      responsenumber,
      authtype,
      name,
      birthdate,
      gender,
      nationalinfo,
      dupinfo,
      conninfo,
      mobileno,
      mobileco,
      errcode,
    });

    await res.render("checkplus_success.ejs", {
      sRtnMSG,
      requestnumber,
      responsenumber,
      authtype,
      name,
      birthdate,
      gender,
      nationalinfo,
      dupinfo,
      conninfo,
      mobileno,
      mobileco,
    });
  });
};

exports.checkPlusFailure = (req, res) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  const sEncData = req.body.EncodeData;
  let cmd = "";

  if (/^0-9a-zA-Z+\/=/.test(sEncData) == true) {
    sRtnMSG = "입력값 오류";
    requestnumber = "";
    authtype = "";
    errcode = "";
    res.render("checkplus_fail.ejs", {
      sRtnMSG,
      requestnumber,
      authtype,
      errcode,
    });
  }

  if (sEncData != "") {
    cmd = nice.getDECCMD(sEncData);
  }

  let sDecData = "";

  const child = exec(cmd, { encoding: "euc-kr" });
  child.stdout.on("data", function (data) {
    sDecData += data;
  });
  child.on("close", async function () {
    //console.log(sDecData);

    //처리 결과 메시지
    let sRtnMSG = "";
    let requestnumber = "";
    let authtype = "";
    let errcode = "";

    //처리 결과 확인
    if (sDecData == "-1") {
      sRtnMSG = "암/복호화 시스템 오류";
    } else if (sDecData == "-4") {
      sRtnMSG = "복호화 처리 오류";
    } else if (sDecData == "-5") {
      sRtnMSG = "HASH값 불일치 - 복호화 데이터는 리턴됨";
    } else if (sDecData == "-6") {
      sRtnMSG = "복호화 데이터 오류";
    } else if (sDecData == "-9") {
      sRtnMSG = "입력값 오류";
    } else if (sDecData == "-12") {
      sRtnMSG = "사이트 비밀번호 오류";
    } else {
      //항목의 설명은 개발 가이드를 참조
      requestnumber = decodeURIComponent(nice.GetValue(sDecData, "REQ_SEQ")); //CP요청 번호 , main에서 생성한 값을 되돌려준다. 세션등에서 비교 가능
      authtype = decodeURIComponent(nice.GetValue(sDecData, "AUTH_TYPE")); //인증수단
      errcode = decodeURIComponent(nice.GetValue(sDecData, "ERR_CODE")); //본인인증 실패 코드
    }

    await checkplusQuery.setCheckplusLog({
      sEncData,
      sRtnMSG,
      requestnumber,
      responsenumber,
      authtype,
      name,
      birthdate,
      gender,
      nationalinfo,
      dupinfo,
      conninfo,
      mobileno,
      mobileco,
      errcode,
    });

    res.render("checkplus_fail.ejs", {
      sRtnMSG,
      requestnumber,
      authtype,
      errcode,
    });
  });
};

exports.getCheckPlusSuccess = (req, res) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");

  const sEncData = req.query.EncodeData;
  let cmd = "";
  let requestnumber = "";
  let authtype = "";
  let errcode = "";
  let sRtnMSG = "입력값 오류";

  if (/^0-9a-zA-Z+\/=/.test(sEncData) == true) {
    res.render("checkplus_fail.ejs", {
      sRtnMSG,
      requestnumber,
      authtype,
      errcode,
    });
  }

  if (sEncData != "") {
    cmd = nice.getDECCMD(sEncData);
  }

  let sDecData = "";

  const child = exec(cmd, { encoding: "euc-kr" });
  child.stdout.on("data", function (data) {
    sDecData += data;
  });
  child.on("close", async function () {
    //console.log(sDecData);

    //처리 결과 메시지
    let sRtnMSG = "";
    let requestnumber = "";
    let responsenumber = "";
    let authtype = "";
    let name = "";
    let birthdate = "";
    let gender = "";
    let nationalinfo = "";
    let dupinfo = "";
    let conninfo = "";
    let mobileno = "";
    let mobileco = "";

    //처리 결과 확인
    if (sDecData == "-1") {
      sRtnMSG = "암/복호화 시스템 오류";
    } else if (sDecData == "-4") {
      sRtnMSG = "복호화 처리 오류";
    } else if (sDecData == "-5") {
      sRtnMSG = "HASH값 불일치 - 복호화 데이터는 리턴됨";
    } else if (sDecData == "-6") {
      sRtnMSG = "복호화 데이터 오류";
    } else if (sDecData == "-9") {
      sRtnMSG = "입력값 오류";
    } else if (sDecData == "-12") {
      sRtnMSG = "사이트 비밀번호 오류";
    } else {
      //항목의 설명은 개발 가이드를 참조
      requestnumber = decodeURIComponent(nice.getValue(sDecData, "REQ_SEQ")); //CP요청 번호 , main에서 생성한 값을 되돌려준다. 세션등에서 비교 가능
      responsenumber = decodeURIComponent(nice.getValue(sDecData, "RES_SEQ")); //고유 번호 , 나이스에서 생성한 값을 되돌려준다.
      authtype = decodeURIComponent(nice.getValue(sDecData, "AUTH_TYPE")); //인증수단
      name = decodeURIComponent(nice.getValue(sDecData, "UTF8_NAME")); //이름
      birthdate = decodeURIComponent(nice.getValue(sDecData, "BIRTHDATE")); //생년월일(YYYYMMDD)
      gender = decodeURIComponent(nice.getValue(sDecData, "GENDER")); //성별
      nationalinfo = decodeURIComponent(
        nice.getValue(sDecData, "NATIONALINFO")
      ); //내.외국인정보
      dupinfo = decodeURIComponent(nice.getValue(sDecData, "DI")); //중복가입값(64byte)
      conninfo = decodeURIComponent(nice.getValue(sDecData, "CI")); //연계정보 확인값(88byte)
      mobileno = decodeURIComponent(nice.getValue(sDecData, "MOBILE_NO")); //휴대폰번호(계약된 경우)
      mobileco = decodeURIComponent(nice.getValue(sDecData, "MOBILE_CO")); //통신사(계약된 경우)
    }

    // await api.post("/", {
    //   sRtnMSG,
    //   requestnumber,
    //   responsenumber,
    //   authtype,
    //   name,
    //   birthdate,
    //   gender,
    //   nationalinfo,
    //   dupinfo,
    //   conninfo,
    //   mobileno,
    //   mobileco
    // });

    await checkplusQuery.setCheckplusLog({
      sEncData,
      sRtnMSG,
      requestnumber,
      responsenumber,
      authtype,
      name,
      birthdate,
      gender,
      nationalinfo,
      dupinfo,
      conninfo,
      mobileno,
      mobileco,
      errcode,
    });

    await res.render("checkplus_success.ejs", {
      sRtnMSG,
      requestnumber,
      responsenumber,
      authtype,
      name,
      birthdate,
      gender,
      nationalinfo,
      dupinfo,
      conninfo,
      mobileno,
      mobileco,
    });
  });
};

exports.getCheckPlusFailure = (req, res) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  const sEncData = req.query.EncodeData;
  let cmd = "";

  if (/^0-9a-zA-Z+\/=/.test(sEncData) == true) {
    sRtnMSG = "입력값 오류";
    requestnumber = "";
    authtype = "";
    errcode = "";
    res.render("checkplus_fail.ejs", {
      sRtnMSG,
      requestnumber,
      authtype,
      errcode,
    });
  }

  if (sEncData != "") {
    cmd = nice.getDECCMD(sEncData);
  }

  let sDecData = "";

  const child = exec(cmd, { encoding: "euc-kr" });
  child.stdout.on("data", function (data) {
    sDecData += data;
  });
  child.on("close", async function () {
    //console.log(sDecData);

    //처리 결과 메시지
    let sRtnMSG = "";
    let requestnumber = "";
    let authtype = "";
    let errcode = "";

    //처리 결과 확인
    if (sDecData == "-1") {
      sRtnMSG = "암/복호화 시스템 오류";
    } else if (sDecData == "-4") {
      sRtnMSG = "복호화 처리 오류";
    } else if (sDecData == "-5") {
      sRtnMSG = "HASH값 불일치 - 복호화 데이터는 리턴됨";
    } else if (sDecData == "-6") {
      sRtnMSG = "복호화 데이터 오류";
    } else if (sDecData == "-9") {
      sRtnMSG = "입력값 오류";
    } else if (sDecData == "-12") {
      sRtnMSG = "사이트 비밀번호 오류";
    } else {
      //항목의 설명은 개발 가이드를 참조
      requestnumber = decodeURIComponent(nice.GetValue(sDecData, "REQ_SEQ")); //CP요청 번호 , main에서 생성한 값을 되돌려준다. 세션등에서 비교 가능
      authtype = decodeURIComponent(nice.GetValue(sDecData, "AUTH_TYPE")); //인증수단
      errcode = decodeURIComponent(nice.GetValue(sDecData, "ERR_CODE")); //본인인증 실패 코드
    }

    await checkplusQuery.setCheckplusLog({
      sEncData,
      sRtnMSG,
      requestnumber,
      responsenumber,
      authtype,
      name,
      birthdate,
      gender,
      nationalinfo,
      dupinfo,
      conninfo,
      mobileno,
      mobileco,
      errcode,
    });

    res.render("checkplus_fail.ejs", {
      sRtnMSG,
      requestnumber,
      authtype,
      errcode,
    });
  });
};
