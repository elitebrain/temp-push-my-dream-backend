require("dotenv").config();
const https = require("https");
const http = require("http");
const fs = require("fs");
const createError = require("http-errors");
const express = require("express"); // express 모듈 추가
const bodyParser = require("body-parser"); // body-parser 모듈 추가
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const hpp = require("hpp");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const moment = require("moment");
const MongoStore = require("connect-mongo")(session);
const csrf = require("csurf");

const ApiRouter = require("api");
const { ping } = require("config/sequelize.config");
const { logger, stream } = require("config/winston.config");
const { jwtLogin } = require("middlewares/login");

const app = express();

const { NODE_ENV: env, PORT: port, SECRET, MONGO_URI } = process.env;

const options = {
  key: fs.readFileSync(__dirname + "/keys/key.pem"),
  cert: fs.readFileSync(__dirname + "/keys/cert.pem"),
};

/**
 * 현재 서버 상태가 프로덕션인지 확인
 */
const isProduction = process.env.NODE_ENV === "production";

/**
 * 정적 파일 서빙
 */
app.use("/static", express.static(__dirname + "/static"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("clients", []);
if (isProduction) {
  app.use(morgan("combined", { stream }));
  app.use(cors({ origin: true, credentials: true }));
  app.use(helmet());
  // req.query, req.body의 array 값을 가져올수 있게 한다.
  app.use(hpp());
} else {
  app.use(morgan("dev"));
  app.use(cors({ origin: true, credentials: true }));
  app.use(helmet());
  // req.query, req.body의 array 값을 가져올수 있게 한다.
  app.use(hpp());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(SECRET));
/**
 * Session store를 mongodb로 사용한다.
 */
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    name: "PSID",
    store: new MongoStore({
      url: MONGO_URI,
      collection: "sessions",
      ttl: 2 * 24 * 60 * 60,
      autoRemove: "native",
    }),
    cookie: {
      domain: env === "development" ? "127.0.0.1" : ".khanteum.com",
      httpOnly: true,
      secure: env === "production",
    },
  })
);

/**
 * csrf 토큰 인증 미들웨어
 */
app.use((req, res, next) => {
  // csrf({
  //   cookie: {
  //     domain: env === "development" ? "127.0.0.1" : ".khanteum.com",
  //     secure: env === "production",
  //   },
  // })(req, res, next);

  // checkplus url에서는 에외처리한다.
  if (["/checkplus", "/common/charging"].includes(req.url) === -1) {
    csrf({
      cookie: {
        domain: env === "development" ? "127.0.0.1" : ".khanteum.com",
        secure: env === "production",
      },
    })(req, res, next);
  } else {
    next();
  }
});

/**
 * XSRF-TOKEN 이름으로 토큰을 쿠키로 넘겨주면
 * 프론트단에서 axios가 자동으로 http header에 매핑되어 사용된다.
 */
app.all("*", function (req, res, next) {
  if (req.csrfToken) {
    res.cookie("XSRF-TOKEN", req.csrfToken(), {
      domain: env === "development" ? "127.0.0.1" : ".khanteum.com",
      secure: env === "production",
    });
  }

  return next();
});

app.get("/token", (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  return res.send({ message: "get token success" });
});

/**
 * 로그인 여부 검증 미들웨어
 */
app.use(jwtLogin());

/**
 * API 미들웨어
 */
app.use("/api", ApiRouter);

/**
 * 404 Error 에러 핸들링
 */
app.use((req, res, next) => {
  next(createError(404));
});

/**
 * 에러 관련 처리 핸들링
 */
app.use((err, req, res, next) => {
  let apiError = err;
  console.error(err);

  if (!err.status) {
    apiError = createError(err);
  }

  let status = 500;
  let message = "서버에 문제가 발생하였습니다.";

  if (apiError.code === "EBADCSRFTOKEN") {
    status = 403;
    message = "토큰이 검증되지 않았습니다.";
  } else {
    status = err.status || 500;
    message = status >= 500 ? "서버에 문제가 발생하였습니다." : err.message;
  }

  const errObj = {
    req: {
      headers: req.headers,
      query: req.query,
      body: req.body,
      route: req.route,
    },
    error: {
      message: apiError.message,
      stack: apiError.stack,
      status: apiError.status,
    },
    res: {
      status,
      message,
    },
    user: req.user,
  };

  logger.error(`${moment().format("YYYY-MM-DD HH:mm:ss")}`, errObj);
  res.status(status).send(message);
});

/**
 * 서버 오픈 이벤트
 */
if (["production", "test"].indexOf(env) !== -1) {
  https.createServer(options, app).listen(port, () => {
    ping();
    console.log("backend server openned %s", port);
  });
} else {
  http.createServer(options, app).listen(port, () => {
    ping();
    console.log("backend server openned %s", port);
  });
}
