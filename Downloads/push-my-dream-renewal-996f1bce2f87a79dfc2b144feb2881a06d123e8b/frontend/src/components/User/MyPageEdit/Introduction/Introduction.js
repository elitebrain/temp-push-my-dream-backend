import React from "react";
import PropTypes from "prop-types";

const Introduction = props => {
  const { introduce, setState } = props;
  return (
    <div className="introduction">
      <span>자기소개</span>
      <textarea
        name="introduce"
        value={introduce}
        onChange={setState}
      ></textarea>
      <style jsx>{`
        .introduction {
          width: 600px;
          height: 200px;
          border-bottom: 1px solid #444455;
          margin: 0 auto;
          margin-bottom: 30px;
        }
        .introduction span {
          display: inline-block;
          width: 74px;
          margin-right: 30px;
          font-size: 16px;
          font-weight: 400;
          color: #fff;
          vertical-align: top;
          margin-top: 20px;
        }
        .introduction textarea {
          width: 495px;
          height: 170px;
          border-radius: 15px;
          padding-left: 30px;
          padding-top: 20px;
          display: inline-block;
          box-sizing: border-box;
          font-size: 16px;
          font-weight: 400;
          line-height: 28px;
        }
      `}</style>
    </div>
  );
};

Introduction.propTypes = {
  introduce: PropTypes.string,
  setState: PropTypes.func
};

export default Introduction;
