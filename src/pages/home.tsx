import { useIsRouting, useNavigate } from "@solidjs/router"
import {
	type ParentProps,
	Show,
	Suspense,
	createEffect,
	createMemo,
	createSignal,
	on,
} from "solid-js"
import Navbar from "~/components/framework/navbar"
import PageSkeleton from "~/components/framework/page-skeleton"
import { NavigateTabs, TabItem } from "~/components/framework/navigate-tabs"
import { Progress } from "~/components/ui/progress"
import { MenuItemType, Sidebar } from "~/components/ui/sidebar/sidebar"
import { createMenus } from "~/menus"
import useNavigateTab from "~/hooks/navigate-tab"
import { KeepAlive } from "solid-keep-alive"
import { showToast } from "~/hooks/toast"

const Home = (props: ParentProps) => {
	const isRouteing = useIsRouting()
	const [progress, setProgress] = createSignal(0)

	createEffect(() => {
		if (isRouteing()) {
			showToast({
				title: "Loading",
				description: "Please wait while we are loading the page",
				variant: "success",
			})

			setProgress(0)
			const interval = setInterval(() => {
				setProgress((p) => Math.min(p + 10, 100))
			}, 200)

			return () => clearInterval(interval)
		}

		setProgress(100)
	})

	return (
		<div class="flex flex-row h-screen w-full">
			<Sidebar />
			<div class="w-full bg-page-bg overflow-y-auto">
				<Show when={isRouteing()}>
					<Progress
						class="h-[2px] rounded-none sticky top-0 z-50"
						value={progress()}
						maxValue={100}
					/>
				</Show>
				<Navbar class="sticky top-0 z-40" />
				<main class="w-full px-10 py-2">
					<div class="mt-4 pb-10">
						<Suspense fallback={<PageSkeleton class="mt-4" />}>
							{props.children}
						</Suspense>
					</div>
				</main>
			</div>
		</div>
	)
}

export default Home
