import React, { useEffect } from "react";
import _ from "lodash/object";
import Helmet from "react-helmet";
import { useRouter } from "next/router";

import ViewVideoContainer from "containers/Video/ViewVideoContainer";

import { videoApi } from "shared/api";

const VideoInfo = ({ videoNo, videoList, isOfficial, listGubun }) => {
  const router = useRouter();

  useEffect(() => {
    // 비디오 리스트가 존재하지 않을 시
    if (!videoList || !videoList.length) {
      router.replace("/error");
      return;
    }
  }, [router, videoList]);

  console.log(videoList);

  const video = videoList && videoList.length > 0 && videoList[0];

  if (!video) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 비디오 정보</title>
        <meta
          name="description"
          content={`푸쉬 마이 드림 | ${video.description}`}
        />
        <meta name="robots" content="index,follow" />
        <meta
          name="author"
          content={
            isOfficial
              ? "khanteum OFFICIAL"
              : video.category_level2_no === 6
              ? video.team_name
              : video.USER.nickname
          }
        />
        <meta name="keywords" content={`khanteum, video, 비디오, 칸컴스`} />
        <meta
          property="og:description"
          content={`푸쉬 마이 드림 | ${video.description}`}
        />
        <meta property="og:image" content={video.thumbnail} />
        <meta property="og:url" content="" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <ViewVideoContainer
        videoNo={videoNo}
        _videoList={videoList}
        isOfficial={isOfficial}
        listGubun={listGubun}
      />
    </>
  );
};

VideoInfo.getInitialProps = async (context) => {
  const { video_no, listGubun } = context.query;

  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;
      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }

    const result = await videoApi.get("/", {
      params: { videoNo: video_no, listGubun },
      withCredentials: true,
      ...serverCondition,
    });

    return {
      videoNo: Number(video_no),
      videoList:
        (_.has(result, "data.videoList") && result.data.videoList) || [],
      isOfficial:
        (_.has(result, "data.isOfficial") && result.data.isOfficial) || false,
      listGubun,
    };
  } catch (error) {
    return { videoNo: Number(video_no) };
  }
};

export default VideoInfo;
