import React from "react";
import PropTypes from "prop-types";

import {
  COLOR_AE46E7,
  WHITE_COLOR,
  GRADIENT_2F3354_040221,
} from "shared/constants/colors";

const Title = ({ season }) => {
  return (
    <div className="title_container">
      <span>{season.CATEGORY_LEVEL2.category_level2}</span>
      <span>{season.category_level3}</span>
      <style jsx>{`
        .title_container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-image: ${GRADIENT_2F3354_040221(180, "-27.85%", "68.61%")};
        }
        .title_container span:first-child {
          color: ${COLOR_AE46E7};
          font-size: 14px;
          font-weight: midium;
          display: block;
        }
        .title_container span:last-child {
          color: ${WHITE_COLOR};
          font-size: 18px;
          font-weight: bold;
          display: block;
        }
      `}</style>
    </div>
  );
};

Title.propTypes = {
  season: PropTypes.shape({
    CATEGORY_LEVEL2: PropTypes.shape({ category_level2: PropTypes.string }),
    category_level3: PropTypes.string,
  }),
};

export default Title;
