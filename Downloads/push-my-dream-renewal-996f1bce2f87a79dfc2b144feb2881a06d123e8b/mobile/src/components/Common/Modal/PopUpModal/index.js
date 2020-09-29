import React, { useCallback } from "react";

import Button from "components/Common/Button";

import { useSelector, useDispatch } from "react-redux";

import { CLOSE_MODAL } from "store/reducers/modal";

const PopUpModal = () => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch({ type: CLOSE_MODAL });
  }, [dispatch]);

  return (
    <div className="Modal_container">
      <h1>공지 사항</h1>
      <p>현재 사이트가 회원가입 및 로그인은 가능하나, </p>
      <p>
        홈페이지 트레픽으로 인하여 일부 동영상 업로드에 차질이 발생하고
        있습니다.
      </p>
      <p>조속히 문제를 해결하겠습니다.</p>
      <p>사용에 불편을 드려 대단히 죄송합니다.</p>

      <div className="ButtonContainer">
        <Button onClick={handleClick}>확인</Button>
      </div>

      <style jsx>{`
        .Modal_container {
          width: 550px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 60px 40px 40px 40px;
          border-radius: 10px;
        }

        .Modal_container h1 {
          width: 100%;
          text-align: center;
          padding-bottom: 40px;
          font-weight: 700;
        }

        .ButtonContainer {
          margin-top: 60px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default PopUpModal;
