import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    base: './',
    server: {
        host: true,
    },
    build:
    {
        outDir: './dist',
        emptyOutDir: true,
        sourcemap: true
    },
    plugins: [glsl()],
});
