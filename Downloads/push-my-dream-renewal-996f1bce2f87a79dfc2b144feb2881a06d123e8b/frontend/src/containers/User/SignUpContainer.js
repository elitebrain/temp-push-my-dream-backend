import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { userApi } from "shared/api";

import { BLACK_COLOR } from "shared/constants/colors";
import { getError } from "shared/functions";

import Background from "components/Common/Background";
import PreReservationTitle from "components/Common/PreReservationTitle";
import SignUpComponent from "components/User/SignUp";

import { OPEN_MODAL } from "store/reducers/modal";

function getNavigationList(preReservation, isFund) {
  const arr = [];

  if (["dreamer", "producer"].indexOf(preReservation) !== -1) {
    arr.push(preReservation.toUpperCase());
    arr.push(
      `${isFund ? "펀딩" : ""}
      ${preReservation === "dreamer" ? "경연" : "프로듀싱"}`
    );
    arr.push(getTitle(preReservation, isFund));
  } else {
    arr.push("회원가입");
  }

  return arr;
}

function getTitle(preReservation, isFund) {
  return preReservation === "dreamer"
    ? isFund
      ? "펀딩 사전예약"
      : "경연 참가 신청"
    : preReservation === "producer"
    ? "프로듀서 사전예약"
    : "회원가입";
}

const SignUpContainer = () => {
  const { preReservation, isFund } = useRouter().query;
  const [page, setPage] = useState(1);
  const [termsList, setTermsList] = useState([]);
  const {
    categoryList: {
      [0]: { CATEGORY_LEVEL2: contestCategoryList },
    },
    termsList: tempTermsList,
  } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  // const [socket, setSocket] = useState(null);
  useEffect(() => {
    const arrTermsList = [];
    for (let i = 0; i < tempTermsList.length; i++) {
      let id;
      if (tempTermsList[i].terms_gubun === "이용 약관") {
        id = "termsService";
      } else if (tempTermsList[i].terms_gubun === "개인정보 처리 방침") {
        id = "termsPrivacy";
      } else if (tempTermsList[i].terms_gubun === "수수료 정책") {
        id = "termsCharge";
      } else if (tempTermsList[i].terms_gubun === "청소년 보호 정책") {
        id = "termsYouth";
      }
      arrTermsList.push(Object.assign({}, tempTermsList[i], { id }));
    }
    setTermsList(arrTermsList);
  }, []);

  // 페이지 이동 헨들러
  const _handlePage = useCallback((_page) => {
    setPage(_page);
  }, []);

  // 회원가입 헨들러
  const _handleSignUp = useCallback(
    async (formData) => {
      try {
        const result = await userApi.post("/sign-up", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        if (result) {
          _handlePage(0);
        }
      } catch (error) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: getError(error),
          },
        });
      }
    },
    [dispatch]
  );

  return (
    <Background
      width="100%"
      color={BLACK_COLOR}
      className="content"
      style={{ minWidth: "1366px" }}
    >
      <Background
        width="100%"
        // height="765px"
        color={BLACK_COLOR}
        className="m_center"
        style={{ paddingBottom: "166px" }}
      >
        <PreReservationTitle
          title={getTitle(preReservation, isFund)}
          navigationList={getNavigationList(preReservation, isFund)}
        />
        <SignUpComponent
          handlePage={_handlePage}
          page={page}
          preReservation={preReservation}
          isFund={isFund}
          handleSignUp={_handleSignUp}
          termsList={termsList}
          contestCategoryList={contestCategoryList}
        />
      </Background>
    </Background>
  );
};

export default SignUpContainer;
