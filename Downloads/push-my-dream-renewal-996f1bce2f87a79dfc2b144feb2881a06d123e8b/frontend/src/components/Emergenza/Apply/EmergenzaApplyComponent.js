import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";

// import arrow_right_ico from "public/assets/icon/arrow_right_ico(white).svg";
import Body from "components/Layout/Body";
// import InfiniteLogo from "components/Common/InfiniteLogo";
import ApplyInput from "./ApplyInput/ApplyInput";
import Button from "components/Common/Button";
import PreReservationTitle from "components/Common/PreReservationTitle";
// import UploadInfo from "components/Upload/UploadInfo";
// import UploadIntroduction from "compoents/Upload/UploadIntroduction";
import withLogged from "components/Hoc/withLogged";
import TermsAgree from "components/User/SignUp/TermsAgree";

const EmergenzaApplyComponent = (props) => {
  const {
    fileRef,
    handleApply,
    handleSave,
    emergenzaTeamNo,
    isApply,
    setIsApply,
    applicationForm,
  } = props;
  const { user_no } = useSelector((state) => state.user);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState({
    teamName: "",
    memberCount: 2,
    genre: "",
    genre_etc: "",
    phone1: "",
    phone2: "",
    introduce: "",
    releaseCount: 1,
    career: 1,
    averageAge: "",
    instrumentList: ["", ""],
    memberEmailList: ["", ""],
    Video: [],
    isUploadVideo: false,
  });
  const [termsState, setTermsState] = useState({
    termsEmergenza: isApply,
  });
  console.log("isApply", isApply, "termsState", termsState);
  useEffect(() => {
    setTermsState((prevState) =>
      Object.assign({}, prevState, { termsEmergenza: isApply })
    );
  }, [isApply]);
  useEffect(() => {
    if (applicationForm.emergenza_team_no) {
      const instrumentList = applicationForm.instrumentList;
      const memberEmailList = applicationForm.memberEmailList;
      if (instrumentList.length < applicationForm.member_count) {
        const count = instrumentList.length;
        for (let i = 0; i < applicationForm.member_count - count; i++) {
          instrumentList.push("");
        }
      }
      if (memberEmailList.length < applicationForm.member_count) {
        const count = memberEmailList.length;
        for (let i = 0; i < applicationForm.member_count - count; i++) {
          memberEmailList.push("");
        }
      }
      setState({
        teamName: applicationForm.team_name,
        memberCount: applicationForm.member_count,
        genre: applicationForm.genre,
        genre_etc:
          applicationForm.genre === "기타" ? applicationForm.genre_etc : "",
        phone1: applicationForm.phone1,
        phone2: applicationForm.phone2,
        introduce: applicationForm.introduce,
        releaseCount: applicationForm.release_count,
        career: applicationForm.career,
        averageAge: applicationForm.average_age,
        instrumentList,
        memberEmailList,
        Video: applicationForm.Video,
        isUploadVideo: applicationForm.isUploadVideo,
      });
      setIsApply(true);
      if (applicationForm.isUploadVideo) {
        setFileName(applicationForm.Video[0].original_file_name);
        setDescription(applicationForm.Video[0].description);
      }
    }
  }, [applicationForm]);

  const _handleText = (e) => {
    const { name, value } = e.target;
    setState((prevState) => Object.assign({}, prevState, { [name]: value }));
  };
  const _handleMemberCount = (e) => {
    const { value } = e.target;
    const instrumentList = [];
    const memberEmailList = [];
    for (let i = 0; i < parseInt(value); i++) {
      instrumentList.push("");
      memberEmailList.push("");
    }
    setState((prevState) =>
      Object.assign({}, prevState, {
        memberCount: value,
        instrumentList,
        memberEmailList,
      })
    );
  };
  const _handleTextInArr = (e, idx) => {
    const { name, value } = e.target;
    setState((prevState) => {
      const arr = prevState[name];
      arr[idx] = value;
      return Object.assign({}, prevState, { [name]: arr });
    });
  };
  const _handleApply = () => {
    const alertMsg = _checkInputRequired();
    const uploadData = { fileName, description };
    if (alertMsg.length === 0) {
      handleApply(Object.assign({}, state, { userNo: user_no }), uploadData);
    } else {
      alert(alertMsg);
    }
  };
  const _handleSave = () => {
    const alertMsg = _checkInputRequired();
    const uploadData = { fileName, description };
    if (alertMsg.length === 0) {
      if (state.Video.length > 0) {
        const videoNo = state.Video[0].video_no;
        handleSave(
          Object.assign(
            {},
            state,
            {
              genre_etc: state.genre === "기타" ? state.genre_etc : state.genre,
            },
            { emergenzaTeamNo, videoNo, description }
          ),
          uploadData
        );
      } else {
        handleSave(
          Object.assign(
            {},
            state,
            {
              genre_etc: state.genre === "기타" ? state.genre_etc : state.genre,
            },
            { emergenzaTeamNo }
          ),
          uploadData
        );
      }
    } else {
      alert(alertMsg);
    }
  };
  const _checkInputRequired = () => {
    let alertMsg = "";
    console.log("termsState", termsState);
    if (state.teamName.length === 0) {
      alertMsg = "팀명을 입력해주세요.";
    } else if (state.genre === "기타" && state.genre_etc === "") {
      alertMsg = "기타 장르를 입력해주세요.";
    } else if (state.instrumentList.indexOf("") !== -1) {
      alertMsg = "악기구성을 모두 선택해주세요.";
    } else if (state.averageAge.length === 0) {
      alertMsg = "평균 연령을 입력해주세요.";
    } else if (state.phone1.length === 0) {
      alertMsg = "휴대전화1을 입력해주세요.";
    } else if (state.phone2.length === 0) {
      alertMsg = "휴대전화2를 입력해주세요.";
    } else if (state.memberEmailList.indexOf("") !== -1) {
      alertMsg = "멤버 전원의 이메일을 모두 입력해주세요.";
    } else if (state.introduce.length === 0) {
      alertMsg = "밴드소개 및 참여목적을 입력해주세요.";
    } else if (fileName.length === 0) {
      alertMsg = "동영상을 등록해주세요.";
    } else if (description.length === 0) {
      alertMsg = "영상소개를 입력해주세요.";
    } else if (!termsState.termsEmergenza) {
      alertMsg = "에머겐자 약관에 동의해주세요.";
    }
    return alertMsg;
  };
  // 동영상 등록 ~
  const attachFile = (e) => {
    fileRef.current.click();
  };
  const fileChange = (e) => {
    const file = fileRef.current.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  const descChange = (e) => {
    const { value } = e.target;
    setDescription(value);
  };
  // ~ 동영상 등록
  const _handleTermsChange = (e) => {
    const name = e.target.id;
    setTermsState((prevState) =>
      Object.assign({}, prevState, { [name]: !prevState[name] })
    );
  };
  console.log("state", state);
  return (
    <Layout>
      <div className="container" style={{ overflow: "hidden" }}>
        <div className="mypage_title">
          <PreReservationTitle
            title="참가신청서"
            navigationList={["EmergenzaApply"]}
          />
        </div>
        <Body>
          <div className="container" style={{ backgroundColor: "#1e1e25" }}>
            <Content
              style={{
                position: "relative",
                paddingBottom: "160px",
                paddingTop: "75px",
              }}
            >
              <h1>에머겐자 세계밴드대회 2020</h1>
              <ApplyInput
                state={state}
                handleText={_handleText}
                handleMemberCount={_handleMemberCount}
                handleTextInArr={_handleTextInArr}
              />
              <div className="register_video">
                <div className="file_name">
                  <span>파일명</span>
                  <input type="text" readOnly value={fileName} />
                  {/* <button onClick={attachFile}>파일찾기</button> */}
                  <Button className="rectangle short" onClick={attachFile}>
                    파일찾기
                  </Button>
                  <input
                    ref={fileRef}
                    type="file"
                    className="input_file"
                    onChange={fileChange}
                  />
                </div>
                <div className="noti aaa">
                  ※ 1GB 미만 10분 이내의 영상만 업로드 가능합니다.
                </div>
                <div className="intro_video">
                  <span>영상소개</span>
                  <textarea
                    placeholder="100자 이하로 작성해주세요."
                    value={description}
                    onChange={descChange}
                    maxLength={100}
                  ></textarea>
                </div>
              </div>
              <div className="noti">
                ※ 공정한 심사를 위해 영상안에&nbsp;
                <span className="red">수정 및 편집된 오디오 업로드는 불가</span>
                능합니다.
              </div>
              <div className="noti">
                ※ 영상업로드가 정상적으로 되지 않는 경우
                contact@pushmydream.com(담당자 문의: 010-2024-9610)로
                <br /> 참가정보와 영상을 보내주시기 바랍니다.
              </div>
              <TermsAgree
                emergenza
                termsState={termsState}
                handleTermsChange={_handleTermsChange}
                visible={true}
                termsList={[
                  {
                    terms_no: 3,
                    terms_gubun: "에머겐자 이용 약관",
                    id: "termsEmergenza",
                  },
                ]}
              />
              <div className="apply">
                {isApply ? (
                  <Button
                    style={{ width: "180px" }}
                    onClick={() => _handleSave()}
                  >
                    수정 하기
                  </Button>
                ) : (
                  <Button
                    style={{ width: "180px" }}
                    onClick={() => _handleApply()}
                  >
                    참가 신청 하기
                  </Button>
                )}
              </div>
            </Content>
          </div>
        </Body>
      </div>
      <style jsx>{`
        .mt_60px {
          margin-top: 60px;
        }
        .input_file {
          display: none !important;
        }
        .register_video {
          margin-top: 45px;
          width: 500px;
          margin: auto;
        }
        .file_name {
          margin-bottom: 20px;
        }
        .file_name > span {
          width: 70px;
          font-size: 20px;
          font-weight: 400;
          color: #fff;
          margin-right: 34px;
          display: inline-block;
        }
        .file_name > input {
          width: 266px;
          height: 60px;
          padding-left: 30px;
          font-size: 16px;
          color: #fff;
          font-weight: 400;
          display: inline-block;
          margin-right: 10px;
          border-radius: 15px;
          background-color: #444455;
          border: none;
        }
        .intro_video > span {
          vertical-align: top;
          width: 80px;
          font-size: 20px;
          font-weight: 400;
          color: #fff;
          margin-right: 25px;
          display: inline-block;
        }
        .intro_video > textarea {
          width: 395px;
          height: 170px;
          border-radius: 15px;
          padding: 20px 30px;
          display: inline-block;
          box-sizing: border-box;
          font-size: 16px;
          font-weight: 400;
          line-height: 28px;
        }
        h1 {
          font-size: 36px;
          text-align: center;
          color: #fff;
          margin-bottom: 60px;
        }
        .apply {
          text-align: center;
          margin-top: 50px;
        }
        .container {
          width: 100%;
          height: auto;
          min-width: 1366px;
          /* background-color: #1e1e25; */
          /* overflow: hidden; */
          margin: 0 auto;
          position: relative;
        }
        .container .mypage_title {
          padding-top: 95px;
          height: 295px;
          position: relative;
          z-index: -1;
          background-color: #1e1e25;
          box-sizing: border-box;
        }
        .container .mypage_title .content_box {
          width: 1200px;
          position: absolute;
          top: 50%;
        }
        .container .mypage_title .nav {
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          text-align: right;
        }
        .container .mypage_title .nav span {
          display: inline-block;
        }
        .container .mypage_title .nav img {
          display: inline-block;
          margin: 0 20px;
        }
        .container .mypage_title .nav .position {
          font-weight: 300;
        }
        .container .title {
          text-align: center;
          color: #fff;
          font-size: 50px;
          font-weight: 400;
          margin-top: 30px;
          margin-bottom: 83px;
        }
        .container button {
          width: 135px;
          height: 60px;
          background-color: #f38400;
          border-radius: 50px;
          border: none;
          color: #fff;
          font-size: 18px;
          font-weight: 400;
          margin: 0 auto;
          margin-top: 40px;
          display: block;
        }
        .noti {
          font-weight: 500;
          text-align: center;
          color: #fff;
          margin: 20px auto;
          text-align: initial;
          width: 500px;
          word-break: keep-all;
        }
        .red {
          color: red;
        }
        .aaa {
          color: #aaa;
        }
      `}</style>
    </Layout>
  );
};

EmergenzaApplyComponent.propTypes = {
  handleApply: PropTypes.func,
  handleSave: PropTypes.func,
  emergenzaTeamNo: PropTypes.number,
  isApply: PropTypes.bool,
  setIsApply: PropTypes.func,
};

export default withLogged(EmergenzaApplyComponent, true);
