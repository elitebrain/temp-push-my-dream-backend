import React from "react";
import PropTypes from "prop-types";

const BannerNoti = (props) => {
  const { noti, bgColor, NotiSrc, className } = props;
  return (
    <div className="banner_noti">
      <div className="wrapper_noti">
        <img src={NotiSrc} alt="banner_noti" className={className} />
        {/* <span>{noti}</span> */}
        {/* <span dangerouslySetInnerHTML={{ __html: noti }} /> */}
      </div>
      <style jsx>{`
        .banner_noti {
          position: relative;
          font-size: 26px;
          bottom: 0;
          width: 100%;
          height: 60px;
          line-height: 60px;
          background-color: ${bgColor};
          /* color: #fff; */
          font-weight: bold;
          text-align: center;
        }
        .wrapper_noti {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        .wrapper_noti > img {
          vertical-align: middle;
        }
        .wrapper_noti .noti_img_shadow_w {
          -webkit-filter: drop-shadow(3px 0px 5px rgba(255, 255, 255, 0.7))
            drop-shadow(10px 0px 5px rgba(255, 255, 255, 0.2))
            drop-shadow(-13px 0px 5px rgba(255, 255, 255, 0.3));
          filter: drop-shadow(3px 0px 5px rgba(255, 255, 255, 0.7))
            drop-shadow(10px 0px 5px rgba(255, 255, 255, 0.2))
            drop-shadow(-13px 0px 5px rgba(255, 255, 255, 0.3));
        }
        .wrapper_noti > span {
          display: inline-block;
          vertical-align: bottom;
          margin-left: 10px;
          font-size: 18px;
          line-height: 50px;
        }
        .wrapper_noti .small {
          width: 170px;
          height: 70px;
        }
      `}</style>
    </div>
  );
};

BannerNoti.propTypes = {
  noti: PropTypes.string,
};

export default BannerNoti;
