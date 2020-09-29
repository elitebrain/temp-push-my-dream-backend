import React from "react";
import PropTypes from "prop-types";

import { GRADIENT_2F3354_040221 } from "shared/constants/colors";

const GradientBox = ({ maxWidth, children }) => {
  return (
    <div className="GradientBox">
      {children}
      <style jsx>{`
        .GradientBox {
          ${maxWidth ? "max-width : 1200px;" : ""}
          ${maxWidth ? "margin: 0 auto;" : ""}
          box-sizing: border-box;
          padding: 20px;
          background-image: ${GRADIENT_2F3354_040221(90, "-15.95%", "77.03%")};
        }
      `}</style>
    </div>
  );
};

GradientBox.propTypes = {
  maxWidth: PropTypes.bool,
  children: PropTypes.node,
};

export default GradientBox;
