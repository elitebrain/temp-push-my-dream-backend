import React from "react";
import { GoogleLogin } from "react-google-login";
import PropTypes from "prop-types";

import { GOOGLE_KEY } from "shared/constants/keys";

import google_img from "public/assets/image/google_icon.png";

const ReactGoogleLogin = ({
  children,
  onClick,
  loginType,
  width,
  signup,
  ...rest
}) => {
  return (
    <GoogleLogin
      clientId={GOOGLE_KEY}
      render={(props) => (
        <button className="googleLogin" onClick={props.onClick} {...rest}>
          <div className="ico">
            <img src={google_img} alt="sns_ico" width="100%" height="100%" />
          </div>
          <div className="sns_name">
            {/* {signup ? "Google 간편 회원가입" : "Google 로그인"} */}
            Google
          </div>
          <style jsx>{`
            .googleLogin {
              width: ${width ? width : "370px"};
              height: 60px;
              background-color: #fff;
              border-radius: 10px;
              border: none;
              font-size: 16px;
              position: relative;
              font-family: "Spoqa Han Sans", sans-serif;
              cursor: pointer;
            }
            .googleLogin .ico {
              width: 35px;
              height: 35px;
              position: absolute;
              left: 20px;
              top: 50%;
              transform: translateY(-50%);
            }
            .googleLogin .sns_name {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          `}</style>
        </button>
      )}
      buttonText="Login"
      onSuccess={(result) => {
        console.log(result);
        onClick({ id: result.googleId, loginType });
      }}
      onFailure={() => onClick({ error: "google login error" })}
      cookiePolicy={"single_host_origin"}
    />
  );
};
ReactGoogleLogin.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onClick: PropTypes.func,
  loginType: PropTypes.string,
};

export default ReactGoogleLogin;
