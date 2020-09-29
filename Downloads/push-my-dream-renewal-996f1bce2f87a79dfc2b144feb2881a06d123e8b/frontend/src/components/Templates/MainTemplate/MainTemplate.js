import React from "react";
import PropTypes from "prop-types";

import Footer from "components/Layout/Footer";

const MainTemplate = ({ Header, children, pre, translateY, fullWidth }) => {
  return (
    <div className="main_template">
      {Header}
      {children}
      <Footer />
      <style jsx>{`
          .main_template {
            width: ${(pre && translateY === "0") || fullWidth
              ? "100%"
              : "calc(100vh * 16 / 9)"};
            height: 100vh;
            position: relative;
            margin: auto;
            overflow: ${pre ? "hidden" : "auto"};
            min-height: 675px;
            min-width: calc(675px * 16 / 9);
            transition: 0.5s ease-in-out;
            animation: fade-in 0.5s linear;
            @keyframes fade-in {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          }
        `}</style>
    </div>
  );
};

MainTemplate.propTypes = {
  Header: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  footer: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  pre: PropTypes.bool,
  translateY: PropTypes.string
};

export default MainTemplate;
