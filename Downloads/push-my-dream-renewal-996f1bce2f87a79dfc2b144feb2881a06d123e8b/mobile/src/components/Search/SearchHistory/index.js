import React from "react";

import Items from "./Items";

const SearchHistory = () => {
  return (
    <div className="SearchHistory_container">
      <Items />
      <Items />
      <style jsx>{`
        .SearchHistory_container {
          padding: 0 20px;
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
};

export default SearchHistory;
