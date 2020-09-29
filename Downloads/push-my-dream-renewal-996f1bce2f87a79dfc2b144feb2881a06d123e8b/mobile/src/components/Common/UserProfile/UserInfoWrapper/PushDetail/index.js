import React from "react";
import PropTypes from "prop-types";

import TotalPush from "./TotalPush";
import MyPush from "./MyPush";

const PushDetail = ({
  category4No,
  isPush,
  myRank,
  totalPush,
  producerRankList,
}) => {
  return (
    <div className="push_detail_container">
      <TotalPush totalPush={totalPush} producerRankList={producerRankList} />
      <MyPush myRank={myRank} isPush={isPush} />
      <style jsx>{`
        .push_detail_container {
          font-size: 12px;
          height: 100%;
          padding: 20px;
          white-space: nowrap;
        }

        @media screen and (min-width: 375px) {
          .push_detail_container {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
};

PushDetail.propTypes = {
  category4No: PropTypes.number,
  isPush: PropTypes.bool,
  myRank: PropTypes.object,
  totalPush: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  producerRankList: PropTypes.array,
};

export default PushDetail;
