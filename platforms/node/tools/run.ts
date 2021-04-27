import path from "path";
import { writeFileSync } from "fs-extra";
import { mkdirp } from "@umijs/utils";
import { download } from "../tools/download";
import { tempPath, tempsList } from "../constant";

export default async () => {
  let tempsListData = [] as any[];
  const root = path.join(process.cwd(), tempPath);
  // await downloadList()
  await Promise.all(
    tempsList.map(async (temp) => {
      return new Promise(async (resolve, reject) => {
        try {
          const pkg = await download(root, temp);
          if (pkg) {
            tempsListData.push(pkg);
            resolve("success");
          }
        } catch (error) {
          reject(error);
        }
      });
    })
  );
  // 1. 下载模版或者检测更新

  // 2.获取清单数据 放到上面的循环中了，可以少执行读取
  // 3.将 tempsListData 保存为文件？或者有什么方式存为全局数据
  const targetPath = path.join(root, "tempsListData.json");
  mkdirp.sync(path.dirname(targetPath));
  writeFileSync(
    targetPath,
    // 删除一个包之后 json会多了一些空行。sortPackage 可以删除掉并且排序
    // prettier 会容忍一个空行
    JSON.stringify({ data: tempsListData }),
    "utf-8"
  );
  console.log(`Write file ${targetPath} Success!`);
};
