import axios from "axios";

import { URL_DEV, URL_TEST, URL } from "shared/constants/variables";
// IE���� axios ��� ��� ĳ�̵Ǵ� ���� ����
axios.defaults.headers.common = {
  Pragma: "no-cache",
};

axios.defaults.baseURL = `${
  process.env.env === "development"
    ? URL_DEV
    : process.env.env === "test"
    ? URL_TEST
    : URL
}:4000`;
axios.defaults.withCredentials = true;

export const getCsrfToken = () => axios.get("/token");

export const categoryApi = axios.create({
  baseURL:
    process.env.env === "development"
      ? `${URL_DEV}:4000/api/v2/category`
      : process.env.env === "test"
      ? `${URL_TEST}:4000/api/v2/category`
      : `${URL}:4000/api/v2/category`,
});

export const emergenzaApi = axios.create({
  baseURL:
    process.env.env === "development"
      ? `${URL_DEV}:4000/api/v2/emergenza`
      : process.env.env === "test"
      ? `${URL_TEST}:4000/api/v2/emergenza`
      : `${URL}:4000/api/v2/emergenza`,
});

export const mainApi = axios.create({
  baseURL:
    process.env.env === "development"
      ? `${URL_DEV}:4000/api/v2/main`
      : process.env.env === "test"
      ? `${URL_TEST}:4000/api/v2/main`
      : `${URL}:4000/api/v2/main`,
  timeout: 10000,
});

export const userApi = axios.create({
  baseURL:
    process.env.env === "development"
      ? `${URL_DEV}:4000/api/v2/user`
      : process.env.env === "test"
      ? `${URL_TEST}:4000/api/v2/user`
      : `${URL}:4000/api/v2/user`,
});

export const commonApi = axios.create({
  baseURL:
    process.env.env === "development"
      ? `${URL_DEV}:4000/api/v2/common`
      : process.env.env === "test"
      ? `${URL_TEST}:4000/api/v2/common`
      : `${URL}:4000/api/v2/common`,
});

export const commentApi = axios.create({
  baseURL:
    process.env.env === "development"
      ? `${URL_DEV}:4000/api/v2/comment`
      : process.env.env === "test"
      ? `${URL_TEST}:4000/api/v2/comment`
      : `${URL}:4000/api/v2/comment`,
});

export const voteApi = axios.create({
  baseURL:
    process.env.env === "development"
      ? `${URL_DEV}:4000/api/v2/vote`
      : process.env.env === "test"
      ? `${URL_TEST}:4000/api/v2/vote`
      : `${URL}:4000/api/v2/vote`,
});

export const videoApi = axios.create({
  baseURL:
    process.env.env === "development"
      ? `${URL_DEV}:4000/api/v2/video`
      : process.env.env === "test"
      ? `${URL_TEST}:4000/api/v2/video`
      : `${URL}:4000/api/v2/video`,
});

export const noticeApi = axios.create({
  baseURL:
    process.env.env === "development"
      ? `${URL_DEV}:4000/api/v2/notice`
      : process.env.env === "test"
      ? `${URL_TEST}:4000/api/v2/notice`
      : `${URL}:4000/api/v2/notice`,
});

// export const uploadApi = axios.create({
//   baseURL: `${URL_DEV}:23000/api/v1/video`,

//   headers: { "Content-Type": "multipart/form-data" },
//   withCredentials: true,
// });

export const uploadApi = axios.create({
  baseURL: "https://upload.khanteum.com/api/v1/video",
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
});
