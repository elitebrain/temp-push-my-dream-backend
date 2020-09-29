const initialState = {
  user_no: "", // 유저 아이디
  email: "", // 이메일
  user_name: "", // 이름
  gender: "", // 성별
  country: "", // 나라
  birthdate: "", // 생일
  phone: "", // 핸드폰 번호
  nickname: "", // 별명
  user_photo: "", // 프로필 사진
  count_follower: 0, // 팔로워 수
  count_like: 0, // 좋아요 수
  facebook_url: "", // 페이스북 주소
  instagram_url: "", // 인스타그램 주소
  youtube_url: "", // 유튜브 주소
  blog_url: "", // 블로그 주소
  twitter_url: "", // 트위터 주소
  introduce: "", // 자기소개
  terms_apply_time: "", // 약관 동의 시간
  google_id: "", // 구글 아이디
  kakao_id: "", // 카카오 아이디
  naver_id: "", // 네이버 아이디
  local_id: "", // 로컬 아이디
  is_dreamer: false,
  is_producer: false,
  created_at: "", // 생성일
  ContestLogs: [], //contest 지원 리스트
  isLoggedIn: false, // 로그인 여부
  likeVideoList: [],
  likeUserList: [],
  followingList: [],

  isLoadingFollow: false, // 팔로잉 기능 동작 중 확인
};

// 로그인
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
// 로그아웃
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
// 회원가입
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
// 로그인했다면 정보 불러오기
export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";
// 사용자 정보 업데이트 불러오기
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
// 경연 참가 신청
export const APPLY_CONTEST_REQUEST = "APPLY_CONTEST_REQUEST";
export const APPLY_CONTEST_SUCCESS = "APPLY_CONTEST_SUCCESS";
export const APPLY_CONTEST_FAILURE = "APPLY_CONTEST_FAILURE";
// 회원 탈퇴
export const LEAVE_USER_REQUEST = "LEAVE_USER_REQUEST";
export const LEAVE_USER_SUCCESS = "LEAVE_USER_SUCCESS";
export const LEAVE_USER_FAILURE = "LEAVE_USER_FAILURE";
// 팔로우 신청
export const ADD_FOLLOW_REQUEST = "ADD_FOLLOW_REQUEST";
export const ADD_FOLLOW_SUCCESS = "ADD_FOLLOW_SUCCESS";
export const ADD_FOLLOW_FAILURE = "ADD_FOLLOW_FAILURE";
// 팔로우 신청
export const DELETE_FOLLOW_REQUEST = "DELETE_FOLLOW_REQUEST";
export const DELETE_FOLLOW_SUCCESS = "DELETE_FOLLOW_SUCCESS";
export const DELETE_FOLLOW_FAILURE = "DELETE_FOLLOW_FAILURE";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 로그인
    case LOG_IN_REQUEST: {
      return {
        ...state,
      };
    }
    case LOG_IN_SUCCESS: {
      delete action.data.phone;
      // 로그인 성공하면 email localStorage에 저장
      localStorage.setItem("email", action.data.email);
      // localStorage.setItem(
      //   "jwt",
      //   jwt.sign({ userNo: action.data.user_no }, "khanteum")
      // );
      return {
        ...state,
        isLoggedIn: true,
        ...action.data,
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
      };
    }

    // 로그아웃
    case LOG_OUT_REQUEST: {
      return {
        ...state,
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        ...initialState,
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
      };
    }

    // 로그인을 했다면 정보 불러오기
    case LOAD_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        ...action.data,
      };
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state,
      };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return { ...state, ...action.data };
    }
    case UPDATE_USER_FAILURE: {
      return { ...state };
    }

    case APPLY_CONTEST_REQUEST: {
      return {
        ...state,
      };
    }
    case APPLY_CONTEST_SUCCESS: {
      return {
        ...state,
        ContestLogs: state.ContestLogs.concat(action.data),
      };
    }
    case APPLY_CONTEST_FAILURE: {
      return {
        ...state,
      };
    }

    // 회원탈퇴
    case LEAVE_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case LEAVE_USER_SUCCESS: {
      return {
        ...state,
        ...initialState,
      };
    }
    case LEAVE_USER_FAILURE: {
      return {
        ...state,
      };
    }

    // 팔로우 추가
    case ADD_FOLLOW_REQUEST: {
      return { ...state, isLoadingFollow: true };
    }
    case ADD_FOLLOW_SUCCESS: {
      return {
        ...state,
        isLoadingFollow: false,
        followingList: [...state.followingList, action.data],
      };
    }
    case ADD_FOLLOW_FAILURE: {
      return { ...state, isLoadingFollow: false };
    }

    // 팔로우 삭제
    case DELETE_FOLLOW_REQUEST: {
      return { ...state, isLoadingFollow: true };
    }
    case DELETE_FOLLOW_SUCCESS: {
      return {
        ...state,
        isLoadingFollow: false,
        followingList: state.followingList.filter((v) => v !== action.data),
      };
    }
    case DELETE_FOLLOW_FAILURE: {
      return { ...state, isLoadingFollow: false };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
