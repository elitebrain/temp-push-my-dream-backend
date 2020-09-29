import React from "react";
import PropTypes from "prop-types";

import { numberWithCommas } from "shared/functions";
import {
  IMAGE_SERVER,
  AVATAR_WIDTH,
  AVATAR_HEIGHT,
} from "shared/constants/variables";

const TotalPush = ({ totalPush, producerRankList }) => {
  return (
    <div className="total_push">
      <span className="title">Get Push</span>
      <span className="push">{numberWithCommas(totalPush)}</span>
      <div className="producerList">
        {producerRankList &&
          producerRankList.map((producer, index) => (
            <div key={index}>
              <img
                src={`${IMAGE_SERVER}?file=${producer.USER.user_photo}&size=${AVATAR_WIDTH}x${AVATAR_HEIGHT}`}
              />
            </div>
          ))}
      </div>
      <style jsx>{`
        .total_push {
          width: 50%;
          display: inline-block;
          vertical-align: top;
          position: relative;
        }
        .total_push:after {
          position: absolute;
          content: "";
          height: 100%;
          width: 0;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          border-right: 1px solid #696c8c;
        }
        .total_push .title {
          font-size: 10px;
          color: #696c8c;
          margin-bottom: 5px;
          display: block;
          text-transform: uppercase;
        }
        .total_push .push {
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          display: block;
          margin-bottom: 5px;
        }
        .total_push .producerList div {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 5px;
          display: inline-block;
        }

        .total_push .producerList div img {
          border-radius: 50%;
          width: 100%;
          height: 100%;

          object-fit: cover;
          object-position: center;
        }
        .total_push .producerList div:last-child {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

TotalPush.propTypes = {
  totalPush: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TotalPush;
