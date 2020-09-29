import React from "react";
import PropTypes from "prop-types";

import Body from "components/Layout/Body";
import BannerContent from "./BannerContent";

const BannerComponent = props => {
  const {
    categoryNo,
    category,
    desc,
    startDate,
    endDate,
    url,
    emergenzaStyle,
    appleStyle,
    style,
    className
  } = props;

  console.log(appleStyle);

  console.log("emergenzaStyle", emergenzaStyle);
  console.log(props);
  return (
    <Body>
      <div className="banner" style={style}>
        <BannerContent
          categoryNo={categoryNo}
          category={category}
          desc={desc}
          startDate={startDate}
          endDate={endDate}
          emergenzaStyle={emergenzaStyle}
          appleStyle={appleStyle}
          className={className}
        />
      </div>
      <style jsx>{`
        .banner {
          position: relative;
          width: 100%;
          height: 795px;
          background-image: url('${url}');
          background-size: cover;
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
  url: PropTypes.string
};

export default BannerComponent;
