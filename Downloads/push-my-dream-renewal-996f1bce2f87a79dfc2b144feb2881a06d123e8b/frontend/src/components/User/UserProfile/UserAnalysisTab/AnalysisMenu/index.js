import React from "react";

import graph_active from "public/assets/icon/graph_ico(white).svg";
import graph from "public/assets/icon/graph_ico(gray).svg";
import book_active from "public/assets/icon/book_ico(white).svg";
import book from "public/assets/icon/book_ico(gray).svg";
import chart_active from "public/assets/icon/chart_ico(white).svg";
import chart from "public/assets/icon/chart_ico(gray).svg";
import user_active from "public/assets/icon/user_ico(white).svg";
import user from "public/assets/icon/user_ico(gray).svg";

const MenuImage = ({ isActive, active, none }) => {
  return (
    <img
      src={isActive ? active : none}
      alt="menu_ico"
      width="30px"
      height="25px"
      style={{
        display: "block",
        margin: "0 auto",
        marginBottom: "10px",
      }}
    />
  );
};

const AnalysisMenu = ({ tab, onChangeTab }) => {
  return (
    <div className="AnalysisMenu_container">
      <div
        className={`menu${tab === 1 ? " active" : " none"}`}
        onClick={onChangeTab.bind(this, 1)}
      >
        <MenuImage isActive={tab === 1} active={graph_active} none={graph} />
        <span>BASIC</span>
        <span className="line" />
      </div>
      <div
        className={`menu${tab === 2 ? " active" : " none"}`}
        onClick={onChangeTab.bind(this, 2)}
      >
        <MenuImage isActive={tab === 2} active={book_active} none={book} />
        <span>PUSH</span>
        <span className="line" />
      </div>
      <div
        className={`menu${tab === 3 ? " active" : " none"}`}
        onClick={onChangeTab.bind(this, 3)}
      >
        <MenuImage isActive={tab === 3} active={chart_active} none={chart} />
        <span>ACTIVITY</span>
        <span className="line" />
      </div>
      <div
        className={`menu${tab === 4 ? " active" : " none"}`}
        onClick={onChangeTab.bind(this, 4)}
      >
        <MenuImage isActive={tab === 4} active={user_active} none={user} />
        <span>FANS</span>
        <span className="line" />
      </div>
      <style jsx>{`
        .AnalysisMenu_container {
          border-bottom: 1px solid black;
        }
        .menu {
          width: 120px;
          height: 60px;
          display: inline-block;
          font-size: 15px;
          font-weight: bold;
          color: #999999;
          position: relative;
          text-align: center;
          margin-right: 30px;
        }
        .menu:last-child {
          margin-right: 0;
        }
        .menu.active {
          color: #fff;
        }
        .menu span:first-child {
          display: block;
          text-align: center;
        }

        .menu.active .line {
          display: block;
        }
        .line {
          width: 100%;
          height: 1px;
          background-color: #fff;
          position: absolute;
          left: 0;
          bottom: 0;
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AnalysisMenu;
