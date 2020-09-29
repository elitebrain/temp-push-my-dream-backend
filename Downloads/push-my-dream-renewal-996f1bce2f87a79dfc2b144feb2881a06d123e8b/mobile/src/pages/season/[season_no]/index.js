import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Helmet from "react-helmet";
import Dynamic from "next/dynamic";

import SeasonInfo from "components/Season/SeasonInfo";
import SingerSeasonInfo from "components/Season/SeasonInfo/Custom/SingerSeasonInfo";

import { categoryApi } from "shared/api";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const SeasonInfoPage = ({ season }) => {
  const Router = useRouter();

  /**
   * seasonInfo가 존재하지 않는다면
   * 렌더링을 하지않고 에러페이지로 이동시킨다.
   */
  useEffect(() => {
    if (!season) {
      Router.replace("/error");
    }
  }, [season]);

  if (!season) {
    return null;
  }

  console.log(season);

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 시즌 정보</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        {season.category_level3_no === 63 ? (
          <SingerSeasonInfo season={season} />
        ) : (
          <SeasonInfo season={season} />
        )}
      </DynamicNewLayout>
    </>
  );
};

SeasonInfoPage.getInitialProps = async (context) => {
  const { season_no } = context.query;

  console.log("season_no", season_no);

  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }

    const {
      data: { season },
    } = await categoryApi.get(`/seasons/${season_no}`, {
      withCredentials: true,
      ...serverCondition,
    });

    return { season };
  } catch (error) {
    console.error(error);
    return { season: null };
  }

  return;
};

export default SeasonInfoPage;
