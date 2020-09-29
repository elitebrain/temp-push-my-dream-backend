import React from "react";
import PropTypes from "prop-types";

import { FONT_WHITE_COLOR, COLOR_696C8C } from "shared/constants/colors";
import { numberWithCommas } from "shared/functions";

const ResidualPushItem = ({ item }) => {
  return (
    <div className="ResidualPushItem">
      <h3 className="ResidualPushItem_Category">
        {item.CATEGORY_LEVEL2.category_level2}
      </h3>
      <div className="ResidualPushItem_Push">
        <h4 className="ResidualPushItem_OrdinalNumber">
          {Boolean(item.CATEGORY_LEVEL4.ordinalNumber > 1) &&
            `${item.CATEGORY_LEVEL4.ordinalNumber - 1}차 회수`}
        </h4>
        <span className="Push">
          {item.residual_push ? numberWithCommas(item.residual_push) : "-"}
        </span>
      </div>
      <style jsx>{`
        .ResidualPushItem {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ResidualPushItem .ResidualPushItem_Category {
          word-break: break-word;
          flex: 1;
          font-size: 12px;
          line-height: 15px;
          color: ${COLOR_696C8C};
          text-align: left;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ResidualPushItem .ResidualPushItem_Push {
          flex-basis: 145px;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ResidualPushItem
          .ResidualPushItem_Push
          .ResidualPushItem_OrdinalNumber {
          display: inline-block;
          font-size: 12px;
          line-height: 15px;
          color: ${COLOR_696C8C};
        }
        .ResidualPushItem .ResidualPushItem_Push .Push {
          display: inline-block;
          font-weight: bold;
          font-size: 12px;
          line-height: 15px;
          color: ${FONT_WHITE_COLOR};
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

ResidualPushItem.propTypes = {
  item: PropTypes.shape({
    CATEGORY_LEVEL2: PropTypes.shape({
      category_level2: PropTypes.string,
    }),
    CATEGORY_LEVEL4: PropTypes.shape({
      ordinalNumber: PropTypes.number,
    }),
    residual_push: PropTypes.number,
  }),
};

export default ResidualPushItem;
