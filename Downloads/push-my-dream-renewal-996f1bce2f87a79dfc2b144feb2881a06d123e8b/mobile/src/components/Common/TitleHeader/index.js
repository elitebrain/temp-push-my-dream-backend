import React from "react";
import PropTypes from "prop-types";

import { WHITE_COLOR, BACKGROUND_BLACK_COLOR } from "shared/constants/colors";

const TitleHeader = ({ pt, left, right, children }) => {
  return (
    <div className="TitleHeader">
      <div className="TitleHeader_Flex">
        <div className="TitleHeader_Left">{left}</div>
        <div className="TitleHeader_Text">{children}</div>
        <div className="TitleHeader_Right">{right}</div>
      </div>
      <style jsx>{`
        .TitleHeader {
          width: 100%;
          height: 77px;
          ${pt ? `padding-top: 50px;` : ""}
          margin: 0 auto;

          background-color: ${BACKGROUND_BLACK_COLOR};
        }

        .TitleHeader_Flex {
          max-width: 1200px;
          height: 100%;
          margin: 0 auto;
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .TitleHeader .TitleHeader_Flex .TitleHeader_Text {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          flex: 1;
          height: 77px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${WHITE_COLOR};
          font-size: 20px;
          font-weight: bold;
        }
        .TitleHeader_Flex .TitleHeader_Left,
        .TitleHeader_Flex .TitleHeader_Right {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }

        .TitleHeader_Flex .TitleHeader_Left {
          margin-left: 20px;
        }
        .TitleHeader_Flex .TitleHeader_Right {
          margin-right: 20px;
        }
      `}</style>
    </div>
  );
};

TitleHeader.propTypes = {
  pt: PropTypes.bool,
  left: PropTypes.node,
  right: PropTypes.node,
  children: PropTypes.node,
};

export default TitleHeader;
