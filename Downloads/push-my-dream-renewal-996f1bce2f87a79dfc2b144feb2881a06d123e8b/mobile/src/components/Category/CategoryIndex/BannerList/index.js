import React from "react";

import List from "components/Common/List";
import BannerItem from "components/Common/BannerItem";

const BannerList = ({ list }) => {
  const onRedirect = useCallback((redirect_url) => {
    window.open(redirect_url, "redirectBanner");
  }, []);

  const renderBanner = useCallback(
    (banner) => (
      <BannerItem
        key={banner.banner_no}
        banner={banner}
        onRedirect={onRedirect}
      />
    ),
    []
  );

  return <List list={list} renderItem={renderBanner} />;
};

export default BannerList;
