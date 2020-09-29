import React, { useMemo } from "react";
import PropTypes from "prop-types";
import _ from "lodash/collection";

import DreamerItem from "../DreamerItem";

import {
  GRAY_COLOR,
  WHITE_COLOR,
  GRADIENT_2F3354_040221,
} from "shared/constants/colors";
import { useSelector } from "react-redux";

// <h5>{category.CATEGORY_LEVEL2.category_level2}</h5>

const MyUsedPushInCategory = ({ category }) => {
  const { category2List } = useSelector((state) => state.common);

  const iconCahce = useMemo(() => {
    const item = _.find(
      category2List,
      (_category) =>
        _category.category_level2_no === Number(category.category_level2_no)
    );

    return item && item.category_level2_icon;
  }, [category2List, category]);

  return (
    <div className="MyUsedPushInCategory">
      <div className="MyUsedPushInCategory_Header">
        <h4>{category.CATEGORY_LEVEL3.category_level3}</h4>
        {iconCahce && (
          <div className="Icon">
            <img src={iconCahce} width="100%" height="100%" />
          </div>
        )}
      </div>
      {category.dreamers &&
        category.dreamers.map((dreamer) => (
          <DreamerItem key={dreamer.user_no} dreamer={dreamer} />
        ))}

      <style jsx>{`
        .MyUsedPushInCategory {
          margin-top: 30px;
        }
        .MyUsedPushInCategory .MyUsedPushInCategory_Header {
          margin: 0 -20px;
          margin-bottom: 30px;
          padding: 20px;
          height: 25px;
          background-image: ${GRADIENT_2F3354_040221(180)};
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .MyUsedPushInCategory .MyUsedPushInCategory_Header h5 {
          font-size: 16px;
          line-height: 20px;
        }

        .MyUsedPushInCategory .MyUsedPushInCategory_Header h4 {
          font-weight: bold;
          font-size: 16px;
          color: ${WHITE_COLOR};
          flex: 1;
          text-align: left;
        }

        .MyUsedPushInCategory .MyUsedPushInCategory_Header .Icon {
          flex-basis: 65px;
          height: 25px;
        }
      `}</style>
    </div>
  );
};

MyUsedPushInCategory.propTypes = {
  category: PropTypes.shape({
    CATEGORY_LEVEL2: PropTypes.shape({
      category_level2: PropTypes.string,
    }),
    CATEGORY_LEVEL3: PropTypes.shape({
      category_level3: PropTypes.string,
    }),
    dreamers: PropTypes.array,
  }),
};

export default MyUsedPushInCategory;
