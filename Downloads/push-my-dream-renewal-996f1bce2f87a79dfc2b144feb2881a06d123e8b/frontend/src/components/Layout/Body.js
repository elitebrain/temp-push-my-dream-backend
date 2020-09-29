import React from "react";
import PropTypes from "prop-types";

const Body = (props) => {
  const { children, style } = props;
  return (
    <div className="wrapper_body" style={style}>
      {children}
      <style jsx>{`
        .wrapper_body {
          width: 100%;
          /* min-width: 1366px; */
          min-width: 1300px;
          background-color: #1e1e25;
        }
      `}</style>
    </div>
  );
};

Body.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  style: PropTypes.object,
};

export default Body;
