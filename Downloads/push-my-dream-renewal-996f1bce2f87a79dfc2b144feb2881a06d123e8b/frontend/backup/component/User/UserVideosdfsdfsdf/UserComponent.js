import React from "react";
import PropTypes from "prop-types";

import Layout from "components/Layout/Layout";
import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import InfiniteLogo from "components/Common/InfiniteLogo";

import UserProfile from "./UserProfile";
import UserVideo from "./UserVideo";

const UserComponent = (props) => {
  const { followingList, user, currentUser, handleFollow } = props;
  return (
    <Layout whiteText transparent>
      <Body>
        <div className="container">
          <Content>
            {currentUser.user_no && (
              <div className="wrapper">
                <UserProfile
                  user={user}
                  currentUser={currentUser}
                  handleFollow={handleFollow}
                  followingList={followingList}
                />
                <UserVideo
                  title="등록한 영상"
                  count={
                    currentUser && currentUser.VIDEO
                      ? currentUser.VIDEO.length
                      : 0
                  }
                  videoList={currentUser ? currentUser.VIDEO : []}
                />
              </div>
            )}
          </Content>
          <InfiniteLogo style={{ width: "740px", height: "367px" }} />
        </div>
      </Body>
      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
          min-width: 1366px;
          background-color: #1e1e25;
        }
        .wrapper {
          padding-bottom: 140px;
        }
      `}</style>
    </Layout>
  );
};

UserComponent.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object,
  handleFollow: PropTypes.func,
  followingList: PropTypes.array,
};

export default UserComponent;
