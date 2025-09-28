import { defineConfig } from "vite";

export default defineConfig({
  // Base public path when served in production
  base: "./",

  // Build configuration
  build: {
    // Output directory
    outDir: "dist",

    // Asset handling
    assetsDir: "assets",

    // Rollup options for multi-page build
    rollupOptions: {
      input: {
        main: "index.html",
      },
      output: {
        // Chunk file naming
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },

    // Minification (uses esbuild by default)
    minify: true,

    // Source maps for production debugging
    sourcemap: false,

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },

  // Development server options
  server: {
    port: 3000,
    open: true,
    host: true,
  },

  // Preview server options
  preview: {
    port: 4173,
    open: true,
  },

  // CSS handling
  css: {
    // Enable CSS source maps in development
    devSourcemap: true,
  },

  // Asset handling
  assetsInclude: ["**/*.otf", "**/*.ttf", "**/*.woff", "**/*.woff2"],

  // Optimize dependencies
  optimizeDeps: {
    include: ["src/main.js"],
  },
});
