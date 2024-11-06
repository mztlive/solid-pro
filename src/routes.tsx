import type { RouteDefinition } from "@solidjs/router"
import { lazy } from "solid-js"
import Home from "./pages/home"
import Login from "./pages/login/login"

const baseRoutes: RouteDefinition[] = [
	{
		path: "/login",
		component: Login,
	},
	{
		path: "/",
		component: Home,
		children: [
			{
				path: "/",
				component: lazy(() => import("./pages/dashboard")),
			},
			{
				path: "/table-test",
				component: lazy(() => import("./pages/table-test")),
			},
		],
	},
	{
		path: "**",
		component: lazy(() => import("./errors/404")),
	},
]

export { baseRoutes }
