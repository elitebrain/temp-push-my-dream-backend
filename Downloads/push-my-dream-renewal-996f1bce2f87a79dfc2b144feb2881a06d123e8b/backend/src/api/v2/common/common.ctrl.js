const { Container } = require("typedi");
const axios = require("axios");
const admin = require("firebase-admin");

const { setLog, getServerIp } = require("shared/functions");
const { RATIO_PUSH_POINT } = require("shared/constants");

const CommonQuery = require("queries/CommonQuery");
const DeviceTokenQuery = require("queries/DeviceTokenQuery");
const DeviceTokenLogQuery = require("queries/DeviceTokenLogQuery");
const NoticeQuery = require("queries/NoticeQuery");
const PgLogQuery = require("queries/PgLogQuery");
const PushLogQuery = require("queries/PushLogQuery");
const UserQuery = require("queries/UserQuery");

const rank = require("libs/rank");
const pushCache = require("libs/cache/push");

const commonQuery = Container.get(CommonQuery);
const deviceTokenQuery = Container.get(DeviceTokenQuery);
const deviceTokenLogQuery = Container.get(DeviceTokenLogQuery);
const noticeQuery = Container.get(NoticeQuery);
const pgLogQuery = Container.get(PgLogQuery);
const pushLogQuery = Container.get(PushLogQuery);
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
    const pushLimit = await commonQuery.getPushLimit();

    res.status(200).send({
      categoryList,
      category2List,
      category3List,
      category4List,
      termsList,
      pushLimit,
      isAdmin: !!req.cookies["PADMIN"],
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryList = async (req, res, next) => {
  try {
    const {
      categoryList,
      category2List,
      category3List,
      category4List,
    } = await commonQuery.getCategoryList();

    res.status(200).send({
      categoryList,
      category2List,
      category3List,
      category4List,
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
    const { REQUEST_PAYMENT_URL, PAYMENT_KEY, PAYMENT_TEST_KEY } = process.env;
    const { user_id: userNo, pgcode, product_name: product, amount } = req.body;
    const pushPoint = amount * RATIO_PUSH_POINT;
    const insertRes = await pgLogQuery.setPgLog({
      userNo,
      pgcode,
      product,
      amount,
      pushPoint,
    });
    setLog("handleCharging", req.body);
    const data = Object.assign({}, req.body, { order_no: insertRes[0] });
    axios
      .post(REQUEST_PAYMENT_URL, data, {
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
    const {
      code,
      pgcode,

      amount,
      bank_name,
      account_no,
      expire_date,
      order_no: pgLogNo,
      cash_receipt_type,

      pay_info,
      message,
      user_id: userNo,
    } = req.body;
    if (code === "0") {
      if (pgcode === "virtualaccount") {
        await pgLogQuery.modifyPayInfo({
          pgLogNo,
          accountNo: account_no,
          bank_name,
          expire_date,
          status: 1,
        });
      } else if (pgcode === "creditcard" || pgcode === "banktransfer") {
        // 충전 검증 추가? (charginReturn에서 payhash db에 저장하고 charginCallback에서 확인 하면 될듯)
      }
      return res.redirect(
        `https://m.khanteum.com/charging/complete?pgLogNo=${pgLogNo}`
      );
    } else {
      // 실패
      // 충전 실패
      const status = 4;
      // await pgLogQuery.failureCharging({ pgLogNo, status });
      const pgLog = await pgLogQuery.getPgLog({ pgLogNo });
      await pgLogQuery.setPgCallback({
        parentNo: pgLogNo,
        userNo,
        pgcode,
        bank_name: pgLog.bank_name,
        pay_info,
        product: pgLog.product,
        amount,
        // pushPoint,
        // havePush,
        status,
        // charging_time
      });
      return res.status(200).send(message);
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
      transaction_date: charging_time,
      tid,
    } = req.body;
    const pgLog = await pgLogQuery.getPgLog({ pgLogNo });
    if (pgcode === "virtualaccount" && pay_info === pgLog.pay_info) {
      // 가상계좌 충전 성공
      const status = 2; // 1: 요청, 2: 완료, 3: 취소, 4: 오류
      const havePush = await userQuery.modifyPush({ userNo, amount });
      // await pgLogQuery.modifyPgLog({ pgLogNo, status, havePush });
      const pushPoint = amount * RATIO_PUSH_POINT;
      await pgLogQuery.setPgCallback({
        parentNo: pgLogNo,
        userNo,
        pgcode,
        bank_name: pgLog.bank_name,
        pay_info,
        product: pgLog.product,
        amount,
        pushPoint,
        havePush,
        status,
        charging_time,
        tid,
      });
      return res
        .status(200)
        .send({ code: 0, message: "PUSH 충전을 완료하였습니다." });
    } else if (pgcode === "creditcard" || pgcode === "banktransfer") {
      // 신용카드, 인터넷뱅킹 충전 성공
      const status = 2; // 1: 요청, 2: 완료, 3: 취소, 4: 오류
      const havePush = await userQuery.modifyPush({ userNo, amount });
      // await pgLogQuery.modifyPgLog({
      //   pgLogNo,
      //   status,
      //   havePush,
      //   charging_time,
      //   pay_info,
      // });
      const pushPoint = amount * RATIO_PUSH_POINT;
      await pgLogQuery.setPgCallback({
        parentNo: pgLogNo,
        userNo,
        pgcode,
        bank_name: pgLog.bank_name,
        pay_info,
        product: pgLog.product,
        amount,
        pushPoint,
        havePush,
        status,
        charging_time,
        tid,
      });
      return res
        .status(200)
        .send({ code: 0, message: "PUSH 충전을 완료하였습니다." });
    } else {
      // 충전 실패
      const status = 4;
      // await pgLogQuery.failureCharging({ pgLogNo, status });
      await pgLogQuery.setPgCallback({
        parentNo: pgLogNo,
        userNo,
        pgcode,
        bank_name: pgLog.bank_name,
        pay_info,
        product: pgLog.product,
        amount,
        // pushPoint,
        // havePush,
        status,
        // charging_time
      });
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
    await setLog(
      "chargingCancel",
      { query: req.query },
      { params: req.params }
    );
    return res
      .status(200)
      .send(
        `<script type="text/javascript">window.location.href="${req.query.charging_ref}";</script>`
      );
    // .send(`<script type="text/javascript">history.go(-2);</script>`);
  } catch (error) {
    console.log("\n\n\n error ", error);
    next(error);
  }
};
// [MEMO] - PG_LOG 테이블에 tid 컬럼 추가, status - 5: 환불 comment추가
// 환불 요청
exports.chargingRefund = async (req, res, next) => {
  // {
  //   "pgcode": "creditcard",
  //   "client_id": "khanteum",
  //   "user_id": 4991,
  //   "tid": "khanteum-202005061504067",
  //   "amount": 1000,
  //   "ip_addr": "210.89.181.155"
  // }
  // pgcode, user_id, tid, amount - req.body
  // client_id - 고정
  // ip_addr - os.networkInterfaces() 사용?
  try {
    const {
      REQUEST_PAYMENT_REFUND_URL,
      PAYMENT_KEY,
      PAYLETTER_CLIENT_ID,
    } = process.env;
    const { pgLogNo } = req.body;
    // const { pgcode, user_id, tid, amount } = req.body;
    const client_id = PAYLETTER_CLIENT_ID;
    const ip_addr = getServerIp();
    // const ip_addr = "210.89.181.155";
    const status = 5; // 환불
    const pgLog = await pgLogQuery.getPgLog({ pgLogNo });
    const {
      pgcode,
      user_no,
      tid,
      amount,
      bank_name,
      product,
      pay_info,
      push_point,
    } = pgLog;
    const data = {
      pgcode,
      client_id,
      user_id: user_no,
      tid,
      amount,
      ip_addr,
    };
    const refundAmount = amount * -1;
    const havePush = await userQuery.modifyPush({
      userNo: user_no,
      amount: refundAmount,
    });
    await pgLogQuery.setPgCallback({
      parentNo: pgLogNo,
      userNo: user_no,
      pgcode,
      bank_name,
      pay_info,
      product,
      amount: refundAmount,
      pushPoint: refundAmount * RATIO_PUSH_POINT,
      havePush,
      status,
      tid,
    });
    setLog("chargingRefund", { data, pgLog, refundAmount });
    await axios
      .post(REQUEST_PAYMENT_REFUND_URL, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: PAYMENT_KEY,
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

// PG_LOG 조회 (충전내역)
exports.getPgLog = async (req, res, next) => {
  try {
    const { pgLogNo } = req.query;
    const pgLogByParent = await pgLogQuery.getPgLogByParent({ pgLogNo });
    const pgLog = pgLogByParent || (await pgLogQuery.getPgLog({ pgLogNo }));
    return res.status(200).send(pgLog);
  } catch (error) {
    next(error);
  }
};
// 내 PG_LOG 전체 조회 (충전내역)
exports.getMyPgLog = async (req, res, next) => {
  try {
    const userNo = req.user.user_no;
    const { pgcode, startDate, endDate } = req.query;
    const myPgLog = await pgLogQuery.getMyPgLog({
      userNo,
      pgcode,
      startDate,
      endDate,
    });
    return res.status(200).send(myPgLog);
  } catch (error) {
    next(error);
  }
};

// 내 PUSH 내역 전체 조회
exports.getMyPushLog = async (req, res, next) => {
  try {
    const producerNo = req.user.user_no;
    const { categoryLevel2No, startDate, endDate, support } = req.query;
    const pushLog = await pushLogQuery.getMyPushLog({
      producerNo,
      categoryLevel2No,
      startDate,
      endDate,
      support: support === "true",
    });
    return res.status(200).send(pushLog);
  } catch (error) {
    next(error);
  }
};

exports.modifyTest = async (req, res, next) => {
  try {
    const { userNo, amount } = req.query;
    const modifyPush = await userQuery.modifyPush({ userNo, amount });
    console.log("modifyTest", modifyPush);
    setLog("modifyTest", modifyPush);
    return res.status(200).send({ modifyPush });
  } catch (error) {
    next(error);
  }
};

// 모든 타입 랭크 조회
exports.getRanks = async (req, res, next) => {
  try {
    const { categoryNo } = req.rarams;
  } catch (error) {
    next(error);
  }
};

exports.getRanksByUser = async (req, res, next) => {
  try {
    const { category3No, userNo } = req.params;

    const rankList = await rank.getChachingRankList({
      userType: "dreamer",
      category3No,
    });

    const {
      dreamer_weekOfRankList,
      dreamer_monthOfRankList,
      dreamer_seasonOfRankList,
    } = rankList;

    const Rank = {
      weekRank:
        dreamer_weekOfRankList &&
        dreamer_weekOfRankList.find((rank) => rank.user_no === Number(userNo)),
      monthRank:
        dreamer_monthOfRankList &&
        dreamer_monthOfRankList.find((rank) => rank.user_no === Number(userNo)),
      seasonRank:
        dreamer_seasonOfRankList &&
        dreamer_seasonOfRankList.find(
          (rank) => rank.user_no === Number(userNo)
        ),
    };

    return res.status(200).send({ rank: Rank });
  } catch (error) {
    next(error);
  }
};

// 타입별 랭크 조회
exports.getRanksByType = async (req, res, next) => {
  try {
    const { userType, type, category3No } = req.params;
    const { limit = -1 } = req.query;

    // 캐싱된 랭크 리스트 조회
    const rankList = await rank.getChachingRankListByType({
      category3No,
      userType,
      type,
      limit,
    });

    const season = await commonQuery.getOpenRound({ category3No });

    // producer이면 score 없이 sum_push로 구분한다.
    return res.status(200).send({
      message: "success get rank list",
      season,
      rankList: rankList
        .map((ranker) => ({ ...ranker }))
        .filter((ranker) =>
          userType === "producer"
            ? Number(ranker.sum_push)
            : Number(ranker.score)
        )
        .slice(0, limit),
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyPush = async (req, res, next) => {
  try {
    const userNo = req.user.user_no;
    const { targetUserNo } = req.query;
    const myPush = await pushLogQuery.getPushResult({
      targetUserNo,
      userNo,
    });
    return res.status(200).send(myPush);
  } catch (error) {
    next(error);
  }
};

// 카테고리 3번을 이용하여 카테고리에서 푸쉬가 가능한지 체크
exports.getIsPushByCategory3No = async (req, res, next) => {
  try {
    const { category3No } = req.params;

    const isPush = await commonQuery.getIsPushByCategory3No({ category3No });

    return res.status(200).send({ isPush });
  } catch (error) {
    next(error);
  }
};

// 배너 조회
exports.getBanners = async (req, res, next) => {
  try {
    const banners = await commonQuery.getBanners({});

    return res.status(200).send({ banners });
  } catch (error) {
    next(error);
  }
};

// 타입에 의한 배너 조회
exports.getBannersByType = async (req, res, next) => {
  try {
    const { type } = req.params;

    const banners = await commonQuery.getBanners({ type });

    return res.status(200).send({ banners });
  } catch (error) {
    next(error);
  }
};

// 현재까지의 푸쉬 조회
exports.getAllPush = async (req, res, next) => {
  try {
    const { push } = await pushCache.get();

    return res.status(200).send({ push });
  } catch (error) {
    next(error);
  }
};

// DeviceTokenLog
exports.setTokenLog = async (req, res, next) => {
  try {
    const { token, userNo, os } = req.body;
    await deviceTokenQuery.setToken({ token, userNo, os });
    const result = await deviceTokenLogQuery.setTokenLog({ token, userNo });
    return res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
};

// DeviceToken 조회
exports.getToken = async (req, res, next) => {
  try {
    const tokenList = await deviceTokenQuery.getTokenList();
    return res.status(200).send({ tokenList });
  } catch (error) {
    next(error);
  }
};

// FCM 전체메시지발송
exports.setFcmSendAll = async (req, res, next) => {
  try {
    const { notification, android } = req.body;
    // notification = {
    //   title: "title",
    //   body: "body"
    // }
    var serviceAccount = require("../../../keys/serviceAccountKey.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://khancomes-b277f.firebaseio.com",
    });
    const registrationTokens = [];
    const tokenList = await deviceTokenQuery.getTokenList();
    const length = Math.ceil(tokenList.length / 500);
    for (let i = 0; i < length; i++) {
      registrationTokens.push([]);
    }
    for (let i = 0; i < tokenList.length; i++) {
      const idx = Math.floor(i / 500);
      registrationTokens[idx].push(tokenList[i].token);
    }
    for (let i = 0; i < registrationTokens.length; i++) {
      const message = {
        notification,
        android,
        tokens: [
          "fb4kkWXa66o:APA91bE_QY3qwKe767w-RMWHjodrXC_tqXem4QLgWdkq1SiMveIKcqb_3nqqGz-UotI_sU8Z-nylC3q8RdG5pBaBPBYOcz9oYE1dUtvHAbT9v84AObKufKYJ82MOTp2zU-1j1Ha4M2z0",
        ],
      };
      // const message = { notification, tokens: registrationTokens[i] };
      setLog("setFcmSendAll", { message });
      admin
        .messaging()
        .sendMulticast(message)
        .then((response) => {
          setLog("setFcmSendAll", { response });
          if (response.failureCount > 0) {
            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
              if (!resp.success) {
                failedTokens.push(
                  [
                    "fb4kkWXa66o:APA91bE_QY3qwKe767w-RMWHjodrXC_tqXem4QLgWdkq1SiMveIKcqb_3nqqGz-UotI_sU8Z-nylC3q8RdG5pBaBPBYOcz9oYE1dUtvHAbT9v84AObKufKYJ82MOTp2zU-1j1Ha4M2z0",
                  ][idx]
                );
                // failedTokens.push(registrationTokens[i][idx]);
              }
            });
            console.log("List of tokens that caused failures: " + failedTokens);
            setLog("setFcmSendAll", { failedTokens });
          }
        });
    }
    res.status(200).send({ message: "FCM message sent" });
  } catch (error) {
    next(error);
  }
};

// 진행중인 경연(CATEGORY_LEVEL3) 목록
exports.getRunningCategoryLv3List = async (req, res, next) => {
  try {
    const categoryLevel3List = await commonQuery.getRunningCategoryLv3List({
      orderByCreatedAt: false,
    });
    res.status(200).send({ categoryLevel3List });
  } catch (error) {
    next(error);
  }
};
