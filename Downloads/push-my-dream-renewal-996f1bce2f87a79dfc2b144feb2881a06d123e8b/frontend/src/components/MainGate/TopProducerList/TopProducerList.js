import React from "react";

import UserItem from "../../Common/UserItem";

const TopProducerList = () => {
  return (
    <div className="producer_list_container">
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <style jsx>{`
        .producer_list_container {
          /* width: calc(100% - 20px); */
          margin-right: -20px;
          overflow: auto;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default TopProducerList;
