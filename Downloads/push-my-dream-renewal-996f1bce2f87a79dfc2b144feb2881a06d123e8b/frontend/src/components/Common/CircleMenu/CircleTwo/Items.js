import React from "react";
const Items = ({ src }) => {
  return (
    <div className="img">
      <img src={src} alt="movie_thumnail" width="100%" height="100%" />
      <style jsx>{`
        .img {
          width: 150px;
          height: 215px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default Items;
