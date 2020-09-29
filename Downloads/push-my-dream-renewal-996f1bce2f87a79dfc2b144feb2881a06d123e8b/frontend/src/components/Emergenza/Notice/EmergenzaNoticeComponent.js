import React, { createContext, useState } from "react";
import Layout from "components/Layout/Layout";
import BannerComponent from "components/Common/BannerComponent";
import Banner_bg from "public/assets/image/emergenza_banner_bg.png";
import ScheduleImg from "./ScheduleImg/ScheduleImg";
import Benefit from "./Benefit";
import CompanyMap from "./Benefit/CompanyMap";
import Content from "components/Layout/Content";
import Body from "components/Layout/Body";

export const EmergenzaContext = createContext();

const EmergenzaNoticeComponent = () => {
  const [benefitMenu, setBenefitMenu] = useState(1);

  return (
    <EmergenzaContext.Provider value={{ benefitMenu, setBenefitMenu }}>
      <Layout>
        <Body>
          <div className="emergenza_notice_container">
            <BannerComponent
              banner_no={1}
              category={"EMERGENZA"}
              className="notice"
              desc={
                <>
                  <p>
                    1992년 이탈리아 로마 EMERGENZA FESTIVAL 개최를 시작으로 점차
                    규모를 확장시켜
                  </p>
                  <p>
                    현재 전세계 34개국 150여개 도시에서 매년 동시 다발적으로
                    개최하고 있는 대회입니다.
                  </p>
                  <br />
                  <p>
                    여러분도 에머겐자 밴드대회에 참여 하여 월드 스타의 반열에
                    오른 NICO & VINZ 가 될 수 있습니다.
                  </p>
                </>
              }
              startDate={"2020-01-01"}
              endDate={"2020-01-31"}
              url={Banner_bg}
              emergenzaStyle
              style={{ height: "600px" }}
            />
            <ScheduleImg />
            <Benefit />
            {benefitMenu === 3 && <CompanyMap />}
          </div>
        </Body>
      </Layout>
      <style jsx>{`
        .emergenza_notice_container {
          background-color: rgb(30, 30, 37);
        }
      `}</style>
    </EmergenzaContext.Provider>
  );
};

export default EmergenzaNoticeComponent;
