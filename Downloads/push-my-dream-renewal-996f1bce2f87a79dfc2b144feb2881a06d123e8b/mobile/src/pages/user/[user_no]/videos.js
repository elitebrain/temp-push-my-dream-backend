import React, { useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import _ from "lodash/collection";
import dynamic from "next/dynamic";

import NotExistVideoCaution from "components/Common/NotExistVideoCaution";
import Button from "components/Common/Button";
import SocialMeta from "components/Common/SocialMeta/SocialMeta";
import LoadingCircle from "components/Common/CssIcons/LoadingCircle";
import NewButton from "components/Common/NewButton";

import {
  SET_VIDEOLIST_INDEX,
  SET_VIDEOLIST_LOADED,
  SET_VIDEOLIST,
} from "store/reducers/video";
import { videoApi, userApi } from "shared/api";
import { VIDEO_INEDX_COUNT } from "shared/constants/variables";
import { BACKGROUND_BLACK_COLOR } from "shared/constants/colors";

/**
 * 처음부터 widnow 객체를 사용하기 위해선 dynamic으로 ssr을 false 처리해야한다.
 */
const DynamicNewLayout = dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});
/**
 * 처음부터 widnow 객체를 사용하기 위해선 dynamic으로 ssr을 false 처리해야한다.
 */
const DynamicNewViewVideoContainer = dynamic(
  () => import("containers/Video/NewViewVideoContainer"),
  { ssr: false }
);

const UserVideosPage = ({
  type,
  initialVideoNo,
  initialVideo,
  initialError,
}) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const videoList = useSelector((state) => state.video.videoList);
  const isLoadedVideoList = useSelector(
    (state) => state.video.isLoadedVideoList
  );

  /**
   * 맨처음 비디오 리스트 페이지에 들어왔을 때
   * 비디오 스와이프가 아닌 랭킹페이지와 유저프로필을 갔다가 다시 뒤로가기를 했을 떄
   * 다시 로딩되는 현상이 있다.
   * 그러나 스와이프를 하고 나서 랭킹 페이지와 유저프로필을 가면 다시 로딩되는 현상이 없엇다.
   * 따라서 요령으로 맨처음 비디오 리스트를 들어왔을 때 비디오 스와이프를 하는 함수를
   * 사용하여 자기 자신에게 그대로 함수를 사용하게 만들었다.
   */
  useEffect(() => {
    const query = Object.assign({}, Router.query);
    delete query.type;
    delete query.user_no;

    Router.replace(
      {
        pathname: Router.pathname,
        query,
      },
      {
        pathname: Router.asPath.split("?")[0],
        query,
      },
      { shallow: true }
    );
  }, []);

  useEffect(() => {
    Router.beforePopState(() => {
      const { page, isViewComment } = Router.query;

      // router query에 다른 조건이 없을시 videolist 초기화
      if (!page && !isViewComment) {
        dispatch({
          type: SET_VIDEOLIST_INDEX,
          data: [],
        });
      }

      return true;
    });

    return function cleanup() {
      Router.beforePopState(() => {
        return true;
      });
    };
  }, [dispatch, Router]);

  // home 이동
  const onRedirectHome = useCallback(() => {
    Router.replace("/");
  }, [Router]);

  // 비디오 리스트 empty 체크
  const isEmpty = useMemo(() => !Boolean(videoList.length), [videoList]);

  // initialError = 1: 서버에서 오류가 발생하였습니다
  // initialError = 2: 비공개 또는 삭제된 비디오입니다.
  // initialError = 3: 존재하지 않는 비디오입니다
  // initialError = 4: 잘못된 접근입니다.

  return (
    <>
      {initialVideo && (
        <SocialMeta
          title={`푸쉬 마이 드림${
            Boolean(initialVideo.title) ? ` | ${initialVideo.title}` : ""
          }`}
          description={initialVideo.description}
          image={initialVideo.thumbnail}
          keywords={`푸쉬 마이 드림, ${
            Boolean(initialVideo.title) ? `${initialVideo.title}, ` : ""
          }${
            Boolean(initialVideo.team_name) ? `${initialVideo.team_name}` : ""
          }`}
        />
      )}

      {Boolean(initialError) && (
        <div className="caution_container">
          <NotExistVideoCaution
            content={
              initialError === 1
                ? "서버에 오류가 발생하였습니다."
                : initialError === 2
                ? "비공개 또는 삭제된 비디오입니다."
                : initialError === 3
                ? isLoggedIn
                  ? "권한이 없습니다."
                  : "로그인 후 이용해주세요"
                : ""
            }
          />
          <div className="Button">
            <NewButton
              width="280px"
              height="55px"
              fontSize="24px"
              onClick={onRedirectHome}
              bgColor={BACKGROUND_BLACK_COLOR}
              gradient
            >
              HOME
            </NewButton>
          </div>
        </div>
      )}
      {!Boolean(initialError) && (
        <DynamicNewLayout>
          {!isLoadedVideoList ? (
            <div className="box">
              <LoadingCircle borderColor="#777" borderSize="4px" size="40px" />
            </div>
          ) : !isEmpty ? (
            <DynamicNewViewVideoContainer
              type={type}
              initialVideoNo={initialVideoNo}
              initialVideo={initialVideo}
              initialError={initialError}
              isUserVideosPage
            />
          ) : (
            <div className="box">비디오가 존재하지 않습니다.</div>
          )}
        </DynamicNewLayout>
      )}
      <style jsx>{`
        .box {
          width: 100vw;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .loading_container {
          width: 100vw;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .caution_container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .Button {
          margin-top: 7px;
        }
      `}</style>
    </>
  );
};

UserVideosPage.propTypes = {
  initialVideoNo: PropTypes.number.isRequired,
  type: PropTypes.string,
  initialVideo: PropTypes.object,
  initialError: PropTypes.number,
};

/**
 * 비디오 인덱스와 비디오리스트의 초기값을 정의해준다.
 * 또한 SEO를 위해 currentVideoNo의 해당하는 비디오 정보만 조회한다.
 * 나머지는 container에서 조회
 */
UserVideosPage.getInitialProps = async (context) => {
  // 여기서 category_no 는 category_level3을 의미한다.
  const { currentVideoNo, user_no: userNo, category_no } = context.query;

  // context.store.dispatch({
  //   type: SET_VIDEOLIST_INDEX,
  //   data: [],
  // });

  console.log("sdfsdf", context);

  // 비디오 리스트 초기화
  context.store.dispatch({
    type: SET_VIDEOLIST_INDEX,
    data: [],
  });

  const type = "user";

  if (context.isServer) {
    const cookie = context.req.headers.cookie;

    if (cookie) {
      // serverCondition = { headers: { cookie } };
      videoApi.defaults.headers.cookie = cookie;
      userApi.defaults.headers.cookie = cookie;
    }
  }

  let { videoIndex, isLoadedVideoList } = context.store.getState().video;

  try {
    let resultVideoList = [];
    let index = 0;
    let initialVideo;

    // 비디오 인덱스가 존재할 시
    if (Boolean(videoIndex.length)) {
      // findIndex는 ie11에 안되서 간단하게 이런식으로 구현
      // 현재 보려는 비디오가 비디오 인덱스에 몇번째에 존재하는지 조회
      index = videoIndex.indexOf(Number(currentVideoNo));

      // 비디오 첫 로딩 유무 확인
      if (!isLoadedVideoList) {
        const result = await videoApi.get("/list", {
          withCredentials: true,
          params: {
            fetchList: videoIndex.slice(0, index + 12),
            type,
          },
        });

        resultVideoList = result.data.videoList;
      }
    }
    // 비디오 인덱스가 존재하지 않을 시
    else {
      let limit = VIDEO_INEDX_COUNT;

      // type이 new 또는 category면 리밋 제한은 해제된다.
      if (type === "new" || type === "user") {
        limit = null;
      }

      // 인덱스 리스트를 조회한다.
      const {
        data: { indexList },
      } = await videoApi.get("/indexList", {
        params: {
          // limit,
          type: "userVideo",
          user: userNo,
          category_no,
          videoPage: true,
        },
      });

      context.store.dispatch({
        type: SET_VIDEOLIST_INDEX,
        data: indexList,
      });

      videoIndex = context.store.getState().video.videoIndex;
      // const result = await videoApi.get("/more", {});

      // findIndex는 ie11에 안되서 간단하게 이런식으로 구현
      // 현재 보려는 비디오가 비디오 인덱스에 몇번째에 존재하는지 조회
      index = videoIndex.indexOf(Number(currentVideoNo));

      if (index === -1 && type === "my") {
        return {
          initialVideoNo: Number(currentVideoNo),
          type,
          initialError: 3, // 존재하지 않는 비디오입니다.
        };
      }

      let result;

      // 인덱스가 존재할 시
      if (index !== -1) {
        result = await videoApi.get("/list", {
          withCredentials: true,
          params: {
            fetchList: videoIndex.slice(0, index + 12),
            type,
          },
        });

        // console.log(result.data);
        resultVideoList = result.data.videoList;
      }

      // 인덱스가 존재하지 않으면 12개의 데이터를 조회한 후 video_no를
      // 맨위에다가 보여주고 아래에 조회한 비디오 리스트를 불러온다.
      else {
        context.store.dispatch({
          type: SET_VIDEOLIST_INDEX,
          data: [].concat(Number(currentVideoNo), indexList),
        });

        videoIndex = context.store.getState().video.videoIndex;

        result = await videoApi.get("/list", {
          withCredentials: true,
          params: {
            fetchList: videoIndex.slice(0, 12),
            type,
          },
        });

        // console.log(result.data);
        resultVideoList = result.data.videoList;
      }
    }

    // 추가할 비디오 리스트가 존재하면 실행
    if (Boolean(resultVideoList.length)) {
      context.store.dispatch({
        type: SET_VIDEOLIST,
        data: resultVideoList,
      });
    }

    // SEO를 위한 startVideo의 정보 기입
    // videoList가 리덕스에 캐싱되어 있으면 새로 videoList 불러오지 않고 캐싱된 데이터를 이용한다.
    initialVideo = _.find(
      context.store.getState().video.videoList,
      (video) => (video && video.video_no) === Number(currentVideoNo)
    );

    if (!initialVideo) {
      return {
        initialVideoNo: Number(currentVideoNo),
        type,
        initialError: 2, // 존재하지 않는 비디오입니다.
      };
    }

    // 초기 비디오 로딩이 안되어있으면 실행
    if (!isLoadedVideoList) {
      context.store.dispatch({
        type: SET_VIDEOLIST_LOADED,
      });
    }

    return {
      initialVideoNo: Number(currentVideoNo),
      type,
      initialVideo,
    };
  } catch (error) {
    console.error(error);

    return {
      initialVideoNo: Number(currentVideoNo),
      type,
      initialError: 1, // 서버에서 오류가 발생하였습니다.
    };
  }
};

export default UserVideosPage;
