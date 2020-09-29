import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import Layout from "components/Layout/Layout";
import SeasonItem from "./SeasonItem";
import TitleHeader from "components/Common/TitleHeader";
import List from "components/Common/List";

import { BACKGROUND_BLACK_COLOR } from "shared/constants/colors";
import Content from "components/Layout/Content";
import { OPEN_MODAL } from "store/reducers/modal";

const SeasonIndex = ({ openedParticipationSeasons }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  /*
   * 참가하기 버튼 클릭 시 로그인 유무 확인
   */
  const onCheckIsLoggedIn = useCallback(
    (e) => {
      if (!isLoggedIn) {
        e.preventDefault();
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: "로그인 후 이용가능합니다.",
            isViewClose: false,
          },
        });
      }
    },
    [isLoggedIn, dispatch]
  );

  const renderSeasonItem = useCallback(
    (season) => (
      <SeasonItem
        key={season.category_level3_no}
        season={season}
        onCheckIsLoggedIn={onCheckIsLoggedIn}
      />
    ),
    []
  );

  return (
    <>
      <TitleHeader>참가 신청 하기</TitleHeader>
      {/* <div
        className="container"
        style={{
          paddingTop: "50px",
          height: "50px",
          backgroundColor: "#141418",
        }}
      >
        <div className="mypage_title">
          <span className="back_ico" onClick={onRouterBack}>
            <img src={arrow_left} alt="arrow_left" width="100%" height="100%" />
          </span>
          <span className="title">참가 신청 하기</span>
        </div>
      </div> */}
      <div
        className="container"
        style={{
          overflow: "hidden",
          paddingBottom: "20px",
          backgroundColor: BACKGROUND_BLACK_COLOR,
        }}
      >
        <Content style={{ padding: "0" }}>
          <List
            list={openedParticipationSeasons}
            renderItem={renderSeasonItem}
          />
        </Content>
        {/* <Body>
          <div className="wrapper">
            <Content style={{ paddingBottom: "20px" }}>
              <div className="content_title">진행 중인 대회</div>
              <Items />
              <Items />
            </Content>
          </div>
        </Body> */}
      </div>
      <style jsx>{`
        .container,
        .wrapper {
          width: 100%;
          height: auto;
          margin: 0 auto;
          position: relative;
        }
        .wrapper {
          background-color: #1e1e25;
          padding-top: 30px;

          /* min-height: calc(100vh - 332px); */
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
        .content_title {
          font-size: 18px;
          font-weight: bold;
          color: #fff;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

SeasonIndex.propTypes = {
  openedParticipationSeasons: PropTypes.array,
};

export default SeasonIndex;
