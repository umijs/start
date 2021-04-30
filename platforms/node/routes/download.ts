import express from "express";
import archiver from "archiver";
import { join } from "path";
import rimraf from "rimraf";
import { tempPath, pkgPath } from "../constant";

const router = express.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
  const fileName = req.query.fileName as string;
  console.log(fileName);
  if (!fileName) {
    res.status(500).send({ error: "文件名错误啦" });
  }
  const name = fileName.split("-")[0];
  const target = join(process.cwd(), pkgPath, fileName || "");

  var archive = archiver("zip");
  archive.on("error", function (err) {
    res.status(500).send({ error: err.message });
  });

  //on stream closed we can end the request
  archive.on("end", function () {
    console.log("Archive wrote %d bytes", archive.pointer());
    // 结束的时候删除服务器上的数据
    rimraf.sync(target);
  });

  //set the archive name
  res.attachment(`${name}.zip`);

  //this is the streaming magic
  archive.pipe(res);

  const directories = [target];

  for (let i in directories) {
    archive.directory(directories[i], directories[i].replace(target, name));
  }

  archive.finalize();
});

export default router;
