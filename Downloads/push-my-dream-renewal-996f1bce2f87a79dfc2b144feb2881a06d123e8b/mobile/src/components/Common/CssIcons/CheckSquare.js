import React from "react";
import PropTypes from "prop-types";

import check from "public/assets/icon/check(purple).svg";

const CheckSquare = (props) => {
  const { size = 10, color = "#e2e2e2", style, active } = props;
  return (
    <div className="container" style={style}>
      <div className="square">
        <div className="active">
          <img src={check} alt="check_ico" />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: inline-block;
          vertical-align: middle;
        }
        .square {
          position: relative;
          width: ${size}px;
          height: ${size}px;
          border: 1px solid ${color};
          color: ${color};
        }
        .square > .active {
          position: absolute;
          opacity: ${active ? 1 : 0};
          width: 100%;
          height: 100%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: ${color};
          font-size: ${size}px;
          transition: 0.3s ease-in-out;
        }
        .square > .active > img {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
};

CheckSquare.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  style: PropTypes.object,
  active: PropTypes.bool,
};

export default CheckSquare;
