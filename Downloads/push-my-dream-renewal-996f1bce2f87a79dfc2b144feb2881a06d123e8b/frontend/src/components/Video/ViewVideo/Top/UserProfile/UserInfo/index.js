import React from "react";

const UserInfo = () => {
  return (
    <div className="User_info_container">
      <div className="User_photo_frame">
        <img alt="user_photo" />
      </div>
      <style jsx>{`
        .User_info_container {
          height: 805px;
        }
      `}</style>
    </div>
  );
};

export default UserInfo;
