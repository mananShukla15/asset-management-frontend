import { defineConfig } from "vite";

export default defineConfig({
    base: './',
    // publicDir: "public",  // Keeps static assets accessible
    build: {
        outDir: 'dist',   // Vercel will serve from here
        target: 'esnext'
    }
});
