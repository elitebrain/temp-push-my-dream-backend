import React from "react";
import PropTypes from "prop-types";

import exclamationCircle from "public/assets/icon/exclamation-circle.svg";

const NotExistVideoCaution = ({ content }) => {
  return (
    <div className="caution_container">
      <img className="caution_mark" src={exclamationCircle} />
      <p className="cation_content">{content}</p>
      <style jsx>{`
        .caution_container {
          width: 280px;
          height: 200px;
          background-color: #4d4d4d;
          border: 1px solid #a3a3a3;
          box-sizing: border-box;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .caution_mark {
          width: 75px;
          height: 75px;
          margin: 45px 0 30px 0;
        }
        .cation_content {
          width: 100%;
          text-align: center;
          font-size: 14px;
          line-height: 25px;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};

NotExistVideoCaution.propTypes = {
  content: PropTypes.string.isRequired,
};

export default NotExistVideoCaution;
