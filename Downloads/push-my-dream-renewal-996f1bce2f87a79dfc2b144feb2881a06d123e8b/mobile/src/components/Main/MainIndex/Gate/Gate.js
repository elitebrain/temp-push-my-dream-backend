import React from "react";
import PropTypes from "prop-types";
import ScrollContainer from "react-indiana-drag-scroll";
import Link from "next/link";

import GateImageItem from "./GateImageItem/GateImageItem";
import UserList from "components/Common/UserList";
import List from "components/Common/List";

import arrow_ico from "public/assets/image/circle_arrow_right_none_tail(white).png";

import { BACKGROUND_BLACK_COLOR } from "shared/constants/colors";

const Gate = ({
  icon,
  title,
  href,
  as,
  isThumbnail,
  list,
  onClick,
  category3No,
}) => {
  return (
    <div className="gate_container">
      {isThumbnail ? (
        <div className="img_list">
          <ScrollContainer horizontal>
            <List
              list={list}
              renderItem={(item) => (
                <GateImageItem
                  key={item.user_no}
                  item={item}
                  src={item.VIDEO.thumbnail}
                  category3No={category3No}
                />
              )}
            />
          </ScrollContainer>
        </div>
      ) : (
        <div className="img_list">
          <UserList
            title={
              <>
                <div className="title">
                  <div className="Icon">
                    <img src={icon} width="100%" height="100%" />
                  </div>
                  <span className="content">{title}</span>
                  <span className="join_btn">
                    <Link href={href} as={as}>
                      <img
                        onClick={onClick}
                        src={arrow_ico}
                        alt="join_btn"
                        width="100%"
                        height="100%"
                      />
                    </Link>
                  </span>
                </div>
              </>
            }
            list={list}
            isViewPush
            bgColor={BACKGROUND_BLACK_COLOR}
            category3No={category3No}
          />
          {/* <UserItem isViewPush />
          <UserItem isViewPush />
          <UserItem isViewPush />
          <UserItem isViewPush />
          <UserItem isViewPush /> */}
        </div>
      )}
      <style jsx>{`
        .gate_container {
          margin: 0 -20px;
        }
        .sub_title {
          margin-left: 20px;
          font-size: 12px;
          color: #f38400;
          margin-bottom: 8px;
        }
        .title {
          font-size: 14px;
          color: #fff;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .title .Icon {
          display: inline-block;
          margin-right: 10px;
          flex-basis: 70px;
          width: 70px;
          height: 25px;
        }

        .title .Icon img {
          vertical-align: top;
        }
        .title .content {
          width: calc(100% - 120px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .join_btn {
          flex-basis: 20px;
          width: 20px;
          height: 20px;
          margin-left: 7px;
          cursor: pointer;
        }
        .img_list {
          overflow: auto;
          white-space: nowrap;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        .img_list::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
        }
      `}</style>
    </div>
  );
};

Gate.propTypes = {
  subTitle: PropTypes.string,
  title: PropTypes.string,
  href: PropTypes.string,
  as: PropTypes.string,
  isThumbnail: PropTypes.bool,
  list: PropTypes.array,
  onClick: PropTypes.func,
  category3No: PropTypes.number,
};

export default Gate;
