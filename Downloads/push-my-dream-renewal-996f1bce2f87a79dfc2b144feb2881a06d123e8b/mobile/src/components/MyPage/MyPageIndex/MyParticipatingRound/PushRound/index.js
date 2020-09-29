import React from "react";

import Avatar from "components/Common/Avatar";

import {
  MAIN_COLOR,
  COLOR_FF00FF,
  COLOR_00FFFF,
  WHITE_COLOR,
  COLOR_696C8C,
} from "shared/constants/colors";
import { numberWithCommas } from "shared/functions";

const PushRound = ({
  pushInRound: {
    producerRankList,
    dreamerRankInRound: { PREV, NEXT },
    total_push,
  },
}) => {
  return (
    <div className="PushRound">
      <div className="PushRound_TopProducer">
        {producerRankList &&
          producerRankList.map((producer) => (
            <div
              className="PushRound_TopProducer_Avatar"
              key={producer.USER.user_no}
            >
              <Avatar
                width="50px"
                height="50px"
                photo={producer.USER.user_photo}
              />
            </div>
          ))}
      </div>
      <div className="PushRound_DreamerRank">
        {/* 이전 순위 */}
        {PREV.prev_rank && (
          <div className="PushRound_DreamerRank_Prev">
            <span className="Title">{`${PREV.prev_rank}위 와의 차`}</span>
            <span className="Value">
              <span className="Additional_Amount">-</span>
              <span className="Push">
                {numberWithCommas(Math.abs(total_push - PREV.prev_sum_push))}
              </span>
            </span>
          </div>
        )}
        {/* 나의 정보 */}
        <div className="MyPush">
          {total_push ? numberWithCommas(total_push) : "-"}
        </div>
        {/* 다음 순위 */}
        {NEXT.next_rank && (
          <div className="PushRound_DreamerRank_Next">
            <span className="Title">{`${NEXT.next_rank}위 와의 차`}</span>
            <span className="Value">
              <span className="Additional_Amount">+</span>
              <span className="Push">
                {numberWithCommas(Math.abs(total_push - NEXT.next_sum_push))}
              </span>
            </span>
          </div>
        )}
      </div>
      <style jsx>{`
        .PushRound {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .PushRound_TopProducer {
          display: flex;
        }

        .PushRound_TopProducer .PushRound_TopProducer_Avatar {
          margin-right: 5px;
        }

        .PushRound_TopProducer .PushRound_TopProducer_Avatar:last-of-type {
          margin: initial;
        }

        .PushRound_DreamerRank {
          width: 100%;
          text-align: right;
        }

        .PushRound_DreamerRank .PushRound_DreamerRank_Prev,
        .PushRound_DreamerRank .PushRound_DreamerRank_Next {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 20px;
          line-height: 20px;
        }

        .Title {
          font-size: 10px;
          line-height: 20px;
          color: ${COLOR_696C8C};
        }

        .Value {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-basis: 90px;
          text-align: right;
        }

        .PushRound_DreamerRank .PushRound_DreamerRank_Prev {
          color: ${COLOR_00FFFF};
        }
        .PushRound_DreamerRank .PushRound_DreamerRank_Next {
          color: ${COLOR_FF00FF};
        }

        .PushRound_DreamerRank .MyPush {
          font-weight: bold;
          font-size: 22px;
          color: ${WHITE_COLOR};
          text-align: right;
        }

        .PushRound_DreamerRank .PushRound_DreamerRank_Prev .Additional_Amount,
        .PushRound_DreamerRank .PushRound_DreamerRank_Next .Additional_Amount {
          font-size: 10px;
          margin-right: 5px;
        }

        .PushRound_DreamerRank .PushRound_DreamerRank_Prev .Push,
        .PushRound_DreamerRank .PushRound_DreamerRank_Next .Push {
          font-size: 10px;
        }
      `}</style>
    </div>
  );
};

export default PushRound;
