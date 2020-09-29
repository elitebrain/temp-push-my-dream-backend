export const COUNTERANIMATE_DEFAULT_TIME = 0.5;
export const COUNTERANIMATE_BETWEEN = 0.2;

export const URL_DEV = "http://127.0.0.1";
export const URL_TEST = "https://test.khanteum.com";
export const URL = "https://khanteum.com";
const URL_MOBILE = "https://m.khanteum.com";

export const NICE_URL =
  process.env.env === "development"
    ? `${URL_DEV}:4000/api/v2/checkplus`
    : process.env.env === "test"
    ? `${URL_TEST}:4000/api/v2/checkplus`
    : `${URL}:4000/api/v2/checkplus`;

export const NICE_ORIGIN_URL =
  process.env.env === "development"
    ? `${URL_DEV}:4000`
    : process.env.env === "test"
    ? `${URL_TEST}:4000`
    : `${URL}:4000`;

export const VIDEO_FILE_SIZE = 1024 * 1024 * 1024; //1GB
export const VIDEO_DURATION = 600; // 10분

export const ORIGIN_SHARE_URL =
  process.env.env === "development"
    ? `${URL_DEV}:3000`
    : process.env.env === "test"
    ? URL_TEST
    : URL;

export const EMERGENZA_VOTE_NO = 60;

// export const NICE_URL = "http://127.0.0.1:4000/api/v1/checkplus";
// export const NICE_ORIGIN_URL = "http://127.0.0.1:4000";
