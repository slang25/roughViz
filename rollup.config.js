import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json";
import { builtinModules } from "module";
import analyze from "rollup-plugin-analyzer";

const external = [
  // ...(pkg.dependencies ? Object.keys(pkg.dependencies) : []),
  ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
  ...(pkg.optionalDependencies ? Object.keys(pkg.optionalDependencies) : []),
  ...builtinModules,
];

const moduleConfig = (moduleSystem) => ({
  input: "src/index.js",
  output: {
    dir: `dist/${moduleSystem}`,
    format: moduleSystem,
    sourcemap: false,
  },
  external,
  plugins: [resolve(), ...(moduleSystem === "es" ? [analyze()] : [])],
});

export default [moduleConfig("cjs"), moduleConfig("es")];
