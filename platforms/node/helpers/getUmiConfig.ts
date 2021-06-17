import { join, resolve } from "path";
import { existsSync, readFileSync, access, constants } from "fs-extra";
import { winPath } from "@umijs/utils";
import type typescript from "typescript";
import { fatal, isFatal } from "./errors";

const DEFAULT_CONFIG_FILES = [
  ".umirc.ts",
  ".umirc.js",
  "config/config.ts",
  "config/config.js",
];

const getConfigFile = (base: string): string | null => {
  const configFile = DEFAULT_CONFIG_FILES.find((f) =>
    existsSync(join(base, f))
  );
  return configFile ? winPath(configFile) : null;
};
interface NodeModuleWithCompile extends NodeJS.Module {
  _compile?(code: string, filename: string): any;
}

/**
 * @see https://github.com/ionic-team/stencil/blob/HEAD/src/compiler/sys/node-require.ts
 */
export const requireTS = (ts: typeof typescript, p: string): unknown => {
  const id = resolve(p);

  delete require.cache[id];

  require.extensions[".ts"] = (
    module: NodeModuleWithCompile,
    fileName: string
  ) => {
    let sourceText = readFileSync(fileName, "utf8");

    if (fileName.endsWith(".ts")) {
      const tsResults = ts.transpileModule(sourceText, {
        fileName,
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          moduleResolution: ts.ModuleResolutionKind.NodeJs,
          esModuleInterop: true,
          strict: true,
          target: ts.ScriptTarget.ES2017,
        },
        reportDiagnostics: true,
      });
      sourceText = tsResults.outputText;
    } else {
      // quick hack to turn a modern es module
      // into and old school commonjs module
      sourceText = sourceText.replace(/export\s+\w+\s+(\w+)/gm, "exports.$1");
    }
    module._compile?.(sourceText, fileName);
  };

  const m = require(id); // eslint-disable-line @typescript-eslint/no-var-requires

  delete require.extensions[".ts"];

  return m;
};

export function resolveNode(
  root: string,
  ...pathSegments: string[]
): string | null {
  try {
    return require.resolve(pathSegments.join("/"), { paths: [root] });
  } catch (e) {
    return null;
  }
}

async function loadExtConfigTS(
  rootDir: string,
  extConfigName: string,
  extConfigFilePath: string
): Promise<any> {
  try {
    const tsPath = resolveNode(rootDir, "typescript");

    if (!tsPath) {
      fatal(
        "Could not find installation of TypeScript.\n" +
          `To use ${extConfigName} files, you must install TypeScript in your project, e.g. w/ ${"npm install -D typescript"}`
      );
    }

    const ts = require(tsPath); // eslint-disable-line @typescript-eslint/no-var-requires
    const extConfigObject = requireTS(ts, extConfigFilePath) as any;
    const extConfig = extConfigObject.default ?? extConfigObject;

    return {
      extConfigType: "ts",
      extConfigName,
      extConfigFilePath: extConfigFilePath,
      extConfig,
    };
  } catch (e) {
    if (!isFatal(e)) {
      fatal(`Parsing ${extConfigName} failed.\n\n${e.stack ?? e}`);
    }

    throw e;
  }
}

async function loadExtConfigJS(
  rootDir: string,
  extConfigName: string,
  extConfigFilePath: string
): Promise<any> {
  try {
    return {
      extConfigType: "js",
      extConfigName,
      extConfigFilePath: extConfigFilePath,
      extConfig: require(extConfigFilePath),
    };
  } catch (e) {
    fatal(`Parsing ${extConfigName} failed.\n\n${e.stack ?? e}`);
  }
}
export async function pathAccessible(
  filePath: string,
  mode: number
): Promise<boolean> {
  try {
    await access(filePath, mode);
  } catch (e) {
    return false;
  }

  return true;
}

export async function pathExists(filePath: string): Promise<boolean> {
  return pathAccessible(filePath, constants.F_OK);
}
const getUmiConfig = async (rootDir: string): Promise<any> => {
  const configFileName = getConfigFile(rootDir);
  console.log(configFileName);
  if (!configFileName) return {};
  const extConfigFilePath = resolve(rootDir, configFileName);
  if (configFileName?.endsWith(".ts")) {
    return loadExtConfigTS(rootDir, configFileName, extConfigFilePath);
  }
  return loadExtConfigJS(rootDir, configFileName, extConfigFilePath);
};

export default getUmiConfig;
