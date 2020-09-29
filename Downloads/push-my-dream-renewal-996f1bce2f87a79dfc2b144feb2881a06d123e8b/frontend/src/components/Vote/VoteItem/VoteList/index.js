import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import video_play_ico from "public/assets/icon/vote_view_video_ico.svg";
import vote_list01 from "public/assets/image/vote_list01.png";
import { OPEN_MODAL } from "store/reducers/modal";
import VideoModalContainer from "containers/Video/VideoModalContainer";

const VoteList = ({ voteNo, item, checked, onCheckItem }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // 링크 클릭 시 새창으로 이동
  const onClickLink = useCallback(() => {
    // window.open(item.vote_item_url);

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
          margin-bottom: 50px;
        }
        .band:nth-child(3n-1) {
          margin-left: 50px;
          margin-right: 50px;
        }
        .band .band_img {
          width: 300px;
          height: 300px;
          border-radius: 15px;
          background-image: url(${item.vote_item_thumbnail});
          background-size: cover;
          margin-bottom: 20px;
        }

        .band .band_info {
          width: 300px;
          display: flex;
          justify-content: space-between;
        }
        .band .band_info .left {
          display: inline-block;
          vertical-align: middle;
          /* margin-right: 85px; */
          width: 215px;
        }
        .band .band_info .left .music_info {
          font-size: 16px;
          font-weight: 400;
          margin-left: 35px;
        }
        .band .band_info .right {
          display: inline-block;
          vertical-align: middle;
          width: 40px;
          height: 30px;
        }

        .band .band_info .right img {
          cursor: pointer;
        }

        .radio_btn {
          display: block;
          position: relative;
          line-height: 24px;
          padding-left: 35px;
          margin-bottom: 10px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
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
          height: 20px;
          width: 20px;
          border: 2px solid #dcdcdc;
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
          top: 2px;
          left: 2px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #f38400;
        }
      `}</style>
    </div>
  );
};

VoteList.propTypes = {
  voteNo: PropTypes.number,
  vote_item_title: PropTypes.string,
  vote_item_description: PropTypes.string,
  vote_item_thumbnail: PropTypes.string,
};

export default VoteList;
