import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { useSelector } from "react-redux";

import { ViewVideoContext } from "containers/Video/ViewVideoContainer";

import Layout from "components/Layout/Layout";
import Body from "components/Layout/Body";
import Content from "components/Layout/Content";

import UserProfile from "./UserProfile";
import UserVideo from "./UserVideo";

import arrow_left from "public/assets/icon/arrow_left(white).svg";

const UserComponent = (props) => {
  const { followingList, user, currentUser, handleFollow } = props;
  const { uploaderScrollTop } = useSelector((state) => state.offset);
  const { setIsViewUserProfile } = useContext(ViewVideoContext);
  useEffect(() => {
    let timeout = null;
    if (currentUser.user_no) {
      timeout = setTimeout(
        () =>
          (document.querySelector(
            ".wrapper_layout > .user_profile"
          ).scrollTop = uploaderScrollTop),
        200
      );
    }
    return () => clearTimeout(timeout);
  }, [currentUser]);
  const _handleBack = () => {
    setIsViewUserProfile();
    Router.back();
  };
  return (
    // <Layout whiteText transparent>
    <Body>
      <div
        className="container"
        style={{
          paddingTop: "50px",
          height: "50px",
          backgroundColor: "#141418",
        }}
      >
        <div className="user_title">
          <span className="back_ico" onClick={() => _handleBack()}>
            <img src={arrow_left} alt="arrow_left" width="100%" height="100%" />
          </span>
          <span className="title">업로더 정보</span>
        </div>
      </div>
      <div
        className="container"
        style={{
          paddingTop: "25px",
          minHeight: "calc(100vh - 100px)",
          boxSizing: "border-box",
        }}
      >
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
                count={currentUser ? currentUser.countVideo : 0}
                videoList={currentUser ? currentUser.VIDEO : []}
                currentUser={currentUser}
              />
            </div>
          )}
        </Content>
      </div>
      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
        }
        .wrapper {
          padding-bottom: 140px;
        }
        .user_title {
          height: 50px;
          position: relative;
          margin-bottom: 17px;
        }
        .user_title span {
          display: inline-block;
        }
        .user_title .back_ico {
          width: 20px;
          height: 15px;
          text-align: center;
          position: absolute;
          left: 20px;
          transform: translateY(-50%);
          top: 50%;
        }
        .user_title .title {
          font-size: 20px;
          color: #fff;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          top: 50%;
        }
      `}</style>
    </Body>
    // </Layout>
  );
};

UserComponent.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object,
  handleFollow: PropTypes.func,
};

export default UserComponent;
