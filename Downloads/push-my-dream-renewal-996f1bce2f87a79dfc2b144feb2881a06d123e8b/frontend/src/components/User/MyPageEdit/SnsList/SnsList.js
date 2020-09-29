import React from "react";
import PropTypes from "prop-types";

const SnsList = props => {
  const { snsTitle, snsTitleEng, name, url, setState } = props;
  return (
    <div className="sns_list">
      <span>{snsTitle}</span>
      <input
        type="text"
        placeholder={`${snsTitleEng} url`}
        name={name}
        value={url}
        onChange={setState}
      />
      <style jsx>{`
        .sns_list {
          width: 600px;
          margin: 0 auto;
          margin-bottom: 20px;
        }
        .sns_list span {
          display: inline-block;
          width: 74px;
          margin-right: 30px;
          font-size: 16px;
          font-weight: 400;
          color: #fff;
        }
        .sns_list input {
          width: 435px;
          height: 60px;
          border: none;
          border-radius: 15px;
          padding: 0 30px;
          display: inline-block;
          font-size: 16px;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
};

SnsList.propTypes = {
  snsTitle: PropTypes.string,
  snsTitleEng: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  setState: PropTypes.func
};

export default SnsList;
