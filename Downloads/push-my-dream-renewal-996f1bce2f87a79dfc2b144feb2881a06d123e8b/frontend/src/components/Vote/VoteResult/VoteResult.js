import React, { useState, useCallback } from "react";
import colormap from "colormap";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import Layout from "components/Layout/Layout";
import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import BarList from "./BarList";
import TurnoutList from "./TurnoutList";
import SharedSNSButton from "components/Common/SharedSNSButton";

import infinite_logo from "public/assets/icon/infinite_ico(orange).svg";
import share_ico from "public/assets/icon/share_ico(white).svg";

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
    <Layout>
      <div
        className="container"
        style={{ overflow: "hidden", position: "relative" }}
      >
        <div className="vote">
          <Content
            style={{
              position: "relative",
              height: "100%",
              paddingTop: "150px",
            }}
          >
            <div className="infinite_logo">
              <img src={infinite_logo} alt="infinite_logo" />
            </div>
          </Content>
        </div>
        <Body>
          <div className="vote_list_container">
            <div className="title">{vote.vote_title}</div>
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
                kakaoImage={vote.vote_cover_image}
              />
            </div>
          </div>
        </Body>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: auto;
          min-width: 1366px;
          /* background-color: #f38400; */
          overflow: hidden;
          margin: 0 auto;
          position: relative;
        }
        .container .vote {
          height: 320px;
          position: relative;
          z-index: -1;
          background-color: #f38400;
        }
        .infinite_logo {
          position: absolute;
          width: 528px;
          height: 265px;
          right: -82px;
          bottom: 90px;
          overflow: hidden;
          z-index: 1;
        }
        .infinite_logo img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .vote_list_container {
          width: 1025px;
          background-color: #fff;
          padding: 80px 50px;
          position: relative;
          left: 50%;
          top: -145px;
          transform: translateX(-50%);
        }
        .vote_list_container .title {
          font-size: 40px;
          font-weight: 600;
          margin-bottom: 40px;
        }
        .vote_list_container .under_line {
          width: 30px;
          height: 3px;
          background-color: #000;
          margin-bottom: 20px;
        }
        .title_noti {
          font-size: 24px;
          font-weight: 400;
          white-space: pre-line;
          margin-bottom: 50px;
        }
        .sharedButton {
          width: 200px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          border: none;
          border-radius: 30px;
          background-color: #f38400;
          cursor: pointer;
        }
        .sharedButton span {
          display: inline-block;
          vertical-align: middle;
          font-size: 18px;
          font-weight: 400;
          color: #fff;
          padding-right: 50px;
          border-right: 1px solid rgba(255, 255, 255, 0.3);
          margin-right: 20px;
        }
        .sharedButton img {
          display: inline-block;
          vertical-align: middle;
        }
      `}</style>
    </Layout>
  );
};

VoteResult.propTypes = {
  vote: PropTypes.shape({}),
};

export default VoteResult;
