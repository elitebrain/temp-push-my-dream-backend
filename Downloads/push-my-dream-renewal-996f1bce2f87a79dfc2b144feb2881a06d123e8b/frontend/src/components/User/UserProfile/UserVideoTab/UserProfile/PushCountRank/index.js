import React from "react";

import TotalPushCount from "../../../common/TotalPushCount";
import Rank from "../../../common/Rank";

const PushCountRank = () => {
  return (
    <div className="push_count_rank">
      <TotalPushCount />
      <Rank />
      <style jsx>{`
        .push_count_rank {
          margin-bottom: 18px;
        }
      `}</style>
    </div>
  );
};

export default PushCountRank;
