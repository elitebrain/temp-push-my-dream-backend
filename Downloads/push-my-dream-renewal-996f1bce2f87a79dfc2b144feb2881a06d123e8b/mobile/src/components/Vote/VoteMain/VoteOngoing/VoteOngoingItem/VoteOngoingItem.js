import React from "react";
import Link from "next/link";
import moment from "moment";
import PropTypes from "prop-types";

import CategoryBar from "components/Common/CategoryBar";

import { numberWithCommas } from "shared/functions";
import {
  APPLE_CATEGORY_COLOR,
  EMERGENZA_CATEGORY_COLOR
} from "shared/constants/colors";

const VoteOngoingItem = ({ item }) => {
  const defauly_title_color =
    item.CATEGORY.category_level2_no === 2
      ? APPLE_CATEGORY_COLOR
      : EMERGENZA_CATEGORY_COLOR;

  return (
    <Link href={`/vote/${item.vote_no}`}>
      <div className="vote_list">
        {/* 속성 */}
        <div className="title">{item.vote_title}</div>
        <div className="vote_img" />
        <CategoryBar type={item.CATEGORY.category_level2_no} />
        <div
          className="sub_title"
          dangerouslySetInnerHTML={{ __html: item.vote_notice }}
        />
        <div className="bottom">
          <span className="date">{`${moment(item.vote_start_date).format(
            "YYYY.MM.DD"
          )} ~ ${moment(item.vote_end_date).format("YYYY.MM.DD")}`}</span>
          <span className="underline" />
          <span className="vote_counter">{`${numberWithCommas(
            item.all_vote_count
          )} 참여`}</span>
        </div>
        <style jsx>{`
        .title {
          color: #fff;
          font-size: 30px;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .sub_title {
          font-size: 15px;
          color: #fff;
        }
        .vote_list {
          padding-top: 40px;
          padding-bottom: 30px;
          border-bottom: 1px solid #39394a;
          cursor:pointer;
        }
        .vote_list:last-child {
          padding-bottom: 30px;
          border-bottom: none;
        }
        .vote_list .title {
          font-size: 20px;
          margin-bottom:15px;
          color : ${defauly_title_color}
        }
     
        .vote_list .vote_img {
          width: 100%;
          /* width: 335px; */
          height: 162px;
          margin-bottom: 20px;
          background-image: url('${item.vote_cover_image}');
          background-size:cover;
          background-position: center;
        }
        .vote_list .badge {
          padding: 0 10px;
          height: 20px;
          display: inline-block;
          line-height: 20px;
          color: #fff;
          font-size: 10px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .vote_list .badge.emergenza {
          background-color: #f38900;
        }
        .vote_list .badge.apple {
          background-color: #f35600;
        }
        .vote_list .sub_title {
          font-size: 16px;
          line-height: 23px;
          white-space: pre-line;
          margin-bottom: 15px;
          
        }
        .vote_list .bottom .underline {
          background-color: #878792;
          width: 1px;
          height: 12px;
          display: inline-block;
          vertical-align: middle;
          margin: 0 12px;
        }
        .vote_list .bottom .date,
        .vote_list .bottom .vote_counter {
          font-size: 13px;
          color: #878792;
          display: inline-block;
          vertical-align: middle;
        }
      `}</style>
      </div>
    </Link>
  );
};

VoteOngoingItem.propTypes = {
  item: PropTypes.shape({
    vote_no: PropTypes.number,
    vote_title: PropTypes.string,
    vote_notice: PropTypes.string,
    vote_start_date: PropTypes.string,
    vote_end_date: PropTypes.string,
    all_vote_count: PropTypes.number,
    vote_cover_image: PropTypes.string,

    CATEGORY: PropTypes.shape({ category_level2_no: PropTypes.number })
  })
};

export default VoteOngoingItem;
