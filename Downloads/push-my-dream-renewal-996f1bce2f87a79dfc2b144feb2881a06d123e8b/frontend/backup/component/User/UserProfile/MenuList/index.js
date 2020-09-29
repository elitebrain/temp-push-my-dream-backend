import React from "react";

import { BLACK_COLOR } from "shared/constants/colors";

import reple_active from "public/assets/icon/comment_ico(white).svg";
import reple_none from "public/assets/icon/comment_ico(gray).svg";
import chart_active from "public/assets/icon/chart_ico(white).svg";
import chart_none from "public/assets/icon/chart_ico(gray).svg";
import speaker_active from "public/assets/icon/speaker_ico(white).svg";
import speaker_none from "public/assets/icon/speaker_ico(gray).svg";

const MenuList = () => {
  return (
    <div className="menu_list_container">
      <div className="menu active">
        <img src={reple_active} alt="reple_ico" width="21px" height="21px" />
        <span>댓글</span>
      </div>
      {/* <div className="menu none">
        <img src={reple_none} alt="reple_ico" width="21px" height="21px" />
        <span>댓글</span>
      </div> */}

      {/* <div className="menu active">
        <img src={chart_active} alt="chart_ico" width="21px" height="21px" />
        <span>활동</span>
      </div> */}
      <div className="menu none">
        <img src={chart_none} alt="chart_ico" width="21px" height="21px" />
        <span>활동</span>
      </div>

      {/* <div className="menu active">
        <img
          src={speaker_active}
          alt="speaker_ico"
          width="21px"
          height="21px"
        />
        <span>참여</span>
      </div> */}
      <div className="menu none">
        <img src={speaker_none} alt="speaker_ico" width="21px" height="21px" />
        <span>참여</span>
      </div>
      <style jsx>{`
        .menu_list_container {
          width: 50px;
          position: absolute;
          right: -50px;
          top: 92px;
          background-color: ${BLACK_COLOR};
          padding: 20px 10px;
          box-sizing: border-box;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        .menu {
          margin-bottom: 20px;
        }
        .menu img {
          margin: 0 auto;
          display: block;
        }
        .menu:last-child {
          margin: 0;
        }
        .active span {
          font-size: 16px;
          font-weight: bold;
          color: #fff;
        }
        .none span {
          font-size: 16px;
          font-weight: 400;
          color: #878792;
        }
      `}</style>
    </div>
  );
};

export default MenuList;
