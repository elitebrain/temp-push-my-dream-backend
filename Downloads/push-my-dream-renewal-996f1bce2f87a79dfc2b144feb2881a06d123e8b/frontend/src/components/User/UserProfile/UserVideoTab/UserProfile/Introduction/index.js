import React, { useContext } from "react";

import { UserContext } from "containers/User/UserContainer";

const Introduction = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="introduction">
      {currentUser.introduce}
      <style jsx>{`
        .introduction {
          width: 100%;
          min-height: 58px;
          padding: 10px;
          box-sizing: border-box;
          background: linear-gradient(180deg, #2f3354 0%, #040221 100%);
          border-radius: 5px;
          font-size: 12px;
          color: #fff;
          margin-bottom: 15px;
        }
        @media (min-width: 2560px) {
          .introduction {
            min-height: 85px;
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default Introduction;
