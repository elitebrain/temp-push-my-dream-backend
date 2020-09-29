import React from "react";

import TableHeader from "./TableHeader";
import Items from "./Items";

const List = () => {
  return (
    <div className="list_container">
      <div className="list_box">
        <div className="list">
          <table>
            <TableHeader />
            <Items />
            <Items />
            <Items />
            <Items />
          </table>
          <div className="line" />
        </div>
        <div className="list">
          <table>
            <TableHeader />
            <Items />
            <Items />
            <Items />
            <Items />
          </table>
          <div className="line" />
        </div>
        <div className="list">
          <table>
            <TableHeader />
            <Items />
            <Items />
            <Items />
            <Items />
          </table>
          <div className="line" />
        </div>
      </div>
      <style jsx>{`
        .list {
          width: 100%;
        }
        .list:last-child {
          margin-bottom: 100px;
        }
        .list .line {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100%);
          margin: 10px 0;
        }
        table {
          /* tr 사이에 여백 주기 */
          border-collapse: separate;
          border-spacing: 0px 15px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default List;
