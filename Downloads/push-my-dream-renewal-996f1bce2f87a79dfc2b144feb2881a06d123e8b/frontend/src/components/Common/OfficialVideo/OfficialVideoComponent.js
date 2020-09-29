import React, { useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { useDispatch } from "react-redux";

import emergenzaBadge from "public/assets/image/emergenza_badge.png";
import { MORE_VIDEO } from "store/reducers/offset";

import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import MainContentHeader from "components/Common/MainContentHeader";
import EmptyVideo from "components/Common/EmptyVideo";
import Video from "components/Common/Video";

const OfficialVideoComponent = ({ officialVideoList }) => {
  const [officialVideoIdx, setOfficialVideoIdx] = useState(0);
  const dispatch = useDispatch();
  const _handleWheel = e => {
    const direction = e.deltaY < 0 ? "up" : "down";
    if (direction === "up") {
      setOfficialVideoIdx(prevState => {
        if (prevState > 0) {
          return prevState - 1;
        } else {
          return prevState;
        }
      });
    } else {
      setOfficialVideoIdx(prevState => {
        if (prevState < officialVideoList.length - 4) {
          return prevState + 1;
        } else {
          return prevState;
        }
      });
    }
  };
  const _handleThumbnail = (e, idx, videoNo) => {
    if (idx < officialVideoIdx + 4 && idx >= officialVideoIdx) {
      e.target.style.cursor = "wait";
      dispatch({
        type: MORE_VIDEO,
        data: {
          viewVideoOffset: idx,
          scrollTop: document.querySelector("html").scrollTop
        }
      });
      Router.push("/video/[video_no]", `/video/${videoNo}`);
    } else if (idx > officialVideoList.length - 4) {
      setOfficialVideoIdx(officialVideoList.length - 4);
    } else {
      setOfficialVideoIdx(idx);
    }
  };
  return (
    <Body>
      <div className="container_official_video">
        <Content>
          <MainContentHeader
            title="오피셜 영상"
            noEtc
            // url={{
            //   pathname: "/video/hot",
            //   query: {
            //     category: 6
            //   }
            // }}
          />
          <div className="official_video_list_frame">
            <div className="official_video_list">
              {officialVideoList && officialVideoList.length > 0 ? (
                officialVideoList.map((video, i) => (
                  <div
                    key={i}
                    className="official_video"
                    onClick={e => _handleThumbnail(e, i, video.video_no)}
                  >
                    <Video
                      key={video.video_no}
                      videoNo={video.video_no}
                      thumbnail={video.thumbnail}
                      description={video.description}
                      title={video.title}
                      countView={video.countViewVideo}
                      countLike={video.countLikeVideo}
                      category={video.category_level2_no}
                      style={{ zIndex: "-1" }}
                    />
                    {(i < officialVideoIdx || i > officialVideoIdx + 3) && (
                      <div className="out_video_cover" />
                    )}
                  </div>

                  // <div
                  //   key={i}
                  //   className="official_video"
                  //   onClick={e => _handleThumbnail(e, i, video.video_no)}
                  // >
                  //   <img
                  //     className="official_video_thumbnail"
                  //     src={video.thumbnail}
                  //     alt="official_video_thumbnail"
                  //   />
                  //   {(i < officialVideoIdx || i > officialVideoIdx + 4) && (
                  //     <div className="out_video_cover" />
                  //   )}
                  //   {/* {video.category_level2_no === 6 && (
                  //     <img
                  //       className="emergenza_badge"
                  //       src={emergenzaBadge}
                  //       alt="emergenza_badge"
                  //     />
                  //   )} */}
                  // </div>
                ))
              ) : (
                <EmptyVideo />
              )}
            </div>
          </div>
        </Content>
      </div>
      <style jsx>{`
        .container_official_video {
          width: 100%;
          height: 585px;
          background-color: #1e1e25;
          overflow: hidden;
        }
        .official_video_list_frame {
          width: 100%;
          height: 350px;
        }
        .official_video_list {
          height: 350px;
          white-space: nowrap;
          transform: translateX(${officialVideoIdx * -306}px);
          transition: 0.3s ease-in-out;
        }
        .official_video {
          width: 282px;
          height: 260px;
          margin-right: 24px;
          position: relative;
          display: inline-block;
          cursor: pointer;
        }
        .official_video:last-of-type {
          margin-right: initial;
        }

        .official_video:hover {
          cursor: pointer;
        }
        .out_video_cover {
          position: absolute;
          width: 282px;
          height: 355px;
          background-color: rgba(30, 30, 37, 0.75);
          z-index: 2;
          left: 0;
          top: 0;
          animation: fadein 0.2s linear;
        }
        .official_video > .official_video_thumbnail {
          position: absolute;
          height: 100%;
          width: auto;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .emergenza_badge {
          position: absolute;
          left: 0;
          top: 30px;
          background: rgba(255, 255, 255, 0.7);
          width: 123px;
          height: auto;
        }
        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </Body>
  );
};

OfficialVideoComponent.propTypes = {
  officialVideoList: PropTypes.array
};

export default OfficialVideoComponent;
