import React, { useState, useEffect, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { AiOutlineMenu } from "react-icons/ai";

import BestUserAside from "components/Common/BestUserAside";
import UserVideoTab from "./UserVideoTab";
import UserAnalysisTab from "./UserAnalysisTab";
import Layout from "components/Layout/Layout";
import MenuList from "./common/MenuList";

import logo from "public/assets/icon/logo.svg";
import logo_bird_b from "public/assets/icon/logo_bird_b.svg";
import Bell from "public/assets/icon/bell_ico(white).svg";
import search_ico from "public/assets/icon/search_ico(white).svg";

import { UserContext } from "containers/User/UserContainer";

const useTab = (defaultTab) => {
  const [tab, setTab] = useState(defaultTab);

  const onChangeTab = useCallback((selectedTab) => {
    setTab(selectedTab);
  }, []);

  return [tab, onChangeTab];
};

const UserProfile = () => {
  const [tab, onChangeTab] = useTab(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isViewHeader, setIsViewHeader] = useState(false);
  const { currentVideo } = useContext(UserContext);
  useEffect(() => {
    let resizeEvent = (e) => {
      setIsViewHeader(e.srcElement.innerWidth <= 1366);
    };

    window.addEventListener("resize", resizeEvent);

    setIsViewHeader(window.innerWidth <= 1366);
    setIsLoaded(true);

    return function cleanuo() {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  return (
    isLoaded && (
      <Layout footerNone rootDarkBlack headerNone={isViewHeader}>
        {currentVideo ? (
          <div className="container">
            <BestUserAside />
            <div className="logo_push_counter">
              <div className="logo">
                <img src={logo} alt="logo" width="100%" height="100%" />
              </div>
              <div className="pushcount">
                <div className="push_logo">
                  <span>push</span>
                  <span>
                    <img
                      src={logo_bird_b}
                      alt="kancomes_logo"
                      width="100%"
                      height="100%"
                    />
                  </span>
                </div>
                <div className="counter">100,000,000</div>
              </div>
              <div className="menu_btn">
                <span>
                  <img src={Bell} alt="bell" width="20px" height="20px" />
                </span>
                <span>
                  <AiOutlineMenu color="#fff" size="20px" />
                </span>
              </div>
            </div>
            <div className="search_bar">
              <input type="text" />
              <span>
                <img src={search_ico} width="100%" height="100%" />
              </span>
            </div>

            <div className="main_content">
              {tab === 1 && <UserVideoTab currentVideo={currentVideo} />}
              {tab === 3 && <UserAnalysisTab />}
              <MenuList tab={tab} onChangeTab={onChangeTab} />
            </div>
          </div>
        ) : (
          <div className="empty_body" />
        )}
        <style jsx>{`
          .container {
            width: 100%;
            position: absolute;
            top: calc(50% + 31px);
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .menu_btn {
            text-align: right;
            margin-top: 15px;
          }
          .menu_btn span:first-child {
            margin-right: 20px;
          }
          .logo_push_counter {
            position: absolute;
            top: 30px;
            left: 33px;
            display: none;
          }
          .logo {
            width: 80px;
            height: 35px;
            margin: 0 auto;
            margin-bottom: 30px;
          }

          .pushcount {
            width: 182px;
            height: 75px;
            border-radius: 10px;
            background-color: #fff;
            padding: 10px 17px;
            box-sizing: border-box;
          }
          .pushcount .push_logo span:first-child {
            display: inline-block;
            font-size: 11px;
            font-weight: bold;
            vertical-align: middle;
          }
          .pushcount .push_logo span:last-child {
            width: 16px;
            height: 23px;
            display: inline-block;
            vertical-align: middle;
            margin-left: 5px;
          }
          .pushcount .counter {
            font-size: 24px;
            font-weight: bold;
          }
          .search_bar {
            width: 180px;
            position: absolute;
            bottom: 30px;
            left: 33px;
            display: none;
          }
          .search_bar input {
            width: calc(100% - 25px);
            height: 20px;
            border: none;
            color: #fff;
            background-color: inherit;
            border-bottom: 1px solid #fff;
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
          }
          .search_bar span {
            width: 20px;
            height: 20px;
            display: inline-block;
            vertical-align: middle;
          }
          .main_content {
            width: 1150px;
            height: 778px;
            background: linear-gradient(180deg, #17182b 0%, #020216 100%);
            border-radius: 25px;
            margin: 0 auto;
            position: relative;
          }
          .BestUserList_container {
            position: absolute;
            top: 110px;
            right: -230px;
          }
          @media (max-width: 1366px) {
            .container {
              padding-top: 0;
            }
            .main_content {
              width: 919px;
              height: 621px;
            }
            .search_bar,
            .logo_push_counter {
              display: block;
            }
          }

          @media (min-width: 2560px) {
            .main_content {
              width: 1480px;
              height: 1015px;
            }
          }
        `}</style>
      </Layout>
    )
  );
};

UserProfile.propTypes = {
  video: PropTypes.object,
  commentList: PropTypes.array,
  countComment: PropTypes.number,
  likeVideoList: PropTypes.array,
};

export default UserProfile;
