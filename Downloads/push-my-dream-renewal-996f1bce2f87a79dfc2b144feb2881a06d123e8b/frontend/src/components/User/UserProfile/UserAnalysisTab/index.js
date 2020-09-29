import React, { useState, useCallback } from "react";
import UserInfo from "./UserInfo";
import CategoryMenu from "./CategoryMenu";
import AnalysisMenu from "./AnalysisMenu";
import Awards from "./Awards";

const useTab = (defaultTab) => {
  const [tab, setTab] = useState(defaultTab);

  const onChangeTab = useCallback((selectedTab) => {
    setTab(selectedTab);
  }, []);

  return [tab, onChangeTab];
};

const UserAnalysisTab = () => {
  const [analysisTab, onChangeAnalysisTab] = useTab(1);
  const [categoryTab, onChangeCategoryTab] = useTab(1);

  return (
    <div className="UserAnalysisTab_container">
      <UserInfo />
      <CategoryMenu tab={categoryTab} onChangeTab={onChangeCategoryTab} />
      <div className="analysis_menu">
        <AnalysisMenu tab={analysisTab} onChangeTab={onChangeAnalysisTab} />
        {analysisTab === 1 && <div>베이직 탭</div>}
        {analysisTab === 2 && <div>푸쉬 탭</div>}
        {analysisTab === 3 && <div>액티비티 탭</div>}
        {analysisTab === 4 && <div>팬 탭</div>}
      </div>
      <Awards />

      {/* <ContentMenu tab={tab} onChangeTab={onChangeTab} /> */}
      <style jsx>{`
        .UserAnalysisTab_container {
          height: 100%;
          overflow: hidden;
          padding: 20px 50px;
          box-sizing: border-box;
        }
        .analysis_menu {
          display: inline-block;
          vertical-align: top;
          margin-right: 80px;
        }
        @media (max-width: 1366px) {
          .UserAnalysisTab_container {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserAnalysisTab;
