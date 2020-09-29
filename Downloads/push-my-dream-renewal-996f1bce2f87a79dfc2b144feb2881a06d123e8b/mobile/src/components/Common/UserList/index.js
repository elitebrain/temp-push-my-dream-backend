import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import ScrollContainer from "react-indiana-drag-scroll";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Content from "components/Layout/Content";
import ContentHeader from "../ContentHeader";
import UserItem from "../UserItem";

import {
  BLACK_COLOR,
  MAIN_BLACK_COLOR,
  BACKGROUND_BLACK_COLOR,
} from "shared/constants/colors";

const UserList = ({
  title,
  list,
  categoryNo,
  gradientBg,
  isViewPush,
  bgColor,
  category3No,
  ...rest
}) => {
  const Router = useRouter();
  const { category3List } = useSelector((state) => state.common);
  const index = useMemo(
    () =>
      category3List
        .map((category) => category.category_level3_no)
        .indexOf(categoryNo),
    [categoryNo]
  );

  // 유저 프로필 보기
  const onRedirectUserProfile = useCallback(
    (userNo) => {
      Router.push(
        {
          pathname: "/user/[user_no]",
          query: {
            category3No,
          },
        },

        {
          pathname: `/user/${userNo}`,
          query: {
            category3No,
          },
        }
      ).then(() => window.scrollTo(0, 0));
    },
    [Router, categoryNo]
  );

  const renderUser = useCallback(
    (user) => (
      <UserItem
        key={user.user_no}
        onClick={onRedirectUserProfile}
        user={user}
        isViewPush={isViewPush}
      />
    ),
    []
  );

  const scrollContainerStyle = useMemo(() => {
    return {
      overflow: "auto",
      whiteSpace: "nowrap",
      position: "relative",
      margin: "0 -20px",
    };
  }, []);

  const containerClass = useMemo(
    () => `container${gradientBg ? " gradientBg" : ""}`,
    [gradientBg]
  );

  if (!list || !Boolean(list.length)) {
    return null;
  }

  return (
    <div className={containerClass}>
      <Content>
        {title && (
          <ContentHeader
            title={title}
            mobileSelect
            style={{ paddingTop: "0" }}
            borderGradient
          />
        )}
        <div className="wrapper">
          <div className="leftGraientInScroll" />
          <div className="rightGraientInScroll" />
          <ScrollContainer horizontal style={scrollContainerStyle}>
            {list && list.filter((item) => item).map(renderUser)}
            {/* {list && !list.length && (
            <div className="videoList_notice">비디오가 존재하지 않습니다.</div>
          )} */}

            {/* {isLoaded && (
              <BounceLoader
                color={MAIN_COLOR}
                style={{ display: "inline-block" }}
              />
            )} */}
          </ScrollContainer>
        </div>
      </Content>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          height: auto;
          background: ${bgColor ? bgColor : BACKGROUND_BLACK_COLOR};
          overflow: hidden;
          padding: 15px 0 15px 0;
        }
        .container.gate {
          background-color: ${BACKGROUND_BLACK_COLOR};
          padding: 30px 0;
        }
        .container.gradientBg {
          background: linear-gradient(180deg, #2e2f3e 0%, #232329 100%);
        }

        .container .wrapper {
          position: relative;
        }
        .container .wrapper .leftGraientInScroll {
          z-index: 1;
          width: 10px;
          height: 100%;
          position: absolute;
          top: 0;
          left: -20px;
          background: linear-gradient(
            90deg,
            rgba(30, 30, 37, 0.5) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        .container .wrapper .rightGraientInScroll {
          z-index: 1;
          width: 10px;
          height: 100%;
          position: absolute;
          top: 0;
          right: -20px;
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(30, 30, 37, 0.5) 100%
          );
        }

        .container.gradientBg .wrapper .leftGraientInScroll {
          background: linear-gradient(
            90deg,
            rgba(35, 35, 41, 0.5) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        .container.gradientBg .wrapper .rightGraientInScroll {
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(35, 35, 41, 0.5) 100%
          );
        }
      `}</style>
    </div>
  );
};

UserList.propTypes = {
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  list: PropTypes.array,

  categoryNo: PropTypes.number,
  gradientBg: PropTypes.bool,
  isViewPush: PropTypes.bool,
  bgColor: PropTypes.string,
  category3No: PropTypes.number,
};

export default UserList;
