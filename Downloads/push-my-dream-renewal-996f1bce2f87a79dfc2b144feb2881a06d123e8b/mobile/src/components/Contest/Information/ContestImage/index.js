import React from "react";

import content_img from "public/assets/image/apple.jpg";

const ContestImage = () => {
  return (
    <>
      <div className="content_img" />
      <style jsx>{`
        .content_img {
          height: 230px;
          background-image: url(${content_img});
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
        }
      `}</style>
    </>
  );
};

export default ContestImage;
