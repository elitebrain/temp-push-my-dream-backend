import React from "react";
import PropTypes from "prop-types";

import logoInfinite from "public/assets/icon/infinite_ico(black).svg";

const InfiniteLogo = props => {
  const { style, width, height } = props;
  return (
    <div className="wrapper" style={style}>
      <img src={logoInfinite} alt="logo_infinite" />
      <style jsx>{`
        .wrapper {
          position: absolute;
          width: 640px;
          height: 280px;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 0;
        }
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: ${width || "770"}px;
          height: ${height || "382"}px;
        }
      `}</style>
    </div>
  );
};

InfiniteLogo.propTypes = {
  style: PropTypes.object
};

export default InfiniteLogo;
