const path = require("path");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { Container } = require("typedi");
const bcrypt = require("bcryptjs");
const videoFile = require("libs/videoFile");

const UserQuery = require("queries/UserQuery");

const userQuery = Container.get(UserQuery);

exports.profile = (function () {
  const {
    NCLOUD_ACCESS_KEY,
    NCLOUD_SECRET_KEY,
    NCLOUD_ENDPOINT,
    NCLOUD_REGION,
    NCLOUD_BUCKET_NAME,
    NCLOUD_STORAGE_URL,
    DEFAULT_IMAGE_URL,
  } = process.env;

  AWS.config.update({
    accessKeyId: NCLOUD_ACCESS_KEY,
    secretAccessKey: NCLOUD_SECRET_KEY,
  });

  const s3 = new AWS.S3({
    endpoint: NCLOUD_ENDPOINT,
    region: NCLOUD_REGION,
  });

  const signUpUpload = multer({
    storage: multerS3({
      s3,
      bucket: NCLOUD_BUCKET_NAME,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: async function (req, file, cb) {
        const {
          userName,
          di,
          email,
          gender,
          country,
          birthdate,
          phone,
          password,
          nickname,
          termsApplyTime,
          loginType,
          id,
        } = req.body;

        const check = await userQuery.checkUnique({
          di,
          email,
          phone,
          nickname,
          loginType,
          id,
        });

        // 중복된 값이 존재시
        if (check) {
          if (check.di === di) {
            cb({ code: 400, message: "이미 등록된 정보입니다." });
            return;
          }

          if (check.email === email) {
            cb({ code: 400, message: "이미 등록된 이메일입니다." });
            return;
          }

          if (check.nickname === nickname) {
            cb({ code: 400, message: "이미 등록된 닉네임입니다." });
            return;
          }
          if (
            check.kakao_id === id ||
            check.google_id === id ||
            check.naver_id === id ||
            check.local_id === email
          ) {
            cb({ code: 400, message: "이미 등록된 정보입니다." });
            return;
          }
        }

        let user_no;
        if (loginType === "local") {
          const hash = await bcrypt.hash(password, 12);
          const res = await userQuery.setLocalUser({
            userName,
            di,
            email,
            gender,
            country,
            birthdate,
            phone,
            nickname,
            termsApplyTime,
            hash,
          });
          user_no = res[0];
        } else {
          const res = await userQuery.setUser({
            userName,
            di,
            email,
            gender,
            country,
            birthdate,
            phone,
            nickname,
            termsApplyTime,
            loginType,
            id,
          });
          user_no = res[0];
        }

        req.user_no = user_no;

        // const extName = path.extname(file.originalname);
        cb(null, `u/${user_no}/avatar-${+new Date()}.png`);
      },
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
    }),
  });

  const signUpMobileUpload = multer({
    storage: multerS3({
      s3,
      bucket: NCLOUD_BUCKET_NAME,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: async function (req, file, cb) {
        const {
          isSignup,
          isTerms,
          isLogin,
          isCheckIdentityCertificate,
        } = req.session.signup;

        if (!isSignup || !isTerms || !isLogin || !isCheckIdentityCertificate) {
          cb({
            code: 400,
            sessionError: true,
            message: "세션이 만료되었습니다",
          });
          return;
        }

        const { email, id, type, password } = req.session.signup.login;
        const {
          dupinfo,
          mobileno,
          birthdate,
          name,
          gender,
          nationalinfo: country,
        } = req.session.signup.checkplus;

        const { nickname } = req.body;

        const check = await userQuery.checkUnique({
          di: dupinfo,
          email,
          phone: `${mobileno.slice(0, 3)}-${mobileno
            .slice(3)
            .replace(/\B(?=(\d{4})+(?!\d))/, "-")}`,
          nickname,
          loginType: type,
          id,
        });

        // 중복된 값이 존재시
        if (check) {
          if (check.di === dupinfo) {
            cb({ code: 400, message: "이미 등록된 정보입니다." });
            return;
          }

          if (check.email === email) {
            cb({ code: 400, message: "이미 등록된 이메일입니다." });
            return;
          }

          if (check.nickname === nickname) {
            cb({ code: 400, message: "이미 등록된 닉네임입니다." });
            return;
          }
          if (
            check.kakao_id === id ||
            check.google_id === id ||
            check.naver_id === id ||
            check.local_id === email
          ) {
            cb({ code: 400, message: "이미 등록된 정보입니다." });
            return;
          }
        }

        let user_no;
        if (type === "local") {
          const hash = await bcrypt.hash(password, 12);
          const res = await userQuery.setLocalUser({
            userName: name,
            di: dupinfo,
            email,
            gender,
            country,
            birthdate,
            phone: `${mobileno.slice(0, 3)}-${mobileno
              .slice(3)
              .replace(/\B(?=(\d{4})+(?!\d))/, "-")}`,
            nickname,
            termsApplyTime: new Date(),
            hash,
            file,
          });
          user_no = res[0];
        } else {
          const res = await userQuery.setUser({
            userName: name,
            di: dupinfo,
            email,
            gender,
            country,
            birthdate,
            phone: `${mobileno.slice(0, 3)}-${mobileno
              .slice(3)
              .replace(/\B(?=(\d{4})+(?!\d))/, "-")}`,
            nickname,
            termsApplyTime: new Date(),
            loginType: type,
            id,
            file,
          });
          user_no = res[0];
        }

        req.user_no = user_no;

        // const extName = path.extname(file.originalname);
        cb(null, `u/${user_no}/avatar-${+new Date()}.png`);
      },
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
    }),
  });

  const updateUpload = multer({
    storage: multerS3({
      s3,
      bucket: NCLOUD_BUCKET_NAME,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: async function (req, file, cb) {
        const { nickname } = req.body;

        const user = req.user;
        // const extName = path.extname(file.originalname);

        if (nickname) {
          const check = await userQuery.getNickname(nickname);

          if (check) {
            cb({ code: 400, message: "이미 가입된 닉네임입니다.", e: 1 });
            return;
          }
          const isEmptyLogInFifteenDays = await userQuery.checkChangeNicknameLog(
            {
              userNo: req.user.user_no,
            }
          );
          if (!isEmptyLogInFifteenDays) {
            cb({
              code: 400,
              message:
                "15일 이내에 닉네임을 변경한 이력이 있어 변경이 불가능합니다.",
              e: 2,
            });
            return;
          }
        }

        if (req.user.user_photo !== DEFAULT_IMAGE_URL) {
          await videoFile.deleteFile({
            key: req.user.user_photo.split(NCLOUD_STORAGE_URL)[1],
          });
        }

        cb(null, `u/${user.user_no}/avatar-${+new Date()}.png`);
      },
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
    }),
  });

  return {
    signUpMobile: signUpMobileUpload.single("photo"),
    signUp: signUpUpload.single("photo"),
    update: updateUpload.single("photo"),
  };
})();
