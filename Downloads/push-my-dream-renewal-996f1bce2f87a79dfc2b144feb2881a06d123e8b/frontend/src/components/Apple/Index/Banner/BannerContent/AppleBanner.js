import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Router from "next/router";

import { OPEN_MODAL } from "store/reducers/modal";
import { APPLE_COLOR } from "shared/constants/colors";

import Content from "components/Layout/Content";

import apple_btn from "public/assets/image/apple_btn.png";
import apple_banner_girl from "public/assets/image/apple_banner_girl_img.png";
import apply_banner_noti_box from "public/assets/image/apply_banner_noti_box.png";

const AppleBanner = props => {
  const { date, category, desc, badge, bannerIdx } = props;
  const [viewNoti, setViewNoti] = useState(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   /* animation의 시간은 위 useEffect안의 timeout 시간과 일치해야합니다. */
  //   let timeout = setTimeout(() => {
  //     setViewNoti(prev => (!!prev ? 0 : 1));
  //   }, 3000);

  //   return function cleanup() {
  //     clearTimeout(timeout);
  //   };
  // }, [viewNoti]);

  let interval = null;
  useEffect(() => {
    console.log("bannerIdx", bannerIdx);
    setTimeout(() => setViewNoti(0), 1000);
    setTimeout(
      () =>
        (interval = setInterval(
          () =>
            setViewNoti(prevState =>
              prevState !== null ? (prevState + 1) % 2 : prevState
            ),
          5000
        )),
      1000
    );
    return () => clearInterval(interval);
  }, [bannerIdx]);
  console.log("interval", interval);
  const _goEmergenzaApply = useCallback(() => {
    Router.push("/upload");
  }, [Router]);
  console.log(viewNoti);
  return (
    <Content style={{ width: "1250px" }}>
      <div className="container">
        {/* <div className="wrapper">
          <div className="box">
            <div className="apple_banner_girl">
              <img
                src={apple_banner_girl}
                alt="apple_banner_girl"
                width="100%"
                height="100%"
              />
            </div>
            <button onClick={() => _goEmergenzaApply()} />
          </div>
        </div>
        <div className="noti_box">
          <div className="noti_wrapper">
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
                      및 바르자셀 화장품, 
                      1개월 콘텐츠 제작 지원 등 제공`}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="sub_noti">
            * 자세한 내용은 공지 사항을 확인해주세요.
          </div>
        </div> */}
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 525px;
          position: relative;
        }
        .wrapper {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
        }
        .box {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .apple_banner_girl {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
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
        button {
          width: 220px;
          height: 80px;
          border: none;
          background-color: inherit;
          background-image: url(${apple_btn});
          background-repeat: no-repeat;
          background-size: cover;
          cursor: pointer;
          position: absolute;
          bottom: 100px;
          left: 100px;
        }
        .noti_box {
          width: 330px;
          height: 390px;
          color: #fff;
          position: absolute;
          top: 50%;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
          right: 0;
        }
        .noti_wrapper {
          height: 365px;
        }
        .noti_box .noti {
          width: 330px;
          height: 365px;
          padding: 25px 30px;
          box-sizing: border-box;
          background-image: url(${apply_banner_noti_box});
          background-repeat: no-repeat;
          background-size: cover;
          /* animation의 시간은 위 useEffect안의 timeout 시간과 일치해야합니다. */
          /* animation: fadein 5s ease-in-out; */
          animation: move 5s ease-in-out;
          animation-timing-function: linear;
          /* animation-fill-mode: none; */
          /* animation-iteration-count: 1; */
          position: relative;
        }

        /* @keyframes fadein {
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
        } */
        @keyframes move {
          0% {
            left: 300px;
            opacity: 0;
          }
          10% {
            left: 0px;
            opacity: 1;
          }
        }
        .noti_box .noti .title {
          font-size: 20px;
          text-align: center;
          margin-bottom: 20px;
        }
        .noti_box .noti .content {
          font-size: 15px;
          box-sizing: border-box;
        }
        .noti_box .noti .content .content_list {
          margin-bottom: 25px;
        }
        .noti_box .noti .content .content_list:last-child {
          margin-bottom: 0;
        }
        .noti_box .noti .content .content_list .part_title {
          font-weight: bold;
          margin-bottom: 10px;
        }
        .noti_box .noti .content .content_list .part {
          line-height: 24px;
          white-space: pre-line;
        }
        .noti_box .sub_noti {
          font-size: 14px;
          display: block;
          text-align: center;
          margin-top: 15px;
        }
      `}</style>
    </Content>
  );
};

AppleBanner.propTypes = {
  date: PropTypes.string,
  category: PropTypes.string,
  desc: PropTypes.string
};

export default AppleBanner;
