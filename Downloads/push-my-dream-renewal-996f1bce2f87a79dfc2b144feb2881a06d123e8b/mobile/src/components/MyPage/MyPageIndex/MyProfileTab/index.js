import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import MyVideoListContainer from "containers/MyPage/MyVideoListContainer";
import AwardsContainer from "containers/User/UserProfile/AwardsContainer";
import MyPushTabContainer from "containers/MyPage/MyPushTabContainer";

import Content from "components/Layout/Content";
import UserChartComponent from "components/Common/Chart/UserChartComponent";

import tv_active from "public/assets/icon/tv_active_ico.svg";
import tv_none from "public/assets/icon/tv_inactive_ico.svg";
import chart_active from "public/assets/icon/chart_active_ico.svg";
import chart_none from "public/assets/icon/chart_inactive_ico.svg";
import trophy_active from "public/assets/icon/trophy_active_ico.svg";
import trophy_none from "public/assets/icon/trophy_inactive_ico.svg";
import push_active from "public/assets/icon/push_active_ico.svg";
import push_none from "public/assets/icon/push_inactive_ico.svg";

import {
  MAIN_BLACK_COLOR,
  GRADIENT_00F1B4_D53CF5,
} from "shared/constants/colors";

const MyProfileTab = ({ category3No, category4No }) => {
  const user_no = useSelector((state) => state.user.user_no);
  const [tab, setTab] = useState("video");

  // 탭변경
  const onClickTab = useCallback((tab) => {
    setTab(tab);
  }, []);

  const tvImage = useMemo(() => (tab === "video" ? tv_active : tv_none), [tab]);
  const chartImage = useMemo(
    () => (tab === "chart" ? chart_active : chart_none),
    [tab]
  );
  const trophyImage = useMemo(
    () => (tab === "award" ? trophy_active : trophy_none),
    [tab]
  );
  const pushImage = useMemo(() => (tab === "push" ? push_active : push_none), [
    tab,
  ]);

  return (
    <div className="content_tab_container">
      <Content style={{ padding: 0 }}>
        <div
          className={`content_tab${tab === "video" ? " active" : ""}`}
          onClick={onClickTab.bind(this, "video")}
        >
          <img src={tvImage} alt="cube_active" width="30px" height="30px" />
          <span className="underLine" />
        </div>
        <div
          className={`content_tab${tab === "chart" ? " active" : ""}`}
          onClick={onClickTab.bind(this, "chart")}
        >
          <img src={chartImage} alt="chart_none" width="30px" height="30px" />
          <span className="underLine" />
        </div>
        <div
          className={`content_tab${tab === "award" ? " active" : ""}`}
          onClick={onClickTab.bind(this, "award")}
        >
          <img src={trophyImage} alt="trophy_none" width="30px" height="30px" />
          <span className="underLine" />
        </div>
        <div
          className={`content_tab${tab === "push" ? " active" : ""}`}
          onClick={onClickTab.bind(this, "push")}
        >
          <img src={pushImage} alt="push_none" width="30px" height="30px" />
          <span className="underLine" />
        </div>
      </Content>
      <div className="Tab_Content_Background">
        {tab === "video" && (
          <Content style={{ cursor: "pointer" }}>
            <MyVideoListContainer category3No={category3No} />
          </Content>
        )}
        {tab === "chart" && (
          <Content style={{ cursor: "pointer" }}>
            <UserChartComponent
              userNo={user_no}
              category3No={category3No}
              category4No={category4No}
            />
          </Content>
        )}
        {tab === "award" && (
          <Content style={{ cursor: "pointer" }}>
            <AwardsContainer userNo={user_no} />
          </Content>
        )}
        {tab === "push" && (
          <MyPushTabContainer
            category3No={category3No}
            category4No={category4No}
          />
        )}
      </div>
      <style jsx>{`
        .content_tab {
          margin-top: 20px;
          width: 25%;
          height: 50px;
          display: inline-block;
          text-align: center;
          border-bottom: 2px solid #696c8c;
          position: relative;
        }
        .content_tab.active .underLine {
          display: block;
        }
        .underLine {
          width: 100%;
          height: 2px;
          position: absolute;
          bottom: -2px;
          left: 0;
          background-image: ${GRADIENT_00F1B4_D53CF5(90)};
          display: none;
        }
        .list {
          min-height: 260px;
          padding: 15px 0;
          text-align: center;
        }
        .Tab_Content_Background {
          width: 100%;
        }
        .prepareSevice {
          width: 100%;
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #888;
        }
      `}</style>
    </div>
  );
};

MyProfileTab.propTypes = {
  season: PropTypes.object,
  isParticipate: PropTypes.bool,
};

export default MyProfileTab;
