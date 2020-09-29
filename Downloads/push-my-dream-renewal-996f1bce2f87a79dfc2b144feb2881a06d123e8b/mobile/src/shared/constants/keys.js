import { URL_DEV, URL_TEST, URL } from "shared/constants/variables";

export const KAKAO_KEY = "83be5868a25ff51f7890b6dc7c37d6aa";
// export const NAVER_KEY = "wk_iuqmcguvlkCuw2EUo";
export const NAVER_KEY = "OWtDEuazHgzYrlAg2lQm";
export const NAVER_CALLBACK =
  process.env.env === "production"
    ? `${URL}/login`
    : process.env.env === "test"
    ? `${URL_TEST}/login`
    : `${URL_DEV}/login`;

export const GOOGLE_KEY =
  "930972079359-r7ec3un7084jmrgiti78hq3qba1v8cp2.apps.googleusercontent.com";
// export const KAKAO_KEY = "bfd88b27c727a3fd5be297c97210b404";
// export const NAVER_KEY = "wk_iuqmcguvlkCuw2EUo";
// export const NAVER_CALLBACK = "http://127.0.0.1:3000/login";
// export const GOOGLE_KEY =
//   "494880914416-sdbgd4skg5n857mnhbqg9shii76trhln.apps.googleusercontent.com";
