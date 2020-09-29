import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import Content from "components/Layout/Content";
import Button from "components/Common/Button";
import Link from "next/link";

import official_title from "public/assets/image/khanteum_title(white).png";

const BannerContent = (props) => {
  const {
    category,
    desc,
    startDate,
    endDate,
    emergenzaStyle,
    isOfficial,
    categoryNo,
    className,
  } = props;
  const [yearChanged, setYearChanged] = useState(false);
  useEffect(() => {
    if (startDate.substr(0, 4) !== endDate.substr(0, 4)) {
      setYearChanged(true);
    }
  }, [startDate, endDate]);
  return (
    <Content>
      <div className={"container"}>
        {isOfficial && (
          <div className={`wrapper`} style={{ marginTop: "15px" }}>
            <div className="isImage">
              <img
                src={official_title}
                alt="official_title"
                width="100%"
                height="100%"
              />
            </div>
            <h1 className={`fw_bold`}>{category}</h1>
          </div>
        )}
        {!isOfficial && (
          <div className={`wrapper ${className}`}>
            <h1 className={`fw_bold ${emergenzaStyle ? "emergenza" : ""}`}>
              {category}
            </h1>
            <div className="title">
              <h2 className={emergenzaStyle ? "emergenza" : ""}>{desc}</h2>
            </div>
            {/* <h3 className="term">{`${startDate.replace(/-/g, ".")} - ${
            yearChanged
              ? endDate.replace(/-/g, ".")
              : endDate.substr(5).replace(/-/g, ".")
          }`}</h3> */}
            {!emergenzaStyle ||
              (category === 7 && (
                <div>
                  {/* hot-video, new-video 클릭시 emergenza-apply 이동 */}
                  <Button
                    style={{ fontSize: "16px" }}
                    handleClick={() =>
                      Router.push(
                        categoryNo === 6 ? "/emergenza/apply" : "/upload"
                      )
                    }
                  >
                    참여하기
                  </Button>
                </div>
              ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 330px;
          position: relative;
        }

        .isImage {
          width: 100%;
          /* height: 53px; */
          height: 70px;
        }
        .wrapper {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: #fff;
        }
        .wrapper.official {
          margin-top: 45px;
        }
        h1 {
          font-size: 23px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        h1.emergenza {
          font-size: 22px;
          margin-bottom: 20px;
        }
        h2 {
          font-size: 20px;
          font-weight: 400;
        }

        h2.emergenza {
          font-size: 14px;
          word-break: keep-all;
        }
        h3 {
          font-size: 13px;
          font-weight: 400;
        }
        .title {
          display: inline-block;
          position: relative;
          margin-bottom: 15px;
          /* margin-top: 16px;
          margin-bottom: 24px; */
        }
        .round {
          position: absolute;
          display: inline-block;
          top: 0px;
          right: -25px;
          font-size: 13px;
          font-weight: bold;
          color: #f38400;
        }
        .fw_bold {
          font-weight: 700;
        }
        .term {
          margin-bottom: 20px;
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
  endDate: PropTypes.string,
  isOfficial: PropTypes.bool,
};

export default BannerContent;
