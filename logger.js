const { createLogger, transports, format } = require("winston");

const customerLogger = createLogger({
  transports: [
    new transports.File({
      filename: "./log/success.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "./log/error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = customerLogger;
