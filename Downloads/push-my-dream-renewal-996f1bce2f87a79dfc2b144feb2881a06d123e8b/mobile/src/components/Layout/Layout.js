import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Nav from "./Nav";
import { BACKGROUND_BLACK_COLOR } from "shared/constants/colors";

const Layout = (props) => {
  const {
    children,
    transparent,
    whiteText,
    className,
    emergenza,
    style,
    defaultBgColor,
    layoutLong,
  } = props;
  const [isTransparent, setIsTransparent] = useState(false);
  useEffect(() => {
    _toggleTransparent();
    window.addEventListener("scroll", _toggleTransparent);
    return () => window.removeEventListener("scroll", _toggleTransparent);
  }, []);
  const _toggleTransparent = () => {
    const scrollTop = document.querySelector("html").scrollTop;
    if (scrollTop === 0) {
      setIsTransparent(transparent || false);
    } else {
      setIsTransparent(false);
    }
  };
  return (
    <div
      className={`container_layout${layoutLong ? " layoutLong" : ""}`}
      style={style}
    >
      <div className="wrapper_layout">
        <Header
          transparent={isTransparent}
          className={className}
          emergenza={emergenza}
          whiteText={whiteText}
          defaultBgColor={defaultBgColor || ""}
        />
        {children}
        <Nav />
      </div>
      <style jsx>{`
        .container_layout {
          /* background-color: #1e1e25; */

          /* min-width: 320px; */

          background-color: ${BACKGROUND_BLACK_COLOR};
        }
        .container_layout.layoutLong .wrapper_layout {
          height: 100vh;
        }
        .wrapper_layout {
          animation: fadein 0.5s linear;
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
};

export default Layout;
