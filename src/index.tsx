/* @refresh reload */
import './app.css'

import { Suspense, render } from 'solid-js/web'
import { Router } from '@solidjs/router'
import App from './app'
import { baseRoutes } from './routes'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
    )
}

render(() => <Router root={App}>{baseRoutes}</Router>, root)
