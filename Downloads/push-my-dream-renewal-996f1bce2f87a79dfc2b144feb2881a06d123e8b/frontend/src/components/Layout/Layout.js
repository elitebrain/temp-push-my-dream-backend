import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  const {
    children,
    transparent,
    whiteText,
    style,
    emergenza,
    isNoViewHeader,
    className,
    headerNone,
    footerNone,
    rootDarkBlack,
  } = props;
  return (
    <div
      className={`container_layout${rootDarkBlack ? " rootDarkBlack" : ""} `}
    >
      <div className="wrapper_layout">
        {!isNoViewHeader && (
          <Header
            transparent={transparent}
            whiteText={whiteText}
            style={style}
            emergenza={emergenza}
            className={className}
            headerNone={headerNone}
          />
        )}
        {children}
        {/* <Footer footerNone={footerNone} /> */}
      </div>
      <style jsx>{`
        .container_layout {
          max-width: 1920px;
          overflow: hidden;
          background-color: #17182b;
        }
        .container_layout.rootDarkBlack {
          background-color: #141418;
        }
        .wrapper_layout {
          animation: fadein 0.5s linear;
          min-height: 100vh;
          position: relative;
        }
        @media (max-width: 1366px) {
          .wrapper_layout {
            margin-top: -60px;
          }
        }
        @media (min-width: 2560px) {
          .container_layout {
            max-width: 2560px;
          }
        }
        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

Layout.propTypes = {
  transparent: PropTypes.bool,
  whiteText: PropTypes.bool,
  emergenza: PropTypes.bool,
  style: PropTypes.object,
};

export default Layout;
