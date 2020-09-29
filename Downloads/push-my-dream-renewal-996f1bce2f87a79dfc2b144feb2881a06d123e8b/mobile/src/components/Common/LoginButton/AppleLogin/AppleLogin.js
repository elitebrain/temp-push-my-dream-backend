import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import NewButton from "components/Common/NewButton";
import logoApple from "public/assets/icon/logo_apple.svg";
import { API_URL } from "shared/constants/variables";
import { BACKGROUND_BLACK_COLOR, COLOR_3B3D55 } from "shared/constants/colors";

const AppleLogin = (props) => {
  const { signup } = props;
  const redirectUri = signup
    ? `${API_URL}/user/mobile/login?type=apple&signup=true`
    : `${API_URL}/user/mobile/login?type=apple`;
  return (
    <a className="apple_login" href={redirectUri}>
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
          <img src={logoApple} alt="sns_ico" width="100%" height="100%" />
        </div>
      </NewButton>
      <style jsx>{`
        .apple_login {
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
        .apple_login .ico {
          width: 35px;
          height: 35px;
          margin: 0 auto;
        }
        .apple_login .sns_name {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </a>
  );
};

AppleLogin.propTypes = {
  signup: PropTypes.bool,
};

export default AppleLogin;
