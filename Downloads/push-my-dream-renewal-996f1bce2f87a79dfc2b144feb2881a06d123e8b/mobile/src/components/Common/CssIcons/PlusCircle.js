import React from "react";
import PropTypes from "prop-types";

const PlusCircle = (props) => {
  const { size = 10, color = "#bfbfbf", style } = props;
  return (
    <div className="container" style={style}>
      <div className="circle"></div>
      <style jsx>{`
        .container {
          display: inline-block;
          vertical-align: middle;
        }
        .circle {
          position: relative;
          width: ${size}px;
          height: ${size}px;
          border: 1px solid ${color};
          color: ${color};
          border-radius: 50%;
        }
        .circle:before {
          position: absolute;
          content: "";
          width: ${Math.floor(size / 2)}px;
          border-top: 1px solid ${color};
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .circle:after {
          position: absolute;
          content: "";
          height: ${Math.floor(size / 2)}px;
          border-left: 1px solid ${color};
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
};

PlusCircle.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
};

export default PlusCircle;
