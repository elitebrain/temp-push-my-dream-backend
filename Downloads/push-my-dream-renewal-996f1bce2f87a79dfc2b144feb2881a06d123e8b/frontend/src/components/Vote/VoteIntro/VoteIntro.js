import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Body from "components/Layout/Body";
import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";

// import vote_list from "public/assets/image/vote_list.jpg";
import btn_bg from "public/assets/image/vote_list_btn_bg.png";
import { OPEN_MODAL } from "store/reducers/modal";
import SharedSNSButton from "components/Common/SharedSNSButton";

const VoteIntro = ({ vote }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isAdmin } = useSelector((state) => state.common);

  // 로그인 체크
  const onCheckIsLoggedIn = useCallback(() => {
    // 관리자 모드가 아니며 유저가 비로그인ㅅ ㅣ
    if (!isAdmin && !isLoggedIn) {
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: "로그인 후 이용이 가능합니다.",
          onConfirm() {
            router.push(`/login?redirect=/vote/${vote.vote_no}`);
          },
        },
      });
    } else {
      router.push("/vote/[vote_no]/item", `/vote/${vote.vote_no}/item`);
    }
  }, [isLoggedIn, isAdmin, router, vote]);

  return (
    <Layout>
      <div className="container">
        <Body style={{ marginTop: "95px" }}>
          <Content style={{ width: "100%" }}>
            <div className="band_list">
              <img src={vote.vote_cover_image} width="100%" height="auto" />
              {/* width:1366px, height:985px 이미지 사용 */}

              {/* 진행중 상태일 시에만 투표하기 버튼 표시 */}
              {vote.STATUS.isProceeded && (
                <div className="circle_box" onClick={onCheckIsLoggedIn}>
                  <div className="circle">
                    <div className="content">
                      <span>Vote</span>
                      <span>투표하기</span>
                    </div>
                    <div className="scale1" />
                    <div className="scale2" />
                  </div>
                </div>
              )}
              <SharedSNSButton
                kakaoTitle={vote.vote_title}
                kakaoDescription={vote.vote_notice}
                kakaoImage={vote.vote_cover_image}
              />

              {/* <Button
                width="150px"
                height="40px"
                className="bg_real_black"
                style={{
                  position: "absolute",
                  bottom: "60px",
                  left: "50%",
                  transform: "translateX(-50%)"
                }}
              >
                <img
                  src={share_ico}
                  width="17px"
                  height="19px"
                  className="share_ico"
                />
                <span>공유 하기</span>
              </Button> */}
            </div>
          </Content>
        </Body>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: calc(100% - 311px);
          min-width: 1366px;
          background-color: #141418;
          overflow: hidden;
          margin: 0 auto;
          position: relative;
        }
        .container .band_list {
          width: 100%;
          max-width: 1366px;
          height: 880px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }
        .container .band_list > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .container .share_ico {
          margin-right: 10px;
          display: inline-block;
          vertical-align: middle;
        }
        .container .share_ico + span {
          display: inline-block;
          vertical-align: middle;
          font-size: 16px;
        }
        .circle_box {
          position: absolute;
          bottom: 100px;
          right: 100px;
          cursor: pointer;
        }
        .circle {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          position: relative;
          background-image: url(${btn_bg});
          background-repeat: no-repeat;
          background-size: cover;
        }
        .circle .content {
          color: #fff;
          font-size: 16px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .circle .content span {
          display: block;
          text-align: center;
        }
        .circle .content span:first-child {
          font-size: 44px;
          font-style: oblique;
          font-weight: 600;
        }
        .circle .scale1 {
          position: absolute;
          width: 160px;
          height: 160px;
          border: 1px solid rgba(241, 132, 0, 0.3);
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          animation: scale 1s linear infinite;
        }
        .circle .scale2 {
          position: absolute;
          width: 160px;
          height: 160px;
          border: 1px solid #f38400;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          animation: scale 1s linear 0.5s infinite;
        }
        @keyframes scale {
          0% {
            width: 160px;
            height: 160px;
            opacity: 0;
          }
          50% {
            width: 200px;
            height: 200px;
            opacity: 1;
          }
          100% {
            width: 250px;
            height: 250px;
            opacity: 0;
          }
        }
      `}</style>
    </Layout>
  );
};

VoteIntro.propTypes = {
  vote: PropTypes.shape({
    vote_cover_image: PropTypes.string,
    vote_no: PropTypes.number,
    STATUS: PropTypes.shape({
      isProceeded: PropTypes.bool,
    }),
  }),
};

export default VoteIntro;
