import compression from "compression";
import createError from "http-errors";
import express from "express";
import type { ErrorRequestHandler } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import helloRouter from "./routes/hello";

const app = express();
app.use(compression());

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "www")));
console.log(path.join(__dirname, "..", "www"));
app.use("/", indexRouter);
app.use("/api/hello", helloRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log(req);
  next(createError(404));
});

const errHandler: ErrorRequestHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
};
// error handler
app.use(errHandler);

module.exports = app;
