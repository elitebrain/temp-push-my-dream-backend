import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { userApi } from "shared/api";
import PushComponent from "components/Push/PushComponent";
import { strToInt, getError } from "shared/functions";
import { OPEN_MODAL } from "store/reducers/modal";
import { SEND_PUSH } from "store/reducers/user";
import PushCompleteContainer from "containers/Push/PushCompleteContainer";

const PushContainer = ({ season, targetUser, myPushLimitInToday, myPush }) => {
  const Router = useRouter();
  const [isLoadingPush, setIsLoadingPush] = useState(false); // 푸쉬 동작중 여부 (광클 방지)
  const [addPoint, setAddPoint] = useState(0); // 푸쉬 시 얻는 포인트

  const [isViewModal, setIsViewModal] = useState(false);
  const [push, setPush] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const dispatch = useDispatch();

  console.log(season);

  const _openPushModal = () => {
    setIsViewModal(true);
    document.querySelector("body").style.overflow = "hidden";
  };
  const _closePushModal = () => {
    setIsViewModal(false);
    document.querySelector("body").style.overflow = "auto";
  };
  const _handleConfirmPush = async (push) => {
    console.log("_handleConfirmPush", strToInt(push));
    // if (content.length > 0) {
    //   dispatch({
    //     type: OPEN_MODAL,
    //     data: {
    //       content,
    //     },
    //   });
    // } else {
    const sendData = {
      push: strToInt(push),
    };

    // 현재 푸쉬 기능이 동작중인지 체크
    // 동작 중이지 않을 때만 ajax를 실행한다.
    if (!isLoadingPush) {
      setIsLoadingPush(true);
      try {
        const originalPush = Number(push.replace(/,/g, ""));

        // if (!Boolean(Math.floor(originalPush / 1000))) {
        //   return openErrorModal({
        //     message: "후원 가능한 최소 푸시는 1000 이상입니다.",
        //   });
        // }

        // if (originalPush % 1000) {
        //   return openErrorModal({
        //     message: "푸시는 1000 단위로 입력해주세요.",
        //   });
        // }

        if (myPush.have_push < originalPush) {
          return openErrorModal({
            message: "보유 PUSH가 부족합니다. 충전 후 이용해주세요.",
          });
        }

        if (myPushLimitInToday < originalPush) {
          return openErrorModal({
            message: "당일 푸쉬 한도를 초과하였습니다.",
          });
        }

        const result = await userApi.post(
          `/${targetUser.user_no}/push`,
          {
            ...sendData,
            videoNo: Router.query.videoNo,

            category4No: season.category_level4_no,
          },
          { withCredentials: true }
        );

        setAddPoint(result.data.addPoint);
        setIsLoadingPush(false);
        setIsComplete(true);
        _closePushModal();
        console.log(isLoadingPush);
      } catch (error) {
        console.log(error);
        return openErrorModal({ error });
      }
    } else {
      console.log("guard!!!");
    }

    /**
     *
     * 에러 출력 메세지
     */
    async function openErrorModal({ error, message }) {
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: getError(error, message),
          isViewClose: false,
        },
      });
      setPush("");
      setIsLoadingPush(false);
      _closePushModal();
      return;
    }
  };

  console.log(myPushLimitInToday);

  return isComplete ? (
    <PushCompleteContainer
      targetUser={targetUser}
      push={strToInt(push)}
      addPoint={addPoint}
      season={season}
    />
  ) : (
    <PushComponent
      season={season}
      handleConfirm={_handleConfirmPush}
      targetUser={targetUser}
      push={push}
      setPush={setPush}
      isViewModal={isViewModal}
      openPushModal={_openPushModal}
      closePushModal={_closePushModal}
      myPushLimitInToday={myPushLimitInToday}
      myPush={myPush}
    />
  );
};

PushContainer.propTypes = {
  closePushModal: PropTypes.func,
  handleConfirmPush: PropTypes.func,
  targetUser: PropTypes.object,

  myPushLimitInToday: PropTypes.number,
  myPush: PropTypes.object,
};

export default PushContainer;
