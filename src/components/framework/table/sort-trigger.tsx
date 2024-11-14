import { Show } from "solid-js"
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
	AiOutlineSortAscending,
	AiOutlineSortDescending,
} from "solid-icons/ai"
import { flexRender } from "@tanstack/solid-table"
import { useLocale } from "~/i18n/lib"
import I18nText from "../i18n-text"

interface SortTriggerProps {
	header: any
	onSort: (desc: boolean) => void
	onClear: () => void
	onVisibilityChange: () => void
}

export const SortTrigger = (props: SortTriggerProps) => {
	const { t } = useLocale()

	return (
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
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<Show when={props.header.column.getCanSort()}>
					<DropdownMenuItem onClick={() => props.onSort(false)}>
						<AiOutlineSortAscending class="mr-2" />
						<I18nText text={t.sort.asc} />
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => props.onSort(true)}>
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
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
