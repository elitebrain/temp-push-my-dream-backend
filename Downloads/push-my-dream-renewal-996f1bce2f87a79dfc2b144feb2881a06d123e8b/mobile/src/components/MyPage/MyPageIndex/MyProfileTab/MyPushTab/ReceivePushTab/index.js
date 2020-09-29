import React, { useCallback } from "react";
import PropTypes from "prop-types";

import PushHistory from "components/Common/OrderedItem/PushHistory";
import List from "components/Common/List";

import {
  COLOR_696C8C,
  WHITE_COLOR,
  GRADIENT_2F3354_040221,
} from "shared/constants/colors";
import { numberWithCommasAndCheckNone } from "shared/functions";

// receivePush: { pushInfoThisRound, receivePushList },
const ReceivePushTab = (props) => {
  const { receivePush } = props;
  // console.log(receivePushList);
  // 최적화
  const renderRoundItem = useCallback(
    (round, index) => <PushHistory key={index} round={round} />,
    []
  );

  const receivePushList = [];
  return (
    <div className="ReceivePushTab">
      {receivePush ? (
        <>
          <div className="ReceivePushTab_Header">
            <span className="ReceivePushTab_Header_Title">Season</span>
            <span className="ReceivePushTab_Header_Push">
              {numberWithCommasAndCheckNone(
                (receivePush &&
                  receivePush.pushInfoThisRound &&
                  receivePush.pushInfoThisRound.seasonReceivePush) ||
                  0
              )}
            </span>
          </div>
          <div className="ReceivePushTab_Summary">
            <div className="ReceivePushTab_Summary_Box">
              <h5>오늘</h5>
              <span>
                {numberWithCommasAndCheckNone(
                  (receivePush &&
                    receivePush.pushInfoThisRound &&
                    receivePush.pushInfoThisRound.todayReceivePush) ||
                    0
                )}
              </span>
            </div>
            <div className="ReceivePushTab_Summary_Box">
              <h5>이번 주</h5>
              <span>
                {numberWithCommasAndCheckNone(
                  (receivePush &&
                    receivePush.pushInfoThisRound &&
                    receivePush.pushInfoThisRound.weekReceivePush) ||
                    0
                )}
              </span>
            </div>
            <div className="ReceivePushTab_Summary_Box">
              <h5>이번 달</h5>
              <span>
                {numberWithCommasAndCheckNone(
                  (receivePush &&
                    receivePush.pushInfoThisRound &&
                    receivePush.pushInfoThisRound.monthReceivePush) ||
                    0
                )}
              </span>
            </div>
          </div>
          {/* 라운드별 리스트 출력 */}
          <List list={receivePushList} renderItem={renderRoundItem} />
        </>
      ) : (
        <div className="empty_push">받은 푸쉬가 없습니다.</div>
      )}
      <style jsx>{`
        .empty_push {
          height: 100px;
          line-height: 100px;
          text-align: center;
          color: ${COLOR_696C8C};
        }
        .ReceivePushTab .ReceivePushTab_Header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-image: ${GRADIENT_2F3354_040221(180)};
          padding: 10px 20px;
          border-radius: 5px;
        }

        .ReceivePushTab .ReceivePushTab_Header .ReceivePushTab_Header_Title {
          font-size: 12px;
          color: ${COLOR_696C8C};
        }
        .ReceivePushTab .ReceivePushTab_Header .ReceivePushTab_Header_Push {
          font-weight: bold;
          font-size: 18px;
          color: ${WHITE_COLOR};
        }

        .ReceivePushTab .ReceivePushTab_Summary {
          margin: 10px 0 20px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ReceivePushTab .ReceivePushTab_Summary .ReceivePushTab_Summary_Box {
          text-align: center;
          width: 100%;
          border-radius: 5px;
          background-image: ${GRADIENT_2F3354_040221(180)};
          margin-right: 10px;
          padding: 8px;
        }

        .ReceivePushTab
          .ReceivePushTab_Summary
          .ReceivePushTab_Summary_Box:last-of-type {
          margin: initial;
        }

        .ReceivePushTab .ReceivePushTab_Summary .ReceivePushTab_Summary_Box h5 {
          font-size: 12px;
          margin-bottom: 5px;
          color: ${COLOR_696C8C};
        }

        .ReceivePushTab
          .ReceivePushTab_Summary
          .ReceivePushTab_Summary_Box
          span {
          margin-bottom: 5px;
          color: ${WHITE_COLOR};
          font-weight: bold;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

ReceivePushTab.propTypes = {
  pushInfoThisRound: PropTypes.shape({
    seasonReceivePush: PropTypes.number,
    todayReceivePush: PropTypes.number,
    weekReceivePush: PropTypes.number,
    monthReceivePush: PropTypes.number,
  }),
  receivePushList: PropTypes.array,
};

export default ReceivePushTab;
