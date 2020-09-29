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

const HotVideoComponent = props => {
  const { hotVideoList } = props;
  const [hotVideoIdx, setHotVideoIdx] = useState(0);
  const dispatch = useDispatch();
  const _handleWheel = e => {
    const direction = e.deltaY < 0 ? "up" : "down";
    if (direction === "up") {
      setHotVideoIdx(prevState => {
        if (prevState > 0) {
          return prevState - 1;
        } else {
          return prevState;
        }
      });
    } else {
      setHotVideoIdx(prevState => {
        if (prevState < hotVideoList.length - 5) {
          return prevState + 1;
        } else {
          return prevState;
        }
      });
    }
  };
  const _handleThumbnail = (e, idx, videoNo) => {
    if (idx < hotVideoIdx + 5 && idx >= hotVideoIdx) {
      e.target.style.cursor = "wait";
      dispatch({
        type: MORE_VIDEO,
        data: {
          viewVideoOffset: idx,
          scrollTop: document.querySelector("html").scrollTop
        }
      });
      Router.push("/video/[video_no]", `/video/${videoNo}`);
    } else if (idx > hotVideoList.length - 5) {
      setHotVideoIdx(hotVideoList.length - 5);
    } else {
      setHotVideoIdx(idx);
    }
  };
  return (
    <Body>
      <div className="container_hot_video">
        <Content>
          <MainContentHeader
            title="핫톡 영상"
            url={{
              pathname: "/video/hot",
              query: {
                category: 2
              }
            }}
          />
          <div className="hot_video_list_frame">
            <div className="hot_video_list">
              {hotVideoList && hotVideoList.length > 0 ? (
                hotVideoList.map((video, i) => (
                  <div
                    key={i}
                    className="hot_video"
                    onClick={e => _handleThumbnail(e, i, video.video_no)}
                  >
                    <img
                      className="hot_video_thumbnail"
                      src={video.thumbnail}
                      alt="hot_video_thumbnail"
                    />
                    {(i < hotVideoIdx || i > hotVideoIdx + 4) && (
                      <div className="out_video_cover" />
                    )}
                    {/* {video.category_level2_no === 6 && (
                      <img
                        className="emergenza_badge"
                        src={emergenzaBadge}
                        alt="emergenza_badge"
                      />
                    )} */}
                  </div>
                ))
              ) : (
                <EmptyVideo />
              )}
            </div>
          </div>
        </Content>
      </div>
      <style jsx>{`
        .container_hot_video {
          width: 100%;
          height: 640px;
          background-color: #39394a;
          overflow: hidden;
        }
        .hot_video_list_frame {
          width: 100%;
          height: 350px;
        }
        .hot_video_list {
          height: 350px;
          white-space: nowrap;
          transform: translateX(${hotVideoIdx * -244}px);
          transition: 0.3s ease-in-out;
        }
        .hot_video {
          position: relative;
          display: inline-block;
          width: 224px;
          height: 350px;
          margin-right: 20px;
          border-radius: 10px;
          background-color: #000;
          overflow: hidden;
        }
        .hot_video:hover {
          cursor: pointer;
        }
        .out_video_cover {
          position: absolute;
          width: 224px;
          height: 350px;
          background-color: rgba(30, 30, 37, 0.75);
          z-index: 2;
          left: 0;
          top: 0;
          animation: fadein 0.2s linear;
        }
        .hot_video > .hot_video_thumbnail {
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

HotVideoComponent.propTypes = {
  hotVideoList: PropTypes.array
};

export default HotVideoComponent;
