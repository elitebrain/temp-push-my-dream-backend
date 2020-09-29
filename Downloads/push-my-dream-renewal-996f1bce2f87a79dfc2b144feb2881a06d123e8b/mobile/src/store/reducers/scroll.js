const initialState = {
  hotViewScroll: 0,
  // 핫톡 주석
  // hotTalkScroll: 0,
  hotLikeScroll: 0,
  documentScroll: 0,
  openCategoryScroll: [],

  // realtimeSurgeLikeScrollInCategory: 0,
  // realtimeSurgeTalkTalkScrollInCategory: 0,
  // hotLikeScrollInCategory: 0,
  // hotViewScrollInCategory: 0,
  // hotTalkScrollInCategory: 0,
  // seasonLikeScrollInCategory: 0,
  // seasonViewScrollInCategory: 0,
  realtimeSurgePushScrollInCategory: 0,
  hotPushScrollInCategory: 0,
  seasonPushScrollInCategory: 0,
  documentScrollInCategory: 0,
};

export const SET_MAIN_SCROLL = "SET_MAIN_SCROLL";
export const SET_CATEGORY_SCROLL = "SET_CATEGORY_SCROLL";

export const INIT_MAIN_SCROLL = "INIT_MAIN_SCROLL";
export const INIT_CATEGORY_SCROLL = "INIT_CATEGORY_SCROLL";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAIN_SCROLL: {
      return {
        ...state,
        hotViewScroll: action.data.hotViewScroll,
        hotTalkScroll: action.data.hotTalkScroll,
        hotLikeScroll: action.data.hotLikeScroll,
        openCategoryScroll: action.data.openCategoryScroll,
        documentScroll: action.data.documentScroll,
      };
    }

    case INIT_MAIN_SCROLL: {
      return {
        ...state,
        hotViewScroll: 0,
        hotTalkScroll: 0,
        hotLikeScroll: 0,
        documentScroll: 0,
        openCategoryScroll: [],
      };
    }

    case SET_CATEGORY_SCROLL: {
      return {
        ...state,
        // realtimeSurgeLikeScrollInCategory:
        //   action.data.realtimeSurgeLikeScrollInCategory,
        // realtimeSurgeTalkTalkScrollInCategory:
        //   action.data.realtimeSurgeTalkTalkScrollInCategory,
        // hotLikeScrollInCategory: action.data.hotLikeScrollInCategory,
        // hotViewScrollInCategory: action.data.hotViewScrollInCategory,
        // hotTalkScrollInCategory: action.data.hotTalkScrollInCategory,
        // seasonLikeScrollInCategory: action.data.seasonLikeScrollInCategory,
        // seasonViewScrollInCategory: action.data.seasonViewScrollInCategory,
        realtimeSurgePushScrollInCategory:
          action.data.realtimeSurgePushScrollInCategory,
        hotPushScrollInCategory: action.data.hotPushScrollInCategory,
        seasonPushScrollInCategory: action.data.seasonPushScrollInCategory,
        documentScrollInCategory: action.data.documentScrollInCategory,
      };
    }

    case INIT_CATEGORY_SCROLL: {
      return {
        ...state,
        // realtimeSurgeLikeScrollInCategory: 0,
        // realtimeSurgeTalkTalkScrollInCategory: 0,
        // hotLikeScrollInCategory: 0,
        // hotViewScrollInCategory: 0,
        // hotTalkScrollInCategory: 0,
        // seasonLikeScrollInCategory: 0,
        // seasonViewScrollInCategory: 0,
        realtimeSurgePushScrollInCategory: 0,
        hotPushScrollInCategory: 0,
        seasonPushScrollInCategory: 0,
        documentScrollInCategory: 0,
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
