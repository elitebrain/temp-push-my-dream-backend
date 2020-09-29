import React from "react";
import PropTypes from "prop-types";

import {
  APPLE_CATEGORY_COLOR,
  EMERGENZA_CATEGORY_COLOR
} from "shared/constants/colors";

const CategoryBar = ({ type }) => {
  const emergenza = type === 6;
  const apple = type === 2;

  const default_background_color = apple
    ? APPLE_CATEGORY_COLOR
    : EMERGENZA_CATEGORY_COLOR;

  return (
    <div className="badge">
      {emergenza && "EMERGENZA"}
      {apple && "PUSH MY APPLE"}
      <style jsx>{`
        .badge {
          padding: 0 10px;
          height: 20px;
          display: inline-block;
          line-height: 20px;
          color: #fff;
          font-size: 10px;
          font-weight: bold;
          margin-bottom: 15px;
          background-color: ${default_background_color};
        }
      `}</style>
    </div>
  );
};

CategoryBar.propTypes = {
  type: PropTypes.number
};

export default CategoryBar;
