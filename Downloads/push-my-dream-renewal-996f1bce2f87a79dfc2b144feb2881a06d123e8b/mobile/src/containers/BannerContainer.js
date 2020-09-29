import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import Banner from "components/Common/Banner";

import { commonApi } from "shared/api";

const BannerContainer = () => {
  const [banners, setBanners] = useState([]);
  const [renderBanners, setRenderBanners] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    let isCancelled = false;
    async function fetchBanners() {
      try {
        const result = await commonApi.get("/banners");

        setBanners(result.data.banners);
        if (!isCancelled) {
          if (window.innerWidth < 768) {
            setRenderBanners(
              result.data.banners.filter((banner) => banner.type === "mobile")
            );
          } else {
            setRenderBanners(
              result.data.banners.filter((banner) => banner.type === "pc")
            );
          }
          setIsLoaded(true);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error(error);
          setIsLoaded(true);
        }
      }
    }

    fetchBanners();
    return function cleanup() {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeEvent);

    function resizeEvent(e) {
      if (e.srcElement.innerWidth < 768) {
        setRenderBanners(banners.filter((banner) => banner.type === "mobile"));
        setWidth(e.srcElement.innerWidth);
      } else {
        setRenderBanners(banners.filter((banner) => banner.type === "pc"));
      }
    }

    return function cleanup() {
      window.removeEventListener("resize", resizeEvent);
    };
  }, [banners]);

  if (isLoaded && !banners.length) {
    return null;
  }
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <div className="banner_container">
      <Slider dotClass="dotClass" lazyLoad="progressive" {...settings}>
        {renderBanners &&
          renderBanners.map((banner) => (
            <Banner
              banner={banner.banner_url}
              redirectUrl={banner.redirect_url}
              key={banner.banner_no}
            />
          ))}
      </Slider>
      <style jsx>{`
        .banner_container {
          position: relative;
          min-height: 278px;
          background-color: #444;
          /* width: 100%; */
        }

        @media screen and (max-width: 768px) {
          .banner_container {
            min-height: calc(${width}px * 340 / 750);
          }
        }
      `}</style>
    </div>
  );
};

export default BannerContainer;
