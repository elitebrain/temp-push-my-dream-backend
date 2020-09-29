import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Body from "components/Layout/Body";
import Button from "components/Common/Button";
import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";
import SharedSNSButton from "components/Common/SharedSNSButton";

import share_ico from "public/assets/icon/share_ico(white).svg";
// import vote_list from "public/assets/image/vote_list.jpg";
import btn_bg from "public/assets/image/vote_list_btn_bg.png";

import { OPEN_MODAL } from "store/reducers/modal";

const VoteIntro = ({ vote }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.user);

  // 로그인 체크
  const onCheckIsLoggedIn = useCallback(() => {
    if (!isLoggedIn) {
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
  }, [isLoggedIn, router, vote]);

  return (
    <Layout emergenza>
      <div className="container">
        <Body style={{ marginTop: "50px", minheight: "calc(100vh - 254px)" }}>
          <Content style={{ width: "100%", height: "100%", padding: "0" }}>
            <div className="band_list">
              <img
                src={vote.vote_cover_image_mobile}
                width="100%"
                height="auto"
              />
              {/* width:750px, height:1170px 이미지 사용 */}

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
                kakaoImage={vote.vote_cover_image_mobile}
              />
            </div>
          </Content>
        </Body>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: auto;
          min-height: calc(100vh - 202px);
          background-color: #141418;
          overflow: hidden;
          margin: 0 auto;
          position: relative;
        }
        .container .band_list {
          width: 100%;
          height: 100%;
          /* height: 985px; */
          margin: 0 auto;
          position: relative;
        }

        .container .share_ico {
          margin-right: 10px;
          display: inline-block;
          vertical-align: middle;
        }
        .container .share_ico + span {
          display: inline-block;
          vertical-align: middle;
          font-size: 13px;
        }
        .circle_box {
          position: absolute;
          left: 50%;
          bottom: 80px;
          transform: translateX(-50%);
          cursor: pointer;
        }
        .circle {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          position: relative;
          background-image: url(${btn_bg});
          background-repeat: no-repeat;
          background-size: cover;
        }
        .circle .content {
          color: #fff;
          font-size: 11px;
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
          font-size: 30px;
          font-style: oblique;
          font-weight: 600;
          display: block;
        }
        .circle .scale1 {
          position: absolute;
          width: 110px;
          height: 110px;
          border: 1px solid rgba(241, 132, 0, 0.3);
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          animation: scale 1s linear infinite;
        }
        .circle .scale2 {
          position: absolute;
          width: 110px;
          height: 110px;
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
    vote_title: PropTypes.string,
    vote_notice: PropTypes.string,
    vote_cover_image_mobile: PropTypes.string,
    vote_no: PropTypes.number,
    STATUS: PropTypes.shape({
      isProceeded: PropTypes.bool,
    }),
  }),
};

export default VoteIntro;
