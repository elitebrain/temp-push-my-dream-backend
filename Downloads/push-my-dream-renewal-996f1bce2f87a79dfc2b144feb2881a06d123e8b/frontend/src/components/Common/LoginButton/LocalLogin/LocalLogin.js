import React, { useCallback } from "react";

import local_img from "public/static/favicon.ico";

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
  ...rest
}) => {
  // 로컬 로그인
  const onLocalLogin = useCallback(() => {
    onClick({ email, password, loginType });
  }, [email, password, loginType]);

  return (
    <button className="localLogin" onClick={onLocalLogin} {...rest}>
      <div className="ico">
        <img src={local_img} alt="local_ico" width="100%" height="100%" />
      </div>
      <div className="button_name">
        {/* {signup ? "칸컴스 회원가입" : "칸컴스 로그인"} */}
        칸컴스
      </div>
      <style jsx>{`
        .localLogin {
          ${flex ? "flex: 1;" : ""}
          ${width ? `width : ${width};` : ""}
          ${height ? `height : ${height};` : ""}
          border-radius: 10px;
          background-color: #fff;
          font-size: 16px;
          position: relative;
          font-family: "Spoqa Han Sans", sans-serif;
          cursor: pointer;
          border: none;
        }

        .localLogin .ico {
          width: 35px;
          height: 35px;
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
    </button>
  );
};

export default LocalLogin;
