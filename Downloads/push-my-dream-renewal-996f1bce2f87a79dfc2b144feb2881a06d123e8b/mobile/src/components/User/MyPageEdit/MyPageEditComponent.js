import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";
import NewButton from "components/Common/NewButton";

import AddImage from "./AddImage/AddImage";
import ProFile from "./ProFile/ProFile";
import PhoneNumber from "./PhoneNumber/PhoneNumber";
import Introduction from "./Introduction/Introduction";
import SnsList from "./SnsList/SnsList";
import ChangePassword from "./ChangePassword";

import { OPEN_MODAL } from "store/reducers/modal";
import TitleHeader from "components/Common/TitleHeader";

import arrow_left from "public/assets/icon/arrow_left(white).svg";
import {
  GRADIENT_2F3354_040221,
  COLOR_696C8C,
  BACKGROUND_BLACK_COLOR,
  GRADIENT_FFFFFF_C0C5DF,
} from "shared/constants/colors";
import { userApi } from "shared/api";
import { getError } from "shared/functions";

const MyPageEditComponent = (props) => {
  const {
    myInfo,
    handleSave,
    loading,
    handleLeaveAccountModal,
    isDeleteProfileImage,
    setIsDeleteProfileImage,
  } = props;
  const Router = useRouter();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    userNo: null,
    userPhoto: "",
    phone: "",
    introduce: "",
    facebookUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    blogUrl: "",
    twitterUrl: "",
    nickname: "",
  });
  const [checkingNickname, setCheckingNickname] = useState(false);
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ preview: null, file: null });

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [userName, setUserName] = useState(null);
  useEffect(() => {
    setState({
      userNo: myInfo.user_no,
      userPhoto: myInfo.user_photo || "",
      phone: myInfo.phone || "",
      introduce: myInfo.introduce || "",
      facebookUrl: myInfo.facebook_url || "",
      instagramUrl: myInfo.instagram_url || "",
      youtubeUrl: myInfo.youtube_url || "",
      blogUrl: myInfo.blog_url || "",
      twitterUrl: myInfo.twitter_url || "",
      nickname: myInfo.nickname || "",
    });
    setUserName(myInfo.user_name);
  }, [myInfo]);

  /**
   * 취소 버튼 클릭
   */
  const onCancel = useCallback(() => {
    Router.back();
  }, [Router]);

  const _handlePhotoChange = (e) => {
    const { files } = e.target;

    setIsDeleteProfileImage(false);
    const reader = new FileReader();
    const file = files[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener(
        "load",
        function () {
          setNewPhoto((prevState) =>
            Object.assign({}, prevState, { preview: reader.result })
          );
        },
        false
      );
      setNewPhoto((prevState) => Object.assign({}, prevState, { file }));
    }
  };

  // 현재 사진 삭제
  const handlePhotoInit = () => {
    setIsDeleteProfileImage(true);
    setNewPhoto(null);
  };

  const _setState = (e) => {
    const { name, value } = e.target;
    setState((prevState) => Object.assign({}, prevState, { [name]: value }));
  };
  const _handleSave = () => {
    const formData = new FormData();

    if (!isCheckedNickname && state.nickname !== myInfo.nickname) {
      return dispatch({
        type: OPEN_MODAL,
        data: {
          content: (
            <>
              <p>닉네임 중복 확인 후 이용해주세요.</p>
            </>
          ),
          isViewClose: false,
        },
      });
    }

    // 비밀번호 또는 비밀번호 확인을 입력했을 시
    if (!!password.length || !!passwordConfirm.length) {
      if (password.length < 8 || password.length > 20) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: (
              <>
                <p>8~20자리의 비밀번호로 입력해주세요.</p>
              </>
            ),
          },
        });
      }

      if (password.length < 8 || password.length > 20) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: (
              <>
                <p>8~20자리의 비밀번호로 입력해주세요.</p>
              </>
            ),
          },
        });
      }

      if (password !== passwordConfirm) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "비밀번호가 다릅니다.",
          },
        });
      }
      formData.append("password", password);
    }
    formData.append("isDeleteProfileImage", isDeleteProfileImage);
    formData.append("userNo", state.userNo);
    formData.append("userPhoto", state.userPhoto);
    formData.append("phone", state.phone);
    formData.append("introduce", state.introduce);
    if (state.facebookUrl !== "") {
      formData.append("facebookUrl", state.facebookUrl);
    }
    if (state.instagramUrl !== "") {
      formData.append("instagramUrl", state.instagramUrl);
    }
    if (state.youtubeUrl !== "") {
      formData.append("youtubeUrl", state.youtubeUrl);
    }
    if (state.blogUrl !== "") {
      formData.append("blogUrl", state.blogUrl);
    }
    if (state.twitterUrl !== "") {
      formData.append("twitterUrl", state.twitterUrl);
    }
    if (isCheckedNickname) {
      formData.append("nickname", state.nickname);
    }
    // formData.append("nickname", state.nickname);
    if (newPhoto && newPhoto.file) {
      formData.append("photo", newPhoto.file);
    }

    console.log("MyPageEditCompontn _handleSave formData ", formData);
    handleSave(formData);
    // handleSave(state);
  };

  /**
   * 닉네임 중복확인
   */
  const onCheckNickname = useCallback(async () => {
    if (!checkingNickname) {
      if (state.nickname.length) {
        setCheckingNickname(true);

        try {
          // 동일한 닉네임 체크
          const cehckNicknameResult = await userApi.get("/check/nickname", {
            params: {
              nickname: state && state.nickname,
            },
          });

          if (cehckNicknameResult.status === 200) {
            // 15일내 변경 이력 체크
            const cehckNicknameResultLog = await userApi.get(
              "/check/nickname/log",
              {
                withCredentials: true,
              }
            );

            if (cehckNicknameResultLog.status === 200) {
              setIsCheckedNickname(true);

              return dispatch({
                type: OPEN_MODAL,
                data: {
                  content: "사용 가능한 닉네임입니다.",
                  isViewClose: false,
                },
              });
            } else {
              setIsCheckedNickname(false);
            }
          } else {
            setIsCheckedNickname(false);
          }
        } catch (error) {
          console.error(error);
          setIsCheckedNickname(false);
          return dispatch({
            type: OPEN_MODAL,
            data: {
              content:
                error.response.data.e === 1 ? (
                  <p>
                    사용할 수 없는
                    <br />
                    닉네임 입니다.
                  </p>
                ) : error.response.data.e === 2 ? (
                  <p>
                    15일 이내에
                    <br />
                    닉네임을 변경한
                    <br />
                    이력이 있어
                    <br />
                    변경이 불가능합니다.
                  </p>
                ) : (
                  getError(error)
                ),
              isViewClose: false,
            },
          });
        } finally {
          setCheckingNickname(false);
        }
      } else {
        return dispatch({
          type: OPEN_MODAL,
          data: { content: "닉네임을 입력해주세요.", isViewClose: false },
        });
      }
    }
  }, [dispatch, checkingNickname, state && state.nickname]);

  return (
    <>
      <TitleHeader>프로필 편집</TitleHeader>
      <div className="container" style={{ paddingBottom: "75px" }}>
        {loading ? (
          <div className="loading">
            <div className="loading_circle" />
          </div>
        ) : (
          <Content>
            <div className="img_container">
              <AddImage
                userPhoto={state.userPhoto}
                handlePhotoChange={_handlePhotoChange}
                handlePhotoInit={handlePhotoInit}
                newPhoto={newPhoto}
                style={{ margin: "0 auto" }}
              />
            </div>
            <div className="leave">
              <span onClick={handleLeaveAccountModal}>회원 탈퇴</span>
            </div>
            <ProFile
              myInfo={myInfo}
              nickname={state.nickname}
              onChangeNickname={(e) => {
                setIsCheckedNickname(false);
                _setState(e);
              }}
              onCheckNickname={onCheckNickname}
            />
            <PhoneNumber
              userNo={myInfo.user_no}
              phone={state.phone}
              userName={userName}
              setState={_setState}
            />
            <Introduction introduce={state.introduce} setState={_setState} />
            <hr />
            {!!myInfo.local_id && (
              <ChangePassword
                password={password}
                passwordConfirm={passwordConfirm}
                setPassword={setPassword}
                setPasswordConfirm={setPasswordConfirm}
              />
            )}
            <hr />
            <SnsList
              snsTitle="페이스북"
              snsTitleEng="https://www.facebook.com/"
              name="facebookUrl"
              url={state.facebookUrl}
              setState={_setState}
            />
            <SnsList
              snsTitle="인스타그램"
              snsTitleEng="https://www.instagram.com/"
              name="instagramUrl"
              url={state.instagramUrl}
              setState={_setState}
            />
            <SnsList
              snsTitle="유튜브채널"
              snsTitleEng="https://www.youtube.com/channel/"
              name="youtubeUrl"
              url={state.youtubeUrl}
              setState={_setState}
            />
            <SnsList
              snsTitle="트위터"
              snsTitleEng="https://twitter.com/"
              name="twitterUrl"
              url={state.twitterUrl}
              setState={_setState}
            />
            <SnsList
              snsTitle="블로그"
              snsTitleEng="https://"
              name="blogUrl"
              url={state.blogUrl}
              setState={_setState}
            />
            <div className="button_group">
              <div>
                <NewButton
                  gradient
                  width="82px"
                  height="34px"
                  fontSize="15px"
                  borderRadius="17px"
                  color={COLOR_696C8C}
                  bgColor={BACKGROUND_BLACK_COLOR}
                  onClick={onCancel}
                >
                  취소
                </NewButton>
              </div>
              <div>
                <NewButton
                  width="82px"
                  height="34px"
                  fontSize="15px"
                  borderRadius="17px"
                  color={COLOR_696C8C}
                  bgImage={GRADIENT_FFFFFF_C0C5DF(180)}
                  onClick={() => _handleSave()}
                >
                  저장
                </NewButton>
              </div>
            </div>
          </Content>
        )}
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: auto;
          overflow: hidden;
          margin: 0 auto;
          position: relative;
        }
        .img_container {
          background-image: ${GRADIENT_2F3354_040221(180)};
          margin: 0 -20px;
          padding: 20px 0;
        }
        .container .mypage_title {
          height: 50px;
          position: relative;
          background-color: #141418;
        }
        .mypage_title .back_ico {
          width: 20px;
          height: 15px;
          text-align: center;
          position: absolute;
          left: 20px;
          transform: translateY(-50%);
          top: 50%;
        }
        .mypage_title .title {
          font-size: 20px;
          color: #fff;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          top: 50%;
        }
        .loading {
          position: relative;
          width: 100%;
          height: 200px;
        }
        .loading_circle {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid;
          border-color: #1890ff #1890ff #1890ff transparent;
          animation: spin 0.6s linear infinite;
        }

        .leave {
          color: #aaa;
          text-align: right;
          margin: 20px 0;
        }

        .leave span {
          cursor: pointer;
          font-size: 13px;
        }
        .button_group {
          text-align: center;
          padding-top: 20px;
        }
        .button_group div {
          display: inline-block;
        }
        .button_group div:first-child {
          margin-right: 10px;
        }
        hr {
          border: 0.5px solid #2f3354;
          margin-bottom: 20px;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default MyPageEditComponent;
