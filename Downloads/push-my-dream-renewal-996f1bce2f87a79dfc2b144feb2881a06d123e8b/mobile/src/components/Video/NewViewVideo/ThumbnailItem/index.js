import React from "react";
import PropTypes from "prop-types";
import {
  BACKGROUND_BLACK_COLOR,
  FONT_WHITE_COLOR,
} from "shared/constants/colors";

const ThumbnailItem = ({ thumbnail, error }) => {
  return (
    <div className="ThumbnailItem">
      <img className="Thumbnail" src={thumbnail}></img>
      {error && <div className="Error">비공개 또는 삭제된 비디오입니다.</div>}

      <style jsx>{`
        .ThumbnailItem {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .ThumbnailItem .Thumbnail {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          background: ${BACKGROUND_BLACK_COLOR};
        }

        .Error {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);

          display: flex;
          justify-content: center;
          align-items: center;

          color: ${FONT_WHITE_COLOR};
        }
      `}</style>
    </div>
  );
};

ThumbnailItem.propTypes = {
  thumbnail: PropTypes.string,
};

export default React.memo(ThumbnailItem);
