const initialState = {
  newVideoOffset: 0,
  hotVideoOffset: 0,
  viewVideoOffset: 0,
  scrollTop: 0,
  lastToptenIdx: 0
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
