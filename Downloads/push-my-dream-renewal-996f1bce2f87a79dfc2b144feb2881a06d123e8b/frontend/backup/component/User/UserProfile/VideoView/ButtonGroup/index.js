import React from "react";

import Button from "components/Common/Button";
import SharedSNSButton from "components/Common/SharedSNSButton";

import like_img_bg from "public/assets/image/like_img(white).png";

const ButtonGroup = () => {
  return (
    <div className="button_group_container">
      <div className="share_ico">
        <SharedSNSButton icon style={{ width: "28px", height: "28px" }} />
      </div>
      <Button
        style={{
          width: "105px",
          height: "44px",
          fontSize: "15px",
          padding: "0 8px",
          display: "inline-block",
          verticalAlign: "middle"
        }}
      >
        <img
          src={like_img_bg}
          alt="like_img_bg"
          width="19px"
          height="17px"
          className="mr_10px va_m"
        />
        좋아요
      </Button>
      <style jsx>{`
        .mr_10px {
          margin-right: 10px;
        }
        .va_m {
          vertical-align: middle;
        }
        .button_group_container {
          position: absolute;
          bottom: 100px;
          right: 20px;
        }
        .share_ico {
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
        }
      `}</style>
    </div>
  );
};

export default ButtonGroup;
