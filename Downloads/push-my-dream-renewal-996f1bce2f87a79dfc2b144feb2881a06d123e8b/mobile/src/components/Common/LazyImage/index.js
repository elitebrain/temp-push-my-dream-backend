import React, { useRef, useMemo } from "react";
import PropTypes from "prop-types";

import useIO from "hooks/userIO";

/**
 * 참고
 * https://codesandbox.io/s/2vm9om4p7n?file=/src/LazyImage.js
 * https://medium.com/better-programming/image-lazy-loading-in-react-intersection-observer-a9ae912ddafe
 * https://y0c.github.io/2019/06/30/react-infinite-scroll/
 */
const LazyImage = ({
  src,
  alt,
  width = "100%",
  height = "100%",
  circle,
  style,
}) => {
  const imageRef = useRef(null);
  const [isLazied] = useIO(imageRef);

  const containerClass = useMemo(
    () => `lazyImageContainer${circle ? " circle" : ""}`,

    [circle]
  );

  const lazyImageClass = useMemo(
    () => `lazy_image${!isLazied ? " loaded" : ""}`,
    [isLazied]
  );

  const placeholderClass = useMemo(
    () => `placeholder${!isLazied ? " loaded" : ""}`,
    [isLazied, circle]
  );

  return (
    <div className={containerClass}>
      <img
        ref={imageRef}
        className={lazyImageClass}
        src={!isLazied ? src : undefined}
        style={style}
        // alt={alt || ""}
      />
      <div className={placeholderClass} />
      <style jsx>{`
        .lazyImageContainer {
          ${width ? `width : ${width};` : ""}
          ${height ? `height : ${height};` : ""}
          position:relative;
        }
        .lazyImageContainer.circle {
          border-radius: 50%;
        }

        .lazyImageContainer .lazy_image {
          width: 100%;
          height: 100%;
          opacity: 0;
          object-fit: cover;
          object-position: center;
          transition: opacity 0.5s;
        }

        .lazyImageContainer.circle .lazy_image {
          border-radius: 50%;
        }

        .lazyImageContainer .lazy_image.loaded {
          opacity: 1;
        }

        .lazyImageContainer .placeholder {
          ${width ? `width : ${width};` : ""}
          ${height ? `height : ${height};` : ""}
          position: absolute;
          top: 0;
          left: 0;
          background-color: #444;
          opacity: 1;
          transition: opacity 0.5s;
        }

        .lazyImageContainer.circle .placeholder {
          border-radius: 50%;
        }

        .lazyImageContainer .placeholder.loaded {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  circle: PropTypes.bool,
  style: PropTypes.object,
};

export default LazyImage;
