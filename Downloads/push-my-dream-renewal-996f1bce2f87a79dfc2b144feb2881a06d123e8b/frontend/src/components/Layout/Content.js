import React from "react";
import PropTypes from "prop-types";

const Content = props => {
  const { children, style } = props;
  return (
    <div className="wrapper_content" style={style}>
      {children}
      <style jsx>{`
        .wrapper_content {
          position: relative;
          width: 1200px;
          margin: auto;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

Content.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  style: PropTypes.object
};

export default Content;
