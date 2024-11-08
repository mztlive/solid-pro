import { useColorMode } from "@kobalte/core/color-mode"
import { AiTwotoneSetting } from "solid-icons/ai"
import AvatarDropdownMenu from "./avatar-dropdownmenu"
import NotificationDropdownMenu from "./notification-dropdownmenu"
import SearchInput from "./search-input"
import SettingsSheet from "./settings-sheet"
import { useLocale } from "~/i18n/lib"
import ColorModeDropdownmenu from "./color-model-dropdownment"

const Navbar = () => {
	const { colorMode } = useColorMode()
	const { t } = useLocale()

	return (
		<nav class="w-full fixed flex  justify-between  flex-row items-center px-10 py-8 h-14 sticky top-0 border-b border-border">
			<div>
				<span class="text-xl font-bold">{t.prject_name()}</span>
			</div>
			<div class="flex flex-row items-center gap-8">
				<SearchInput />
				<ColorModeDropdownmenu />
				<SettingsSheet>
					<AiTwotoneSetting
						size={22}
						color={colorMode() === "light" ? "black" : "white"}
					/>
				</SettingsSheet>

				<NotificationDropdownMenu
					messages={[
						{
							id: "123123123",
							title: "Wrong!",
							description:
								"Password Changed. if you are not you, please change it immediately.",
							link: "/",
							type: "error",
						},
					]}
				/>
				<AvatarDropdownMenu />
			</div>
		</nav>
	)
}

export default Navbar
