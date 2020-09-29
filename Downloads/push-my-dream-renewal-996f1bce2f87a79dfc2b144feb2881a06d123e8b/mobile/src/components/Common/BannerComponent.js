import React from "react";
import PropTypes from "prop-types";

import Body from "components/Layout/Body";
import BannerContent from "./BannerContent";

const BannerComponent = props => {
  const {
    categoryNo,
    title,
    round,
    startDate,
    endDate,
    url,
    emergenzaStyle,
    category,
    desc,
    isOfficial,
    style,
    className,
    ...rest
  } = props;
  return (
    <Body>
      <div className={`banner`} style={style} {...rest}>
        <BannerContent
          isOfficial={isOfficial}
          categoryNo={categoryNo}
          category={category}
          desc={desc}
          startDate={startDate}
          endDate={endDate}
          emergenzaStyle={emergenzaStyle}
          className={className}
        />
      </div>
      <style jsx>{`
        .banner {
          position: relative;
          width: 100%;
          height: 290px;
          background-image: url('${url}');
          background-size: cover;
          background-position: center center;
        }
      `}</style>
    </Body>
  );
};

BannerComponent.propTypes = {
  categoryNo: PropTypes.number,
  title: PropTypes.string,
  round: PropTypes.number,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  url: PropTypes.string,
  isOfficial: PropTypes.bool
};

export default BannerComponent;
