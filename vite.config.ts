import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            },
        },
        server: {
            // HMR is disabled in AI Studio via DISABLE_HMR env
            // Do not modify file watching is disabled to pre
            hmr: process.env.DISABLE_HMR !== 'true',
            // Disable file watching when DISABLE_HMR is true to
            watch: process.env.DISABLE_HMR === 'true' ? null : {},
            // 新增以下两行
            host: true,
            allowedHosts: true,
        },
    };
});