export const COUNTERANIMATE_DEFAULT_TIME = 0.5;
export const COUNTERANIMATE_BETWEEN = 0.2;

// export const URL_DEV = "http://14.138.190.51";
export const URL_DEV = "http://127.0.0.1";
export const URL_TEST = "https://test.khanteum.com";
export const URL = "https://khanteum.com";
export const URL_MOBILE = "https://m.khanteum.com";
export const ADMIN_SERVER = "https://admin.khanteum.com:4000";

export const MORE_VIDEO_COUNT = 10;
export const NEW_VIDEO_MORE_COUNT = 20;

export const VIDEO_INEDX_COUNT = 250;

/**
 * 이미지 관련
 */
export const IMAGE_SERVER = "http://61.97.191.199";
export const THUMBNAIL_WIDTH = 110;
export const THUMBNAIL_HEIGHT = 168;
export const USERVIDEO_THUMBNAIL_WIDTH = 375;
export const USERVIDEO_THUMBNAIL_HEIGHT = 175;

export const AVATAR_WIDTH = 100;
export const AVATAR_HEIGHT = 100;

// export const NICE_URL = "https://khanteum.com:4000/api/v1/checkplus/mobile";
export const NICE_URL =
  process.env.env === "development"
    ? `${URL_DEV}:4000/api/v2/checkplus/mobile`
    : process.env.env === "test"
    ? `${URL_TEST}:4000/api/v2/checkplus/mobile`
    : `${URL}:4000/api/v2/checkplus/mobile`;

export const NICE_ORIGIN_URL =
  process.env.env === "development"
    ? `${URL_DEV}:4000`
    : process.env.env === "test"
    ? `${URL_TEST}:4000`
    : `${URL}:4000`;

export const API_URL =
  process.env.env === "development"
    ? // ? "http://14.138.190.51:14000/api/v1"
      `${URL_DEV}:4000/api/v2`
    : process.env.env === "test"
    ? `${URL_TEST}:4000/api/v2`
    : `${URL}:4000/api/v2`;

export const VIDEO_FILE_SIZE = 1024 * 1024 * 1024; //1GB
export const THUMBNAIL_FILE_SIZE = 1024 * 1024 * 10; // 10MB

export const VIDEO_DURATION = 600; // 10분

export const ORIGIN_SHARE_URL =
  process.env.env === "development"
    ? `${URL_DEV}:3030`
    : process.env.env === "test"
    ? URL_TEST
    : URL;

export const ORIGIN_SHARE_MOBILE_URL =
  process.env.env === "development"
    ? `${URL_DEV}:3030`
    : process.env.env === "test"
    ? URL_TEST
    : URL_MOBILE;

export const EMERGENZA_VOTE_NO = 60;

// export const NICE_URL = "http://127.0.0.1:4000/api/v2/checkplus";
// export const NICE_ORIGIN_URL = "http://127.0.0.1:4000";
