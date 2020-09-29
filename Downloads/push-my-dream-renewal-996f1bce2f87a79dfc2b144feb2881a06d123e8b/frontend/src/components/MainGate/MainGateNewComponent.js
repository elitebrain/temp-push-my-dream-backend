import React from "react";

import { BLACK_COLOR, MAIN_BLACK_COLOR } from "shared/constants/colors";

import Layout from "components/Layout/Layout";
import BannerComponent from "components/Apple/Index/Banner/BannerComponent";
import Content from "components/Layout/Content";
import ContentHeader from "components/Common/ContentHeader";

import VideoList from "./VideoList";
import Gate from "./Gate/Gate";
import VoteJoin from "./VoteJoin/VoteJoin";
import TopProducerList from "./TopProducerList/TopProducerList";
import VideoItem from "components/Common/VideoItem";

const MainGateNewComponent = () => {
  return (
    <Layout>
      <div className="banner">
        <span>배너영역</span>
      </div>
      <div className="container">
        <Content>
          <ContentHeader
            title="Hot Video"
            mobileSelect
            style={{ fontWeight: "bold", paddingTop: "0" }}
          />
          <VideoList ItemComponent={<VideoItem viewIcon isLiked />} />
        </Content>
      </div>
      <div className="container gate">
        <Content>
          <Gate
            subTitle="지상최대 밴드 경연 대회"
            title="EMERGENZA 한국 예선"
            href="/emergenza"
            isEmergenza
          />
        </Content>
      </div>
      <div className="container">
        <Content>
          <ContentHeader
            title="핫톡"
            mobileSelect
            style={{ fontWeight: "bold", paddingTop: "0" }}
          />
          <VideoList ItemComponent={<VideoItem chatIcon isLiked />} />
        </Content>
      </div>
      <div className="container gate">
        <Content>
          <Gate
            subTitle="내 몸매 저작권 만들기 프로젝트"
            title="PUSH MY APPLE"
            href="/apple"
          />
        </Content>
      </div>

      <div className="container">
        <Content style={{ marginBottom: "40px" }}>
          <VoteJoin />
        </Content>
        <Content style={{ marginBottom: "40px" }}>
          <ContentHeader
            title="뉴업로드"
            mobileSelect
            style={{ fontWeight: "bold", paddingTop: "0" }}
          />
          <VideoList ItemComponent={<VideoItem followIcon isLiked />} />
        </Content>
        <Content style={{ marginBottom: "40px" }}>
          <ContentHeader
            title="주간 프로듀서"
            mobileSelect
            style={{ fontWeight: "bold", paddingTop: "0" }}
          />
          <TopProducerList />
        </Content>
      </div>
      <style jsx>{`
        .banner {
          position: relative;
          width: 100%;
          height: 290px;
          padding-top: 52px;
          /* background-image: url(/_next/static/images/banner02-a112fbe….jpg); */
          background-size: cover;
          background-position: center center;
        }
        .banner span {
          color: #fff;
          font-size: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .container {
          width: 100%;
          height: auto;
          background-color: ${BLACK_COLOR};
          overflow: hidden;
          padding: 40px 0;
        }
        .container.gate {
          background-color: ${MAIN_BLACK_COLOR};
          padding: 30px 0;
        }
      `}</style>
    </Layout>
  );
};

export default MainGateNewComponent;
