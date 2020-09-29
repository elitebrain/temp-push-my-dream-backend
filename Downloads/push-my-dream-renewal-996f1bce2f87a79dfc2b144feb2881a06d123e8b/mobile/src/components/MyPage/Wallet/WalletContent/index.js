import React from "react";
import PropTypes from "prop-types";

import Content from "components/Layout/Content";
import { WHITE_COLOR, GRADIENT_2F3354_040221 } from "shared/constants/colors";

const WalletContent = ({ title, icon, children }) => {
  return (
    <div className="WalletContent">
      <Content>
        <div className="title_container">
          <span className="Title">{title}</span>
          {icon && (
            <div className="Icon">
              <img src={icon} width="100%" height="100%" />
            </div>
          )}
        </div>
      </Content>
      <div className="WalletContent_Content">{children}</div>

      <style jsx>{`
        .WalletContent {
          margin-bottom: 30px;
        }

        .WalletContent:last-of-type {
          margin-bottom: initial;
        }
        .title_container {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          height: 20px;
        }
        .title_container .Title {
          font-size: 14px;
          color: ${WHITE_COLOR};
        }

        .title_container .Icon {
          width: 50px;
          height: 20px;
        }

        .WalletContent_Content {
          padding: 15px 20px;
          background-image: ${GRADIENT_2F3354_040221(180, "-27.85%", "68.61%")};
        }
      `}</style>
    </div>
  );
};

WalletContent.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
};

export default WalletContent;
