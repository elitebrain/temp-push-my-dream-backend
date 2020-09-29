import React from "react";
import PropTypes from "prop-types";

const Content = (props) => {
  const { mobile, children, contentPaddingNone, style } = props;
  return (
    <div
      className={`wrapper_content${
        contentPaddingNone ? " contentPaddingNone" : ""
      }`}
      style={style}
    >
      {children}
      <style jsx>{`
        .wrapper_content {
          width: 100%;
          height: auto;
          max-width: 1200px;
          margin: auto;
          padding: 0px 20px;
          box-sizing: border-box;
        }
        .wrapper_content.contentPaddingNone {
          padding: 0;
        }
        /*
        @media (max-width: 425px) {
          .wrapper_content {
            width: calc(100% - 40px);
          }
        }*/
      `}</style>
    </div>
  );
};

Content.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

export default Content;
