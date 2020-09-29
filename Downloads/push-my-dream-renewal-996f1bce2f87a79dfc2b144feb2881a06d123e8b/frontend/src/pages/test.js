import React from "react";

import Background from "components/Common/Background";
import SetProfile from "components/User/SignUp/SetProfile";

const Test = res => {
  console.log("Test res", res);
  const profileState = {
    isCheckedNickname: false,
    nickname: "",
    userPhoto: null,
    file: null
  };
  const setProfileState = () => {
    console.log("setProfileState");
  };
  const _handleProfileChange = () => {
    console.log("_handleProfileChange");
  };
  const userPhotoPreview = () => {
    console.log("userPhotoPreview");
  };
  return (
    <Background
      width="100%"
      height="auto"
      color="#1e1e25"
      className="m_center p_relative "
      style={{ zIndex: "1" }}
    >
      <SetProfile
        visible={true}
        profileState={profileState}
        setProfileState={setProfileState}
        handleProfileChange={_handleProfileChange}
        userPhotoPreview={userPhotoPreview}
      />
    </Background>
  );
};

export default Test;
