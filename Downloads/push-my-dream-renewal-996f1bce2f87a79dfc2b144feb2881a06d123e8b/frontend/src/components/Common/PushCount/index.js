import React from "react";
import PropTypes from "prop-types";

import Item from "./Item";
import { numberWithKMB } from "shared/functions";

const PushCount = (props) => {
  const { myPush } = props;
  console.log("PushCount myPush ", myPush);
  return (
    <div className="push_count_container">
      <Item
        psercent={myPush ? numberWithKMB(myPush.myPush) : "-"}
        title="나의 참여 푸쉬"
      />
      <Item psercent={myPush ? `${myPush.ratioPush}%` : "-"} title="점유율" />
      <Item psercent={myPush ? myPush.myRank : "-"} title="점유 순위" />
      <style jsx>{`
        .push_count_container {
          width: 100%;
          text-align: center;
          margin-top: 10px;
          margin-bottom: 20px;
        }
        .rank {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
        }
      `}</style>
    </div>
  );
};

PushCount.propTypes = {
  myPush: PropTypes.object,
};

export default PushCount;
