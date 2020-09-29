import React, { useState, useCallback, useContext } from "react";

import { UserContext } from "containers/User/UserContainer";

import UserVideoTab from "./UserVideoTab";
import UserAnalysisTab from "./UserAnalysisTab";
import MenuList from "./common/MenuList";

const useTab = (defaultTab) => {
  const [tab, setTab] = useState(defaultTab);

  const onChangeTab = useCallback((selectedTab) => {
    setTab(selectedTab);
  }, []);

  return [tab, onChangeTab];
};

const ModalUserProfile = () => {
  const { currentVideo } = useContext(UserContext);
  const [tab, onChangeTab] = useTab(1);
  return (
    <div className="main_content">
      {tab === 1 && <UserVideoTab currentVideo={currentVideo} />}
      {tab === 3 && <UserAnalysisTab />}
      <MenuList tab={tab} onChangeTab={onChangeTab} />
      <style jsx>{`
        .main_content {
          width: 1150px;
          height: 778px;
          background: linear-gradient(180deg, #17182b 0%, #020216 100%);
          border-radius: 25px;
          margin: 0 auto;
          position: relative;
        }
        @media (max-width: 1366px) {
          .main_content {
            width: 905px;
            height: 621px;
          }
        }
        @media (min-width: 2560px) {
          .main_content {
            width: 1480px;
            height: 1015px;
          }
        }
      `}</style>
    </div>
  );
};

export default ModalUserProfile;
