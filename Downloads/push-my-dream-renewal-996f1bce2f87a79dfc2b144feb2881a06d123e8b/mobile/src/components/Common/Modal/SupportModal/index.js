import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import qs from "query-string";

import Content from "components/Layout/Content";
import Noti from "components/Common/Noti";
import NewButton from "components/Common/NewButton";

import {
  GRADIENT_2B2C3F_020216,
  COLOR_696C8C,
  COLOR_979CCA,
  COLOR_BLACK,
  BACKGROUND_BLACK_COLOR,
  WHITE_COLOR,
} from "shared/constants/colors";
import { userApi } from "shared/api";
import { OPEN_MODAL, CLOSE_MODAL } from "store/reducers/modal";
import {
  getError,
  numberWithCommasAndCheckNone,
  numberWithCommas,
} from "shared/functions";

const SupportCheckModal = ({ onChangeCheckSupport, onPush, push, USER }) => {
  return (
    <div className="SupportCheckModal">
      <div className="Flex">
        <div className="SupportCheckModal_Info">
          <p>{`${USER.nickname}님께`}</p>
          <p>
            <strong>{`${numberWithCommas(push)} PUSH`}</strong>를
          </p>
          <p>후원 하시겠습니까?</p>
        </div>
      </div>
      <div className="Buttons">
        <NewButton
          bgColor="transparent"
          height="60px"
          fontSize="18px"
          style={{
            fontWeight: "bold",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
          color={COLOR_696C8C}
          onClick={onChangeCheckSupport}
        >
          취소
        </NewButton>
        <div className="line" />
        <NewButton
          bgColor="transparent"
          height="60px"
          fontSize="18px"
          style={{
            fontWeight: "bold",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
          onClick={onPush}
        >
          네
        </NewButton>
      </div>
      <style jsx>{`
        .SupportCheckModal .Flex {
          display: flex;
          justify-content: center;
        }
        .SupportCheckModal .Flex .SupportCheckModal_Info {
          font-size: 18px;
          line-height: 22px;
          color: ${WHITE_COLOR};
          margin-bottom: 20px;
          display: inline-block;
        }

        .SupportCheckModal .Flex .SupportCheckModal_Info strong {
          font-weight: 700;
        }

        .SupportCheckModal .Buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .SupportCheckModal .Buttons .ChargingButton {
          width: 100%;
        }

        .SupportCheckModal .Buttons .line {
          width: 1px;
          height: 60px;
          background-color: ${BACKGROUND_BLACK_COLOR};
        }
      `}</style>
    </div>
  );
};

const SupportModal = ({ currentVideo, onToggleViewComment }) => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.user);

  const [push, setPush] = useState("");
  const [isCheckSupport, setIsCheckSupport] = useState(false);
  // 푸시 여부
  const [isPushing, setIsPushing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [havePush, setHavePush] = useState(0);
  const [myPushLimitInToday, setMyPushLimitInToday] = useState(0);

  useEffect(() => {
    // const result = await userApi.get();

    const query = Object.assign({}, Router.query, {
      currentVideoNo: currentVideo.video_no,
    });

    delete query.type;

    if (!isLoggedIn) {
      openErrorModal({
        message: "로그인 후 이용이 가능합니다.",
        onConfirm() {
          Router.push({
            pathname: "/login",
            query: {
              ref: `/videos/${Router.query.type}?${qs.stringify(query)}`,
            },
          });
        },
        onClose() {
          Router.push({
            pathname: "/login",
            query: {
              ref: `/videos/${Router.query.type}?${qs.stringify(query)}`,
            },
          });
        },
      });
    } else {
      fectchMyLimitPushInToday();
    }

    /**
     * 현재 내 지갑의 푸쉬와 오늘의 푸쉬 한도 조회
     */
    async function fectchMyLimitPushInToday() {
      try {
        const result = await userApi.get("/me/push", {
          withCredentials: true,
        });

        setHavePush(result.data.have_push);
        setMyPushLimitInToday(result.data.myPushLimitInToday);
        setIsLoading(false);
      } catch (error) {
        openErrorModal({
          error,
        });
      }
    }
  }, [isLoggedIn, dispatch, Router, currentVideo]);

  /**
   *
   * 에러 출력 메세지
   */
  async function openErrorModal({ error, message, onConfirm, onClose }) {
    dispatch({
      type: OPEN_MODAL,
      data: {
        custom: false,
        content: getError(error, message),
        isViewClose: false,
        transparent: false,
        onConfirm,
        onClose,
      },
    });
    return;
  }

  /**
   *  후원 체크 모달 토글
   */
  const onChangeCheckSupport = useCallback(() => {
    setIsCheckSupport((prev) => !prev);
  }, []);

  /**
   * 푸쉬값 변경
   */
  const onChangePush = useCallback((e) => {
    /**
     * 000 같은 값이 있는 것을 number을 통해 제거하고 string으로 변환
     */
    const originalValue = String(Number(e.target.value.replace(/,/g, "")));

    // 숫자만 있거나 아무것도 입력이 안되어있을시
    if (/^[0-9]+$/.test(originalValue) || !originalValue.length) {
      setPush(originalValue.length === 0 ? "" : originalValue);
    }
  }, []);

  /**
   * 후원하기
   */
  const onPush = useCallback(async () => {
    if (!isPushing) {
      setIsPushing(true);

      try {
        await userApi.post(
          `/${currentVideo.USER.user_no}/support`,
          { push: Number(push), videoNo: currentVideo.video_no },
          {
            withCredentials: true,
          }
        );

        onToggleViewComment();
        dispatch({
          type: CLOSE_MODAL,
        });
      } catch (error) {
        console.error(error);
        openErrorModal({ error });
      }
    }
  }, [
    push,
    havePush,
    myPushLimitInToday,
    currentVideo.USER.user_no,
    dispatch,
    isPushing,
    onToggleViewComment,
  ]);

  /**
   * 후원 체크하기
   */
  const onCheckPush = useCallback(async () => {
    if (!Boolean(Math.floor(push / 1000))) {
      return openErrorModal({
        message: "후원 가능한 최소 푸시는 1000 이상입니다.",
      });
    }

    if (push % 1000) {
      return openErrorModal({
        message: "푸시는 1000 단위로 입력해주세요.",
      });
    }

    if (havePush < push) {
      return openErrorModal({
        message: "보유 PUSH가 부족합니다. 충전 후 이용해주세요.",
      });
    }

    if (myPushLimitInToday < push) {
      return openErrorModal({
        message: "당일 푸쉬 한도를 초과하였습니다.",
      });
    }

    onChangeCheckSupport();
  }, [push, havePush, myPushLimitInToday]);

  /**
   * 미로그인, 나의 푸시, 푸쉬 한도를 조회 하기 전까진 렌더링을 하지 않는다.
   */
  if (!isLoggedIn || isLoading) {
    return null;
  }

  return (
    <Content>
      <div className="SupportModal">
        {isCheckSupport ? (
          <SupportCheckModal
            push={push}
            USER={currentVideo.USER}
            onChangeCheckSupport={onChangeCheckSupport}
            onPush={onPush}
          />
        ) : (
          <>
            <Noti title="후원이란?" vertical verticalTitleWidth="80px">
              응원하고 싶은 아티스트에게 PUSH를 전송하여 활동에 도움을 줄 수
              있습니다.
            </Noti>
            <div className="SupportModal_Push">
              <p className="HavePush">{`내 지갑 : ${numberWithCommasAndCheckNone(
                havePush
              )}`}</p>
              <div className="Flex">
                <div className="InputBox">
                  <input
                    className="Input"
                    placeholder="-"
                    maxLength={
                      havePush === 0 ? 0 : numberWithCommas(havePush).length
                    }
                    value={!push ? "" : numberWithCommas(push)}
                    onChange={onChangePush}
                  />
                </div>
                <div className="Unit">PUSH</div>
              </div>
              <p className="PushLimit">{`일일  한도 : ${numberWithCommasAndCheckNone(
                myPushLimitInToday
              )}`}</p>
            </div>
            <div className="Buttons">
              <Link href="/charging">
                <a className="ChargingButton">
                  <NewButton
                    bgColor="transparent"
                    height="60px"
                    fontSize="18px"
                    style={{
                      fontWeight: "bold",
                      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                    onClick={() =>
                      sessionStorage.setItem(
                        "charging_ref",
                        location.pathname + location.search
                      )
                    }
                  >
                    PUSH 충전
                  </NewButton>
                </a>
              </Link>
              <div className="line" />
              <NewButton
                bgColor="transparent"
                height="60px"
                fontSize="18px"
                style={{
                  fontWeight: "bold",
                  textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
                onClick={onCheckPush}
              >
                후원
              </NewButton>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .LoaderContainer {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .SupportModal {
          max-width: 380px;
          width: calc(100vw - 40px);
          margin: 0 auto;
          border-radius: 15px;
          background-image: ${GRADIENT_2B2C3F_020216(180)};
          box-sizing: border-box;
          padding: 20px 20px 0 20px;
        }

        .SupportModal_Push {
          margin: 15px 0 5px 0;
          color: ${COLOR_696C8C};
        }

        .SupportModal_Push .HavePush {
          font-weight: bold;
          font-size: 12px;
          line-height: 15px;
          margin-bottom: 5px;
        }

        .SupportModal_Push .PushLimit {
          margin-top: 5px;
          font-size: 10px;
          color: ${COLOR_696C8C};
        }

        .SupportModal_Push .Flex {
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .SupportModal_Push .Flex .InputBox {
          flex: 1;
          height: 40px;
          margin-right: 10px;
        }

        .SupportModal_Push .Flex .Input {
          box-sizing: border-box;
          width: 100%;
          height: 40px;
          text-align: right;
          padding: 0 20px;
          background-color: ${COLOR_979CCA};
          box-shadow: 2px -2px 6px rgba(0, 0, 0, 0.25);
          border-radius: 5px;
          color: ${COLOR_BLACK};
          border: none;
          font-weight: bold;
          font-size: 18px;
        }

        .SupportModal_Push .Flex .Input::placeholder {
          color: ${COLOR_BLACK};
        }
        .SupportModal_Push .Flex .Unit {
          flex-basis: 55px;
          font-weight: 800;
          font-size: 18px;
          text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        }

        .Buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .Buttons .ChargingButton {
          width: 100%;
        }

        .Buttons .line {
          width: 1px;
          height: 60px;
          background-color: ${BACKGROUND_BLACK_COLOR};
        }
      `}</style>
    </Content>
  );
};

SupportModal.propTypes = {
  currentVideo: PropTypes.shape({
    USER: PropTypes.shape({
      user_no: PropTypes.number,
    }),
    video_no: PropTypes.number,
  }),
  onToggleViewComment: PropTypes.func,
};

export default React.memo(SupportModal);
