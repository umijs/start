import compression from "compression";
import createError from "http-errors";
import express from "express";
import type { ErrorRequestHandler } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import helloRouter from "./routes/hello";
import downloadRouter from "./routes/download";
import generateRouter from "./routes/generate";
import run from "./tools/run";

//TODO: 这个执行时机还要在考虑下
run();
const app = express();
app.use(compression());

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "www")));
app.use("/", indexRouter);
app.use("/api/hello", helloRouter);
app.use("/api/download", downloadRouter);
app.use("/api/generate", generateRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
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
console.log(
  "首次执行之后，请注释 platforms/node/app.ts#L5 这行代码，这个执行时机还没考虑清楚，首次执行之后，请注释 platforms/node/app.ts#L5 这行代码，这个执行时机还没考虑清楚，首次执行之后，请注释 platforms/node/app.ts#L5 这行代码，这个执行时机还没考虑清楚"
);

module.exports = app;
