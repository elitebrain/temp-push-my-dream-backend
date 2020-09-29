import React from "react";
import PropTypes from "prop-types";
import LazyImage from "components/Common/LazyImage";

const RankerAvatar = ({ src }) => {
  return (
    <LazyImage src={src} alt="ranker_img" width="100%" height="100%" circle />
  );
  // return (
  //   <>
  //     <img src={src} alt="ranker_img" width="100%" height="100%" />
  //     <style jsx>{`
  //       img {
  //         border-radius: 50%;
  //       }
  //     `}</style>
  //   </>
  // );

  // return (
  //   <>
  //     <img src={src} alt="ranker_img" width="100%" height="100%" />
  //     <style jsx>{`
  //       img {
  //         border-radius: 50%;
  //       }
  //     `}</style>
  //   </>
  // );
};

RankerAvatar.propTypes = {
  src: PropTypes.string.isRequired,
};

export default RankerAvatar;
