/// <reference types="vitest/config" />

import path from "node:path";

import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), cloudflare(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    passWithNoTests: true,
    watch: false,
    projects: [
      {
        resolve: {
          alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
          },
        },
        test: {
          globals: true,
          name: "unit",
          environment: "node",
          include: ["**/*.unit.test.{ts,tsx}"],
        },
      },
      {
        // projects のインライン設定はルートの plugins を引き継がないため、明示的に指定する
        plugins: [react(), tailwindcss()],
        resolve: {
          alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
          },
        },
        test: {
          include: ["**/*.browser.test.{ts,tsx}"],
          name: "browser",
          globals: true,
          setupFiles: ["./vitest.setup.browser.ts"],
          // 表示切り替えを display ユーティリティで行うため CSS の適用が必要
          css: true,
          browser: {
            screenshotFailures: false,
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
            headless: true,
          },
        },
      },
    ],
  },
});
