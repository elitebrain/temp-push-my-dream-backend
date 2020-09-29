import React, { useCallback, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";

import List from "../List";

import { setOrdinal } from "shared/functions";

import medalGold from "public/assets/image/medal_gold.png";
import medalSilver from "public/assets/image/medal_silver.png";
import medalBronze from "public/assets/image/medal_bronze.png";

import pushMyAppleLogo from "public/assets/image/push_my_apple_logo(white).png";
import pushMyChocoLogo from "public/assets/image/push_my_choco_logo(white).png";
import pushMyDanceLogo from "public/assets/image/push_my_dance_logo(white).png";
import pushMySingerLogo from "public/assets/image/push_my_singer_logo(white).png";
import pushMyDreamLogo from "public/assets/image/logo_pushmydream_white.png";
import medal_icon from "public/assets/image/image_medal.png";

const UserAwardItem = ({ award }) => {
  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dev",
  ];

  const title = useMemo(
    () =>
      award.rank.gubun === "month"
        ? `${award.year}. ${monthList[award.month - 1]}`
        : `${award.year}. ${monthList[award.month - 1]}. ${setOrdinal(
            award.weekNo
          )} ${award.rank.gubun}`,
    [award]
  );
  console.log(award);
  return (
    <div className="awards">
      <span className="awards_title">{title}</span>
      <span className="rank">
        <img src={medal_icon} alt="medal_icon" />
        <span className="rank_in_medal">{award.rank.ranking}</span>
        {/* {setOrdinal(award.rank.ranking) === "1st" && (
          <img src={medalGold} alt="medal_gold" />
        )}
        {setOrdinal(award.rank.ranking) === "2nd" && (
          <img src={medalSilver} alt="medal_silver" />
        )}
        {setOrdinal(award.rank.ranking) === "3rd" && (
          <img src={medalBronze} alt="medal_bronze" />
        )} */}
        {setOrdinal(award.rank.ranking)}
      </span>
      <style jsx>{`
        .rank {
          position: absolute;
          left: calc(100% - 70px);
          padding-left: 20px;
          color: #fff;
        }
        .rank:after {
          position: absolute;
          content: "";
          top: 50%;
          transform: translateY(-50%);
          left: -13px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #696c8c;
          z-index: 1;
        }
        .rank > .rank_in_medal {
          position: absolute;
          left: 0;
          width: 13px;
          bottom: -8px;
          text-align: center;
          font-size: 10px;
          color: #000;
        }
        .rank > img {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 13px;
          height: 25px;
        }
        .awards:first-child {
          margin-top: 0;
        }
        .awards {
          position: relative;
          margin-top: 20px;
          height: 18px;
          line-height: 18px;
          font-size: 16px;
          font-weight: 500;
        }
        .awards_title {
          position: absolute;
          right: 95px;
          color: #696c8c;
        }
      `}</style>
    </div>
  );
};

// 카테고리별 수상내역
const UserAwardCategoryItem = ({ category }) => {
  // 수상내역 렌더링 및 최적화
  const renderAwardItem = useCallback(
    (award, index) => <UserAwardItem key={index} award={award} />,
    [category]
  );
  const [logo, setLogo] = useState(null);
  useEffect(() => {
    const { CATEGORY_LEVEL2 } = category;
    if (CATEGORY_LEVEL2) {
      if (CATEGORY_LEVEL2.category_level2_no === 1) {
        setLogo(pushMySingerLogo);
      } else if (CATEGORY_LEVEL2.category_level2_no === 2) {
        setLogo(pushMyDreamLogo);
        // } else if (CATEGORY_LEVEL2.category_level2_no === 3) {
        //   setLogo();
      } else if (CATEGORY_LEVEL2.category_level2_no === 4) {
        setLogo(pushMyDanceLogo);
      } else if (CATEGORY_LEVEL2.category_level2_no === 5) {
        setLogo(pushMyChocoLogo);
      }
    }
  }, [category]);
  return (
    <div>
      <div className="title">
        {/* <div>{category.CATEGORY_LEVEL2.category_level2}</div> */}
        <div>{category.CATEGORY_LEVEL3.category_level3}</div>
        {logo && (
          <picture>
            <img src={logo} alt="logo" />
          </picture>
        )}
      </div>
      <div className="awards_list">
        <List list={category.awardList} renderItem={renderAwardItem} />
      </div>
      <style jsx>{`
        .title {
          position: relative;
          height: 47px;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          box-sizing: border-box;
          background: linear-gradient(180deg, #2f3354 0%, #040221 100%);
          border-radius: 5px;
        }
        .title > div {
          height: 47px;
          line-height: 47px;
          padding-left: 20px;
        }
        .title > picture {
          position: absolute;
          width: 67px;
          height: 27px;
          top: 50%;
          right: 20px;
          transform: translatey(-50%);
        }
        .title > picture > img {
          width: 100%;
          height: 100%;
        }
        .awards_list {
          width: 280px;
          position: relative;
          margin: 5px auto 25px auto;
          padding: 20px 0;
        }
        .awards_list:after {
          position: absolute;
          content: "";
          width: 1px;
          height: 100%;
          background: linear-gradient(
            to top,
            rgba(105, 108, 140, 0.1),
            rgba(105, 108, 140, 1),
            rgba(105, 108, 140, 0.1)
          );
          top: 0;
          left: calc(100% - 80px);
        }
      `}</style>
    </div>
  );
};

const UserAwardsComponent = ({ awardList }) => {
  console.log("awardList", awardList);
  // 카테고리별 수상내역 렌더링 및 최적화
  const renderCategoryItem = useCallback(
    (item) => (
      <UserAwardCategoryItem key={item.category_level3_no} category={item} />
    ),
    [awardList]
  );

  console.log(awardList);

  return (
    <div className="pt_30px">
      <List list={awardList} renderItem={renderCategoryItem} />
      <style jsx>{`
        .pt_30px {
          padding-top: 30px;
        }
      `}</style>
    </div>
  );
};

export default UserAwardsComponent;
