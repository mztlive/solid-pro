import { DropdownMenu } from '@kobalte/core/dropdown-menu'
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useI18nContext } from '~/providers/i18n-provider'

const AvatarDropdownMenu = () => {
    const { t } = useI18nContext()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar class="w-10 h-10">
                    <AvatarImage src="https://github.com/sek-consulting.png" />
                    <AvatarFallback>EK</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    {t('setting.change_password')}
                </DropdownMenuItem>
                <DropdownMenuItem>{t('setting.logout')}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AvatarDropdownMenu
