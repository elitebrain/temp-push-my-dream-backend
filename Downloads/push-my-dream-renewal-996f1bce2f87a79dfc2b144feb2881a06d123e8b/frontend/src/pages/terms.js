import React, { useState, useEffect } from "react";
import { commonApi } from "shared/api";

import { findSearchStringValue } from "shared/functions";

const Terms = props => {
  const { gubunProps } = props;
  const [html, setHtml] = useState("");
  useEffect(() => {
    const gubun =
      gubunProps || findSearchStringValue(window.location.search, "gubun");
    commonApi.get("/terms").then(res => {
      switch (gubun) {
        case "service":
          return setHtml(res.data[0].terms_contents);
        case "privacy":
          return setHtml(res.data[1].terms_contents);
        case "emergenza":
          return setHtml(res.data[2].terms_contents);
        case "youth":
          return setHtml(res.data[3].terms_contents);
        default:
          return setHtml(res.data[0].terms_contents);
      }
    });
  }, [gubunProps]);
  return (
    <div className="container">
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
      <style jsx>{`
        .container {
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default Terms;
