import { writeFile, writeJSON } from "fs-extra";
import { extname } from "path";
import * as util from "util";

export function formatJSObject(o: { [key: string]: any }): string {
  try {
    o = JSON.parse(JSON.stringify(o));
  } catch (e) {
    throw new Error(`Cannot parse object as JSON: ${e.stack ? e.stack : e}`);
  }

  // @ts-ignore
  return util.inspect(o, {
    compact: false,
    breakLength: Infinity,
    depth: Infinity,
    maxArrayLength: Infinity,
    maxStringLength: Infinity,
  });
}

function formatConfigTS(extConfig: any): string {
  // TODO: <reference> tags
  return `import { defineConfig } from 'umi';
export default defineConfig(${formatJSObject(extConfig)});\n`;
}
export default async function writeConfig(
  extConfig: any,
  extConfigFilePath: string
): Promise<void> {
  if (extname(extConfigFilePath) === ".json") {
    await writeJSON(extConfigFilePath, extConfig, { spaces: 2 });
  }

  await writeFile(extConfigFilePath, formatConfigTS(extConfig));
}
