import { DropdownMenu } from '@kobalte/core/dropdown-menu'
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useI18nContext } from '~/providers/i18n-provider'
import { VsColorMode } from 'solid-icons/vs'
import { useColorMode } from '@kobalte/core/color-mode'

const ColorModeDropdownmenu = () => {
    const { t } = useI18nContext()

    const { setColorMode, colorMode } = useColorMode()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <VsColorMode
                    size={20}
                    color={colorMode() == 'light' ? 'black' : 'white'}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setColorMode('dark')}>
                    {t.setting.color_mode_dark()}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setColorMode('light')}>
                    {t.setting.color_mode_light()}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setColorMode('system')}>
                    {t.setting.color_mode_system()}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ColorModeDropdownmenu
