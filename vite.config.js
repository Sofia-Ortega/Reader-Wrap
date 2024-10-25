import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wyw()],
});
