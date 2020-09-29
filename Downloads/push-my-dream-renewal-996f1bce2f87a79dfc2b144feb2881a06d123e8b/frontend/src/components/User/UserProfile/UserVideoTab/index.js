import React, { useContext } from "react";

import CommentContainer from "containers/CommentContainer";

import VideoView from "./VideoView";
import UserProfile from "./UserProfile";
import PushCount from "components/Common/PushCount";
import PushButton from "components/Common/PushButton";

import { UserContext } from "containers/User/UserContainer";

const UserVideoTab = ({ currentVideo }) => {
  const { myPush } = useContext(UserContext);
  return (
    <>
      <UserProfile />
      <VideoView currentVideo={currentVideo} />
      <div className="aside">
        <PushCount myPush={myPush} />
        <CommentContainer />
        <PushButton />
      </div>
      <style jsx>{`
        .aside {
          width: 350px;
          height: 100%;
          padding: 10px 20px;
          display: inline-block;
          box-sizing: border-box;
          position: relative;
        }
        @media (max-width: 1366px) {
          .aside {
            width: 276px;
          }
        }
        @media (min-width: 2560px) {
          .aside {
            width: 450px;
          }
        }
      `}</style>
    </>
  );
};

export default UserVideoTab;
