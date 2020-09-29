import React from "react";
import Layout from "components/Layout/Layout";
import Body from "components/Layout/Body";
import Button from "components/Common/Button";
import VoteList from "./VoteList";
import Content from "components/Layout/Content";

import close_ico from "public/assets/icon/close_m_ico(white).svg";

const VoteItem = ({ voteList, vote, onVote, onCheckItem }) => {
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
                  width: "119px",
                  height: "45px",
                  display: "block",
                  margin: "0 auto",
                  marginBottom: "60px",
                  fontSize: "15px",
                }}
                handleClick={onVote}
              >
                투표완료
              </Button>
              <div
                className="noti"
                dangerouslySetInnerHTML={{
                  __html: vote.vote_participation_notice,
                }}
              ></div>
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
        .vote_list_container .band_list {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .vote_list_container .noti {
          background-color: #28282f;
          color: #fff;
          font-size: 14px;
          padding: 30px 25px;
          margin: 0 -20px;
          line-height: 25px;
        }
        .vote_list_container .noti span {
          display: block;
        }
      `}</style>
    </Layout>
  );
};

export default VoteItem;
