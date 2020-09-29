import React from "react";

import add_video_ico from "public/assets/image/add_video.png";

const UploadIco = () => {
  return (
    <div className="upload_ico">
      <img src={add_video_ico} alt="upload_ico" width="100%" height="100%" />

      <style jsx>{`
        .upload_ico {
          width: 132px;
          height: 132px;
          margin: 0 auto;
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  );
};

export default UploadIco;
