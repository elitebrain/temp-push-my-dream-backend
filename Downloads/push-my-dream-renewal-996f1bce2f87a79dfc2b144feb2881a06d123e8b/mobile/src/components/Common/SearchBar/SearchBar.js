import React from "react";

import { GRADIENT_00F1B4_D53CF5 } from "shared/constants/colors";

import search_ico from "public/assets/icon/search_ico(gradient).svg";
import close_ico from "public/assets/icon/close_circle(purple).svg";

const SearchBar = ({ Content, closeIco, style }) => {
  return (
    <div className="search">
      <div className="searchform" style={style}>
        <input type="text" placeholder={Content} />
        <button>
          {closeIco ? (
            <img src={close_ico} alt="close_ico" width="100%" height="100%" />
          ) : (
            <img src={search_ico} alt="search_ico" width="100%" height="100%" />
          )}
        </button>
      </div>
      <style jsx>{`
        .search {
          height: 60px;
          /* width: 100%; */
          background-image: ${GRADIENT_00F1B4_D53CF5(90)};
          border-radius: 30px;
          position: relative;
        }
        .searchform {
          width: calc(100% - 4px);
          height: 55px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          /* background-color: #141418; */
          background-color: #000;
          position: relative;
          border-radius: 30px;
        }
        .searchform input {
          font-size: 16px;
          width: calc(100% - 47px);
          height: 100%;
          border: 0px;
          padding-left: 20px;
          box-sizing: border-box;
          background-color: inherit;
          border-radius: 30px;
          color: #fff;
        }
        .searchform button {
          width: 22px;
          height: 22px;
          border: none;
          position: absolute;
          top: 50%;
          right: 22px;
          transform: translateY(-50%);
          background-color: inherit;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
