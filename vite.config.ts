import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
    plugins: [
        /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
        // devtools(),
        solidPlugin(),
        tsconfigPaths({ root: './' }),
        eslint()
    ],
    server: {
        port: 3000
    },
    build: {
        target: 'esnext'
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src')
        }
    }
})
