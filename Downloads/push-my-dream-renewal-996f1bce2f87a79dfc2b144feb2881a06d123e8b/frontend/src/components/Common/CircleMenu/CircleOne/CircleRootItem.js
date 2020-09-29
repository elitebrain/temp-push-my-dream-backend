import React from "react";
import PropTypes from "prop-types";

const CircleRootItem = ({ children, isOngoing, content }) => {
  return (
    <div className="content">
      {children}
      {isOngoing && <span className="ongoing">진행중</span>}
      {content && <span>{content}</span>}
      <style jsx>{`
        .content {
          width: 93px;
          height: 90px;
          position: absolute;
          color: #fff;
          font-size: 16px;
        }
        .content span {
          display: block;
          text-align: center;
        }
        .content .ongoing {
          width: 65px;
          margin: 0 auto;
          height: 25px;
          line-height: 25px;
          font-size: 14px;
          background-color: #f38400;
          border-radius: 30px;
          padding: 0 10px;
        }
      `}</style>
    </div>
  );
};

CircleRootItem.propTypes = {
  children: PropTypes.element,
  isOngoing: PropTypes.bool,
  content: PropTypes.string
};

export default CircleRootItem;
