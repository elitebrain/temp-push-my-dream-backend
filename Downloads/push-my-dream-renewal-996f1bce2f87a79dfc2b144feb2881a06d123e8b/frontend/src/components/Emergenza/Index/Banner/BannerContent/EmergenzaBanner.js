import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Router from "next/router";

import { OPEN_MODAL } from "store/reducers/modal";

import Content from "components/Layout/Content";

// import emergenza_btn01 from "public/assets/image/button_main_join_vote.png";
import emergenza_btn01 from "public/assets/image/button_emergenza_banner_vote_result.png";
import emergenza_btn02 from "public/assets/image/button_main_competition_detail.png";

import emegenza_text from "public/assets/image/emergenza_banner_text.png";
import { EMERGENZA_VOTE_NO } from "shared/constants/variables";

const EmergenzaBanner = (props) => {
  const { date, category, desc, badge } = props;
  const dispatch = useDispatch();

  const _goEmergenzaVote = useCallback(() => {
    Router.push("/vote/[vote_no]", `/vote/${EMERGENZA_VOTE_NO}`);
  }, [Router]);
  const _goEmergenzaEventNotice = useCallback(() => {
    dispatch({
      type: OPEN_MODAL,
      data: {
        content: (
          <>
            <p>에머겐자 대회 상세정보 확인을 위해</p>
            <p>event.khanteum.com 으로 이동합니다.</p>
          </>
        ),
        onConfirm() {
          window.location.href =
            "https://event.khanteum.com/pre/emergenza/vote";
        },
        isViewClose: true,
      },
    });
  }, [dispatch]);

  return (
    <Content>
      <div className="container">
        <div className="wrapper">
          <div className="emegenza_text">
            <img
              src={emegenza_text}
              alt="emegenza_text"
              width="100%"
              height="100%"
            />
          </div>
          <button onClick={() => _goEmergenzaVote()} />
          <button onClick={() => _goEmergenzaEventNotice()} />
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 560px;
          position: relative;
        }
        .wrapper {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
        }
        .emegenza_text {
          margin-bottom: 25px;
        }
        button:nth-child(2) {
          width: 82px;
          height: 82px;
          margin-right: 20px;
          border: none;
          background-color: transparent;
          background-image: url(${emergenza_btn01});
          cursor: pointer;
        }
        button:last-child {
          width: 82px;
          height: 82px;
          border: none;
          background-color: transparent;
          background-image: url(${emergenza_btn02});
          cursor: pointer;
        }
      `}</style>
    </Content>
  );
};

EmergenzaBanner.propTypes = {
  date: PropTypes.string,
  category: PropTypes.string,
  desc: PropTypes.string,
};

export default EmergenzaBanner;
