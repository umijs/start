import express from "express";
import { join } from "path";
import { tempPath, pkgPath } from "../constant";
import Generator from "../tools/Generator";

const router = express.Router();

// {
//   "type": "umi",
//   "project": {
//     "name": "umi",
//     "version": "1.0.0",
//     "description": "新的独角兽在这里启航",
//     "keywords": ["umi"],
//     "license": "MIT"
//   },
//   "umi": {
//     "history": "browser",
//     "hash": true,
//     "webpack5": false,
//     "fastRefresh": false,
//     "ssr": false
//   }
// }

router.post("/", async (req, res, next) => {
  try {
    const { type, project } = req.body;
    const { name } = project;
    // 第三方模版需要的配置，理论上应该和前端传过来的一致
    let config = null;
    switch (type) {
      case "umi":
        config = {
          version: "3.4.14",
          conventionRoutes: true,
        };
        break;
      case "pro":
        config = {};
        break;
      default:
        break;
    }
    if (!config) {
      res.send({
        data: {
          message: `type:${type} is no support`,
          success: false,
        },
        message: "success",
      });
      return;
    }
    // config, path, target
    const path = join(process.cwd(), tempPath, type);
    const filePath = `${name}-${new Date().getTime()}`;
    const target = join(process.cwd(), pkgPath, filePath);
    const g = new Generator({
      cwd: "",
      args: { _: [], $0: "", config, path, target },
    });
    await g.run();
    res.send({
      data: {
        fileName: filePath,
        success: true,
      },
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 500,
      data: {
        success: false,
      },
      message: "服务端出错了！",
    });
  }
});

export default router;
