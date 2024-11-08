import { useColorMode } from "@kobalte/core/color-mode"
import { DropdownMenu } from "@kobalte/core/dropdown-menu"
import { VsColorMode } from "solid-icons/vs"
import { BsSunFill, BsMoonFill } from "solid-icons/bs"
import { HiSolidComputerDesktop } from "solid-icons/hi"
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

	const currentIcon = () => {
		switch (colorMode()) {
			case "dark":
				return <BsMoonFill size={20} />
			case "light":
				return <BsSunFill size={20} />
			default:
				// return <VscSymbolColor size={20} />
				return <HiSolidComputerDesktop size={20} />
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>{currentIcon()}</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={() => setColorMode("dark")}>
					<BsMoonFill class="mr-2" size={16} />
					{t.setting.color_mode_dark()}
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => setColorMode("light")}>
					<BsSunFill class="mr-2" size={16} />
					{t.setting.color_mode_light()}
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => setColorMode("system")}>
					<HiSolidComputerDesktop class="mr-2" size={16} />
					{t.setting.color_mode_system()}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ColorModeDropdownmenu
