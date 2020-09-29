import React, { useMemo } from "react";
import PropTypes from "prop-types";

import Content from "components/Layout/Content";

import {
  COLOR_696C8C,
  GRADIENT_00F1B4_D53CF5,
  COLOR_AE46E7,
} from "shared/constants/colors";

const MenuTab = ({ tab, onClickTab }) => {
  const pushClass = useMemo(() => {
    return `push ${tab === "push" ? "active" : ""}`;
  }, [tab]);

  const pointClass = useMemo(() => {
    return `point ${tab === "point" ? "active" : ""}`;
  }, [tab]);

  const supportClass = useMemo(() => {
    return `support ${tab === "support" ? "active" : ""}`;
  }, [tab]);

  return (
    <Content>
      <div className="tab_menu">
        <div className={pushClass} onClick={onClickTab.bind(this, "push")}>
          <span>PUSH</span>
          <div className="underline" />
        </div>
        <div className={pointClass} onClick={onClickTab.bind(this, "point")}>
          <span>POINT</span>
          <div className="underline" />
        </div>
        <div
          className={supportClass}
          onClick={onClickTab.bind(this, "support")}
        >
          <span>후원</span>
          <div className="underline" />
        </div>
        <style jsx>{`
          .tab_menu {
            margin-bottom: 25px;
            display: flex;
            align-items: center;
          }
          .tab_menu .push,
          .tab_menu .point,
          .tab_menu .support {
            flex: 1;
            cursor: pointer;
          }

          .tab_menu .push span:first-child,
          .tab_menu .point span:first-child,
          .tab_menu .support span:first-child {
            padding: 5px 0;
            font-size: 16px;
            color: ${COLOR_696C8C};
            text-align: center;
            margin-bottom: 8px;
            display: block;

            line-height: 100%;
          }
          .tab_menu .push.active span:first-child,
          .tab_menu .point.active span:first-child,
          .tab_menu .support.active span:first-child {
            font-weight: bold;
            color: ${COLOR_AE46E7};
          }
          .tab_menu .push .underline,
          .tab_menu .point .underline,
          .tab_menu .support .underline {
            width: 100%;
            height: 1px;
            margin: 0 auto;
            background-image: ${GRADIENT_00F1B4_D53CF5(90)};
            display: none;
          }
          .tab_menu .push.active .underline,
          .tab_menu .point.active .underline,
          .tab_menu .support.active .underline {
            display: block;
          }
          .tab_menu .point {
            width: 50%;
            display: inline-block;
            vertical-align: middle;
          }
        `}</style>
      </div>
    </Content>
  );
};

MenuTab.propTypes = {
  tab: PropTypes.string.isRequired,
  onClickTab: PropTypes.func.isRequired,
};

export default MenuTab;
