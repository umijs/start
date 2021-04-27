import { Generator } from "@umijs/utils";
import { join, resolve } from "path";
import { existsSync, writeFileSync } from "fs-extra";
import prettier from "prettier";
import sortPackage from "sort-package-json";

type Arguments<T = {}> = T & {
  config: any;
  /** 模版所在的文件路径 */
  path: string;
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
    const { config, path, target } = this.args as Arguments;

    this.copyDirectory({
      context: config,
      path,
      target,
    });
    const packageJsonPath = resolve(target, "package.json");
    if (!existsSync(packageJsonPath)) {
      console.log(`${packageJsonPath} is no find`);
      return;
    }
    const pkg = require(packageJsonPath);

    // 修改项目的 package.json
    const projectPkg = {
      ...pkg,
      name: config.name,
      description: config.description,
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
    // 分两种情况
    // 情况1 模版项目中 存在 config/config.ts.tpl 文件，即表示配置修改由模版提供者自己管理，在上面的 copyDirectory 中已经处理了这个逻辑

    // TODO:情况2 没有 tpl 文件，手动修改
  }
}
