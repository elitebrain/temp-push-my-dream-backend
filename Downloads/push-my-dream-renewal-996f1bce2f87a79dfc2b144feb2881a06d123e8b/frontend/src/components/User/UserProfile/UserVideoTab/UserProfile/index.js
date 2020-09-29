import React from "react";

import UserInfo from "./UserInfo";
import PushCountRank from "./PushCountRank";
import Introduction from "./Introduction";
import UserVideoList from "./UserVideoList";

const UserProfile = () => {
  return (
    <div className="user_profile_container no_drag">
      <PushCountRank />
      <UserInfo />
      <Introduction />
      <UserVideoList />
      <div className="blur" />
      <style jsx>{`
        .user_profile_container {
          width: 350px;
          height: 100%;
          display: inline-block;
          vertical-align: top;
          padding: 15px 20px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }
        .blur {
          width: 370px;
          height: 65px;
          position: absolute;
          bottom: 0;
          left: 20px;
          z-index: 1;
          background: linear-gradient(
            180deg,
            #000000 0%,
            rgba(0, 0, 0, 0) 100%
          );
          transform: rotate(-180deg);
        }
        @media (max-width: 1366px) {
          .user_profile_container {
            width: 281px;
            padding: 10px 20px;
            box-sizing: border-box;
          }
          .blur {
            width: 240px;
            height: 52px;
          }
        }
        @media (min-width: 2560px) {
          .user_profile_container {
            width: 450px;
          }
          .blur {
            width: 430px;
            height: 85px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
