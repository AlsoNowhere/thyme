
import resolve from "@rollup/plugin-node-resolve";
import { dillx } from "rollup-plugin-dillx";

const output = {
    file: "./dist/thyme.js",
    format: "esm"
};

export default {
    input: "./src/main.js",
    output,
    external: [ "sage", "dill", "thyme-core" ],
    plugins: [
        dillx(),
        resolve()
    ],
    watch: {
        exclude: "node_modules/**"
    }
};
