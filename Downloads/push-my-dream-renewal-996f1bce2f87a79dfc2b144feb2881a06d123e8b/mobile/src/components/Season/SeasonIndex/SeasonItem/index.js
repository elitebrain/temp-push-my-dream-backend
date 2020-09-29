import React from "react";
import Link from "next/link";
import moment from "moment";
import PropTypes from "prop-types";

import NewButton from "components/Common/NewButton";

import {
  GRADIENT_2F3354_040221,
  COLOR_AE46E7,
  COLOR_696C8C,
  WHITE_COLOR,
} from "shared/constants/colors";

const SeasonItem = ({ season, onCheckIsLoggedIn }) => {
  return (
    <div className="SeasonItem">
      <img
        className="SeasonItem_Image"
        src={season.banner_representative_url}
        alt="대회 이미지"
      >
        {/* <img src={season.banner_url} /> */}
      </img>
      <div className="SeasonItem_Content">
        <div className="SeasonItem_Header">
          <div className="SeasonItem_Header_Info">
            <h3 className="Title">{season.category_level3}</h3>
            <span className="Date">{`${moment(season.start_time).format(
              "YYYY.MM.DD"
            )} ~ ${moment(season.end_time).format("MM.DD")}`}</span>
          </div>
          <div className="SeasonItem_Header_Icon">
            <img src={season.CATEGORY_LEVEL2.category_level2_icon} />
          </div>
        </div>
        <div className="SeasonItem_Button_Container">
          <Link
            href="/season/[season_no]"
            as={`/season/${season.category_level3_no}`}
          >
            <a className="SeasonItem_Button">
              <NewButton
                width="100%"
                height="35px"
                bgColor="transparent"
                borderColor={COLOR_696C8C}
                color={WHITE_COLOR}
              >
                대회 안내
              </NewButton>
            </a>
          </Link>
          <Link
            href="/season/[season_no]/apply"
            as={`/season/${season.category_level3_no}/apply`}
          >
            <a className="SeasonItem_Button" onClick={onCheckIsLoggedIn}>
              <NewButton
                width="100%"
                height="35px"
                bgColor="transparent"
                borderColor={COLOR_696C8C}
                color={WHITE_COLOR}
              >
                참가하기
              </NewButton>
            </a>
          </Link>
        </div>
        <pre
          className="SeasonItem_Description"
          dangerouslySetInnerHTML={{
            __html: season.category_level3_desc,
          }}
        />
      </div>

      <style jsx>{`
        .SeasonItem {
          margin-bottom: 25px;
        }

        .SeasonItem:last-of-type {
          margin-bottom: initial;
        }

        .SeasonItem .SeasonItem_Image {
          width: 100%;

          /* background-image: url("${season.banner_mobile_url}"); */

          /* background-size: %;
          background-repeat: no-repeat; */
        }

        .SeasonItem_Content {
          box-sizing: border-box;
          width: 100%;
          background-image: ${GRADIENT_2F3354_040221(90)};
          padding: 20px;
        }

        .SeasonItem_Header {
          display: flex;
          align-items: flex-start;
        }

        .SeasonItem_Header .SeasonItem_Header_Info {
          flex: 1;
        }

        .SeasonItem_Header .SeasonItem_Header_Info .Title {
          font-weight: bold;
          font-size: 16px;
          line-height: 20px;
          color: ${COLOR_AE46E7};
        }

        .SeasonItem_Header .SeasonItem_Header_Info .Date {
          font-size: 12px;
          line-height: 15px;
          color: ${COLOR_696C8C};
        }

        .SeasonItem_Header .SeasonItem_Header_Icon {
          margin-left: 20px;
          flex-basis: 75px;
          width: 75px;
          height: 30px;
        }

        .SeasonItem_Button_Container {
          display: flex;
        }

        .SeasonItem_Button_Container > .SeasonItem_Button {
          margin: 20px 0;
          flex: 1;
        }

        .SeasonItem_Button_Container > .SeasonItem_Button:last-of-type {
          margin-left: 10px;
        }

        .SeasonItem_Description {
          font-size: 12px;
          line-height: 15px;
          color: ${WHITE_COLOR};
          white-space: pre-wrap;
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

SeasonItem.propTypes = {
  season: PropTypes.shape({
    category_level3: PropTypes.string,
    start_time: PropTypes.string,
    end_time: PropTypes.string,

    category_level3_no: PropTypes.number,
    category_level3_desc: PropTypes.string,
    banner_mobile_url: PropTypes.string,

    CATEGORY_LEVEL2: PropTypes.shape({
      category_level2_icon: PropTypes.string,
    }),
  }),
  onCheckIsLoggedIn: PropTypes.func,
};

export default React.memo(SeasonItem);
