import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import MyUsedPushInCategory from "./MyUsedPushInCategory";

import {
  COLOR_696C8C,
  GRADIENT_2F3354_040221,
  WHITE_COLOR,
} from "shared/constants/colors";
import List from "components/Common/List";

const MyUsedPushTab = (props) => {
  const { myPushs } = props;
  const renderMyUsedPushInCategoryItem = useCallback(
    (item) => (
      <MyUsedPushInCategory key={item.category_level4_no} category={item} />
    ),
    []
  );

  return (
    <div className="MyUsedPushTab">
      {myPushs && Boolean(myPushs.length) && (
        <div className="MyUsedPushTab_Header">
          <p>※ 진행중인 경연의 PUSH 정보만 표시됩니다.</p>
          <p>
            ※ 자세한 PUSH 이력은 "
            <Link href="/mypage/log/push">
              <strong>구매(PUSH) 내역</strong>
            </Link>
            "에서 확인 할 수 있습니다.
          </p>
        </div>
      )}
      <List
        list={myPushs || []}
        renderItem={renderMyUsedPushInCategoryItem}
        empty={<div className="empty">푸쉬 내역이 없습니다.</div>}
      />

      {/* <MyUsedPushInCategory /> */}
      <style jsx>{`
        .MyUsedPushTab {
        }

        .MyUsedPushTab .MyUsedPushTab_Header {
          font-size: 12px;
          line-height: 15px;
          color: ${COLOR_696C8C};
          padding: 20px;
          margin-bottom: -30px;
        }

        .MyUsedPushTab .MyUsedPushTab_Header strong {
          text-decoration: underline;
          font-weight: 700;
        }

        .empty {
          padding: 40px 0;
          font-size: 14px;
          line-height: 17px;
          text-align: center;
          color: ${COLOR_696C8C};
        }
      `}</style>
    </div>
  );
};

MyUsedPushTab.propTypes = {
  myPushs: PropTypes.array,
};

export default MyUsedPushTab;
