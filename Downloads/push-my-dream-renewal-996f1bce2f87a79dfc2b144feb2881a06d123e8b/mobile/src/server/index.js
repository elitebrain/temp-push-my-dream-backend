require("dotenv").config();
const https = require("https");
const http = require("http");
const fs = require("fs");

const next = require("next");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const { DEV_PORT, NODE_ENV: env } = process.env;

const port = ["production", "test"].indexOf(env) === -1 ? DEV_PORT : 80;
// const port = parseInt(process.env.PORT, 10) || 3000;
const dev = ["production", "test"].indexOf(env) === -1;
const app = next({ dev, dir: "./src" });
const handle = app.getRequestHandler();

const options = {
  key: fs.readFileSync(__dirname + "/keys/key.pem"),
  cert: fs.readFileSync(__dirname + "/keys/cert.pem"),
};

app
  .prepare()
  .then(() => {
    const server = express();

    // const serviceWorkers = [
    //   {
    //     filename: "service-worker.js",
    //     path: "./service-worker.js",
    //   },
    //   {
    //     filename: "firebase-messaging-sw.js",
    //     path: "../public/static/firebase-messaging-sw.js",
    //   },
    // ];

    // serviceWorkers.forEach(({ filename, path }) => {
    //   server.get(`/${filename}`, (req, res) => {
    //     app.serveStatic(req, res, path);
    //   });
    // });

    server.use(morgan(dev ? "dev" : "combined"));
    server.use("/", express.static(path.join(__dirname, "public")));
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));

    // server.get("/video/:videoNo", (req, res) => {
    //   return app.render(req, res, "/video", { videoNo: req.params.videoNo });
    // });

    server.get("*", (req, res) => {
      if (/^www\./.test(req.headers.host)) {
        res.redirect(
          "https://" + req.headers.host.replace(/^www\./, "") + req.url
        );
      } else {
        return handle(req, res);
      }
    });

    http
      .createServer(
        ["production", "test"].indexOf(env) !== -1
          ? (req, res) => {
              res.writeHead(301, {
                Location: "https://" + req.headers["host"] + req.url,
              });
              res.end();
            }
          : server
      )
      .listen(port, () => {
        console.log("http front server opened port : %s", port);
      });
    if (["production", "test"].indexOf(env) !== -1) {
      https.createServer(options, server).listen(443, () => {
        console.log("https front server opened port : %s", 443);
      });
    }
  })
  .catch((error) => {
    console.error("this is error ", error);
  });
