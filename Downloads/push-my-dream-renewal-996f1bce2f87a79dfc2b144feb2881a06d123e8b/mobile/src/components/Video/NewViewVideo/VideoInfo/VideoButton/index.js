import React, { useContext, useMemo } from "react";
import { useRouter } from "next/router";
import qs from "query-string";

import { NewViewVideoContext } from "containers/Video/NewViewVideoContainer";

import NewButton from "components/Common/NewButton";
import SharedSNSButton from "components/Common/SharedSNSButton";

import heart from "public/assets/image/heart(white).png";
import heartPurple from "public/assets/image/heart(purple).png";
import chat from "public/assets/image/chat(white).png";
import share from "public/assets/image/share(white).png";
import support from "public/assets/image/support(white).png";
import push from "public/assets/image/push(white).png";

import { ORIGIN_SHARE_MOBILE_URL } from "shared/constants/variables";
import { useSelector } from "react-redux";

const VideoButton = () => {
  const {
    type,
    videoNo,
    isLikedVideo,
    currentVideoInfo,
    onToggleViewComment,
    onViewSupportModal,
    onPush,
    onLikeVideo,
  } = useContext(NewViewVideoContext);
  const user_no = useSelector((state) => state.user.user_no);
  const Router = useRouter();

  /**
   * share url 캐싱
   */
  const shareURL = useMemo(() => {
    const query = Object.assign({}, Router.query, {
      currentVideoNo: videoNo,
    });

    delete query.type;
    delete query.user_no;

    if (type === "my") {
      return `${ORIGIN_SHARE_MOBILE_URL}/user/${user_no}/videos?${qs.stringify(
        query
      )}`;
    } else {
      return `${ORIGIN_SHARE_MOBILE_URL}${
        Router.asPath.split("?")[0]
      }?${qs.stringify(query)}`;
    }
  }, [Router, videoNo, user_no, type]);

  if (!currentVideoInfo) {
    return null;
  }

  return (
    <div className="VideoButtonContainer">
      <div className="Button">
        <SharedSNSButton
          icon
          url={shareURL}
          kakaoTitle={currentVideoInfo.title}
          kakaoDescription={currentVideoInfo.description}
          kakaoImage={currentVideoInfo.thumbnail}
        >
          <NewButton bgColor="transparent" height="100%">
            <img className="ButtonImage" src={share} />
          </NewButton>
        </SharedSNSButton>
      </div>
      <div className="Button">
        <NewButton
          bgColor="transparent"
          height="100%"
          onClick={onToggleViewComment}
        >
          <img className="ButtonImage" src={chat} />
        </NewButton>
      </div>
      {/* <div className="Button">
        <NewButton bgColor="transparent" height="100%" onClick={onLikeVideo}>
          <img
            className="ButtonImage"
            src={isLikedVideo ? heartPurple : heart}
          />
        </NewButton>
      </div>
      <div className="Button">
        <NewButton
          bgColor="transparent"
          height="100%"
          onClick={onViewSupportModal}
        >
          <img className="ButtonImage" src={support} />
        </NewButton>
      </div> */}
      <div className="Button Push">
        <NewButton bgColor="transparent" height="100%" onClick={onPush}>
          <img className="ButtonImage" src={push} />
        </NewButton>
      </div>
      <style jsx>{`
        .VideoButtonContainer {
          width: 100%;
          height: 185px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        .VideoButtonContainer .Button {
          width: 55px;
          height: 55px;
          opacity: 0.55;
        }

        .VideoButtonContainer .Button.Push {
          width: 40px;
          height: auto;
        }

        .VideoButtonContainer .Button .ButtonImage {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default React.memo(VideoButton);
