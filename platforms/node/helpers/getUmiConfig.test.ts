import { join } from "path";
import getUmiConfig from "./getUmiConfig";

const fixtures = join(__dirname, "..", "fixtures");

test("config-config", async () => {
  const cwd = join(fixtures, "helpers-getconfig");
  const config = await getUmiConfig(cwd);
  const defaultConfig = config?.extConfig?.default ?? config?.extConfig;
  expect(defaultConfig).toEqual({ foo: "bar" });
});
test("config-config-ts", async () => {
  const cwd = join(fixtures, "helpers-getconfig-ts");
  const config = await getUmiConfig(cwd);
  const defaultConfig = config?.extConfig?.default ?? config?.extConfig;
  expect(defaultConfig).toEqual({ foo: "bar" });
});
test("config-config-pro", async () => {
  const cwd = join(fixtures, "pro");
  const config = await getUmiConfig(cwd);
  const defaultConfig = config?.extConfig?.default ?? config?.extConfig;
  expect(defaultConfig?.antd).toEqual({});
});
