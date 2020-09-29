const initialState = {
  myVideoList: [], // 내 비디오 리스트
  isMyVideoListLoaded: false, // 내 비디오 리스트 조회 상태
  currentVideo: {
    video_no: "",
    category_level1_no: "",
    title: "",
    description: "",
    count_like: "",
    count_view: "",
    url_1080p: "",
    thumbnail: "",
    created_at: "",
    USER: { user_no: "", user_photo: "", user_name: "" },
    active_log_no: ""
  }, // 비디오
  videoList: [], // 비디오 리스트
  uploadPercent: 0,
  // 업로드
  isVideoUpLoaded: false, // 비디오 업로드 상태
  isConvertedLoaded: false, // 비디오 컨버팅 상태
  isFinishedUpLoaded: false, // 업로드 완료 상태
  uploadVideo: {}, // upload 중인 비디오
  errorVideoUpLoaded: false,
  errorConvertedLoad: false,
  uploadErrorMessage: ""
};

// 내 비디오 조회
export const GET_MYVIDEOLIST_REQUEST = "GET_MYVIDEOLIST_REQUEST";
export const GET_MYVIDEOLIST_SUCCESS = "GET_MYVIDEOLIST_SUCCESS";
export const GET_MYVIDEOLIST_FAILURE = "GET_MYVIDEOLIST_FAILURE";

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
export const GET_VIDEO_REQUEST = "GET_VIDEO_REQUEST";
export const GET_VIDEO_SUCCESS = "GET_VIDEO_SUCCESS";
export const GET_VIDEO_FAILURE = "GET_VIDEO_FAILURE";

// 비디오 좋아요
export const LIKE_VIDEO_REQUEST = "LIKE_VIDEO_REQUEST";
export const LIKE_VIDEO_SUCCESS = "LIKE_VIDEO_SUCCESS";
export const LIKE_VIDEO_FAILURE = "LIKE_VIDEO_FAILURE";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 비디오 조회
    case GET_VIDEO_REQUEST: {
      return { ...state };
    }
    case GET_VIDEO_SUCCESS: {
      return { ...state, currentVideo: action.data };
    }
    case GET_VIDEO_FAILURE: {
      return { ...state };
    }

    // 내 비디오 리스트 조회
    case GET_MYVIDEOLIST_REQUEST: {
      return { ...state, isMyVideoListLoaded: true };
    }
    case GET_MYVIDEOLIST_SUCCESS: {
      return {
        ...state,
        isMyVideoListLoaded: false,
        myVideoList: [...action.data]
      };
    }
    case GET_MYVIDEOLIST_FAILURE: {
      return { ...state, isMyVideoListLoaded: false };
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
        uploadPercent: 0
      };
    }

    case UPLOAD_VIDEO_REQUEST: {
      return {
        ...state,
        isVideoUpLoaded: true,
        uploadVideo: {},
        uploadPercent: 0
      };
    }
    case UPLOAD_PROGRESS: {
      return {
        ...state,
        uploadPercent: action.data
      };
    }
    case UPLOAD_VIDEO_SUCCESS: {
      return {
        ...state,
        uploadVideo: action.data,
        isVideoUpLoaded: true,
        isConvertedLoaded: true,
        uploadPercent: 0
      };
    }
    case UPLOAD_VIDEO_FAILURE: {
      return {
        ...state,
        isVideoUpLoaded: false,
        isConvertedLoaded: false,
        errorVideoUpLoaded: true,
        uploadErrorMessage: action.data,
        uploadPercent: 0
      };
    }

    // 비디오 공개 유무
    case UPDATE_VIDEO_ISOPEN_REQUEST: {
      return {
        ...state
      };
    }
    case UPDATE_VIDEO_ISOPEN_SUCCESS: {
      const { videoNo, flag } = action.data;

      const changeList = [...state.myVideoList];
      const index = changeList.findIndex(video => video.video_no === videoNo);

      changeList[index] = {
        ...changeList[index],
        flag
      };

      return {
        ...state,
        myVideoList: changeList
      };
    }
    case UPDATE_VIDEO_ISOPEN_FAILURE: {
      return {
        ...state
      };
    }

    // 영상 변환
    case GET_VIDEO_CONVERT_REQUEST: {
      return {
        ...state,
        isConvertedLoaded: true
      };
    }
    case GET_VIDEO_CONVERT_SUCCESS: {
      return {
        ...state,
        myVideoList: [action.data, ...state.myVideoList],
        isVideoUpLoaded: false,
        isConvertedLoaded: false,
        isFinishedUpLoaded: true
      };
    }
    case GET_VIDEO_CONVERT_FAILURE: {
      return {
        ...state,
        isConvertedLoaded: false,
        errorVideoUpLoaded: true,
        uploadErrorMessage: action.data
      };
    }

    // 영상 변환
    case DELETE_VIDEO_REQUEST: {
      return {
        ...state
      };
    }
    case DELETE_VIDEO_SUCCESS: {
      return {
        ...state,
        myVideoList: state.myVideoList.filter(
          video => video.video_no !== action.data
        )
      };
    }
    case DELETE_VIDEO_FAILURE: {
      return {
        ...state
      };
    }

    default: {
      return {
        ...state
      };
    }
  }
};

export default reducer;
