import React, { useMemo } from "react";

import reple_active from "public/assets/icon/chat_ico(rainbow).svg";
import reple_none from "public/assets/icon/chat_ico(gray).svg";
import infinite_active from "public/assets/icon/infinite_ico(rainbow).svg";
import infinite from "public/assets/icon/infinite_ico(gray).svg";
import board_active from "public/assets/icon/board_ico(rainbow).svg";
import board from "public/assets/icon/board_ico(gray).svg";
import cart_active from "public/assets/icon/cart_ico(rainbow).svg";
import cart from "public/assets/icon/cart_ico(gray).svg";

const MenuImage = ({ isActive, active, none }) => {
  const isWindowClient = typeof window === "object";
  const menuStyle = useMemo(() => {
    return isWindowClient && window.outerWidth >= 2560
      ? {
          width: "40px",
          height: "40px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }
      : {
          width: "21px",
          height: "21px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        };
  }, [isWindowClient && window.outerWidth]);

  return (
    <img src={isActive ? active : none} alt="menu_ico" style={menuStyle} />
  );
};

const MenuList = ({ tab, onChangeTab }) => {
  return (
    <div className="menu_list_container">
      <div
        className={`menu${tab === 1 ? " active" : " none"}`}
        onClick={onChangeTab.bind(this, 1)}
      >
        {/* 채팅 */}
        <MenuImage
          isActive={tab === 1}
          active={reple_active}
          none={reple_none}
        />
      </div>
      <div
        className={`menu${tab === 2 ? " active" : " none"}`}
        onClick={onChangeTab.bind(this, 2)}
      >
        {/* 푸쉬 */}
        <MenuImage
          isActive={tab === 2}
          active={infinite_active}
          none={infinite}
        />
      </div>
      <div
        className={`menu${tab === 3 ? " active" : " none"}`}
        onClick={onChangeTab.bind(this, 3)}
      >
        {/* 수상내역 */}
        <MenuImage isActive={tab === 3} active={board_active} none={board} />
      </div>
      <div
        className={`menu${tab === 4 ? " active" : " none"}`}
        onClick={onChangeTab.bind(this, 4)}
      >
        {/* 쇼핑 */}
        <MenuImage isActive={tab === 4} active={cart_active} none={cart} />
      </div>
      <style jsx>{`
        .menu_list_container {
          width: 50px;
          position: absolute;
          right: -28px;
          top: 128px;
          box-sizing: border-box;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        .menu {
          width: 50px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          margin-bottom: 7px;
          background: linear-gradient(
              to right,
              rgba(0, 0, 0, 0.27),
              rgba(0, 0, 0, 0.27)
            ),
            linear-gradient(90deg, #2f3354 0%, #040221 142.86%);
          border-radius: 0px 5px 5px 0px;
          position: relative;
          cursor: pointer;
        }
        .menu img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .menu:last-child {
          margin: 0;
        }
        .menu.active {
          background: linear-gradient(90deg, #2f3354 0%, #040221 142.86%);
        }
        .none span {
          font-size: 16px;
          font-weight: 400;
          color: #878792;
        }
        @media (max-width: 1366px) {
          .menu_list_container {
            right: -28px;
            top: 111px;
          }
        }
        @media (min-width: 2560px) {
          .menu_list_container {
            width: 80px;
            right: -50px;
            top: 154px;
          }
          .menu {
            width: 80px;
            height: 80px;
            line-height: 80px;
          }
          .menu img {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default MenuList;
