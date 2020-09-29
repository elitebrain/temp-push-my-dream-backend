import React from "react";
import PropTypes from "prop-types";

import { GRADIENT_2F3354_040221 } from "shared/constants/colors";

const CustomSeasonContent = ({ children }) => {
  return (
    <div className="SeasonContent">
      {children}

      <style jsx>{`
        .SeasonContent {
          box-sizing: border-box;
          border-radius: 10px;
          width: 100%;
          padding: 10px 15px;
          background-image: ${GRADIENT_2F3354_040221(90, "-15.95%", "77.03%")};
        }
      `}</style>
    </div>
  );
};

CustomSeasonContent.propTypes = {
  children: PropTypes.node,
  content: PropTypes.string,
};

export default CustomSeasonContent;
