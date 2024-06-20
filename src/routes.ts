import { lazy } from 'solid-js'
import type { RouteDefinition } from '@solidjs/router'
import Home from './pages/home'
import Login from './pages/login'

const baseRoutes: RouteDefinition[] = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/',
                component: lazy(() => import('./pages/dashboard'))
            }
        ]
    },
    {
        path: '**',
        component: lazy(() => import('./errors/404'))
    }
]

export { baseRoutes }
