import React from "react";
import PropTypes from "prop-types";

import Layout from "components/Layout/Layout";
import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import Button from "components/Common/Button";
import VoteList from "./VoteList";

import infinite_logo from "public/assets/icon/infinite_ico(orange).svg";

const VoteItem = ({ voteList, vote, onVote, onCheckItem }) => {
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
              dangerouslySetInnerHTML={{
                __html: vote.vote_notice,
              }}
            ></div>
            <div className="band_list">
              {vote.VOTE_ITEM_LIST &&
                vote.VOTE_ITEM_LIST.map((item) => (
                  <VoteList
                    key={item.vote_item_no}
                    voteNo={vote.vote_no}
                    checked={voteList.indexOf(item.vote_item_no) !== -1}
                    item={item}
                    onCheckItem={onCheckItem}
                  />
                ))}
            </div>
            <Button
              style={{
                display: "block",
                margin: "0 auto",
                marginBottom: "60px",
              }}
              onClick={onVote}
            >
              투표완료
            </Button>
            <div
              className="noti"
              dangerouslySetInnerHTML={{
                __html: vote.vote_participation_notice,
              }}
            ></div>
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
          padding: 80px 50px 0 50px;
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
        .vote_list_container .band_list {
          margin-bottom: 60px;
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .vote_list_container .noti {
          background-color: #e1e3e4;
          padding: 60px 50px;
          margin: 0 -50px;
        }
        .vote_list_container .noti span {
          display: block;
        }
      `}</style>
    </Layout>
  );
};

VoteItem.propTypes = {
  voteList: PropTypes.array,
  onVote: PropTypes.func,
  onCheckItem: PropTypes.func,
  vote: PropTypes.shape({}),
};

export default VoteItem;
