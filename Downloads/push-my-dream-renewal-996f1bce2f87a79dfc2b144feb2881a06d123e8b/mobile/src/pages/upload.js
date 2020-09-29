import React, { useCallback } from "react";
import Helmet from "react-helmet";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Dynamic from "next/dynamic";

import UploadContainer from "containers/UploadContainer";

import TitleHeader from "components/Common/TitleHeader";
import NoticeByNoParticipate from "components/Upload/UploadIndex/NoticeByNoParticipate";
import NoticeByNoRestrictUpload from "components/Upload/UploadIndex/NoticeByNoRestrictUpload";
import NewButton from "components/Common/NewButton";

import { userApi } from "shared/api";
import { getError } from "shared/functions";

import {
  GRADIENT_FFFFFF_C0C5DF_C0C5DF,
  BACKGROUND_BLACK_COLOR,
  GRADIENT_00F1B4_D53CF5,
  COLOR_979CCA,
  COLOR_3B3D55,
} from "shared/constants/colors";
import LoginNotice from "components/Common/LoginNotice";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const Upload = ({ myParticipateSeason, errorMessage }) => {
  const Router = useRouter();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const onRouteBack = useCallback(() => {
    Router.back();
  }, [Router]);

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 업로드</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        {!isLoggedIn ? (
          <LoginNotice />
        ) : !errorMessage ? (
          <>
            <TitleHeader>영상 업로드</TitleHeader>
            {/* 시즌 참가자가 아니어서 업로드 불가일 시 */}
            {Boolean(!myParticipateSeason.length) && <NoticeByNoParticipate />}
            {/* todo */}
            {/* 관리자로 인하여 업로드를 제한받았을 시 */}
            {/* {myParticipateSeason &&
              myParticipateSeason.is_participate &&
              !myParticipateSeason.is_upload && <NoticeByNoRestrictUpload />} */}
            {/* 업로드 가능 */}
            {Boolean(myParticipateSeason.length) && (
              <UploadContainer myParticipateSeason={myParticipateSeason} />
            )}
          </>
        ) : (
          <div className="UploadNotice">
            <div className="UploadNotice_Content">
              <div className="Info">{errorMessage}</div>
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
              .UploadNotice {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .UploadNotice_Content {
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

              .UploadNotice_Content .Info {
                font-size: 18px;
                line-height: 30px;
                text-align: center;
                color: ${COLOR_979CCA};
                word-break: keep-all;
                margin-bottom: 40px;
              }

              .UploadNotice_Content .Button {
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

Upload.propTypes = {
  myParticipateSeason: PropTypes.array,
  errorMessage: PropTypes.string,
};

Upload.getInitialProps = async (context) => {
  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }
    const {
      data: { myParticipateSeason },
    } = await userApi.get("/me/participate", {
      withCredentials: true,
      ...serverCondition,
    });

    return {
      myParticipateSeason,
    };
  } catch (error) {
    console.log(error, getError(error));
    return {
      errorMessage: getError(error),
    };
  }
};

export default Upload;
