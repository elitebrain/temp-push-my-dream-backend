import React, { useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";

import { NAVER_KEY, NAVER_CALLBACK } from "shared/constants/keys";

import naver_img from "public/assets/image/naver_icon.png";

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
  const naverRef = useRef();

  useEffect(() => {
    // sdk 비동기적으로 가져오기
    if (
      document &&
      document.querySelectorAll("#naver-login-sdk").length === 0
    ) {
      const script = document.createElement("script");
      script.id = "naver-login-sdk";
      script.src =
        "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js";

      script.addEventListener("load", naverLoginHandler);

      document.head.appendChild(script);
    }
    // sdk가 이미 존재하면 naverLogin 초기화
    else {
      naverLoginHandler();
    }
  }, []);

  const naverLoginHandler = useCallback(() => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: NAVER_KEY,
      callbackUrl: NAVER_CALLBACK,
      isPopup: true,
      callbackHandle: true,
      loginButton: {
        color: "green",
        type: 3,
        height: 60,
      } /* 로그인 버튼의 타입을 지정 */,
    });

    /* (3) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
    naverLogin.init();

    // 팝업이 생성되지 않았으면 컬백함수들 저으이
    if (!window.opener) {
      window.naver.successCallback = function (data) {
        return onClick({ id: data.id, email: data.email, loginType });
      };
      window.naver.FailureCallback = onFailure;
    }

    if (window.opener) {
      naverLogin.getLoginStatus(function (status) {
        if (status) {
          /* 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
          const email = naverLogin.user.getEmail();
          if (email == undefined || email == null) {
            alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
            /* 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
            naverLogin.reprompt();
            return;
          }

          window.opener.naver.successCallback(naverLogin.user);
          window.close();
        } else {
          alert("네이버 로그인을 다시 시도해주세요.ㄷ");
        }
      });
    }
  }, []);

  // 네이버 로그인하기
  const handleLoginButton = useCallback(() => {
    naverRef.current.firstChild.click();
  }, []);

  // 네이버 로그인 에러
  const onFailure = useCallback(() => {
    onClick({ error: "naver login error" });
  });

  return (
    <div className="naverLogin" onClick={handleLoginButton}>
      <div className="ico">
        <img src={naver_img} alt="sns_ico" width="100%" height="100%" />
      </div>
      <div className="sns_name">
        {/* {signup ? "네이버 간편 회원가입" : "네이버 로그인"} */}
        네이버
      </div>
      <div ref={naverRef} id="naverIdLogin"></div>
      <style jsx>{`
        .naverLogin {
          width: ${width ? width : "370px"};
          height: 60px;
          background-color: #00c73c;
          border-radius: 10px;
          border: none;
          font-size: 16px;
          position: relative;
          color: #fff;
          font-family: "Spoqa Han Sans", sans-serif;
          cursor: pointer;
        }
        .naverLogin .ico {
          width: 35px;
          height: 35px;
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
        .naverLogin .sns_name {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        #naverIdLogin {
          display: none;
        }
      `}</style>
    </div>
  );
};

NaverLogin.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onClick: PropTypes.func,
  loginType: PropTypes.string,
  width: PropTypes.string,
};

export default NaverLogin;
