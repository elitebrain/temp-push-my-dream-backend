import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import SectionHeader from "components/Common/Chart/SectionHeader";
import PieChart from "components/Common/Chart/PieChart";
import Loader from "components/Common/Loader";

import maleIco from "assets/icon/icon_man.svg";
import femaleIco from "assets/icon/icon_women.svg";
// import femaleIco from "assets/image/icon_women.png";

import {
  GRADIENT_2F3354_040221,
  COLOR_696C8C,
  COLOR_979CCA,
  COLOR_28C9A0,
  COLOR_AE46E7,
  COLOR_666666,
  FONT_WHITE_COLOR,
} from "shared/constants/colors";
import { userApi } from "shared/api";

const FanChartContainer = ({ userNo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  /**
   * 데이터 조회
   */
  useEffect(() => {
    let isCancelled = false;

    if (userNo) {
      fetchData();
    }

    return function cleanup() {
      isCancelled = true;
    };

    async function fetchData() {
      try {
        if (!isCancelled) {
          setIsLoading(true);

          const result = await userApi.get(`/${userNo}/chart/fan`);

          if (!isCancelled) {
            // 성별과 나이 비율 값이 있으면 렌더링한다.
            if (
              result.data.data.genderData.some((v) =>
                Boolean(Number(v.value))
              ) &&
              result.data.data.ageData.some((v) => Boolean(Number(v.value)))
            ) {
              setData(result.data.data);
            } else {
              setData(null);
            }
          }
        }
      } catch (error) {
        if (!isCancelled) {
          console.error(error);
          setData(null);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }
  }, [userNo]);
  return (
    <div className="section">
      <SectionHeader title="FAN" />
      <div className="wrapper">
        <div className="noti">인구 통계 정보를 표시합니다.</div>{" "}
        {isLoading ? (
          <div className="LoaderWrapper">
            <Loader />
          </div>
        ) : data ? (
          <div className="bg">
            {/* 성별 비율이 한개라도 값이 존재하면 렌더링 */}
            {data.genderData.some((v) => Boolean(Number(v.value))) && (
              <div className="item left">
                <div className="male_wrapper">
                  <img
                    src={maleIco}
                    alt="male_ico"
                    style={{
                      verticalAlign: "middle",
                      marginRight: "4px",
                      width: "14px",
                    }}
                  />
                  <div className="ratio">
                    {parseInt(data.genderData[1].value * 100, 10)}%
                  </div>
                </div>
                <PieChart
                  data={data.genderData.filter((v) => Boolean(Number(v.value)))}
                  width={64}
                  height={64}
                  innerRadius={16}
                  outerRadius={32}
                  // titleArr={[
                  //   { no: 1, text: "남성", color: "#00f1b4" },
                  //   { no: 2, text: "여성", color: "#d53cf5" },
                  // ].filter((v, i) => Boolean(Number(data.genderData[i].value)))}
                  colors={["#d53cf5", "#00f1b4"].filter((v, i) =>
                    Boolean(Number(data.genderData[i].value))
                  )}
                  // text
                />
                <div className="female_wrapper">
                  <img
                    src={femaleIco}
                    alt="female_ico"
                    style={{
                      verticalAlign: "middle",
                      marginLeft: "4px",
                      width: "14px",
                    }}
                  />
                  <div className="ratio">
                    {parseInt(data.genderData[0].value * 100, 10)}%
                  </div>
                </div>
              </div>
            )}
            <div className="divider" />
            {/* 나이 비율이 한개라도 값이 존재하면 렌더링 */}
            {data.ageData.some((v) => Boolean(Number(v.value))) && (
              <div className="item right">
                {data.ageData.map((age, i) => (
                  <div key={i} className="molecule_ratio_age">
                    <span className="atomic_label">
                      {i < data.ageData.length - 1 ? `${i + 1}0대` : "기타"}
                    </span>
                    <span className="atomic_guage_frame">
                      <span
                        className="atomic_guage_value"
                        style={{ width: `calc((100% - 6px) * ${age.value})` }}
                      ></span>
                    </span>
                    <span className="atomic_ratio">
                      {parseInt(age.value * 100, 10)}%
                    </span>
                  </div>
                ))}
                {/* <PieChart
                  data={data.ageData.filter((v) => Boolean(Number(v.value)))}
                  width={100}
                  height={100}
                  innerRadius={0}
                  outerRadius={50}
                  titleArr={[
                    { no: 1, text: "10대", color: "#4775CA" },
                    { no: 2, text: "20대", color: "#F48036" },
                    { no: 3, text: "30대", color: "#4bc0c0" },
                    { no: 4, text: "40대", color: "#F4C000" },
                    { no: 5, text: "50대", color: "#559BDB" },
                    { no: 6, text: "60대", color: "#72B347" },
                    { no: 7, text: "기타", color: "#A1A1A1" },
                  ].filter((v, i) => Boolean(Number(data.ageData[i].value)))}
                  colors={[
                    "#4775CA",
                    "#F48036",
                    "#4bc0c0",
                    "#F4C000",
                    "#559BDB",
                    "#72B347",
                    "#A1A1A1",
                  ].filter((v, i) => Boolean(Number(data.ageData[i].value)))}
                  text
                /> */}
              </div>
            )}
          </div>
        ) : (
          <div className="Notice">데이터가 존재하지 않습니다.</div>
        )}
      </div>
      <style jsx>{`
        .section {
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 30px;
          background: ${GRADIENT_2F3354_040221(180, "-27.85%", "68.61%")};
        }
        .wrapper {
          font-family: "Montserrat";
          text-align: center;
          padding-bottom: 18px;
        }
        .wrapper > .noti {
          font-size: 10px;
          color: ${COLOR_696C8C};
          margin: 0 10px 20px;
          text-align: left;
        }

        .wrapper .item {
          display: inline-block;
          width: 50%;
          vertical-align: middle;
          height: 100%;
          box-sizing: border-box;
        }
        .wrapper .item.left {
          width: 45%;
        }
        .wrapper .item.right {
          width: calc(55% - 13px);
        }

        .LoaderWrapper {
          width: 100%;
          height: 194px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .bg {
          margin: 0 15px;
          box-sizing: border-box;
        }

        .Notice {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;

          color: ${COLOR_666666};

          font-size: 12px;
        }

        .male_wrapper,
        .female_wrapper {
          display: inline-block;
          vertical-align: middle;
          width: 24px;
        }
        .ratio {
          font-size: 10px;
          margin-top: 8px;
        }
        .male_wrapper .ratio {
          color: #00f1b4;
          text-align: left;
        }
        .female_wrapper .ratio {
          color: #d53cf5;
          text-align: right;
        }
        .molecule_ratio_age {
          font-size: 10px;
          margin-bottom: 3px;
        }
        .molecule_ratio_age > span {
          display: inline-block;
          vertical-align: middle;
        }
        .atomic_label {
          color: #696c8c;
          width: 30px;
          text-align: center;
        }
        .atomic_guage_frame {
          position: relative;
          width: calc(100% - 60px);
          height: 9px;
          background-color: #3b3d55;
          border-radius: 30px;
        }
        .atomic_guage_value {
          position: absolute;
          height: 5px;
          left: 3px;
          top: 2px;
          border-radius: 30px;
          background: linear-gradient(to right, #00f1b4, #d53cf5);
        }
        .atomic_ratio {
          color: #fff;
          width: 30px;
          text-align: right;
        }

        .organism_ratio_age {
          display: inline-block;
          vertical-align: middle;
        }
        .divider {
          display: inline-block;
          vertical-align: middle;
          width: 1px;
          height: 120px;
          margin: 0 6px;
          background: linear-gradient(to bottom, #00f1b4, #d53cf5);
        }
      `}</style>
    </div>
  );
};

FanChartContainer.propTypes = {
  userNo: PropTypes.number,
};

export default FanChartContainer;
