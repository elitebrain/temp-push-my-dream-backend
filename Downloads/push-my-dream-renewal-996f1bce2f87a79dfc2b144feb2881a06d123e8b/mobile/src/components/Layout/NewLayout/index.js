import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import NewHeader from "./NewHeader";
// import BackIcon from "components/Common/BackIcon";
import NewNav from "./NewNav";
import Footer from "../Footer";

const NewLayout = (props) => {
  const {
    children,
    transparent,
    whiteText,
    className,
    emergenza,
    style,
    defaultBgColor,
    hideFooter,
    handleTerms,
    // NoBackIcon,
  } = props;
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.document.body.style.overflow = "hidden";

    window.addEventListener("resize", resizeEvent);

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };

    function resizeEvent(e) {
      setHeight(e.srcElement.innerHeight);
    }
  }, []);
  return (
    <div className="container_layout" style={style}>
      <div className="wrapper_layout">
        <NewHeader
          className={className}
          emergenza={emergenza}
          whiteText={whiteText}
          defaultBgColor={defaultBgColor || ""}
          handleTerms={handleTerms}
        />
        {/* {!NoBackIcon && <BackIcon />} */}
        <div className="layout_content_container">
          {children}
          {/* {!hideFooter && <Footer className={className} />} */}
        </div>

        <NewNav />
      </div>
      <style jsx>{`
        .container_layout {
          height: ${height}px;
          overflow: hidden;
        }
        .wrapper_layout {
          animation: fadein 0.5s linear;
          position: relative;
          height: 100%;
        }

        .layout_content_container {
          height: calc(100% - 101px);
          overflow: auto;
          overflow-x: hidden;
          position: relative;
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

NewLayout.propTypes = {
  transparent: PropTypes.bool,
  whiteText: PropTypes.bool,
  emergenza: PropTypes.bool,
  handleTerms: PropTypes.func,
};

export default NewLayout;
