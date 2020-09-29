import React from "react";
import PropTypes from "prop-types";

import UserRankContainer from "containers/User/UserProfile/UserRankContainer";
import UserPushContainer from "containers/User/UserProfile/UserPushContainer";

import Content from "components/Layout/Content";

import Introduction from "./Introduction";
import UserInfo from "./UserInfo";

const UserInfoWrapper = (props) => {
  const { currentUser } = props;

  return (
    // <div className="container">
    <Content style={{ padding: 0 }}>
      <UserInfo currentUser={currentUser} />

      {/* <UserRankContainer
        userNo={currentUser.user_no}
        category4No={season && season.category_level4_no}
      /> */}
      {/* <SeasonCounter /> */}
      {/* <Introduction>{currentUser.introduce}</Introduction> */}
      {/* //todo */}
      {/* <UserPushContainer
        isPush={isPush}
        isParticipateSeason={isParticipateSeason}
        category4No={season && season.category_level4_no}
        userNo={currentUser.user_no}
      /> */}
    </Content>
    // </div>
  );
};

UserInfoWrapper.propTypes = {
  currentUser: PropTypes.object,
};

export default UserInfoWrapper;
