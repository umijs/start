import express from "express";
import path from "path";
import { existsSync, readJsonSync } from "fs-extra";
import { tempPath } from "../constant";

const router = express.Router();

/* GET  */
router.get("/", function (req, res, next) {
  const cwd = process.cwd();
  const targetPath = path.join(cwd, tempPath, "tempsListData.json");
  console.log(targetPath);
  if (existsSync(targetPath)) {
    const listData = readJsonSync(targetPath);
    res.send({
      data: listData.data,
      message: "success",
    });
  } else {
    res.send({
      data: [],
      message: "error",
    });
  }
});

export default router;
