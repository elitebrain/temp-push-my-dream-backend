import React from "react";
import PropTypes from "prop-types";
import { COLOR_979CCA } from "shared/constants/colors";

const Input = ({
  className,
  type,
  name,
  width,
  height,
  readOnly,
  style,
  value,
  onChange,
  placeholder,
  ...rest
}) => {
  return (
    <>
      <input
        className={`input ${className ? className : ""}`}
        name={name}
        type={type}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
        {...rest}
      />
      <style jsx>{`
        .input {
          box-sizing: border-box;
          ${width ? `width : ${width};` : ""}
          ${height ? `height : ${height};` : ""}
          background-color:#fff;
          border-radius: 5px;
          font-size: 13px;
          font-weight: 400;
          border: none;
          padding: 0 20px;
          border: 1px solid ${COLOR_979CCA};
        }
        .input.fs12px {
          font-size: 12px;
        }
        .input::placeholder {
          color: ${COLOR_979CCA};
        }
        .input:read-only {
          background-color: #444455;
          color: #fff;
        }
      `}</style>
    </>
  );
};

Input.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  rest: PropTypes.object,
};

export default Input;
