import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(),
    babel({
      filter: /\.tsx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"],
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    // Handle specific routes that shouldn't go through React Router
    proxy: {
      "/.well-known/appspecific/com.chrome.devtools.json": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
