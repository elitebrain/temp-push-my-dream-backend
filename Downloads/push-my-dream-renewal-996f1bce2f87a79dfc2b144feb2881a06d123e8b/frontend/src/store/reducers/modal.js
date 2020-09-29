const initialState = {
  view: false, // 모달창 오픈
  custom: false, // 모달 커스텀 여부
  container: null, // 모달창 안의 컨테이너
  content: "", // 모달창 커스텀 미진행시 텍스트
  confirmText: "", // 모달창 커스텀 미진행시 확인 버튼 텍스트
  onConfirm: null, // 모달창 커스텀 미진행시 확인 버튼 동작
  onClose: null, // 모달창 커스텀 미진행시 취소 버튼 동작
  isViewClose: false, // 모달창 커스텀 미진행시 취소 버튼 유무
  isClose: true, // 모달창 종료 가능 여부
};

export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 로그인을 했다면 정보 불러오기
    case OPEN_MODAL: {
      return {
        ...state,
        view: true,
        ...action.data,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        ...initialState,
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
