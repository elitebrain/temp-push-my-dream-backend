import React from "react";

import search_ico from "public/assets/icon/search_ico(white).svg";
import {
  SEARCH_FORM_BG_COLOR,
  SEARCH_FORM_COLOR
} from "shared/constants/colors";

const Search = ({
  long,
  short = long ? false : true,
  placeholder,
  value,
  onChange,
  onSearch,
  style
}) => {
  const searchFormClass = `searchform${short ? " short" : ""}${
    long ? " long" : ""
  }`;

  return (
    <div className={searchFormClass} style={style}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button onClick={onSearch}>
        <img src={search_ico} alt="search_ico" width="100%" height="100%" />
      </button>
      <style jsx>{`
        .searchform {
          background-color: ${SEARCH_FORM_BG_COLOR};
          position: relative;
          border-radius: 10px;
        }
        .searchform.short {
          height: 55px;
          width: 100%;
        }
        .searchform.long {
          height: 45px;
          width: 270px;
        }
        .searchform input {
          font-size: 16px;
          width: calc(100% - 40px);
          height: 100%;
          border: 0px;
          padding-left: 15px;
          box-sizing: border-box;
          background-color: inherit;
          border-radius: 10px;
          color: ${SEARCH_FORM_COLOR};
        }
        .searchform input:focus {
          outline: none;
        }
        .searchform button {
          width: 20px;
          height: 20px;
          border: none;
          position: absolute;
          top: 50%;
          right: 15px;
          transform: translateY(-50%);
          background-color: inherit;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Search;
