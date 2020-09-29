import React, { forwardRef, useCallback } from "react";
import PropTypes from "prop-types";
import ScrollContainer from "react-indiana-drag-scroll";

import BounceLoader from "components/Common/BounceLoader";

import { MAIN_COLOR } from "shared/constants/colors";

import bgbgbg from "public/assets/image/background_bgbgbg.png";
import arrow_ico from "public/assets/icon/arrow_right_ico(white).svg";

const VideoList = forwardRef(
  (
    {
      title,
      link,
      list = [],
      onScroll,
      ItemComponent,
      isLoaded,
      mainLong,
      mainShort,
      allVideo,
      badgeDream,
      badgeChoco,
      badgeDancer,
      badgeEmergenza,
      badgeSinger,
      badgeTrainer,
      moreButton,
      style,
    },
    ref
  ) => {
    const onScrollRight = useCallback(() => {
      // ref.current.container.current.scrollLeft = 800;
    }, [ref]);
    console.log("list", list);
    return (
      <div
        className={`video_list${mainLong ? " mainLong" : ""}${
          mainShort ? " mainShort" : ""
        }${allVideo ? " allVideo" : ""}`}
        style={style}
      >
        <div className="left_arrow">
          <img
            src={arrow_ico}
            alt="arrow_ico"
            width="100%"
            height="100%"
            style={{ transform: "rotate(180deg)" }}
          />
        </div>
        <div className="right_arrow" onClick={onScrollRight}>
          <img src={arrow_ico} alt="arrow_ico" width="100%" height="100%" />
        </div>
        <div className="title_badge">
          <div className="title">
            <span>{title}</span>
          </div>
          {badgeDream ? <div className="badge apple">R</div> : ""}
          {badgeChoco ? <div className="badge choco">C</div> : ""}
          {badgeDancer ? <div className="badge dance">D</div> : ""}
          {badgeEmergenza ? <div className="badge emergenza">E</div> : ""}
          {badgeSinger ? <div className="badge singer">S</div> : ""}
          {badgeTrainer ? <div className="badge trainer">T</div> : ""}
          {moreButton ? (
            <span className="more_btn">
              <a>
                {/* Link 태그로 바꿀것! */}
                더보기
              </a>
            </span>
          ) : (
            ""
          )}
        </div>

        {/* <div className="list_bg" /> */}
        <div className="list">
          <ScrollContainer
            ref={ref}
            horizontal
            onScroll={onScroll}
            style={{
              height: "275px",
              overflow: "auto",
              whiteSpace: "nowrap",
            }}
          >
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
          </ScrollContainer>
        </div>
        <style jsx>{`
          .allVideo .left_arrow,
          .allVideo .right_arrow {
            display: none;
          }
          .list_bg {
            height: 200px;
            width: 585px;
            background-color: #2f3354;
          }
          .title_badge {
            text-align: left;
            padding: 0 40px;
            margin-bottom: 10px;
            overflow: hidden;
          }
          .title {
            color: #fff;
            font-size: 23px;
            font-weight: bold;
            margin-right: 10px;
            float: left;
          }
          .title span {
            background: linear-gradient(to right, #0fe4b8, #c747f1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .title_badge .badge {
            width: 25px;
            height: 25px;
            line-height: 25px;
            border-radius: 5px;
            color: #fff;
            text-align: center;
            float: left;
          }
          .title_badge .badge.apple {
            background-color: #ff0000;
          }
          .title_badge .badge.choco {
            background-color: #0e72ab;
          }
          .title_badge .badge.dance {
            background-color: #ffc207;
          }
          .title_badge .badge.emergenza {
            background-color: #fe9213;
          }
          .title_badge .badge.singer {
            background-color: #178852;
          }
          .title_badge .badge.trainer {
            background-color: #60028c;
          }
          .more_btn {
            color: #fff;
            float: right;
            cursor: pointer;
          }
          .video_list {
            text-align: center;
            position: relative;
            display: inline-block;
            margin-right: 25px;
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
            width: 520px;
            height: 270px;
            display: inline-block;
            vertical-align: top;
            text-align: left;
          }
          .video_list.mainLong {
            display: block;
            margin-right: 0;
          }
          .video_list.mainLong .list_bg {
            width: 100%;
          }
          .left_arrow {
            width: 20px;
            height: 20px;
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);

            cursor: pointer;
            color: #777777;
          }
          .right_arrow {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #777777;
          }
          .video_list.mainLong .list {
            width: calc(100% - 80px);
          }
          .video_list.mainShort {
            width: 600px;
          }
          @media (max-width: 1366px) {
            .list_bg {
              width: 455px;
            }
            .video_list .list {
              width: 370px;
            }
            .video_list.mainShort {
              width: 460px;
            }
          }
        `}</style>
      </div>
    );
  }
);

VideoList.propTypes = {
  list: PropTypes.array.isRequired,
  onScroll: PropTypes.func,
  ItemComponent: PropTypes.node.isRequired,
  isLoaded: PropTypes.bool,
};

export default VideoList;
