import { defineConfig } from "rolldown";

export default defineConfig({
  input: "./src/lib/index.ts",

  output: {
    dir: "./src/lib",
    format: "es",
    preserveModules: true,
    preserveModulesRoot: "./src/lib",
    minify: "dce-only",
  },
  external(id) {
    return id.includes("node_modules");
  },
  platform: "browser",
  transform: {
    jsx: "react-jsx",
  },
});
