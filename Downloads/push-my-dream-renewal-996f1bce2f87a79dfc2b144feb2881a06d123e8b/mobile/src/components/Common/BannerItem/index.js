import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

const BannerItem = ({ banner, onRedirect }) => {
  const Router = useRouter();

  // 배너 클릭 시 이동
  const onRedirect = useCallback(
    (redirect_url) => {
      if (redirect_url) {
        Router.push(redirect_url);
      }
    },
    [Router]
  );
  return (
    <div
      className="banner_item"
      onClick={onRedirect.bind(this, banner.redirect_url)}
    >
      <img className="banner_image" alt="banner" src={banner.banner_url} />
      <style jsx>{`
        .banner_item {
          width: 100%;
          height: 290px;
        }
      `}</style>
    </div>
  );
};

BannerItem.propTypes = {
  banner: PropsTypes.shape({
    redirect_url: PropTypes.string,
    banner_url: PropTypes.string.isRequired,
  }),
  onRedirect: PropTypes.func.isRequired,
};

export default BannerItem;
