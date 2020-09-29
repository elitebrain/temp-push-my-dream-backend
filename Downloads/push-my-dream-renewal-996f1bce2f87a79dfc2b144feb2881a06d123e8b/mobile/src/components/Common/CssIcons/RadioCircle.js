import React from "react";
import PropTypes from "prop-types";

const RadioCircle = props => {
  const {
    size = 12,
    borderColor = "#bfbfbf",
    style,
    active,
    activeColor = "#ff2d2d"
  } = props;
  return (
    <div className="container" style={style}>
      <div className="circle">
        <div className="active"></div>
      </div>
      <style jsx>{`
        .container {
          display: inline-block;
          vertical-align: middle;
        }
        .circle {
          position: relative;
          width: ${size}px;
          height: ${size}px;
          border: 1px solid ${borderColor};
          border-radius: 50%;
        }
        .circle > .active {
          position: absolute;
          display: ${active ? "block" : "none"};
          width: ${size / 2}px;
          height: ${size / 2}px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: ${activeColor};
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

RadioCircle.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
  active: PropTypes.bool
};

export default RadioCircle;
