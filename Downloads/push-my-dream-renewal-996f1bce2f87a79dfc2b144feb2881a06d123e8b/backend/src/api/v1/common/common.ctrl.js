const { Container } = require("typedi");
const axios = require("axios");

const {
  YYMDtoKorMDForm,
  numberWithCommas,
  setLog,
} = require("shared/functions");

const CommonQuery = require("queries/CommonQuery");
const NoticeQuery = require("queries/NoticeQuery");
const PgLogQuery = require("queries/PgLogQuery");
const UserQuery = require("queries/UserQuery");

const commonQuery = Container.get(CommonQuery);
const noticeQuery = Container.get(NoticeQuery);
const pgLogQuery = Container.get(PgLogQuery);
const userQuery = Container.get(UserQuery);

exports.getCommonData = async (req, res, next) => {
  try {
    const {
      categoryList,
      category2List,
      category3List,
      category4List,
    } = await commonQuery.getCategoryList();
    const termsList = await commonQuery.getTermsList();

    res.status(200).send({
      categoryList,
      category2List,
      category3List,
      category4List,
      termsList,
      isAdmin: !!req.cookies["PADMIN"],
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryList = async (req, res, next) => {
  try {
    const categoryList = await commonQuery.getCategoryList();

    res.status(200).send({
      categoryList,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTermsList = async (req, res, next) => {
  try {
    const termsList = await commonQuery.getTermsList();

    res.status(200).send(termsList);
  } catch (error) {
    next(error);
  }
};

exports.getCategoryByLv2 = async (req, res, next) => {
  // categoryLevel2No - 1: SINGER, 2: APPLE, 3: TRAINER, 4: DANCER, 5: CHOCO
  const categoryLevel2No = 2;
  try {
    const categoryList = await commonQuery.getCategoryByLv2(categoryLevel2No);

    res.status(200).send(categoryList);
  } catch (error) {
    next(error);
  }
};

// 팝업 게시글 조회
exports.getPopupNotice = async (req, res, next) => {
  try {
    const result = await noticeQuery.getPopupNotice();

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.handleCharging = async (req, res, next) => {
  try {
    const {
      REQUEST_PAYMENT_URL,
      PAYMENT_KEY,
      PAYMENT_TEST_KEY,
      REQUEST_PAYMENT_BANKTRANSFER_URL,
    } = process.env;
    const { user_id: userNo, pgcode, product_name: product, amount } = req.body;
    const pushPoint = amount * 1;
    const insertRes = await pgLogQuery.setPgLog({
      userNo,
      pgcode,
      product,
      amount,
      pushPoint,
    });
    setLog("handleCharging", req.body);
    const data = Object.assign({}, req.body, { order_no: insertRes[0] });
    const URL =
      pgcode === "banktransfer"
        ? REQUEST_PAYMENT_BANKTRANSFER_URL
        : REQUEST_PAYMENT_URL;
    axios
      .post(URL, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: PAYMENT_KEY,
          // Authorization: PAYMENT_TEST_KEY
        },
      })
      .then((result) => {
        return res.status(result.status).send(result.data);
      })
      .catch((err) => console.log("err : ", err));
  } catch (error) {
    next(error);
  }
};
exports.chargingReturn = async (req, res, next) => {
  try {
    setLog("chargingReturn", req.body);
    if (req.body.code === "0") {
      const {
        amount,
        bank_name,
        account_no,
        expire_date,
        order_no,
        custom_parameter,
        cash_receipt_type,
      } = req.body;
      console.log("custom_parameter", custom_parameter);
      if (req.body.pgcode === "virtualaccount") {
        await pgLogQuery.modifyPayInfo({
          pgLogNo: order_no,
          accountNo: account_no,
          bank_name,
          expire_date,
        });
        return res
          .status(200)
          .send(
            `<script type="text/javascript">window.location.href="http://127.0.0.1:3030/charging-complete?pgLogNo=${order_no}"</script>`
          );
        // `
        // <html>
        // <head>
        //   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        //   <style>
        //     body {
        //       margin: 0;
        //       padding: 0;
        //     }
        //   </style>
        // </head>
        // <body>
        //   <div style="text-align:center;padding:50px 10px;">
        //     <div style="font-size:22px;text-align:center;font-weight:500;padding-bottom:15px;">결제 성공</div>
        //     <div style="padding:60px 0 20px;border-top:2px solid #000;border-bottom:1px dashed #ccc;">
        //       <h4 style="color:#000;font-size:18px;margin:0;padding:0;">가상계좌 발급이 완료되었습니다.</h4>
        //       <p style="font-size:12px;text-align:left;padding:0 12px;">${bank_name} ${account_no}계좌로 ${YYMDtoKorMDForm(
        //   expire_date
        // )}까지 ${numberWithCommas(amount)}원을 입금해 주세요.</p>
        //     </div>
        //     <dl style="display:inline-block;vertical-align:top;padding-top:20px;">
        //       <dt style="padding-bottom:10px;color:#000;font-size:14px;">담당자</dt>
        //       <dd style="position:relative;float:left;padding:0 10px 0 6px;color:#555;font-size:14px;margin:0;">이영현</dd>
        //       <dd style="position:relative;float:left;color:#555;font-size:14px;margin:0;">/</dd>
        //       <dd style="position:relative;float:left;padding:0 10px 0 6px;color:#555;font-size:14px;margin:0;">010-8009-0105</dd>
        //       <dd style="position:relative;float:left;color:#555;font-size:14px;margin:0;">/</dd>
        //       <dd style="position:relative;float:left;padding:0 10px 0 6px;color:#555;font-size:14px;margin:0;">elitebrain@naver.com</dd>
        //     </dl>
        //     <div>
        //       <button style="border:none;border-radius:30px;background-color:#12ccc1;color:#fff;font-size:18px;margin:40px auto 0;width:140px;height:50px;line-height:50px;box-sizing:border-box;"onclick="history.go(-3)">확인</button>
        //     </div>
        //   </div>
        // </body>
        // </html>`
        // <button style="border:none;border-radius:30px;background-color:#12ccc1;color:#fff;font-size:18px;margin:40px auto 0;width:140px;height:50px;line-height:50px;box-sizing:border-box;"onclick="window.open('${custom_parameter}','_self')">확인</button>
        // );
      } else if (req.body.pgcode === "creditcard") {
        return res.status(200).send(
          `<div style="text-align:center;padding:50px 10px;">
            <div style="font-size:22px;text-align:center;font-weight:500;padding-bottom:15px;">결제 성공</div>
            <div style="padding:60px 0 20px;border-top:2px solid #000;border-bottom:1px dashed #ccc;">
              <h4 style="color:#000;font-size:18px;margin:0;padding:0;">결제가 완료되었습니다.</h4>
            </div>
            <dl style="display:inline-block;vertical-align:top;padding-top:20px;">
              <dt style="padding-bottom:10px;color:#000;font-size:14px;">담당자</dt>
              <dd style="position:relative;float:left;padding:0 10px 0 6px;color:#555;font-size:14px;margin:0;">이영현</dd>
              <dd style="position:relative;float:left;color:#555;font-size:14px;margin:0;">/</dd>
              <dd style="position:relative;float:left;padding:0 10px 0 6px;color:#555;font-size:14px;margin:0;">010-8009-0105</dd>
              <dd style="position:relative;float:left;color:#555;font-size:14px;margin:0;">/</dd>
              <dd style="position:relative;float:left;padding:0 10px 0 6px;color:#555;font-size:14px;margin:0;">elitebrain@naver.com</dd>
            </dl>
            <div>
              <button style="border:none;border-radius:30px;background-color:#12ccc1;color:#fff;font-size:18px;margin:40px auto 0;width:140px;height:50px;line-height:50px;box-sizing:border-box;"onclick="window.close()">확인</button>
            </div>
          </div>`
        );
      }
    } else {
      return res.status(200).send("PUSH 충전을 실패하였습니다.");
    }
  } catch (error) {
    next(error);
  }
};
exports.chargingCallback = async (req, res, next) => {
  // 가상계좌 callback 데이터 예시
  // {
  //   "amount":1000,
  //   "billkey":"",
  //   "card_info":"",
  //   "cash_receipt":{
  //     "cid":"",
  //     "code":"0",
  //     "deal_no":"",
  //     "issue_type":"1",
  //     "message":"",
  //     "payer_sid":"",
  //     "type":"06"
  //   },
  //   "cid":"1606137",
  //   "custom_parameter":"this is custom parameter",
  //   "discount_amount":0,
  //   "domestic_flag":"",
  //   "install_month":"",
  //   "nonsettle_amount":200,
  //   "order_no":"1234567890",
  //   "pay_info":"17031213919112",
  //   "payhash":"2ACDD8ECBA39BB3C4718AF01329C0BF6280B078D1C2E4BA82D2FF1E7AC3B82AD",
  //   "pgcode":"virtualaccount",
  //   "product_name":"테스트상품",
  //   "service_name":"페이레터",
  //   "tax_amount":20,
  //   "taxfree_amount":100,
  //   "tid":"pay_test-202003238171666",
  //   "transaction_date":"2020-03-23 16:06:14",
  //   "user_id":"test_user_id",
  //   "user_name":"테스터"
  // }
  try {
    setLog("chargingCallback", req.body);
    const {
      user_id: userNo,
      amount,
      order_no: pgLogNo,
      pgcode,
      pay_info,
      tid,
    } = req.body;
    const pgLog = await pgLogQuery.getPgLog({ pgLogNo });
    if (pgcode === "virtualaccount" && pay_info === pgLog.pay_info) {
      const status = 2; // 1: 요청, 2: 완료, 3: 취소, 4: 오류
      await pgLogQuery.modifyPgLog({ pgLogNo, status });
      await userQuery.modifyPush({ userNo, amount });
      return res
        .status(200)
        .send({ code: 0, message: "PUSH 충전을 완료하였습니다." });
    } else {
      return res
        .status(200)
        .send({ code: 9, message: "PUSH 충전을 실패하였습니다." });
    }
  } catch (error) {
    next(error);
  }
};
exports.chargingCancel = async (req, res, next) => {
  try {
    // GET /api/v1/common/charging/cancel 후 처리 할만한 data를 return 받는게 없음... 그냥 창닫기
    const refUrl = req.headers.cookie.split("; ")[
      req.headers.cookie.split("; ").findIndex((v) => v.indexOf("ref=") !== -1)
    ];
    await setLog("chargingCancel", req.query, req.params);
    return res
      .status(200)
      .send(`<script type="text/javascript">history.go(-4);</script>`);
  } catch (error) {
    console.log("\n\n\n error ", error);
    next(error);
  }
};

exports.test = async (req, res, next) => {
  try {
    const { data } = req.body;
    axios
      .post("https://nid.naver.com/oauth2.0/authorize", data)
      .then((result) => {
        console.log("\n\n result111111 : ", result);
        return res.status(200).send(result.data);
      });
  } catch (error) {
    next(error);
  }
};

exports.getPgLog = async (req, res, next) => {
  try {
    const { pgLogNo } = req.query;
    const pgLog = await pgLogQuery.getPgLog({ pgLogNo });
    return res.status(200).send(pgLog);
  } catch (error) {
    next(error);
  }
};
