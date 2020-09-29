import React from "react";
import PropTypes from "prop-types";

import NewButton from "components/Common/NewButton";
// import kakao_img from "assets/image/kakao_icon.png";
import kakao_img from "public/assets/image/kakao_icon_Balloon.png";

import { API_URL } from "shared/constants/variables";
import { BACKGROUND_BLACK_COLOR, COLOR_3B3D55 } from "shared/constants/colors";

// 참고 : http://tlog.tammolo.com/blog/kakao-login-54067ff7-5891-4c4f-851e-30beca611c7d/
// 참고 : https://www.npmjs.com/package/react-kakao-login
const KakaoLogin = ({
  children,
  loginType,
  width,
  height,
  signup,
  ...rest
}) => {
  const url = signup
    ? `${API_URL}/user/mobile/login?type=kakao&signup=true`
    : `${API_URL}/user/mobile/login?type=kakao`;

  return (
    <a className="kakaoLogin" href={url}>
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
          <img src={kakao_img} alt="sns_ico" width="100%" height="100%" />
        </div>
      </NewButton>
      {/* <div className="sns_name"> */}
      {/* {signup ? "카카오 간편 회원가입" : "카카오 로그인"} */}
      {/* 카카오
      </div> */}
      <style jsx>{`
        .kakaoLogin {
          background-color: transparent;
          border-radius: 10px;
          border: none;
          font-size: 16px;
          position: relative;
          font-family: "Spoqa Han Sans", sans-serif;
          cursor: pointer;
          display: inline-block;
          margin: 0 auto;

          text-decoration: none;
          color: #000;
        }
        .kakaoLogin .ico {
          width: 35px;
          height: 35px;
          margin: 0 auto;
        }
        .kakaoLogin .sns_name {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </a>
  );
};

KakaoLogin.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onClick: PropTypes.func,
  loginType: PropTypes.string,
};

export default KakaoLogin;

// import React from "react";
// import PropTypes from "prop-types";
// import kakao_img from "assets/image/kakao_icon.png";

// import { API_URL } from "shared/constants/variables";

// // 참고 : http://tlog.tammolo.com/blog/kakao-login-54067ff7-5891-4c4f-851e-30beca611c7d/
// // 참고 : https://www.npmjs.com/package/react-kakao-login
// const KakaoLogin = ({ children, loginType, width, signup, ...rest }) => {
//   const url = signup
//     ? `${API_URL}/user/mobile/login?type=kakao&signup=true`
//     : `${API_URL}/user/mobile/login?type=kakao`;

//   return (
//     <a className="kakaoLogin" href={url}>
//       <div className="ico">
//         <img src={kakao_img} alt="sns_ico" width="100%" height="100%" />
//       </div>
//       <div className="sns_name">
//         {/* {signup ? "카카오 간편 회원가입" : "카카오 로그인"} */}
//         카카오
//       </div>
//       <style jsx>{`
//         .kakaoLogin {
//           width: 100%;
//           height: 60px;
//           background-color: #f9e000;
//           border-radius: 10px;
//           border: none;
//           font-size: 16px;
//           position: relative;
//           font-family: "Spoqa Han Sans", sans-serif;
//           cursor: pointer;
//           display: block;

//           text-decoration: none;
//           color: #000;
//         }
//         .kakaoLogin .ico {
//           width: 35px;
//           height: 35px;
//           position: absolute;
//           left: 20px;
//           top: 50%;
//           transform: translateY(-50%);
//         }
//         .kakaoLogin .sns_name {
//           position: absolute;
//           left: 50%;
//           top: 50%;
//           transform: translate(-50%, -50%);
//         }
//       `}</style>
//     </a>
//   );
// };

// KakaoLogin.propTypes = {
//   children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
//   onClick: PropTypes.func,
//   loginType: PropTypes.string,
// };

// export default KakaoLogin;

// import React from "react";
// import PropTypes from "prop-types";
// import kakao_img from "assets/image/kakao_icon.png";

// import { API_URL } from "shared/constants/variables";

// // 참고 : http://tlog.tammolo.com/blog/kakao-login-54067ff7-5891-4c4f-851e-30beca611c7d/
// // 참고 : https://www.npmjs.com/package/react-kakao-login
// const KakaoLogin = ({ children, loginType, width, signup, ...rest }) => {
//   const url = signup
//     ? `${API_URL}/user/mobile/login?type=kakao&signup=true`
//     : `${API_URL}/user/mobile/login?type=kakao`;

//   return (
//     <a className="kakaoLogin" href={url}>
//       <div className="ico">
//         <img src={kakao_img} alt="sns_ico" width="100%" height="100%" />
//       </div>
//       {/* <div className="sns_name"> */}
//       {/* {signup ? "카카오 간편 회원가입" : "카카오 로그인"} */}
//       {/* 카카오
//       </div> */}
//       <style jsx>{`
//         .kakaoLogin {
//           width: 100%;
//           height: 60px;
//           background-color: transparent;
//           border-radius: 10px;
//           border: none;
//           font-size: 16px;
//           position: relative;
//           font-family: "Spoqa Han Sans", sans-serif;
//           cursor: pointer;
//           display: block;

//           text-decoration: none;
//           color: #000;
//         }
//         .kakaoLogin .ico {
//           width: 35px;
//           height: 35px;
//           position: absolute;
//           left: 20px;
//           top: 50%;
//           transform: translateY(-50%);
//         }
//         .kakaoLogin .sns_name {
//           position: absolute;
//           left: 50%;
//           top: 50%;
//           transform: translate(-50%, -50%);
//         }
//       `}</style>
//     </a>
//   );
// };

// KakaoLogin.propTypes = {
//   children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
//   onClick: PropTypes.func,
//   loginType: PropTypes.string,
// };

// export default KakaoLogin;

// // import React from "react";
// // import PropTypes from "prop-types";
// // import kakao_img from "assets/image/kakao_icon.png";

// // import { API_URL } from "shared/constants/variables";

// // // 참고 : http://tlog.tammolo.com/blog/kakao-login-54067ff7-5891-4c4f-851e-30beca611c7d/
// // // 참고 : https://www.npmjs.com/package/react-kakao-login
// // const KakaoLogin = ({ children, loginType, width, signup, ...rest }) => {
// //   const url = signup
// //     ? `${API_URL}/user/mobile/login?type=kakao&signup=true`
// //     : `${API_URL}/user/mobile/login?type=kakao`;

// //   return (
// //     <a className="kakaoLogin" href={url}>
// //       <div className="ico">
// //         <img src={kakao_img} alt="sns_ico" width="100%" height="100%" />
// //       </div>
// //       <div className="sns_name">
// //         {/* {signup ? "카카오 간편 회원가입" : "카카오 로그인"} */}
// //         카카오
// //       </div>
// //       <style jsx>{`
// //         .kakaoLogin {
// //           width: 100%;
// //           height: 60px;
// //           background-color: #f9e000;
// //           border-radius: 10px;
// //           border: none;
// //           font-size: 16px;
// //           position: relative;
// //           font-family: "Spoqa Han Sans", sans-serif;
// //           cursor: pointer;
// //           display: block;

// //           text-decoration: none;
// //           color: #000;
// //         }
// //         .kakaoLogin .ico {
// //           width: 35px;
// //           height: 35px;
// //           position: absolute;
// //           left: 20px;
// //           top: 50%;
// //           transform: translateY(-50%);
// //         }
// //         .kakaoLogin .sns_name {
// //           position: absolute;
// //           left: 50%;
// //           top: 50%;
// //           transform: translate(-50%, -50%);
// //         }
// //       `}</style>
// //     </a>
// //   );
// // };

// // KakaoLogin.propTypes = {
// //   children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
// //   onClick: PropTypes.func,
// //   loginType: PropTypes.string,
// // };

// // export default KakaoLogin;
