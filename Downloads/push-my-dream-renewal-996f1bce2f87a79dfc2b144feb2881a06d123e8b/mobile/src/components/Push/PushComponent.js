import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Layout from "components/Layout/Layout";
import PushModal from "components/Common/Modal/PushModal";
import PushBody from "components/Layout/PushBody";
import NewButton from "components/Common/NewButton";

import { numberWithCommas, strToInt } from "shared/functions";
import circleQuesition from "public/assets/icon/circle_question.svg";
import { OPEN_MODAL } from "store/reducers/modal";
import {
  COLOR_696C8C,
  BLUE_FONT_COLOR,
  WHITE_COLOR,
  COLOR_979CCA,
  BACKGROUND_BLACK_COLOR,
  COLOR_AE46E7,
} from "shared/constants/colors";
import TargetProfile from "./TargetProfile";

const PushComponent = ({
  season,
  handleConfirm,
  targetUser,
  push,
  setPush,
  isViewModal,
  openPushModal,
  closePushModal,
  myPushLimitInToday,
  myPush,
}) => {
  const Router = useRouter();

  console.log(myPush);

  // const [profileWidth, setProfileWidth] = useState("auto");
  // const [profileHeight, setProfileHeight] = useState("auto");

  const dispatch = useDispatch();
  const _handleChange = (e) => {
    const { value } = e.target;
    if (/^[0-9,]*$/.test(value)) {
      // 오늘 푸쉬한도보다 넘게 입력했을 시
      console.log(value, myPushLimitInToday);
      if (Number(value.replace(/,/g, "")) > myPushLimitInToday) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: "푸쉬 한도가 부족합니다.",
            isViewClose: false,
          },
        });
        return;
      }

      setPush(numberWithCommas(strToInt(value)));
    } else {
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: "숫자만 입력하세요.",
          isViewClose: false,
        },
      });
      setPush("");
    }
  };
  const _handlePush = () => {
    let content = "";
    const originalPush = Number(push.replace(/,/g, ""));

    if (push.length === 0) {
      content = "PUSH를 입력해주세요.";
    } else if (strToInt(push) < 1000) {
      content = "PUSH하기는 1,000 부터 가능합니다.";
    } else if (Number(originalPush) % 1000) {
      content = "푸시는 1000 단위로 입력해주세요.";
    } else if (
      Number(myPush.have_push) + Number(myPush.residual_push) <
      strToInt(push)
    ) {
      content = "보유 PUSH가 부족합니다. 충전 후 이용해주세요.";
    } else if (1000000 < strToInt(push)) {
      content = "일일 푸쉬 한도는 100만 PUSH입니다. 확인 후 이용해주세요.";
    }
    if (content.length > 0) {
      dispatch({
        type: OPEN_MODAL,
        data: {
          content,
          isViewClose: false,
        },
      });
    } else {
      openPushModal(targetUser.user_no);
    }
  };
  const _handleCharge = () => {
    Router.push(`/charging?ref=${Router.asPath}`);
  };
  const _handleConfirm = () => {
    handleConfirm(push);
  };

  const handleBack = useCallback(() => {
    Router.push(Router.push(decodeURIComponent(Router.query.ref)));
  }, [Router]);

  console.log(season);

  return (
    <>
      <PushBody
        title="푸쉬 하기"
        cancelText="취소"
        confirmText="푸쉬하기"
        handleConfirm={() => _handlePush()}
        handleBack={handleBack}
        contentPaddingNone
      >
        <div className="body">
          <TargetProfile
            season={season}
            targetUser={targetUser}
            totalPush={targetUser.totalPush}
            myPush={targetUser.myPush}
          />
          <div className="push_body">
            <div className="btn_box">
              <NewButton
                fontSize="12px"
                gradient
                bgColor={BACKGROUND_BLACK_COLOR}
                width="75px"
                height="35px"
                onClick={() => _handleCharge()}
              >
                충전 하기
              </NewButton>
            </div>
            <div className="section_title">
              <span className="title">내 잔액</span>
              <div className="available_push_container">
                <p className="available_push">
                  <span className="available_push_type">미사용</span>
                  <span className="available_push_value">
                    {numberWithCommas(myPush.have_push)}
                  </span>
                </p>
                {/* 1차 이후의 시즌이면 노출 */}
                {season.CATEGORY_LEVEL4.ordinalNumber > 1 && (
                  <p className="available_push">
                    <span className="available_push_type">{`${
                      season.CATEGORY_LEVEL4.ordinalNumber - 1
                    }차 예선 회수`}</span>
                    <span className="available_push_value recalmation">
                      {numberWithCommas(myPush.residual_push)}
                    </span>
                    <span className="available_push_unit">PUSH</span>
                  </p>
                )}
              </div>
            </div>
            <div className="box available_push">
              <span className="box_info">사용 가능</span>
              {/* <span className="box_value">{numberWithCommas(myPush.have_push)}</span> */}
              <span className="box_value">
                {numberWithCommas(
                  Number(myPush.have_push) + Number(myPush.residual_push)
                )}
              </span>
              <span className="box_label">PUSH</span>
            </div>
            <div className="push_notice">
              <div className="title">푸쉬 하기</div>
              <div className="my_push_limit">
                <span>오늘 푸쉬 가능 잔액</span>
                <span>{`${numberWithCommas(myPushLimitInToday)} PUSH`}</span>
              </div>
            </div>
            <div className="box">
              <input
                type="tel"
                placeholder="1,000 부터 가능"
                value={push}
                maxLength={numberWithCommas(myPush.have_push).length}
                onChange={_handleChange}
              />
              <span className="box_label">PUSH</span>
            </div>
            <span className="push_noti">일일 푸쉬 한도 : 100만 PUSH</span>
            <div className="question">
              <picture>
                <img src={circleQuesition} alt="question_ico" />
              </picture>
              <span>푸쉬하기란?</span>
            </div>
            <div className="answer">권리를 획득하기 위한 구매 행위입니다.</div>
          </div>
        </div>
      </PushBody>
      {isViewModal && (
        <PushModal
          closePushModal={closePushModal}
          // title="푸쉬 확인"
          cancelText="아니요"
          confirmText="네"
          handleCancel={closePushModal}
          handleConfirm={_handleConfirm}
        >
          <div className="modal_body">
            <div className="comment_box">
              <span className="white_bold">{targetUser.nickname}</span>님에게
            </div>
            <div className="comment_box">
              <em> {push}</em> <span className="push_title">PUSH</span> 를
            </div>
            <div className="comment_box">설정합니다.</div>
            <div className="white_bold question_text">진행 하시겠습니까?</div>
          </div>
        </PushModal>
      )}
      <style jsx>{`
        .available_push_container {
          /* width: 100%; */
          width: calc(100% - 43px);
          display: inline-block;
          text-align: right;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .available_push_container .available_push .available_push_type {
          margin-right: 7px;
          font-size: 12px;
          color: ${COLOR_696C8C};
          font-weight: normal;
        }
        .available_push_container .available_push .available_push_value {
          display: inline-block;
          min-width: 86px;
          text-align: right;
          font-weight: normal;
          font-size: 14px;
          color: #fff;
        }

        .available_push_container
          .available_push
          .available_push_value.recalmation {
          color: ${BLUE_FONT_COLOR};
        }
        .available_push_container .available_push .available_push_unit {
          color: #fff;
        }

        .body > .push_body {
          width: 100%;
          height: calc(100% - 90px);
          padding: 20px;
          box-sizing: border-box;
        }
        .push_body .btn_box {
          text-align: right;
          margin-bottom: 30px;
        }
        .push_body > .section_title {
          position: relative;

          margin-bottom: 6px;
        }

        .section_title {
          font-size: 14px;
          color: #fff;
        }
        .section_title .title {
          vertical-align: top;
          display: inline-block;
          font-weight: bold;
          font-size: 14px;
          color: ${COLOR_979CCA};
        }

        .push_body > .box {
          display: flex;
          align-items: center;
          width: 100%;
          height: 50px;
          line-height: 50px;
          border: 1px solid ${COLOR_696C8C};
          box-sizing: border-box;
          text-align: right;
          padding: 0 10px;
          border-radius: 5px;
          padding: 0px 15px;
        }

        .push_body > .box.available_push {
          border: 1px solid ${COLOR_696C8C};
          border-radius: 5px;
        }

        .box > .box_info {
          color: ${COLOR_696C8C};
          font-size: 12px;
          font-weight: normal;
        }

        .box > .box_value {
          flex: 1;
          color: ${WHITE_COLOR};
          font-weight: bold;
          font-size: 20px;
          display: inline-block;
          vertical-align: middle;
        }
        .box > input {
          flex: 1;
          width: 1px;
          border: initial;
          background-color: initial;
          text-align: right;
          font-size: 20px;
          color: ${COLOR_AE46E7};
          font-weight: normal;
        }
        .box > input::placeholder {
          font-size: 14px;
          color: ${COLOR_696C8C};
          font-weight: bold;
          font-weight: 400;
        }
        .box.available_push > .box_label {
          font-weight: normal;
          font-size: 12px;
          color: #fff;
        }

        .box > .box_label {
          font-size: 14px;
          color: #fff;
          margin-left: 15px;
          display: inline-block;
          vertical-align: middle;
        }

        .box > .box_label.available_push {
          font-size: 14px;
        }

        .push_notice {
          margin-top: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }
        .push_notice .title {
          font-weight: bold;
          font-size: 14px;
          color: ${COLOR_979CCA};
        }

        .my_push_limit {
          font-size: 12px;
          color: #fff;
          height: 18px;
          line-height: 18px;
          font-weight: normal;
        }
        .my_push_limit span:first-child {
          margin-right: 10px;
          color: ${COLOR_696C8C};
        }

        .my_push_limit > em {
          font-style: initial;
          font-weight: 700;
        }
        .push_noti {
          font-weight: 500;
          font-size: 12px;
          color: ${COLOR_696C8C};
        }
        .question {
          font-size: 12px;
          color: #fff;
          font-weight: 700;
          margin-top: 18px;
        }
        .question > picture,
        .question > span {
          display: inline-block;
          vertical-align: middle;
        }
        .question > picture {
          position: relative;
          width: 12px;
          height: 12px;
        }
        .question > picture > img {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .question > span {
          margin-left: 10px;
          font-weight: normal;
          font-size: 12px;
        }
        .answer {
          padding-left: 20px;
          font-weight: 500;
          font-size: 10px;
          color: ${COLOR_696C8C};
        }
        .body {
          font-size: 18px;
          color: #aaa;
          box-sizing: border-box;
          height: 100%;
          width: 100%;
        }
        .white_bold {
          color: #fff;
          font-weight: 700;
        }
        .comment_box {
          font-size: 20px;
        }
        .comment_box .push_title {
          font-size: 16px;
          font-weight: normal;
          color: #fff;
        }
        em {
          color: #fff;
          font-weight: normal;
          font-style: initial;
        }
        .question_text {
          text-align: center;
          margin: 55px 0;
        }
        .noti {
          font-size: 12px;
          text-align: center;
        }
        .modal_body {
          width: 185px;
          margin: 0 auto;
          color: ${COLOR_696C8C};
          padding-top: 60px;
        }
      `}</style>
    </>
  );
};

PushComponent.propTypes = {
  season: PropTypes.shape({
    CATEGORY_LEVEL2: PropTypes.shape({
      category_level2: PropTypes.string,
    }),
    CATEGORY_LEVEL3: PropTypes.shape({
      category_level3: PropTypes.string,
    }),
    CATEGORY_LEVEL4: PropTypes.shape({
      ordinalNumber: PropTypes.number,
    }),
  }),
  handleConfirm: PropTypes.func,
  targetUser: PropTypes.object,
  push: PropTypes.string,
  setPush: PropTypes.func,
  isViewModal: PropTypes.bool,
  openPushModal: PropTypes.func,
  closePushModal: PropTypes.func,
  myPushLimitInToday: PropTypes.number,
  myPush: PropTypes.shape({
    have_push: PropTypes.number,
    residual_push: PropTypes.number,
  }),
};

export default PushComponent;
