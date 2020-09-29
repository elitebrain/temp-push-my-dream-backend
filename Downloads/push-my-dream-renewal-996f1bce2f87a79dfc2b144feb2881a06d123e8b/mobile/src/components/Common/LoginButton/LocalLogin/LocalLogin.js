import React, { useCallback, useState } from "react";

import local_img from "public/assets/image/main_logo.png";
import NewButton from "components/Common/NewButton";
import { BACKGROUND_BLACK_COLOR, COLOR_3B3D55 } from "shared/constants/colors";

const LocalLogin = ({
  children,
  onClick,
  email,
  password,
  loginType,
  width,
  height,
  flex,
  signup,
  style,
  ...rest
}) => {
  // 로컬 로그인
  const onLocalLogin = useCallback(() => {
    onClick({ email, password, loginType });
  }, [email, password, loginType]);

  if (signup) {
    return (
      <NewButton
        width="85px"
        height="50px"
        borderColor={COLOR_3B3D55}
        bgColor={BACKGROUND_BLACK_COLOR}
        onClick={onLocalLogin}
        activeAnimation
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={local_img} alt="local_ico" width="35px" height="35px" />
      </NewButton>
    );
  }

  return (
    <NewButton
      width={width}
      height={height}
      gradient
      bgColor={BACKGROUND_BLACK_COLOR}
      onClick={onLocalLogin}
      activeAnimation
    >
      로그인
    </NewButton>
  );
  // return (
  //   <button
  //     className="localLogin"
  //     onClick={onLocalLogin}
  //     style={style}
  //     onTouchStartLogin={onTouchStartLogin}
  //     {...rest}
  //   >
  //     {loginIcon ? (
  //       <div className="ico">
  //         <img src={local_img} alt="local_ico" width="100%" height="100%" />
  //       </div>
  //     ) : (
  //       <div className="button_name">
  //         {/* {signup ? "칸컴스 회원가입" : "칸컴스 로그인"} */}
  //         로그인
  //       </div>
  //     )}
  //     <style jsx>{`
  //       .localLogin {
  //         ${flex ? "flex: 1;" : ""}
  //         ${height ? `height : ${height};` : ""}
  //         width:100%;
  //         background-color: #141418;
  //         font-size: 16px;
  //         position: relative;
  //         font-family: "Spoqa Han Sans", sans-serif;
  //         cursor: pointer;
  //         border: none;
  //         display: block;
  //         color: #fff;
  //       }
  //       .localLogin:active {
  //         background: ${activeBtnBG};
  //         color: ${activefontColor};
  //       }
  //       /* .localLogin:hover {
  //         background: linear-gradient(90deg, #ffffff 0%, #c0c5df 100%);
  //         color: #3b3d55;
  //       } */

  //       .localLogin .ico {
  //         width: 35px;
  //         height: 35px;
  //         position: absolute;
  //         left: 20px;
  //         top: 50%;
  //         transform: translateY(-50%);
  //       }
  //     `}</style>
  //   </button>
};

export default LocalLogin;

// import React, { useCallback } from "react";

// import local_img from "public/static/favicon.ico";

// const LocalLogin = ({
//   children,
//   onClick,
//   email,
//   password,
//   loginType,
//   width,
//   height,
//   flex,
//   signup,
//   ...rest
// }) => {
//   console.log("LocalLogin email ", email, "password", password);
//   // 로컬 로그인
//   const onLocalLogin = useCallback(() => {
//     onClick({ email, password, loginType });
//   }, [email, password, loginType]);

//   return (
//     <button className="localLogin" onClick={onLocalLogin} {...rest}>
//       <div className="ico">
//         <img src={local_img} alt="local_ico" width="100%" height="100%" />
//       </div>
//       <div className="button_name">
//         {/* {signup ? "칸컴스 회원가입" : "칸컴스 로그인"} */}
//         칸컴스
//       </div>
//       <style jsx>{`
//         .localLogin {
//           ${flex ? "flex: 1;" : ""}
//           ${height ? `height : ${height};` : ""}
//           width:100%;
//           border-radius: 10px;
//           background-color: #fff;
//           font-size: 16px;
//           position: relative;
//           font-family: "Spoqa Han Sans", sans-serif;
//           cursor: pointer;
//           border: none;
//           display: block;
//         }

//         .localLogin .ico {
//           width: 35px;
//           height: 35px;
//           position: absolute;
//           left: 20px;
//           top: 50%;
//           transform: translateY(-50%);
//         }
//       `}</style>
//     </button>
//   );
// };

// export default LocalLogin;
