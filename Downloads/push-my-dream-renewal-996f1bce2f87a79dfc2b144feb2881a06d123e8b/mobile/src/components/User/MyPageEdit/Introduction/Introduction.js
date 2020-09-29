import React from "react";
import { COLOR_696C8C } from "shared/constants/colors";

const Introduction = (props) => {
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
          width: 100%;
          margin: 0 auto;
          margin-bottom: 20px;
        }
        .introduction span {
          display: block;
          width: 74px;
          margin-bottom: 5px;
          font-size: 13px;
          font-weight: 400;
          color: ${COLOR_696C8C};
        }
        .introduction textarea {
          width: 100%;
          height: 130px;
          overflow: auto;
          border-radius: 5px;
          padding: 12px 20px;
          display: inline-block;
          box-sizing: border-box;
          font-size: 13px;
          font-weight: 500;
          line-height: 16px;
          resize: none;
        }
      `}</style>
    </div>
  );
};

export default Introduction;
