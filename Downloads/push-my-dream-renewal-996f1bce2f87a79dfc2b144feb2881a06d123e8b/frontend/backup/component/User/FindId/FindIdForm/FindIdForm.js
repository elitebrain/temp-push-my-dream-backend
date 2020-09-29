import React from "react";
import PropTypes from "prop-types";

import Button from "components/Common/Button";
import { MAIN_COLOR } from "shared/constants/colors";

const FindIdForm = ({ onCheckPlus }) => {
  return (
    <div className="search_id_container">
      <div className="search_id_container_title">아이디찾기</div>
      <div className="buttonContainer">
        <Button
          className="radius"
          width="300px"
          height="60px"
          onClick={onCheckPlus}
        >
          휴대폰 인증
        </Button>
      </div>
      <style jsx>{`
          .search_id_container {
            width: 575px;
            height: 60px;
            margin: 0 auto;
          }
          .search_id_container .search_id_container_title {
            font-size: 50px;
            font-weight: 400;
            color: #fff;
            text-align: center;
            margin-bottom: 120px;
          }
          .buttonContainer {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
    </div>
  );
};

FindIdForm.propTypes = {
  onCheckPlus: PropTypes.func.isRequired
};

export default FindIdForm;
