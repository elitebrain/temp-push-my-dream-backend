import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Loader from "components/Common/Loader";

import { OPEN_MODAL, CLOSE_MODAL } from "store/reducers/modal";
import { getError } from "shared/functions";
import { videoApi } from "shared/api";
import VideoModal from "components/Common/Modal/VideoModal";

const VideoModalContainer = ({ videoNo }) => {
  const dispatch = useDispatch();
  const [isLoadedVideo, setIsLoadedVideo] = useState(true);
  const [video, setVideo] = useState({});

  useEffect(() => {
    function popModal() {
      dispatch({
        type: CLOSE_MODAL
      });
    }

    window.addEventListener("popstate", popModal);

    return function cleanUp() {
      window.removeEventListener("popstate", popModal);
    };
  }, [dispatch]);

  useEffect(() => {
    async function fetchVideo(videoNo) {
      try {
        const result = await videoApi.get(`/${videoNo}/info`);

        setVideo(result.data.video);
        setIsLoadedVideo(false);
      } catch (error) {
        dispatch({
          type: OPEN_MODAL,
          data: { custom: false, container: null, content: getError(error) }
        });
      }
    }

    fetchVideo(videoNo);
  }, [dispatch, videoNo]);

  return isLoadedVideo ? <Loader /> : <VideoModal video={video} />;
};

VideoModalContainer.propTypes = {
  videoNo: PropTypes.number
};

export default VideoModalContainer;
