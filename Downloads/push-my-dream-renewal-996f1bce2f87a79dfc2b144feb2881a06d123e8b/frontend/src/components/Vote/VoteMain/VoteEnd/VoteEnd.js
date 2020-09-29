import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import Button from "components/Common/Button";
import VoteEndItem from "./VoteEndItem";
import Loader from "components/Common/Loader";

import arrowDownWhite from "public/assets/image/arrow_down_white.png";

const VoteEnd = ({ isLast, isLoadedVoteEndList, voteEndList }) => {
  const [paddingBottom, setPaddingBottom] = useState(0);
  const [minHeight, setMinHeight] = useState(0);
  useEffect(() => {
    if (voteEndList.length > 0) {
      setPaddingBottom("75px");
      setMinHeight("calc(100vh - 378px)");
    }
  }, [voteEndList]);
  return (
    <Body style={{ minHeight, paddingBottom }}>
      <div className="container_body">
        <Content>
          <div className="wrapper_body">
            {voteEndList && voteEndList.length > 0 && (
              <div className="title">종료된 투표</div>
            )}
            <div>
              {voteEndList &&
                voteEndList.map(item => (
                  <VoteEndItem key={item.vote_no} item={item} />
                ))}
            </div>
            {isLoadedVoteEndList && <Loader />}
            {/* 마지막이 아닐시 더보기 클릭 가능 */}
            {!isLast && (
              <Button
                className="bg_transparent border_solid_white"
                style={{
                  width: "130px",
                  height: "53px",
                  fontSize: "15px",
                  display: "block",
                  margin: "0 auto",
                  marginTop: "30px"
                }}
              >
                더보기
                <img
                  src={arrowDownWhite}
                  alt="arrow_down_white"
                  style={{ marginLeft: "9px" }}
                />
              </Button>
            )}
          </div>
        </Content>
      </div>
      <style jsx>{`
        .container_body {
          position: relative;
          background-color: #1e1e25;
        }
        .wrapper_body {
          /* margin: 30px 0; */
          color: #b2b2b2;
        }
        .title {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          margin-bottom: 30px;
          padding-top: 80px;
          border-top: 1px solid #39394a;
        }
      `}</style>
    </Body>
  );
};

VoteEnd.propTypes = {
  isLast: PropTypes.bool,
  isLoadedVoteEndList: PropTypes.bool,
  voteEndList: PropTypes.array
};

export default VoteEnd;
