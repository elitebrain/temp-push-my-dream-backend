import React from "react";
import PropTypes from "prop-types";

// import naver_img from "public/assets/image/naver_icon.png";
import naver_img from "public/assets/image/naver_icon(green).png";
import { API_URL } from "shared/constants/variables";
import NewButton from "components/Common/NewButton";
import { COLOR_3B3D55, BACKGROUND_BLACK_COLOR } from "shared/constants/colors";

// 참고 : https://www.npmjs.com/package/react-naver-login
// 개발 테스트 시 localhost가 아닌 127.0.0.1:3000 으로 실행
const NaverLogin = ({
  children,
  onClick,
  loginType,
  width,
  signup,
  ...rest
}) => {
  const url = signup
    ? `${API_URL}/user/mobile/login?type=naver&signup=true`
    : `${API_URL}/user/mobile/login?type=naver`;

  return (
    <a className="naverLogin" href={url}>
      <NewButton
        width="85px"
        height="50px"
        borderColor={COLOR_3B3D55}
        bgColor={BACKGROUND_BLACK_COLOR}
        activeAnimation
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="ico">
          <img src={naver_img} alt="sns_ico" width="100%" height="100%" />
        </div>
      </NewButton>

      {/* <div className="sns_name"> */}
      {/* {signup ? "네이버 간편 회원가입" : "네이버 로그인"} */}
      {/* 네이버
      </div> */}
      <style jsx>{`
        .naverLogin {
          border-radius: 10px;
          border: none;
          font-size: 16px;
          position: relative;
          color: #fff;
          font-family: "Spoqa Han Sans", sans-serif;
          cursor: pointer;
          display: inline-block;
          margin: 0 auto;

          text-decoration: none;
          color: #000;
        }
        .naverLogin .ico {
          width: 35px;
          height: 35px;
          margin: 0 auto;
        }
        .naverLogin .sns_name {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </a>
  );
};

NaverLogin.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onClick: PropTypes.func,
  loginType: PropTypes.string,
  width: PropTypes.string,
};

export default NaverLogin;

// import React from "react";
// import PropTypes from "prop-types";

// import naver_img from "public/assets/image/naver_icon.png";
// import { API_URL } from "shared/constants/variables";

// // 참고 : https://www.npmjs.com/package/react-naver-login
// // 개발 테스트 시 localhost가 아닌 127.0.0.1:3000 으로 실행
// const NaverLogin = ({
//   children,
//   onClick,
//   loginType,
//   width,
//   signup,
//   ...rest
// }) => {
//   const url = signup
//     ? `${API_URL}/user/mobile/login?type=naver&signup=true`
//     : `${API_URL}/user/mobile/login?type=naver`;

//   return (
//     <a className="naverLogin" href={url}>
//       <div className="ico">
//         <img src={naver_img} alt="sns_ico" width="100%" height="100%" />
//       </div>
//       <div className="sns_name">
//         {/* {signup ? "네이버 간편 회원가입" : "네이버 로그인"} */}
//         네이버
//       </div>
//       <style jsx>{`
//         .naverLogin {
//           width: 100%;
//           height: 60px;
//           background-color: #00c73c;
//           border-radius: 10px;
//           border: none;
//           font-size: 16px;
//           position: relative;
//           color: #fff;
//           font-family: "Spoqa Han Sans", sans-serif;
//           cursor: pointer;
//           display: block;
//         }
//         .naverLogin .ico {
//           width: 35px;
//           height: 35px;
//           position: absolute;
//           left: 20px;
//           top: 50%;
//           transform: translateY(-50%);
//         }
//         .naverLogin .sns_name {
//           position: absolute;
//           left: 50%;
//           top: 50%;
//           transform: translate(-50%, -50%);
//         }
//       `}</style>
//     </a>
//   );
// };

// NaverLogin.propTypes = {
//   children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
//   onClick: PropTypes.func,
//   loginType: PropTypes.string,
//   width: PropTypes.string,
// };

// export default NaverLogin;
