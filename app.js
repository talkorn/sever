var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");

var app = express();
const chalk = require("chalk");
const initialData = require("./iniitialData/initialData");
app.use(cors());

app.use(
  logger((tokens, req, res) => {
    const timestamp = new Date().toLocaleTimeString();
    const status = tokens.status(req, res);
    let color;

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
        break;
      default:
        color = chalk.white; // Default color if the status doesn't fall within any range
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
