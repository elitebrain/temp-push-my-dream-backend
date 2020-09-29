import React, { useState, useCallback } from "react";
import colormap from "colormap";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import Layout from "components/Layout/Layout";
import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import BarList from "./BarList";
import TurnoutList from "./TurnoutList";

import close_ico from "public/assets/icon/close_m_ico(white).svg";
import share_ico from "public/assets/icon/share_ico(white).svg";
import SharedSNSButton from "components/Common/SharedSNSButton";

const VoteResult = ({ vote }) => {
  const router = useRouter();
  const [colors, setColors] = useState(
    colormap({
      colormap: "summer",
      nshades: vote.VOTE_ITEM_LIST.length,
      format: "hex",
      alpha: 1,
    })
  );

  const onRedirectVoteMain = useCallback(() => {
    router.push("/vote");
  }, [router]);

  return (
    <Layout emergenza>
      <div
        className="container"
        style={{
          paddingTop: "50px",
          backgroundColor: "#141418",
        }}
      >
        <Body>
          <div className="vote_list_container">
            <Content>
              <div className="title">
                <span>{vote.vote_title}</span>
                {/* <span className="close_ico">
                  <img
                    src={close_ico}
                    alt="close_ico"
                    width="100%"
                    height="100%"
                  />
                </span> */}
              </div>
              <div className="under_line" />
              <div
                className="title_noti"
                dangerouslySetInnerHTML={{ __html: vote.vote_notice }}
              ></div>
              {/* <BarList vote={vote} colors={colors} /> */}
              <TurnoutList vote={vote} colors={colors} />
              <div className="sharedButton" onClick={onRedirectVoteMain}>
                <span>확인</span>
                <SharedSNSButton
                  icon
                  kakaoTitle={vote.vote_title}
                  kakaoDescription={vote.vote_notice}
                  kakaoImage={vote.vote_cover_image_mobile}
                >
                  <img src={share_ico} alt="share_ico" />
                </SharedSNSButton>
              </div>
              {/* <button onClick={onRedirectVoteMain}>
                <span>확인</span>
                <img src={share_ico} alt="share_ico" />
              </button> */}
            </Content>
          </div>
        </Body>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: auto;
          /* background-color: #f38400; */
          overflow: hidden;
          margin: 0 auto;
          position: relative;
        }
        .vote_list_container {
          /* width: 1025px; */
          padding-top: 30px;
          box-sizing: border-box;
          padding-bottom: 75px;
        }
        .vote_list_container .title {
          font-size: 25px;
          font-weight: 600;
          margin-bottom: 40px;
          color: #fff;
          position: relative;
        }
        .vote_list_container .title .close_ico {
          width: 22px;
          height: 22px;
          display: block;
          position: absolute;
          right: 0;
          top: 0;
        }
        .vote_list_container .under_line {
          width: 20px;
          height: 2px;
          background-color: #fff;
          margin-bottom: 10px;
        }
        .title_noti {
          font-size: 15px;
          font-weight: 400;
          white-space: pre-line;
          margin-bottom: 42px;
          color: #fff;
        }
        .sharedButton {
          width: 148px;
          height: 45px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          border: none;
          border-radius: 30px;
          background-color: #f38400;
          margin-bottom: 75px;
        }
        .sharedButton span {
          display: inline-block;
          vertical-align: middle;
          font-size: 15px;
          font-weight: 400;
          color: #fff;
          padding-right: 30px;
          border-right: 1px solid rgba(255, 255, 255, 0.3);
          margin-right: 20px;
        }
        .sharedButton img {
          display: inline-block;
          vertical-align: middle;
          width: 15px;
          height: 15px;
        }
      `}</style>
    </Layout>
  );
};

VoteResult.propTypes = {
  vote: PropTypes.shape({
    VOTE_ITEM_LIST: PropTypes.array,
    vote_title: PropTypes.string,
    vote_notice: PropTypes.string,
    vote_cover_image_mobile: PropTypes.string,
  }),
};

export default VoteResult;
