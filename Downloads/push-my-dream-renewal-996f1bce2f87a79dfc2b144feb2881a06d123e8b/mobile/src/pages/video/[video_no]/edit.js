import React, { useEffect } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import Dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import VideoEditContainer from "containers/Video/VideoEditContainer";

import TitleHeader from "components/Common/TitleHeader";
import LoginNotice from "components/Common/LoginNotice";

import { videoApi } from "shared/api";
import { getError } from "shared/functions";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const VideoEdit = ({ video }) => {
  const Router = useRouter();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  /**
   * 비디오 미존재시 mypage로 이동
   */
  useEffect(() => {
    if (isLoggedIn) {
      if (!video) {
        Router.replace("/mypage");
      }
    }
  }, [video, isLoggedIn, Router]);

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 영상 정보 수정</title>
      </Helmet>
      <DynamicNewLayout>
        {!isLoggedIn ? (
          <LoginNotice />
        ) : (
          video && (
            <>
              <TitleHeader>영상 정보 수정</TitleHeader>
              <VideoEditContainer video={video} />
            </>
          )
        )}
      </DynamicNewLayout>
    </>
  );
};

VideoEdit.propTypes = {
  video: PropTypes.object,
};

/**
 * 비디오 수정을 위해 필요한 정보 ssr
 */
VideoEdit.getInitialProps = async (context) => {
  const { video_no } = context.query;

  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;
      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }
    const {
      data: { video },
    } = await videoApi.get(`/${video_no}/edit`, {
      withCredentials: true,
      ...serverCondition,
    });

    return { video };
  } catch (error) {
    console.error(error);
    return { errorMessage: getError(error) };
  }
};

export default VideoEdit;
