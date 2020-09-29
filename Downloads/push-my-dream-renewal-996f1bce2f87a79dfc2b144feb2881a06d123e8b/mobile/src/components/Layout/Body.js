import React from "react";
import PropTypes from "prop-types";

const Body = (props) => {
  const { children, isViewScroll = true, style } = props;

  const bodyClass = `wrapper_body${!isViewScroll ? " not_scroll" : ""}`;

  return (
    <div className={bodyClass} style={style}>
      {children}
      <style jsx>{`
        .wrapper_body {
          width: 100%;
          /* background-color: #1e1e25; */
          padding-bottom: 80px;
        }

        .wrapper_body.not_scroll {
          height: 100vh;
          overflow: auto;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        .wrapper_body.not_scroll::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
        }

        .bg_navy {
          background-color: #3a3949;
        }
        @media (max-width: 425px) {
          .wrapper_body {
            min-width: 320px;
          }
        }
      `}</style>
    </div>
  );
};

Body.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isViewScroll: PropTypes.bool,
  style: PropTypes.object,
};

export default Body;
