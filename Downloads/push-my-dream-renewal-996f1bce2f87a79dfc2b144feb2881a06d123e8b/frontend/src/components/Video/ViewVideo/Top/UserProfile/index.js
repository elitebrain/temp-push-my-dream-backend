import React from "react";
import Button from "components/Common/Button";
import PushCountRank from "./PushCountRank";

const UserProfile = () => {
  return (
    <div className="user_profile_container">
      <PushCountRank />
      <Button width="90px" height="37px">
        <img
          src="http://via.placeholder.com/500x300"
          width="10px"
          height="10px"
        />
        팔로우
      </Button>
      <style jsx>{`
        .user_profile_container {
          width: 420px;
          height: 100%;
          display: inline-block;
          padding: 28px 35px;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
