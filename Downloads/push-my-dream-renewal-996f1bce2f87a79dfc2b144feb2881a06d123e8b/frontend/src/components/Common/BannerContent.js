import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import Content from "components/Layout/Content";
import Button from "components/Common/Button";
import Link from "next/link";
import { EMERGENZA_VOTE_NO } from "shared/constants/variables";

const BannerContent = props => {
  const {
    category,
    desc,
    startDate,
    endDate,
    emergenzaStyle,
    appleStyle,
    categoryNo,
    className
  } = props;
  const router = useRouter();
  const [yearChanged, setYearChanged] = useState(false);
  useEffect(() => {
    if (startDate.substr(0, 4) !== endDate.substr(0, 4)) {
      setYearChanged(true);
    }
  }, [startDate, endDate]);

  return (
    <Content>
      <div className={`container ${className}`}>
        <div className="wrapper">
          <h1
            className={`fw_bold ${emergenzaStyle ? "emergenza" : ""} ${
              appleStyle ? "apple" : ""
            }`}
          >
            {category}
          </h1>
          <div className="title">
            <h2 className={emergenzaStyle ? "emergenza" : ""}>{desc}</h2>
            {/* <span className="round fw_bold">#{round}</span> */}
          </div>
          {/* <h3 className="term">{`${startDate.replace(/-/g, ".")} - ${
            yearChanged
              ? endDate.replace(/-/g, ".")
              : endDate.substr(5).replace(/-/g, ".")
          }`}</h3> */}
          {router.pathname !== "/emergenza/notice" && (
            <div>
              {/* hot-video, new-video 클릭시 emergenza-apply 이동 */}
              {categoryNo === 6 ? (
                <Link
                  href={"/vote/[vote_id]"}
                  as={`/vote/${EMERGENZA_VOTE_NO}`}
                >
                  <Button style={{ fontSize: "16px" }}>투표하기</Button>
                </Link>
              ) : (
                <Link href={"/upload"}>
                  <Button style={{ fontSize: "16px" }}>참여하기</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 698px;
          padding-top: 97px;
          position: relative;
        }
        .container.notice h1 {
          font-size: 36px;
        }
        .container.notice h2 {
          font-size: 16px;
        }
        .wrapper {
          width: 100%;
          margin-top: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: #fff;
        }
        h1 {
          font-size: 100px;
        }
        h1.apple {
          word-spacing: 20px;
        }
        h2 {
          font-size: 50px;
        }
        h3 {
          font-size: 22px;
        }
        .title {
          display: inline-block;
          position: relative;
          margin-top: 16px;
          /* margin-bottom: 24px; */
          margin-bottom: 100px;
        }
        .round {
          position: absolute;
          display: inline-block;
          top: -5px;
          right: -75px;
          font-size: 40px;
          font-weight: 700;
          color: #f38400;
        }
        .fw_bold {
          font-weight: 700;
        }
        .term {
          margin-bottom: 116px;
        }
      `}</style>
    </Content>
  );
};

BannerContent.propTypes = {
  categoryNo: PropTypes.number,
  title: PropTypes.string,
  round: PropTypes.number,
  startDate: PropTypes.string,
  endDate: PropTypes.string
};

export default BannerContent;
