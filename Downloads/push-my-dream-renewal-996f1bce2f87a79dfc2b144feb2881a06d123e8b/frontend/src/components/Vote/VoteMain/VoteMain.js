import React from "react";
import PropTypes from "prop-types";

import Layout from "components/Layout/Layout";
import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import VoteOngoing from "./VoteOngoing";
import arrow_right_ico from "public/assets/icon/arrow_right_ico(white).svg";

import VoteEndContainer from "containers/Vote/VoteEndContainer";
import InfiniteLogo from "components/Common/InfiniteLogo";

const VoteMain = ({ voteList }) => {
  const _handleMore = () => {
    getNotice(noticeList.length);
  };
  return (
    <Layout>
      <div className="container" style={{ overflow: "hidden" }}>
        <div className="mypage_title">
          <Content
            style={{
              position: "relative",
              height: "100%",
              paddingTop: "150px",
            }}
          >
            <div className="nav">
              <span>HOME</span>
              <img
                src={arrow_right_ico}
                alt="right_arrow"
                width="8px"
                height="13px"
              />
              <span className="position">투표하기</span>
            </div>
            <div className="title">투표하기</div>
            <InfiniteLogo
              style={{
                width: "528px",
                height: "265px",
                bottom: "90px",
                zIndex: -1,
                right: "-82px",
              }}
              width="528"
              height="265"
            />
          </Content>
        </div>
        <Body
          style={{
            paddingTop: "80px",
            paddingBottom: "150px",
            position: "relative",
            zIndex: "1",
          }}
        >
          <VoteOngoing voteList={voteList} />
          <VoteEndContainer />
        </Body>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          min-width: 1366px;
          height: auto;
          /* background-color: #1e1e25; */
          /* overflow: hidden; */
          margin: 0 auto;
          position: relative;
        }
        .container .mypage_title {
          height: 320px;
          position: relative;
          z-index: 0;
          background-color: #141418;
        }
        .container .mypage_title .content_box {
          width: 1200px;
          position: absolute;
          top: 50%;
        }
        .container .mypage_title .nav {
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          text-align: right;
        }
        .container .mypage_title .nav span {
          display: inline-block;
        }
        .container .mypage_title .nav img {
          display: inline-block;
          margin: 0 20px;
        }
        .container .mypage_title .nav .position {
          font-weight: 300;
        }
        .container .title {
          text-align: left;
          color: #fff;
          font-size: 50px;
          font-weight: 400;
          margin-bottom: 83px;
        }
      `}</style>
    </Layout>
  );
};

VoteMain.propTypes = {
  voteList: PropTypes.array,
};

export default VoteMain;
