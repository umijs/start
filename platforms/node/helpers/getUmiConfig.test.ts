import { join } from "path";
import getUmiConfig from "./getUmiConfig";

const fixtures = join(__dirname, "..", "fixtures");

test("config-config", async () => {
  const cwd = join(fixtures, "helpers-getconfig");
  const config = getUmiConfig(cwd);
  expect(config).toEqual({ foo: "bar" });
});
