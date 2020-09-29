import React from "react";

const Image = ({ className, width, height, src, isView }) => {
  if (!isView) {
    return null;
  }

  return (
    <>
      <div className={`image ${className ? className : ""}`} />
      <style jsx>{`
        .image {
          width: ${width};
          height: ${height};
          background-image: url('${src}');
          background-size:cover;
          background-position: 50% 50%;
          background-repeat:no-repeat;
          animation: loadImage 0.5s;
        }

        @keyframes loadImage {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        .image.benefit_img{
          border-radius: 30px;
          display:inline-block;
          vertical-align: middle;
        }

      `}</style>
    </>
  );
};

export default Image;
