import { join } from "path";
import { existsSync } from "fs-extra";
import { winPath, compatESModuleRequire } from "@umijs/utils";

const DEFAULT_CONFIG_FILES = [
  ".umirc.ts",
  ".umirc.js",
  "config/config.ts",
  "config/config.js",
];

const getConfigFile = (base: string): string | null => {
  // TODO: support custom config file
  const configFile = DEFAULT_CONFIG_FILES.find((f) =>
    existsSync(join(base, f))
  );
  return configFile ? winPath(configFile) : null;
};

const getUmiConfig = (projectPath: string) => {
  const configPath = getConfigFile(projectPath);

  if (!configPath) {
    return {};
  }
  return !configPath
    ? {}
    : compatESModuleRequire(require(join(projectPath, configPath)));
};

export default getUmiConfig;
