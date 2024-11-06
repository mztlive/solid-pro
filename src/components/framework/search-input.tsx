import { useNavigate } from "@solidjs/router"
import {
	For,
	type JSX,
	createEffect,
	createMemo,
	createSignal,
	onCleanup,
	splitProps,
} from "solid-js"
import { useLocale } from "~/i18n/lib"
import { createMenus } from "~/menus"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import type { MenuItemType } from "../ui/sidebar/sidebar"
import { TextField, TextFieldInput } from "../ui/text-field"

const flattenMenus = (arr: MenuItemType[]): MenuItemType[] => {
	const result = []

	function recurse(items: MenuItemType[]) {
		for (const item of items) {
			if (item.children) {
				recurse(item.children)
			} else {
				result.push(item)
			}
		}
	}

	recurse(arr)
	return result
}

interface SearchItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
	title: string
	description: string
}

const SearchItem = (props: SearchItemProps) => {
	const [local, other] = splitProps(props, ["title", "description"])

	return (
		<div
			class="flex flex-row gap-4 rounded-md p-4 hover:bg-muted hover:outline-none hover:border-transparent cursor-pointer"
			{...other}
		>
			<span class="text-2xl text-muted-foreground">#</span>
			<div class="flex flex-col">
				<span class="text-lg text-foreground">{local.title}</span>
				<span class="text-muted-foreground text-md">
					{local.description}
				</span>
			</div>
		</div>
	)
}

const SearchInput = () => {
	const { t } = useLocale()
	const navigate = useNavigate()

	const inputClass =
		"h-8 border-none px-4  rounded-none rounded-l-md  focus:outline-none focus:border-transparent hover:bg-hover-muted hover:outline-none hover:border-transparent cursor-pointer"

	const [dialogIsOpen, setDialogIsOpen] = createSignal(false)

	const openDialog = () => {
		setDialogIsOpen(true)
		setInputValue("")
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === "k") {
			event.preventDefault()
			openDialog()
		}
	}

	const handleNavigate = (href: string) => {
		navigate(href)
		setDialogIsOpen(false)
	}

	const [inputValue, setInputValue] = createSignal("")

	const flattendMenus = flattenMenus(createMenus())

	const searchMenus = createMemo(() => {
		return flattendMenus.filter((menu) => {
			const text =
				typeof menu.text === "function" ? menu.text() : menu.text

			return text.toLowerCase().includes(inputValue().toLowerCase())
		})
	})

	// 注册和清理快捷键事件
	createEffect(() => {
		window.addEventListener("keydown", handleKeyDown)
	})

	onCleanup(() => {
		window.removeEventListener("keydown", handleKeyDown)
	})

	return (
		<>
			<div class="flex flex-row border rounded-md" onClick={openDialog}>
				<input
					class={inputClass}
					type="text"
					placeholder={t.common.search_placeholder()}
					readOnly
				/>
				<Button
					variant="outline"
					class="h-8 w-12 border-none bg-background rounded-none rounded-r-md"
				>
					⌘+K
				</Button>
			</div>

			<AlertDialog open={dialogIsOpen()} onOpenChange={setDialogIsOpen}>
				<AlertDialogContent>
					<AlertDialogTitle class="mt-4">
						<TextField>
							<TextFieldInput
								type="text"
								placeholder={t.common.search_placeholder()}
								onInput={(e) =>
									setInputValue(e.currentTarget.value)
								}
								onKeyDown={(e) => {
									if (
										e.key === "Enter" &&
										searchMenus().length === 1
									) {
										handleNavigate(searchMenus()[0].href)
									}
								}}
							/>
						</TextField>
					</AlertDialogTitle>
					<AlertDialogDescription>
						<For each={searchMenus()}>
							{(menu) => (
								<SearchItem
									title={
										typeof menu.text === "function"
											? menu.text()
											: menu.text
									}
									description={
										typeof menu.description === "function"
											? menu.description()
											: menu.description
									}
									onClick={() => {
										handleNavigate(menu.href)
									}}
								/>
							)}
						</For>
					</AlertDialogDescription>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

export default SearchInput
