import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Layout from "components/Layout/Layout";
import BannerComponent from "./Banner/BannerComponent";
import AppleToptenComponent from "./Topten/AppleToptenComponent";
import EmergenzaToptenComponent from "./Topten/EmergenzaToptenComponent";
import NewVideoComponent from "./NewVideo/NewVideoComponent";
import HotVideoComponent from "./HotVideo/HotVideoComponent";
import FadeSlider from "components/Common/FadeSlider/FadeSlider";
import OfficialVideoComponent from "components/Common/OfficialVideo/OfficialVideoComponent";

const AppleComponent = (props) => {
  const {
    bannerList,
    toptenList,
    officialVideoList,
    newVideoList,
    hotVideoList,
  } = props;
  const [bannerIdx, setBannerIdx] = useState(0);
  useEffect(() => {
    let interval = setInterval(
      () => setBannerIdx((prevState) => (prevState + 1) % 1),
      7000
    );
    return () => clearInterval(interval);
  }, [bannerList]);
  console.log("bannerIdx", bannerIdx);
  return (
    <Layout transparent className="whiteBg">
      {/* <Layout transparent whiteText> */}
      {/* <Layout transparent className={bannerIdx === 0 ? "whiteBg" : ""}> */}
      <BannerComponent bannerList={bannerList} bannerIdx={bannerIdx} />
      <div className="topten_container">
        <div className="topten_wrapper">
          <AppleToptenComponent toptenList={toptenList} bannerIdx={bannerIdx} />
        </div>
      </div>
      {/* <FadeSlider
        type="vertical"
        time={7000}
        height={534}
        list={[
          <EmergenzaToptenComponent toptenList={toptenList} />,
          <AppleToptenComponent toptenList={toptenList} />
        ]}
      /> */}
      <OfficialVideoComponent officialVideoList={officialVideoList} />
      <NewVideoComponent newVideoList={newVideoList} />
      <HotVideoComponent hotVideoList={hotVideoList} />
      <style jsx>{`
        .topten_container {
          position: relative;
          min-width: 1366px;
          width: 100%;
          height: 534px;
          overflow: hidden;
        }
        .topten_wrapper {
          width: 100%;
          height: auto;
          transform: translateY(${bannerIdx * -50}%);
          transition: 1s ease-in-out;
        }
      `}</style>
    </Layout>
  );
};

AppleComponent.propTypes = {
  bannerList: PropTypes.array,
  toptenList: PropTypes.array,
  officialVideoList: PropTypes.array,
  newVideoList: PropTypes.array,
  hotVideoList: PropTypes.array,
};

export default AppleComponent;
