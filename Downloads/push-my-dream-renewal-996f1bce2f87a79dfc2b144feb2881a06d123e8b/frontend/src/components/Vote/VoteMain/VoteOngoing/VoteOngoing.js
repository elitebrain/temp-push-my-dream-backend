import React from "react";
import PropTypes from "prop-types";

import Content from "components/Layout/Content";
import Body from "components/Layout/Body";
import VoteOngoingItem from "./VoteOngoingItem";

// import votemain_list_img01 from "public/assets/image/votemain_list_img01.png";

const VoteOngoing = ({ voteList }) => {
  return (
    <Body>
      <div className="container_body">
        <Content>
          <div className="wrapper_body">
            {voteList && voteList.length > 0 ? (
              voteList.map(item => (
                <VoteOngoingItem key={item.vote_no} item={item} />
              ))
            ) : (
              <div className="empty_vote_list">진행중인 투표가 없습니다.</div>
            )}
          </div>
        </Content>
      </div>
      <style jsx>{`
        .empty_vote_list {
          padding: 75px 0;
          text-align: center;
          font-size: 30px;
          color: #aaa;
        }
        .container_header {
          position: relative;
          background-color: #141418;
          overflow: hidden;
        }
        .wrapper_header {
          padding-top: 80px;
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
          padding-bottom: 30px;
        }
      `}</style>
    </Body>
  );
};

VoteOngoing.propTypes = {
  voteList: PropTypes.array
};

export default VoteOngoing;
