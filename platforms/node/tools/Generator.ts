import { Generator } from "@umijs/utils";
import { join, resolve } from "path";
import { existsSync, writeFileSync, remove } from "fs-extra";
import prettier from "prettier";
import sortPackage from "sort-package-json";
import getUmiConfig from "../helpers/getUmiConfig";
import writeConfig from "../helpers/writeConfig";

type Arguments<T = {}> = T & {
  project: any;
  umi: any;
  /** 模版所在的文件路径 */
  path: string;
  type?: string;
  /** 项目新建路径，这两个路径由外面传入是为了适应不同的平台调用，node 端需要写到缓存路径中，其他需要写到本地路径*/
  target: string;
  /** Non-option arguments */
  _: Array<string | number>;
  /** The script name or node command */
  $0: string;
  /** All remaining options */
  [argName: string]: unknown;
};

export default class StartGenerator extends Generator {
  async writing() {
    const { project, umi, path, target, type } = this.args as Arguments;
    this.copyDirectory({
      context: { ...project, ...umi },
      path,
      target,
    });

    // error
    const packageJsonPath = resolve(target, "package.json");
    if (!existsSync(packageJsonPath)) {
      console.log(`${packageJsonPath} is no find`);
      return;
    }
    const pkg = require(packageJsonPath);

    // 修改项目的 package.json
    const projectPkg = {
      ...pkg,
      ...project,
    };
    // remove create-umi config
    delete projectPkg["create-umi"];

    writeFileSync(
      packageJsonPath,
      // 删除一个包之后 json会多了一些空行。sortPackage 可以删除掉并且排序
      // prettier 会容忍一个空行
      prettier.format(JSON.stringify(sortPackage(projectPkg)), {
        parser: "json",
      })
    );

    // 修改 config 文件
    // 分3种情况
    // 情况1 pro 项目，存在文件引用的情况。
    //TODO: 应该智能处理的，现在使用 情况3获取到的 config 是解析后的。会消除 import，还要再研究下。
    console.log(type);
    if (type === "pro") {
      const proTplPath = join(
        __dirname,
        "..",
        "templates",
        "pro",
        "config.ts.tpl"
      );
      const proConfigPath = join(target, "config", "config.ts");
      this.copyTpl({
        context: umi,
        target: proConfigPath,
        templatePath: proTplPath,
      });
      return;
    }
    // 情况2 模版项目中 存在 config/config.ts.tpl 文件，即表示配置修改由模版提供者自己管理，在上面的 copyDirectory 中已经处理了这个逻辑
    // 情况3 没有 tpl 文件，手动修改
    // const { extConfig, extConfigFilePath, extConfigName, extConfigType } = await getUmiConfig(target);
    // if (!extConfigFilePath) {
    //   // 没有找到配置文件
    //   return;
    // }
    // const userConfig = extConfig?.default ?? extConfig;
    // const newConfig = { ...userConfig, ...umi };

    // await writeConfig(newConfig, extConfigFilePath);
  }
}
