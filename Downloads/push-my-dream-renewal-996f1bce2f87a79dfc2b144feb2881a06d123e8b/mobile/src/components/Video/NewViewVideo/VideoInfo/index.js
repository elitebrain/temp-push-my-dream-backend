import React, { useEffect, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import VideoInfoHeader from "./VideoInfoHeader";
import VideoButton from "./VideoButton";
import VideoAndUploaderInfo from "./VideoAndUploaderInfo";

/**
 * 시간 수정시
 * debounce time === IS_VIEW_TRANSITION
 * CONTENT_IN_DOM_TIME === CONTENT_IN_DOM_TRANSITION
 *  CONTENT_IN_DOM_TIME < IS_VIEW_TRANSITION, DEBOUNCE_TIME
 */

// DOM에서 콘텐츠가 사라지는 시간
const CONTENT_IN_DOM_TIME = 150;
const CONTENT_IN_DOM_TRANSITION = 0.15;
// Debounce
const DEBOUNCE_TIME = 200;
// 콘텐츠의 opacity 트랜지션 시간
const IS_VIEW_TRANSITION = 0.2;

const VideoInfo = ({ children, isViewVideoInfo, onClickAvatar }) => {
  const [disappear, setDisappear] = useState(false);
  const [isView, setIsView] = useState(false);
  /**
   * debounce flag 로 광클 방지
   */
  const [debounceFlag, setDebounceFlag] = useState(false);
  /**
   * 슬라이드 시 초기화
   */
  useEffect(() => {
    let timeout;
    if (!isViewVideoInfo) {
      setDisappear(true);
      setDebounceFlag(true);
    } else {
      timeout = setTimeout(() => {
        setDisappear(false);
      }, CONTENT_IN_DOM_TIME);
      setIsView(true);
      setDebounceFlag(true);
    }

    return function cleanup() {
      clearTimeout(timeout);
    };
  }, [isViewVideoInfo]);

  /**
   * appear 시 컨텐츠 출력
   * disappear 시 0.15초 후 컨텐츠 DOM에서 삭제
   */
  useEffect(() => {
    let timeout;

    if (disappear) {
      timeout = setTimeout(() => {
        if (disappear) {
          setIsView(false);
        }
      }, CONTENT_IN_DOM_TIME);
    } else {
      setIsView(true);
    }

    return function cleanup() {
      clearTimeout(timeout);
    };
  }, [disappear]);

  /**
   * debounce
   */
  useEffect(() => {
    let timeout;
    if (!debounceFlag) {
      timeout = setTimeout(() => {
        setDebounceFlag(true);
      }, DEBOUNCE_TIME);
    }

    return function cleanup() {
      clearTimeout(timeout);
    };
  }, [debounceFlag]);

  /**
   * 비디오 정보 보기 토글
   */
  const onClickVideoInfo = useCallback(() => {
    if (debounceFlag) {
      setDebounceFlag(false);
      setDisappear((prev) => !prev);
    }
  }, [debounceFlag]);

  const videoInfoContentClass = useMemo(
    () => `VideoInfo_Content${disappear ? " disappear" : " appear"}`,
    [disappear]
  );

  return (
    <div className="VideoInfo" onClick={onClickVideoInfo}>
      {children}

      <div className={videoInfoContentClass}>
        {isView && (
          <>
            {/* 푸쉬 및 조회수, 추천 */}
            <VideoInfoHeader />
            <div className="VideoInfoBody">
              {/* 유저와 하단의 비디오 설명글 */}
              <div className="Description">
                <VideoAndUploaderInfo onClickAvatar={onClickAvatar} />
              </div>
              {/* 우측의 버튼 */}
              <div className="Buttons">
                <VideoButton />
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .VideoInfo {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .VideoInfo_Content {
          position: relative;

          box-sizing: border-box;
          padding-top: 15px;
          background-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5),
            transparent
          );

          height: calc(100% - 50px);
          transition: ${IS_VIEW_TRANSITION}s opacity ease-in-out;
          opacity: 0;
        }
        .VideoInfo_Content.appear {
          opacity: 1;
        }

        .VideoInfo_Content.disappear {
          opacity: 0;
        }

        .VideoInfoBody {
          position: absolute;
          bottom: 0px;
          right: 0px;

          width: 100%;
          margin-bottom: 10px;
          box-sizing: border-box;

          display: flex;
          align-items: flex-end;

          opacity: 0;
        }

        .VideoInfo_Content.appear .VideoInfoBody {
          opacity: 1;
          transition: ${CONTENT_IN_DOM_TRANSITION}s opacity ease-in-out;
        }

        .VideoInfo_Content.disappear .VideoInfoBody {
          opacity: 0;
          transition: ${CONTENT_IN_DOM_TRANSITION}s opacity ease-in-out;
        }

        .VideoInfoBody .Description {
          flex: 1;
          margin-left: 20px;
          margin-right: 10px;
        }
        .VideoInfoBody .Buttons {
          flex-basis: 55px;
          margin-right: 20px;
        }
      `}</style>
    </div>
  );
};

VideoInfo.propTypes = {
  children: PropTypes.node,
  isViewVideoInfo: PropTypes.bool,
  currentVideoInfo: PropTypes.object,
};

export default React.memo(VideoInfo);
