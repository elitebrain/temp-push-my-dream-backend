import React from "react";
import PropTypes from "prop-types";

import select_ico from "public/assets/icon/select_arrow(gray).svg";

const ApplyInput = props => {
  const { state, handleText, handleMemberCount, handleTextInArr } = props;
  // const temp = {
  //   *teamName: "팀명",
  //   *memberCount: 4,
  //   genre: "모던락",
  //   releaseCount: 1,
  //   career: 1 (1: 1년 미만, 2: 1~3년, 3: 4~7년, 4: 8년 이상),
  //   averageAge: 20,
  //   *phone1: "010-1111-2222",
  //   phone2: "010-2222-3333",
  //   *introduce: "밴드소개 및 참가목적 입니다.",
  //   instrumentList: ["보컬","기타","베이스","드럼"],
  //   memberEmailList: ["a@naver.com","b@naver.com","c@naver.com"]
  // }
  return (
    <div className="apply_input">
      <div className="team_name">
        <span>팀명</span>
        <input
          type="text"
          value={state.teamName}
          name="teamName"
          onChange={handleText}
        />
      </div>
      <div className="genre">
        <span>장르</span>
        <div className="select_list">
          <select
            value={state.genre}
            name="genre"
            onChange={handleText}
            style={{ color: state.genre === "" ? "#bfbfbf" : "#000" }}
          >
            <option value="" style={{ color: "#bfbfbf" }}>
              선택
            </option>
            <option value="모던락">모던락</option>
            <option value="하드락">하드락</option>
            <option value="재즈">재즈</option>
            <option value="힙합">힙합</option>
            <option value="펑키">펑키</option>
            <option value="팝">팝</option>
            <option value="어쿠스틱">어쿠스틱</option>
            <option value="월드뮤직">월드뮤직</option>
            <option value="국악">국악</option>
            <option value="EDM">EDM</option>
            <option value="메탈">메탈</option>
            <option value="인스트루먼탈">인스트루먼탈</option>
            <option value="코어">코어</option>
            <option value="퓨전">퓨전</option>
            <option value="기타">기타</option>
          </select>
          {state.genre === "기타" && (
            <input
              type="text"
              value={state.genre_etc}
              name="genre_etc"
              className="genre_etc"
              onChange={handleText}
              placeholder="기타 장르"
            />
          )}
        </div>
      </div>
      <div className="member_length">
        <span>멤버수</span>
        <select value={state.memberCount} onChange={handleMemberCount}>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>
      <div className="instrument">
        <span>악기구성</span>
        <div className="select_list">
          {state &&
            state.instrumentList &&
            state.instrumentList.map((item, i) => (
              <select
                key={i}
                value={item}
                name="instrumentList"
                onChange={e => handleTextInArr(e, i)}
                style={{ color: item === "" ? "#bfbfbf" : "#000" }}
              >
                <option value="" style={{ color: "#bfbfbf" }}>
                  악기선택
                </option>
                <option value="보컬">보컬</option>
                <option value="어쿠스틱기타">어쿠스틱기타</option>
                <option value="일렉기타">일렉기타</option>
                <option value="베이스기타">베이스기타</option>
                <option value="피아노">피아노</option>
                <option value="신스">신스</option>
                <option value="드럼">드럼</option>
                <option value="퍼커션">퍼커션</option>
                <option value="래퍼">래퍼</option>
                <option value="DJ">DJ</option>
                <option value="색소폰">색소폰</option>
                <option value="트럼펫">트럼펫</option>
                <option value="트럼본">트럼본</option>
                <option value="바이올린">바이올린</option>
                <option value="플룻">플룻</option>
                <option value="기타">기타</option>
              </select>
            ))}
        </div>
      </div>
      <div className="member_length album_length">
        <span>발매곡수</span>
        <select
          value={state.releaseCount}
          name="releaseCount"
          onChange={handleText}
        >
          <option value={1}>없음</option>
          <option value={2}>1-9곡</option>
          <option value={3}>10곡 이상</option>
        </select>
      </div>
      <div className="noti">
        <span>＊발매곡수는 앨범의 형태와 무관하게 수록된 곡 수</span>
      </div>
      <div className="member_length date">
        <span>활동기간</span>
        <select value={state.career} name="career" onChange={handleText}>
          <option value={1}>1년미만</option>
          <option value={2}>1~3년</option>
          <option value={3}>4-7년</option>
          <option value={4}>8년이상</option>
        </select>
      </div>
      <div className="age">
        <span>평균연령</span>
        <input
          type="text"
          value={state.averageAge}
          name="averageAge"
          onChange={handleText}
          placeholder="20.7"
        />
        <span className="age_kor">세</span>
      </div>
      <div className="noti">
        <span>＊평균연령은 멤버전체 연령 합산 나누기 멤버 수</span>
      </div>
      <div className="a_contact_address">
        <span>연락처</span>
        <div className="phone_num">
          <input
            type="text"
            value={state.phone1}
            name="phone1"
            onChange={handleText}
            placeholder="휴대전화 1"
          />
          <input
            type="text"
            value={state.phone2}
            name="phone2"
            onChange={handleText}
            placeholder="휴대전화 2"
          />
        </div>

        <div className="noti">
          <span>(대표 휴대폰번호2개 + 멤버 전원 이메일주소)</span>
        </div>
        <div className="member_email">
          {state &&
            state.memberEmailList &&
            state.memberEmailList.map((item, i) => (
              <input
                key={i}
                type="text"
                value={item}
                name="memberEmailList"
                onChange={e => handleTextInArr(e, i)}
                placeholder="이메일 주소"
              />
            ))}
        </div>
      </div>

      <div className="introduction">
        <span>밴드소개 및 참가목적</span>
        <textarea
          value={state.introduce}
          name="introduce"
          onChange={handleText}
          placeholder="상세하게 기입"
        />
      </div>
      <style jsx>{`
        .apply_input {
          width: 500px;
          /* height: 248px; */
          margin: 0 auto;
        }
        .apply_input > div {
          margin-bottom: 25px;
        }
        .apply_input span {
          display: inline-block;
          vertical-align: middle;
          /* width: 74px; */
          width: 80px;
          margin-right: 20px;
          font-size: 20px;
          font-weight: 400;
          color: #fff;
        }
        .apply_input button {
          width: 90px;
          height: 60px;
          color: #fff;
          font-size: 16px;
          font-weight: 400;
          background-color: #f38400;
          border-radius: 15px;
          border: none;
        }
        .apply_input .team_name input {
          width: calc(100% - 134px);
          height: 60px;
          display: inline-block;
          vertical-align: middle;
          padding-left: 30px;
          color: #fff;
          font-size: 16px;
          font-weight: 400;
          background-color: #444455;
          border-radius: 15px;
          border: none;
        }
        .apply_input .member_length {
          display: inline-block;
          vertical-align: middle;
        }
        .apply_input .member_length select {
          width: 160px;
          height: 60px;
          border: none;
          border-radius: 15px;
          padding-left: 30px;
          margin-right: 10px;
          font-size: 16px;
          font-weight: 400;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: url(${select_ico}) 88% / 13% no-repeat #fff;
        }
        .genre .genre_etc {
          width: 190px;
          height: 60px;
          box-sizing: border-box;
          display: inline-block;
          padding-left: 30px;
          font-size: 16px;
          font-weight: 400;
          border-radius: 15px;
          border: none;
        }
        .apply_input .select_list {
          width: calc(100% - 104px);
          vertical-align: middle;
          display: inline-block;
          padding: 0;
        }
        .apply_input .select_list select {
          width: 190px;
          height: 60px;
          margin-bottom: 10px;
          border: none;
          border-radius: 15px;
          padding-left: 30px;
          font-size: 16px;
          font-weight: 400;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: url(${select_ico}) 88% / 9% no-repeat #fff;
        }
        .apply_input .select_list option {
          color: #000;
        }
        .select_list > select:nth-child(odd) {
          margin-right: 16px;
        }
        .apply_input .age {
          display: inline-block;
          position: relative;
        }
        .apply_input .age input {
          width: 160px;
          height: 60px;
          box-sizing: border-box;
          display: inline-block;
          padding-left: 30px;
          font-size: 16px;
          font-weight: 400;
          border-radius: 15px;
          border: none;
          margin-right: 10px;
        }
        .apply_input .age .age_kor {
          position: absolute;
          right: 15px;
          top: 15px;
          color: black;
          width: 30px;
          margin-right: 0;
        }
        .apply_input .a_contact_address .phone_num {
          display: inline-block;
        }
        .apply_input .a_contact_address .phone_num input {
          width: 193px;
          height: 60px;
          box-sizing: border-box;
          display: inline-block;
          padding-left: 30px;
          font-size: 16px;
          font-weight: 400;
          border-radius: 15px;
          border: none;
          margin-right: 10px;
        }
        .apply_input .a_contact_address .phone_num input:last-child {
          margin-right: 0;
        }
        .apply_input .a_contact_address .noti {
          margin: 20px 0;
          margin-left: 105px;
        }
        .apply_input .a_contact_address .member_email {
          margin-left: 105px;
        }
        .apply_input .a_contact_address .member_email input {
          width: 365px;
          height: 60px;
          display: inline-block;
          padding-left: 30px;
          font-size: 16px;
          font-weight: 400;
          border-radius: 15px;
          border: none;
          margin-bottom: 20px;
          margin-right: 20px;
        }
        .apply_input .noti {
          display: block;
          margin-left: 105px;
        }
        .apply_input .noti span {
          width: 100%;
          display: block;
          color: #b2b2b2;
          font-size: 15px;
        }
        .introduction span {
          width: 106px;
          margin-right: 6px;
          margin-bottom: 10px;
          display: inline-block;
          vertical-align: top;
        }
        .introduction textarea {
          width: calc(100% - 112px);
          height: 170px;
          display: inline-block;
          padding-left: 30px;
          padding-top: 20px;
          box-sizing: border-box;
          font-size: 16px;
          font-weight: 400;
          line-height: 28px;
          border-radius: 15px;
        }
      `}</style>
    </div>
  );
};

ApplyInput.propTypes = {
  state: PropTypes.object,
  handleText: PropTypes.func,
  handleMemberCount: PropTypes.func,
  handleTextInArr: PropTypes.func
};

export default ApplyInput;
