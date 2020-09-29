import React from "react";
import PropTypes from "prop-types";

import Avatar from "components/Common/Avatar";

import { COLOR_696C8C, WHITE_COLOR } from "shared/constants/colors";
import { numberWithCommasAndCheckNone } from "shared/functions";

const DreamerItem = ({ dreamer }) => {
  return (
    <div className="userlist_container">
      <div className="user_img">
        <Avatar width="100%" height="100%" photo={dreamer.user_photo} />
      </div>
      <div className="user_info">
        <span className="name">{dreamer.nickname}</span>
        <span className="rank">
          <span className="title">Season Rank</span>
          <span className="rank_counter">
            {(dreamer.rank && dreamer.rank.ranking) || "-"}
          </span>
        </span>
      </div>
      <div className="point">{numberWithCommasAndCheckNone(dreamer.point)}</div>
      <style jsx>{`
        .userlist_container {
          padding: 10px 0;
          border-bottom: 0.5px solid ${COLOR_696C8C};
        }
        .userlist_container:last-child {
          border-bottom: none;
        }
        .user_img {
          width: 45px;
          height: 45px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
        }
        .user_info {
          display: inline-block;
          vertical-align: middle;
          line-height: 25px;
        }
        .name {
          display: block;
          font-weight: bold;
          font-size: 14px;
          color: ${WHITE_COLOR};

          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          width: 140px;
          overflow: hidden;
        }
        .rank {
          display: block;
        }
        .rank .title {
          display: inline-block;
          vertical-align: middle;
          font-size: 14px;
          color: ${COLOR_696C8C};
          margin-right: 5px;
        }
        .rank .rank_counter {
          display: inline-block;
          vertical-align: middle;

          font-size: 14px;
          color: ${WHITE_COLOR};
        }
        .point {
          width: calc(100% - 205px);
          line-height: 25px;
          display: inline-block;
          vertical-align: bottom;
          text-align: right;
          font-size: 14px;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

// @media (max-width: 320px) {
//   .user_img {
//     margin-right: 5px;
//   }

//   .name,
//   .rank .title,
//   .rank .rank_counter,
//   .point {
//     font-size: 12px;
//   }
//   .name {
//     width: 120px;
//   }
//   .point {
//     width: calc(100% - 170px);
//   }
// }

DreamerItem.propTypes = {
  dreamer: PropTypes.shape({
    user_photo: PropTypes.string,
    nickname: PropTypes.string,
    rank: PropTypes.shape({
      ranking: PropTypes.number,
    }),

    point: PropTypes.number,
  }),
};

export default DreamerItem;
