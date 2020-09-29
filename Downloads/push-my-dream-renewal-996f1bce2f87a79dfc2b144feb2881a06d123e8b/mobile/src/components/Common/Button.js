import React from "react";
import PropTypes from "prop-types";

const Button = props => {
  const { children, className, style, handleClick } = props;
  return (
    <>
      <button className={className} style={style} onClick={handleClick}>
        {children}
      </button>
      <style jsx>{`
        button:hover {
          cursor: pointer;
        }
        button:focus {
          outline: 0;
        }
        .large {
          width: 200px;
          height: 60px;
          font-size: 18px;
        }
        .v_md {
          vertical-align: middle;
        }
        .d_inline-block {
          display: inline-block;
        }
        .ml_20px {
          margin-left: 20px;
        }
        .wide {
          width: 147px;
          height: 47px;
        }
        .short {
          width: 131px;
          height: 57px;
        }
        .bg_grey {
          background-color: #39394a;
        }
        .bg_black {
          background-color: #15151a;
        }
        .bg_transparent {
          background-color: transparent;
        }
        .border_solid_white {
          border: 1px solid #fff;
        }
        .br_10px {
          border-radius: 10px;
        }
        .br_none {
          border-radius: inherit;
        }
        button {
          border: none;
          font-size: 14px;
          width: 91px;
          height: 36px;
          border-radius: 30px;
          background-color: #f38400;
          color: #fff;
          display: block;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
  handleClick: PropTypes.func
};

export default Button;
