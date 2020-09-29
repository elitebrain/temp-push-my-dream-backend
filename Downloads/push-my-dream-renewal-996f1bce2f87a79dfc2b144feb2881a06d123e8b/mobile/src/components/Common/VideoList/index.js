import React, { forwardRef, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import ScrollContainer from "react-indiana-drag-scroll";
import { useSelector } from "react-redux";

import BounceLoader from "components/Common/BounceLoader";
import Content from "components/Layout/Content";
// import ContentHeader from "../ContentHeader";
import VideoItem from "../VideoItem";

import arrow_ico from "public/assets/image/circle_arrow_right_none_tail(white).png";

import {
  BACKGROUND_BLACK_COLOR,
  GRADIENT_2B2C3F_020216,
  COLOR_AE46E7,
} from "shared/constants/colors";

const VideoList = forwardRef(
  (
    {
      title,
      onClickTitle,
      list = [],
      horizontal,
      vertical,
      gradientBg,
      isLoaded,
      type,
      chatIcon,
      likeIcon,
      viewIcon,
      onScroll,
      onLikeVideo,
      onViewVideo,
      customVideoClass,
      isCategory,
    },
    ref
  ) => {
    const agent = useSelector((state) => state.common.agent);

    const scrollClass = useMemo(
      () =>
        `ScrollContainer${horizontal ? " horizontal" : ""}${
          vertical
            ? String(agent).indexOf("rv:11.0") === -1
              ? " grid"
              : " flex"
            : ""
        }`,
      [horizontal, vertical, agent]
    );

    const containerClass = useMemo(
      () => `container${gradientBg ? " gradientBg" : ""}`,
      [gradientBg]
    );

    const VideoItemClass = useMemo(
      () =>
        customVideoClass
          ? `VideoItemClass${
              vertical
                ? String(agent).indexOf("rv:11.0") === -1
                  ? " grid"
                  : " flex"
                : null
            }`
          : null,
      [customVideoClass, vertical, agent]
    );

    // 리스트 아이템이 존재하지 않으면 렌더링을 하지 않는다.
    if (list && list.length === 0) {
      return null;
    }

    return (
      <div className={containerClass}>
        <Content>
          <div className="TitleContainer" onClick={onClickTitle}>
            <span>{title}</span>
            {isCategory && (
              <span className="JoinBtnContainer">
                <img
                  src={arrow_ico}
                  alt="join_btn"
                  width="100%"
                  height="100%"
                />
              </span>
            )}
          </div>
          {/* <ContentHeader
            title={title}
            onClickTitle={onClickTitle}
            mobileSelect
            style={{ paddingTop: "0" }}
          /> */}
          <div className="wrapper">
            {horizontal && <div className="leftGraientInScroll" />}
            {horizontal && <div className="rightGraientInScroll" />}
            {horizontal && (
              <ScrollContainer
                className={scrollClass}
                ref={ref}
                horizontal={horizontal}
                vertical={vertical}
                onScroll={onScroll && onScroll.bind(this, type)}
                nativeMobileScroll
              >
                {list &&
                  list
                    .filter((item) => item)
                    .map((video) => (
                      <VideoItem
                        key={video.video_no}
                        className={VideoItemClass}
                        video={video}
                        horizontal={horizontal}
                        vertical={vertical}
                        chatIcon={chatIcon}
                        likeIcon={likeIcon}
                        viewIcon={viewIcon}
                        isLiked
                        onLikeVideo={onLikeVideo}
                        onViewVideo={onViewVideo.bind(this, type)}
                      />
                    ))}

                {isLoaded && (
                  <BounceLoader
                    color={COLOR_AE46E7}
                    style={{ display: "inline-block" }}
                  />
                )}
              </ScrollContainer>
            )}

            {vertical && (
              <div
                className={scrollClass}

                // horizontal={horizontal}
                // vertical={vertical}
                // onScroll={onScroll && onScroll.bind(this, type)}
                // nativeMobileScroll
              >
                {list &&
                  list
                    .filter((item) => item)
                    .map((video) => (
                      <VideoItem
                        key={video.video_no}
                        className={VideoItemClass}
                        video={video}
                        horizontal={horizontal}
                        vertical={vertical}
                        chatIcon={chatIcon}
                        likeIcon={likeIcon}
                        viewIcon={viewIcon}
                        isLiked
                        onLikeVideo={onLikeVideo}
                        onViewVideo={onViewVideo.bind(this, type)}
                      />
                    ))}

                {isLoaded && (
                  <BounceLoader
                    color={COLOR_AE46E7}
                    style={{ display: "inline-block" }}
                  />
                )}
              </div>
            )}
          </div>
        </Content>
        <style jsx>{`
          .container {
            max-width: 1200px;
            margin: 0 auto;
            height: auto;
            background-color: ${BACKGROUND_BLACK_COLOR};
            overflow: hidden;
            padding: 15px 0 10px 0;
          }

          .TitleContainer {
            font-size: 18px;
            color: #fff;
            margin-bottom: 10px;

            display: flex;
            justify-content: space-between;
            align-items: center;

            ${Boolean(onClickTitle) ? "cursor: pointer;" : ""}
          }

          .JoinBtnContainer {
            width: 20px;
            height: 20px;
            margin-left: 7px;
          }
          .container.gate {
            background-color: ${BACKGROUND_BLACK_COLOR};
            padding: 30px 0;
          }
          .container.gradientBg {
            background-image: ${GRADIENT_2B2C3F_020216(90)};
          }

          .container .wrapper {
            position: relative;
            overflow: hidden;
          }
          .container .wrapper .leftGraientInScroll {
            z-index: 1;
            width: 10px;
            height: 100%;
            position: absolute;
            top: 0;
            left: -20px;
            background: linear-gradient(
              90deg,
              rgba(30, 30, 37, 0.5) 0%,
              rgba(0, 0, 0, 0) 100%
            );
          }

          .container .wrapper .rightGraientInScroll {
            z-index: 1;
            width: 10px;
            height: 100%;
            position: absolute;
            top: 0;
            right: -20px;
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(30, 30, 37, 0.5) 100%
            );
          }

          .container.gradientBg .wrapper .leftGraientInScroll {
            background: linear-gradient(
              90deg,
              rgba(35, 35, 41, 0.5) 0%,
              rgba(0, 0, 0, 0) 100%
            );
          }

          .container.gradientBg .wrapper .rightGraientInScroll {
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(35, 35, 41, 0.5) 100%
            );
          }

          :global(.ScrollContainer) {
            white-space: nowrap;
            position: relative;
          }

          :global(.ScrollContainer.horizontal) {
            margin: 0 -20px;
            overflow-y: hidden;
            overflow-x: auto;
          }

          :global(.ScrollContainer.vertical) {
            overflow: hidden;
          }

          :global(.ScrollContainer.grid) {
            display: grid;
            grid-template-columns: repeat(auto-fill, 120px);
            grid-template-rows: repeat(auto-fill, 190px);
            grid-gap: 5px;
            justify-content: center;
          }

          :global(.ScrollContainer.flex) {
            display: flex;
            flex-wrap: wrap;
            margin: -2.5px -2.5px;
          }

          :global(.VideoItemClass.grid) {
            width: 100% !important;
          }

          :global(.VideoItemClass.flex) {
            margin: 2.5px !important;
          }

          @media screen and (min-width: 1160px) {
            :global(.ScrollContainer.grid) {
              grid-template-columns: repeat(9, 1fr);
            }

            :global(.VideoItemClass.flex) {
              width: 10.6% !important;
            }
          }

          @media screen and (min-width: 1035px) and (max-width: 1160px) {
            :global(.ScrollContainer.grid) {
              grid-template-columns: repeat(8, 1fr);
            }
            :global(.VideoItemClass.flex) {
              width: 12% !important;
            }
          }

          @media screen and (min-width: 910px) and (max-width: 1035px) {
            :global(.ScrollContainer.grid) {
              grid-template-columns: repeat(7, 1fr);
            }
            :global(.VideoItemClass.flex) {
              width: 13.7% !important;
            }
          }

          @media screen and (min-width: 785px) and (max-width: 910px) {
            :global(.ScrollContainer.grid) {
              grid-template-columns: repeat(6, 1fr);
            }
            :global(.VideoItemClass.flex) {
              width: 16% !important;
            }
          }

          @media screen and (min-width: 660px) and (max-width: 785px) {
            :global(.ScrollContainer.grid) {
              grid-template-columns: repeat(5, 1fr);
            }
            :global(.VideoItemClass.flex) {
              width: 19% !important;
            }
          }

          @media screen and (min-width: 535px) and (max-width: 660px) {
            :global(.ScrollContainer.grid) {
              grid-template-columns: repeat(4, 1fr);
            }
            :global(.VideoItemClass.flex) {
              width: 23.5% !important;
            }
          }

          @media screen and (min-width: 410px) and (max-width: 535px) {
            :global(.ScrollContainer.grid) {
              grid-template-columns: repeat(3, 1fr);
            }
            :global(.VideoItemClass.flex) {
              width: 31.5% !important;
            }
          }

          @media screen and (min-width: 285px) and (max-width: 410px) {
            :global(.ScrollContainer.grid) {
              grid-template-columns: repeat(2, 1fr);
            }
            :global(.VideoItemClass.flex) {
              width: 48% !important;
            }
          }
        `}</style>
      </div>
    );
  }
);

VideoList.propTypes = {
  title: PropTypes.string.isRequired,
  onClickTitle: PropTypes.func,
  list: PropTypes.array.isRequired,

  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,

  type: PropTypes.string,
  gradientBg: PropTypes.bool,
  isLoaded: PropTypes.bool,
  chatIcon: PropTypes.bool,
  likeIcon: PropTypes.bool,
  viewIcon: PropTypes.bool,
  onLikeVideo: PropTypes.func,
  onViewVideo: PropTypes.func,
  onScroll: PropTypes.func,
  customVideoClass: PropTypes.bool,
  isCategory: PropTypes.bool,
};

// todo 최적화
export default React.memo(VideoList, (prevProps, nextProps) => {
  return (
    prevProps.list === nextProps.list &&
    prevProps.isLoaded === nextProps.isLoaded
  );
});
