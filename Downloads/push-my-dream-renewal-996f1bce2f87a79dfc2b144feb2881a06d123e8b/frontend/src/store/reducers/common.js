const initialState = {
  categoryList: [], // 카테고리 리스트
  category2List: [], // 카테고리 리스트
  category3List: [], // 카테고리 리스트
  termsList: [], // 약관 리스트
  totalPushCount: 1000000000,
  isViewMainCounterAnimate: true,
  isPopup: false,
  isAdmin: false, // 어드민인지 확인
  isViewHeader: true, // 헤더 노출 여부
};

// 팝업창 생성
export const ON_LOAD_POPUP = "ON_LOAD_POPUP";
// 로그인했다면 정보 불러오기
export const LOAD_COMMON_DATA_REQUEST = "LOAD_COMMON_DATA_REQUEST";
export const LOAD_COMMON_DATA_SUCCESS = "LOAD_COMMON_DATA_SUCCESS";
export const LOAD_COMMON_DATA_FAILURE = "LOAD_COMMON_DATA_FAILURE";
// 메인 카운터 에니메이트 한 번이라도 봤으면 리프레시 이전까진 보여주지 않기
export const VIEW_MAIN_COUNTER_ANIMATE = "VIEW_MAIN_COUNTER_ANIMATE";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 팝업창 생성
    case ON_LOAD_POPUP: {
      return {
        ...state,
        isPopup: true,
      };
    }

    // 로그인을 했다면 정보 불러오기
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
        termsList: action.data.termsList,
        isAdmin: action.data.isAdmin,
      };
    }
    case LOAD_COMMON_DATA_FAILURE: {
      return {
        ...state,
      };
    }
    case VIEW_MAIN_COUNTER_ANIMATE: {
      return {
        ...state,
        isViewMainCounterAnimate: false,
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
