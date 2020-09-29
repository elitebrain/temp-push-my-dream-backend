import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

// import img_item from "public/assets/image/gate_emergenza_img.png";

const GateImageItem = ({ item, src, category3No }) => {
  return (
    <Link
      key={item.user_no}
      href={{
        pathname: "/user/[user_no]",
        query: {
          category3No,
        },
      }}
      as={{
        pathname: `/user/${item.user_no}`,
        query: {
          category3No,
        },
      }}
    >
      <a className="img_item">
        <img src={src} alt="img_item" width="100%" height="100" />
        <style jsx>{`
          .img_item {
            width: 150px;
            height: 100px;
            border-radius: 10px;
            display: inline-block;
            margin-right: 10px;
            cursor: pointer;
          }

          .img_item img {
            border-radius: 10px;
          }

          .img_item:first-of-type {
            margin-left: 20px;
          }

          .img_item:last-of-type {
            margin-right: 20px;
          }
        `}</style>
      </a>
    </Link>
  );
};

GateImageItem.propTypes = {
  item: PropTypes.shape({ user_no: PropTypes.number.isRequired }),
  src: PropTypes.string.isRequired,
  category3No: PropTypes.number,
};

export default GateImageItem;
