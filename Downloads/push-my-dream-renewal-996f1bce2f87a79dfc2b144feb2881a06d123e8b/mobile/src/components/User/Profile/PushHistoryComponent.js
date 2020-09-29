import React, { useState, useContext, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import defaultUser from "public/assets/image/default_user.png";

import ProducerRanking from "components/Common/OrderedItem/ProducerRanking";
import PushHistory from "components/Common/OrderedItem/PushHistory";
import List from "components/Common/List";
import Loader from "components/Common/Loader";

import { UserProfileContext } from "components/Common/UserProfile";
import {
  COLOR_AE46E7,
  COLOR_696C8C,
  BACKGROUND_BLACK_COLOR,
} from "shared/constants/colors";
import {
  IMAGE_SERVER,
  AVATAR_WIDTH,
  AVATAR_HEIGHT,
} from "shared/constants/variables";

const PushHistoryComponent = (props) => {
  const { tab, onClickTab, pushHistoryList, producerList, isLoading } = props;
  const [isEmptyPush, setIsEmptyPush] = useState(true);
  const [containerClass, setContainerClass] = useState("container");
  const { emptyHeight } = useContext(UserProfileContext);

  useEffect(() => {
    if (pushHistoryList.length || producerList.length) {
      setIsEmptyPush(false);
      setContainerClass("container");
    } else {
      setIsEmptyPush(true);
      setContainerClass("container_empty_push");
    }
  }, [pushHistoryList, producerList]);

  // 최적화 - 프로듀서 리스트 렌더링
  const renderProduceItem = useCallback((item) => (
    <ProducerRanking
      key={item.USER.user_no}
      rank={item.ranking}
      profileSrc={`${IMAGE_SERVER}?file=${item.USER.user_photo}&size=${AVATAR_WIDTH}x${AVATAR_HEIGHT}`}
      nickname={item.USER.nickname}
      ratio={item.ratio}
      push={item.sum_push}
      big
    />
  ));

  // 최적화 - PUSH HISTORY 렌더링
  const renderRoundItem = useCallback(
    (round, index) => <PushHistory key={index} round={round} />,
    []
  );

  return (
    <div className={containerClass}>
      {!isEmptyPush ? (
        <>
          <div className="tab">
            <div
              className="title"
              style={{ color: tab === 0 ? COLOR_AE46E7 : COLOR_696C8C }}
              onClick={onClickTab.bind(this, 0)}
            >
              <div>PRODUCER</div>
              <div>TOP 10</div>
            </div>
            <div
              className="title"
              style={{ color: tab === 1 ? COLOR_AE46E7 : COLOR_696C8C }}
              onClick={onClickTab.bind(this, 1)}
            >
              PUSH HISTORY
            </div>
          </div>
          <div className="wrapper">
            {isLoading ? (
              <div className="LoaderContainer">
                <Loader />
              </div>
            ) : tab === 0 ? (
              <List
                list={producerList}
                renderItem={renderProduceItem}
                empty={
                  <div className="empty_push">
                    푸쉬한 프로듀서가 존재하지 않습니다.
                  </div>
                }
              />
            ) : (
              <List
                list={pushHistoryList}
                renderItem={renderRoundItem}
                empty={
                  <div className="empty_push">
                    받은 푸쉬 내역이 존재하지 않습니다.
                  </div>
                }
              />
            )}
          </div>
        </>
      ) : (
        !isLoading && (
          <div className="empty_push"> 받은 PUSH 내역이 없습니다.</div>
        )
      )}
      <style jsx>{`
        .tab {
          width: calc(100% + 40px);
          height: 64px;
          line-height: 64px;
          margin-left: -20px;
          margin-top: 16px;
        }
        .tab > .title {
          position: relative;
          display: inline-block;
          vertical-align: middle;
          width: 50%;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
        }
        .tab > .title:first-child {
          line-height: 17px;
        }
        .tab > .title:first-child:after {
          position: absolute;
          content: "";
          height: 30px;
          width: 0;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          border-right: 1px solid ${COLOR_696C8C};
        }
        .wrapper {
          padding: 20px 0;
        }
        .LoaderContainer {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          width: 100%;
          min-height: 300px;
          box-sizing: border-box;
        }
        .container_empty_push {
          width: calc(100% + 40px);
          margin-left: -20px;
          height: calc(100vh - ${emptyHeight}px);
          background: ${BACKGROUND_BLACK_COLOR};
          padding-top: 73px;
        }
        .empty_push {
          width: 100%;
          height: 154px;
          line-height: 154px;
          text-align: center;
          font-size: 18px;
          color: ${COLOR_696C8C};
          background: ${BACKGROUND_BLACK_COLOR};
        }
      `}</style>
    </div>
  );
};

PushHistoryComponent.propTypes = {
  tab: PropTypes.number.isRequired,
  onClickTab: PropTypes.func.isRequired,
  pushHistoryList: PropTypes.array,
  producerList: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
};

export default PushHistoryComponent;
