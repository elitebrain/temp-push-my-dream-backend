import React from "react";
import PropTypes from "prop-types";

const Input = ({
  className,
  type,
  width,
  height,
  readOnly,
  value,
  onChange,
  placeholder,
  ...rest
}) => {
  return (
    <>
      <input
        className={`input ${className ? className : ""}`}
        type={type}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
      <style jsx>{`
        .input {
          box-sizing: border-box;
          ${width ? `width : ${width};` : ""}
          ${height ? `height : ${height};` : ""}
          background-color:#fff;
          border-radius: 10px;
          font-size: 16px;
          border: none;
          padding: 0 35px;
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
  rest: PropTypes.object
};

export default Input;
