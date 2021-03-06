import React from "react";
import GoogleLogin from "./GoogleLogin";
import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";
import LocalLogin from "./LocalLogin";

// 참고 : https://www.notion.so/Login-API-75e004ab4aa64a4ba388af2207a87b7d
const LoginButton = props => {
  const { onClick, ...rest } = props;

  if (rest.loginType === "google") {
    return <GoogleLogin onClick={onClick} {...rest} />;
  } else if (rest.loginType === "kakao") {
    return <KakaoLogin onClick={onClick} {...rest} />;
  } else if (rest.loginType === "naver") {
    return <NaverLogin onClick={onClick} {...rest} />;
  } else {
    return <LocalLogin onClick={onClick} {...rest} />;
  }
};

export default LoginButton;
