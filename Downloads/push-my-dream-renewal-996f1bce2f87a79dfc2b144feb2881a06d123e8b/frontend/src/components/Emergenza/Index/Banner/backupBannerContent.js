import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Router from "next/router";

import { OPEN_MODAL } from "store/reducers/modal";

import Content from "components/Layout/Content";
import Button from "components/Common/Button";

const BannerContent = (props) => {
  const { date, category, desc } = props;
  const dispatch = useDispatch();

  const _goEmergenzaApply = useCallback(() => {
    Router.push("/emergenza/notice");
  }, [Router]);
  const _goEmergenzaVote = useCallback(() => {
    dispatch({
      type: OPEN_MODAL,
      data: {
        content: (
          <>
            <p>투표사전예약을 위해</p>
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
          <h1>{date}</h1>
          <h1 className="fw_bold mb_15px">{category}</h1>
          <h3 className="desc">{desc}</h3>
          <div>
            {/* <Link href="/emergenza/apply"> */}
            <Button
              className="bg_black wide br_none"
              style={{ marginTop: "20px", marginRight: "20px" }}
              handleClick={() => _goEmergenzaApply()}
            >
              참여신청
            </Button>
            <Button
              className="bg_orange wide br_none"
              style={{ marginTop: "20px" }}
              handleClick={() => _goEmergenzaVote()}
            >
              투표사전예약
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 716px;
          position: relative;
        }
        .wrapper {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
        }
        h1 {
          font-size: 50px;
          color: #fff;
        }
        h3 {
          font-size: 20px;
          color: #fff;
        }
        .fw_bold {
          font-weight: 700;
        }
        .mb_15px {
          margin-bottom: 15px;
        }
        .desc {
          position: relative;
          margin-left: 44px;
        }
        /* .desc:before {
          position: absolute;
          content: "";
          width: 30px;
          top: 50%;
          transform: translateY(-50%);
          border-bottom: 2px solid #000;
          left: -44px;
        } */
      `}</style>
    </Content>
  );
};

BannerContent.propTypes = {
  date: PropTypes.string,
  category: PropTypes.string,
  desc: PropTypes.string,
};

export default BannerContent;
