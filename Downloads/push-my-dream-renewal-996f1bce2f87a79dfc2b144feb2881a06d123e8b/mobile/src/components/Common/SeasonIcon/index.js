import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

/**
 * 시즌 아이콘
 * 아티스트면 그라데이션, 일반이면 흰색 배경의 아이콘을 보여준다.
 * 클릭시 시즌 정보로 이동한다.
 */
const SeasonIcon = ({ isActiveLink = true, season }) => {
  if (!season || (season && !season.type)) {
    return null;
  }
  return (
    <Link
      href={isActiveLink && "/season/season_no"}
      as={isActiveLink && `/season/${season.category_level3_no}`}
    >
      <a className="SeasonIcon">
        <img
          src={
            season.type === "normal"
              ? season.CATEGORY_LEVEL2.category_level2_icon
              : season.CATEGORY_LEVEL2.category_level2_gradient_icon
          }
          width="100%"
          height="100%"
        />
        <style jsx>{`
          .SeasonIcon {
            width: 65px;
            height: 25px;
            display: block;
            cursor: pointer;
          }
        `}</style>
      </a>
    </Link>
  );
};

SeasonIcon.propTypes = {
  isActiveLink: PropTypes.bool,
  season: PropTypes.shape({
    CATEGORY_LEVEL2: PropTypes.shape({
      category_level2_icon: PropTypes.string,
      category_level2_gradient_icon: PropTypes.string,
    }),
    type: PropTypes.string,
    category_level3_no: PropTypes.number,
  }),
};

export default SeasonIcon;
