import React, { forwardRef, useCallback } from "react";
import PropTypes from "prop-types";
import ScrollContainer from "react-indiana-drag-scroll";

import BounceLoader from "components/Common/BounceLoader";

import { MAIN_COLOR } from "shared/constants/colors";

import bgbgbg from "public/assets/image/background_bgbgbg.png";

const AllVideoList = (
  { title, link, list = [], onScroll, ItemComponent, isLoaded, style },
  ref
) => {
  const onScrollRight = useCallback(() => {
    // ref.current.container.current.scrollLeft = 800;
  }, [ref]);
  return (
    <div className={`video_list`} style={style}>
      <div className="title_badge">
        <div className="title">
          <span>{title}</span>
        </div>
        <select>
          <option value="1">좋아요 순</option>
          <option value="2">시청 순</option>
          <option value="3">댓글 순</option>
        </select>
      </div>

      <div className="list">
        {/* <ScrollContainer
            ref={ref}
            horizontal
            onScroll={onScroll}
            style={{
              height: "275px",
              overflow: "auto",
              whiteSpace: "nowrap",
            }}
          > */}
        {list &&
          list.map((item) => (
            <React.Fragment key={item.video_no}>
              {React.cloneElement(ItemComponent, { video: item })}
            </React.Fragment>
          ))}
        {isLoaded && (
          <BounceLoader
            color={MAIN_COLOR}
            style={{ display: "inline-block" }}
          />
        )}
        {/* </ScrollContainer> */}
      </div>
      <style jsx>{`
        .title_badge {
          text-align: left;
          padding: 0 40px;
          margin-bottom: 10px;
          overflow: hidden;
        }
        .title_badge select {
          width: 100px;
          height: 28px;
          border: 1px solid #fff;
          background-color: transparent;
          color: #fff;
          float: right;
        }
        .title_badge select option[value="1"],
        .title_badge select option[value="2"],
        .title_badge select option[value="3"] {
          background-color: #17182b;
        }
        .title {
          color: #fff;
          font-size: 23px;
          font-weight: bold;
          margin-right: 10px;
          text-align: left;
          float: left;
        }
        .title span {
          background: linear-gradient(to right, #0fe4b8, #c747f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .video_list {
          text-align: center;
          position: relative;
          display: block;
          margin-right: 0;
          margin-bottom: 40px;
          background-image: url(${bgbgbg});
          background-repeat: no-repeat;
          background-size: 100% 95px;
          background-color: #2f3354;
          padding-bottom: 20px;
        }
        .video_list:last-child {
          margin-right: 0;
        }
        .video_list .list {
          width: calc(100% - 80px);
          margin: 0 auto;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

AllVideoList.propTypes = {
  list: PropTypes.array.isRequired,
  onScroll: PropTypes.func,
  ItemComponent: PropTypes.node.isRequired,
  isLoaded: PropTypes.bool,
};

export default AllVideoList;
