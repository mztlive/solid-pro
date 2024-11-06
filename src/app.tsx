import { type Component, type ParentProps, Suspense } from "solid-js"
import { fakeLogin } from "./api/mock"
import { Skeleton } from "./components/ui/skeleton"
import { Toaster } from "./components/ui/toast"
import { AuthProvider } from "./providers/auth-provider"
// import { I18nProvider } from './providers/i18n-provider'

import {
	ColorModeProvider,
	ColorModeScript,
	createLocalStorageManager,
} from "@kobalte/core"
import { Button } from "./components/ui/button"
import { NavigateTabs, TabItem } from "./components/framework/navigate-tabs"
import { useNavigate } from "@solidjs/router"
import { KeepAliveProvider } from "solid-keep-alive"

const App: Component = (props: ParentProps) => {
	const storageManager = createLocalStorageManager("vite-ui-theme")

	return (
		<>
			<ColorModeScript storageType={storageManager.type} />
			<ColorModeProvider storageManager={storageManager}>
				<KeepAliveProvider>
					<div class="w-full flex flex-row">
						<Toaster />
						<AuthProvider loginCall={fakeLogin}>
							<Suspense
								fallback={
									<Skeleton
										class="w-full h-screen"
										radius={10}
									/>
								}
							>
								{props.children}
							</Suspense>
						</AuthProvider>
					</div>
				</KeepAliveProvider>
			</ColorModeProvider>
		</>
	)
}

export default App
