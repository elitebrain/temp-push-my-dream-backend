import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import VideoModalContainer from "containers/Video/VideoModalContainer";

import video_play_ico from "public/assets/icon/vote_view_video_ico.svg";
import vote_list01 from "public/assets/image/vote_list01.png";

import { OPEN_MODAL } from "store/reducers/modal";

const VoteList = ({ voteNo, item, checked, onCheckItem }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // 링크 클릭 시 새창으로 이동
  const onClickLink = useCallback(() => {
    dispatch({
      type: OPEN_MODAL,
      data: {
        custom: true,
        container: (
          <VideoModalContainer
            videoNo={Number(
              item.vote_item_url.split("https://khanteum.com/video/")[1]
            )}
          />
        ),
        onClose() {
          router.back();
        },
      },
    });
    router.push("/vote/[vote_no]/item", {
      pathname: `/vote/${voteNo}/item`,
      query: {
        isView: true,
      },
    });
  }, [item, dispatch, router]);

  return (
    <div className="band">
      <div className="band_img" />
      <div className="band_info">
        <div className="left">
          <label className="radio_btn no_drag">
            {item.vote_item_title}
            <input
              type="checkbox"
              name="checkbox"
              checked={checked}
              onChange={onCheckItem.bind(this, {
                itemNo: item.vote_item_no,
                checked,
              })}
            />
            {/* <input type="radio" checked="checked" name="radio" /> */}
            <span className="checkmark"></span>
          </label>
          <span className="music_info">{item.vote_item_description}</span>
        </div>
        <div className="right">
          <img
            src={video_play_ico}
            alt="video_play_ico"
            width="100%"
            height="100%"
            onClick={onClickLink}
          />
        </div>
      </div>
      <style jsx>{`
        .band {
          display: inline-block;
          /* margin-right: 50px; */
          margin-bottom: 38px;
          width: calc(50% - 7px);
        }
        .band:nth-child(2n-1) {
          margin-right: 14px;
        }
        .band .band_img {
          width: 100%;
          height: 180px;
          border-radius: 15px;
          background-image: url(${item.vote_item_thumbnail});
          background-size: cover;
          margin-bottom: 13px;
        }
        .band .band_info .left {
          display: inline-block;
          vertical-align: middle;
        }
        .band .band_info .left .music_info {
          font-size: 13px;
          font-weight: 400;
          margin-left: 35px;
          margin-bottom: 7px;
          color: #fff;
        }
        .band .band_info .right {
          /* display: inline-block;
            vertical-align: middle; */
          width: 31px;
          height: 22px;
          margin-left: 31px;
          margin-top: 7px;
        }

        .radio_btn {
          display: block;
          position: relative;
          line-height: 15px;
          padding-left: 35px;
          cursor: pointer;
          font-size: 13px;
          font-weight: bold;
          color: #fff;
        }

        .radio_btn input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 15px;
          width: 15px;
          border: 1px solid #fff;
          border-radius: 50%;
        }

        .radio_btn:hover input ~ .checkmark {
          background-color: #ccc;
        }

        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }

        .radio_btn input:checked ~ .checkmark:after {
          display: block;
        }

        .radio_btn .checkmark:after {
          top: 1px;
          left: 1px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #f38400;
        }
        @media (max-width: 320px) {
          .radio_btn {
            padding-left: 25px;
          }
          .band .band_info .left .music_info {
            margin-left: 25px;
          }
          .band .band_info .right {
            margin-left: 25px;
          }
        }
      `}</style>
    </div>
  );
};

VoteList.propTypes = {
  voteNo: PropTypes.number,
};

export default VoteList;
