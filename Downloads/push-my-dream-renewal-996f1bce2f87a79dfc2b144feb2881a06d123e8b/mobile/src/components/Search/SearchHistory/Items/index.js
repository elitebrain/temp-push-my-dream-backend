import React from "react";

const Items = () => {
  return (
    <div className="items">
      <span className="content">트둥이</span>
      <span className="delete">X</span>
      <style jsx>{`
        .items {
          margin-bottom: 10px;
        }
        .content {
          width: calc(100% - 21px);
          display: inline-block;
          vertical-align: middle;
          font-size: 16px;
          color: #fff;
          margin-right: 10px;
        }
        .delete {
          display: inline-block;
          vertical-align: middle;
          font-size: 16px;
          color: #ff5a5a;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Items;
