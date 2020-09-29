import React from "react";
import PropTypes from "prop-types";

const Introduction = ({ children }) => {
  return (
    <div className="introduction">
      {children}
      <style jsx>{`
        .introduction {
          width: 100%;
          min-height: 86px;
          padding: 16px;
          box-sizing: border-box;
          font-size: 12px;
          color: #fff;
          white-space: pre-line;
        }
      `}</style>
    </div>
  );
};

Introduction.propTypes = {
  children: PropTypes.node,
};

export default Introduction;
