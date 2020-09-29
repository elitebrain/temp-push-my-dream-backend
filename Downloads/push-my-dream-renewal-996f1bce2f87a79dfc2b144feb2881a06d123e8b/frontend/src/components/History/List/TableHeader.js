import React from "react";

const TableHeader = () => {
  return (
    <thead>
      <tr className="header">
        <td>
          <select>
            <option>2020</option>
            <option>2019</option>
          </select>
        </td>
        <td className="rank">1위</td>
        <td className="rank">2위</td>
        <td className="rank">3위</td>
      </tr>
      <style jsx>{`
        .header {
          text-align: center;
        }
        .header select {
          width: 65px;
          border: none;
          background-color: inherit;
          font-size: 16px;
          font-weight: bold;
          color: #e6cc7d;
        }
        .header .rank {
          font-size: 13px;
          font-weight: bold;
          color: #ffd3d3;
        }
      `}</style>
    </thead>
  );
};

export default TableHeader;
