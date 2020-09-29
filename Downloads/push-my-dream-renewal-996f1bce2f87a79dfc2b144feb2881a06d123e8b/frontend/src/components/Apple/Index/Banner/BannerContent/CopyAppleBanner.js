import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Router from "next/router";

import { OPEN_MODAL } from "store/reducers/modal";
import { APPLE_COLOR } from "shared/constants/colors";

import Content from "components/Layout/Content";
import Button from "components/Common/Button";

const CopyAppleBanner = (props) => {
  const { date, category, desc, badge } = props;
  const [viewNoti, setViewNoti] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    /* animation의 시간은 위 useEffect안의 timeout 시간과 일치해야합니다. */
    let timeout = setTimeout(() => {
      setViewNoti((prev) => (!!prev ? 0 : 1));
    }, 3000);

    function cleanup() {
      clearTimeout(timeout);
    }
  }, [viewNoti]);

  const _goEmergenzaApply = useCallback(() => {
    Router.push("/emergenza/notice");
  }, [Router]);
  const _goEmergenzaVote = useCallback(() => {
    dispatch({
      type: OPEN_MODAL,
      data: {
        content: (
          <>
            <p>투표사전예약을 위해</p>
            <p>event.khanteum.com 으로 이동합니다.</p>
          </>
        ),
        onConfirm() {
          window.location.href =
            "https://event.khanteum.com/pre/emergenza/vote";
        },
        isViewClose: true,
      },
    });
  }, [dispatch]);

  return (
    <Content>
      <div className="container">
        <div className="wrapper">
          <div className="box">
            <div className="scale_container scale_container_1">
              <div className="scale_box">
                <div className="scale1" />
                <div className="scale2" />
              </div>
            </div>
            <div className="scale_container scale_container_2">
              <div className="scale_box">
                <div className="scale1" />
                <div className="scale2" />
              </div>
            </div>
            <div className="scale_container scale_container_3">
              <div className="scale_box">
                <div className="scale1" />
                <div className="scale2" />
              </div>
            </div>
            <div className="scale_container scale_container_4">
              <div className="scale_box">
                <div className="scale1" />
                <div className="scale2" />
              </div>
            </div>
            <div className="scale_container scale_container_5">
              <div className="scale_box">
                <div className="scale1" />
                <div className="scale2" />
              </div>
            </div>
            <span className="badge">{badge}</span>
            <h1>{date}</h1>
            <h1 className="fw_bold mb_15px">{category}</h1>
            <h3 className="desc">{desc}</h3>
            <div>
              {/* <Link href="/emergenza/apply"> */}
              <Button
                className="bg_black wide br_none"
                style={{ marginTop: "20px", marginRight: "20px" }}
                handleClick={() => _goEmergenzaApply()}
              >
                참가영상등록
              </Button>
            </div>
          </div>
        </div>
        <div className="noti_box">
          {viewNoti === 0 && (
            <div className="noti">
              <div className="title">PUSH MY APPLE 참여 안내</div>
              <div className="content">
                <div className="content_list">
                  <div className="part_title">참여 방법</div>
                  <div className="part">
                    {`자신의 건강하고 아름다운 몸짱 영상을
                    업로드 해 주세요!`}
                  </div>
                </div>
                <div className="content_list">
                  <div className="part_title">참여 및 심사 기간</div>
                  <div className="part">{`2월 17일 ~ 2월 21일 24:00`}</div>
                </div>
                <div className="content_list">
                  <div className="part_title">심사 기준</div>
                  <div className="part">
                    {`내가 올린 모든 영상의
                    기간 내 조회 수(50%) + 좋아요 수(50%)`}
                  </div>
                </div>
              </div>
            </div>
          )}
          {viewNoti === 1 && (
            <div className="noti">
              <div className="title">PUSH MY APPLE 참여 안내</div>
              <div className="content">
                <div className="content_list">
                  <div className="part_title">우승 혜택</div>
                  <div className="part">
                    {`매주 50만원의 상금과
                      APPLE Party 초대권 등`}
                  </div>
                </div>
                <div className="content_list">
                  <div className="part_title">PUSH MY APPLE PARTY</div>
                  <div className="part">
                    {`이태원 클럽(예정)
                      2월 28일 20시
                      명품백(지방*, 발렌시아*, 버버* 등)
                      및 바르바셀 화장, 
                      1개월 콘텐츠 제작 지원 등 제공`}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="sub_noti">
            * 자세한 내용은 공지 사항을 확인해주세요.
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 716px;
          position: relative;
        }
        .wrapper {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
        }
        .box {
          position: relative;
        }
        h1 {
          font-size: 50px;
          /* color: #fff; */
        }
        h3 {
          font-size: 20px;
          /* color: #fff; */
        }
        .fw_bold {
          font-weight: 700;
        }
        .mb_15px {
          margin-bottom: 15px;
        }
        .desc {
          position: relative;
          margin-left: 44px;
        }
        .container .wrapper .box .badge {
          line-height: 35px;
          height: 35px;
          background-color: rgba(255, 255, 255, 0.4);
          border-radius: 10px;
          padding: 0 10px;
          font-size: 18px;
          color: ${APPLE_COLOR};
          position: relative;
        }
        .scale_container_1 {
          position: absolute;
          top: 18px;
          left: -20px;
        }
        .scale_container_2 {
          position: absolute;
          top: -25px;
          left: 80px;
        }
        .scale_container_3 {
          position: absolute;
          top: 18px;
          left: 220px;
        }
        .scale_container_4 {
          position: absolute;
          bottom: 80px;
          left: 20px;
        }
        .scale_container_5 {
          position: absolute;
          bottom: 100px;
          right: 20px;
        }
        .scale_container .scale_box {
          position: relative;
        }
        .scale_container_1 .scale_box .scale1,
        .scale_container_2 .scale_box .scale1,
        .scale_container_3 .scale_box .scale1,
        .scale_container_4 .scale_box .scale1,
        .scale_container_5 .scale_box .scale1 {
          position: absolute;
          width: 5px;
          height: 5px;
          background-color: rgba(251, 33, 80, 0.4);
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .scale_container_1 .scale_box .scale1 {
          animation: scale 2s linear 0.2s infinite;
        }
        .scale_container_2 .scale_box .scale1 {
          animation: scale 2s linear 0.5s infinite;
        }
        .scale_container_3 .scale_box .scale1 {
          animation: scale 2s linear 1.4s infinite;
        }
        .scale_container_4 .scale_box .scale1 {
          animation: scale 2s linear 0.8s infinite;
        }
        .scale_container_5 .scale_box .scale1 {
          animation: scale 2s linear 1.1s infinite;
        }
        .scale_container_1 .scale_box .scale2,
        .scale_container_2 .scale_box .scale2,
        .scale_container_3 .scale_box .scale2,
        .scale_container_4 .scale_box .scale2,
        .scale_container_5 .scale_box .scale2 {
          position: absolute;
          width: 5px;
          height: 5px;
          background-color: #fb2150;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        /* .scale_container_1 .scale_box .scale2 {
          animation: scale 2s linear 0.5s infinite;
        }
        .scale_container_2 .scale_box .scale2 {
          animation: scale 2s linear 0.8s infinite;
        }
        .scale_container_3 .scale_box .scale2 {
          animation: scale 2s linear 1.1s infinite;
        }
        .scale_container_4 .scale_box .scale2 {
          animation: scale 2s linear 0.8s infinite;
        } */

        .scale_container_1 .scale_box .scale2 {
          animation: scale 2s linear 0.5s infinite;
        }
        .scale_container_2 .scale_box .scale2 {
          animation: scale 2s linear 0.8s infinite;
        }
        .scale_container_3 .scale_box .scale2 {
          animation: scale 2s linear 1.7s infinite;
        }
        .scale_container_4 .scale_box .scale2 {
          animation: scale 2s linear 1.1s infinite;
        }
        .scale_container_5 .scale_box .scale2 {
          animation: scale 2s linear 1.4s infinite;
        }

        @keyframes fadein {
          0% {
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes scale {
          0% {
            width: 5px;
            height: 5px;
            opacity: 0;
          }
          20% {
            width: 20px;
            height: 20px;
            opacity: 1;
          }
          40% {
            width: 40px;
            height: 40px;
            opacity: 0;
          }
          60% {
            width: 40px;
            height: 40px;
            opacity: 0;
          }
          80% {
            width: 40px;
            height: 40px;
            opacity: 0;
          }
          100% {
            width: 40px;
            height: 40px;
            opacity: 0;
          }
        }
        .noti_box {
          height: 420px;
          position: absolute;
          top: 50%;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
          right: 0;
        }
        .noti_box .noti {
          width: 330px;
          height: 370px;
          /* animation의 시간은 위 useEffect안의 timeout 시간과 일치해야합니다. */
          animation: fadein 3s ease-in-out;
          /* animation-fill-mode: none; */
          animation-iteration-count: 1;
        }
        .noti_box .noti .title {
          height: 30px;
          line-height: 30px;
          background-color: #fb2150;
          font-size: 20px;
          color: #fff;
          padding: 10px 0;
          text-align: center;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
        }
        .noti_box .noti .content {
          height: 320px;
          font-size: 16px;
          padding: 20px;
          box-sizing: border-box;
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
          background-color: rgba(255, 255, 255, 0.6);
        }
        .noti_box .noti .content .content_list {
          margin-bottom: 25px;
        }
        .noti_box .noti .content .content_list:last-child {
          margin-bottom: 0;
        }
        .noti_box .noti .content .content_list .part_title {
          font-weight: bold;
          margin-bottom: 15px;
        }
        .noti_box .noti .content .content_list .part {
          color: #292929;
          line-height: 24px;
          white-space: pre-line;
        }
        .noti_box .sub_noti {
          font-size: 14px;
          color: #292929;
          display: block;
          text-align: center;
          margin-top: 15px;
        }
      `}</style>
    </Content>
  );
};

CopyAppleBanner.propTypes = {
  date: PropTypes.string,
  category: PropTypes.string,
  desc: PropTypes.string,
};

export default CopyAppleBanner;
