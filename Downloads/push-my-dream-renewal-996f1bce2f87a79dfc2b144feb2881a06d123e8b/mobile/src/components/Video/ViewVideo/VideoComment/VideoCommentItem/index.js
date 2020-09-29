import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { AiFillDelete } from "react-icons/ai";
import moment from "moment";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import LazyImage from "components/Common/LazyImage";

import {
  COLOR_696C8C,
  WHITE_COLOR,
  BACKGROUND_BLACK_COLOR,
  COLOR_FF00FF,
} from "shared/constants/colors";

import wing_icon from "public/assets/image/icon_wing_white.png";

const VideoCommentItem = ({ comment, onDeleteComment }) => {
  const Router = useRouter();
  const { user_no } = useSelector((state) => state.user);
  const [isViewDeleteMenu, setIsViewDeleteMenu] = useState(false);

  /**
   * delete menu toggle
   */
  const onViewDeleteMenu = useCallback(() => {
    setIsViewDeleteMenu((prev) => !prev);
  }, []);

  /**
   * delete comment
   */

  const onDelete = useCallback(() => {
    setIsViewDeleteMenu(false);
    onDeleteComment(comment.comment_no);
  }, [comment, onDeleteComment]);

  const commentClass = useMemo(
    () => `VideoCommentItem_Comment${comment.is_support ? " Support" : ""}`,
    [comment.is_support]
  );

  // 프로필 보기
  const onViewProfile = useCallback(
    (userNo) => {
      Router.push("/user/[user_no]", `/user/${userNo}`);
    },
    [Router]
  );

  return (
    <div className="VideoCommentItem">
      <div
        className="VideoCommentItem_Avatar"
        onClick={onViewProfile.bind(null, comment.user_no)}
      >
        <LazyImage src={comment.user_photo} circle />
      </div>
      <div className="VideoCommentItem_Content">
        <div className="VideoCommentItem_Header">
          <span>{comment.nickname}</span>
          <span className="Dot">·</span>
          <span>{moment(comment.created_at).format("YYYY-MM-DD HH:mm")}</span>
        </div>
        <pre className={commentClass}>{comment.comment}</pre>
      </div>
      {comment.is_support ? (
        <div className="VideoCommentItem_Menu Support">
          <img className="SupportIcon" src={wing_icon} />
        </div>
      ) : (
        //   내가 작성하면서 공개 상태인 댓글에서만 나타남
        user_no === comment.user_no &&
        comment.flag === 0 && (
          <div className="VideoCommentItem_Menu Delete">
            <div className="DeleteIcon" onClick={onViewDeleteMenu}>
              <span className="Dot" />
            </div>

            {isViewDeleteMenu && (
              <div className="DeleteMenu" onClick={onDelete}>
                <AiFillDelete className="TrashIcon" />
                <span>Delete</span>
              </div>
            )}
          </div>
        )
      )}

      <style jsx>{`
        .VideoCommentItem {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          border-bottom: 0.5px solid rgba(57, 57, 74, 0.4);
        }

        .VideoCommentItem:last-of-type {
          border-bottom: none;
        }

        .VideoCommentItem .VideoCommentItem_Avatar {
          flex-basis: 30px;
          width: 30px;
          height: 30px;
          margin-right: 10px;
          border-radius: 50%;
          cursor: pointer;
        }

        .VideoCommentItem .VideoCommentItem_Content {
          flex: 1;
        }

        .VideoCommentItem_Content .VideoCommentItem_Header {
          font-size: 10px;
          line-height: 12px;
          color: ${COLOR_696C8C};
        }

        .VideoCommentItem_Content .VideoCommentItem_Header .Dot {
          margin: 0 2px;
        }

        .VideoCommentItem .VideoCommentItem_Content .VideoCommentItem_Comment {
          margin-top: 2px;
          font-size: 14px;
          line-height: 17px;
          color: ${WHITE_COLOR};
          white-space: pre-wrap;
          font-family: "Montserrat", "Spoqa Han Sans", sans-serif;
        }

        .VideoCommentItem
          .VideoCommentItem_Content
          .VideoCommentItem_Comment.Support {
          color: ${COLOR_FF00FF};
        }

        .VideoCommentItem .VideoCommentItem_Menu {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 5px;
        }

        .VideoCommentItem_Menu.Support {
          flex-basis: 40px;
        }

        .VideoCommentItem_Menu .SupportIcon {
          width: 100%;
          height: auto;
        }

        .VideoCommentItem_Menu.Delete {
          position: relative;
          flex-basis: 3px;

          display: flex;
          align-items: center;
        }

        .VideoCommentItem_Menu.Delete .DeleteIcon {
          width: 3px;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .VideoCommentItem_Menu.Delete .DeleteIcon .Dot {
          position: relative;
          display: block;
          width: 3px;
          height: 3px;
          background-color: ${COLOR_696C8C};
          border-radius: 50%;
        }

        .VideoCommentItem_Menu.Delete .DeleteIcon .Dot:before,
        .VideoCommentItem_Menu.Delete .DeleteIcon .Dot:after {
          position: absolute;
          left: 0;
          content: "";
          width: 3px;
          height: 3px;
          background-color: ${COLOR_696C8C};
          border-radius: 50%;
        }

        .VideoCommentItem_Menu.Delete .DeleteIcon .Dot:before {
          top: -7px;
        }

        .VideoCommentItem_Menu.Delete .DeleteIcon .Dot:after {
          bottom: -7px;
        }

        .VideoCommentItem_Menu.Delete .DeleteMenu {
          position: absolute;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          width: 84px;
          height: 32px;
          border-radius: 5px;
          background-color: ${BACKGROUND_BLACK_COLOR};

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .VideoCommentItem_Menu.Delete .DeleteMenu :global(.TrashIcon) {
          width: 18px;
          height: 18px;
          color: ${COLOR_696C8C};
        }

        .VideoCommentItem_Menu.Delete .DeleteMenu span {
          margin-left: 5px;
          font-size: 14px;
          color: ${COLOR_696C8C};
          height: 20px;

          display: flex;
          align-items: flex-end;
        }
      `}</style>
    </div>
  );
};

VideoCommentItem.propTypes = {
  comment: PropTypes.shape({
    comment_no: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    is_support: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
      .isRequired,
    created_at: PropTypes.string.isRequired,
  }),
  onDeleteComment: PropTypes.func.isRequired,
};

export default React.memo(VideoCommentItem);
