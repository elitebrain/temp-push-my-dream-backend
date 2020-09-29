import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { useDispatch } from "react-redux";

import arrowRightWhite from "public/assets/image/arrow_right_white.png";
import { MORE_VIDEO } from "store/reducers/offset";

const MainContentHeader = ({ title, url, noEtc }) => {
  const dispatch = useDispatch();
  const _handleAllView = e => {
    e.target.style.cursor = "wait";
    dispatch({
      type: MORE_VIDEO,
      data: {
        scrollTop: 0,
        hotVideoOffset: 0,
        viewVideoOffset: 0,
        newVideoOffset: 0
      }
    });
    Router.push(url);
  };

  return (
    <div className="wrapper">
      <span className="title">{title}</span>
      {!noEtc && (
        <span className="more_view" onClick={e => _handleAllView(e)}>
          <span>전체보기</span>
          <img src={arrowRightWhite} alt="arrow_right" />
        </span>
      )}
      <style jsx>{`
        .wrapper {
          position: relative;
          padding-top: 100px;
          margin-bottom: 30px;
          height: 30px;
        }
        .wrapper > span {
          position: absolute;
          bottom: 0;
          color: #fff;
        }
        .title {
          left: 0;
          font-size: 30px;
        }
        .more_view {
          right: 0;
          font-size: 16px;
        }
        .more_view:hover {
          cursor: pointer;
        }
        .more_view > span {
          vertical-align: middle;
        }
        .more_view > img {
          vertical-align: middle;
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

MainContentHeader.propTypes = {
  title: PropTypes.string,
  url: PropTypes.object,
  noEtc: PropTypes.bool
};

export default MainContentHeader;
