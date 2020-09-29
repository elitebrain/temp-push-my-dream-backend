import React, { useState, useEffect } from "react";
import Link from "next/link";
import Helmet from "react-helmet";
import Dynamic from "next/dynamic";

import NewHeader from "components/Layout/NewLayout/NewHeader";

import khanteumAppEventDetailTop from "public/assets/image/khanteum_app_event_detail_top.jpg";
import khanteumAppEventDetailBottom from "public/assets/image/khanteum_app_event_detail_bottom.jpg";
import EventContainer from "containers/EventContainer";
const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const Event = () => {
  const [pictureHeight, setPictureHeight] = useState("auto");
  useEffect(() => {
    setPictureHeight(`${window.innerHeight - 50}px`);
  }, []);
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 이벤트</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        <EventContainer />
      </DynamicNewLayout>
    </>
    // <div className="container">
    //   <NewHeader />
    //   <div className="wrapper">
    //     <picture>
    //       <img src={khanteumAppEventDetailTop} alt="khanteum_app_event" />
    //     </picture>
    //     <Link href="/">
    //       <picture style={{ marginTop: "-4px" }}>
    //         <img src={khanteumAppEventDetailBottom} alt="khanteum_app_event" />
    //       </picture>
    //     </Link>
    //   </div>
    //   <style jsx>{`
    //     .container {
    //       width: 100vw;
    //       height: 100vh;
    //       overflow-y: auto;
    //     }
    //     .wrapper {
    //       position: relative;
    //       display: block;
    //       width: 100%;
    //       height: ${pictureHeight};
    //       max-width: 400px;
    //       margin: auto;
    //       overflow: auto;
    //     }
    //     picture {
    //       display: block;
    //     }
    //     img {
    //       width: 100%;
    //       height: auto;
    //     }
    //     .cover_link {
    //       position: absolute;
    //       width: 100%;
    //       height: 100px;
    //       bottom: 0;
    //     }
    //   `}</style>
    // </div>
  );
};

export default Event;
