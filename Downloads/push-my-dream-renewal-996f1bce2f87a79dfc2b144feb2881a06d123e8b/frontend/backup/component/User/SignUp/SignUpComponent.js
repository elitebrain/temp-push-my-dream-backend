import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Background from "components/Common/Background";
import { BLACK_COLOR, MAIN_BLACK_COLOR } from "shared/constants/colors";

import default_user from "public/assets/image/default_user.png";

import TermsAgree from "./TermsAgree";
import SnsLogin from "./SnsLogin";
import SetProfile from "./SetProfile";
import IdentityCertification from "./IdentityCertification";
import ApplicationComplete from "components/Common/ApplicationComplete";

import { OPEN_MODAL } from "store/reducers/modal";
import { userApi } from "shared/api";

const SignUpComponent = ({
  handlePage,
  page,
  handleSignUp,
  isFund,
  termsList
}) => {
  const [title, setTitle] = useState("");
  const [termsState, setTermsState] = useState({
    termsService: false,
    termsPrivacy: false,
    termsCharge: true,
    termsYouth: false,
    termsApplyTime: null
  });
  const [snsState, setSnsState] = useState({
    id: null,
    loginType: null,
    email: null,
    password: null
  });
  const [identityCertState, setIdentityCertState] = useState({
    isCheckedCertification: false,
    di: "",
    name: "",
    gender: "",
    country: "",
    birthdate: "",
    phoneFirst: "",
    phoneSecond: ""
  });
  const [applyState, setApplyState] = useState({
    categoryDreamerNo: "-",
    callableStartTime: "-",
    callableEndTime: "-",
    phoneFirst: "",
    phoneSecond: ""
  });
  const [profileState, setProfileState] = useState({
    isCheckedNickname: false,
    nickname: "",
    userPhoto: null,
    file: null
  });
  const [userPhotoPreview, setUserPhotoPreview] = useState(default_user);
  useEffect(() => {
    if (page === 1) {
      setTitle("약관 동의");
    } else if (page === 2) {
      setTitle("로그인 계정 선택");
    } else if (page === 3) {
      setTitle("실명 인증");
    } else if (page === 4) {
      setTitle("프로필");
    } else if (page === 0) {
      setTitle("회원가입 완료");
    }
  }, [page]);
  const dispatch = useDispatch();

  // sns 로그인 시 자동 이동
  useEffect(() => {
    const { id, loginType } = snsState;
    if (id && loginType) {
      _handlePage("next");
    }
  }, [snsState]);

  const _handleTermsChange = e => {
    const name = e.target.id;
    setTermsState(prevState =>
      Object.assign({}, prevState, { [name]: !prevState[name] })
    );
  };
  const _handleSnsChange = useCallback(
    async ({ id, email, password, loginType, error }) => {
      // 로그인 타입은 snslogin 컴포넌트에서 가입 체크를 하기 때문에 빠져나간다.
      if (loginType === "local") {
        setSnsState({ id, email, password, loginType });
        _handlePage("next");
      }
      if (!error) {
        console.log("sns test");
        try {
          const result = await userApi.post("/check", {
            id,
            loginType
          });

          if (result.status === 200) {
            setSnsState({ id, email, password, loginType });
          }
        } catch (error) {
          if (error.response.status === 409) {
            return dispatch({
              type: OPEN_MODAL,
              data: {
                content: "이미 가입된 아이디입니다."
              }
            });
          }
        }
      }
    },
    [page]
  );
  const _handleIdentityCertRadio = (name, value) => {
    setIdentityCertState(prevState =>
      Object.assign({}, prevState, { [name]: value })
    );
  };
  const _handleProfileChange = (e, fileRef) => {
    const { id, value, files } = e.target;
    if (id === "nickname") {
      setProfileState(prevState =>
        Object.assign({}, prevState, { isCheckedNickname: false, [id]: value })
      );
    } else if (id === "userPhoto") {
      const reader = new FileReader();
      const file = fileRef.current.files[0];
      const fileName = file.name;
      reader.readAsDataURL(file);
      reader.addEventListener(
        "load",
        function() {
          setUserPhotoPreview(reader.result);
        },
        false
      );
      setProfileState(prevState =>
        Object.assign({}, prevState, { [id]: fileName, file })
      );
    }
  };

  console.log("page", page);
  const _handlePage = direction => {
    if (direction === "prev") {
      handlePage(page - 1);
    } else if (direction === "next") {
      console.log("page", page);
      if (page === 1 && Object.values(termsState).indexOf(false) !== -1) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "약관에 동의하세요."
          }
        });
      } else if (
        page === 2 &&
        (!snsState.id || !snsState.loginType) &&
        !snsState.loginType === "local"
      ) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "SNS 로그인을 완료하세요."
          }
        });
      } else if (page === 3) {
        if (
          identityCertState.di.length === 0 ||
          identityCertState.name.length === 0 ||
          identityCertState.gender.length === 0 ||
          identityCertState.country.length === 0 ||
          identityCertState.birthdate.length === 0 ||
          identityCertState.phoneFirst.length === 0 ||
          identityCertState.phoneSecond.length === 0
        ) {
          return dispatch({
            type: OPEN_MODAL,
            data: {
              content: "본인인증을 진행해주세요."
            }
          });
        }

        handlePage(page + 1);
      } else {
        if (page === 1) {
          setTermsState(prevState =>
            Object.assign({}, prevState, {
              termsApplyTime: new Date().toISOString()
            })
          );
          handlePage(page + 1);
        } else {
          handlePage(page + 1);
        }
      }
    }
  };

  const _handleSave = useCallback(async () => {
    const [
      userName,
      gender,
      country,
      di,
      birthdate,
      phone,
      nickname,
      userPhotoFile,
      termsApplyTime,
      loginType,
      id,
      email,
      password
    ] = [
      identityCertState.name,
      identityCertState.gender === "male" ? 1 : 0,
      identityCertState.country === "korea" ? 1 : 0,
      identityCertState.di,
      identityCertState.birthdate,
      `${
        identityCertState.phoneFirst
      }-${identityCertState.phoneSecond
        .toString()
        .replace(/\B(?=(\d{4})+(?!\d))/, "-")}`,
      profileState.nickname,
      profileState.file,
      termsState.termsApplyTime,
      snsState.loginType,
      snsState.id,
      snsState.email,
      snsState.password
    ];

    const { isCheckedNickname } = profileState;

    if (!isCheckedNickname) {
      return dispatch({
        type: OPEN_MODAL,
        data: {
          content: "닉네임 중복 확인 후 진행해주세요."
        }
      });
    }

    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("di", di);
    formData.append("gender", gender);
    formData.append("country", country);
    formData.append("birthdate", birthdate);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("nickname", nickname);
    formData.append("termsApplyTime", termsApplyTime);
    formData.append("loginType", loginType);
    formData.append("id", id);
    formData.append("photo", userPhotoFile);

    handleSignUp(formData);
  }, [identityCertState, profileState, profileState, snsState, dispatch]);
  return (
    <Background
      width="100%"
      height="auto"
      color={BLACK_COLOR}
      className="m_center p_relative "
      style={{ zIndex: "1" }}
    >
      <div className="sign_up">
        <div>
          <div className="title">{title}</div>
        </div>
        {page > 0 && (
          <div className="indicator">
            <span className={`item${page === 1 ? " active" : ""}`}>
              {page === 1 ? "STEP 0" : ""}1
            </span>
            <span className={`item${page === 2 ? " active" : ""}`}>
              {page === 2 ? "STEP 0" : ""}2
            </span>
            <span className={`item${page === 3 ? " active" : ""}`}>
              {page === 3 ? "STEP 0" : ""}3
            </span>
            <span className={`item${page === 4 ? " active" : ""}`}>
              {page === 4 ? "STEP 0" : ""}4
            </span>
          </div>
        )}
        {page === 1 && (
          <TermsAgree
            termsState={termsState}
            handleTermsChange={_handleTermsChange}
            visible={page === 1}
            termsList={termsList}
          />
        )}
        {page === 2 && (
          <SnsLogin
            visible={page === 2}
            handleSnsChange={_handleSnsChange}
            handlePage={_handlePage}
            setSnsState={setSnsState}
            loginType={snsState.loginType}
          />
        )}
        {page === 3 && (
          <IdentityCertification
            visible={page === 3}
            identityCertState={identityCertState}
            setIdentityCertState={setIdentityCertState}
            handleIdentityCertRadio={_handleIdentityCertRadio}
          />
        )}
        {page === 4 && (
          <SetProfile
            visible={page === 4}
            profileState={profileState}
            setProfileState={setProfileState}
            handleProfileChange={_handleProfileChange}
            userPhotoPreview={userPhotoPreview}
          />
        )}
        {page === 0 && (
          <ApplicationComplete
            name={identityCertState.name}
            nickname={profileState.nickname}
            phone={`${
              identityCertState.phoneFirst
            }-${identityCertState.phoneSecond
              .toString()
              .replace(/\B(?=(\d{4})+(?!\d))/, "-")}`}
            avatar={userPhotoPreview}
          />
        )}
        {page >= 1 && page <= 4 && (
          <div className="sign_up_footer">
            {page > 1 && page !== 2 && (
              <button onClick={() => _handlePage("prev")}>이전</button>
            )}
            {page < 4 && page !== 2 && (
              <button onClick={() => _handlePage("next")}>다음</button>
            )}
            {page === 4 && <button onClick={() => _handleSave()}>저장</button>}
          </div>
        )}
        <style jsx>{`
          .sign_up .title {
            font-size: 36px;
            text-align: center;
            color: #fff;
            margin-bottom: 60px;
          }
          .sign_up {
            padding-top: 75px;
          }
          .sign_up_footer {
            width: 100%;
            margin-top: 48px;
            height: 55px;
            text-align: center;
          }
          .sign_up_footer > button {
            width: 110px;
            height: 55px;
            line-height: 55px;
            border-radius: 50px;
            background-color: #444455;
            border: 0;
            color: #eee;
            font-size: 16px;
            margin-right: 20px;
            cursor: pointer;
          }
          .sign_up_footer > button:last-child {
            background-color: #f38400;
            margin-right: 0;
          }
          .indicator {
            text-align: center;
            margin-bottom: 30px;
          }
          .indicator > .item {
            display: inline-block;
            width: 25px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            border-radius: 50%;
            background-color: #444455;
            font-size: 13px;
            color: #fff;
            font-weight: 500;
            margin-right: 5px;
          }
          .indicator > .item.active {
            width: 67px;
            background-color: #f38400;
            border-radius: 50px;
          }
        `}</style>
      </div>
    </Background>
  );
};

SignUpComponent.propTypes = {
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isFund: PropTypes.bool,
  handleSignUp: PropTypes.func,
  termsList: PropTypes.array
};

export default SignUpComponent;
