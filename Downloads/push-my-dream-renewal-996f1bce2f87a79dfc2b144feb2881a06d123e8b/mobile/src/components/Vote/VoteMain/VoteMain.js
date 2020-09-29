import React from "react";
import PropTypes from "prop-types";

import Layout from "components/Layout/Layout";
import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import VoteOngoing from "./VoteOngoing";

import VoteEndContainer from "containers/Vote/VoteEndContainer";

const VoteMain = ({ voteList }) => {
  const _handleMore = () => {
    getNotice(noticeList.length);
  };
  return (
    <Layout>
      <Body>
        <div className="container_header">
          <Content>
            <div className="wrapper_header">
              <div className="title">VOTE</div>
              <div className="sub_title">투표하기</div>
            </div>
          </Content>
        </div>
      </Body>
      <VoteOngoing voteList={voteList} />
      <VoteEndContainer />
      <style jsx>{`
        .container_header {
          position: relative;
          background-color: #141418;
          overflow: hidden;
        }
        .wrapper_header {
          padding-top: 80px;
          padding-bottom: 30px;
          width: 100%;
          text-align: center;
        }
        .title {
          color: #fff;
          font-size: 30px;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .sub_title {
          font-size: 15px;
          color: #fff;
        }
        .container_body {
          position: relative;
          background-color: #1e1e25;
        }
        .wrapper_body {
          /* margin: 30px 0; */
          color: #b2b2b2;
        }
      `}</style>
    </Layout>
  );
};

VoteMain.propTypes = {
  voteList: PropTypes.array,
};

export default VoteMain;
