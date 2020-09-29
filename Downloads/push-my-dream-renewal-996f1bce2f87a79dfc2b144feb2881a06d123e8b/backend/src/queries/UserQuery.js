const moment = require("moment");
const { Container } = require("typedi");

const { getAll, getOne, set, modify, remove } = require("shared/Query");
const { escapeQuot, getDatetimeType, setLog } = require("shared/functions");

const RankQuery = require("queries/RankQuery");

const rankQuery = Container.get(RankQuery);

class UserQuery {
  // 회원가입
  async setUser({
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
    file,
  }) {
    setLog(
      "setUser query",
      `INSERT INTO USER (user_name, di, email, gender, country, birthdate, phone, nickname, ${
        file ? "user_photo," : ""
      } terms_apply_time, ${loginType.toLowerCase()}_id)
    VALUES (${escapeQuot(userName)}, ${escapeQuot(di)}, ${escapeQuot(
        email
      )}, ${escapeQuot(gender)}, ${escapeQuot(country)}, ${escapeQuot(
        birthdate
      )}, ${escapeQuot(phone)}, ${escapeQuot(nickname)},  
    ${file ? `${escapeQuot(file.location)},` : ""}
    ${escapeQuot(getDatetimeType(termsApplyTime))}, ${escapeQuot(id)})`
    );
    const res = await set(`INSERT INTO USER (user_name, di, email, gender, country, birthdate, phone, nickname, ${
      file ? "user_photo," : ""
    } terms_apply_time, ${loginType.toLowerCase()}_id)
    VALUES (${escapeQuot(userName)}, ${escapeQuot(di)}, ${escapeQuot(
      email
    )}, ${escapeQuot(gender)}, ${escapeQuot(country)}, ${escapeQuot(
      birthdate
    )}, ${escapeQuot(phone)}, ${escapeQuot(nickname)},  
    ${file ? `${escapeQuot(file.location)},` : ""}
    ${escapeQuot(getDatetimeType(termsApplyTime))}, ${escapeQuot(id)})`);
    return res;
  }

  // 회원가입
  async setLocalUser({
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
    file,
  }) {
    const res = await set(`INSERT INTO USER (user_name, di, email, gender, country, birthdate, phone, nickname, ${
      file ? "user_photo," : ""
    } terms_apply_time, local_id, local_password)
      VALUES (${escapeQuot(userName)}, ${escapeQuot(di)}, ${escapeQuot(
      email
    )}, ${escapeQuot(gender)}, ${escapeQuot(country)}, ${escapeQuot(
      birthdate
    )}, ${escapeQuot(phone)}, ${escapeQuot(nickname)},  
      ${file ? `${escapeQuot(file.location)},` : ""}
      ${escapeQuot(getDatetimeType(termsApplyTime))}, ${escapeQuot(
      email
    )}, ${escapeQuot(hash)})`);
    return res;
  }
  // 가입한 ID 조회
  async findId(userName, phone) {
    const res = await getOne(`SELECT kakao_id, google_id, naver_id, user_photo
    FROM USER
    WHERE user_name = ${escapeQuot(userName)} AND phone = ${escapeQuot(
      phone
    )}`);
    return res;
  }
  // Dreamer 신청 -> 승인
  async modifyIsDreamer(userNo, isDreamer) {
    const res = await modify(
      `UPDATE USER SET is_dreamer = ${escapeQuot(
        isDreamer
      )} WHERE user_no = ${escapeQuot(userNo)}`
    );
  }
  // Producer 신청 -> 승인
  async modifyIsProducer(userNo, isProducer) {
    const res = await modify(
      `UPDATE USER SET is_producer = ${escapeQuot(
        isProducer
      )} WHERE user_no = ${escapeQuot(userNo)}`
    );
  }
  // User정보 수정 (전화번호, 닉네임, 사진)
  async modifyUser(userNo, phone, nickname, userPhoto) {
    console.log("modifyUser", userNo, phone, nickname, userPhoto);
    const res = await modify(
      `UPDATE USER SET phone = ${escapeQuot(phone)}, nickname = ${escapeQuot(
        nickname
      )}, user_photo = ${escapeQuot(userPhoto)} WHERE user_no = ${escapeQuot(
        userNo
      )}`
    );
  }
  // Kakao ID 수정 (추가)
  async modifyKakaoId(userNo, kakaoId) {
    const res = await modify(
      `UPDATE USER SET kakao_id = ${escapeQuot(
        kakaoId
      )} WHERE user_no = ${escapeQuot(userNo)}`
    );
  }
  // Google ID 수정 (추가)
  async modifyGoogleId(userNo, googleId) {
    const res = await modify(
      `UPDATE USER SET google_id = ${escapeQuot(
        googleId
      )} WHERE user_no = ${escapeQuot(userNo)}`
    );
  }
  // Naver ID 수정 (추가)
  async modifyNaverId(userNo, naverId) {
    const res = await modify(
      `UPDATE USER SET naver_id = ${escapeQuot(
        naverId
      )} WHERE user_no = ${escapeQuot(userNo)}`
    );
  }
  // 약관동의 갱신
  async modifyTermsApply(userNo, termsApplyTime) {
    const res = await modify(
      `UPDATE USER SET terms_apply_time = ${escapeQuot(
        termsApplyTime
      )} WHERE user_no = ${escapeQuot(userNo)}`
    );
  }
  // 회원탈퇴 (USER 테이블 data는 LEAVE_USER 테이블에 옮기고 USER 테이블에서 DELETE)
  async removeUser({ userNo }, config) {
    await remove(
      `DELETE FROM USER WHERE user_no = ${escapeQuot(userNo)}`,
      config
    );
  }

  //  로컬 로그인 검증
  async getLoaclLoginUser({ email, loginType }) {
    const res = await getOne(`
      SELECT USER.user_no, USER.user_name, USER.email, USER.gender, USER.country, USER.birthdate, USER.phone, USER.nickname, USER.user_photo, USER.count_follower, USER.count_like, USER.facebook_url, USER.instagram_url, USER.youtube_url, USER.blog_url, USER.twitter_url, USER.introduce, USER.terms_apply_time, USER.local_id, USER.local_password, USER.google_id, USER.kakao_id, USER.naver_id, USER.is_dreamer, USER.is_producer, USER.have_push, USER.receive_push, USER.created_at
      FROM USER
      WHERE USER.email = ${escapeQuot(email)} AND USER.local_id IS NOT NULL
      `);
    return res;
  }

  // 로그인 검증
  async getLoginUser({ id, loginType }) {
    setLog(
      "getLoginUser query",
      `
    SELECT USER.user_no, USER.user_name, USER.email, USER.gender, USER.country, USER.birthdate, USER.phone, USER.nickname, USER.user_photo, USER.count_follower, USER.count_like, USER.facebook_url, USER.instagram_url, USER.youtube_url, USER.blog_url, USER.twitter_url, USER.introduce, USER.terms_apply_time, USER.local_id, USER.google_id, USER.kakao_id, USER.naver_id, USER.is_dreamer, USER.is_producer, USER.have_push, USER.receive_push, USER.created_at
    FROM USER
    WHERE USER.${loginType.toLowerCase()}_id = ${escapeQuot(id)}
    `
    );
    const res = await getOne(`
    SELECT USER.user_no, USER.user_name, USER.email, USER.gender, USER.country, USER.birthdate, USER.phone, USER.nickname, USER.user_photo, USER.count_follower, USER.count_like, USER.facebook_url, USER.instagram_url, USER.youtube_url, USER.blog_url, USER.twitter_url, USER.introduce, USER.terms_apply_time, USER.local_id, USER.google_id, USER.kakao_id, USER.naver_id, USER.is_dreamer, USER.is_producer, USER.have_push, USER.receive_push, USER.created_at
    FROM USER
    WHERE USER.${loginType.toLowerCase()}_id = ${escapeQuot(id)}
    `);
    return res;
  }

  // 가입한 ID 조회
  async getUserByDi(di) {
    const res = await getOne(`SELECT user_no, email, kakao_id, google_id, naver_id, local_id
      FROM USER
      WHERE di = ${escapeQuot(di)} 
    `);
    return res;
  }

  // 로그인 조회
  async getUserById(userNo) {
    const res = await getOne(`
    SELECT USER.user_no, USER.user_name, USER.email, USER.gender, USER.country, USER.birthdate, USER.phone, USER.nickname, USER.user_photo, USER.count_follower, USER.count_like, USER.facebook_url, USER.instagram_url, USER.youtube_url, USER.blog_url, USER.twitter_url, USER.introduce, USER.terms_apply_time, USER.local_id, USER.google_id, USER.kakao_id, USER.naver_id, USER.is_dreamer, USER.is_producer, USER.have_push, USER.receive_push, USER.created_at
    FROM USER
    WHERE USER.user_no = ${userNo}
    `);
    return res;
  }

  // 이미지 업로드
  async uploadAvatar(userNo, location) {
    const res = await modify(`
      UPDATE USER SET user_photo=${escapeQuot(location)}
      WHERE user_no = ${userNo}
    `);
    return res;
  }

  // 닉네임 조회
  async getNickname(nickname) {
    const res = await getOne(
      `
      SELECT * FROM USER
      WHERE nickname = ${escapeQuot(nickname)}
      `
    );

    return res;
  }

  // 유니크값 중복 회원가입 체크
  async checkUnique({ di, email, phone, nickname, id, loginType }) {
    let res;

    if (loginType === "local") {
      res = await getOne(
        `
        SELECT di, email, phone, nickname, local_id
        FROM USER
        WHERE di = ${escapeQuot(di)} OR email = ${escapeQuot(email)} 
          OR phone = ${escapeQuot(phone)} OR nickname = ${escapeQuot(nickname)} 
          OR local_id = ${escapeQuot(email)} `
      );
    } else {
      res = await getOne(
        `
        SELECT di, email, phone, nickname, kakao_id, google_id, naver_id
        FROM USER
        WHERE di = ${escapeQuot(di)} OR email = ${escapeQuot(email)} 
          OR phone = ${escapeQuot(phone)} OR nickname = ${escapeQuot(nickname)} 
          OR kakao_id = ${escapeQuot(id)} OR google_id = ${escapeQuot(id)} 
          OR naver_id = ${escapeQuot(id)}`
      );
    }

    return res;
  }

  // 로컬 로그인 유저 체크
  async checkLocalLogin(email) {
    const res = await getOne(`
      SELECT COUNT(user_no) as isUniqueEmail
      FROM USER
      WHERE email = ${escapeQuot(email)}
    `);

    return res;
  }

  // 유저 핸드폰 번호 변경
  async updateUserPhoneByUserId({ userNo, phone }) {
    const res = await modify(
      `UPDATE USER
      SET phone = ${escapeQuot(phone)}
      WHERE user_no = ${userNo}`
    );

    return res;
  }

  // 유저 사진 변경
  async updateUserPhotoByUserId({ userNo, user_photo }) {
    const res = await modify(
      `
      UPDATE USER
      SET user_photo = ${escapeQuot(user_photo)}
      WHERE user_no = ${userNo}
      `
    );

    return res;
  }

  // USER 정보 조회 by user_no (/user?userNo=1)
  async getUserInfo({ userNo, isAdmin, me }) {
    const user = await getOne(
      `SELECT USER.user_no, USER.birthdate, USER.nickname, USER.user_photo, USER.facebook_url, USER.instagram_url, USER.youtube_url, USER.blog_url, USER.twitter_url, USER.introduce, USER.count_follower AS countFollowUser, receive_push,
      CAST( IFNULL(V.countLike, 0 ) AS UNSIGNED) AS countLike, CAST(IFNULL(V.countVideo, 0 ) AS UNSIGNED) AS countVideo, CAST( IFNULL(V.countView, 0 ) AS UNSIGNED) AS countView
      ${
        me
          ? `, 
      ( SELECT IF(COUNT(ACTIVE_LOG.active_log_no) > 0 , 1, 0) 
        FROM ACTIVE_LOG
        WHERE ACTIVE_LOG.gubun = "follow_user" AND ACTIVE_LOG.user_no = ${me} AND ACTIVE_LOG.target_no = USER.user_no
  
      ) AS is_followed`
          : ""
      }
      FROM USER
        LEFT OUTER JOIN (
          SELECT user_no, 
            SUM(count_view) AS countView, 
            SUM(count_like) AS countLike, 
            (
              SELECT COUNT(video_no)
              FROM VIDEO AS V1
              WHERE V1.status_no = 6 AND V1.flag = 0 AND V1.user_no = ${userNo}
            ) AS countVideo
          FROM VIDEO
          WHERE VIDEO.status_no = 6
          GROUP BY user_no
        ) AS V ON V.user_no = USER.user_no
      WHERE USER.user_no = ${userNo}`
    );
    const VIDEO = await getAll(
      `SELECT VIDEO.video_no, VIDEO.flag, VIDEO.category_level1_no, VIDEO.category_level2_no, VIDEO.category_level3_no, VIDEO.category_level4_no, VIDEO.description, VIDEO.title, VIDEO.url_1080p, VIDEO.thumbnail, VIDEO.count_like AS countLikeVideo, VIDEO.count_view AS countViewVideo
      FROM VIDEO
      WHERE ${
        !isAdmin ? "status_no = 6 AND flag = 0 AND " : ""
      } VIDEO.user_no = ${userNo} 
      GROUP BY VIDEO.video_no
      ORDER BY VIDEO.created_at DESC
      `
    );

    // 가장 마지막에 올린 영상을 기준으로 펀딩 여부를 가른다.
    if (user) {
      const userInfo = {
        user_no: user.user_no,
        user_name: user.user_name,
        birthdate: user.birthdate,
        nickname: user.nickname,
        user_photo: user.user_photo,
        facebook_url: user.facebook_url,
        instagram_url: user.instagram_url,
        youtube_url: user.youtube_url,
        blog_url: user.blog_url,
        twitter_url: user.twitter_url,
        introduce: user.introduce,
        countFollowUser: user.countFollowUser,
        countLike: user.countLike,
        countVideo: user.countVideo,
        countView: user.countView,
        isPushedThisSeason: user.isPushedThisSeason || 0,
        is_followed: Boolean(user.is_followed || 0),
        receive_push: user.receive_push,
        LATEST_VIDEO: user.LATEST_VIDEO,
        VIDEO,
      };

      return userInfo;
    } else {
      return {};
    }
  }

  // USER 정보 조회 (MyPage)
  async getMyInfo(userNo) {
    const res = await getAll(`
      SELECT USER.user_no, USER.user_photo, USER.nickname, USER.user_name, USER.birthdate, USER.phone, USER.count_follower, USER.count_like, USER.facebook_url, USER.instagram_url, USER.youtube_url, USER.blog_url, USER.twitter_url, USER.introduce,
        VIDEO.video_no, VIDEO.thumbnail, VIDEO.description, VIDEO.title, VIDEO.count_like AS count_like_video, VIDEO.count_view, VIDEO.flag
      FROM USER
        LEFT OUTER JOIN VIDEO ON VIDEO.user_no = USER.user_no
      WHERE USER.user_no = ${userNo}
      ORDER BY VIDEO.created_at DESC
    `);
    let userInfo = {};
    if (res.length > 0) {
      userInfo = {
        user_no: res[0].user_no,
        user_photo: res[0].user_photo,
        nickname: res[0].nickname,
        user_name: res[0].user_name,
        birthdate: res[0].birthdate,
        phone: res[0].phone,
        count_follower: res[0].count_follower,
        count_like: res[0].count_like,
        facebook_url: res[0].facebook_url,
        instagram_url: res[0].instagram_url,
        youtube_url: res[0].youtube_url,
        blog_url: res[0].blog_url,
        twitter_url: res[0].twitter_url,
        introduce: res[0].introduce,
        VIDEO: [],
      };
      for (let i = 0; i < res.length; i++) {
        if (res[i].video_no) {
          userInfo.VIDEO.push({
            video_no: res[i].video_no,
            thumbnail: res[i].thumbnail,
            description: res[i].description,
            title: res[i].title,
            count_like_video: res[i].count_like_video,
            count_view: res[i].count_view,
            is_open: res[i].is_open,
          });
        }
      }
    }
    return userInfo;
  }

  // USER 정보 조회 (mypage/edit)
  async getEditInfo(userNo) {
    const userInfo = await getOne(`
      SELECT user_no, user_photo, nickname, gender, user_name, created_at, email, phone, introduce, facebook_url, instagram_url, youtube_url, blog_url, twitter_url, local_id
      FROM USER
      WHERE user_no = ${userNo}
    `);
    return userInfo;
  }
  // USER 정보 수정 (mypage/edit)
  async modifyInfo({
    userNo,
    userPhoto,
    phone,
    introduce,
    facebookUrl,
    instagramUrl,
    youtubeUrl,
    blogUrl,
    twitterUrl,
    hash,
    isDeleteProfileImage,
    nickname,
  }) {
    const { DEFAULT_IMAGE_URL } = process.env;

    console.log(instagramUrl);

    const res = await modify(`
      UPDATE USER SET user_photo = ${escapeQuot(
        userPhoto
      )}, phone = ${escapeQuot(phone)}, introduce = ${escapeQuot(
      introduce
    )}, facebook_url = ${facebookUrl ? escapeQuot(facebookUrl) : null}
    , instagram_url = ${instagramUrl ? escapeQuot(instagramUrl) : null}
    , youtube_url = ${youtubeUrl ? escapeQuot(youtubeUrl) : null}
    , blog_url = ${blogUrl ? escapeQuot(blogUrl) : null}
    , twitter_url = ${twitterUrl ? escapeQuot(twitterUrl) : null}
    ${nickname ? `, nickname = ${escapeQuot(nickname)}` : ""}
    ${!!hash ? `, local_password= ${escapeQuot(hash)}` : ""}
    ${
      isDeleteProfileImage
        ? `, user_photo = ${escapeQuot(DEFAULT_IMAGE_URL)}`
        : ""
    }
      WHERE user_no = ${userNo}
    `);
    return res;
  }

  // 팔로우
  async modifyFollow({ targetNo, userNo }, config) {
    // ACTIVE_LOG 테이블에 로그 남기기
    await set(
      `
      INSERT INTO ACTIVE_LOG (target_no, user_no, gubun) VALUES (${targetNo}, ${userNo}, 'follow_user')
    `,
      config
    );
    // USER 테이블에 팔로우(count_follower) 업데이트 (+1)
    const res = await modify(
      `
      UPDATE USER SET count_follower = count_follower + 1 WHERE user_no = ${targetNo}
    `,
      config
    );
    return res;
  }
  // 팔로우 취소
  async removeFollow({ targetNo, userNo }, config) {
    // ACTIVE_LOG 테이블에 로그 남기기
    await remove(
      `
      DELETE FROM ACTIVE_LOG WHERE target_no = ${targetNo} AND user_no = ${userNo}
    `,
      config
    );
    // USER 테이블에 팔로우(count_follower) 업데이트 (-1)
    const res = await modify(
      `
      UPDATE USER SET count_follower = count_follower - 1 WHERE user_no = ${targetNo}
    `,
      config
    );
    return res;
  }

  // 마지막 로그인 시간 업데이트
  async updateLastLoggedTime(userNo, dateTime) {
    return await modify(`
      UPDATE USER SET last_logged_time = ${escapeQuot(dateTime)}
      WHERE user_no = ${userNo}
    `);
  }

  // 비밀번호 변경
  async changePassword({ email, hash }) {
    return await modify(`
      UPDATE USER SET local_password = ${escapeQuot(hash)}
      WHERE local_id = ${escapeQuot(email)}
    `);
  }

  // 유저 모든 정보 조회
  async getUser({ userNo }) {
    return await getOne(`
    SELECT *
    FROM USER
    WHERE user_no = ${userNo}
  `);
  }

  // 회원 탈퇴 시 유저 정보 LEAVE_USER 테이블로 이동
  async createLeaveUser({ user }, config) {
    return await set(
      `
      INSERT INTO LEAVE_USER(${Object.keys(user).toString()})
      VALUES (${Object.entries(user)
        .map((v) =>
          ["terms_apply_time", "last_logged_time", "user_created_at"].indexOf(
            v[0]
          ) !== -1
            ? `'${moment(v[1]).format("YYYY-MM-DD HH:mm:ss")}'`
            : !!v[1]
            ? `'${v[1]}'`
            : typeof v[1] === "number"
            ? 0
            : "null"
        )
        .toString()})
    `,
      config
    );
  }

  // 보유 PUSH변경 (PUSH충전)
  async modifyPush({ userNo, amount }) {
    await modify(`
      UPDATE USER SET have_push = have_push + ${amount} 
      WHERE user_no = ${userNo}
    `);
    const res = await getOne(`
      SELECT have_push FROM USER WHERE user_no = ${userNo}
    `);
    return res.have_push;
  }

  // 푸쉬 대상 유저 정보 조회
  async getTargetUser({ category4No, targetUserNo, me }) {
    // 기존 조인
    // LEFT OUTER JOIN (
    //   SELECT category_level3_no
    //   FROM CATEGORY_LEVEL3
    //   WHERE is_open = 1 AND open_time <= NOW() AND start_time <= NOW() AND NOW() < end_time
    // ) AS CL3 ON CL3.category_level3_no = PUSH_LOG.category_level3_no

    return await getOne(`
      SELECT USER.user_no, USER.nickname, USER.user_photo, 
      (
        SELECT IFNULL(CAST(SUM(push) AS UNSIGNED),0)
        FROM PUSH_LOG
          INNER JOIN (
            SELECT category_level3_no
            FROM CATEGORY_LEVEL3
            WHERE is_open = 1 AND open_time <= NOW() AND start_time <= NOW() AND NOW() < end_time
          ) AS CL3 ON CL3.category_level3_no = PUSH_LOG.category_level3_no
          INNER JOIN (
            SELECT  category_level4_no
            FROM CATEGORY_LEVEL4
            WHERE is_open = 1 AND open_time <= NOW() AND start_time <= NOW() AND NOW() < end_time
          ) AS CL4 ON CL4.category_level4_no = PUSH_LOG.category_level4_no
        WHERE PUSH_LOG.gubun = 'PUSH' AND dreamer_no = ${targetUserNo} AND PUSH_LOG.category_level4_no = ${category4No}
      ) AS totalPush, 
      (
        SELECT IFNULL(CAST(SUM(push) AS UNSIGNED),0)
        FROM PUSH_LOG
          INNER JOIN (
            SELECT category_level3_no
            FROM CATEGORY_LEVEL3
            WHERE is_open = 1 AND open_time <= NOW() AND start_time <= NOW() AND NOW() < end_time
          ) AS CL3 ON CL3.category_level3_no = PUSH_LOG.category_level3_no
          INNER JOIN (
            SELECT  category_level4_no
            FROM CATEGORY_LEVEL4
            WHERE is_open = 1 AND open_time <= NOW() AND start_time <= NOW() AND NOW() < end_time
          ) AS CL4 ON CL4.category_level4_no = PUSH_LOG.category_level4_no
        WHERE PUSH_LOG.gubun = 'PUSH' AND producer_no = ${me} AND dreamer_no = ${targetUserNo} AND PUSH_LOG.category_level4_no = ${category4No}
      ) AS myPush
      FROM USER 
      WHERE user_no = ${targetUserNo}
    `);
    // return await getOne(`
    //   SELECT USER.user_no, USER.user_name, USER.receive_push, SUM(IF(A.push IS NOT NULL, A.push, 0)) AS totalPush, SUM(IF(A.push_log_no = B.push_log_no, B.push, 0)) AS myPush
    //   FROM USER
    //     LEFT OUTER JOIN PUSH_LOG AS A ON A.dreamer_no = USER.user_no
    //     LEFT OUTER JOIN PUSH_LOG AS B ON B.dreamer_no = USER.user_no AND B.producer_no = ${userNo}
    //   WHERE user_no = ${targetUserNo}
    // `);
  }

  // // 푸쉬 대상 유저 정보 조회
  // async getTargetUser({ categoryNo, targetUserNo, userNo }) {
  //   return await getOne(`
  //     SELECT USER.user_no, USER.nickname, USER.user_photo, USER.receive_push AS totalPush, SUM(IF(A.push, A.push, 0)) AS myPush
  //     FROM USER
  //       LEFT OUTER JOIN PUSH_LOG AS A ON A.dreamer_no = USER.user_no AND A.producer_no = ${userNo}
  //     WHERE user_no = ${targetUserNo}
  //   `);
  //   // return await getOne(`
  //   //   SELECT USER.user_no, USER.user_name, USER.receive_push, SUM(IF(A.push IS NOT NULL, A.push, 0)) AS totalPush, SUM(IF(A.push_log_no = B.push_log_no, B.push, 0)) AS myPush
  //   //   FROM USER
  //   //     LEFT OUTER JOIN PUSH_LOG AS A ON A.dreamer_no = USER.user_no
  //   //     LEFT OUTER JOIN PUSH_LOG AS B ON B.dreamer_no = USER.user_no AND B.producer_no = ${userNo}
  //   //   WHERE user_no = ${targetUserNo}
  //   // `);
  // }

  // 카테고리별 푸쉬 받은 랭커 조회
  async getRankerByCategory({ startTime, endTime, limit, categoryNo }) {
    const limitCondition = limit ? `LIMIT ${limit}` : "";
    return await getAll(`
      SELECT USER.user_no, USER.nickname, USER.user_photo, CAST(sum(PUSH_LOG.push) as UNSIGNED) AS total_push
      FROM PUSH_LOG
        INNER JOIN USER ON USER.user_no = PUSH_LOG.dreamer_no
      WHERE PUSH_LOG.gubun = 'PUSH' AND PUSH_LOG.category_level3_no = ${categoryNo} AND ${escapeQuot(
      startTime
    )} <= PUSH_LOG.created_at  AND PUSH_LOG.created_at < ${escapeQuot(endTime)} 
      GROUP BY PUSH_LOG.dreamer_no
      HAVING total_push > 0
      ORDER BY total_push DESC
      ${limitCondition}
    
    `);
  }

  // 최근 7일 이내 첫 동영상을 올린 드리머 중 PUSH 수가 가장 많은 7명
  async getRookiesInCategory({ startTime, limit, category3No, category4No }) {
    const limitCondition = limit ? `LIMIT ${limit}` : "";
    return await getAll(`
      SELECT U.user_no, U.nickname, U.user_photo, PL.sum_push
      FROM (
        SELECT USER.user_no, USER.nickname, USER.user_photo, IFNULL(V.count_video, 0) AS count_video
        FROM USER
          LEFT OUTER JOIN (
            SELECT user_no, COUNT(video_no) AS count_video
            FROM VIDEO
            WHERE flag <= 1 AND status_no = 6 AND category_level3_no = ${category3No} AND created_at < ${escapeQuot(
      startTime
    )}
            GROUP BY user_no
          ) AS V ON V.user_no = USER.user_no 
        WHERE V.count_video IS NULL 
      ) AS U
        INNER JOIN (
          SELECT user_no, SUM(video_no) AS count_video
          FROM VIDEO
          WHERE flag <= 1 AND status_no = 6 AND category_level3_no = ${category3No} AND ${escapeQuot(
      startTime
    )} <= created_at 
          GROUP BY user_no
          HAVING count_video > 0
        ) AS V ON V.user_no = U.user_no
        INNER JOIN (
          SELECT dreamer_no, SUM(push) AS sum_push, category_level3_no, category_level4_no
          FROM PUSH_LOG
          WHERE PUSH_LOG.gubun = 'PUSH' AND category_level4_no = ${category4No}
          GROUP BY dreamer_no
          HAVING sum_push > 0
        ) AS PL ON PL.dreamer_no = U.user_no
        INNER JOIN CATEGORY_LEVEL4 AS CL4 ON CL4.category_level4_no = PL.category_level4_no AND CL4.is_open = 1 AND CL4.open_time <= NOW() AND CL4.start_time <= NOW()
        ORDER BY PL.sum_push DESC
        ${limitCondition}
    `);
  }

  // 최근 7일 이내 첫 동영상을 올린 드리머 중 view 수가 가장 많은 100명
  async getNewbiesInCategory({ startTime, limit, category3No }) {
    const limitCondition = limit ? `LIMIT ${limit}` : "";
    return await getAll(`
      SELECT U.user_no, U.nickname, U.user_photo	
      FROM (
        SELECT USER.user_no, USER.nickname, USER.user_photo, IFNULL(V.count_video, 0) AS count_video
        FROM USER
          LEFT OUTER JOIN (
            SELECT user_no, COUNT(video_no) AS count_video
            FROM VIDEO
            WHERE flag <= 1 AND status_no = 6 AND category_level3_no = ${category3No} AND created_at < ${escapeQuot(
      startTime
    )}
            GROUP BY user_no
          ) AS V ON V.user_no = USER.user_no 
        WHERE V.count_video IS NULL
        ) AS U
        INNER JOIN (
          SELECT user_no, SUM(video_no) AS count_video
          FROM VIDEO
          WHERE flag <= 1 AND status_no = 6 AND category_level3_no = ${category3No} AND ${escapeQuot(
      startTime
    )} <= created_at 
          GROUP BY user_no
          HAVING count_video > 0
        ) AS V1 ON V1.user_no = U.user_no
        INNER JOIN (SELECT user_no, SUM(video_no) AS sum_view, category_level3_no
          FROM VIDEO
          WHERE category_level3_no = ${category3No} AND flag = 0 AND status_no = 6 AND  ${escapeQuot(
      startTime
    )} <= created_at 
          GROUP BY user_no
          HAVING sum_view > 0
        ) AS V2 ON V2.user_no = U.user_no
        INNER JOIN CATEGORY_LEVEL3 AS CL3 ON CL3.category_level3_no = V2.category_level3_no AND CL3.is_open = 1 AND CL3.open_time <= NOW() AND NOW() < CL3.end_time
        ORDER BY V2.sum_view DESC
      ${limitCondition}
    
    `);
  }

  // 유저의 오늘 남은 푸쉬 한도 조회
  async getLimitPushInToday({ me }, config) {
    const startTiemInNow = moment().format("YYYY-MM-DD 00:00:00");

    const result = await getOne(
      `
      SELECT 
      CAST(IF(TEMP_PUSH.push_limit - TEMP_PUSH.my_push_in_today > 0, TEMP_PUSH.push_limit - TEMP_PUSH.my_push_in_today , 0 ) AS UNSIGNED )  AS my_push_limit_in_today
        FROM (
        SELECT ( 
            SELECT IFNULL(CAST(SETTING.value AS UNSIGNED ), 0) 
              FROM SETTING
              WHERE SETTING.type = 'pushLimit'
          ) AS push_limit,
          IFNULL(SUM(PUSH_LOG.push), 0) AS my_push_in_today
        FROM PUSH_LOG
          WHERE PUSH_LOG.producer_no = ${me} AND ${escapeQuot(
        startTiemInNow
      )} <= PUSH_LOG.created_at AND gubun IN ('PUSH', 'SUPPORT') 
      ) AS TEMP_PUSH
      FOR UPDATE
    `,
      config
    );
    // const result = await getOne(`
    //   SELECT IFNULL(CAST(SUM(push) AS UNSIGNED) , 0)
    //   FROM PUSH_LOG
    //   WHERE producer_no = ${userNo} AND ${escapeQuot(
    //   startTiemInNow
    // )} <= created_at

    return result.my_push_limit_in_today;
  }

  async getIsPush({ targetNo }, config) {
    return await getOne(
      `
      SELECT 
        IF(
          1 = CL3.is_push = UPLOAD_POSSIBLE_USER.is_push
          , 1
          , 0
        ) AS is_push, 
        UPLOAD_POSSIBLE_USER.is_push AS is_push_user,
        UPLOAD_POSSIBLE_USER.type,
        CL4.category_level1_no, CL4.category_level2_no, CL4.category_level3_no, CL4.category_level4_no,
        CL2.category_level2_no AS \`CATEGORY_LEVEL2.category_level2_no\`,
	      CL2.category_level2 AS \`CATEGORY_LEVEL2.category_level2\`,
	      CL2.category_level2_gradient_icon AS \`CATEGORY_LEVEL2.category_level2_gradient_icon\`,
	      CL2.category_level2_icon AS \`CATEGORY_LEVEL2.category_level2_icon\`,
	      
	      CL3.category_level3_no AS \`CATEGORY_LEVEL3.category_level3_no\`,
        CL3.category_level3 AS \`CATEGORY_LEVEL3.category_level3\`,
        CL3.start_time AS \`CATEGORY_LEVEL3.start_time\`,
        CL3.end_time AS \`CATEGORY_LEVEL3.end_time\`,

        CL4.ordinalNumber AS \`CATEGORY_LEVEL4.ordinalNumber\`,
        CL4.title AS \`CATEGORY_LEVEL4.title\`,
        (
          SELECT CAST(IFNULL(SUM(PUSH), 0 ) AS UNSIGNED)
          FROM PUSH_LOG
          WHERE PUSH_LOG.dreamer_no = UPLOAD_POSSIBLE_USER.user_no 
            AND PUSH_LOG.category_level1_no = UPLOAD_POSSIBLE_USER.category_level1_no
            AND PUSH_LOG.category_level2_no = UPLOAD_POSSIBLE_USER.category_level2_no
            AND PUSH_LOG.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no
            AND PUSH_LOG.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no
            AND PUSH_LOG.gubun = 'PUSH'
        ) AS totalPush
      FROM UPLOAD_POSSIBLE_USER
        INNER JOIN (
          SELECT 
            CATEGORY_LEVEL3.category_level3_no, 
            CATEGORY_LEVEL3.category_level3, 
            CATEGORY_LEVEL3.is_push,
            CATEGORY_LEVEL3.start_time, 
            CATEGORY_LEVEL3.end_time
          FROM CATEGORY_LEVEL3
          WHERE CATEGORY_LEVEL3.is_open = 1 AND CATEGORY_LEVEL3.open_time <= NOW() AND CATEGORY_LEVEL3.start_time <= NOW() AND  NOW() < CATEGORY_LEVEL3.end_time
        ) AS CL3 ON CL3.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no
        INNER JOIN (
          SELECT 
            CATEGORY_LEVEL4.category_level1_no, 
            CATEGORY_LEVEL4.category_level2_no, 
            CATEGORY_LEVEL4.category_level3_no,
            CATEGORY_LEVEL4.category_level4_no, 
            CATEGORY_LEVEL4.ordinalNumber, 
            CATEGORY_LEVEL4.title
          FROM CATEGORY_LEVEL4
          WHERE CATEGORY_LEVEL4.is_open = 1 AND CATEGORY_LEVEL4.open_time <= NOW() AND CATEGORY_LEVEL4.start_time <= NOW() AND  NOW() < CATEGORY_LEVEL4.end_time
        ) AS CL4 ON CL4.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no
        INNER JOIN (
          SELECT CATEGORY_LEVEL2.category_level2_no, CATEGORY_LEVEL2.category_level2, CATEGORY_LEVEL2.category_level2_gradient_icon, CATEGORY_LEVEL2.category_level2_icon
          FROM CATEGORY_LEVEL2
        ) AS CL2 ON CL2.category_level2_no = CL4.category_level2_no
      WHERE UPLOAD_POSSIBLE_USER.user_no = ${targetNo} AND UPLOAD_POSSIBLE_USER.is_participate = 1 AND UPLOAD_POSSIBLE_USER.type = 'artist' 
        AND UPLOAD_POSSIBLE_USER.category_level1_no = 1
      GROUP BY UPLOAD_POSSIBLE_USER.category_level3_no
    `,
      config
    );
  }

  async getIsPushByCategory4No({ targetNo, category4No }, config) {
    return await getOne(
      `
      SELECT 
        IF(
          1 = CL3.is_push = UPLOAD_POSSIBLE_USER.is_push
          , 1
          , 0
        ) AS is_push,  
        UPLOAD_POSSIBLE_USER.is_push AS is_push_user,
        UPLOAD_POSSIBLE_USER.type,
        CL4.category_level1_no, CL4.category_level2_no, CL4.category_level3_no, CL4.category_level4_no,
        CL2.category_level2_no AS \`CATEGORY_LEVEL2.category_level2_no\`,
	      CL2.category_level2 AS \`CATEGORY_LEVEL2.category_level2\`,
	      CL2.category_level2_gradient_icon AS \`CATEGORY_LEVEL2.category_level2_gradient_icon\`,
	      CL2.category_level2_icon AS \`CATEGORY_LEVEL2.category_level2_icon\`,
	      
	      CL3.category_level3_no AS \`CATEGORY_LEVEL3.category_level3_no\`,
        CL3.category_level3 AS \`CATEGORY_LEVEL3.category_level3\`,
        CL3.start_time AS \`CATEGORY_LEVEL3.start_time\`,
        CL3.end_time AS \`CATEGORY_LEVEL3.end_time\`,

        CL4.ordinalNumber AS \`CATEGORY_LEVEL4.ordinalNumber\`,
        CL4.title AS \`CATEGORY_LEVEL4.title\`,
        (
          SELECT CAST(IFNULL(SUM(PUSH), 0 ) AS UNSIGNED)
          FROM PUSH_LOG
          WHERE PUSH_LOG.dreamer_no = UPLOAD_POSSIBLE_USER.user_no AND
            PUSH_LOG.category_level1_no = UPLOAD_POSSIBLE_USER.category_level1_no AND
            PUSH_LOG.category_level2_no = UPLOAD_POSSIBLE_USER.category_level2_no AND
            PUSH_LOG.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no AND
            PUSH_LOG.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no AND
            PUSH_LOG.gubun = 'PUSH'
        ) AS totalPush
      FROM UPLOAD_POSSIBLE_USER
        INNER JOIN (
          SELECT 
            CATEGORY_LEVEL3.category_level3_no, 
            CATEGORY_LEVEL3.category_level3, 
            CATEGORY_LEVEL3.is_push,
            CATEGORY_LEVEL3.start_time, 
            CATEGORY_LEVEL3.end_time
          FROM CATEGORY_LEVEL3
          WHERE CATEGORY_LEVEL3.is_open = 1 AND CATEGORY_LEVEL3.open_time <= NOW() AND CATEGORY_LEVEL3.start_time <= NOW() AND  NOW() < CATEGORY_LEVEL3.end_time
        ) AS CL3 ON CL3.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no
        INNER JOIN (
          SELECT 
            CATEGORY_LEVEL4.category_level1_no, 
            CATEGORY_LEVEL4.category_level2_no, 
            CATEGORY_LEVEL4.category_level3_no,
            CATEGORY_LEVEL4.category_level4_no, 
            CATEGORY_LEVEL4.ordinalNumber, 
            CATEGORY_LEVEL4.title
          FROM CATEGORY_LEVEL4
          WHERE CATEGORY_LEVEL4.is_open = 1 AND CATEGORY_LEVEL4.open_time <= NOW() AND CATEGORY_LEVEL4.start_time <= NOW() AND  NOW() < CATEGORY_LEVEL4.end_time
        ) AS CL4 ON CL4.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no
        INNER JOIN (
          SELECT CATEGORY_LEVEL2.category_level2_no, CATEGORY_LEVEL2.category_level2, CATEGORY_LEVEL2.category_level2_gradient_icon, CATEGORY_LEVEL2.category_level2_icon
          FROM CATEGORY_LEVEL2
        ) AS CL2 ON CL2.category_level2_no = CL4.category_level2_no
      WHERE 
        UPLOAD_POSSIBLE_USER.user_no = ${targetNo} AND 
        UPLOAD_POSSIBLE_USER.is_participate = 1 AND 
        UPLOAD_POSSIBLE_USER.type = 'artist' AND 
        UPLOAD_POSSIBLE_USER.category_level1_no = 1 AND
        UPLOAD_POSSIBLE_USER.category_level4_no = ${category4No}
      LIMIT 1
    `,
      config
    );
  }

  async getIsParticipateSeason({ targetNo }, config) {
    const res = await getOne(
      `
      SELECT UPLOAD_POSSIBLE_USER.is_participate
      FROM UPLOAD_POSSIBLE_USER
        INNER JOIN (
          SELECT CATEGORY_LEVEL3.category_level3_no, CATEGORY_LEVEL3.category_level3
          FROM CATEGORY_LEVEL3
          WHERE CATEGORY_LEVEL3.is_open = 1 AND CATEGORY_LEVEL3.open_time <= NOW() AND CATEGORY_LEVEL3.start_time <= NOW() AND  NOW() < CATEGORY_LEVEL3.end_time
        ) AS CL3 ON CL3.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no
        INNER JOIN (
          SELECT CATEGORY_LEVEL4.category_level1_no, CATEGORY_LEVEL4.category_level2_no, 
            CATEGORY_LEVEL4.category_level3_no,CATEGORY_LEVEL4.category_level4_no, CATEGORY_LEVEL4.ordinalNumber, CATEGORY_LEVEL4.title
          FROM CATEGORY_LEVEL4
          WHERE CATEGORY_LEVEL4.is_open = 1 AND CATEGORY_LEVEL4.open_time <= NOW() AND CATEGORY_LEVEL4.start_time <= NOW() AND  NOW() < CATEGORY_LEVEL4.end_time
        ) AS CL4 ON CL4.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no
      WHERE 
        UPLOAD_POSSIBLE_USER.user_no = ${targetNo} AND 
        UPLOAD_POSSIBLE_USER.is_participate = 1
      LIMIT 1
    `,
      config
    );

    return Boolean(res && res.is_participate);
  }

  async getIsParticipateCategory4No({ targetNo, category4No }, config) {
    const res = await getOne(
      `
      SELECT UPLOAD_POSSIBLE_USER.is_participate
      FROM UPLOAD_POSSIBLE_USER
        INNER JOIN (
          SELECT CATEGORY_LEVEL3.category_level3_no, CATEGORY_LEVEL3.category_level3
          FROM CATEGORY_LEVEL3
          WHERE CATEGORY_LEVEL3.is_open = 1 AND CATEGORY_LEVEL3.open_time <= NOW() AND CATEGORY_LEVEL3.start_time <= NOW() AND  NOW() < CATEGORY_LEVEL3.end_time
        ) AS CL3 ON CL3.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no
        INNER JOIN (
          SELECT CATEGORY_LEVEL4.category_level1_no, CATEGORY_LEVEL4.category_level2_no, 
            CATEGORY_LEVEL4.category_level3_no,CATEGORY_LEVEL4.category_level4_no, CATEGORY_LEVEL4.ordinalNumber, CATEGORY_LEVEL4.title
          FROM CATEGORY_LEVEL4
          WHERE CATEGORY_LEVEL4.is_open = 1 AND CATEGORY_LEVEL4.open_time <= NOW() AND CATEGORY_LEVEL4.start_time <= NOW() AND  NOW() < CATEGORY_LEVEL4.end_time
        ) AS CL4 ON CL4.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no
      WHERE 
        UPLOAD_POSSIBLE_USER.user_no = ${targetNo} AND 
        UPLOAD_POSSIBLE_USER.is_participate = 1 AND
        UPLOAD_POSSIBLE_USER.category_level4_no = ${category4No}
    `,
      config
    );

    return Boolean(res && res.is_participate);
  }

  async getParticipateByUser({ userNo }, config) {
    const res = await getAll(
      `
        SELECT *
        FROM (
          SELECT
            UPLOAD_POSSIBLE_USER.upload_possible_user_no,
            UPLOAD_POSSIBLE_USER.is_participate AS is_participate,
            IF(
              1 = CATEGORY_LEVEL3.is_push = UPLOAD_POSSIBLE_USER.is_push 
              = (CATEGORY_LEVEL4.start_time <= NOW() AND NOW() < CATEGORY_LEVEL4.end_time)
              , 1
              , 0
            ) AS is_push,
            UPLOAD_POSSIBLE_USER.is_push AS is_push_by_user,
            UPLOAD_POSSIBLE_USER.category_level1_no, 
            UPLOAD_POSSIBLE_USER.category_level2_no, 
            UPLOAD_POSSIBLE_USER.category_level3_no, 
            UPLOAD_POSSIBLE_USER.category_level4_no,
            UPLOAD_POSSIBLE_USER.created_at,
            CATEGORY_LEVEL2.category_level2_no AS \`CATEGORY_LEVEL2.category_level2_no\`,
            CATEGORY_LEVEL2.category_level2 AS \`CATEGORY_LEVEL2.category_level2\`,
            CATEGORY_LEVEL2.category_level2_gradient_icon AS \`CATEGORY_LEVEL2.category_level2_gradient_icon\`,
            CATEGORY_LEVEL2.category_level2_icon AS \`CATEGORY_LEVEL2.category_level2_icon\`,
            CATEGORY_LEVEL3.category_level3_no AS \`CATEGORY_LEVEL3.category_level3_no\`,
            CATEGORY_LEVEL3.category_level3 AS \`CATEGORY_LEVEL3.category_level3\`,
            CATEGORY_LEVEL3.is_push AS \`CATEGORY_LEVEL3.is_push\`,
            CATEGORY_LEVEL3.start_time AS \`CATEGORY_LEVEL3.start_time\`,
            CATEGORY_LEVEL3.end_time AS \`CATEGORY_LEVEL3.end_time\`,
            CATEGORY_LEVEL3.end_time AS \`CATEGORY_LEVEL3.announce_time\`,
            CATEGORY_LEVEL4.category_level4_no AS \`CATEGORY_LEVEL4.category_level4_no\`,
            CATEGORY_LEVEL4.title AS \`CATEGORY_LEVEL4.title\`,
            CATEGORY_LEVEL4.ordinalNumber AS \`CATEGORY_LEVEL4.ordinalNumber\`
          FROM UPLOAD_POSSIBLE_USER
            INNER JOIN CATEGORY_LEVEL3 ON 
              CATEGORY_LEVEL3.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no AND
              CATEGORY_LEVEL3.is_open = 1 
            INNER JOIN CATEGORY_LEVEL2 ON 
              CATEGORY_LEVEL2.category_level2_no = UPLOAD_POSSIBLE_USER.category_level2_no
            INNER JOIN CATEGORY_LEVEL4 ON
              CATEGORY_LEVEL4.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no AND
              CATEGORY_LEVEL4.is_open = 1
          WHERE 
            UPLOAD_POSSIBLE_USER.user_no = ${userNo} AND 
            UPLOAD_POSSIBLE_USER.is_participate = 1
            ORDER BY UPLOAD_POSSIBLE_USER.category_level3_no DESC, CATEGORY_LEVEL4.ordinalNumber DESC
            LIMIT 18446744073709551615    
          ) AS TEMP
        GROUP BY TEMP.category_level3_no
      `,
      config
    );

    return res;
  }

  async getMyParticipateSeason({ me }, config) {
    if (!me) {
      return null;
    }
    return await getAll(
      `
      SELECT 
        IF(IFNULL(COUNT(UPLOAD_POSSIBLE_USER.upload_possible_user_no), 0), 1, 0) AS is_participate,
        IF(
          IFNULL(COUNT(UPLOAD_POSSIBLE_USER.upload_possible_user_no), 0) = CL3.is_push = UPLOAD_POSSIBLE_USER.is_push
          , 1
          , 0) AS is_push,
        IF(
          IFNULL(
            COUNT(UPLOAD_POSSIBLE_USER.upload_possible_user_no), 0) = CL3.is_upload = CL4.is_upload = UPLOAD_POSSIBLE_USER.is_upload
          , 1
          , 0) AS is_upload,
        UPLOAD_POSSIBLE_USER.is_push AS is_push_user,
        UPLOAD_POSSIBLE_USER.type, 
	      UPLOAD_POSSIBLE_USER.category_level1_no, UPLOAD_POSSIBLE_USER.category_level2_no, UPLOAD_POSSIBLE_USER.category_level3_no, UPLOAD_POSSIBLE_USER.category_level4_no,
	      CATEGORY_LEVEL2.category_level2_no AS \`CATEGORY_LEVEL2.category_level2_no\`,
	      CATEGORY_LEVEL2.category_level2 AS \`CATEGORY_LEVEL2.category_level2\`,
	      CATEGORY_LEVEL2.category_level2_gradient_icon AS \`CATEGORY_LEVEL2.category_level2_gradient_icon\`,
	      CATEGORY_LEVEL2.category_level2_icon AS \`CATEGORY_LEVEL2.category_level2_icon\`,
	      
	      CL3.category_level3_no AS \`CATEGORY_LEVEL3.category_level3_no\`,
        CL3.category_level3 AS \`CATEGORY_LEVEL3.category_level3\`,
        CL3.start_time AS \`CATEGORY_LEVEL3.start_time\`,
        CL3.end_time AS \`CATEGORY_LEVEL3.end_time\`
        FROM UPLOAD_POSSIBLE_USER
      	 INNER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = UPLOAD_POSSIBLE_USER.category_level2_no
          INNER JOIN (
            SELECT 
              CATEGORY_LEVEL3.category_level3_no, 
              CATEGORY_LEVEL3.category_level3, 
              CATEGORY_LEVEL3.is_push,
              CATEGORY_LEVEL3.is_upload,
              CATEGORY_LEVEL3.start_time, CATEGORY_LEVEL3.end_time
            FROM CATEGORY_LEVEL3
            WHERE CATEGORY_LEVEL3.is_open = 1  AND CATEGORY_LEVEL3.open_time <= NOW() AND CATEGORY_LEVEL3.start_time <= NOW() AND  NOW() < CATEGORY_LEVEL3.end_time
          ) AS CL3 ON CL3.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no
          INNER JOIN (
            SELECT 
              CATEGORY_LEVEL4.category_level1_no, 
              CATEGORY_LEVEL4.category_level2_no, 
              CATEGORY_LEVEL4.category_level3_no,
              CATEGORY_LEVEL4.category_level4_no, 
              CATEGORY_LEVEL4.ordinalNumber, 
              CATEGORY_LEVEL4.title,
              CATEGORY_LEVEL4.is_upload
            FROM CATEGORY_LEVEL4
            WHERE CATEGORY_LEVEL4.is_open = 1 AND CATEGORY_LEVEL4.open_time <= NOW() AND CATEGORY_LEVEL4.start_time <= NOW() AND  NOW() < CATEGORY_LEVEL4.end_time
          ) AS CL4 ON CL4.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no
        WHERE UPLOAD_POSSIBLE_USER.user_no = ${me} AND UPLOAD_POSSIBLE_USER.is_participate = 1
        GROUP BY UPLOAD_POSSIBLE_USER.category_level3_no
      `,
      config
    );
  }

  async getMyParticipateSeasonByCategory4No({ me, category4No }, config) {
    if (!me) {
      return null;
    }
    return await getOne(
      `
      SELECT 
        IF(IFNULL(COUNT(UPLOAD_POSSIBLE_USER.upload_possible_user_no), 0), 1, 0) AS is_participate,
        IF(
          IFNULL(COUNT(UPLOAD_POSSIBLE_USER.upload_possible_user_no), 0) = CL3.is_push = UPLOAD_POSSIBLE_USER.is_push
          , 1
          , 0) AS is_push,
        IF(
          IFNULL(
            COUNT(UPLOAD_POSSIBLE_USER.upload_possible_user_no), 0) = CL3.is_upload = CL4.is_upload = UPLOAD_POSSIBLE_USER.is_upload
          , 1
          , 0) AS is_upload,
        UPLOAD_POSSIBLE_USER.is_push AS is_push_user,
        UPLOAD_POSSIBLE_USER.type, 
	      UPLOAD_POSSIBLE_USER.category_level1_no, UPLOAD_POSSIBLE_USER.category_level2_no, UPLOAD_POSSIBLE_USER.category_level3_no, UPLOAD_POSSIBLE_USER.category_level4_no,
	      CATEGORY_LEVEL2.category_level2_no AS \`CATEGORY_LEVEL2.category_level2_no\`,
	      CATEGORY_LEVEL2.category_level2 AS \`CATEGORY_LEVEL2.category_level2\`,
	      CATEGORY_LEVEL2.category_level2_gradient_icon AS \`CATEGORY_LEVEL2.category_level2_gradient_icon\`,
	      CATEGORY_LEVEL2.category_level2_icon AS \`CATEGORY_LEVEL2.category_level2_icon\`,
	      
	      CL3.category_level3_no AS \`CATEGORY_LEVEL3.category_level3_no\`,
        CL3.category_level3 AS \`CATEGORY_LEVEL3.category_level3\`,
        CL3.start_time AS \`CATEGORY_LEVEL3.start_time\`,
        CL3.end_time AS \`CATEGORY_LEVEL3.end_time\`
        FROM UPLOAD_POSSIBLE_USER
      	 INNER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = UPLOAD_POSSIBLE_USER.category_level2_no
          INNER JOIN (
            SELECT 
              CATEGORY_LEVEL3.category_level3_no, 
              CATEGORY_LEVEL3.category_level3, 
              CATEGORY_LEVEL3.is_push,
              CATEGORY_LEVEL3.is_upload,
              CATEGORY_LEVEL3.start_time, CATEGORY_LEVEL3.end_time
            FROM CATEGORY_LEVEL3
            WHERE CATEGORY_LEVEL3.is_open = 1  AND CATEGORY_LEVEL3.open_time <= NOW() AND CATEGORY_LEVEL3.start_time <= NOW() AND  NOW() < CATEGORY_LEVEL3.end_time
          ) AS CL3 ON CL3.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no
          INNER JOIN (
            SELECT 
              CATEGORY_LEVEL4.category_level1_no, 
              CATEGORY_LEVEL4.category_level2_no, 
              CATEGORY_LEVEL4.category_level3_no,
              CATEGORY_LEVEL4.category_level4_no, 
              CATEGORY_LEVEL4.ordinalNumber, 
              CATEGORY_LEVEL4.title,
              CATEGORY_LEVEL4.is_upload
            FROM CATEGORY_LEVEL4
            WHERE CATEGORY_LEVEL4.is_open = 1 AND CATEGORY_LEVEL4.open_time <= NOW() AND CATEGORY_LEVEL4.start_time <= NOW() AND  NOW() < CATEGORY_LEVEL4.end_time
          ) AS CL4 ON CL4.category_level4_no = UPLOAD_POSSIBLE_USER.category_level4_no
        WHERE UPLOAD_POSSIBLE_USER.user_no = ${me} AND UPLOAD_POSSIBLE_USER.is_participate = 1 AND UPLOAD_POSSIBLE_USER.category_level4_no = ${category4No}
   
      `,
      config
    );
  }

  async getMyPush({ category3No, me }, config) {
    return await getOne(
      `
      SELECT USER.user_no, USER.have_push, IF(PUSH_TEMP.residual_push > 0 , residual_push, 0) AS residual_push 
      FROM USER
        LEFT OUTER JOIN (
          SELECT residual_push, user_no
          FROM PUSH
          WHERE category_level3_no = ${category3No}
        ) AS PUSH_TEMP ON PUSH_TEMP.user_no = USER.user_no
      WHERE USER.user_no = ${me}
      FOR UPDATE 
    `,
      config
    );
  }

  // 내 푸시 지갑가 존재하는지 조회
  async existMyPush({ category1No, category2No, category3No, me }, config) {
    const res = await getOne(
      `
        SELECT IF(COUNT(push_no) > 0 , 1, 0 ) AS exist_my_push
        FROM PUSH
        WHERE user_no = ${me} AND category_level1_no = ${category1No} AND category_level2_no = ${category2No} AND category_level3_no = ${category3No}  
        FOR UPDATE
    `,
      config
    );

    return Boolean(res && res.exist_my_push);
  }

  // 내 푸시 지갑 생성
  async createMyPush({ category1No, category2No, category3No, me }, config) {
    await set(
      `
      INSERT INTO PUSH (user_no, category_level1_no, category_level2_no, category_level3_no, total_push, residual_push)
      VALUES (${me}, ${category1No}, ${category2No}, ${category3No}, 0, 0 )
    `,
      config
    );
  }

  // 드리머에 대한 내정보 가져오기
  async getMyProducerInfoByDreamer({ category4No, me, dreamerNo }) {
    return await getOne(`
    SELECT TEMP_RANK.ranking, TEMP_RANK.user_no, TEMP_RANK.nickname, TEMP_RANK.user_photo, TEMP_RANK.myPush, 
      CAST(IFNULL(TEMP_RANK.totalPush, 0) AS UNSIGNED) AS totalPush, TEMP_RANK.myRatio, 
      (
        SELECT point
        FROM POINT
        WHERE POINT.producer_no = ${me} AND POINT.dreamer_no = ${dreamerNo} AND POINT.category_level4_no = ${category4No}
      ) AS myPoint
    FROM (
      SELECT RANK() OVER (ORDER BY TEMP.sum_push DESC) AS ranking, TEMP.user_no, TEMP.nickname, TEMP.user_photo, TEMP.sum_push AS myPush, 
        TEMP.totalPush AS totalPush,
        CAST(TEMP.myRatio AS DECIMAL(4,1)) AS myRatio
      FROM
      (
        SELECT USER.user_no, USER.nickname, USER.user_photo, CAST(sum(PUSH_LOG.push) as UNSIGNED) AS sum_push, 
        (
          SELECT SUM(push)
          FROM PUSH_LOG
            INNER JOIN CATEGORY_LEVEL3 AS CL3 ON CL3.category_level3_no = PUSH_LOG.category_level3_no  AND CL3.is_open = 1 AND CL3.start_time <= NOW() AND NOW() < CL3.end_time
              INNER JOIN CATEGORY_LEVEL4 AS CL4 ON CL4.category_level3_no = CL3.category_level3_no  AND CL4.is_open = 1 AND CL4.start_time <= NOW() AND NOW() < CL4.end_time
          WHERE PUSH_LOG.gubun = 'PUSH' AND PUSH_LOG.category_level4_no = ${category4No} AND PUSH_LOG.dreamer_no = ${dreamerNo}
        ) AS totalPush,
        sum(PUSH_LOG.push) /
        (
          SELECT SUM(push)
          FROM PUSH_LOG
            INNER JOIN CATEGORY_LEVEL3 AS CL3 ON CL3.category_level3_no = PUSH_LOG.category_level3_no  AND CL3.is_open = 1 AND CL3.start_time <= NOW() AND NOW() < CL3.end_time
              INNER JOIN CATEGORY_LEVEL4 AS CL4 ON CL4.category_level3_no = CL3.category_level3_no  AND CL4.is_open = 1 AND CL4.start_time <= NOW() AND NOW() < CL4.end_time
          WHERE PUSH_LOG.gubun = 'PUSH' AND PUSH_LOG.category_level4_no = ${category4No} AND PUSH_LOG.dreamer_no = ${dreamerNo}
        ) * 100 AS myRatio
        FROM PUSH_LOG
          INNER JOIN CATEGORY_LEVEL3 AS CL3 ON CL3.category_level3_no = PUSH_LOG.category_level3_no  AND CL3.is_open = 1 AND CL3.start_time <= NOW() AND NOW() < CL3.end_time
          INNER JOIN CATEGORY_LEVEL4 AS CL4 ON CL4.category_level3_no = CL3.category_level3_no  AND CL4.is_open = 1 AND CL4.start_time <= NOW() AND NOW() < CL4.end_time
          INNER JOIN USER ON USER.user_no = PUSH_LOG.producer_no
        WHERE PUSH_LOG.gubun = 'PUSH' AND PUSH_LOG.category_level4_no = ${category4No} AND PUSH_LOG.dreamer_no = ${dreamerNo} AND CL4.start_time <= PUSH_LOG.created_at AND PUSH_LOG.created_at < CL4.end_time
        GROUP BY PUSH_LOG.producer_no
        HAVING sum_push > 0
        ORDER BY sum_push DESC
      ) TEMP
    ) AS TEMP_RANK
    WHERE TEMP_RANK.user_no = ${me}
    `);
  }

  async getResidualPushList({ userNo }) {
    return await getAll(`
      SELECT PUSH.user_no, PUSH.category_level1_no, PUSH.category_level2_no, PUSH.category_level3_no, PUSH.total_push, PUSH.residual_push,
        CL2.category_level2_no AS \`CATEGORY_LEVEL2.category_level2_no\`, 
        CL2.category_level2 AS \`CATEGORY_LEVEL2.category_level2\`, 
        CL2.category_level2_desc AS \`CATEGORY_LEVEL2.category_level2_desc\`,
        CL2.category_level2_gradient_icon AS \`CATEGORY_LEVEL2.category_level2_gradient_icon\`,
        CL2.category_level2_icon AS \`CATEGORY_LEVEL2.category_level2_icon\`,
        CL3.category_level3_no AS \`CATEGORY_LEVEL3.category_level3_no\`, 
        CL3.category_level3 AS \`CATEGORY_LEVEL3.category_level3\`, 
        CL4.category_level4_no AS \`CATEGORY_LEVEL4.category_level4_no\`,
        CL4.ordinalNumber AS \`CATEGORY_LEVEL4.ordinalNumber\`,
        CL4.title AS \`CATEGORY_LEVEL4.title\`
      FROM PUSH
        INNER JOIN (
          SELECT category_level2_no, category_level2, category_level2_desc, category_level2_gradient_icon, category_level2_icon
          FROM CATEGORY_LEVEL2
        ) AS CL2 ON CL2.category_level2_no = PUSH.category_level2_no
        INNER JOIN (
          SELECT category_level3_no, category_level3
          FROM CATEGORY_LEVEL3
          WHERE is_open = 1 AND open_time <= NOW() AND start_time <= NOW() AND NOW() < end_time
        ) AS CL3 ON CL3.category_level3_no = PUSH.category_level3_no
        INNER JOIN (
          SELECT category_level4_no, category_level3_no, ordinalNumber, title
          FROM CATEGORY_LEVEL4
          WHERE is_open = 1 AND open_time <= NOW() AND start_time <= NOW() AND NOW() < end_time
        ) AS CL4 ON CL4.category_level3_no = PUSH.category_level3_no 
      WHERE user_no = ${userNo}
     `);
  }

  // 라운드에 대한 받은 푸쉬 조회
  async getMyReceivePushInRound({ category4No, startTime, endTime, userNo }) {
    return await getOne(`
      SELECT CAST(IFNULL(SUM(PUSH), 0 ) AS UNSIGNED) AS sum_push, 
      ${escapeQuot(startTime)} AS start_time, ${escapeQuot(endTime)} AS end_time
      FROM PUSH_LOG
      WHERE PUSH_LOG.gubun = 'PUSH' AND dreamer_no = ${userNo} AND category_level4_no = ${category4No} 
        AND ${escapeQuot(
          startTime
        )} <= created_at AND created_at < ${escapeQuot(endTime)}
    `);
  }

  // 라운드에 대한 오늘, 이번 주, 이번 달, 시즌별 받은 푸쉬 조회
  async getMyReceivePushInRoundByAllCondition({
    category4No,
    startTodayTime,
    startWeekTime,
    startMonthTime,
    startSeasonTime,
    userNo,
  }) {
    console.log("\n\n\n\n\n");
    return await getOne(`
      SELECT ${category4No} AS category_level4_no,
       (
        SELECT CAST(IFNULL(SUM(PUSH), 0) AS UNSIGNED)
        FROM PUSH_LOG
        WHERE PUSH_LOG.gubun = 'PUSH' AND dreamer_no = ${userNo} AND category_level4_no = ${category4No} 
          AND ${escapeQuot(startTodayTime)} <= created_at AND created_at < NOW()
      ) AS todayReceivePush,
      (
        SELECT CAST(IFNULL(SUM(PUSH), 0) AS UNSIGNED)
        FROM PUSH_LOG
        WHERE PUSH_LOG.gubun = 'PUSH' AND dreamer_no = ${userNo} AND category_level4_no = ${category4No} 
          AND ${escapeQuot(startWeekTime)} <= created_at AND created_at < NOW()
      ) AS weekReceivePush,
      (
        SELECT CAST(IFNULL(SUM(PUSH), 0) AS UNSIGNED)
        FROM PUSH_LOG
        WHERE PUSH_LOG.gubun = 'PUSH' AND dreamer_no = ${userNo} AND category_level4_no = ${category4No} 
          AND ${escapeQuot(startMonthTime)}<= created_at AND created_at < NOW()
      ) AS monthReceivePush,
      (
        SELECT CAST(IFNULL(SUM(PUSH), 0) AS UNSIGNED)
        FROM PUSH_LOG
        WHERE PUSH_LOG.gubun = 'PUSH' AND dreamer_no = ${userNo} AND category_level4_no = ${category4No} 
          AND ${escapeQuot(
            startSeasonTime
          )} <= created_at AND created_at < NOW()
      ) AS seasonReceivePush
    `);
  }

  async getParticipateCategory({ userNo }) {
    return await getAll(`
      SELECT UPLOAD_POSSIBLE_USER.category_level1_no, UPLOAD_POSSIBLE_USER.category_level2_no, UPLOAD_POSSIBLE_USER.category_level3_no,

        CATEGORY_LEVEL2.category_level2_no AS \`CATEGORY_LEVEL2.category_level2_no\`,
        CATEGORY_LEVEL2.category_level2 AS \`CATEGORY_LEVEL2.category_level2\`,
        CATEGORY_LEVEL2.category_level2_desc AS \`CATEGORY_LEVEL2.category_level2_desc\`,
        
        CATEGORY_LEVEL3.category_level3_no AS \`CATEGORY_LEVEL3.category_level3_no\`,
        CATEGORY_LEVEL3.category_level3 AS \`CATEGORY_LEVEL3.category_level3\`,
        CATEGORY_LEVEL3.start_time AS \`CATEGORY_LEVEL3.start_time\`,
        CATEGORY_LEVEL3.end_time AS \`CATEGORY_LEVEL3.end_time\`
      FROM UPLOAD_POSSIBLE_USER
        INNER JOIN CATEGORY_LEVEL3 ON CATEGORY_LEVEL3.category_level3_no = UPLOAD_POSSIBLE_USER.category_level3_no
        INNER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = CATEGORY_LEVEL3.category_level2_no
      WHERE UPLOAD_POSSIBLE_USER.is_participate = 1 AND UPLOAD_POSSIBLE_USER.user_no = ${userNo} AND UPLOAD_POSSIBLE_USER.category_level1_no = 1
      GROUP BY UPLOAD_POSSIBLE_USER.category_level3_no
    
    `);
  }

  async applySeason({ category4No, type, me }, config) {
    const isPush = type === "artist" ? 1 : 0;
    return await set(
      `
      INSERT INTO UPLOAD_POSSIBLE_USER (user_no, type, is_push, is_upload, is_participate, category_level1_no, category_level2_no, category_level3_no, category_level4_no)
      VALUES (${me}, ${escapeQuot(type)}, ${isPush}, 1, 1, (
        SELECT category_level1_no
        FROM CATEGORY_LEVEL4
        WHERE category_level4_no = ${category4No}

      ), (
        SELECT category_level2_no
        FROM CATEGORY_LEVEL4
        WHERE category_level4_no = ${category4No}

      ), (
        SELECT category_level3_no
        FROM CATEGORY_LEVEL4
        WHERE category_level4_no = ${category4No}
      ), (
        SELECT category_level4_no
        FROM CATEGORY_LEVEL4
        WHERE category_level4_no = ${category4No}
      ))
    `,
      config
    );
  }

  /**
   * 나의 포인트 조회
   */
  async getMyPoint({ me }, config) {
    if (!me) {
      return [];
    }

    return await getAll(`
      SELECT POINT.category_level1_no, POINT.category_level3_no, POINT.category_level3_no, POINT.category_level4_no,
        PRODUCER.user_no AS producer_no,
        POINT.point,
        DREAMER.user_no AS \`DREAMER.user_no\`,
        DREAMER.nickname AS \`DREAMER.nickname\`,
        DREAMER.user_photo AS \`DREAMER.user_photo\`,
        CATEGORY_LEVEL2.category_level2_no AS \`CATEGORY_LEVEL2.category_level2_no\`,
        CATEGORY_LEVEL2.category_level2 AS \`CATEGORY_LEVEL2.category_level2\`,
        CATEGORY_LEVEL2.category_level2_icon AS \`CATEGORY_LEVEL2.category_level2_icon\`,
        CL3.category_level3_no AS \`CATEGORY_LEVEL3.category_level3_no\`,
        CL3.category_level3 AS \`CATEGORY_LEVEL3.category_level3\`,
        CL4.category_level4_no AS \`CATEGORY_LEVEL4.category_level4_no\`,
        CL4.ordinalNumber AS \`CATEGORY_LEVEL4.ordinalNumber\`
      FROM POINT 
        INNER JOIN (
          SELECT category_level3_no, category_level3
          FROM CATEGORY_LEVEL3
          WHERE is_open = 1 AND open_time <= NOW() AND start_time <= NOW() AND NOW() < end_time
        ) AS CL3 ON CL3.category_level3_no = POINT.category_level3_no
        INNER JOIN (
          SELECT category_level4_no, category_level3_no, ordinalNumber
          FROM CATEGORY_LEVEL4
          WHERE is_open = 1 AND open_time <= NOW() AND start_time <= NOW() AND NOW() < end_time
        )  AS CL4 ON CL4.category_level4_no = POINT.category_level4_no AND CL4.category_level3_no = CL3.category_level3_no
        INNER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level2_no = POINT.category_level2_no
        INNER JOIN USER AS PRODUCER ON PRODUCER.user_no = POINT.producer_no
        INNER JOIN USER AS DREAMER ON DREAMER.user_no = POINT.dreamer_no
      WHERE POINT.category_level1_no = 1 AND PRODUCER.user_no = ${me}
    `);
  }

  /**
   * 닉네임 변경 로그 체크
   */

  async checkChangeNicknameLog({ userNo }) {
    const res = await getOne(`
      SELECT IF(COUNT(change_nickname_log_no) > 0, 0, 1) AS isEmptyLogInFifteenDays
      FROM CHANGE_NICKNAME_LOG
      WHERE user_no = ${userNo} AND created_at  > ${escapeQuot(
      moment().subtract(15, "day").format("YYYY-MM-DD HH:mm:ss")
    )}
      LIMIT 1
    `);

    return Boolean(res.isEmptyLogInFifteenDays);
  }

  /**
   * 닉네임 변경 로그 생성
   */
  async setChangeNicknameLog({ user, nickname }) {
    return await set(
      `
        INSERT INTO CHANGE_NICKNAME_LOG(user_no, nickname_before_change, nickname_after_change)
        VALUES (${user.user_no}, ${escapeQuot(user.nickname)} , ${escapeQuot(
        nickname
      )})
      `
    );
  }

  /**
   * 유저의 항목별 상위 위치 차트 정보 조회
   */

  async getScoreChartData({ userNo, category3No, startDate, now }) {
    const viewScore = await getOne(`
      SELECT 'view' AS type, 100 - IFNULL(ROUND(TEMP_USER.user_sum_view / TEMP.sum_view * 100, 2), 0) AS remaningValue, 
        IFNULL(ROUND(TEMP_USER.user_sum_view / TEMP.sum_view * 100, 2), 0) AS value
      FROM (
        SELECT IFNULL(COUNT(ACTIVE_LOG.active_log_no), 0) AS user_sum_view
        FROM ACTIVE_LOG
        WHERE ACTIVE_LOG.gubun = 'view_video' AND ACTIVE_LOG.target_no IN (
          SELECT video_no
          FROM VIDEO
          WHERE VIDEO.user_no = ${userNo}
            AND category_level3_no = ${category3No}
            AND created_at >= ${escapeQuot(startDate)} 
            AND created_at <= ${escapeQuot(now)}
        )
      ) AS TEMP_USER,
      (
        SELECT IFNULL(COUNT(ACTIVE_LOG.active_log_no), 0) AS sum_view
        FROM ACTIVE_LOG
        WHERE ACTIVE_LOG.gubun = 'view_video' AND ACTIVE_LOG.target_no IN (
          SELECT video_no
          FROM VIDEO
          WHERE category_level3_no = ${category3No}
            AND created_at >= ${escapeQuot(startDate)} 
            AND created_at <= ${escapeQuot(now)}
        )
      ) AS TEMP
    `);

    const likeScore = await getOne(`
      SELECT 'like' AS type, 100 - IFNULL(ROUND(TEMP_USER.user_sum_like / TEMP.sum_like * 100, 2), 0) AS remaningValue, 
        IFNULL(ROUND(TEMP_USER.user_sum_like / TEMP.sum_like * 100, 2), 0) AS value
      FROM (
        SELECT IFNULL(COUNT(ACTIVE_LOG.active_log_no), 0) AS user_sum_like
        FROM ACTIVE_LOG
        WHERE ACTIVE_LOG.gubun = 'like_video' AND ACTIVE_LOG.target_no IN (
          SELECT video_no
          FROM VIDEO
          WHERE VIDEO.user_no = ${userNo}
            AND category_level3_no = ${category3No}
            AND created_at >= ${escapeQuot(startDate)} 
            AND created_at <= ${escapeQuot(now)}
        )
      ) AS TEMP_USER,
      (
        SELECT IFNULL(COUNT(ACTIVE_LOG.active_log_no), 0) AS sum_like
        FROM ACTIVE_LOG
        WHERE ACTIVE_LOG.gubun = 'like_video' AND ACTIVE_LOG.target_no IN (
          SELECT video_no
          FROM VIDEO
          WHERE category_level3_no = ${category3No}
            AND created_at >= ${escapeQuot(startDate)} 
            AND created_at <= ${escapeQuot(now)}
        )
      ) AS TEMP
    `);

    const pushScore = await getOne(`
      SELECT 'push' AS type, 100 - IFNULL(ROUND( TEMP_USER.user_sum_push / TEMP.sum_push * 100, 2), 0) AS remaningValue, 
        IFNULL(ROUND(TEMP_USER.user_sum_push / TEMP.sum_push * 100, 2), 0) AS value
      FROM (
        SELECT IFNULL(SUM(PUSH_LOG.push), 0) AS user_sum_push
        FROM PUSH_LOG
        WHERE PUSH_LOG.dreamer_no = ${userNo}
          AND PUSH_LOG.category_level3_no = ${category3No}
          AND PUSH_LOG.gubun = 'PUSH' 
          AND PUSH_LOG.created_at >= ${escapeQuot(startDate)} 
          AND PUSH_LOG.created_at <= ${escapeQuot(now)}
      ) AS TEMP_USER,
      (
        SELECT IFNULL(SUM(PUSH_LOG.push), 0) AS sum_push
        FROM PUSH_LOG
        WHERE PUSH_LOG.category_level3_no = ${category3No}
          AND PUSH_LOG.gubun = 'PUSH' 
          AND PUSH_LOG.created_at >= ${escapeQuot(startDate)} 
          AND PUSH_LOG.created_at <= ${escapeQuot(now)}
      ) AS TEMP
    `);

    return [
      {
        type: viewScore.type,
        data: [{ value: viewScore.value }, { value: viewScore.remaningValue }],
      },
      {
        type: likeScore.type,
        data: [{ value: likeScore.value }, { value: likeScore.remaningValue }],
      },
      {
        type: pushScore.type,
        data: [{ value: pushScore.value }, { value: pushScore.remaningValue }],
      },
    ];
  }

  /**
   * 유저의 랭크 차트 정보 조회
   */
  async getRankChartData({
    userNo,
    period,
    startDate,
    now,
    category3No,
    category4No,
  }) {
    const rankBetweenDate = await getAll(
      `
        SELECT ranking AS value, date_format(date, '%Y-%m-%d') AS date
        FROM RANK_LOG
        WHERE gubun = ${escapeQuot(String(period).toLowerCase())} 
          AND user_no = ${userNo} 
          AND date >= ${escapeQuot(startDate)} 
          AND date <= ${escapeQuot(
            moment(now).subtract(1, "day").format("YYYY-MM-DD 00:00:00")
          )}
          AND category_level3_no = ${category3No}
        ORDER BY date ASC
      `
    );

    let rankToday = [];

    // 오늘의 주간랭킹
    if (period === "week") {
      rankToday = await rankQuery.getRankListByUserNo({
        startDate: moment(now).startOf("week").format("YYYY-MM-DD 00:00:00"),
        endDate: now,
        category3No,
        userNo,
      });
    }
    // 오늘의 월간랭킹
    else if (period === "month") {
      rankToday = await rankQuery.getRankListByUserNo({
        startDate: moment(now).startOf("month").format("YYYY-MM-DD 00:00:00"),
        endDate: now,
        category3No,
        userNo,
      });
    }
    // // 오늘의 시즌랭킹
    else {
      rankToday = await rankQuery.getRoundRankListByUserNo({
        endDate: now,
        category4No,
        userNo,
      });
    }

    // 데이터 규격 맞추기
    rankToday = rankToday.map((v) => ({
      value: v.ranking,
      date: moment(v.date).format("YYYY-MM-DD"),
    }));

    // 데이터 합치기
    const datas = [].concat(rankBetweenDate, rankToday);

    return getChartDatas(startDate, now, (v) => {
      const index = datas.findIndex((data) => data.date === v.date);

      return {
        ...v,
        value: index !== -1 ? datas[index].value : 0,
      };
    });
  }

  /**
   * 유저의 푸쉬 차트 정보 조회
   */
  async getPushChartData({ userNo, startDate, now, category3No }) {
    const res = await getAll(`
      SELECT TEMP.date, TEMP.push AS value, TEMP_ACC.start_accumulate_push
      FROM (
        SELECT DATE_FORMAT(created_at, "%Y-%m-%d") AS date, CONVERT(IFNULL(SUM(PUSH), 0), UNSIGNED) AS push
        FROM PUSH_LOG
        WHERE dreamer_no = ${userNo} 
          AND gubun = 'PUSH'
          AND created_at >= ${escapeQuot(startDate)} 
          AND created_at <= ${escapeQuot(now)} 
          AND category_level3_no = ${category3No}
        GROUP BY DATE
      ) AS TEMP,
      (
        SELECT CONVERT(IFNULL(SUM(PUSH), 0), UNSIGNED) AS start_accumulate_push
        FROM PUSH_LOG
        WHERE dreamer_no = ${userNo} 
          AND gubun = 'PUSH'
          AND created_at < ${escapeQuot(startDate)} 
          AND category_level3_no = ${category3No}
      ) AS TEMP_ACC
      ORDER BY TEMP.date ASC
    `);

    let sum = 0;

    const datas = res;

    // 누적 푸쉬 시작값
    const startAccumulatePush = datas[0] ? datas[0].start_accumulate_push : 0;

    return getChartDatas(startDate, now, (v) => {
      const index = datas.findIndex((data) => data.date === v.date);
      sum += Number(index !== -1 ? datas[index].value : 0);

      return {
        ...v,
        value: index !== -1 ? datas[index].value : 0,
        lineValue: startAccumulatePush + sum,
      };
    });
  }

  /**
   * fan 차트 정보 조회
   */

  async getFanChartData({ userNo }) {
    const res = await getOne(`
      SELECT IFNULL(ROUND(SUM(IF(USER.gender = 1, 1, 0)) / COUNT(USER.gender), 2), 0) AS ratioMale, IFNULL(ROUND(SUM(IF(USER.gender = 0, 1, 0)) / COUNT(USER.gender), 2), 0) AS ratioFemale
        , IFNULL(ROUND(SUM(IF((TO_DAYS(NOW()) - TO_DAYS(USER.birthdate)) / 365 >= 10 AND (TO_DAYS(NOW()) - TO_DAYS(USER.birthdate)) / 365 < 20, 1, 0)) / COUNT(USER.birthdate), 2), 0) AS ratioTeenage
        , IFNULL(ROUND(SUM(IF((TO_DAYS(NOW()) - TO_DAYS(USER.birthdate)) / 365 >= 20 AND (TO_DAYS(NOW()) - TO_DAYS(USER.birthdate)) / 365 < 30, 1, 0)) / COUNT(USER.birthdate), 2), 0) AS ratioTwenty
        , IFNULL(ROUND(SUM(IF((TO_DAYS(NOW()) - TO_DAYS(USER.birthdate)) / 365 >= 30 AND (TO_DAYS(NOW()) - TO_DAYS(USER.birthdate)) / 365 < 40, 1, 0)) / COUNT(USER.birthdate), 2), 0) AS ratioThirty
        , IFNULL(ROUND(SUM(IF((TO_DAYS(NOW()) - TO_DAYS(USER.birthdate)) / 365 >= 40 AND (TO_DAYS(NOW()) - TO_DAYS(USER.birthdate)) / 365 < 50, 1, 0)) / COUNT(USER.birthdate), 2), 0) AS ratioForty
        , IFNULL(ROUND(SUM(IF((TO_DAYS(NOW()) - TO_DAYS(USER.birthdate)) / 365 >= 50 AND (TO_DAYS(NOW()) - TO_DAYS(USER.birthdate)) / 365 < 60, 1, 0)) / COUNT(USER.birthdate), 2), 0) AS ratioFifty
        , IFNULL(ROUND(SUM(IF((TO_DAYS(NOW()) - TO_DAYS(USER.birthdate)) / 365 >= 60 AND (TO_DAYS(NOW()) - TO_DAYS(USER.birthdate)) / 365 < 70, 1, 0)) / COUNT(USER.birthdate), 2), 0) AS ratioSixty
        , IFNULL(ROUND(SUM(IF((TO_DAYS(NOW()) - TO_DAYS(USER.birthdate)) / 365 >= 70 OR (TO_DAYS(NOW()) - TO_DAYS(USER.birthdate)) / 365 < 10, 1, 0)) / COUNT(USER.birthdate), 2), 0) AS ratioEtc
      FROM ACTIVE_LOG
        INNER JOIN USER ON USER.user_no = ACTIVE_LOG.user_no
      WHERE gubun = 'like_video' AND target_no IN (SELECT video_no FROM VIDEO WHERE user_no = ${userNo})
    `);
    return {
      genderData: [{ value: res.ratioFemale }, { value: res.ratioMale }],
      ageData: [
        { value: res.ratioTeenage },
        { value: res.ratioTwenty },
        { value: res.ratioThirty },
        { value: res.ratioForty },
        { value: res.ratioFifty },
        { value: res.ratioSixty },
        { value: res.ratioEtc },
      ],
    };
    // const res = await getOne(`
    //   SELECT IFNULL(ROUND(male_follower_count / follower_count * 100, 2), 0) AS male_follower_ratio,
    //     IF(follower_count > 0, 100 - IFNULL(ROUND(male_follower_count / follower_count * 100, 2), 0), 0) AS female_follower_ratio,
    //     IFNULL(ROUND(teen_follower_count / follower_count * 100, 2), 0) AS teen_follower_ratio,
    //     IFNULL(ROUND(twenties_follower_count / follower_count * 100, 2), 0) AS twenties_follower_ratio,
    //     IFNULL(ROUND(thirties_follower_count / follower_count * 100, 2), 0) AS thirties_follower_ratio,
    //     IFNULL(ROUND(forties_follower_count / follower_count * 100, 2), 0) AS forties_follower_ratio,
    //     IFNULL(ROUND(fifties_follower_count / follower_count * 100, 2), 0) AS fifties_follower_ratio,
    //     IFNULL(ROUND(sixties_follower_count / follower_count * 100, 2), 0) AS sixties_follower_ratio,
    //     IF(follower_count > 0, 100 - IFNULL(
    //       ROUND(teen_follower_count / follower_count * 100, 2)
    //       + ROUND(twenties_follower_count / follower_count * 100, 2)
    //       + ROUND(thirties_follower_count / follower_count * 100, 2)
    //       + ROUND(forties_follower_count / follower_count * 100, 2)
    //       + ROUND(fifties_follower_count / follower_count * 100, 2)
    //       + ROUND(sixties_follower_count / follower_count * 100, 2)
    //       , 0)
    //     , 0) AS rest_age_follower_ratio
    //   FROM (
    //     SELECT IFNULL(COUNT(user.user_no), 0) AS follower_count,
    //       IFNULL(SUM(IF(user.gender = 1, 1 , 0)), 0) AS male_follower_count,
    //       IFNULL(SUM(IF(user.gender = 1, 0 , 0)), 0) AS female_follower_count,
    //       IFNULL(SUM(IF(	( TO_DAYS(NOW()) - TO_DAYS(user.birthdate) ) / 365 >= 10 AND ( TO_DAYS(NOW()) - TO_DAYS(user.birthdate) ) / 365 < 20, 1 , 0)), 0) AS teen_follower_count,
    //       IFNULL(SUM(IF(	( TO_DAYS(NOW()) - TO_DAYS(user.birthdate) ) / 365 >= 20 AND ( TO_DAYS(NOW()) - TO_DAYS(user.birthdate) ) / 365 < 30, 1 , 0)), 0) AS twenties_follower_count,
    //       IFNULL(SUM(IF(	( TO_DAYS(NOW()) - TO_DAYS(user.birthdate) ) / 365 >= 30 AND ( TO_DAYS(NOW()) - TO_DAYS(user.birthdate) ) / 365 < 40, 1 , 0)), 0) AS thirties_follower_count,
    //       IFNULL(SUM(IF(	( TO_DAYS(NOW()) - TO_DAYS(user.birthdate) ) / 365 >= 40 AND ( TO_DAYS(NOW()) - TO_DAYS(user.birthdate) ) / 365 < 50, 1 , 0)), 0) AS forties_follower_count,
    //       IFNULL(SUM(IF(	( TO_DAYS(NOW()) - TO_DAYS(user.birthdate) ) / 365 >= 50 AND ( TO_DAYS(NOW()) - TO_DAYS(user.birthdate) ) / 365 < 60, 1 , 0)), 0) AS fifties_follower_count,
    //       IFNULL(SUM(IF(	( TO_DAYS(NOW()) - TO_DAYS(user.birthdate) ) / 365 >= 60 AND ( TO_DAYS(NOW()) - TO_DAYS(user.birthdate) ) / 365 < 70, 1 , 0)), 0) AS sixties_follower_count,
    //       IFNULL(SUM(IF(	( TO_DAYS(NOW()) - TO_DAYS(user.birthdate) ) / 365 < 10 OR ( TO_DAYS(NOW()) - TO_DAYS(user.birthdate) ) / 365 >= 70, 1 , 0)), 0) AS rest_age_follower_count
    //     FROM USER_FOLLOW
    //       INNER JOIN USER ON USER.user_no = USER_FOLLOW.follower_no
    //     WHERE USER_FOLLOW.following_no = ${userNo}
    //   ) AS TEMP
    //  `);

    // return {
    //   genderData: [
    //     {
    //       value: res.male_follower_ratio,
    //     },
    //     {
    //       value: res.female_follower_ratio,
    //     },
    //   ],
    //   ageData: [
    //     { value: res.teen_follower_ratio },
    //     { value: res.twenties_follower_ratio },
    //     { value: res.thirties_follower_ratio },
    //     { value: res.forties_follower_ratio },
    //     { value: res.fifties_follower_ratio },
    //     { value: res.sixties_follower_ratio },
    //     { value: res.rest_age_follower_ratio },
    //   ],
    // };
  }

  /**
   * 유저의 비디오 조회 차트 정보 조회
   */

  async getVideoViewChartData({ userNo, startDate, now, category3No }) {
    // 비디오 조회 수
    const videoViewRes = await getAll(`
      SELECT DATE_FORMAT(created_at, "%Y-%m-%d") AS date, CONVERT(IFNULL(count(active_log_no), 0), UNSIGNED) AS value
      FROM ACTIVE_LOG
      WHERE gubun = 'view_video' AND target_no IN (
        SELECT VIDEO.video_no
        FROM VIDEO
        WHERE VIDEO.user_no = ${userNo} 
          AND category_level3_no = ${category3No}
          AND created_at >= ${escapeQuot(startDate)} 
          AND created_at <= ${escapeQuot(now)} 
        )
        GROUP BY date
    `);

    // 등록된 비디오 수
    const videoCreateRes = await getAll(`
      SELECT DATE_FORMAT(created_at, "%Y-%m-%d") AS date, CONVERT(IFNULL(count(video_no), 0), UNSIGNED) AS value
      FROM VIDEO
      WHERE VIDEO.user_no = ${userNo} 
        AND category_level3_no = ${category3No}
        AND flag = 0
        AND created_at >= ${escapeQuot(startDate)} 
        AND created_at <= ${escapeQuot(now)}
      
      GROUP BY date
    `);

    let result = [];
    let temp = [];

    temp = getChartDatas(startDate, now, (v) => {
      const index = videoViewRes.findIndex((data) => data.date === v.date);

      return {
        ...v,
        lineValue: index !== -1 ? videoViewRes[index].value : 0,
      };
    });

    result = [...temp];

    temp = getChartDatas(startDate, now, (v) => {
      const index = videoCreateRes.findIndex((data) => data.date === v.date);

      return {
        ...v,
        value: index !== -1 ? videoCreateRes[index].value : 0,
      };
    });

    result = result.map((v) => {
      const data = temp.find((tempData) => tempData.date === v.date);

      return {
        ...v,
        ...data,
      };
    });

    return result;
  }

  /**
   * 유저의 비디오 좋아요 차트 정보 조회
   */

  async getVideoLikeChartData({ userNo, startDate, now, category3No }) {
    // 비디오 조회 수
    const videoLikeRes = await getAll(`
      SELECT DATE_FORMAT(created_at, "%Y-%m-%d") AS date, CONVERT(IFNULL(count(active_log_no), 0), UNSIGNED) AS value
      FROM ACTIVE_LOG
      WHERE gubun = 'like_video' AND target_no IN (
        SELECT VIDEO.video_no
        FROM VIDEO
        WHERE VIDEO.user_no = ${userNo} 
          AND category_level3_no = ${category3No}
          AND created_at >= ${escapeQuot(startDate)} 
          AND created_at <= ${escapeQuot(now)} 
        )
      GROUP BY date
    `);

    // 등록된 비디오 수
    const videoCreateRes = await getAll(`
      SELECT DATE_FORMAT(created_at, "%Y-%m-%d") AS date, CONVERT(IFNULL(count(video_no), 0), UNSIGNED) AS value
      FROM VIDEO
      WHERE VIDEO.user_no = ${userNo} 
        AND category_level3_no = ${category3No}
        AND flag = 0
        AND created_at >= ${escapeQuot(startDate)} 
        AND created_at <= ${escapeQuot(now)}
      
      GROUP BY date
    `);

    let result = [];
    let temp = [];

    temp = getChartDatas(startDate, now, (v) => {
      const index = videoLikeRes.findIndex((data) => data.date === v.date);

      return {
        ...v,
        lineValue: index !== -1 ? videoLikeRes[index].value : 0,
      };
    });

    result = [...temp];

    temp = getChartDatas(startDate, now, (v) => {
      const index = videoCreateRes.findIndex((data) => data.date === v.date);

      return {
        ...v,
        value: index !== -1 ? videoCreateRes[index].value : 0,
      };
    });

    result = result.map((v) => {
      const data = temp.find((tempData) => tempData.date === v.date);

      return {
        ...v,
        ...data,
      };
    });

    return result;
  }

  /**
   * 유저의 팔로우 차트 정보 조회
   */

  async getUserFollowData({ userNo, startDate, now, category3No }) {
    // 비디오 조회 수
    const userFollowRes = await getAll(`
      SELECT DATE_FORMAT(created_at, "%Y-%m-%d") AS date, CONVERT(IFNULL(count(user_follow_no), 0), UNSIGNED) AS value
      FROM USER_FOLLOW
      WHERE following_no = ${userNo}
        AND created_at >= ${escapeQuot(startDate)} 
        AND created_at <= ${escapeQuot(now)}
      GROUP BY date
    `);

    // 등록된 비디오 수
    const videoCreateRes = await getAll(`
      SELECT DATE_FORMAT(created_at, "%Y-%m-%d") AS date, CONVERT(IFNULL(count(video_no), 0), UNSIGNED) AS value
      FROM VIDEO
      WHERE VIDEO.user_no = ${userNo} 
        AND category_level3_no = ${category3No}
        AND flag = 0
        AND created_at >= ${escapeQuot(startDate)} 
        AND created_at <= ${escapeQuot(now)}
      
      GROUP BY date
    `);

    let result = [];
    let temp = [];

    temp = getChartDatas(startDate, now, (v) => {
      const index = userFollowRes.findIndex((data) => data.date === v.date);

      return {
        ...v,
        lineValue: index !== -1 ? userFollowRes[index].value : 0,
      };
    });

    result = [...temp];

    temp = getChartDatas(startDate, now, (v) => {
      const index = videoCreateRes.findIndex((data) => data.date === v.date);

      return {
        ...v,
        value: index !== -1 ? videoCreateRes[index].value : 0,
      };
    });

    result = result.map((v) => {
      const data = temp.find((tempData) => tempData.date === v.date);

      return {
        ...v,
        ...data,
      };
    });

    return result;
  }

  /**
   * 나의 후원 정보 조회
   */
  async getMySupport({ me }) {
    return await getAll(`
    SELECT PUSH_LOG.push_log_no, 
      PUSH_LOG.push AS support,
      SUM_TEMP.sum_support,
      PUSH_LOG.created_at,
      USER.user_no AS \`USER.user_no\`,
      USER.nickname AS \`USER.nickname\`,
      USER.user_photo AS \`USER.user_photo\`
    FROM PUSH_LOG
      LEFT OUTER JOIN USER ON USER.user_no = PUSH_LOG.producer_no
      INNER JOIN (
        SELECT producer_no, CAST(IFNULL(SUM(push), 0) AS UNSIGNED) AS sum_support
        FROM PUSH_LOG
        WHERE dreamer_no = ${me} AND PUSH_LOG.gubun = 'SUPPORT'
        GROUP BY producer_no
      ) AS SUM_TEMP ON SUM_TEMP.producer_no = PUSH_LOG.producer_no
    WHERE PUSH_LOG.dreamer_no = ${me} AND PUSH_LOG.gubun = 'SUPPORT'
    ORDER BY PUSH_LOG.created_at DESC
    `);
  }
}

// datas의 빈 날짜의 value들을 null로 채워주는 함수
function getChartDatas(startDate, now, callback) {
  // 시작일을 millisecond로 변환한 것
  const startMillisecond = moment(startDate).valueOf();

  const dayMillisecond = 1000 * 60 * 60 * 24;

  // 30일이 나올 예정
  const length =
    (moment(moment(now).format("YYYY-MM-DD")).valueOf() - startMillisecond) /
    dayMillisecond;

  // 시작일부터 오늘까지의 date를 만듬
  const result = Array.apply(null, new Array(length + 1))
    .map((v, i) => ({
      ...v,
      date: moment(startMillisecond + dayMillisecond * i).format("YYYY-MM-DD"),
      value: 0,
    }))
    .map(callback);

  return result;
}

module.exports = UserQuery;
