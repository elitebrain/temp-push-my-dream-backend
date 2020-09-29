import _ from "lodash/array";

const initialState = {
  myVideoList: [], // 내 비디오 리스트
  isMyVideoListLoaded: false, // 내 비디오 리스트 조회 상태

  userVideoList: [], // 유저의 비디오 리스트
  isUserVideoListLoaded: false, // 유저의 비디오 리스트 조회 상태

  isLoadedMoreVideoList: false,
  isLoadedVideoList: false,
  videoIndex: [], // 비디오 인덱스
  videoList: [], // 비디오 리스트

  isLoadingLike: false, // 좋아요 기능 동작 중 확인

  // 업로드
  uploadPercent: 0,
  isVideoUpLoaded: false, // 비디오 업로드 상태
  isConvertedLoaded: false, // 비디오 컨버팅 상태
  isFinishedUpLoaded: false, // 업로드 완료 상태
  uploadVideo: {}, // upload 중인 비디오
  errorVideoUpLoaded: false,
  errorConvertedLoad: false,
  uploadErrorMessage: "",

  // 메인
  isLoadedMain: false, // 메인 페이지 로딩 여부
  isLoadedMoreHotViewVideo: false, // Hot View 비디오 불러오기
  hotViewVideoIndex: [], // Hot View 비디오 리스트 캐싱
  hotViewVideoList: [], // Hot View 비디오 리스트
  // 핫톡 주석
  // isLoadedMoreHotTalkVideo: false, // 핫톡 비디오 불러오기
  // hotTalkVideoIndex: [], // 핫톡 비디오 리스트 캐싱
  // hotTalkVideoList: [], // 핫톡 비디오 리스트
  isLoadedMoreHotLikeVideo: false, // 핫라이크 비디오 불러오기
  hotLikeVideoIndex: [], // 핫라이크 비디오 리스트 캐싱
  hotLikeVideoList: [], // 핫라이크 비디오 리스트
  openCategoryList: [], // 오픈 중인 카테고리 비디오 리스트 조회

  // 뉴업로드 주석
  /*
  isLoadedMoreNewVideo: false, // 핫톡 비디오 불러오기
  newVideoIndex: [], // New 비디오 리스트 캐싱
  newVideoList: [], // New 비디오 리스트
  */

  rankingList: {}, // 메인페이지 경연 랭킹 리스트
  bestAppleList: [], // 메인페이지의 애플 리스트
  bestEmergenzaList: [], // 메인페이지의 에머겐자 리스트
  topProducerList: [], // 탑 프로듀서 리스트

  // 음소거 여부
  muted: true,
};

// 비디오 리덕 스테이트 초기화
export const INIT_VIDEO_REDUX = "INIT_VIDEO_REDUX";

// 내 비디오 조회
export const GET_MYVIDEOLIST_REQUEST = "GET_MYVIDEOLIST_REQUEST";
export const GET_MYVIDEOLIST_SUCCESS = "GET_MYVIDEOLIST_SUCCESS";
export const GET_MYVIDEOLIST_FAILURE = "GET_MYVIDEOLIST_FAILURE";

// 유저의 비디오 조회
export const GET_USER_VIDEOLIST_REQUEST = "GET_USER_VIDEOLIST_REQUEST";
export const GET_USER_VIDEOLIST_SUCCESS = "GET_USER_VIDEOLIST_SUCCESS";
export const GET_USER_VIDEOLIST_FAILURE = "GET_USER_VIDEOLIST_FAILURE";

// 업로드
export const UPLOAD_VIDEO_INIT = "UPLOAD_VIDEO_INIT";
export const UPLOAD_VIDEO_REQUEST = "UPLOAD_VIDEO_REQUEST";
export const UPLOAD_VIDEO_SUCCESS = "UPLOAD_VIDEO_SUCCESS";
export const UPLOAD_VIDEO_FAILURE = "UPLOAD_VIDEO_FAILURE";
export const UPLOAD_PROGRESS = "UPLOAD_PROGRESS";

// 비디오 공개 유무 업데이트
export const UPDATE_VIDEO_ISOPEN_REQUEST = "UPDATE_VIDEO_ISOPEN_REQUEST";
export const UPDATE_VIDEO_ISOPEN_SUCCESS = "UPDATE_VIDEO_ISOPEN_SUCCESS";
export const UPDATE_VIDEO_ISOPEN_FAILURE = "UPDATE_VIDEO_ISOPEN_FAILURE";

// 비디오 삭제
export const DELETE_VIDEO_REQUEST = "DELETE_VIDEO_REQUEST";
export const DELETE_VIDEO_SUCCESS = "DELETE_VIDEO_SUCCESS";
export const DELETE_VIDEO_FAILURE = "DELETE_VIDEO_FAILURE";

// 컨버팅 상태 체크
export const GET_VIDEO_CONVERT_REQUEST = "GET_VIDEO_CONVERT_REQUEST";
export const GET_VIDEO_CONVERT_SUCCESS = "GET_VIDEO_CONVERT_SUCCESS";
export const GET_VIDEO_CONVERT_FAILURE = "GET_VIDEO_CONVERT_FAILURE";

// 비디오 조회
export const GET_VIDEO = "GET_VIDEO";

// 비디오 세팅
export const SET_VIDEO = "SET_VIDEO";

// 비디오리스트 인덱스 세팅
export const SET_VIDEOLIST_INDEX = "SET_VIDEOLIST_INDEX";

// 비디오리스트 세팅
export const SET_VIDEOLIST = "SET_VIDEOLIST";

// 비디오리스트 첫 로딩 유무 세팅
export const SET_VIDEOLIST_LOADED = "SET_VIDEOLIST_LOADED";

// 비디오 리스트 더 불러오기
export const GET_MORE_VIDEOLIST_REQUEST = "GET_MORE_VIDEOLIST_REQUEST";
export const GET_MORE_VIDEOLIST_SUCCESS = "GET_MORE_VIDEOLIST_SUCCESS";
export const GET_MORE_VIDEOLIST_FAILURE = "GET_MORE_VIDEOLIST_FAILURE";

// 비디오 좋아요
export const LIKE_VIDEO_REQUEST = "LIKE_VIDEO_REQUEST";
export const LIKE_VIDEO_SUCCESS = "LIKE_VIDEO_SUCCESS";
export const LIKE_VIDEO_FAILURE = "LIKE_VIDEO_FAILURE";

// 메인페이지 조회
export const GET_MAINPAGE_REQUEST = "GET_MAINPAGE_REQUEST";
export const GET_MAINPAGE_SUCCESS = "GET_MAINPAGE_SUCCESS";
export const GET_MAINPAGE_FAILURE = "GET_MAINPAGE_FAILURE";

// 핫뷰 비디오 조회
export const GET_HOT_VIEW_VIDEO_REQUEST = "GET_HOT_VIEW_VIDEO_REQUEST";
export const GET_HOT_VIEW_VIDEO_SUCCESS = "GET_HOT_VIEW_VIDEO_SUCCESS";
export const GET_HOT_VIEW_VIDEO_FAILURE = "GET_HOT_VIEW_VIDEO_FAILURE";

// 핫톡 비디오 조회
export const GET_HOTTALK_VIDEO_REQUEST = "GET_HOTTALK_VIDEO_REQUEST";
export const GET_HOTTALK_VIDEO_SUCCESS = "GET_HOTTALK_VIDEO_SUCCESS";
export const GET_HOTTALK_VIDEO_FAILURE = "GET_HOTTALK_VIDEO_FAILURE";

// 핫라이크 비디오 조회
export const GET_HOT_LIKE_VIDEO_REQUEST = "GET_HOT_LIKE_VIDEO_REQUEST";
export const GET_HOT_LIKE_VIDEO_SUCCESS = "GET_HOT_LIKE_VIDEO_SUCCESS";
export const GET_HOT_LIKE_VIDEO_FAILURE = "GET_HOT_LIKE_VIDEO_FAILURE";

// 뉴 비디오 조회
export const GET_NEW_VIDEO_REQUEST = "GET_NEW_VIDEO_REQUEST";
export const GET_NEW_VIDEO_SUCCESS = "GET_NEW_VIDEO_SUCCESS";
export const GET_NEW_VIDEO_FAILURE = "GET_NEW_VIDEO_FAILURE";

// 비디오 리스트 조회
export const INIT_VIDEOLIST_BEFORE_VIEW_VIDEO =
  "INIT_VIDEOLIST_BEFORE_VIEW_VIDEO";

// Muted 설정
export const TOGGLE_MUTED = "TOGGLE_MUTED";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 비디오 리덕스 초기화
    case INIT_VIDEO_REDUX: {
      return { ...state, ...initialState };
    }
    // 비디오 조회
    case GET_VIDEO: {
      return { ...state, currentVideo: action.data };
    }

    // 비디오 세팅
    case SET_VIDEO: {
      const { video_no } = action.data;

      const index = state.videoList
        .map((video) => video.video_no)
        .indexOf(video_no);

      const changeList = [...state.videoList];

      changeList[index] = Object.assign({}, action.data);

      return { ...state, videoList: changeList };
    }

    // 비디오 인덱스 세팅
    case SET_VIDEOLIST_INDEX: {
      return {
        ...state,
        videoIndex: action.data,
        isLoadedVideoList: false,
        videoList: [],
      };
    }

    // 비디오리스트 세팅
    case SET_VIDEOLIST: {
      return {
        ...state,
        videoList: state.videoList.concat(action.data),
      };
    }

    // 비디오 첫로딩 세팅
    case SET_VIDEOLIST_LOADED: {
      return {
        ...state,
        isLoadedVideoList: true,
      };
    }

    // 비디오 리스트 더 불러오기
    case GET_MORE_VIDEOLIST_REQUEST: {
      return {
        ...state,
        isLoadedMoreVideoList: true,
      };
    }

    case GET_MORE_VIDEOLIST_SUCCESS: {
      return {
        ...state,
        isLoadedMoreVideoList: false,
        videoList: state.videoList.concat(action.data.videoList),
      };
    }

    case GET_MORE_VIDEOLIST_FAILURE: {
      return {
        ...state,
        isLoadedMoreVideoList: false,
      };
    }

    // 내 비디오 리스트 조회
    case GET_MYVIDEOLIST_REQUEST: {
      return { ...state, isMyVideoListLoaded: true };
    }
    case GET_MYVIDEOLIST_SUCCESS: {
      return {
        ...state,
        isMyVideoListLoaded: false,
        myVideoList: [...action.data],
      };
    }
    case GET_MYVIDEOLIST_FAILURE: {
      return { ...state, isMyVideoListLoaded: false };
    }

    // 유저의 비디오 조회
    case GET_USER_VIDEOLIST_REQUEST: {
      return { ...state, isUserVideoListLoaded: true };
    }
    case GET_USER_VIDEOLIST_SUCCESS: {
      return {
        ...state,
        isUserVideoListLoaded: false,
        userVideoList: [...action.data],
      };
    }
    case GET_USER_VIDEOLIST_FAILURE: {
      return { ...state, isUserVideoListLoaded: false };
    }

    // 업로드
    case UPLOAD_VIDEO_INIT: {
      return {
        ...state,
        isVideoUpLoaded: false,
        isConvertedLoaded: false,
        isFinishedUpLoaded: false,
        errorVideoUpLoaded: false,
        errorConvertedLoad: false,
        uploadVideo: {},
        uploadErrorMessage: "",
      };
    }
    case UPLOAD_VIDEO_REQUEST: {
      return {
        ...state,
        isVideoUpLoaded: true,
        uploadVideo: {},
      };
    }
    case UPLOAD_PROGRESS: {
      return {
        ...state,
        uploadPercent: action.data,
      };
    }
    case UPLOAD_VIDEO_SUCCESS: {
      return {
        ...state,
        uploadVideo: action.data,
        isVideoUpLoaded: true,
        isConvertedLoaded: true,
      };
    }
    case UPLOAD_VIDEO_FAILURE: {
      return {
        ...state,
        isVideoUpLoaded: false,
        isConvertedLoaded: false,
        errorVideoUpLoaded: true,
        uploadErrorMessage: action.data,
      };
    }

    // 비디오 공개 유무
    case UPDATE_VIDEO_ISOPEN_REQUEST: {
      return {
        ...state,
      };
    }
    case UPDATE_VIDEO_ISOPEN_SUCCESS: {
      const { videoNo, flag } = action.data;

      const changeList = [...state.myVideoList];
      const index = _.findIndex(
        changeList,
        (video) => video.video_no === videoNo
      );

      changeList[index] = {
        ...changeList[index],
        flag,
      };

      return {
        ...state,
        myVideoList: changeList,
      };
    }
    case UPDATE_VIDEO_ISOPEN_FAILURE: {
      return {
        ...state,
      };
    }

    // 영상 변환
    case GET_VIDEO_CONVERT_REQUEST: {
      return {
        ...state,
        isConvertedLoaded: true,
      };
    }
    case GET_VIDEO_CONVERT_SUCCESS: {
      return {
        ...state,
        myVideoList: [action.data, ...state.myVideoList],
        isVideoUpLoaded: false,
        isConvertedLoaded: false,
        isFinishedUpLoaded: true,
      };
    }
    case GET_VIDEO_CONVERT_FAILURE: {
      return {
        ...state,
        isConvertedLoaded: false,
        errorVideoUpLoaded: true,
        uploadErrorMessage: action.data,
      };
    }

    // 영상 변환
    case DELETE_VIDEO_REQUEST: {
      return {
        ...state,
      };
    }
    case DELETE_VIDEO_SUCCESS: {
      return {
        ...state,
        myVideoList: state.myVideoList.filter(
          (video) => video.video_no !== action.data.videoNo
        ),
      };
    }
    case DELETE_VIDEO_FAILURE: {
      return {
        ...state,
      };
    }

    // 메인페이지 조회
    case GET_MAINPAGE_REQUEST: {
      return {
        ...state,
        isLoadedMain: false,
      };
    }
    case GET_MAINPAGE_SUCCESS: {
      return {
        ...state,
        isLoadedMain: true,
        rankingList: action.data.rankingList,
        bestAppleList: action.data.bestAppleList,
        bestEmergenzaList: action.data.bestEmergenzaList,
        topProducerList: action.data.topProducerList,
        hotViewVideoIndex: action.data.hotViewVideoIndex,
        hotViewVideoList: action.data.hotViewVideoList,
        // 핫톡 주석
        // hotTalkVideoIndex: action.data.hotTalkVideoIndex,
        // hotTalkVideoList: action.data.hotTalkVideoList,
        hotLikeVideoIndex: action.data.hotLikeVideoIndex,
        hotLikeVideoList: action.data.hotLikeVideoList,

        openCategoryList: action.data.openCategoryList,
        /**
         * 뉴비디오 주석
        //  */
        // newVideoIndex: action.data.newVideoIndex,
        // newVideoList: action.data.newVideoList,
      };
    }
    case GET_MAINPAGE_FAILURE: {
      return {
        ...state,
        isLoadedMain: true,
      };
    }

    // 메인페이지에서 비디오 좋아요
    case LIKE_VIDEO_REQUEST: {
      return {
        ...state,
        isLoadingLike: true,
      };
    }
    case LIKE_VIDEO_SUCCESS: {
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

      const changeVideoList = [...state.videoList].map((video) =>
        video.video_no === action.payload.videoNo
          ? {
              ...video,
              active_log_no: Boolean(action.payload.isLiked),
              countLikeVideo: action.payload.isLiked
                ? video.countLikeVideo + 1
                : video.countLikeVideo - 1,
            }
          : video
      );

      const changeMyVideoList = [...state.myVideoList].map(onChangeLikeCount);

      const changeUserVideoList = [...state.userVideoList].map(
        onChangeLikeCount
      );

      const changeHotViewVideoList = [...state.hotViewVideoList].map(
        onChangeLikeCount
      );
      // 핫톡 주석
      // const changeHotTalkVideoList = [...state.hotTalkVideoList].map(
      //   onChangeLikeCount
      // );

      const changeHotLikeVideoList = [...state.hotLikeVideoList].map(
        onChangeLikeCount
      );

      // 뉴비디오 주석
      // const changeNewVideoList = [...state.newVideoList].map(onChangeLikeCount);

      const changeOpenCategoryList = [...state.openCategoryList].map(
        (openCategory) => {
          console.log(openCategory.videoList);
          const changeOpenCategoryVideoList = [...openCategory.videoList];

          return {
            ...openCategory,
            videoList: changeOpenCategoryVideoList.map(onChangeLikeCount),
          };
        }
      );

      console.log("changeOpenCategoryList", changeOpenCategoryList);

      return {
        ...state,
        isLoadingLike: false,
        myVideoList: changeMyVideoList,
        userVideoList: changeUserVideoList,
        videoList: changeVideoList,
        hotViewVideoList: changeHotViewVideoList,
        // 핫톡 주석
        // hotTalkVideoList: changeHotTalkVideoList,
        hotLikeVideoList: changeHotLikeVideoList,
        // 뉴비디오 주석
        // newVideoList: changeNewVideoList,
        openCategoryList: changeOpenCategoryList,
      };
    }
    case LIKE_VIDEO_FAILURE: {
      return {
        ...state,
        isLoadingLike: false,
      };
    }

    // 핫비디오 더 불러오기
    case GET_HOT_VIEW_VIDEO_REQUEST: {
      return { ...state, isLoadedMoreHotViewVideo: true };
    }
    case GET_HOT_VIEW_VIDEO_SUCCESS: {
      return {
        ...state,
        isLoadedMoreHotViewVideo: false,
        hotViewVideoList: state.hotViewVideoList.concat(action.data.videoList),
      };
    }
    case GET_HOT_VIEW_VIDEO_FAILURE: {
      return { ...state, isLoadedMoreHotViewVideo: false };
    }

    // 핫톡 주석
    // // 핫톡 비디오 더 불러오기
    // case GET_HOTTALK_VIDEO_REQUEST: {
    //   return {
    //     ...state,
    //     isLoadedMoreHotTalkVideo: true,
    //   };
    // }
    // case GET_HOTTALK_VIDEO_SUCCESS: {
    //   return {
    //     ...state,
    //     isLoadedMoreHotTalkVideo: false,
    //     hotTalkVideoList: state.hotTalkVideoList.concat(action.data.videoList),
    //   };
    // }
    // case GET_HOTTALK_VIDEO_FAILURE: {
    //   return {
    //     ...state,
    //     isLoadedMoreHotTalkVideo: false,
    //   };
    // }

    // 핫라이크 비디오 더 불러오기
    case GET_HOT_LIKE_VIDEO_REQUEST: {
      return { ...state, isLoadedMoreHotLikeVideo: true };
    }
    case GET_HOT_LIKE_VIDEO_SUCCESS: {
      return {
        ...state,
        isLoadedMoreHotLikeVideo: false,
        hotLikeVideoList: state.hotLikeVideoList.concat(action.data.videoList),
      };
    }
    case GET_HOT_LIKE_VIDEO_FAILURE: {
      return { ...state, isLoadedMoreHotLikeVideo: false };
    }

    // 뉴 비디오 더 불러오기
    case GET_NEW_VIDEO_REQUEST: {
      return {
        ...state,
        isLoadedMoreNewVideo: true,
      };
    }
    case GET_NEW_VIDEO_SUCCESS: {
      return {
        ...state,
        isLoadedMoreNewVideo: false,
        newVideoList: state.newVideoList.concat(action.data.videoList),
      };
    }
    case GET_NEW_VIDEO_FAILURE: {
      return {
        ...state,
        isLoadedMoreNewVideo: false,
      };
    }

    // 비디오 리스트 조회
    case INIT_VIDEOLIST_BEFORE_VIEW_VIDEO: {
      return {
        ...state,
        videoList: action.data.videoList,
      };
    }

    // 음소거 버튼 토글 (TOGGLE_MUTED)
    case TOGGLE_MUTED: {
      return {
        ...state,
        muted: action.data.muted,
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
