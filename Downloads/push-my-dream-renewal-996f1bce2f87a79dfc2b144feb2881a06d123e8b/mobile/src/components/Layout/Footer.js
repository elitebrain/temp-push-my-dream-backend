import React from "react";

const Footer = (props) => {
  const { className, style } = props;

  return (
    <div
      className={`container_footer ${className ? className : ""}`}
      style={style}
    >
      <div className="wrapper_footer">
        {/* <div className="terms">
          <span>이용약관</span>
          <span>개인정보처리방침</span>
          <span>수수료정책</span>
          <span>청소년보호정책</span>
        </div> */}
        <div className="content">
          <span className="mr_6px">(주)칸컴스</span>
          <span className="add mr_6px">
            주소: 서울시 구로구 디지털로 32가길 25 티타운 빌딩 202호 칸스튜디오
          </span>
          <span className="line pr_22px">대표자명: 정관용</span>
          <span>사업자번호: 618-81-25795</span>
        </div>
        <div className="content">
          <span className="line">통신판매업: 제2019-서울구로-0472호</span>
          <span>연락처: 02-6101-9285</span>
          <span>이메일: contact@khancomes.com</span>
        </div>
        <div className="content">
          <span>ⓒ2020 (주)칸컴스</span>
        </div>
      </div>
      <style jsx>{`
        .wrapper_footer > .content:nth-child(2) > span:last-child {
          padding-right: 0;
        }
        .wrapper_footer > .content:nth-child(2) > span {
          padding-right: 22px;
        }
        .mr_6px {
          margin-right: 6px;
        }
        .container_footer {
          width: 100%;
          min-width: 320px;
          height: 202px;
          background-color: #141418;
          padding-top: 30px; /* .terms 주석해제 할 시 padding-top 삭제할것 */
          box-sizing: border-box;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        .wrapper_footer {
          max-width: 1200px;
          min-width: 320px;
          width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
          margin: auto;
        }
        .footer_none {
          display: none;
        }
        .terms {
          font-size: 12px;
          color: #fff;
          padding-top: 30px;
          padding-bottom: 7px;
        }
        .terms > span {
          display: inline-block;
          padding: 0 11px;
        }
        .terms > span:first-child {
          padding-left: 0;
        }
        .terms > span:last-child {
          padding-right: 0;
        }
        .content {
          font-size: 11px;
          color: #b2b2b2;
        }
        .content > span {
          position: relative;
          display: inline-block;
          margin-bottom: 6px;
          /* padding: 0 13px; */
        }
        .wrapper_footer > .content:nth-child(2) > span:before,
        .content > .line:before {
          position: absolute;
          content: "";
          right: 10px;
          border-left: 1px solid #2b2b31;
          border-right: 1px solid #565660;
          height: 13px;
          top: 50%;
          transform: translateY(-50%);
        }
        .wrapper_footer > .content:nth-child(2) > span:last-child:before,
        .content > span:last-child:before {
          border-right: none;
          border-left: none;
        }
        .content .pl_11px {
          padding-left: 11px;
        }
        .content .pr_22px {
          padding-right: 22px;
        }
        @media (max-width: 320px) {
          .content {
            font-size: 10px;
          }
          .content .add {
            word-spacing: -3px;
          }
        }
      `}</style>
    </div>
  );
};

export default Footer;
