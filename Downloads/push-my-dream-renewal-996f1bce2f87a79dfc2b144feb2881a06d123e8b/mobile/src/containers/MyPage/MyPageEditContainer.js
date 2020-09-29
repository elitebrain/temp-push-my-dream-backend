import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";

import { userApi } from "shared/api";
import MyPageEditComponent from "components/User/MyPageEdit/MyPageEditComponent";
import { OPEN_MODAL } from "store/reducers/modal";
import { LEAVE_USER_REQUEST } from "store/reducers/user";
import { getError } from "shared/functions";

const MyPageEditContainer = ({ editPhone }) => {
  const dispatch = useDispatch();
  const [myInfo, setMyInfo] = useState({});
  const [isDeleteProfileImage, setIsDeleteProfileImage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi.get("/edit-info", { withCredentials: true }).then((res) => {
      if (res.data) {
        setMyInfo(
          Object.assign({}, res.data, {
            phone: editPhone
              ? `${editPhone.slice(0, 3)}-${editPhone
                  .slice(3)
                  .replace(/\B(?=(\d{4})+(?!\d))/, "-")}`
              : res.data.phone,
          })
        );
        setLoading(false);
      }
    });
  }, [editPhone]);

  const _handleSave = (formData) => {
    userApi
      .put("/edit-info", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "저장되었습니다.",
            onConfirm() {
              Router.push("/mypage");
            },
            onClose() {
              Router.push("/mypage");
            },
            isViewClose: false,
          },
        });
      })
      .catch((error) => {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content:
              error.response.data.e === 1 ? (
                <p>
                  사용할 수 없는
                  <br />
                  닉네임 입니다.
                </p>
              ) : error.response.data.e === 2 ? (
                <p>
                  15일 이내에
                  <br />
                  닉네임을 변경한
                  <br />
                  이력이 있어
                  <br />
                  변경이 불가능합니다.
                </p>
              ) : (
                getError(error)
              ),
            isViewClose: false,
          },
        });
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
  console.log(Router);
  // 회원탈퇴
  const _handleLeaveAccount = useCallback(() => {
    dispatch({ type: LEAVE_USER_REQUEST });
  }, [dispatch]);

  return (
    <MyPageEditComponent
      myInfo={myInfo}
      handleSave={_handleSave}
      loading={loading}
      handleLeaveAccountModal={_handleLeaveAccountModal}
      isDeleteProfileImage={isDeleteProfileImage}
      setIsDeleteProfileImage={setIsDeleteProfileImage}
    />
  );
};

export default MyPageEditContainer;
