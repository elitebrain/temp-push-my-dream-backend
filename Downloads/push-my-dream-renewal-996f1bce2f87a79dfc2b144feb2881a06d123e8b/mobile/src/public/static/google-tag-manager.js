// (function(w, d, s, l, i) {
//   try {
//     w[l] = w[l] || [];
//     w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
//     var f = d.getElementsByTagName(s)[0],
//       j = d.createElement(s),
//       dl = l != "dataLayer" ? "&l=" + l : "";
//     j.async = true;
//     j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
//     f.parentNode.insertBefore(j, f);
//   } catch (error) {
//     console.log("errrrrrrrrrrrrrr", error);
//   }
// })(window, document, "script", "dataLayer", "GTM-5D23QW6");

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "GTM-5D23QW6");
gtag("config", "UA-155392444-2");
