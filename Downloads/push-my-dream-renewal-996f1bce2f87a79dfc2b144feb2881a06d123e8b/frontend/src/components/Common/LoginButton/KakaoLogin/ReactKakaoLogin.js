"use strict";
function _interopDefault(t) {
  return t && "object" == typeof t && "default" in t ? t.default : t;
}
var React = require("react"),
  React__default = _interopDefault(React),
  extendStatics = function(t, e) {
    return (extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(t, e) {
          t.__proto__ = e;
        }) ||
      function(t, e) {
        for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
      })(t, e);
  };
function __extends(t, e) {
  function o() {
    this.constructor = t;
  }
  extendStatics(t, e),
    (t.prototype =
      null === e ? Object.create(e) : ((o.prototype = e.prototype), new o()));
}
var KakaoLogin = (function(t) {
  function e() {
    var e = (null !== t && t.apply(this, arguments)) || this;
    return (
      (e.onBtnClick = function() {
        var t = e.props,
          o = t.throughTalk,
          n = void 0 !== o && o,
          i = t.version,
          r = void 0 === i ? "v2" : i,
          a = t.getProfile,
          c = void 0 !== a && a,
          u = t.onSuccess,
          s = t.onFailure;
        window.Kakao &&
          window.Kakao.Auth.login({
            throughTalk: n,
            success: function(t) {
              c
                ? window.Kakao.API.request({
                    url: "/" + r + "/user/me",
                    success: function(e) {
                      u({ response: t, profile: e });
                    },
                    fail: s
                  })
                : u({ response: t });
            },
            fail: s
          });
      }),
      e
    );
  }
  return (
    __extends(e, t),
    (e.prototype.componentDidMount = function() {
      var t = this.props.jsKey;
      !(function(e, o) {
        if (null == document.getElementById(e)) {
          var n = document.createElement("script");
          (n.id = e),
            (n.src = "//developers.kakao.com/sdk/js/kakao.min.js"),
            (n.onload = function() {
              window.Kakao.init(t);
            }),
            document.head.appendChild(n);
        }
      })("kakao-sdk");
    }),
    (e.prototype.render = function() {
      var t = this.props,
        o = t.render,
        n = t.className,
        i = void 0 === n ? "" : n,
        r = t.useDefaultStyle,
        a = void 0 !== r && r,
        c = t.children,
        u = void 0 === c ? null : c,
        s = t.buttonText,
        l = void 0 === s ? "Login with Kakao" : s;
      return "function" == typeof o
        ? o({ onClick: this.onBtnClick })
        : React__default.createElement(
            "button",
            {
              type: "button",
              className: i,
              onClick: this.onBtnClick,
              style: a ? e.DEFAULT_STYLE : void 0
            },
            u || l
          );
    }),
    (e.DEFAULT_STYLE = {
      display: "inline-block",
      padding: "0px",
      width: "222px",
      height: "49px",
      lineHeight: "49px",
      color: "rgb(60, 30, 30)",
      backgroundColor: "rgb(255, 235, 0)",
      border: "1px solid transparent",
      borderRadius: "3px",
      fontSize: "16px",
      textAlign: "center"
    }),
    e
  );
})(React.PureComponent);
module.exports = KakaoLogin;
