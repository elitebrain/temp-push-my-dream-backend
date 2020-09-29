import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import Helmet from "react-helmet";
import Pixel from "components/Pixel/facebook/Pixel";

class ServiceDocument extends Document {
  static async getInitialProps(ctx) {
    const documentProps = await Document.getInitialProps(ctx);
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    return { ...documentProps, helmet: Helmet.renderStatic() };
  }

  //react-helmet ssr 적용

  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  // should render on <head>
  get helmetHeadComponents() {
    // console.log("this.props.helmet.meta : ", this.props.helmet.meta);
    return Object.keys(this.props.helmet)
      .filter((el) => el !== "htmlAttributes" && el !== "bodyAttributes")
      .map((el) => this.props.helmet[el].toComponent());
  }

  render() {
    return (
      <Html {...this.helmetHtmlAttrComponents}>
        <Head>
          <Pixel />
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '530255477678641');
  fbq('track', 'PageView');`,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=530255477678641&ev=PageView&noscript=1" />`,
            }}
          ></noscript> */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=GTM-5D23QW6"
          ></script>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-155392444-2"
          ></script>
          <script src="/static/google-tag-manager.js" />
          {this.helmetHeadComponents}
          <link
            rel="stylesheet"
            href="https://unpkg.com/swiper@5.0.0/css/swiper.min.css"
          />
          {/* <link
            rel="stylesheet"eeeeeeeeeee
          /> */}
          <link
            href="https://vjs.zencdn.net/7.6.6/video-js.css"
            rel="stylesheet"
          />
          <script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
          {/* <script
            type="text/javascript"
            src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
          ></script> */}
          <meta name="mobile-web-app-capable" content="yes"></meta>
          <meta name="apple-mobile-web-app-capable" content="yes"></meta>
          <meta name="format-detection" content="telephone=no"></meta>
          {/* ios 전화번호 인식 방지 */}
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-5D23QW6"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          <Main />
          <NextScript />
          <script src="https://vjs.zencdn.net/7.6.6/video.js"></script>
        </body>
      </Html>
    );
  }
}

export default ServiceDocument;
