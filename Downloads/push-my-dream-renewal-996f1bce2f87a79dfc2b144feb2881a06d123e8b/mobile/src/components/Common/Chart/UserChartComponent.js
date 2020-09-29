import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import RankChartContainer from "containers/Chart/RankChartContainer";
import PushChartContainer from "containers/Chart/PushChartContainer";
import VideoViewChartContainer from "containers/Chart/VideoViewChartContainer";
import VideoLikeChartContainer from "containers/Chart/VideoLikeChartContainer";
import ScoreChartContainer from "containers/Chart/ScoreChartContainer";
import FanChartContainer from "containers/Chart/FanChartContainer";
import VideoFollowChartContainer from "containers/Chart/VideoFollowChartContainer";

import PieChart from "components/Common/Chart/PieChart";
import LineChart from "components/Common/Chart/LineChart";
import SectionHeader from "components/Common/Chart/SectionHeader";

import {
  GRADIENT_2F3354_040221,
  COLOR_696C8C,
  COLOR_979CCA,
  COLOR_28C9A0,
  COLOR_AE46E7,
} from "shared/constants/colors";

const UserChartComponent = ({ userNo, category3No, category4No }) => {
  const [lineChartWidth, setLineChartWidth] = useState(300);

  useEffect(() => {
    setLineChartWidth(
      window.innerWidth > 1200 ? 1200 - 70 : window.innerWidth - 70
    );
    window.onresize = () => {
      setLineChartWidth(
        window.innerWidth > 1200 ? 1200 - 70 : window.innerWidth - 70
      );
    };
    return () => {
      window.onresize = null;
    };
  }, []);

  return (
    <div className="container">
      <ScoreChartContainer userNo={userNo} category3No={category3No} />
      <RankChartContainer
        userNo={userNo}
        category3No={category3No}
        category4No={category4No}
        lineChartWidth={lineChartWidth}
      />
      <PushChartContainer
        userNo={userNo}
        category3No={category3No}
        lineChartWidth={lineChartWidth}
      />

      <FanChartContainer userNo={userNo} />

      <VideoViewChartContainer
        userNo={userNo}
        category3No={category3No}
        lineChartWidth={lineChartWidth}
      />
      <VideoLikeChartContainer
        userNo={userNo}
        category3No={category3No}
        lineChartWidth={lineChartWidth}
      />
      {/* <VideoFollowChartContainer
            userNo={userNo}
            category3No={category3No}
            lineChartWidth={lineChartWidth}
          /> */}

      <style jsx>{`
        .container {
          padding-top: 30px;
        }
        .category {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
        }
        .period {
          font-size: 12px;
          color: #878792;
        }
        .category_select {
          margin-top: 20px;
          margin-bottom: 30px;
          text-align: right;
        }
        .category_select > select {
          background-color: transparent;
          height: 27px;
          padding: 0 12px;
          color: #aaa;
          font-size: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 5px;
        }
        .section {
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 30px;
          background: ${GRADIENT_2F3354_040221(180, "-27.85%", "68.61%")};
        }
        .wrapper {
          font-family: "Montserrat";
          text-align: center;
          padding-bottom: 18px;
        }
        .wrapper > .noti {
          font-size: 10px;
          color: ${COLOR_696C8C};
          margin: 0 10px 20px;
          text-align: left;
        }
        .bg {
          height: 170px;
          margin: 0 15px;
          box-sizing: border-box;
        }
        .wrapper .item {
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

UserChartComponent.propTypes = {
  userNo: PropTypes.number,
  category3No: PropTypes.number,
};

export default UserChartComponent;
