import React, { useContext } from "react";
import moment from "moment";

import { NewViewVideoContext } from "containers/Video/NewViewVideoContainer";

import Avatar from "components/Common/Avatar";

import { FONT_WHITE_COLOR } from "shared/constants/colors";
import {
  IMAGE_SERVER,
  AVATAR_HEIGHT,
  AVATAR_WIDTH,
} from "shared/constants/variables";

const VideoAndUploaderInfo = ({ onClickAvatar }) => {
  const { currentVideoInfo } = useContext(NewViewVideoContext);

  if (!currentVideoInfo) {
    return null;
  }

  return (
    <div className="VideoAndUploaderInfo">
      <div className="Uploader">
        <div className="Avatar">
          <Avatar
            photo={`${IMAGE_SERVER}?file=${currentVideoInfo.USER.user_photo}&size=${AVATAR_WIDTH}x${AVATAR_HEIGHT}`}
            width="100%"
            height="100%"
            onClick={onClickAvatar}
          />
        </div>

        <div className="Info">
          <div className="Nickname">{currentVideoInfo.USER.nickname}</div>
          <div className="Date">
            {moment(currentVideoInfo.created_at).format("YYYY.MM.DD")}
          </div>
        </div>
      </div>
      <div className="VideoDescription">{currentVideoInfo.description}</div>
      <style jsx>{`
        .Uploader {
          height: 45px;
          display: flex;
          align-items: flex-end;
        }

        .Uploader .Avatar {
          flex-basis: 45px;
          height: 100%;
          margin-right: 10px;
          border-radius: 50%;
          box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
        }

        .Uploader .Info {
          margin-bottom: 2px;
          color: ${FONT_WHITE_COLOR};
        }

        .Uploader .Info .Nickname {
          font-weight: bold;
          font-size: 14px;
          line-height: 17px;
        }

        .Uploader .Info .Date {
          font-size: 10px;
          line-height: 12px;
        }

        .VideoAndUploaderInfo .VideoDescription {
          display: block;
          width: 100%;
          min-height: 50px;
          margin-top: 10px;
          font-size: 12px;
          line-height: 15px;

          color: ${FONT_WHITE_COLOR};
           {
            /* overflow: hidden;
          white-space: pre-line;
          overflow-wrap: break-word; */
          }
        }
      `}</style>
    </div>
  );
};

export default VideoAndUploaderInfo;
