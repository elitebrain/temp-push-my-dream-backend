import React, { useCallback } from "react";
import Helmet from "react-helmet";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Dynamic from "next/dynamic";

import PushContainer from "containers/Push/PushContainer";
import LoginNotice from "components/Common/LoginNotice";

import { userApi } from "shared/api";

import {
  GRADIENT_FFFFFF_C0C5DF_C0C5DF,
  BACKGROUND_BLACK_COLOR,
  GRADIENT_00F1B4_D53CF5,
  COLOR_979CCA,
  COLOR_3B3D55,
} from "shared/constants/colors";
import NewButton from "components/Common/NewButton";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const Push = ({ isPush, season, targetUser, myPushLimitInToday, myPush }) => {
  const Router = useRouter();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const onRouteBack = useCallback(() => {
    Router.back();
  }, [Router]);

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | PUSH</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        {!isLoggedIn ? (
          <LoginNotice />
        ) : isPush ? (
          <PushContainer
            season={season}
            targetUser={targetUser}
            myPushLimitInToday={myPushLimitInToday}
            myPush={myPush}
          />
        ) : (
          <div className="PushNotice">
            <div className="PushNotice_Content">
              <div className="Info">푸시가 불가능한 유저입니다.</div>
              <div className="Button">
                <NewButton
                  onClick={onRouteBack}
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
              .PushNotice {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .PushNotice_Content {
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

              .PushNotice_Content .Info {
                font-size: 18px;
                line-height: 30px;
                text-align: center;
                color: ${COLOR_979CCA};
                word-break: keep-all;
                margin-bottom: 40px;
              }

              .PushNotice_Content .Button {
                margin: 0 auto;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            `}</style>
          </div>
        )}
      </DynamicNewLayout>
    </>
  );
};

Push.propTypes = {
  isPush: PropTypes.bool.isRequired,
  season: PropTypes.object,
};

Push.getInitialProps = async (context) => {
  const { targetUserNo, category4No } = context.query;

  console.log(category4No);

  // ssr에서 쿠키 설정
  if (context.isServer) {
    const cookie = context.req.headers.cookie;

    if (cookie) {
      // serverCondition = { headers: { cookie } };
      userApi.defaults.headers.cookie = cookie;
    }
  }

  try {
    if (!targetUserNo) {
      throw new Error("푸쉬 대상자의 정보에 문제가 발생하였습니다.");
    }

    const { data: result } = await userApi.get(
      `/${targetUserNo}/is-push/${category4No}`
    );

    console.log(result);

    const isPush = result.isPush;

    delete result.isPush;
    const season = result;

    const {
      data: { targetUser },
    } = await userApi.get(
      `/${targetUserNo}/push/${season.category_level4_no}`,
      {
        withCredentials: true,
      }
    );

    // 나에 대한 푸시 정보 조회
    const {
      data: { myPushLimitInToday, myPush },
    } = await userApi.get(`/me/push/${season.category_level4_no}`, {
      withCredentials: true,
    });

    return { isPush, season, targetUser, myPushLimitInToday, myPush };
  } catch (error) {
    console.error(error);
    return { isPush: false, season: null, error };
  }
};

export default Push;
