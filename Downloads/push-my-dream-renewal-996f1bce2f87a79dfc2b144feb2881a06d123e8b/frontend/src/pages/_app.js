import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";

import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import Helmet from "react-helmet";
// import ReactPixel from "react-facebook-pixel";

import { userApi, videoApi, commonApi } from "shared/api";
import { getCookie } from "shared/functions";
import createStore from "store";

import Pixel from "components/Pixel/facebook/Pixel";
import Modal from "components/Common/Modal";
import PushCount from "components/Hoc/withPushCount";

import { LOAD_USER_REQUEST } from "store/reducers/user";
import { LOAD_COMMON_DATA_REQUEST } from "store/reducers/common";
import { CLOSE_MODAL } from "store/reducers/modal";
import { MAIN_BLACK_COLOR } from "shared/constants/colors";
import CircleMenu from "components/Common/CircleMenu";

class Service extends App {
  constructor(props) {
    super(props);
    this.state = {
      isWarning: false,
    };
  }

  componentDidMount() {
    const body = document.querySelector("body");
    body.style.background = MAIN_BLACK_COLOR;

    const agent = window.navigator.userAgent.toLowerCase();
    const tempId = getCookie("temp_id");
    if (!tempId) {
      let today = new Date(Date.now() + 86400000 * 60);
      document.cookie = `temp_id=${Math.ceil(
        Math.random() * 10000000000
      )};path=/;expires=${today.toUTCString()}`;
    }

    if (
      (window.navigator.appName === "Netscape" &&
        agent.indexOf("trident") !== -1) ||
      agent.indexOf("msie") !== -1
    ) {
      this.setState({ isWarning: true });
    } else {
      this.setState({ isWarning: false });
    }
    // 오프너 초기화
    try {
      if (window.opener.location.host !== document.location.host) {
        window.opener = null;
      }
    } catch (error) {
      window.opener = null;
    }
    // ReactPixel.init("530255477678641");
    // ReactPixel.init("520982495231381");
    // ReactPixel.pageView();
    // <!-- Facebook Pixel Code -->
    // <script>
    //   !function(f,b,e,v,n,t,s)
    //   {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    //   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    //   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    //   n.queue=[];t=b.createElement(e);t.async=!0;
    //   t.src=v;s=b.getElementsByTagName(e)[0];
    //   s.parentNode.insertBefore(t,s)}(window, document,'script',
    //   'https://connect.facebook.net/en_US/fbevents.js');
    //   fbq('init', '520982495231381');
    //   fbq('track', 'PageView');
    // </script>
    // <noscript><img height="1" width="1" style="display:none"
    //   src="https://www.facebook.com/tr?id=520982495231381&ev=PageView&noscript=1"
    // /></noscript>
    // // <!-- End Facebook Pixel Code -->
    // const scriptEl = document.createElement("script");
    // scriptEl.innerHTML = `!function(f,b,e,v,n,t,s)
    // {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    // n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    // if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    // n.queue=[];t=b.createElement(e);t.async=!0;
    // t.src=v;s=b.getElementsByTagName(e)[0];
    // s.parentNode.insertBefore(t,s)}(window, document,'script',
    // 'https://connect.facebook.net/en_US/fbevents.js');
    // fbq('init', '520982495231381');
    // fbq('track', 'PageView');`;
    // const noscriptEl = document.createElement("noscript");
    // noscriptEl.innerHTML = `<img height="1" width="1" style="display:none"
    // src="https://www.facebook.com/tr?id=520982495231381&ev=PageView&noscript=1" />`;
    // const scriptEl2 = document.createElement("script");
    // scriptEl2.async = true;
    // scriptEl2.src = `https://www.facebook.com/signals/iwl.js?pixel_id=520982495231381`;
    // const headEl = document.querySelector("head");
    // const bodyEl = document.querySelector("body");
    // // bodyEl.appendChild("<!-- Facebook Pixel Code -->");
    // bodyEl.appendChild(scriptEl);
    // bodyEl.appendChild(noscriptEl);

    // // bodyEl.appendChild(scriptEl2);
    // // bodyEl.appendChild("<!-- End Facebook Pixel Code -->");
  }
  render() {
    const { Component, pageProps, store } = this.props;
    const { isWarning } = this.state;
    return (
      <>
        <Helmet>
          <title>푸쉬 마이 드림</title>
          <meta name="viewport" content="width=1920, initial-scale=1" />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=GTM-5D23QW6"
          ></script>
          <script src="/static/google-tag-manager.js" />
        </Helmet>
        <Head>
          <Pixel />
        </Head>
        <Provider store={store}>
          {isWarning && (
            <div className="warning_ie">
              <h3>khanteum no longer supports this web browser</h3>
              <button onClick={() => this.setState({ isWarning: false })}>
                ignore
              </button>
            </div>
          )}
          <PushCount>
            <Component {...pageProps} />
          </PushCount>
          <Modal />
          <CircleMenu />
          <style jsx>{`
            .warning_ie {
              max-width: 1903px;
              display: ${isWarning ? "block" : "none"};
              position: relative;
              width: 100%;
              text-align: center;
              background-image: linear-gradient(#feefae, #fae692);
              color: #211e14;
              border-bottom: 1px solid #b3a569;
              font-size: 16px;
              height: 50px;
              line-height: 50px;
            }
            .warning_ie > h3 {
              display: inline-block;
              margin: 0;
            }
            .warning_ie > button {
              display: inline-block;
              margin-left: 100px;
              padding: 0 12px;
              border: none;
              background-color: #f38400;
              color: #fff;
              border-radius: 5px;
              height: 30px;
              line-height: 30px;
            }
            .warning_ie > button:hover {
              cursor: pointer;
            }
          `}</style>
          <style jsx global>{`
            @import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900i&display=swap");
            @import url("//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css");
            * {
              margin: 0;
              padding: 0;
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
              font-family: "Montserrat", "Spoqa Han Sans", sans-serif;
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
              background-color: rgba(0, 0, 0, 0.8);
              z-index: 0;
            }
            .modal_rectangle .modal__content {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              z-index: 1;
              background-color: #f0f0f0;
              width: 500px;
              height: 600px;
              padding: 30px;
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
                0 6px 6px rgba(0, 0, 0, 0.23);
              overflow-y: auto;
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
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
          `}</style>
        </Provider>
      </>
    );
  }
}

Service.getInitialProps = async (appContext) => {
  const { ctx, Component } = appContext;
  const { isServer, store } = ctx;

  // 서버일 때만 작동
  if (isServer) {
    // 쿠키는 브라우저에만 있기 떄문에 브라우저에서 서버사이드 렌더링을 할 시 쿠키를 가져와서 사용해야한다.
    const cookie = ctx.req.headers.cookie;

    if (cookie) {
      userApi.defaults.headers.cookie = cookie;

      videoApi.defaults.headers.cookie = cookie;

      commonApi.defaults.headers.cookie = cookie;
    }

    // 로그인 했을 때 항상 유저 정보를 가져오게 한다.
    await store.dispatch({
      type: LOAD_USER_REQUEST,
    });
    await store.dispatch({
      type: LOAD_COMMON_DATA_REQUEST,
    });
  }
  // 클라이언트일시
  else {
    // 투표에서 모달을 라우터 푸쉬하면 모달이 안꺼지게 하기 위해서
    if (ctx.pathname !== "/vote/[vote_no]/item") {
      // 스크롤 최상단으로 이동
      window.scrollTo(0, 0);
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
  return { pageProps };
};

export default withRedux(createStore)(withReduxSaga(Service));
// export default withRedux(createStore)(Service);
