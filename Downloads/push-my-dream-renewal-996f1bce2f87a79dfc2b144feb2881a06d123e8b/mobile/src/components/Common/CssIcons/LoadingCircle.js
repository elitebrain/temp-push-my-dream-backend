import React from "react";
import PropTypes from "prop-types";

const LoadingCircle = (props) => {
  // const { borderColor = "#1890ff", borderSize = "2px", size = "20px" } = props;
  const { borderColor = "#777", borderSize = "4px", size = "40px" } = props;
  return (
    <div className="loading_container">
      <div className="loading">
        <div className="loading_circle" />
      </div>
      <style jsx>{`
        .loading_container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-20px, -120px);
        }
        .loading {
          position: relative;
          width: 100%;
          height: 200px;
        }
        .loading_circle {
          position: absolute;
          left: 50%;
          top: 50%;
          width: ${size};
          height: ${size};
          border-radius: 50%;
          border: ${borderSize} solid;
          border-color: ${borderColor} ${borderColor} ${borderColor} transparent;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

LoadingCircle.propTypes = {
  borderColor: PropTypes.string,
  borderSize: PropTypes.string,
  size: PropTypes.string,
};

export default LoadingCircle;
