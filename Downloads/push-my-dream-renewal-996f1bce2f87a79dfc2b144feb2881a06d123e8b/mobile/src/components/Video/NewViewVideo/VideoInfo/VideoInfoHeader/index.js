import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import _ from "lodash/collection";

import { NewViewVideoContext } from "containers/Video/NewViewVideoContainer";

import { FONT_WHITE_COLOR } from "shared/constants/colors";
import PushIcon from "public/assets/image/push_icon(white).png";
import { numberWithCommasAndCheckNone } from "shared/functions";

const VideoInfoHeader = () => {
  const { currentVideoInfo, totalPush } = useContext(NewViewVideoContext);
  const { category2List } = useSelector((state) => state.common);
  const { category3List } = useSelector((state) => state.common);

  /**
   * 카테고리 아이콘 memo
   */
  const shadowIcon = useMemo(() => {
    const category2 = _.find(
      category2List,
      (category) =>
        category.category_level2_no ===
        Number(currentVideoInfo && currentVideoInfo.category_level2_no)
    );

    return category2 && category2.category_level2_shadow_white_icon;
  }, [category2List, currentVideoInfo]);

  /**
   * 현재 경연에서 받은 푸쉬 보여주기
   */
  const isViewPush =
    currentVideoInfo &&
    Boolean(
      _.find(
        category3List,
        (category) =>
          category.category_level3_no ===
          (currentVideoInfo && currentVideoInfo.category_level3_no)
      ) &&
        _.find(
          category3List,
          (category) =>
            category.category_level3_no ===
            (currentVideoInfo && currentVideoInfo.category_level3_no)
        ).is_push
    );

  if (!currentVideoInfo) {
    return null;
  }

  return (
    <>
      {isViewPush && (
        <div className="Push">
          <span className="Value">
            {numberWithCommasAndCheckNone(totalPush || 0)}
          </span>
          <span className="Unit">
            <img src={PushIcon} />
          </span>
        </div>
      )}

      <div className="VideoInfo_Header">
        <div className="Category">
          <img src={shadowIcon} />
        </div>

        <div className="CounterContainer">
          <div className="Counter">
            <span className="Title">조회수</span>
            <span>
              {numberWithCommasAndCheckNone(
                currentVideoInfo && currentVideoInfo.countViewVideo
              )}
            </span>
          </div>
          <div className="Counter">
            <span className="Title">추천</span>
            <span>
              {numberWithCommasAndCheckNone(
                currentVideoInfo && currentVideoInfo.countLikeVideo
              )}
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .Push {
          width: 100%;
          height: 45px;
          background: rgba(0, 0, 0, 0.3);

          box-sizing: border-box;
          padding: 9px 0;

          display: flex;
          justify-content: center;
          align-items: center;
          color: ${FONT_WHITE_COLOR};
        }

        .Push .Value {
          font: 24px "GmarketSansTTFMedium";
        }

        .Push .Unit {
          display: flex;
          align-items: center;

          width: 26px;
          height: 100%;
          box-sizing: border-box;

          margin-left: 5px;

          font-weight: 800;
          font-size: 12px;
        }
        .Push .Unit img {
          width: 100%;
        }

        .VideoInfo_Header {
          box-sizing: border-box;
          margin-top: 20px;
          padding-left: 20px;
        }

        .VideoInfo_Header .Category {
          /*width: 70px;*/

          width: 90px;
          height: 35px;
          margin-left: -20px;
        }

        .VideoInfo_Header .Category img {
          width: 100%;
          height: 100%;

          vertical-align: top;
        }

        .VideoInfo_Header .CounterContainer {
          margin-top: 10px;
          color: ${FONT_WHITE_COLOR};
          font-size: 12px;
          text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.4);
        }

        .VideoInfo_Header .CounterContainer .Counter {
          height: 15px;
          line-height: 15px;
          display: flex;
          align-items: center;
        }

        .VideoInfo_Header .CounterContainer .Counter .Title {
          flex-basis: 40px;
          margin-right: 5px;
        }
      `}</style>
    </>
  );
};

VideoInfoHeader.propTypes = {
  currentVideoInfo: PropTypes.shape({
    countViewVideo: PropTypes.number,
    countLikeVideo: PropTypes.number,
  }),
};

export default React.memo(VideoInfoHeader);
