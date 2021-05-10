import typescript2 from "rollup-plugin-typescript2";

export default {
  input: "platforms/node/app.ts",
  output: {
    file: "platforms/node/lib/app.js",
    format: "cjs",
  },
  plugins: [
    typescript2({
      tsconfig: "platforms/node/tsconfig.json",
      clean: true,
      module: "esnext",
    }),
  ],
};
