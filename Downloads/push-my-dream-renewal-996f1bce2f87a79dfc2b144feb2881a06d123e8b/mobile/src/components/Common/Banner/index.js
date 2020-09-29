import React from "react";
import Router from "next/router";
import { handleRedirectUrl } from "shared/functions";

const Banner = ({ banner, redirectUrl }) => {
  // const _handleBanner = (url) => {
  //   if (url.indexOf("vote_") !== -1) {
  //     window.location.href = "https://emergenza.khanteum.com/vote";
  //   } else if (url.indexOf("khanteum_app_event_banner") !== -1) {
  //     Router.push("/event");
  //   } else if (url.indexOf("emergenza") === -1) {
  //     Router.push("/upload");
  //   } else {
  //     window.location.href = "https://emergenza.khanteum.com";
  //   }
  // };
  const _handleBanner = (url) => {
    handleRedirectUrl(url);
  };

  return (
    <div className="banner">
      <img src={banner} onClick={() => _handleBanner(redirectUrl)} />
      <style jsx>{`
        .banner {
          width: 100%;
        }

        .banner img {
          vertical-align: top;
          /* width: 100%; */
          width: 100%;
          height: auto;
        }

        @media screen and (min-width: 768px) {
          .banner {
            overflow: hidden;
            position: relative;
            height: 278px;
          }

          .banner img {
            width: auto;
            height: 100%;

            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default React.memo(Banner);
