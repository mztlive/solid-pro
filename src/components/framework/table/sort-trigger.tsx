import { Match, Show, Switch } from "solid-js"
import { Button } from "../../ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import {
	AiOutlineClear,
	AiOutlineEyeInvisible,
	AiOutlinePushpin,
	AiOutlineSortAscending,
	AiOutlineSortDescending,
	AiOutlineUnlock,
} from "solid-icons/ai"
import { flexRender, Header } from "@tanstack/solid-table"
import { useLocale } from "~/i18n/lib"
import I18nText from "../i18n-text"
import { SelectAction } from "./types"

interface HeadTriggerProps<T> {
	header: Header<T, unknown>
	onSort: (desc: boolean) => void
	onClear: () => void
	onVisibilityChange: () => void
	onPin: () => void
}

export const HeadTrigger = <T,>(props: HeadTriggerProps<T>) => {
	const { t } = useLocale()

	return (
		<Show
			when={props.header.column.id !== SelectAction}
			fallback={flexRender(
				props.header.column.columnDef.header,
				props.header.getContext(),
			)}
		>
			<div class="flex items-center">
				<DropdownMenu>
					<DropdownMenuTrigger class="w-full text-left">
						<Button
							class="flex items-center gap-2 -ml-4 h-8 data-[expanded]:bg-accent font-bold color-accent"
							variant="ghost"
						>
							{flexRender(
								props.header.column.columnDef.header,
								props.header.getContext(),
							)}
							<Show when={props.header.column.getIsSorted()}>
								<span class="font-bold">
									{props.header.column.getIsSorted() === "asc"
										? " ↑"
										: " ↓"}
								</span>
							</Show>
						</Button>
						{/* <Show when={props.header.column.getIsPinned()} /> */}
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<Show when={props.header.column.getCanSort()}>
							<DropdownMenuItem
								onClick={() => props.onSort(false)}
							>
								<AiOutlineSortAscending class="mr-2" />
								<I18nText text={t.sort.asc} />
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => props.onSort(true)}
							>
								<AiOutlineSortDescending class="mr-2" />
								<I18nText text={t.sort.desc} />
							</DropdownMenuItem>
							<DropdownMenuItem onClick={props.onClear}>
								<AiOutlineClear class="mr-2" />
								<I18nText text={t.sort.clear} />
							</DropdownMenuItem>
						</Show>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={props.onVisibilityChange}>
							<AiOutlineEyeInvisible class="mr-2" />
							<I18nText text={t.view.hide} />
						</DropdownMenuItem>
						<DropdownMenuItem onClick={props.onPin}>
							<Switch>
								<Match
									when={
										props.header.column.getIsPinned() ===
										false
									}
								>
									<AiOutlinePushpin class="mr-2" />
									<I18nText text={"Pin"} />
								</Match>
								<Match
									when={
										props.header.column.getIsPinned() !==
										false
									}
								>
									<AiOutlineUnlock class="mr-2" />
									<I18nText text={"Unpin"} />
								</Match>
							</Switch>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</Show>
	)
}
