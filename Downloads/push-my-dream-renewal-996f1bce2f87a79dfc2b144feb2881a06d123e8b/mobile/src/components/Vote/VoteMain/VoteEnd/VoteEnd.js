import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import Button from "components/Common/Button";
import VoteEndItem from "./VoteEndItem";
import Loader from "components/Common/Loader";

import arrowDownWhite from "public/assets/image/arrow_down_white.png";
import search_ico from "public/assets/icon/search_ico(white).svg";

const VoteEnd = ({
  isLast,
  isLoadedVoteEndList,
  voteEndList,
  onGetVoteEndList,
}) => {
  const [paddingBottom, setPaddingBottom] = useState(0);
  // useEffect(() => {
  //   if (voteEndList.length > 0) {
  //     setPaddingBottom("80px");
  //   }
  // }, [voteEndList]);
  return (
    <Body style={{ paddingBottom: "80px" }}>
      <div className="container_body">
        <Content>
          <div className="wrapper_body">
            {voteEndList && voteEndList.length > 0 && (
              <div className="title">종료된 투표</div>
            )}
            {/* <div className="searchform">
              <input type="text" placeholder="투표 검색" />
              <button>
                <img
                  src={search_ico}
                  alt="search_ico"
                  width="100%"
                  height="100%"
                />
              </button>
            </div> */}
            <div>
              {voteEndList &&
                voteEndList.map((item) => (
                  <VoteEndItem key={item.vote_no} item={item} />
                ))}
            </div>
            {isLoadedVoteEndList && (
              <div className="loader_container">
                <Loader />
              </div>
            )}
            {/* 마지막이 아니거나 데이터 로딩중이 아닐 시 더보기 출력 */}
            {!isLast && !isLoadedVoteEndList && (
              <Button
                className="bg_transparent border_solid_white"
                handleClick={onGetVoteEndList}
                style={{
                  width: "130px",
                  height: "53px",
                  fontSize: "15px",
                  marginTop: "20px",
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
          font-size: 20px;
          font-weight: bold;
          color: #fff;
        }
        .searchform {
          height: 55px;
          width: 100%;
          background-color: #141418;
          position: relative;
          border-radius: 10px;
        }
        .searchform input {
          font-size: 16px;
          width: calc(100% - 47px);
          height: 100%;
          border: 0px;
          padding-left: 20px;
          box-sizing: border-box;
          background-color: inherit;
          border-radius: 10px;
          color: #fff;
        }
        .searchform button {
          width: 22px;
          height: 22px;
          border: none;
          position: absolute;
          top: 50%;
          right: 22px;
          transform: translateY(-50%);
          background-color: inherit;
          cursor: pointer;
        }
        .loader_container {
          width: 100%;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </Body>
  );
};

VoteEnd.propTypes = {
  isLast: PropTypes.bool,
  isLoadedVoteEndList: PropTypes.bool,
  voteEndList: PropTypes.array,
  onGetVoteEndList: PropTypes.func,
};

export default VoteEnd;
