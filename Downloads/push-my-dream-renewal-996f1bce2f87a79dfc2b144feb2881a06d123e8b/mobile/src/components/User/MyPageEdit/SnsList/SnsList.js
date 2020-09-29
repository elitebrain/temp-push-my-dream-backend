import React, { useCallback } from "react";
import { COLOR_696C8C, COLOR_979CCA } from "shared/constants/colors";

const SnsList = (props) => {
  const { snsTitle, snsTitleEng, name, url, setState } = props;
  console.log(url, snsTitleEng, url.split(snsTitleEng)[1]);

  const onChangeSns = useCallback(
    (e) => {
      if (
        e.target.value === snsTitleEng ||
        e.target.value.length < snsTitleEng.length
      ) {
        e.target.value = "";
      }

      setState(e);
    },
    [snsTitleEng, url]
  );

  return (
    <div className="sns_list">
      <span>{snsTitle}</span>
      <input
        type="text"
        placeholder={`${snsTitleEng}`}
        name={name}
        value={
          snsTitleEng +
          (url.split(snsTitleEng)[1] ? url.split(snsTitleEng)[1] : "")
        }
        onChange={onChangeSns}
      />
      <style jsx>{`
        .sns_list {
          width: 100%;
          margin: 0 auto;
          margin-bottom: 20px;
        }
        .sns_list span {
          display: block;
          margin-bottom: 5px;
          margin-right: 30px;
          font-size: 13px;
          font-weight: 400;
          color: ${COLOR_696C8C};
        }
        .sns_list input {
          width: 100%;
          height: 40px;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          display: inline-block;
          font-size: 13px;
          font-weight: 500;
          box-sizing: border-box;
        }
        .sns_list input::placeholder {
          color: ${COLOR_979CCA};
        }
      `}</style>
    </div>
  );
};

export default SnsList;
