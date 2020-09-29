import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import circleArrowLeftWhite from "public/assets/image/circle_arrow_left_white.png";
import circleArrowRightWhite from "public/assets/image/circle_arrow_right_white.png";

import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import { MORE_VIDEO } from "store/reducers/offset";

const leftOut = 100;

const EmergenzaToptenComponent = props => {
  const { toptenList } = props;
  const [toptenIdx, setToptenIdx] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const { lastToptenIdx } = useSelector(state => state.offset);
  useEffect(() => {
    setToptenIdx(lastToptenIdx);
  }, []);
  const _handleVideo = () => {
    dispatch({
      type: MORE_VIDEO,
      data: {
        lastToptenIdx: toptenIdx,
        scrollTop: document.querySelector("html").scrollTop
      }
    });
    const videoNo = toptenList[toptenIdx].video_no;
    router.push("/video/[video_no]", `/video/${videoNo}`);
  };
  const _handleArrow = direction => {
    if (direction === "left") {
      setToptenIdx(prevState => {
        if (prevState > 0) {
          return prevState - 1;
        } else {
          return prevState;
        }
      });
    } else {
      setToptenIdx(prevState => {
        if (prevState < toptenList.length - 1) {
          return prevState + 1;
        } else {
          return prevState;
        }
      });
    }
  };
  return (
    <Body>
      <div className="container_topten">
        <Content>
          <div className="wrapper_topten">
            <div className="text_group">
              <h1 className="noti">TOP 10</h1>
              {/* {toptenList.length > 0 ? ( */}
              <h2 className="contest_title">EMERGENZA 2020 ONLINE 예선</h2>
              {/* ) : (
                <h2 className="contest_title">EMERGENZA 2020 온라인 예선</h2>
              )} */}
              {toptenList.length > 0 ? (
                <h3 className="rank">{`${toptenIdx + 1}위 ${
                  toptenList[toptenIdx].team_name
                }`}</h3>
              ) : (
                <div className="h_38px"></div>
              )}
              {/* {toptenList.length > 0 ? (
                <h3 className="title">{toptenList[toptenIdx].title}</h3>
              ) : ( */}
              <div className="h_24px" />
              {/* )} */}
            </div>
            <div className="thumbnail_list_frame">
              {toptenIdx > 0 && <div className="thumbnail_out_frame" />}
              <div
                className="thumbnail_active_frame"
                onClick={() => _handleVideo()}
              />
              <div className="thumbnail_list">
                {/* {toptenList && toptenList.length > 0 ? ( */}
                {toptenList.map((item, i) => (
                  <div
                    className="thumbnail"
                    key={item.video_no}
                    style={{ opacity: i === toptenIdx ? 1 : 0.5 }}
                    onClick={() => setToptenIdx(i)}
                  >
                    <img src={item.thumbnail} alt="thumbnail" />
                  </div>
                ))}
                {/* ) : (
                  <div className="thumbnail empty_video">
                    <div className="empty_text">{`COMING SOON!`}</div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </Content>
        <div className="topten_cover">
          {toptenList && toptenList.length > 2 && (
            <div className="circle_arrow">
              <img
                src={circleArrowLeftWhite}
                alt="circle_arrow_left"
                onClick={() => _handleArrow("left")}
              />
              <img
                src={circleArrowRightWhite}
                alt="circle_arrow_right"
                onClick={() => _handleArrow("right")}
              />
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .container_topten {
          position: relative;
          width: 100%;
          height: 534px;
          overflow: hidden;
        }
        .wrapper_topten {
          position: relative;
          width: 100%;
          height: 534px;
        }
        .text_group {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
        }
        .topten_cover {
          position: absolute;
          left: 0;
          bottom: 0;
          width: calc(50% + 600px);
          height: 282px;
          background-color: #141418;
        }
        .topten_cover:before {
          content: "";
          position: absolute;
          width: calc(100% - 826px);
          left: 0;
          top: -2px;
          border-top: 1px solid #f38400;
          border-bottom: 1px solid #f38400;
          z-index: 2;
        }
        .circle_arrow {
          position: absolute;
          right: 30px;
          bottom: 60px;
          z-index: 2;
        }
        .circle_arrow > img {
          width: 40px;
          height: 40px;
        }
        .circle_arrow > img:hover {
          cursor: pointer;
        }
        .circle_arrow > img:first-child {
          margin-right: 19px;
        }
        .thumbnail_list_frame {
          position: absolute;
          top: calc(50% - 30px);
          left: ${374 - leftOut}px;
          transform: translateY(-50%);
          width: calc(50vw + ${226 + leftOut}px);
          height: 308px;
          overflow: hidden;
          white-space: nowrap;
          z-index: 1;
        }
        .thumbnail_out_frame {
          position: absolute;
          left: 0;
          top: 0;
          width: ${leftOut - 20}px;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(20, 20, 24, 1),
            rgba(20, 20, 24, 0.6)
          );
          z-index: 2;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          animation: fadein 0.3s linear;
        }
        .thumbnail_active_frame {
          position: absolute;
          left: ${leftOut}px;
          top: 0;
          border: 2px solid #f38400;
          border-radius: 10px;
          width: 444px;
          height: 304px;
          z-index: 2;
        }
        .thumbnail_active_frame:hover {
          cursor: pointer;
        }
        .thumbnail_list {
          position: absolute;
          top: 0;
          left: 0;
          height: 308px;
          white-space: nowrap;
          z-index: 1;
          transform: translateX(${toptenIdx * -470 + leftOut}px);
          transition: 0.3s ease-in-out;
        }
        .thumbnail {
          position: relative;
          display: inline-block;
          width: 448px;
          height: 304px;
          margin-right: 22px;
          overflow: hidden;
          border-radius: 10px;
          vertical-align: middle;
          transition: 0.3s ease-in-out;
        }
        .thumbnail:hover {
          cursor: pointer;
        }
        .empty_video {
          text-align: center;
          color: #fff;
          background-color: #000;
        }
        .empty_text {
          position: absolute;
          font-weight: 700;
          font-size: 22px;
          width: 90%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          white-space: pre-line;
        }
        .empty_text > div {
          font-size: 16px;
          font-weight: 400;
          margin-top: 20px;
        }
        .thumbnail > img {
          position: absolute;
          width: 160%;
          height: auto;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        h1,
        .rank,
        .title {
          color: #fff;
        }
        h1 {
          font-size: 44px;
        }
        .noti {
          margin-top: 50px;
          margin-bottom: 12px;
        }
        .contest_title {
          font-size: 22px;
          color: #f38400;
          margin-bottom: 41px;
          margin-top: 12px;
        }
        .rank {
          position: relative;
          font-size: 26px;
        }
        .h_24px {
          height: 24px;
        }
        .h_38px {
          height: 38px;
        }
        .rank:before {
          content: "";
          position: absolute;
          left: -20px;
          width: 9px;
          top: 50%;
          transform: translateY(-50%);
          border-bottom: 2px solid #f38400;
        }
        .title {
          font-size: 16px;
        }
        .rank,
        .title {
          margin-left: 20px;
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

EmergenzaToptenComponent.propTypes = {
  toptenList: PropTypes.array
};

export default EmergenzaToptenComponent;
