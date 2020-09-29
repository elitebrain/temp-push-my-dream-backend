import React from "react";
import PropTypes from "prop-types";
import Dynamic from "next/dynamic";

import CategoryVideoContainer from "containers/CategoryVideo/CategoryVideoContainer";

import {
  GET_CATEGORYPAGE_REQUEST,
  INIT_CATEGORYPAGE,
} from "store/reducers/categoryVideo";
import { mainApi, commonApi, categoryApi } from "shared/api";
import { VIDEO_INEDX_COUNT } from "shared/constants/variables";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const CategoryVideo = ({ category_no, banner, isPush }) => {
  return (
    <DynamicNewLayout transparent whiteText>
      <CategoryVideoContainer
        category_no={category_no}
        banner={banner}
        isPush={isPush}
      />
    </DynamicNewLayout>
  );
};

CategoryVideo.getInitialProps = async (context) => {
  // 해당 카테고리는 category_level3을 의미한다.
  const { category_no } = context.query;
  try {
    const {
      categoryVideo: { categoryNo },
    } = context.store.getState();

    // 리덕스에 저장된 카테고리 번호가 다르면 초기화
    if (Number(category_no) !== Number(categoryNo)) {
      context.store.dispatch({
        type: INIT_CATEGORYPAGE,
        payload: Number(category_no),
      });
    }
    const {
      categoryVideo: { isLoadedMain },
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
        type: GET_CATEGORYPAGE_REQUEST,
        payload: {
          category_no,
          // limit: VIDEO_INEDX_COUNT
        },
      });
    }

    const {
      data: { banner },
    } = await categoryApi.get(`/${category_no}/banner`);

    const {
      data: { isPush },
    } = await commonApi.get(`/is-push/${category_no}`);

    return { category_no: Number(category_no), banner, isPush };
  } catch (error) {
    console.error(error);

    // 에러일시 isFunding는 false로 준다
    return {
      category_no: Number(category_no),
      banner: null,
      isPush: false,
    };
  }
};

CategoryVideo.propTypes = {
  category_no: PropTypes.number.isRequired,
  banner: PropTypes.object,
  isPush: PropTypes.bool.isRequired,
};

export default CategoryVideo;
