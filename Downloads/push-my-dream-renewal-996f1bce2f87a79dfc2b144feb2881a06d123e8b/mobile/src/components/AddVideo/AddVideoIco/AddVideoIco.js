import React from "react";

import add_video_ico from "public/assets/image/video_ico.png";

const AddVideoIco = () => {
  return (
    <div className="add_video_ico">
      <img src={add_video_ico} alt="add_video_ico" width="100%" height="100%" />

      <style jsx>{`
        .add_video_ico {
          width: 120px;
          height: 120px;
          margin: 0 auto;
          margin-top: 30px;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default AddVideoIco;
