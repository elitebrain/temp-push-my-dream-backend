// 출처 : https://medium.com/aha-official/%EC%95%84%ED%95%98-rest-api-%EC%84%9C%EB%B2%84-%EA%B0%9C%EB%B0%9C-13-b90f6007a8f9
// 출처 : https://lovemewithoutall.github.io/it/winston-example/
const fs = require("fs");
const { transports, createLogger, format } = require("winston");
require("winston-daily-rotate-file");

const rootLogDir = __dirname + "/../logs";

const infoLogDir = __dirname + "/../logs/infos";
const errorLogDir = __dirname + "/../logs/errors";

if (!fs.existsSync(rootLogDir)) {
  fs.mkdirSync(rootLogDir);
}

if (!fs.existsSync(infoLogDir)) {
  fs.mkdirSync(infoLogDir);
}

if (!fs.existsSync(errorLogDir)) {
  fs.mkdirSync(errorLogDir);
}

const infoTransport = new transports.DailyRotateFile({
  filename: `${infoLogDir}/%DATE%-info.log`,
  datePattern: "YYYY-MM-DD",
  level: "info",
});

const errorTransport = new transports.DailyRotateFile({
  filename: `${errorLogDir}/%DATE%-error.log`,
  datePattern: "YYYY-MM-DD",
  level: "error",
});

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.json()
  ),
  transports: [
    infoTransport,
    errorTransport,
    new transports.Console({
      level: "info",
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});

const stream = {
  write: (messesage) => {
    logger.info(messesage);
  },
};

module.exports = { logger, stream };
