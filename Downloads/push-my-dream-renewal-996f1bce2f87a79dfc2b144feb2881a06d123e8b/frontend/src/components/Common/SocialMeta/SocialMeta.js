import Helmet from "react-helmet";
import { useRouter } from "next/router";

import { ORIGIN_SHARE_URL } from "shared/constants/variables";

export default ({ title, description, image, keywords }) => {
  const router = useRouter();

  return (
    <Helmet>
      <meta name="twitter:site" content="khanteum" />
      <meta
        name="twitter:card"
        content={image ? "summary_large_image" : "summary"}
      />
      <meta property="og:url" content={ORIGIN_SHARE_URL + router.asPath} />
      <meta property="og:type" content="website" />
      {title && <meta property="og:title" content={title} />}
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={`${image}`} />}
      {keywords && <meta name="keywords" content={keywords} />}
    </Helmet>
  );
};
