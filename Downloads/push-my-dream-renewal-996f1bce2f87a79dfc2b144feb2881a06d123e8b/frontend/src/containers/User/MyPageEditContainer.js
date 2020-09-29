import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";

import { userApi } from "shared/api";
import MyPageEditComponent from "components/User/MyPageEdit/MyPageEditComponent";

import { OPEN_MODAL } from "store/reducers/modal";
import { LEAVE_USER_REQUEST } from "store/reducers/user";

const MyPageEditContainer = () => {
  const dispatch = useDispatch();
  const [myInfo, setMyInfo] = useState({});

  useEffect(() => {
    userApi.get("/edit-info", { withCredentials: true }).then((res) => {
      if (res.data) {
        setMyInfo(res.data);
      }
    });
  }, []);
  const _handleSave = (formData) => {
    userApi
      .put("/edit-info", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data && res.data[1]) {
          alert("저장되었습니다.");
          Router.push("/mypage");
        }
      });
  };

  // 회원탈퇴 모달창생성
  const _handleLeaveAccountModal = useCallback(() => {
    dispatch({
      type: OPEN_MODAL,
      data: {
        content: (
          <>
            <h5>회원 가입 탈퇴를 진행하시겠습니까?</h5>
            <h5>탈퇴 후 기존 정보 복구가 불가능합니다.</h5>
          </>
        ),
        confirmText: "탈퇴",
        onConfirm: _handleLeaveAccount,
        isViewClose: true,
      },
    });
  }, [dispatch]);

  // 회원탈퇴
  const _handleLeaveAccount = useCallback(() => {
    dispatch({ type: LEAVE_USER_REQUEST });
  }, [dispatch]);

  return (
    <MyPageEditComponent
      myInfo={myInfo}
      handleSave={_handleSave}
      handleLeaveAccountModal={_handleLeaveAccountModal}
    />
  );
};

export default MyPageEditContainer;
