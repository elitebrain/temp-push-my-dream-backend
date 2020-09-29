import React, { useState, useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import _ from "lodash/collection";
import { useSelector } from "react-redux";
import moment from "moment";
import Select from "react-select";

import Content from "components/Layout/Content";
import RankNav from "./RankNav";
import RankDate from "./RankDate";
import RankerList from "./RankerList";
import TitleHeader from "components/Common/TitleHeader";

import { commonApi } from "shared/api";
import {
  GRADIENT_2F3354_040221,
  BACKGROUND_BLACK_COLOR,
  FONT_WHITE_COLOR,
  BLACK_COLOR,
  COLOR_696C8C,
} from "shared/constants/colors";

const customStyles = {
  singleValue: (provided) => ({
    ...provided,
    color: FONT_WHITE_COLOR,
    fontSize: "14px",
  }),
  option: (provided) => ({
    ...provided,
    color: BLACK_COLOR,
    fontSize: "14px",
    zIndex: 1,
  }),
  menu: (provided) => ({
    ...provided,
    color: FONT_WHITE_COLOR,
  }),
  control: (provided) => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    width: "100%",
    backgroundColor: BACKGROUND_BLACK_COLOR,
    border: "1px solid #696C8C",
    color: FONT_WHITE_COLOR,
    height: "40px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: FONT_WHITE_COLOR,
  }),
};

// 커스텀 훅
const useFetchList = ({ tab, mainTab, category3No }) => {
  const [list, setList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [season, setSeason] = useState(null);

  // 탭을 클릭시 랭킹 리스트를 새로 조회한다.
  useEffect(() => {
    let isCancelled = false;

    setIsLoaded(true);
    setSeason(null);
    fetchList();

    async function fetchList() {
      try {
        let list = [];
        let result;
        // week
        if (!isCancelled) {
          if (tab === "week") {
            result = await commonApi.get(
              `/ranks/${category3No}/${mainTab}/week`,
              {
                params: {
                  limit: 100,
                },
              }
            );
          }
          // month
          else if (tab === "month") {
            result = await commonApi.get(
              `/ranks/${category3No}/${mainTab}/month`,
              {
                params: {
                  limit: 100,
                },
              }
            );
          }
          // season
          else if (tab === "season") {
            result = await commonApi.get(
              `/ranks/${category3No}/${mainTab}/season`,
              {
                params: {
                  limit: 100,
                },
              }
            );

            if (!isCancelled) {
              setSeason(result.data.season);
            }
          }
          // producer
          else if (tab === 4) {
            result = await commonApi.get(`/ranks/${category3No}/producer`, {
              params: {
                limit: 100,
              },
            });
          }
        }

        if (!isCancelled) {
          list = result.data.rankList;
          setList(list);
          setIsLoaded(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setIsLoaded(false);
        }
      }
    }

    return function cleanup() {
      isCancelled = true;
    };
  }, [tab, mainTab, category3No]);

  return [list, season, isLoaded];
};

const Rank = ({ category3No, userType = "dreamer", modal }) => {
  const category2List = useSelector((state) => state.common.category2List);
  // 카테고리 레벨1이 경연인 것만 표시
  const category3List = useSelector((state) =>
    state.common.category3List.filter(
      (category) => category.category_level1_no === 1
    )
  );
  const [tab, setTab] = useState("week");
  const [mainTab, setMainTab] = useState(userType);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(
    Boolean(category3No)
      ? {
          value: category3No,
          label: _.find(
            category3List,
            (_category) => _category.category_level3_no === Number(category3No)
          ).category_level3,
        }
      : category3List
          .sort(
            (a, b) =>
              moment(b.created_at).valueOf() - moment(a.created_at).valueOf()
          )
          .map((category) => ({
            value: category.category_level3_no,
            label: category.category_level3,
          }))[0]
  );

  const [rankList, season, isLoadedList] = useFetchList({
    tab,
    mainTab,
    category3No: selectedCategory.value,
  });

  /**
   * 메인 탭 변경
   */
  const onMainTab = useCallback((mainTab) => {
    setMainTab(mainTab);
  }, []);

  /**
   * 탭 변경
   */
  const onTab = useCallback((tab) => {
    setTab(tab);
  }, []);

  /**
   * 카태고리 변경
   * 변경 후 메뉴를 닫는다.
   */
  const onChangeSelectedCategory = useCallback((selectedOption) => {
    console.log("selectedOption", selectedOption);
    setSelectedCategory(selectedOption);
    setIsOpenMenu(false);
  }, []);

  /**
   * 메뉴 오픈
   */
  const onMenuOpen = useCallback(() => {
    setIsOpenMenu(true);
  }, []);

  // option memo
  const options = useMemo(
    () =>
      category3List.map((category) => ({
        value: category.category_level3_no,
        label: category.category_level3,
      })),
    [category3List]
  );

  // 선택된 카테고리의 정보
  const selectedCategoryInfo = useMemo(() => {
    const category = _.find(
      category3List,
      (category) =>
        category.category_level3_no === Number(selectedCategory.value)
    );

    return category;
  }, [selectedCategory, category3List]);

  /**
   * 카테고리 아이콘
   */
  const categoryIconMemo = useMemo(() => {
    const category3 = _.find(
      category3List,
      (category) =>
        category.category_level3_no === Number(selectedCategory.value)
    );

    return _.find(
      category2List,
      (category) => category.category_level2_no === category3.category_level2_no
    ).category_level2_gradient_icon;
  }, [selectedCategory, category2List, category3List]);

  return (
    <>
      <TitleHeader>
        <span className="Title">랭킹</span>
      </TitleHeader>
      <div
        className="container"
        style={{
          backgroundColor: BACKGROUND_BLACK_COLOR,
        }}
      >
        {/* <div className="CategoryContainer">
          <div className="Select_container">
            <Select
              value={selectedCategory}
              onChange={onChangeSelectedCategory}
              options={options}
              styles={customStyles}
              menuIsOpen={isOpenMenu}
              onMenuOpen={onMenuOpen}
            />
          </div>
        </div>
        {selectedCategoryInfo && (
          <div className="CategoryInfoContainer">
            <img src={categoryIconMemo} width="70px" heigth="30px" />
            <div className="CategorySchedule">
              <p>
                <span>진행 기간:</span>
                <span>{`${moment(selectedCategoryInfo.start_time).format(
                  "YYYY.MM.DD"
                )} ~
           ${moment(selectedCategoryInfo.end_time).format("YYYY.MM.DD")}
           `}</span>
              </p>
              <p>
                <span>결과 발표:</span>
                <span>
                  {moment(selectedCategoryInfo.announce_time).format(
                    "YYYY.MM.DD"
                  )}
                </span>
              </p>
            </div>
          </div>
        )} */}
        <Content>
          <RankNav
            mainTab={mainTab}
            tab={tab}
            onMainTab={onMainTab}
            onTab={onTab}
          />
        </Content>
      </div>
      <Content
        style={{
          maxWidth: "1200px",
          minHeight: modal ? "calc(100% - 178px)" : "calc(100vh - 220px)",
          boxSizing: "border-box",
          backgroundImage: GRADIENT_2F3354_040221(90, "-15.95%", "77.03%"),
        }}
      >
        <RankDate
          tab={tab}
          season={season}
          category3No={selectedCategory.value}
        />
        <RankerList
          category3No={selectedCategory.value}
          isProducer={mainTab === "producer"}
          tab={tab}
          list={rankList}
          isLoadedList={isLoadedList}
        />
      </Content>
      <style jsx>{`
        .rank_modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(30, 30, 37, 0.6);
          z-index: 1;
          cursor: pointer;
        }

        .Title {
          width: 50%;
          text-align: center;
        }

        .CategoryContainer {
          max-width: 1200px;
          width: 100%;
          height: 80px;
          background-image: ${GRADIENT_2F3354_040221(90, "-15.95%", "77.03%")};
          margin: 0 auto;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .Select_container {
          width: 100%;
          margin: 0px 20px;
        }

        .CategoryInfoContainer {
          box-sizing: border-box;
          max-width: 1200px;
          width: 100%;
          height: 30px;
          padding: 0 20px;
          margin: 25px auto 25px auto;
          display: flex;
        }

        .CategoryInfoContainer img {
          width: 70px;
          height: 30px;
        }

        .CategorySchedule {
          hegith: 30px;
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .CategorySchedule p {
          font-size: 12px;
          color: ${FONT_WHITE_COLOR};
          display: flex;
        }

        .CategorySchedule p span:first-of-type {
          color: ${COLOR_696C8C};
          margin-right: 10px;
          font-size: 12px;
        }

        .container {
          position: relative;
          width: 100%;
        }
        .wrapper {
          padding-bottom: 140px;
        }
        .back_ico {
          width: 20px;
          height: 20px;
          padding: 0 20px;
          margin-bottom: 24px;
          cursor: pointer;
        }
        .title {
          position: relative;
          /* margin-bottom: 17px; */
          padding: 0 20px;
          padding-bottom: 39px;
        }
        .title .main_title {
          font-size: 24px;
          color: #fff;
          font-weight: bold;
          display: inline-block;
          margin-right: 10px;
        }
        .title .sub_title {
          font-size: 13px;
          color: #f38400;
          font-weight: 500;
          display: inline-block;
        }
      `}</style>
    </>
  );
};

Rank.propTypes = {
  category3No: PropTypes.number.isRequired,
  userType: PropTypes.string,
};

export default React.memo(Rank);
