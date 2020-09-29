import React from "react";
import MenuTab from "./MenuTab";
import UserItems from "./UserItems";
import { GRADIENT_2B2C3F_020216 } from "shared/constants/colors";

const SearchList = () => {
  return (
    <div className="SearchList_container">
      <MenuTab />
      <div className="item_list">
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
        <UserItems />
      </div>
      <style jsx>{`
        .item_list {
          padding: 10px 20px;
          padding-bottom: 30px;
          background-image: ${GRADIENT_2B2C3F_020216(90)};
        }
      `}</style>
    </div>
  );
};

export default SearchList;
