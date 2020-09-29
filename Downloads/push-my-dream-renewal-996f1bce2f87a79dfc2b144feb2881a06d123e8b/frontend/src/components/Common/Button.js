import React from "react";
import PropTypes from "prop-types";

const Button = props => {
  const {
    children,
    className,
    style,
    handleClick,
    width,
    height,
    ...rest
  } = props;
  return (
    <>
      <button
        className={className}
        style={style}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </button>
      <style jsx>{`
        button {
          border: none;
          width: ${width ? `${width};` : "137px;"}
          height: ${height ? `${height};` : "56px;"}
          border-radius: 30px;
          background-color: #f38400;
          font-size: 18px;
          color: #fff;
        }
        button:hover {
          cursor: pointer;
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
        .bg_orange{
          background-color: #f38400;
        }
        .bg_real_black {
          background-color: #000;
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
        .rectangle {
          width: 90px;
          height: 60px;
          border-radius: 15px;
        }
        .fs_16px {
          font-size: 16px;
        }
        .br_none {
          border-radius: inherit;
        }
        .v_md {
          vertical-align: middle;
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
  handleClick: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string
};

export default Button;
