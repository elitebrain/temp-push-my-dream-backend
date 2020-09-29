import React from "react";

import img_item from "public/assets/image/gate_emergenza_img.png";

const GateImageItem = () => {
  return (
    <div className="img_item">
      <img src={img_item} alt="img_item" width="100%" height="100" />
      <style jsx>{`
        .img_item {
          width: 150px;
          height: 100px;
          border-radius: 10px;
          display: inline-block;
          margin-right: 20px;
        }
      `}</style>
    </div>
  );
};

export default GateImageItem;
