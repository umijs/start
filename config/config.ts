import { defineConfig } from "alita";

export default defineConfig({
  appType: "pc",
  noBuiltInPlugins: true,
  outputPath: "platforms/node/www/",
  publicPath: "./",
  proxy: {
    "/api": {
      target: "http://localhost:3033/",
      changeOrigin: true,
    },
  },
});
