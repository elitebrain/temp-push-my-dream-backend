const initState = {
  categoryNo: null,

  isLoadedMain: false, // 카테고리 페이지 로딩 여부
  isLoadingLike: false, // 좋아요 기능 여부

  // bestUsersInToday: [],
  // rookiesInSevenDays: [],
  // newbiesInSevenDays: [],
  // bestProducersInSeason: [],

  officialVideoIndex: [], // 공식 영상 비디오 리스트 캐싱
  officialVideoList: [], // 공식 영상 비디오 리스트

  // isLoadedMoreRealtimeSurgeLikeVideo: false, // 실시간 급상승 LIKE 비디오 불러오기
  // realtimeSurgeLikeVideoIndex: [], // 실시간 급상승 LIKE 비디오 리스트 캐싱
  // realtimeSurgeLikeVideoList: [], // 실시간 급상승 LIKE 비디오 리스트

  // isLoadedMoreRealtimeSurgeTalkVideo: false, // 실시간 급상승 TALK 비디오 불러오기
  // realtimeSurgeTalkVideoIndex: [], // 실시간 급상승 TALK 비디오 리스트 캐싱
  // realtimeSurgeTalkVideoList: [], // 실시간 급상승 TALK 비디오 리스트

  // isLoadedMoreHotLikeVideo: false, // 핫라이크 비디오 불러오기
  // hotLikeVideoIndex: [], // 핫라이크 비디오 리스트 캐싱
  // hotLikeVideoList: [], // 핫라이크 비디오 리스트

  // isLoadedMoreHotViewVideo: false, // Hot 비디오 불러오기
  // hotViewVideoIndex: [], // Hot 비디오 리스트 캐싱
  // hotViewVideoList: [], // Hot 비디오 리스트

  // isLoadedMoreHotTalkVideo: false, // 핫톡 비디오 불러오기
  // hotTalkVideoIndex: [], // 핫톡 비디오 리스트 캐싱
  // hotTalkVideoList: [], // 핫톡 비디오 리스트

  // isLoadedMoreSeasonLikeVideo: false, // SEASON 내 like를 가장 많이 받은 비디오 불러오기
  // seasonLikeVideoIndex: [], // SEASON 내 like를 가장 많이 받은 비디오  리스트 캐싱
  // seasonLikeVideoList: [], // SEASON 내 like를 가장 많이 받은 비디오  리스트

  // isLoadedMoreSeasonViewVideo: false, // SEASON 내 View 가장 많이 받은 비디오 불러오기
  // seasonViewVideoIndex: [], // SEASON 내 View 가장 많이 받은 비디오 리스트 캐싱
  // seasonViewVideoList: [], // SEASON 내 View 가장 많이 받은 비디오 리스트

  isLoadedMoreRealtimeSurgePushVideo: false, // 실시간 푸쉬 불러오기
  realtimeSurgePushVideoIndex: [], // 실시간 급상승 비디오 리스트 캐싱
  realtimeSurgePushVideoList: [], // 실시간 급상승 비디오 리스트

  isLoadedMoreHotPushVideo: false, // 핫 푸쉬 불러오기
  hotPushVideoIndex: [], // 핫 푸쉬 비디오 리스트 캐싱
  hotPushVideoList: [], // 핫 푸쉬 비디오 리스트

  isLoadedMoreSeasonPushVideo: false, // 누적 푸쉬 불러오기
  seasonPushVideoIndex: [], // 누적 푸쉬 비디오 리스트 캐싱
  seasonPushVideoList: [], // 누적 푸쉬 비디오 리스트

  isLoadedMoreNewVideo: false, // New 비디오 불러오기
  newVideoIndex: [], // New 비디오 리스트 캐싱
  newVideoList: [], // New 비디오 리스
};

export const INIT_CATEGORYPAGE = "INIT_CATEGORYPAGE";

export const GET_CATEGORYPAGE_REQUEST = "GET_CATEGORYPAGE_REQUEST";
export const GET_CATEGORYPAGE_SUCCESS = "GET_CATEGORYPAGE_SUCCESS";
export const GET_CATEGORYPAGE_FAILURE = "GET_CATEGORYPAGE_FAILURE";

export const GET_CATEGORY_VIDEO_REQUEST = "GET_CATEGORY_VIDEO_REQUEST";
export const GET_CATEGORY_VIDEO_SUCCESS = "GET_CATEGORY_VIDEO_SUCCESS";
export const GET_CATEGORY_VIDEO_FAILURE = "GET_CATEGORY_VIDEO_FAILURE";

export const GET_REALTIME_SURGE_LIKE_VIDEO_REQUEST =
  "GET_REALTIME_SURGE_LIKE_VIDEO_REQUEST";
export const GET_REALTIME_SURGE_LIKE_VIDEO_SUCCESS =
  "GET_REALTIME_SURGE_LIKE_VIDEO_SUCCESS";
export const GET_REALTIME_SURGE_LIKE_VIDEO_FAILURE =
  "GET_REALTIME_SURGE_LIKE_VIDEO_FAILURE";

export const GET_REALTIME_SURGE_TALK_VIDEO_REQUEST =
  "GET_REALTIME_SURGE_TALK_VIDEO_REQUEST";
export const GET_REALTIME_SURGE_TALK_VIDEO_SUCCESS =
  "GET_REALTIME_SURGE_TALK_VIDEO_SUCCESS";
export const GET_REALTIME_SURGE_TALK_VIDEO_FAILURE =
  "GET_REALTIME_SURGE_TALK_VIDEO_FAILURE";

// 핫라이크 비디오 조회
export const GET_HOT_LIKE_CATEGORY_VIDEO_REQUEST =
  "GET_HOT_LIKE_CATEGORY_VIDEO_REQUEST";
export const GET_HOT_LIKE_CATEGORY_VIDEO_SUCCESS =
  "GET_HOT_LIKE_CATEGORY_VIDEO_SUCCESS";
export const GET_HOT_LIKE_CATEGORY_VIDEO_FAILURE =
  "GET_HOT_LIKE_CATEGORY_VIDEO_FAILURE";

// 핫비디오 조회
export const GET_HOT_VIEW_CATEGORY_VIDEO_REQUEST =
  "GET_HOT_VIEW_CATEGORY_VIDEO_REQUEST";
export const GET_HOT_VIEW_CATEGORY_VIDEO_SUCCESS =
  "GET_HOT_VIEW_CATEGORY_VIDEO_SUCCESS";
export const GET_HOT_VIEW_CATEGORY_VIDEO_FAILURE =
  "GET_HOT_VIEW_CATEGORY_VIDEO_FAILURE";

// 핫비디오 조회
export const GET_HOT_TALK_CATEGORY_VIDEO_REQUEST =
  "GET_HOT_TALK_CATEGORY_VIDEO_REQUEST";
export const GET_HOT_TALK_CATEGORY_VIDEO_SUCCESS =
  "GET_HOT_TALK_CATEGORY_VIDEO_SUCCESS";
export const GET_HOT_TALK_CATEGORY_VIDEO_FAILURE =
  "GET_HOT_TALK_CATEGORY_VIDEO_FAILURE";

// 넘사벽 LIKE 조회
export const GET_SEASON_LIKE_CATEGORY_VIDEO_REQUEST =
  "GET_SEASON_LIKE_CATEGORY_VIDEO_REQUEST";
export const GET_SEASON_LIKE_CATEGORY_VIDEO_SUCCESS =
  "GET_SEASON_LIKE_CATEGORY_VIDEO_SUCCESS";
export const GET_SEASON_LIKE_CATEGORY_VIDEO_FAILURE =
  "GET_SEASON_LIKE_CATEGORY_VIDEO_FAILURE";

// 넘사벽 VIEW 조회
export const GET_SEASON_VIEW_CATEGORY_VIDEO_REQUEST =
  "GET_SEASON_VIEW_CATEGORY_VIDEO_REQUEST";
export const GET_SEASON_VIEW_CATEGORY_VIDEO_SUCCESS =
  "GET_SEASON_VIEW_CATEGORY_VIDEO_SUCCESS";
export const GET_SEASON_VIEW_CATEGORY_VIDEO_FAILURE =
  "GET_SEASON_VIEW_CATEGORY_VIDEO_FAILURE";

// 뉴 비디오 조회
export const GET_NEW_CATEGORY_VIDEO_REQUEST = "GET_NEW_CATEGORY_VIDEO_REQUEST";
export const GET_NEW_CATEGORY_VIDEO_SUCCESS = "GET_NEW_CATEGORY_VIDEO_SUCCESS";
export const GET_NEW_CATEGORY_VIDEO_FAILURE = "GET_NEW_CATEGORY_VIDEO_FAILURE";

// 실시간 급상승 푸쉬 비디오 더 불러오기
export const GET_REALTIME_SURGE_PUSH_VIDEO_REQUEST =
  "GET_REALTIME_SURGE_PUSH_VIDEO_REQUEST";
export const GET_REALTIME_SURGE_PUSH_VIDEO_SUCCESS =
  "GET_REALTIME_SURGE_PUSH_VIDEO_SUCCESS";
export const GET_REALTIME_SURGE_PUSH_VIDEO_FAILURE =
  "GET_REALTIME_SURGE_PUSH_VIDEO_FAILURE";

// 핫 푸쉬 비디오 더 불러오기
export const GET_HOT_PUSH_VIDEO_REQUEST = "GET_HOT_PUSH_VIDEO_REQUEST";
export const GET_HOT_PUSH_VIDEO_SUCCESS = "GET_HOT_PUSH_VIDEO_SUCCESS";
export const GET_HOT_PUSH_VIDEO_FAILURE = "GET_HOT_PUSH_VIDEO_FAILURE";

// 누적 비디오 더 불러오기
export const GET_SEASON_PUSH_VIDEO_REQUEST = "GET_SEASON_PUSH_VIDEO_REQUEST";
export const GET_SEASON_PUSH_VIDEO_SUCCESS = "GET_SEASON_PUSH_VIDEO_SUCCESS";
export const GET_SEASON_PUSH_VIDEO_FAILURE = "GET_SEASON_PUSH_VIDEO_FAILURE";

// 좋아요 버튼 성공 액션
export const LIKE_CATEGORY_VIDEO_REQUEST = "LIKE_CATEGORY_VIDEO_REQUEST";
export const LIKE_CATEGORY_VIDEO_SUCCESS = "LIKE_CATEGORY_VIDEO_SUCCESS";
export const LIKE_CATEGORY_VIDEO_FAILURE = "LIKE_CATEGORY_VIDEO_FAILURE";

const reducer = (state = initState, action) => {
  switch (action.type) {
    // 카테고리페이지 초기회
    case INIT_CATEGORYPAGE: {
      return {
        ...state,
        ...initState,
        categoryNo: action.payload,
      };
    }
    // 카테고리페이지 조회
    case GET_CATEGORYPAGE_REQUEST: {
      return {
        ...state,
        isLoadedMain: false,
      };
    }
    case GET_CATEGORYPAGE_SUCCESS: {
      return {
        ...state,
        isLoadedMain: true,
        // bestUsersInToday: action.data.bestUsersInToday,
        // rookiesInSevenDays: action.data.rookiesInSevenDays,
        // newbiesInSevenDays: action.data.newbiesInSevenDays,
        // bestProducersInSeason: action.data.bestProducersInSeason,

        officialVideoIndex: action.data.officialVideoIndex,
        officialVideoList: action.data.officialVideoList,

        // isLoadedMoreRealtimeSurgeLikeVideo:
        //   action.data.isLoadedMoreRealtimeSurgeLikeVideo,
        // realtimeSurgeLikeVideoIndex: action.data.realtimeSurgeLikeVideoIndex,
        // realtimeSurgeLikeVideoList: action.data.realtimeSurgeLikeVideoList,
        // isLoadedMoreRealtimeSurgeTalkVideo:
        //   action.data.isLoadedMoreRealtimeSurgeTalkVideo,
        // realtimeSurgeTalkVideoIndex: action.data.realtimeSurgeTalkVideoIndex,
        // realtimeSurgeTalkVideoList: action.data.realtimeSurgeTalkVideoList,
        // isLoadedMoreHotLikeVideo: action.data.isLoadedMoreHotLikeVideo,
        // hotLikeVideoIndex: action.data.hotLikeVideoIndex,
        // hotLikeVideoList: action.data.hotLikeVideoList,
        // hotViewVideoIndex: action.data.hotViewVideoIndex,
        // hotViewVideoList: action.data.hotViewVideoList,
        // hotTalkVideoIndex: action.data.hotTalkVideoIndex,
        // hotTalkVideoList: action.data.hotTalkVideoList,
        // seasonLikeVideoIndex: action.data.seasonLikeVideoIndex,
        // seasonLikeVideoList: action.data.seasonLikeVideoList,
        // seasonViewVideoIndex: action.data.seasonViewVideoIndex,
        // seasonViewVideoList: action.data.seasonViewVideoList,
        realtimeSurgePushVideoIndex: action.data.realtimeSurgePushVideoIndex,
        realtimeSurgePushVideoList: action.data.realtimeSurgePushVideoList,
        hotPushVideoIndex: action.data.hotPushVideoIndex,
        hotPushVideoList: action.data.hotPushVideoList,
        seasonPushVideoIndex: action.data.seasonPushVideoIndex,
        seasonPushVideoList: action.data.seasonPushVideoList,
        newVideoIndex: action.data.newVideoIndex,
        newVideoList: action.data.newVideoList,
      };
    }
    case GET_CATEGORYPAGE_FAILURE: {
      return {
        ...state,
        isLoadedMain: true,
      };
    }

    case GET_CATEGORY_VIDEO_REQUEST: {
      return {
        ...state,
        [action.payload.isLoaded]: false,
      };
    }
    case GET_CATEGORY_VIDEO_SUCCESS: {
      return {
        ...state,
        [action.payload.isLoaded]: true,
      };
    }
    case GET_CATEGORY_VIDEO_FAILURE: {
      return {
        ...state,
        [action.payload.isLoaded]: true,
      };
    }

    // // 실시간 급상승 좋아요 더 불러오기
    // case GET_REALTIME_SURGE_LIKE_VIDEO_REQUEST: {
    //   return { ...state, isLoadedMoreRealtimeSurgeLikeVideo: true };
    // }
    // case GET_REALTIME_SURGE_LIKE_VIDEO_SUCCESS: {
    //   return {
    //     ...state,
    //     isLoadedMoreRealtimeSurgeLikeVideo: false,
    //     realtimeSurgeLikeVideoList: state.realtimeSurgeLikeVideoList.concat(
    //       action.data.videoList
    //     ),
    //   };
    // }
    // case GET_REALTIME_SURGE_LIKE_VIDEO_FAILURE: {
    //   return { ...state, isLoadedMoreRealtimeSurgeLikeVideo: false };
    // }

    // // 실시간 급상승 채팅 더 불러오기
    // case GET_REALTIME_SURGE_TALK_VIDEO_REQUEST: {
    //   return { ...state, isLoadedMoreRealtimeSurgeTalkVideo: true };
    // }
    // case GET_REALTIME_SURGE_TALK_VIDEO_SUCCESS: {
    //   return {
    //     ...state,
    //     isLoadedMoreRealtimeSurgeTalkVideo: false,
    //     realtimeSurgeTalkVideoList: state.realtimeSurgeTalkVideoList.concat(
    //       action.data.videoList
    //     ),
    //   };
    // }
    // case GET_REALTIME_SURGE_TALK_VIDEO_FAILURE: {
    //   return { ...state, isLoadedMoreRealtimeSurgeTalkVideo: false };
    // }

    // // 핫 라이크 비디오 더 불러오기
    // case GET_HOT_LIKE_CATEGORY_VIDEO_REQUEST: {
    //   return { ...state, isLoadedMoreHotLikeVideo: true };
    // }
    // case GET_HOT_LIKE_CATEGORY_VIDEO_SUCCESS: {
    //   return {
    //     ...state,
    //     isLoadedMoreHotLikeVideo: false,
    //     hotLikeVideoList: state.hotLikeVideoList.concat(action.data.videoList),
    //   };
    // }
    // case GET_HOT_LIKE_CATEGORY_VIDEO_FAILURE: {
    //   return { ...state, isLoadedMoreHotLikeVideo: false };
    // }

    // // 핫비디오 더 불러오기
    // case GET_HOT_VIEW_CATEGORY_VIDEO_REQUEST: {
    //   return { ...state, isLoadedMoreHotViewVideo: true };
    // }
    // case GET_HOT_VIEW_CATEGORY_VIDEO_SUCCESS: {
    //   return {
    //     ...state,
    //     isLoadedMoreHotViewVideo: false,
    //     hotViewVideoList: state.hotViewVideoList.concat(action.data.videoList),
    //   };
    // }
    // case GET_HOT_VIEW_CATEGORY_VIDEO_FAILURE: {
    //   return { ...state, isLoadedMoreHotViewVideo: false };
    // }

    // // 핫톡 비디오 더 불러오기
    // case GET_HOT_TALK_CATEGORY_VIDEO_REQUEST: {
    //   return {
    //     ...state,
    //     isLoadedMoreHotTalkVideo: true,
    //   };
    // }
    // case GET_HOT_TALK_CATEGORY_VIDEO_SUCCESS: {
    //   return {
    //     ...state,
    //     isLoadedMoreHotTalkVideo: false,
    //     hotTalkVideoList: state.hotTalkVideoList.concat(action.data.videoList),
    //   };
    // }
    // case GET_HOT_TALK_CATEGORY_VIDEO_FAILURE: {
    //   return {
    //     ...state,
    //     isLoadedMoreHotTalkVideo: false,
    //   };
    // }
    // // 넘사벽 LIKE 더 불러오기
    // case GET_SEASON_LIKE_CATEGORY_VIDEO_REQUEST: {
    //   return {
    //     ...state,
    //     isLoadedMoreSeasonLikeVideo: true,
    //   };
    // }
    // case GET_SEASON_LIKE_CATEGORY_VIDEO_SUCCESS: {
    //   return {
    //     ...state,
    //     isLoadedMoreSeasonLikeVideo: false,
    //     seasonLikeVideoList: state.seasonLikeVideoList.concat(
    //       action.data.videoList
    //     ),
    //   };
    // }
    // case GET_SEASON_LIKE_CATEGORY_VIDEO_FAILURE: {
    //   return {
    //     ...state,
    //     isLoadedMoreSeasonLikeVideo: false,
    //   };
    // }

    // // 넘사벽 VIEW 더 불러오기
    // case GET_SEASON_VIEW_CATEGORY_VIDEO_REQUEST: {
    //   return {
    //     ...state,
    //     isLoadedMoreSeasonViewVideo: true,
    //   };
    // }
    // case GET_SEASON_VIEW_CATEGORY_VIDEO_SUCCESS: {
    //   return {
    //     ...state,
    //     isLoadedMoreSeasonViewVideo: false,
    //     seasonViewVideoList: state.seasonViewVideoList.concat(
    //       action.data.videoList
    //     ),
    //   };
    // }
    // case GET_SEASON_VIEW_CATEGORY_VIDEO_FAILURE: {
    //   return {
    //     ...state,
    //     isLoadedMoreSeasonViewVideo: false,
    //   };
    // }

    // 뉴 비디오 더 불러오기
    case GET_NEW_CATEGORY_VIDEO_REQUEST: {
      return {
        ...state,
        isLoadedMoreNewVideo: true,
      };
    }
    case GET_NEW_CATEGORY_VIDEO_SUCCESS: {
      return {
        ...state,
        isLoadedMoreNewVideo: false,
        newVideoList: state.newVideoList.concat(action.data.videoList),
      };
    }
    case GET_NEW_CATEGORY_VIDEO_FAILURE: {
      return {
        ...state,
        isLoadedMoreNewVideo: false,
      };
    }

    // 실시간 급상승 푸쉬 비디오 더 불러오기
    case GET_REALTIME_SURGE_PUSH_VIDEO_REQUEST: {
      return {
        ...state,
        isLoadedMoreRealtimeSurgePushVideo: true,
      };
    }
    case GET_REALTIME_SURGE_PUSH_VIDEO_SUCCESS: {
      return {
        ...state,
        isLoadedMoreRealtimeSurgePushVideo: false,
        realtimeSurgePushVideoList: state.realtimeSurgePushVideoList.concat(
          action.data.videoList
        ),
      };
    }
    case GET_REALTIME_SURGE_PUSH_VIDEO_FAILURE: {
      return {
        ...state,
        isLoadedMoreRealtimeSurgePushVideo: false,
      };
    }

    // 핫 푸쉬 비디오 더 불러오기
    case GET_HOT_PUSH_VIDEO_REQUEST: {
      return {
        ...state,
        isLoadedMoreHotPushVideo: true,
      };
    }
    case GET_HOT_PUSH_VIDEO_SUCCESS: {
      return {
        ...state,
        isLoadedMoreHotPushVideo: false,
        hotPushVideoList: state.hotPushVideoList.concat(action.data.videoList),
      };
    }
    case GET_HOT_PUSH_VIDEO_FAILURE: {
      return {
        ...state,
        isLoadedMoreHotPushVideo: false,
      };
    }

    // 누적 비디오 더 불러오기
    case GET_SEASON_PUSH_VIDEO_REQUEST: {
      return {
        ...state,
        isLoadedMoreSeasonPushVideo: true,
      };
    }
    case GET_SEASON_PUSH_VIDEO_SUCCESS: {
      return {
        ...state,
        isLoadedMoreSeasonPushVideo: false,
        seasonPushVideoList: state.seasonPushVideoList.concat(
          action.data.videoList
        ),
      };
    }
    case GET_SEASON_PUSH_VIDEO_FAILURE: {
      return {
        ...state,
        isLoadedMoreSeasonPushVideo: false,
      };
    }

    // 메인페이지에서 비디오 좋아요
    case LIKE_CATEGORY_VIDEO_REQUEST: {
      return {
        ...state,
        isLoadingLike: true,
      };
    }
    case LIKE_CATEGORY_VIDEO_SUCCESS: {
      const onChangeLikeCount = (video) =>
        video.video_no === action.payload.videoNo
          ? {
              ...video,
              is_liked: action.payload.isLiked,
              COUNT: {
                ...video.COUNT,
                count_like: action.payload.isLiked
                  ? video.COUNT.count_like + 1
                  : video.COUNT.count_like - 1,
              },
            }
          : video;
      const officialVideoList = [...state.officialVideoList].map(
        onChangeLikeCount
      );
      // const changeRealtimeSurgeLikeVideoList = [
      //   ...state.realtimeSurgeLikeVideoList,
      // ].map(onChangeLikeCount);
      // const changeRealtimeSurgeTalkVideoList = [
      //   ...state.realtimeSurgeTalkVideoList,
      // ].map(onChangeLikeCount);

      // const changeHotViewVideoList = [...state.hotViewVideoList].map(
      //   onChangeLikeCount
      // );
      // const changeHotTalkVideoList = [...state.hotTalkVideoList].map(
      //   onChangeLikeCount
      // );

      // const changeHotLikeVideoList = [...state.hotLikeVideoList].map(
      //   onChangeLikeCount
      // );

      // const changeSeasonLikeVideoList = [...state.seasonLikeVideoList].map(
      //   onChangeLikeCount
      // );
      // const changeSeasonViewVideoList = [...state.seasonViewVideoList].map(
      //   onChangeLikeCount
      // );
      const changeRealtimeSurgePushVideoList = [
        ...state.realtimeSurgePushVideoList,
      ].map(onChangeLikeCount);
      const changeHotPushVideoList = [...state.hotPushVideoList].map(
        onChangeLikeCount
      );
      const changeSeasonPushVideoList = [...state.seasonPushVideoList].map(
        onChangeLikeCount
      );
      const changeNewVideoList = [...state.newVideoList].map(onChangeLikeCount);

      return {
        ...state,
        isLoadingLike: false,
        officialVideoList: officialVideoList,
        // realtimeSurgeLikeVideoList: changeRealtimeSurgeLikeVideoList,
        // realtimeSurgeTalkVideoList: changeRealtimeSurgeTalkVideoList,
        // hotViewVideoList: changeHotViewVideoList,
        // hotTalkVideoList: changeHotTalkVideoList,
        // hotLikeVideoList: changeHotLikeVideoList,
        // seasonLikeVideoList: changeSeasonLikeVideoList,
        // seasonViewVideoList: changeSeasonViewVideoList,
        realtimeSurgePushVideoList: changeRealtimeSurgePushVideoList,
        hotPushVideoList: changeHotPushVideoList,
        seasonPushVideoList: changeSeasonPushVideoList,
        newVideoList: changeNewVideoList,
      };
    }
    case LIKE_CATEGORY_VIDEO_FAILURE: {
      return {
        ...state,
        isLoadingLike: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
export default reducer;
