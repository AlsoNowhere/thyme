import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/index.js",
    format: "esm",
  },
  external: ["mint"],
  plugins: [resolve(), typescript()],
  watch: {
    exclude: "node_modules/**",
  },
};
