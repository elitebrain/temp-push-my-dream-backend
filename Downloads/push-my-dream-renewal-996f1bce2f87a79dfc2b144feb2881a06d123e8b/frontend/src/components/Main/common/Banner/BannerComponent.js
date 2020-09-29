import React from "react";
import PropTypes from "prop-types";

import emergenza_banner from "public/assets/image/emergenza_banner_gold.jpg";
import Body from "components/Layout/Body";
import EmergenzaBanner from "./BannerContent/EmergenzaBanner";

const BannerComponent = props => {
  const { bannerList, bannerIdx } = props;
  console.log("bannerIdx", bannerIdx);
  return (
    <Body>
      <div className="container_banner">
        <div className="banner_wrapper">
          <div className="banner">
            <EmergenzaBanner />
          </div>
        </div>
      </div>
      <style jsx>{`
        .container_banner {
          white-space: nowrap;
          overflow: hidden;
        }
        .banner_wrapper{
          display: inline-block;
          width: 100%;
          transform: translateX(${bannerIdx * -100}%);
          transition: 1s ease-in-out;
        }
        .banner {
          position: relative;
          width: 100%;
          height: 348px;
          margin-top:60px;
          background-image: url('${emergenza_banner}');
          background-size: cover;
        }
      `}</style>
    </Body>
  );
};

BannerComponent.propTypes = {
  bannerList: PropTypes.array
};

export default BannerComponent;
