import React, { useMemo } from "react";
import PropTypes from "prop-types";

import {
  GRAY_COLOR,
  WHITE_COLOR,
  COLOR_696C8C,
  COLOR_AE46E7,
} from "shared/constants/colors";

const Tabs = ({ tab, onClickTab }) => {
  // 클래스 리렌더링 캐싱
  const myProducerTabClass = useMemo(
    () => `Tab${tab === "myProducer" ? " active" : ""}`,
    [tab]
  );
  const receivePushTabClass = useMemo(
    () => `Tab${tab === "receivePush" ? " active" : ""}`,
    [tab]
  );
  const myPushTabClass = useMemo(
    () => `Tab${tab === "myPush" ? " active" : ""}`,
    [tab]
  );

  return (
    <div className="Tabs">
      <div
        className={myProducerTabClass}
        onClick={onClickTab.bind(this, "myProducer")}
      >
        나의 프로듀서
      </div>
      <div className="Tabline" />
      <div
        className={receivePushTabClass}
        onClick={onClickTab.bind(this, "receivePush")}
      >
        받은 PUSH
      </div>
      <div className="Tabline" />
      <div className={myPushTabClass} onClick={onClickTab.bind(this, "myPush")}>
        내가 한 PUSH
      </div>
      <style jsx>{`
        .Tabs {
          padding-bottom: 15px;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .Tabs .Tabline {
          width: 0px;
          height: 30px;
          border: 1px solid ${COLOR_696C8C};
        }

        .Tabs .Tab {
          display: flex;
          align-items: center;
          text-align: center;
          font-size: 14px;
          font-weight: normal;
          color: ${COLOR_696C8C};
          cursor: pointer;
        }

        .Tabs .Tab.active {
          font-weight: bold;
          color: ${COLOR_AE46E7};
        }
      `}</style>
    </div>
  );
};

Tabs.propTypes = {
  tab: PropTypes.string.isRequired,
  onClickTab: PropTypes.func.isRequired,
};

export default Tabs;
