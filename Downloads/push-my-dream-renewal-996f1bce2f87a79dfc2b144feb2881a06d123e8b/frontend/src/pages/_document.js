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
      .filter(el => el !== "htmlAttributes" && el !== "bodyAttributes")
      .map(el => this.props.helmet[el].toComponent());
  }
  render() {
    return (
      // <html>
      //   <body>
      //     {/* Google Tag Manager (noscript) */}
      //     <noscript>
      //       <iframe
      //         src="https://www.googletagmanager.com/ns.html?id=GTM-5D23QW6"
      //         height="0"
      //         width="0"
      //         style={{ display: "none", visibility: "hidden" }}
      //       ></iframe>
      //     </noscript>
      //     {/* End Google Tag Manager (noscript) */}
      //     <Main />
      //     <Pixel />
      //     <NextScript />
      //   </body>
      // </html>
      <Html {...this.helmetHtmlAttrComponents}>
        <Head>
          {this.helmetHeadComponents}
          <Pixel />
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
        </body>
      </Html>
    );
  }
}

export default ServiceDocument;
