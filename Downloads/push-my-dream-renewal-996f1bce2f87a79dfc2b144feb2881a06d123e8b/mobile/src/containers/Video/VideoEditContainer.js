import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import VideoEdit from "components/Video/VideoEdit";
import { uploadApi } from "shared/api";

const VideoEditContainer = ({ video }) => {
  const Router = useRouter();

  const [isEditingVideo, setIsEditingVideo] = useState(false);

  /**
   * 비디오 정보 변경 중
   */
  const onEditVideo = useCallback(
    async ({ thumbnail, description }) => {
      setIsEditingVideo(true);

      const formData = new FormData();

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }
      formData.append("description", description);
      formData.append("videoNo", video.video_no);

      try {
        await uploadApi.put(`/${video.video_no}/edit`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

        Router.push("/mypage");
      } catch (error) {
        console.error(error);
      } finally {
        setIsEditingVideo(false);
      }

      console.log(thumbnail, description);
    },
    [Router, video]
  );
  return (
    <VideoEdit
      isEditingVideo={isEditingVideo}
      video={video}
      onEditVideo={onEditVideo}
    />
  );
};

VideoEdit.propTypes = {
  video: PropTypes.object,
};

export default VideoEditContainer;
