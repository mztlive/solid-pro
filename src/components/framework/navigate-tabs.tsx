import { Resolver } from "@solid-primitives/i18n"
import { For } from "solid-js"
import { cn } from "~/libs/cn"
import I18nText from "./i18n-text"

export interface TabItem {
	key: string
	label: string | Resolver<string, string>
}

interface TabProps {
	items: TabItem[]
	activeKey?: string
	class?: string
	onClick?: (key: string) => void
	onClose?: (key: string) => void
}

export function NavigateTabs(props: TabProps) {
	return (
		<div class={cn("w-full", props.class)}>
			<div class="flex items-end gap-1 border-b border-border">
				<For each={props.items}>
					{(item) => (
						<div class="group relative">
							<div
								class={cn(
									"px-6 py-2 text-sm font-medium",
									"rounded-t-lg transition-all duration-200",
									"relative cursor-pointer",
									props.activeKey === item.key
										? [
												"bg-background text-primary",
												"border-t border-l border-r border-border",
												"before:absolute before:bottom-0 before:left-0 before:right-0",
												"before:h-0.5 before:bg-background",
											].join(" ")
										: [
												"text-muted-foreground",
												"bg-muted",
												"border border-transparent",
												"hover:bg-hover-muted",
											].join(" "),
								)}
								onClick={() => {
									props.onClick?.(item.key)
								}}
							>
								<I18nText text={item.label} />
								<button
									class="absolute right-1 top-1 opacity-0 group-hover:opacity-100 hover:text-primary transition-opacity p-1"
									onClick={(e) => {
										e.stopPropagation()
										props.onClose?.(item.key)
									}}
								>
									×
								</button>
							</div>
						</div>
					)}
				</For>
			</div>
		</div>
	)
}
