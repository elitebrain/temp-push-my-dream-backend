import React from "react";

const Items = () => {
  return (
    <tbody>
      <tr className="items">
        <td className="title">2월 4째주</td>
        <td className="nickname">신나래신나래신나래메신나래신나래신나래메</td>
        {/* <td className="nickname">채송이</td> */}
        <td className="nickname">채송이</td>
        <td className="nickname">김효주</td>
      </tr>
      <style jsx>{`
        .items span {
          display: inline-block;
          vertical-align: middle;
          line-height: 20px;
        }
        .title {
          width: 165px;
          text-align: right;
          font-weight: bold;
          font-size: 16px;
          line-height: 20px;
          color: #ffd3d3;
          margin-right: 40px;
          padding-right: 15px;
        }
        .nickname {
          max-width: 205px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 20px;
          font-size: 14px;
          font-weight: bold;
          color: #bfbfbf;
          text-align: center;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }
        .nickname:last-child {
          border: none;
        }
      `}</style>
    </tbody>
  );
};

export default Items;
