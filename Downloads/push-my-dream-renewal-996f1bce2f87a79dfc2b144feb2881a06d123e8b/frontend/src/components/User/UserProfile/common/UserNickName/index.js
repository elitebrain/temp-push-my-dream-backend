import React from "react";
import PropTypes from "prop-types";

const UserNickName = (props) => {
  const { nickname, style } = props;
  return (
    <>
      <div className="nick_name mb_5px" style={style}>
        {nickname}
      </div>
      <div className="line" />
      <style jsx>{`
        .nick_name {
          width: 135px;
          margin: 0 auto;
          font-size: 16px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .mb_5px {
          margin-bottom: 5px;
        }
        .line {
          width: 150px;
          height: 1px;
          background: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100%);
          margin: 5px auto;
        }
        @media (min-width: 2560px) {
          .nick_name {
            width: 200px;
            margin: 0 auto;
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
};

UserNickName.propTypes = {
  nickname: PropTypes.string,
  style: PropTypes.object,
};

export default UserNickName;
