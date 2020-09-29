import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import _ from "lodash/collection";
import moment from "moment";
import Select from "react-select";

import UserProfileTab from "components/Common/UserProfile/UserProfileTab";

import {
  GRADIENT_2F3354_040221,
  FONT_WHITE_COLOR,
  BLACK_COLOR,
  BACKGROUND_BLACK_COLOR,
  COLOR_696C8C,
} from "shared/constants/colors";
import UserRankContainer from "containers/User/UserProfile/UserRankContainer";
import UserPushContainer from "containers/User/UserProfile/UserPushContainer";
import MyProfileTab from "components/MyPage/MyPageIndex/MyProfileTab";
import MyParticipatingRound from "components/MyPage/MyPageIndex/MyParticipatingRound";
import { userApi } from "shared/api";

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

const MyCategoryContainer = ({ userNo, participations, me }) => {
  const category4List = useSelector((state) =>
    state.common.category4List.filter(
      (cateogry) => cateogry.category_level1_no === 1
    )
  );

  // category 3 지정 시 해당 경연을 디폴트로 한다.
  // category 3이 없으면 가장 최근에 참여한 경연을 디폴트로 한다.
  const [selectedCategory, setSelectedCategory] = useState(
    participations
      .sort(
        (a, b) =>
          moment(b.created_at).valueOf() - moment(a.created_at).valueOf()
      )
      .map((category) => ({
        value: category.CATEGORY_LEVEL3.category_level3_no,
        label: category.CATEGORY_LEVEL3.category_level3,
      }))[0]
  );

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [pushInRound, setPushInRound] = useState(null); // 내가 이번 라운드에 받은 푸쉬 정보

  useEffect(() => {
    setPushInRound(null);
    fetchSeasonRankByUser();

    // 나에게 푸쉬한 프로듀서 정보 조회
    async function fetchSeasonRankByUser() {
      try {
        const category4 = category4List
          .filter(
            (category) => category.category_level3_no === selectedCategory.value
          )
          .sort(
            (b, a) =>
              moment(b.start_time).valueOf() - moment(a.start_time).valueOf()
          )[0];

        if (category4) {
          const result = await userApi.get(
            `/${userNo}/ranks/season/${category4.category_level4_no}/producer`,
            {
              params: {
                limit: 3,
              },
              withCredentials: true,
            }
          );

          setPushInRound(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [userNo, selectedCategory]);

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
      participations.map((participation) => ({
        value: participation.CATEGORY_LEVEL3.category_level3_no,
        label: participation.CATEGORY_LEVEL3.category_level3,
      })),
    [participations]
  );

  // 카테고리3의 해당하는 카테고리 4중 가장 최근인 걸로 memo
  const category4No = useMemo(() => {
    const category4 = category4List
      .filter(
        (category) => category.category_level3_no === selectedCategory.value
      )
      .sort(
        (b, a) =>
          moment(b.start_time).valueOf() - moment(a.start_time).valueOf()
      )[0];

    return category4 ? category4.category_level4_no : null;
  }, [selectedCategory]);

  // 선택된 카테고리의 정보
  const selectedCategoryInfo = useMemo(() => {
    const category = _.find(
      participations,
      (participation) =>
        participation.category_level3_no === Number(selectedCategory.value)
    );

    return category;
  }, [selectedCategory, participations]);

  return (
    <div className="UserCategoryWrapper">
      <div className="MyCategoryContainer">
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
          <img
            src={
              selectedCategoryInfo.CATEGORY_LEVEL2.category_level2_gradient_icon
            }
            width="70px"
            heigth="30px"
          />
          <div className="CategorySchedule">
            <p>
              <span>진행 기간:</span>
              <span>{`${moment(
                selectedCategoryInfo.CATEGORY_LEVEL3.start_time
              ).format("YYYY.MM.DD")} ~
             ${moment(selectedCategoryInfo.CATEGORY_LEVEL3.end_time).format(
               "YYYY.MM.DD"
             )}
             `}</span>
            </p>
            <p>
              <span>결과 발표:</span>
              <span>
                {moment(
                  selectedCategoryInfo.CATEGORY_LEVEL3.announce_time
                ).format("YYYY.MM.DD")}
              </span>
            </p>
          </div>
        </div>
      )}
      <UserRankContainer userNo={userNo} category4No={category4No} />
      {/* <UserPushContainer
        isPush={Boolean(
          selectedCategoryInfo.is_push && selectedCategoryInfo.is_push_by_user
        )}
        category4No={category4No}
        userNo={me.user_no}
      /> */}
      <MyParticipatingRound pushInRound={pushInRound} />
      <MyProfileTab
        category3No={Number(selectedCategory.value)}
        category4No={category4No}
      />
      <style jsx>{`
        .MyCategoryContainer {
          width: 100%;
          height: 80px;
          background-image: ${GRADIENT_2F3354_040221(90, "-15.95%", "77.03%")};

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .Select_container {
          width: 100%;
          margin: 0px 20px;
        }

        .Select_container_gg {
          z-index: 1;
        }

        .CategoryInfoContainer {
          width: 100%;
          height: 30px;
          padding: 0 20px;
          margin-top: 25px;
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
      `}</style>
    </div>
  );
};

MyCategoryContainer.propTypes = {
  participations: PropTypes.arrayOf(
    PropTypes.shape({
      CATEGORY_LEVEL2: PropTypes.shape({
        category_level2: PropTypes.string,
        category_level2_gradient_icon: PropTypes.string,
        category_level2_icon: PropTypes.string,
        category_level2_no: PropTypes.number,
      }),
      CATEGORY_LEVEL3: PropTypes.shape({
        category_level3: PropTypes.string,
        category_level3_no: PropTypes.number,
        is_push: PropTypes.number,
        start_time: PropTypes.string,
        end_time: PropTypes.string,
      }),
      CATEGORY_LEVEL4: PropTypes.shape({
        category_level4_no: PropTypes.number,
        ordinalNumber: PropTypes.number,
        title: PropTypes.string,
      }),
      category_level1_no: PropTypes.number,
      category_level2_no: PropTypes.number,
      category_level3_no: PropTypes.number,
      category_level4_no: PropTypes.number,
      is_participate: PropTypes.number,
      is_push: PropTypes.number,
      is_push_by_user: PropTypes.number,
      upload_possible_user_no: PropTypes.number,
      created_at: PropTypes.string,
    })
  ).isRequired,
  userNo: PropTypes.number,
  category3No: PropTypes.number,
  me: PropTypes.object,
};

export default React.memo(MyCategoryContainer);
