// import React from "react";
// import App from "next/app";

// class Service extends App {
//   render() {
//     const { Component, pageProps } = this.props;
//     return (
//       <>
//         <Component {...pageProps} />
//         <style jsx global>{`
//           @import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900i&display=swap");
//           @import url("//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css");
//           * {
//             margin: 0;
//             padding: 0;
//           }
//           h1,
//           h2,
//           h3,
//           h4,
//           h5 {
//             margin-block-start: initial;
//             margin-block-end: initial;
//             margin-inline-start: initial;
//             margin-inline-end: initial;
//             font-weight: 400;
//           }
//           body {
//             font-family: "Montserrat", "Spoqa Han Sans", sans-serif;
//           }
//         `}</style>
//       </>
//     );
//   }
// }

// export default Service;
import "intersection-observer";
import React from "react";
import App, { Container } from "next/app";

import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import Helmet from "react-helmet";
import createStore from "store";

import Modal from "components/Common/Modal";
import PushCount from "components/Hoc/withPushCount";

import { LOAD_USER_REQUEST } from "store/reducers/user";
import {
  LOAD_COMMON_DATA_REQUEST,
  SET_AGENT,
  LOAD_ALL_PUSH_REQUEST,
  SET_SSE_PUSH_REQUEST,
} from "store/reducers/common";
import { CLOSE_MODAL } from "store/reducers/modal";
import {
  MAIN_BLACK_COLOR,
  BACKGROUND_BLACK_COLOR,
} from "shared/constants/colors";

import { getCookie } from "shared/functions";
import { userApi, videoApi, getCsrfToken } from "shared/api";

import iconVideoReload from "public/assets/image/icon_video_reload.png";
import iconVideoPlay from "public/assets/image/icon_video_play.png";
import iconVideoPause from "public/assets/image/icon_video_pause.png";

// import { firebaseCloudMessaging } from "public/utils/webPush";

// const firebaseConfig = {
//   apiKey: "AIzaSyAA5aWYtptS4gY574nAYWvfFteUz-lBu8M",
//   authDomain: "testproject-a012e.firebaseapp.com",
//   databaseURL: "https://testproject-a012e.firebaseio.com",
//   projectId: "testproject-a012e",
//   storageBucket: "testproject-a012e.appspot.com",
//   messagingSenderId: "598988264817",
//   appId: "1:598988264817:web:7c71c4ddb9edf75bc4d2d0",
//   measurementId: "G-H8WD67X01E",
// };
// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   console.log("\n---------- ", firebase.messaging);
// }
// const messaging = firebase.messaging();
// console.log("messaging", messaging);

// messaging
//   .requestPermission()
//   .then(function () {
//     console.log("허가");
//     return messaging.getToken();
//   })
//   .then(function (token) {
//     console.log(token);
//   })
//   .catch(function (err) {
//     console.log(`fcm error : ${err}`);
//   });

class Service extends App {
  componentDidMount() {
    // firebaseCloudMessaging.init();
    const body = document.querySelector("body");
    body.style.background = BACKGROUND_BLACK_COLOR;

    const tempId = getCookie("temp_id");
    if (!tempId) {
      let today = new Date(Date.now() + 86400000 * 60);
      document.cookie = `temp_id=${Math.ceil(
        Math.random() * 10000000000
      )};path=/;expires=${today.toUTCString()}`;
    }
    try {
      if (window.opener.location.host !== document.location.host) {
        window.opener = null;
      }
    } catch (error) {
      window.opener = null;
    }

    // 리덕스에 agent 설정
    if (!this.props.store.getState().common.agent) {
      this.props.store.dispatch({
        type: SET_AGENT,
        payload: navigator.userAgent,
      });
    }
    this.props.store.dispatch({
      type: SET_SSE_PUSH_REQUEST,
    });

    console.log("_app update");
  }
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Helmet>
          <title>푸쉬 마이 드림</title>
          {/* <meta name="viewport" content="width=1920, initial-scale=0.1" /> */}
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
          <meta
            name="viewport"
            content="height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          ></meta>
          <link
            rel="stylesheet"
            type="text/css"
            charset="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />

          {/* <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=GTM-5D23QW6"
          ></script> */}
          <script src="/static/google-tag-manager.js" />
        </Helmet>

        <Provider store={store}>
          <PushCount>
            <Component {...pageProps} />
          </PushCount>
          <Modal />
          <style jsx global>{`
            @import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900i&display=swap");
            @import url("//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css");
           
            @font-face {
              font-family: 'GmarketSansTTFMedium';
              src: url('/assets/fonts/GmarketSansTTFMedium.ttf') format('truetype');
            }
            @font-face {
              font-family: 'SDGothicNeocTTF';
              src: url('/assets/fonts/SDGothicNeocTTF-cRg.eot'),
                url('/assets/fonts/SDGothicNeocTTF-cRg.woff2') format('woff2'),
                url('/assets/fonts/SDGothicNeocTTF-cRg.woff') format('woff'),
                url('/assets/fonts/SDGothicNeocTTF-cRg.ttf') format('truetype');
            }
 
            
            * {
              margin: 0;
              padding: 0;
              -webkit-overflow-scrolling: touch;
            }
            h1,
            h2,
            h3,
            h4,
            h5 {
              margin-block-start: initial;
              margin-block-end: initial;
              margin-inline-start: initial;
              margin-inline-end: initial;
              font-weight: 400;
            }
            body {
              font-family: "SDGothicNeocTTF", "Montserrat", "Spoqa Han Sans", sans-serif;
            }
            button:focus {
              outline: 0;
            }
            .modal_rectangle {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 1000;
            }
            .modal_rectangle .modal__overlay {
              position: absolute;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.6);
              z-index: 0;
            }
            .modal_rectangle .modal__content {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              z-index: 1;
              background-color: #f0f0f0;
              width: 70vw;
              height: 70vh;
              padding: 20px;
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
                0 6px 6px rgba(0, 0, 0, 0.23);
              overflow-y: auto;
              box-sizing: border-box;
            }
        
       
            .vjs-big-play-button {
              display: none !important;
            }
            .video-js .vjs-play-control .vjs-icon-placeholder:before,
            .video-js .vjs-fullscreen-control .vjs-icon-placeholder:before {
              font-size: 32px;
            }
            .video-js .vjs-picture-in-picture-control {
              display: none !important;
            }
            .video-js .vjs-volume-panel {
              font-size: 17px;
              width: 35px;
            }
            .video-js .vjs-control,
            .video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-hover {
              width: 35px !important;
            }
            .video-js .vjs-control {
              margin-right: 5px;
            }
            .vjs-remaining-time.vjs-time-control.vjs-control {
              width: 60px !important;
            }
            .video-js .vjs-volume-panel > button {
              width: 100%;
            }
            .vjs-button > .vjs-icon-placeholder:before {
              line-height: 45px !important;
            }
            .video-js .vjs-play-progress {
              background-color: transparent;
              background: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100.51%);
            }
            .video-js .vjs-remaining-time span {
              font-size: 16px;
              line-height: 45px;
            }
            .video-js .vjs-play-control.vjs-playing .vjs-icon-placeholder:before {
              /* pauseIcon */
              content: "";
              background: url('${iconVideoPause}');
              background-size: contain;
              background-repeat: no-repeat;
              margin: 15px 10px;
              width: 15px;
              height: 20px;
              color:transparent;
            }
            .video-js .vjs-play-control .vjs-icon-placeholder:before {
              /* startIcon */
              content: "";
              background: url('${iconVideoPlay}');
              background-size: contain;
              background-repeat: no-repeat;
              margin: 15px 10px;
              width: 15px;
              height: 20px;
              color:transparent;
            }
            .video-js .vjs-play-control.vjs-ended .vjs-icon-placeholder:before {
              /* reloadIcon */
              content: "";
              border-radius: 50%;
              background: url('${iconVideoReload}');
              background-size: contain;
              background-repeat: no-repeat;
              margin: 11px 6px;
              width: 23px;
              height: 28px;      
              color:transparent;
            }
            .vjs-ended .vjs-poster {
              display: inline-block !important;
            }
            .ql-align-center {
              text-align: center;
            }
            .ql-indent-1 {
              padding-left: 3em;
            }
            .ql-indent-2 {
              padding-left: 6em;
            }
            .ql-indent-3 {
              padding-left: 9em;
            }
            .ql-indent-4 {
              padding-left: 12em;
            }
            .ql-indent-5 {
              padding-left: 15em;
            }
            .ql-indent-6 {
              padding-left: 18em;
            }
            .ql-indent-7 {
              padding-left: 21em;
            }
            .ql-indent-8 {
              padding-left: 24em;
            }
            input::-webkit-input-placeholder {
              color: #bbb;
            }
            input::-ms-input-placeholder {
              color: #bbb;
            }
            textarea::-webkit-input-placeholder {
              color: #bbb;
            }
            textarea::-ms-input-placeholder {
              color: #bbb;
            }
            .no_drag {
              -webkit-user-select: none;
              -khtml-user-select: none;
              -moz-user-select: none;
              -o-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
            .fadein {
              animation: .5s fadein linear;
            }
            @keyframes fadein {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
        </Provider>
      </Container>
    );
  }
}

Service.getInitialProps = async (appContext) => {
  const { ctx, Component } = appContext;
  const { isServer, store } = ctx;

  // 서버일 때만 작 동
  if (isServer) {
    // 쿠키는 브라우저에만 있기 떄문에 브라우저에서 서버사이드 렌더링을 할 시 쿠키를 가져와서 사용해야한다.
    const cookie = ctx.req.headers.cookie;

    if (cookie) {
      userApi.defaults.headers.cookie = cookie;
      videoApi.defaults.headers.cookie = cookie;
    }

    // const temp = await getCsrfToken();

    // 로그인 했을 때 항상 유저 정보를 가져오게 한다.
    await store.dispatch({
      type: LOAD_USER_REQUEST,
    });

    await store.dispatch({
      type: LOAD_COMMON_DATA_REQUEST,
    });

    await store.dispatch({
      type: LOAD_ALL_PUSH_REQUEST,
    });
  }

  // 클라이언트일시
  else {
    // 투표에서 모달을 라우터 푸쉬하면 모달이 안꺼지게 하기 위해서
    if (ctx.pathname !== "/vote/[vote_no]/item") {
      // 스크롤 최상단으로 이동
      // window.scrollTo(0, 0);
      if (store.getState().modal.view) {
        store.dispatch({
          type: CLOSE_MODAL,
        });
      }
    }
  }

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return {
    pageProps,
    store,
  };
};

export default withRedux(createStore)(withReduxSaga(Service));
