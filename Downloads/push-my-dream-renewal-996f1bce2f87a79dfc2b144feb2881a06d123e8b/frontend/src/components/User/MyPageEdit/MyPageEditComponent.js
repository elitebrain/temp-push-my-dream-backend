import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Button from "components/Common/Button";
import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";
import InfiniteLogo from "components/Common/InfiniteLogo";

import AddImage from "./AddImage/AddImage";
import ProFile from "./ProFile/ProFile";
import PhoneNumber from "./PhoneNumber/PhoneNumber";
import Introduction from "./Introduction/Introduction";
import SnsList from "./SnsList/SnsList";

import arrow_right_ico from "public/assets/icon/arrow_right_ico(white).svg";
import ChangePassword from "./ChangePassword";
import { OPEN_MODAL } from "store/reducers/modal";

const MyPageEditComponent = (props) => {
  const { myInfo, handleSave, handleLeaveAccountModal } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    userNo: null,
    userPhoto: "",
    phone: "",
    phoneFirst: "",
    phoneSecond: "",
    introduce: "",
    facebookUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    blogUrl: "",
    twitterUrl: "",
  });
  const [newPhoto, setNewPhoto] = useState({ preview: null, file: null });

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [userName, setUserName] = useState(null);
  // sms인증 번호 verifyNum에 저장
  const [verifyNum, setVerifyNum] = useState("123123");
  // 전화번호 수정 -> true, 인증여부체크
  const [isPhoneChanged, setIsPhoneChanged] = useState(false);
  // PhoneNumber -> 변경/취소
  const [isEditPhone, setIsEditPhone] = useState(false);
  // PhoneNumber -> 전송/재전송
  const [isSend, setIsSend] = useState(false);
  // PhoneNumber -> 인증
  const [isVerified, setIsVerified] = useState(false);
  // PhoneNumber -> 신규번호/인증번호 text
  const [phoneF, setPhoneF] = useState("");
  const [phoneS, setPhoneS] = useState("");
  const [confirmNum, setConfirmNum] = useState("");
  useEffect(() => {
    setState({
      userNo: myInfo.user_no,
      userPhoto: myInfo.user_photo,
      phone: myInfo.phone,
      phoneFirst: myInfo.phone ? myInfo.phone.split("-")[0] : "",
      phoneSecond: myInfo.phone
        ? myInfo.phone.substr(myInfo.phone.indexOf("-") + 1)
        : // ? myInfo.phone.split("-")[1] + myInfo.phone.split("-")[2]
          "",
      introduce: myInfo.introduce || "",
      facebookUrl: myInfo.facebook_url || "",
      instagramUrl: myInfo.instagram_url || "",
      youtubeUrl: myInfo.youtube_url || "",
      blogUrl: myInfo.blog_url || "",
      twitterUrl: myInfo.twitter_url || "",
    });
    setPhoneF(myInfo.phone ? myInfo.phone.split("-")[0] : "");
    setPhoneS(
      myInfo.phone
        ? myInfo.phone.split("-")[1] + myInfo.phone.split("-")[2]
        : ""
    );
    setUserName(myInfo.user_name);
  }, [myInfo]);
  const _setState = (e) => {
    const { name, value } = e.target;
    setState((prevState) => Object.assign({}, prevState, { [name]: value }));
  };
  const _handleSave = () => {
    const formData = new FormData();

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

      // if (!passwordRegEpx.test(password)) {
      //   return dispatch({
      //     type: OPEN_MODAL,
      //     data: {
      //       content: (
      //         <>
      //           <p>8~20자리의 특수문자 포함</p>
      //           <p>비밀번호로 입력해주세요.</p>
      //         </>
      //       )
      //     }
      //   });
      // }
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
      // if (!passwordRegEpx.test(passwordConfirm)) {
      //   return dispatch({
      //     type: OPEN_MODAL,
      //     data: {
      //       content: (
      //         <>
      //           <p>8~20자리의 특수문자 포함</p>
      //           <p>비밀번호로 입력해주세요.</p>
      //         </>
      //       )
      //     }
      //   });
      // }
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

    formData.append("userNo", state.userNo);
    formData.append("userPhoto", state.userPhoto);
    formData.append("phone", state.phone);
    formData.append("phoneFirst", state.phoneFirst);
    formData.append("phoneSecond", state.phoneSecond);
    formData.append("introduce", state.introduce);
    formData.append("facebookUrl", state.facebookUrl);
    formData.append("instagramUrl", state.instagramUrl);
    formData.append("youtubeUrl", state.youtubeUrl);
    formData.append("blogUrl", state.blogUrl);
    formData.append("twitterUrl", state.twitterUrl);
    if (newPhoto.file) {
      formData.append("photo", newPhoto.file);
    }
    handleSave(formData);
    // handleSave(state);
  };
  const _handlePhotoChange = (e) => {
    const { files } = e.target;
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
  const _toggleChange = () => {
    setIsEditPhone((prevState) => !prevState);
  };
  const _handleSend = () => {
    alert("인증번호 전송");
    setIsSend(true);
  };
  const _handleVerify = () => {
    if (verifyNum === confirmNum) {
      setIsVerified(true);
      const e1 = {
        target: {
          name: "phoneFirst",
          value: phoneF,
        },
      };
      const e2 = {
        target: {
          name: "phoneSecond",
          value: phoneS,
        },
      };
      _setState(e1);
      _setState(e2);
    }
  };
  const _handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneF") {
      setPhoneF(value);
    } else if (name === "phoneS") {
      setPhoneS(value);
    }
    setIsSend(false);
    setIsVerified(false);
    setIsPhoneChanged(true);
  };
  return (
    <Layout>
      <div className="container">
        <Content>
          <div className="nav">
            <span>HOME</span>
            <img
              src={arrow_right_ico}
              alt="right_arrow"
              width="8px"
              height="13px"
            />
            <span className="position">MYPAGE</span>
          </div>
          <div className="title">마이 페이지</div>
          <AddImage
            userPhoto={state.userPhoto}
            handlePhotoChange={_handlePhotoChange}
            newPhoto={newPhoto}
          />
          <div className="leave">
            <span onClick={handleLeaveAccountModal}>[ 회원 탈퇴 ]</span>
          </div>
          <ProFile myInfo={myInfo} />
          <PhoneNumber
            // oldNumber={myInfo.phone}
            userName={userName}
            // verifyNum={verifyNum}
            // verifyNum에 SMS인증번호 받아서 넣기
            toggleChange={_toggleChange}
            handleSend={_handleSend}
            handleChange={_handleChange}
            handleVerify={_handleVerify}
            setConfirmNum={setConfirmNum}
            isPhoneChanged={isPhoneChanged}
            isEditPhone={isEditPhone}
            isSend={isSend}
            isVerified={isVerified}
            phone={state.phone}
            phoneF={phoneF}
            phoneS={phoneS}
            confirmNum={confirmNum}
            setState={_setState}
            userNo={myInfo.user_no}
          />
          {!!myInfo.local_id && (
            <ChangePassword
              password={password}
              passwordConfirm={passwordConfirm}
              setPassword={setPassword}
              setPasswordConfirm={setPasswordConfirm}
            />
          )}
          <Introduction introduce={state.introduce} setState={_setState} />
          <SnsList
            snsTitle="페이스북"
            snsTitleEng="Facebook"
            name="facebookUrl"
            url={state.facebookUrl}
            setState={_setState}
          />
          <SnsList
            snsTitle="인스타그램"
            snsTitleEng="Instagram"
            name="instagramUrl"
            url={state.instagramUrl}
            setState={_setState}
          />
          <SnsList
            snsTitle="유튜브채널"
            snsTitleEng="Youtube Channel"
            name="youtubeUrl"
            url={state.youtubeUrl}
            setState={_setState}
          />
          <SnsList
            snsTitle="블로그"
            snsTitleEng="blog"
            name="blogUrl"
            url={state.blogUrl}
            setState={_setState}
          />
          <SnsList
            snsTitle="트위터"
            snsTitleEng="twitter"
            name="twitterUrl"
            url={state.twitterUrl}
            setState={_setState}
          />
          <div className="wrapper_save">
            <Button className="short" onClick={() => _handleSave()}>
              저장
            </Button>
          </div>
        </Content>
        <InfiniteLogo />
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          min-width: 1366px;
          height: auto;
          background-color: #1e1e25;
          overflow: hidden;
          margin: 0 auto;
          padding-bottom: 170px;
          position: relative;
        }
        .container .nav {
          margin-top: 150px;
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          text-align: right;
          margin-bottom: 35px;
        }
        .container .nav span {
          display: inline-block;
        }
        .container .nav img {
          display: inline-block;
          margin: 0 20px;
        }
        .container .nav .position {
          font-weight: 300;
        }
        .container .title {
          text-align: center;
          color: #fff;
          font-size: 50px;
          font-weight: 400;
          margin-bottom: 83px;
        }
        .wrapper_save {
          margin-top: 40px;
          text-align: center;
        }
        .leave {
          width: 600px;
          margin: 0 auto 10px auto;
          color: #aaa;
          text-align: right;
        }

        .leave span {
          cursor: pointer;
        }
      `}</style>
    </Layout>
  );
};

MyPageEditComponent.propTypes = {
  myInfo: PropTypes.object,
  handleSave: PropTypes.func,
};

export default MyPageEditComponent;
