import React from "react";
import PropTypes from "prop-types";

const ContentHeader = (props) => {
  const { style, title, count, activeIdx, handleSort, sort } = props;
  return (
    <div className={"wrapper"} style={style}>
      <span className="title">
        {title}
        <span>({count})</span>
      </span>
      {/* {sort && (
        <div className="sort">
          <span onClick={() => handleSort(0)}>RANK</span>
          <span onClick={() => handleSort(1)}>좋아요순</span>
          <span onClick={() => handleSort(2)}>댓글순</span>
          <span onClick={() => handleSort(3)}>최신순</span>
        </div>
      )} */}
      <style jsx>{`
        .wrapper {
          position: relative;
          padding-top: 100px;
          margin-bottom: 30px;
          height: 30px;
        }
        .title,
        .sort {
          position: absolute;
          bottom: 0;
          color: #fff;
        }
        .title {
          left: 0;
          font-size: 30px;
        }
        .title > span {
          font-size: 16px;
          margin-left: 8px;
        }
        .sort {
          right: 0;
          font-size: 16px;
        }
        .sort > span:hover {
          cursor: pointer;
        }
        .sort > span:nth-child(${activeIdx + 1}) {
          color: #f38400;
        }
        .sort > span {
          position: relative;
          vertical-align: middle;
          margin-left: 40px;
        }
        .sort > span:before {
          position: absolute;
          content: "";
          top: 50%;
          right: -20px;
          border-left: 2px solid #636368;
          height: 2px;
          transform: translateY(-50%);
        }
        .sort > span:last-child:before {
          border-left: none;
        }
      `}</style>
    </div>
  );
};

ContentHeader.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  activeIdx: PropTypes.number,
  handleSort: PropTypes.func,
  sort: PropTypes.bool,
  style: PropTypes.object,
};

export default ContentHeader;
