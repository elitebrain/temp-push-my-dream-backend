import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Link from "next/link";

import CategoryBar from "components/Common/CategoryBar";

const VoteEndItem = ({ item }) => {
  return (
    <Link href={`/vote/${item.vote_no}/result`}>
      <div className="vote_list">
        <CategoryBar type={item.CATEGORY.category_level2_no} />
        <div className="vote_title">{item.vote_title}</div>
        <div className="bottom">
          <span className="date">{`${moment(item.vote_start_date).format(
            "YYYY.MM.DD"
          )} ~ ${moment(item.vote_end_date).format("YYYY.MM.DD")}`}</span>
          <span className="underline" />
          <span className="vote_counter">{`${item.all_vote_count} 참여`}</span>
        </div>
        <style jsx>{`
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
        }
        .vote_list .title.emergenza {
          color: #f38900;
        }
        .vote_list .title.apple {
          color: #f35600;
        }
        .vote_list .vote_img {
          width: 100%;
          /* width: 335px; */
          height: 162px;
          margin-bottom: 20px;
          background-image: url('${item.vote_cover_image}');
          background-size:cover;
          background-position: center;
          border-radius: 15px;
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
        .vote_list .vote_title {
          font-size: 16px;
          line-height: 23px;
          margin-bottom: 15px;
          color: #fff;
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

VoteEndItem.propTypes = {
  item: PropTypes.shape({
    vote_no: PropTypes.number,
    vote_title: PropTypes.string,
    vote_start_date: PropTypes.string,
    vote_end_date: PropTypes.string,
    all_vote_count: PropTypes.number,

    CATEGORY: PropTypes.shape({
      category_level2_no: PropTypes.number
    })
  })
};

export default VoteEndItem;
