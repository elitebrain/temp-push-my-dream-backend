import React from "react";
import Avatar from "components/Common/Avatar";

const BestUserList = () => {
  return (
    <div className="best_user_list_container">
      <div className="title">Best 10</div>
      <div className="user_list">
        <Avatar
          photo={"http://via.placeholder.com/500x300"}
          rank={1}
          style={{ marginRight: "10px", display: "inline-block" }}
        />
        <Avatar
          photo={"http://via.placeholder.com/500x300"}
          rank={2}
          style={{ marginRight: "10px", display: "inline-block" }}
        />
        <Avatar
          photo={"http://via.placeholder.com/500x300"}
          rank={3}
          style={{ marginRight: "10px", display: "inline-block" }}
        />
        <Avatar
          photo={"http://via.placeholder.com/500x300"}
          style={{ marginRight: "10px", display: "inline-block" }}
        />
        <Avatar
          photo={"http://via.placeholder.com/500x300"}
          style={{ marginRight: "10px", display: "inline-block" }}
        />
        <Avatar
          photo={"http://via.placeholder.com/500x300"}
          style={{ marginRight: "10px", display: "inline-block" }}
        />
        <Avatar
          photo={"http://via.placeholder.com/500x300"}
          style={{ marginRight: "10px", display: "inline-block" }}
        />
        <Avatar
          photo={"http://via.placeholder.com/500x300"}
          style={{ display: "inline-block" }}
        />
      </div>
      <style jsx>{`
        .best_user_list_container {
          text-align: right;
          margin-top: 25px;
          margin-bottom: 30px;
        }
        .title {
          font-size: 26px;
          font-weight: 600;
          color: #878792;
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
        }
        .user_list {
          display: inline-block;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
};

export default BestUserList;
