import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "content") {
    return {
      build: {
        outDir: "dist",
        emptyOutDir: false, // Prevents deleting existing files
        rollupOptions: {
          input: path.resolve(__dirname, "src/content/index.tsx"),
          output: {
            entryFileNames: "assets/content.js",
            format: "iife", // Ensures it works in Chrome Extensions
          },
        },
      },
    };
  }

  if (mode === "background") {
    return {
      build: {
        outDir: "dist",
        emptyOutDir: false, // Prevents deleting existing files
        rollupOptions: {
          input: path.resolve(__dirname, "src/background/index.ts"),
          output: {
            entryFileNames: "assets/background.js",
            format: "iife",
          },
        },
      },
    };
  }

  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    build: {
      outDir: "dist",
      emptyOutDir: false, // Prevents deleting existing files
      rollupOptions: {
        input: {
          popup: resolve(__dirname, './index.html'),
        },
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
          format: "iife", // Makes it work in Chrome Extensions
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      }
    }
  }
});
