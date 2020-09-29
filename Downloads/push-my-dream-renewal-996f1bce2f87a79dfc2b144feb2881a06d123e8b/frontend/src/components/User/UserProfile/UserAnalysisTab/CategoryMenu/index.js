import React from "react";

import apple_active from "public/assets/icon/logo_apple_w.svg";
import apple from "public/assets/icon/logo_apple_g.svg";
import dance_active from "public/assets/icon/logo_dance_w.svg";
import dance from "public/assets/icon/logo_dance_g.svg";

const MenuImage = ({ isActive, active, none }) => {
  return (
    <img
      src={isActive ? active : none}
      alt="menu_img"
      width="100%"
      height="100%"
    />
  );
};

const CategoryMenu = ({ tab, onChangeTab }) => {
  return (
    <div className="CategoryMenu_container">
      <div className="menu_list">
        <div className="menu" onClick={onChangeTab.bind(this, 1)}>
          <MenuImage isActive={tab === 1} active={apple_active} none={apple} />
        </div>
        <div className="menu" onClick={onChangeTab.bind(this, 2)}>
          <MenuImage isActive={tab === 2} active={dance_active} none={dance} />
        </div>
      </div>
      <style jsx>{`
        .CategoryMenu_container {
          height: 100%;
          border-right: 1px solid #dcdcdc;
          display: inline-block;
          margin-right: 50px;
          padding-right: 30px;
        }
        .menu {
          width: 80px;
          height: 35px;
          margin-bottom: 20px;
        }
        .menu_list {
          padding-top: 80px;
        }
        .menu:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default CategoryMenu;
