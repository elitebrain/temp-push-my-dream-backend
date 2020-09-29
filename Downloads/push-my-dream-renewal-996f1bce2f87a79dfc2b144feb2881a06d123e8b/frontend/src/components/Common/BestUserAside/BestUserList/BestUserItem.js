import React, { useMemo } from "react";

import Avatar from "components/Common/Avatar";

import medal from "public/assets/icon/star_medal_ico(white).svg";

const BestUserItem = ({ rank, user }) => {
  const isWindowClient = typeof window === "object";

  const rankNumber = useMemo(
    () => (rank === 1 ? 1 : rank === 2 ? 2 : rank === 3 ? 3 : ""),
    [rank]
  );

  const avatarStyle = useMemo(() => {
    return isWindowClient && window.outerWidth >= 2560
      ? {
          width: "40px",
          height: "40px",
          display: "inline-block",
          verticalAlign: "middle",
        }
      : {
          width: "30px",
          height: "30px",
          display: "inline-block",
          verticalAlign: "middle",
        };
  }, [isWindowClient && window.outerWidth]);

  return (
    <div className="best_user_item">
      {rank >= 1 && rank <= 3 ? (
        <div className="rank">
          <img src={medal} width="100%" height="100%" />
          <span>{rank}</span>
        </div>
      ) : (
        <span className="none_medal">{rank}</span>
      )}
      <Avatar
        width="30px"
        height="30px"
        // photo={user.user_photo}
        photo={"http://via.placeholder.com/500x300"}
        // style={{width: "30px", height: "30px", display: "inline-block", verticalAlign: "middle" }}
        style={avatarStyle}
      />

      {/* <div className="user_nick_name">{user.nickname}</div> */}
      <div className="user_nick_name">케이크 몬스터 케키</div>
      <style jsx>{`
        .best_user_item {
          padding: 5px 0;
          border-top: 1px solid rgba(85, 85, 85, 0.5);
          border-bottom: 1px solid rgba(85, 85, 85, 0.5);
        }
        .best_user_item:first-child {
          border-top: none;
        }
        .rank {
          position: relative;
          width: 22px;
          height: 32px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
        .rank span {
          font-size: 9px;
          font-weight: bold;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        .none_medal {
          width: 22px;
          margin-right: 10px;
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          color: #cccccc;
        }
        .user_nick_name {
          width: 53px;
          font-size: 9px;
          color: #808080;
          font-weight: bold;
          display: inline-block;
          vertical-align: middle;
          margin-left: 7px;
          word-break: keep-all;
        }
        @media (min-width: 2560px) {
          .best_user_item {
            padding: 10px 0;
          }
          .rank {
            width: 40px;
            height: 50px;
          }
          .rank span {
            font-size: 17px;
            bottom: 1px;
          }

          .none_medal {
            width: 35px;
            display: inline-block;
            vertical-align: middle;
            font-size: 20px;
          }

          .user_nick_name {
            width: 75px;
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default BestUserItem;
