import React from "react";
import Button from "components/Common/Button";
import PushCountRank from "./PushCountRank";
import UserInfo from "./UserInfo";
import Introduction from "./Introduction";
import UserVideoList from "./UserVideoList";
import list_blur from "public/assets/image/videolist_blur.png";

const UserProfile = () => {
  return (
    <div className="user_profile_container">
      <PushCountRank />
      <UserInfo />
      <Introduction />
      <UserVideoList />
      <div className="blur" />
      <style jsx>{`
        .user_profile_container {
          width: 420px;
          height: 100%;
          display: inline-block;
          vertical-align: top;
          padding: 25px 25px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }
        .blur {
          width: 370px;
          height: 150px;
          position: absolute;
          bottom: -46px;
          left: 20px;
          z-index: 1;
          background-image: url(${list_blur});
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
