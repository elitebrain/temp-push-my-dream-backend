import React from "react";
import Dynamic from "next/dynamic";

import MainContainer from "containers/MainContainer";

import { GET_MAINPAGE_REQUEST } from "store/reducers/video";
import { mainApi } from "shared/api";

// import splashImg from "public/assets/image/splash.png";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const Index = () => {
  return (
    <DynamicNewLayout transparent whiteText>
      <MainContainer />
    </DynamicNewLayout>
  );
};

Index.getInitialProps = async (context) => {
  try {
    const {
      video: { isLoadedMain },
    } = context.store.getState();

    if (context.isServer) {
      // 쿠키는 브라우저에만 있기 떄문에 브라우저에서 서버사이드 렌더링을 할 시 쿠키를 가져와서 사용해야한다.
      const cookie = context.req.headers.cookie;

      if (cookie) {
        mainApi.defaults.headers.cookie = cookie;
      }
    }

    // 메인 페이지가 로딩되지 않았을 시
    if (!isLoadedMain) {
      context.store.dispatch({
        type: GET_MAINPAGE_REQUEST,
        // payload: {
        //   limit: VIDEO_INEDX_COUNT,
        // },
      });
    }
  } catch (error) {
    console.error(error);
  }
};
export default Index;
