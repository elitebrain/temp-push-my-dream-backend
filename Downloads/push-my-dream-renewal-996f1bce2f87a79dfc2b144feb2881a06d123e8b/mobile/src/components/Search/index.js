import React from "react";

import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import Layout from "components/Layout/Layout";
import SearchBar from "components/Common/SearchBar";
import SearchHistory from "./SearchHistory";
import SearchInfo from "./SearchInfo";
import SearchList from "./SearchList";

const Search = () => {
  return (
    <>
      <div
        className="container"
        style={{
          overflow: "auto",
        }}
      >
        <Body style={{ paddingBottom: "0" }}>
          <div className="wrapper">
            <Content style={{ padding: "0" }}>
              <div className="search">
                <SearchBar closeIco Content="검색어를 입력해 주세요." />
              </div>
              {/* 검색창 입력시 closeIco 생성 */}
              {/* <SearchHistory />  검색 기록 */}
              <SearchInfo />
              <SearchList />
            </Content>
          </div>
        </Body>
      </div>
      <style jsx>{`
        .search {
          padding: 30px 20px 20px 20px;
        }
        .content_title {
          font-size: 18px;
          color: #fff;
          text-align: center;
          margin: 50px 0;
        }
        .container {
          width: 100%;
          height: auto;
          margin: 0 auto;
          position: relative;
        }
        .wrapper {
          width: 100%;
          height: auto;
          margin: 0 auto;
          position: relative;
          /* background-color: #1e1e25; */
        }
        .mypage_title {
          height: 50px;
          position: relative;
          margin-bottom: 17px;
        }
        .container .title {
          text-align: left;
          color: #fff;
          font-size: 50px;
          font-weight: 400;
        }
        .mypage_title span {
          display: inline-block;
        }
        .mypage_title .back_ico {
          width: 20px;
          height: 15px;
          text-align: center;
          position: absolute;
          left: 20px;
          transform: translateY(-50%);
          top: 50%;
        }
        .mypage_title .title {
          font-size: 20px;
          color: #fff;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          top: 50%;
        }
      `}</style>
    </>
  );
};

export default Search;
