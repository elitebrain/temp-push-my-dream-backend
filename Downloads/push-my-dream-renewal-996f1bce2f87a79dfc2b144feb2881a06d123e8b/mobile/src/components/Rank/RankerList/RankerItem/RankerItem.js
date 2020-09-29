import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import RankerFluctuations from "components/Common/RankerFluctuations";
import RankerAvatar from "./RankerAvatar";

import {
  setNumberFormat,
  numberWithCommasAndCheckNone,
} from "shared/functions";
import { useRouter } from "next/router";
import {
  WHITE_COLOR,
  COLOR_808080,
  COLOR_BLACK,
  COLOR_999999,
} from "shared/constants/colors";

import medal_icon from "public/assets/image/image_medal.png";

const RankerItem = ({ rank, isProducer, fluctuation, ranker, category3No }) => {
  const Router = useRouter();

  // 프로필 보기
  const onViewProfile = useCallback(
    (userNo) => {
      Router.push(
        { pathname: "/user/[user_no]", query: { category3No } },
        { pathname: `/user/${userNo}`, query: { category3No } }
      );
    },
    [Router, category3No]
  );

  const rankClass = useMemo(
    () => `RankerItem_Rank${rank <= 3 ? " Top3" : ""}`,
    [rank]
  );

  return (
    <div
      className="RankerItem"
      onClick={onViewProfile.bind(this, ranker.user_no)}
    >
      <div className={rankClass}>
        <span className="Rank">{rank}</span>
        {rank <= 3 && <img className="Medal" src={medal_icon} />}
      </div>
      <div className="RankerItem_Info">
        <div className="RankerItem_Avatar">
          <RankerAvatar src={ranker.user_photo} />
        </div>
        <div className="RankerItem_Content">
          <div className="RankerItem_Push">
            <span className="Push">{`${numberWithCommasAndCheckNone(
              ranker.sum_push
            )}`}</span>
            <span className="Unit">PUSH</span>
          </div>
          <div className="RankerItem_Nickname">{ranker.nickname}</div>
          <div className="RankerItem_SupplementaryInfo">
            <div className="Count">
              {!isProducer && (
                <>
                  <span className="View">{`${setNumberFormat(
                    ranker.sum_view
                  )} ${Number(ranker.sum_view) > 1 ? "Views" : "View"}`}</span>
                  {/* <span className="And">/</span> */}
                  {/* <span className="Like">{`${setNumberFormat(
                    ranker.sum_like
                  )} ${Number(ranker.sum_like) > 1 ? "Likes" : "Like"}`}</span> */}
                </>
              )}
            </div>
            <div className="Fluctuation">
              <RankerFluctuations fluctuation={fluctuation} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .RankerItem {
          box-sizing: border-box;
          width: 100%;
          height: 100px;
          margin: 0 auto;
          padding: 10px 0 25px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 0.5px solid ${COLOR_999999};
        }

        .RankerItem .RankerItem_Rank {
          position: relative;
          flex-basis: 40px;
          font-weight: bold;
          font-size: 12px;
          color: ${WHITE_COLOR};
          text-align: center;
        }

        .RankerItem .RankerItem_Rank.Top3 {
          color: ${COLOR_BLACK};
        }

        .RankerItem .RankerItem_Rank.Top3 .Rank {
          position: absolute;
          bottom: 7px;
          left: 50%;
          z-index: 1;
          width: 10px;
          transform: translateX(-50%);
        }

        .RankerItem .RankerItem_Rank.Top3 .Medal {
          width: 29px;
          height: auto;
          z-index: 0;
        }

        .RankerItem_Info {
          flex: 1;
          display: flex;
          justify-content: space-between;
        }

        .RankerItem_Info .RankerItem_Avatar {
          flex-basis: 60px;
          width: 60px;
          height: 60px;
          margin-right: 10px;
          margin-top: 7px;
          border-radius: 50%;
          overflow: hidden;
        }

        .RankerItem_Info .RankerItem_Content {
          flex: 1;
        }

        .RankerItem_Info .RankerItem_Content .RankerItem_Push {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          color: ${WHITE_COLOR};
        }

        .RankerItem_Info .RankerItem_Content .RankerItem_Push .Push {
          display: inline-block;
          margin-right: 5px;
          font-weight: bold;
          font-size: 18px;
          line-height: 100%;
        }

        .RankerItem_Info .RankerItem_Content .RankerItem_Push .Unit {
          font-weight: bold;
          font-size: 11px;
          line-height: 100%;
        }

        .RankerItem_Info .RankerItem_Content .RankerItem_Nickname {
          font-weight: bold;
          font-size: 16px;
          color: ${WHITE_COLOR};
          width: 170px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .RankerItem_Info .RankerItem_Content .RankerItem_SupplementaryInfo {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 20px;
        }

        .RankerItem_Info
          .RankerItem_Content
          .RankerItem_SupplementaryInfo
          .Count {
          flex: 1;
          font-size: 12px;
          color: ${COLOR_808080};
        }

        .RankerItem_Info
          .RankerItem_Content
          .RankerItem_SupplementaryInfo
          .Count
          .View {
          margin-right: 5px;
        }

        .RankerItem_Info
          .RankerItem_Content
          .RankerItem_SupplementaryInfo
          .Count
          .Like {
          margin-left: 5px;
          text-align: right;
        }
      `}</style>
    </div>
  );
};

RankerItem.propTypes = {
  rank: PropTypes.number.isRequired,
  fluctuation: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  ranker: PropTypes.shape({
    point: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    sum_like: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    sum_view: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    sum_push: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    user_photo: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
  }),
  category3No: PropTypes.number,
};

export default React.memo(RankerItem);
