const initialState = {
  newVideoOffset: 0,
  hotVideoOffset: 0,
  viewVideoOffset: 0,
  officialVideoOffset: 0,
  lastRealIdx: 0,
  scrollTop: 0,
  uploaderScrollTop: 0
};

export const MORE_VIDEO = "MORE_VIDEO";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MORE_VIDEO: {
      return { ...state, ...action.data };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default reducer;
