import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import VideoListByUserContainer from "containers/User/UserProfile/VideoListByUserContainer";

import PushHistoryContainer from "containers/User/UserProfile/PushHistoryContainer";
import AwardsContainer from "containers/User/UserProfile/AwardsContainer";

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

import { GRADIENT_00F1B4_D53CF5, COLOR_696C8C } from "shared/constants/colors";

const UserProfileTab = ({ currentUser, category3No, category4No }) => {
  const [tab, setTab] = useState(1);

  // useEffect(() => {
  //   const diff =
  //     document.querySelector(".swiper-container").offsetHeight -
  //     window.innerHeight;
  //   setMarginBottom(diff + 15);
  // }, []);

  const onClickTab = useCallback((tab) => {
    setTab(tab);
  }, []);

  const cubeImage = tab === 1 ? tv_active : tv_none;
  const chartImage = tab === 2 ? chart_active : chart_none;
  const trophyImage = tab === 3 ? trophy_active : trophy_none;
  const personInfoactiveImgage = tab === 4 ? push_active : push_none;

  return (
    <div className="content_tab_container">
      <Content style={{ padding: 0 }}>
        <div
          className={`content_tab${tab === 1 ? " active" : ""}`}
          onClick={onClickTab.bind(this, 1)}
        >
          <img src={cubeImage} alt="cube_active" width="30px" height="30px" />
          <span className="underLine" />
        </div>
        <div
          className={`content_tab${tab === 2 ? " active" : ""}`}
          onClick={onClickTab.bind(this, 2)}
        >
          <img src={chartImage} alt="chart_none" width="30px" height="30px" />
          <span className="underLine" />
        </div>
        <div
          className={`content_tab${tab === 3 ? " active" : ""}`}
          onClick={onClickTab.bind(this, 3)}
        >
          <img src={trophyImage} alt="trophy_none" width="30px" height="30px" />
          <span className="underLine" />
        </div>
        <div
          className={`content_tab${tab === 4 ? " active" : ""}`}
          onClick={onClickTab.bind(this, 4)}
        >
          <img
            src={personInfoactiveImgage}
            alt="person_infoactive_none"
            width="30px"
            height="30px"
          />
          <span className="underLine" />
        </div>
      </Content>
      {/* <Content style={{ marginBottom: `${marginBottom}px` }}> */}
      <Content>
        {tab === 1 && (
          <VideoListByUserContainer
            currentUser={currentUser}
            category3No={category3No}
          />
          // <List
          //   column={3}
          //   ItemComponent={
          //     <VideoItem
          //       viewIcon
          //       likeIcon
          //       chatIcon
          //       column={3}
          //       style={{ height: "173px" }}
          //       onViewVideo={() => console.log(123)}
          //     />
          //   }
          //   style={{ height: "100%" }}
          // />
        )}
        {tab === 2 && (
          <UserChartComponent
            userNo={currentUser.user_no}
            category3No={category3No}
            category4No={category4No}
          />
        )}
        {tab === 3 && <AwardsContainer userNo={currentUser.user_no} />}
        {tab === 4 && (
          <PushHistoryContainer
            currentUser={currentUser}
            category3No={category3No}
            category4No={category4No}
          />
        )}
      </Content>
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
        .prepareSevice {
          width: 100%;
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #888;
        }

        .empty_push {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          width: 100%;
          height: 300px;
          line-height: 300px;
          text-align: center;
          font-size: 18px;
          color: ${COLOR_696C8C};
        }
      `}</style>
    </div>
  );
};

UserProfileTab.propTypes = {
  currentUser: PropTypes.object,
  category3No: PropTypes.number,
  category4No: PropTypes.number,
};

export default UserProfileTab;
