import React from "react";
import Link from "next/link";

import add_circle_ico from "public/assets/icon/add_circle(white).svg";
import { WHITE_COLOR, COLOR_AE46E7 } from "shared/constants/colors";
const NoVideo = () => {
  return (
    <Link href="/upload">
      <a className="NoVideo">
        <img className="UploadCircle" src={add_circle_ico} />
        <h5>동영상 업로드</h5>
        <p>첫 번째 동영상을 공유해보세요.</p>
        <style jsx>{`
          .NoVideo {
            width: 100%;
            height: 350px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
          }

          .NoVideo .UploadCircle {
            margin-top: 85px;
          }

          .NoVideo h5 {
            margin-top: 25px;
            font-size: 18px;
            line-height: 22px;
            color: ${WHITE_COLOR};
          }

          .NoVideo p {
            margin-top: 25px;
            font-size: 15px;
            line-height: 18px;
            color: ${COLOR_AE46E7};
          }
        `}</style>
      </a>
    </Link>
  );
};

export default NoVideo;
