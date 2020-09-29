import React, { useCallback } from "react";
import { useRouter } from "next/router";
import NewButton from "../NewButton";

import {
  GRADIENT_FFFFFF_C0C5DF_C0C5DF,
  BACKGROUND_BLACK_COLOR,
  GRADIENT_00F1B4_D53CF5,
  COLOR_979CCA,
  COLOR_3B3D55,
} from "shared/constants/colors";

const LoginNotice = () => {
  const Router = useRouter();

  const onRouteLogin = useCallback(() => {
    Router.push({
      pathname: "/login",
      query: {
        ref: Router.asPath,
      },
    });
  }, []);

  return (
    <div className="LoginNotice">
      <div className="LoginNotice_Content">
        <div className="Info">로그인 후 이용가능합니다.</div>
        <div className="Button">
          <NewButton
            onClick={onRouteLogin}
            width="95px"
            height="35px"
            bgImage={GRADIENT_FFFFFF_C0C5DF_C0C5DF(180)}
            color={COLOR_3B3D55}
            borderRadius="20px"
          >
            확인
          </NewButton>
        </div>
      </div>
      <style jsx>{`
        .LoginNotice {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .LoginNotice_Content {
          width: 90vw;
          max-width: 450px;
          padding: 50px 20px;
          border: solid 1px transparent;
          background: linear-gradient(
                ${BACKGROUND_BLACK_COLOR},
                ${BACKGROUND_BLACK_COLOR}
              )
              padding-box,
            ${GRADIENT_00F1B4_D53CF5(90)} border-box;
          border-radius: 10px;
          box-sizing: border-box;
        }

        .LoginNotice_Content .Info {
          font-size: 18px;
          line-height: 30px;
          text-align: center;
          color: ${COLOR_979CCA};
          word-break: keep-all;
          margin-bottom: 40px;
        }

        .LoginNotice_Content .Button {
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default LoginNotice;
