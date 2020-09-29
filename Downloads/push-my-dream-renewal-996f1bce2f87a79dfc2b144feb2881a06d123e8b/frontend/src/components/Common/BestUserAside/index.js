import React from "react";

import BestUserList from "components/Common/BestUserAside/BestUserList";
import BestUserItem from "components/Common/BestUserAside/BestUserList/BestUserItem";
import CategoryScroll from "./CategoryScroll";

const BestUserAside = ({ top = "0", right = "0", style }) => {
  return (
    <div className="BestUserList_container" style={style}>
      <CategoryScroll />
      <div className="BestUserList_box">
        <BestUserList
          title="Best DREAMER"
          list={Array.apply(this, new Array(5))}
          renderItem={(user, index) => (
            <BestUserItem key={index} rank={index + 1} />
          )}
          // renderItem={(user, index) => (
          //   <BestUserItem
          //     key={user.user_no}
          //     rank={index + 1}
          //     user={user}
          //   />
          // )}
        ></BestUserList>
        <BestUserList
          title="Best PRODUCER"
          list={Array.apply(this, new Array(5))}
          renderItem={(user, index) => (
            <BestUserItem key={index} rank={index + 1} />
          )}
          // renderItem={(user, index) => (
          //   <BestUserItem
          //     key={user.user_no}
          //     rank={index + 1}
          //     user={user}
          //   />
          // )}
        ></BestUserList>
        {/* <BestUserList
        title="Best PRODUCER"
        list={Array.apply(this, new Array(5))}
        renderItem={(user, index) => (
          <BestUserItem key={index} rank={index + 1} />
        )}
        // renderItem={(user, index) => (
        //   <BestUserItem
        //     key={user.user_no}
        //     rank={index + 1}
        //     user={user}
        //   />
        // )}
      ></BestUserList> */}
      </div>
      <style jsx>{`
        .BestUserList_container {
          position: fixed;
          top: 50%;
          right: ${right};
          transform: translateY(-50%);
          z-index: 1001;
        }
        .BestUserList_box {
          margin-top: 5px;
          padding: 20px 30px;
          padding-right: 0;
          background: linear-gradient(180deg, #152e39 0%, #2a1c40 100%);
          border-radius: 15px 10px;
        }
        @media (max-width: 1366px) {
          .BestUserList_box {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default BestUserAside;
