// import { defineConfig } from 'vite'
import { defineConfig } from '@farmfe/core'

import solidPlugin from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import postcss from '@farmfe/js-plugin-postcss'

export default defineConfig({
    plugins: [
        /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
        // devtools(),
        // solidPlugin()
        postcss()
    ],
    vitePlugins: [
        () => ({ vitePlugin: solidPlugin(), filters: ['\\.jsx$', '\\.tsx$'] })
        // 开了会报错，好像farm不需要这个
        // () => ({ vitePlugin: tsconfigPaths({ root: './' }) })
    ],
    server: {
        port: 3000,
        hmr: true
    },
    compilation: {
        output: {
            targetEnv: 'browser-esnext'
        },
        resolve: {
            alias: {
                '~': path.resolve(__dirname, './src')
            }
        }
    }
})
