import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { NICE_URL } from "shared/constants/variables";

import select_ico from "public/assets/icon/select_arrow(gray).svg";
import {
  COLOR_696C8C,
  GRADIENT_00F1B4_D53CF5,
  BACKGROUND_BLACK_COLOR,
} from "shared/constants/colors";
import NewButton from "components/Common/NewButton";

const PhoneNumber = (props) => {
  const { phone, userNo } = props;

  // 번호변경 클릭 시
  const onChangePhone = useCallback(
    (e) => {
      e.preventDefault();
      e.target.method = "post";
      e.target.action = `${NICE_URL}/${userNo}/phone`;
      e.target.submit();
    },
    [userNo]
  );

  return (
    <form className="phone_number" onSubmit={(e) => onChangePhone(e)}>
      <div className="phone">
        <span>전화번호</span>
        <input type="text" value={phone || ""} readOnly />
        <div className="button_box">
          <NewButton
            gradient
            height="40px"
            width="84px"
            fontSize="13px"
            bgColor={BACKGROUND_BLACK_COLOR}
          >
            번호변경
          </NewButton>
        </div>
      </div>
      {/* <div className="new">
        <span>신규번호</span>
        <select>
          <option>010</option>
        </select>
        <input type="text" />
        <button className="re">재전송</button>
      </div>
      <div className="authentication">
        <span>인증번호</span>
        <input type="text" />
        <button>인증완료</button>
      </div> */}
      <style jsx>{`
        .phone_number {
          width: 100%;
          margin: 0 auto;
        }

        .phone_number span {
          display: block;
          width: 74px;
          margin-bottom: 5px;
          margin-right: 30px;
          font-size: 13px;
          font-weight: 400;
          color: ${COLOR_696C8C};
        }
        .phone_number button {
          width: 90px;
          height: 57px;
          text-align: center;
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          background-image: ${GRADIENT_00F1B4_D53CF5(180)};
          border-radius: 15px;
          border: none;
          cursor: pointer;
          vertical-align: middle;
        }
        .phone_number .re {
          width: 90px;
          height: 60px;
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          background-color: #141418;
          border-radius: 15px;
          border: none;
        }
        .phone_number .phone,
        .phone_number .new {
          margin-bottom: 20px;
        }
        .phone_number .phone input {
          width: calc(100% - 94px);
          height: 40px;
          display: inline-block;
          padding-left: 20px;
          font-size: 13px;
          font-weight: 400;
          background-color: #fff;
          border-radius: 5px;
          border: none;
          margin-right: 10px;
          box-sizing: border-box;
          vertical-align: middle;
        }
        .button_box {
          display: inline-block;
          vertical-align: middle;
        }
        .phone_number .new select {
          width: 90px;
          height: 57px;
          border: none;
          border-radius: 15px;
          padding-left: 22px;
          margin-right: 10px;
          font-size: 15px;
          font-weight: 400;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: url(${select_ico}) 88% / 13% no-repeat #fff;
        }
        .phone_number .new input {
          width: calc(100% - 200px);
          height: 57px;
          display: inline-block;
          padding-left: 22px;
          font-size: 15px;
          font-weight: 400;
          border-radius: 15px;
          border: none;
          box-sizing: border-box;
          margin-right: 10px;
        }
        .phone_number .authentication input {
          width: calc(100% - 100px);
          height: 57px;
          display: inline-block;
          padding-left: 22px;
          font-size: 15px;
          font-weight: 400;
          border-radius: 15px;
          border: none;
          margin-right: 10px;
          box-sizing: border-box;
        }
      `}</style>
    </form>
  );
};

PhoneNumber.propTypes = {
  phone: PropTypes.string,
  userNo: PropTypes.number,
};

export default PhoneNumber;
