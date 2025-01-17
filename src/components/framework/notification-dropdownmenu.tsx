import { useColorMode } from "@kobalte/core/color-mode"
import { useNavigate } from "@solidjs/router"
import { AiOutlineRight, AiTwotoneNotification } from "solid-icons/ai"
import { For, createMemo, createSignal } from "solid-js"
import { useLocale } from "~/i18n/lib"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface MessageItemProps {
	id: string
	title: string
	description: string
	link: string
	type?: "error" | "warning" | "info" | "read"
	onClick?: (id: string) => void
}

const MessageItem = (props: MessageItemProps) => {
	const titleColor = createMemo(() => {
		switch (props.type) {
			case "error":
				return "text-destructive"
			case "warning":
				return "text-yellow-500"
			case "info":
				return "text-blue-500"
			case "read":
				return "text-gray-500"
			default:
				return "text-foreground"
		}
	})

	return (
		<div
			class="flex flex-row items-center justify-between hover:bg-muted p-2 rounded-md cursor-pointer"
			onClick={() => {
				props.onClick?.(props.id)
			}}
		>
			<div class="flex flex-col">
				<span class={titleColor()}>{props.title}</span>
				<span class="text-sm text-gray-500 truncate w-60">
					{props.description}
				</span>
			</div>
			<AiOutlineRight class="text-gray-500" size={16} />
		</div>
	)
}

interface NotificationDropdownMenuProps {
	messages: MessageItemProps[]
}

const NotificationDropdownMenu = (props: NotificationDropdownMenuProps) => {
	const { t } = useLocale()

	const [selectedMessage, setSelectdMessage] =
		createSignal<MessageItemProps | null>(null)

	const { colorMode } = useColorMode()

	const [isOpenDialog, setIsOpenDialog] = createSignal(false)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div class="relative">
					<AiTwotoneNotification
						size={22}
						color={colorMode() === "light" ? "black" : "white"}
					/>
					<Badge
						variant="destructive"
						round
						size="xs"
						class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
					>
						{
							props.messages.filter(
								(message) => message.type !== "read",
							).length
						}
					</Badge>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent class="p-4">
				<div class="mb-4 flex flex-col">
					<span class="text-lg font-bold">
						{t.common.notification_title()}
					</span>
					<span class="text-sm text-gray-500">
						{t.common.notification_description()}
					</span>
				</div>
				<div class="max-h-80 overflow-y-auto">
					<For each={props.messages}>
						{(message) => (
							<MessageItem
								{...message}
								onClick={(id) => {
									setSelectdMessage(
										props.messages.find(
											(item) => item.id === id,
										),
									)

									setIsOpenDialog(true)
								}}
							/>
						)}
					</For>
				</div>
				<Dialog open={isOpenDialog()} onOpenChange={setIsOpenDialog}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{selectedMessage().title}</DialogTitle>
							<DialogDescription>
								{selectedMessage().description}
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setIsOpenDialog(false)}
							>
								{t.actions.later()}
							</Button>
							<Button onClick={() => setIsOpenDialog(false)}>
								{t.actions.accept()}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default NotificationDropdownMenu
