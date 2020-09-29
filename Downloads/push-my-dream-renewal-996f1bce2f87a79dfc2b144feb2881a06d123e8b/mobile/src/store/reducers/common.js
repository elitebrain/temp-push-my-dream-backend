const initialState = {
  categoryList: [], // 카테고리 리스트
  category2List: [], // 카테고리 리스트
  category3List: [], // 카테고리 리스트
  category4List: [], // 카테고리 리스트
  termsList: [], // 약관 리스트
  totalPushCount: 0,
  isPopup: false,
  isAdmin: false, // 어드민 관리자인지 확인
  agent: null,
  pushLimit: 0, // 일일 푸쉬 한도량
};

// agent 설정
export const SET_AGENT = "SET_AGENT";
// 팝업창 생성
export const ON_LOAD_POPUP = "ON_LOAD_POPUP";
// 로그인했다면 정보 불러오기
export const LOAD_COMMON_DATA_REQUEST = "LOAD_COMMON_DATA_REQUEST";
export const LOAD_COMMON_DATA_SUCCESS = "LOAD_COMMON_DATA_SUCCESS";
export const LOAD_COMMON_DATA_FAILURE = "LOAD_COMMON_DATA_FAILURE";

// 총 푸쉬 정보 조회
export const LOAD_ALL_PUSH_REQUEST = "LOAD_ALL_PUSH_REQUEST";
export const LOAD_ALL_PUSH_SUCCESS = "LOAD_ALL_PUSH_SUCCESS";
export const LOAD_ALL_PUSH_FAILURE = "LOAD_ALL_PUSH_FAILURE";

// 총 푸쉬 조회 SSE
export const SET_SSE_PUSH_REQUEST = "SET_SSE_PUSH_REQUEST";
export const SET_SSE_PUSH = "SET_SSE_PUSH";
export const SET_SSE_PUSH_FAILURE = "SET_SSE_PUSH_FAILURE";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AGENT: {
      return {
        ...state,
        agent: action.payload,
      };
    }
    // 팝업창 생성
    case ON_LOAD_POPUP: {
      return {
        ...state,
        isPopup: true,
      };
    }

    // 공통 정보 조회
    case LOAD_COMMON_DATA_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_COMMON_DATA_SUCCESS: {
      return {
        ...state,
        categoryList: action.data.categoryList,
        category2List: action.data.category2List,
        category3List: action.data.category3List,
        category4List: action.data.category4List,
        termsList: action.data.termsList,
        pushLimit: action.data.pushLimit,
        isAdmin: action.data.isAmin,
      };
    }
    case LOAD_COMMON_DATA_FAILURE: {
      return {
        ...state,
      };
    }

    // 푸쉬 정보 조회
    case LOAD_ALL_PUSH_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_ALL_PUSH_SUCCESS: {
      return {
        ...state,
        totalPushCount: action.data.push,
      };
    }
    case LOAD_ALL_PUSH_FAILURE: {
      return {
        ...state,
      };
    }

    /**
     *
     */

    case SET_SSE_PUSH_REQUEST: {
      return {
        ...state,
      };
    }
    case SET_SSE_PUSH: {
      return {
        ...state,
        totalPushCount: action.data.push,
      };
    }
    case SET_SSE_PUSH_FAILURE: {
      return {
        ...state,
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
