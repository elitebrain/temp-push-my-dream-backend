import React from "react";
import PropTypes from "prop-types";

import arrow_left from "public/assets/icon/arrow_left(white).svg";

const HeaderBlockButton = ({ isViewHeader, onClick }) => {
  return (
    <div className="header_block_button_container" onClick={onClick}>
      <div className="content_box">
        <img src={arrow_left} alt="arrow_ico" />
      </div>
      <style jsx>{`
        .header_block_button_container {
          width: 55px;
          height: 20px;
          border: 1px solid #fff;
          border-radius: 5px;
          position: absolute;
          top: 0;
          right: -50px;
          display: none;
        }
        .content_box {
          width: 55px;
          height: 20px;
          position: relative;
        }
        .content_box img {
          width: 15px;
          height: 15px;
          position: absolute;
          bottom: -17px;
          left: 20px;
          transform: rotate(${isViewHeader ? "90deg" : "-90deg"});
        }
        @media (max-width: 1440px) {
          .header_block_button_container {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

HeaderBlockButton.propTypes = {
  isViewHeader: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default HeaderBlockButton;
