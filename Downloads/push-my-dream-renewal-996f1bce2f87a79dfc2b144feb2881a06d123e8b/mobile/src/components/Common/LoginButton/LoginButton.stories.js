import React from "react";
import LoginButton from "./LoginButton";

export default {
  title: "LoginButton",
  component: LoginButton
};

export const noType = () => <LoginButton>타입이 없는 버튼</LoginButton>;
export const kakao = () => <LoginButton loginType="kakao">Kakao</LoginButton>;
export const google = () => (
  <LoginButton loginType="google">Google</LoginButton>
);
export const naver = () => <LoginButton loginType="naver">Naver</LoginButton>;
