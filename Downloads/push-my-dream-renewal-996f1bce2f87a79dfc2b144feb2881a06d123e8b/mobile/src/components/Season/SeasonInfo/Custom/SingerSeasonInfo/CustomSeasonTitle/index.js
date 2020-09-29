import React from "react";
import PropTypes from "prop-types";

import { COLOR_AE46E7, WHITE_COLOR } from "shared/constants/colors";

const CustomSeasonTitle = ({ season }) => {
  return (
    <div className="SeasonTitle">
      <div>
        <h3 className="SeasonTitle_Title">{season.category_level3}</h3>
        <h3 className="description">신바람 이박사 '술이 웬수다'편</h3>
      </div>
      <div className="SeasonTitle_Icon">
        <img src={season.CATEGORY_LEVEL2.category_level2_icon} />
      </div>
      {/* <span>2020 BEST APPLE CONTEST</span> */}
      <style jsx>{`
        .SeasonTitle {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          /*  background-color: #2e2e3e;*/
        }

        .SeasonTitle .SeasonTitle_Title {
          font-weight: bold;
          font-size: 16px;
          color: ${COLOR_AE46E7};
        }

        .description {
          margin-top: 5px;
          font-size: 14px;
          font-weight: bold;
          color: ${WHITE_COLOR};
        }

        .SeasonTitle .SeasonTitle_Icon {
          margin-left: 20px;
          flex-basis: 75px;
          width: 75px;
          height: 30px;
        }

        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      `}</style>
    </div>
  );
};

CustomSeasonTitle.propTypes = {
  saeson: PropTypes.shape({
    category_level3: PropTypes.string,
    CATEGORY_LEVEL2: PropTypes.shape({
      category_level2_icon: PropTypes.string,
    }),
  }),
};

export default CustomSeasonTitle;
