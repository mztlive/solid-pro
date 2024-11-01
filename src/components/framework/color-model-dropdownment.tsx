import { useColorMode } from "@kobalte/core/color-mode"
import { DropdownMenu } from "@kobalte/core/dropdown-menu"
import { VsColorMode } from "solid-icons/vs"
import { useLocale } from "~/i18n/lib"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const ColorModeDropdownmenu = () => {
	const { t } = useLocale()

	const { setColorMode, colorMode } = useColorMode()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<VsColorMode
					size={20}
					color={colorMode() === "light" ? "black" : "white"}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={() => setColorMode("dark")}>
					{t.setting.color_mode_dark()}
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => setColorMode("light")}>
					{t.setting.color_mode_light()}
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => setColorMode("system")}>
					{t.setting.color_mode_system()}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ColorModeDropdownmenu
