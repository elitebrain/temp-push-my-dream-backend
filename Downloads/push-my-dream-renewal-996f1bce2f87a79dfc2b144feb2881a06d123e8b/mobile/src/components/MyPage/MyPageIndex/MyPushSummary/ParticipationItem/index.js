import React from "react";
import PropTypes from "prop-types";

import { GRAY_COLOR, WHITE_COLOR, COLOR_696C8C } from "shared/constants/colors";
import { numberWithCommas } from "shared/functions";

const ParticipationItem = ({ item }) => {
  return (
    <div className="ParticipationItem">
      <div className="ParticipationItem_Info">
        <h4 className="ParticipationItem_Season">
          {item.CATEGORY_LEVEL3 && item.CATEGORY_LEVEL3.category_level3}
        </h4>
      </div>
      <span className="Push">
        {item.total_push ? numberWithCommas(item.total_push) : "-"}
      </span>
      <style jsx>{`
        .ParticipationItem {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .ParticipationItem:last-of-type {
          margin: initial;
        }

        .ParticipationItem .ParticipationItem_Info {
          flex: 1;
          word-break: break-word;
        }

        .ParticipationItem .ParticipationItem_Info h4 {
          font-size: 12px;
          line-height: 15px;
          color: ${COLOR_696C8C};
        }

        .ParticipationItem .Push {
          flex-basis: 145px;
          font-weight: bold;
          font-size: 20px;
          color: ${WHITE_COLOR};
          text-align: right;
        }
      `}</style>
    </div>
  );
};

ParticipationItem.propTypes = {
  item: PropTypes.shape({
    CATEGORY_LEVEL2: PropTypes.shape({
      category_level2: PropTypes.string,
    }),
    CATEGORY_LEVEL3: PropTypes.shape({
      category_level3: PropTypes.string,
    }),
    total_push: PropTypes.number,
  }),
};

export default ParticipationItem;
