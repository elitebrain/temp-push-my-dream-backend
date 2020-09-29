import React from "react";
import ReactKakaoLogin from "./ReactKakaoLogin";
// import ReactKakaoLogin from "react-kakao-login";
import PropTypes from "prop-types";
import kakao_img from "public/assets/image/kakao_icon.png";

import { KAKAO_KEY } from "shared/constants/keys";

// 참고 : http://tlog.tammolo.com/blog/kakao-login-54067ff7-5891-4c4f-851e-30beca611c7d/
// 참고 : https://www.npmjs.com/package/react-kakao-login
const KakaoLogin = ({
  children,
  onClick,
  loginType,
  width,
  signup,
  ...rest
}) => {
  return (
    <ReactKakaoLogin
      jsKey={KAKAO_KEY}
      onSuccess={(result) => {
        onClick({
          id: result.profile.id,
          email: result.profile.kakao_account.email,
          loginType,
        });
      }}
      onFailure={() => onClick({ error: "kakao login error" })}
      getProfile
      render={(props) => (
        <button className="kakaoLogin" onClick={props.onClick} {...rest}>
          <div className="ico">
            <img src={kakao_img} alt="sns_ico" width="100%" height="100%" />
          </div>
          <div className="sns_name">
            {/* {signup ? "카카오 간편 회원가입" : "카카오 로그인"} */}
            카카오
          </div>
          <style jsx>{`
            .kakaoLogin {
              width: ${width ? width : "370px"};
              height: 60px;
              background-color: #f9e000;
              border-radius: 10px;
              border: none;
              font-size: 16px;
              position: relative;
              font-family: "Spoqa Han Sans", sans-serif;
              cursor: pointer;
            }
            .kakaoLogin .ico {
              width: 35px;
              height: 35px;
              position: absolute;
              left: 20px;
              top: 50%;
              transform: translateY(-50%);
            }
            .kakaoLogin .sns_name {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          `}</style>
        </button>
      )}
    />
  );
};

KakaoLogin.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onClick: PropTypes.func,
  loginType: PropTypes.string,
};

export default KakaoLogin;
