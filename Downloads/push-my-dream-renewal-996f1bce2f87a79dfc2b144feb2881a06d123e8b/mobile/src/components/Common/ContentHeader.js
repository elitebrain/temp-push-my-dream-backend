import React, { useMemo } from "react";
import PropTypes from "prop-types";
import select_ico from "public/assets/icon/select_arrow(gray).svg";
import { GRADIENT_00F1B4_D53CF5 } from "shared/constants/colors";

const ContentHeader = (props) => {
  const {
    style,
    title,
    onClickTitle,
    activeIdx,
    handleSort,
    sort,
    mobileSelect,
    borderGradient,
  } = props;

  const wrapperClass = useMemo(
    () => `ContentHeader${borderGradient ? " borderGradient" : ""}`,
    [borderGradient]
  );

  return (
    <>
      <div className={wrapperClass} style={style}>
        <span className="title" onClick={onClickTitle}>
          {title}
        </span>

        {/* {sort && (
        <div className="sort">
          <span onClick={() => handleSort(0)}>RANK</span>
          <span onClick={() => handleSort(1)}>좋아요순</span>
          <span onClick={() => handleSort(2)}>댓글순</span>
          <span onClick={() => handleSort(3)}>최신순</span>
        </div>
      )} */}
        {/* {mobileSelect && (
        <select className="mobile_select">
          <option>RANK</option>
          <option>좋아요순</option>
          <option>댓글순</option>
          <option>최신순</option>
        </select>
      )} */}
      </div>
      {borderGradient && <div className="underline"></div>}
      <style jsx>{`
        .ContentHeader {
          padding-top: 30px;
          margin-bottom: 10px;
        }

        .ContentHeader.borderGradient {
          margin-bottom: 5px;
        }

        .underline {
          width: 100%;
          height: 1px;
          background-image: ${GRADIENT_00F1B4_D53CF5(90)};
          margin-bottom: 15px;
        }

        .title {
          ${onClickTitle ? "cursor: pointer" : ""};
        }

        .title,
        .sort {
          color: #fff;
        }
        .mobile_select {
          width: 65px;
          font-size: 15px;
          position: absolute;
          bottom: 0;
          right: 0;
          color: #fff;
          border: none;
          background-color: inherit;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: url(${select_ico}) 100% / 20% no-repeat;
        }
        .mobile_select option {
          background-color: inherit;
        }
        .title {
          left: 0;
          font-size: 18px;
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
    </>
  );
};

ContentHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onClickTitle: PropTypes.func,
  count: PropTypes.number,
  activeIdx: PropTypes.number,
  handleSort: PropTypes.func,
  sort: PropTypes.bool,
  style: PropTypes.object,
};

export default ContentHeader;
