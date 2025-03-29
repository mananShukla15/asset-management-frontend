import { defineConfig } from "vite";

export default defineConfig({
    output: {
        libraryTarget: "module",
    },
    base: './',
    // publicDir: "public",  // Keeps static assets accessible
    build: {
        outDir: 'dist',   // Vercel will serve from here
        target: 'esnext'
    }
});
