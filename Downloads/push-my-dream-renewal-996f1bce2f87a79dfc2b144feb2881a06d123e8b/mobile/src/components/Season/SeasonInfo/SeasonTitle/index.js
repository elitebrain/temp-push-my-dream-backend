import React from "react";
import PropTypes from "prop-types";

import { COLOR_AE46E7 } from "shared/constants/colors";

const SeasonTitle = ({ season }) => {
  return (
    <div className="SeasonTitle">
      <h3 className="SeasonTitle_Title">{season.category_level3}</h3>

      <div className="SeasonTitle_Icon">
        <img src={season.CATEGORY_LEVEL2.category_level2_icon} />
      </div>
      {/* <span>2020 BEST APPLE CONTEST</span> */}
      <style jsx>{`
        .SeasonTitle {
          width: 100%;
          display: flex;
          align-items: flex-end;
          margin-bottom: 15px;
          /*  background-color: #2e2e3e;*/
        }

        .SeasonTitle .SeasonTitle_Title {
          flex: 1;
          font-weight: bold;
          font-size: 16px;
          color: ${COLOR_AE46E7};
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

SeasonTitle.propTypes = {
  saeson: PropTypes.shape({
    category_level3: PropTypes.string,
    CATEGORY_LEVEL2: PropTypes.shape({
      category_level2_icon: PropTypes.string,
    }),
  }),
};

export default SeasonTitle;
