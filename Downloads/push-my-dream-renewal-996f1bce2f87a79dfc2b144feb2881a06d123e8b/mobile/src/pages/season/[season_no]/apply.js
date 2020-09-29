import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import Dynamic from "next/dynamic";

import SeasonApplyContainer from "containers/Season/SeasonApplyContainer";

import { categoryApi } from "shared/api";
import { OPEN_MODAL } from "store/reducers/modal";
import { getError } from "shared/functions";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const SeasonApplyPage = ({ errorCode, errorMessage, season }) => {
  const dispatch = useDispatch();
  const Router = useRouter();

  /*
   * 에러 체크
   */
  useEffect(() => {
    if (errorMessage) {
      if (errorCode === 421) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: (
              <p>
                이미 참가 중입니다.
                <br /> 영상을 업로드 하시겠습니까?
              </p>
            ),
            isViewClose: true,
            onConfirm() {
              Router.push("/upload");
            },
            onClose() {
              Router.back();
            },
          },
        });
      } else {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: errorMessage,
            isViewClose: false,
            onConfirm() {
              Router.back();
            },
            onClose() {
              Router.back();
            },
          },
        });
      }
    }
  }, [errorMessage, Router]);

  if (errorMessage) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 참가 하기</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        <SeasonApplyContainer season={season} />
      </DynamicNewLayout>
    </>
  );
};

SeasonApplyPage.propTypes = {
  errorMessage: PropTypes.string,
  season: PropTypes.object,
};

SeasonApplyPage.getInitialProps = async (context) => {
  const { season_no } = context.query;

  console.log(season_no);

  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }

    const {
      data: { season },
    } = await categoryApi.get(`/seasons/${season_no}/apply`, {
      withCredentials: true,
      ...serverCondition,
    });

    return { season };
  } catch (error) {
    return {
      errorCode: error && error.response && error.response.status,
      errorMessage: getError(error),
    };
  }
};

export default SeasonApplyPage;
