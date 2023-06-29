var express = require("express");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");
const fs = require("fs");
var app = express();
const chalk = require("chalk");
const initialData = require("./iniitialData/initialData");
app.use(cors());

const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const loggers = (requestDate, statusCode, errorMessage) => {
  const currentDate = new Date();
  const logFileName = `${currentDate.toISOString().slice(0, 10)}.log`;
  const logFilePath = path.join(logsDir, logFileName);

  const logData = `${requestDate}, ${statusCode}, ${errorMessage}\n`;

  fs.appendFile(logFilePath, logData, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
};

app.use(
  logger((tokens, req, res) => {
    const timestamp = new Date().toLocaleTimeString();
    const status = tokens.status(req.statusMessage, res);
    let color;
    function getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    const requestDate = getCurrentDate();
    const errorMessage = res.statusMessage;

    switch (true) {
      case status >= 100 && status <= 199:
        color = chalk.yellow;
        break;
      case status >= 200 && status <= 299:
        color = chalk.blue;
        break;
      case status >= 300 && status <= 399:
        color = chalk.green;
        break;
      case status >= 400 && status <= 599:
        color = chalk.red;
        loggers(requestDate, status, errorMessage);
        break;
      default:
        color = chalk.white;
        break;
    }

    return [
      color(
        timestamp,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens["response-time"](req, res),
        "ms"
      ),
    ].join(" ");
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

initialData();
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.status(404).json({ err: "page not found" });
});
module.exports = app;
