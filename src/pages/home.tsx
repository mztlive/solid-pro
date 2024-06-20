import {
    AiFillNotification,
    AiFillSetting,
    AiOutlineDashboard,
    AiOutlineLeft,
    AiOutlineNotification,
    AiOutlineRight,
    AiOutlineSearch,
    AiTwotoneNotification,
    AiTwotoneSetting
} from 'solid-icons/ai'
import { IoLogOutSharp } from 'solid-icons/io'
import { ParentProps, Suspense } from 'solid-js'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { MenuItem, Sidebar } from '~/components/ui/sidebar/sidebar'
import { Skeleton } from '~/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import {
    TextField,
    TextFieldInput,
    TextFieldLabel
} from '~/components/ui/text-field'
import { LocaleOption, useI18nContext } from '~/providers/i18n-provider'
import { VsColorMode } from 'solid-icons/vs'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '~/components/ui/sheet'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '~/components/ui/select'
import LocaleSelect from '~/components/bussines/locale-select'
import AvatarDropdownMenu from '~/components/bussines/avatar-dropdownmenu'
import SettingsSheet from '~/components/bussines/settings-sheet'
import SearchInput from '~/components/bussines/search-input'
import { Card } from '~/components/ui/card'
import { Timeline } from '~/components/ui/timeline'
import NotificationDropdownMenu from '~/components/bussines/notification-dropdownmenu'

const Home = (props: ParentProps) => {
    const { t } = useI18nContext()

    const menus: MenuItem[] = [
        {
            text: 'menu.dashboard',
            icon: <AiOutlineDashboard size={20} />,
            children: [
                {
                    icon: <AiOutlineDashboard size={20} />,
                    text: 'test'
                }
            ]
        },
        {
            text: 'menu.dashboard',
            icon: <AiOutlineDashboard size={20} />,
            children: [
                {
                    icon: <AiOutlineDashboard size={20} />,
                    text: 'test'
                }
            ]
        },
        {
            text: 'menu.dashboard',
            icon: <AiOutlineDashboard size={20} />
        }
    ]

    return (
        <div class="overflow-hidden h-screen w-full flex flex-row bg-gray-100">
            {/* Sidebar */}
            <Sidebar menuItems={menus} />

            {/* 右侧 */}
            <div class="w-full overflow-y-auto flex flex-col">
                <nav class="w-full bg-white fixed flex justify-between flex-row items-center px-16 py-8 h-14 sticky top-0">
                    <div>{/* Todo */}</div>
                    <div class="flex flex-row items-center gap-8">
                        <SearchInput />
                        <VsColorMode size={20} />
                        <SettingsSheet>
                            <AiTwotoneSetting size={22} />
                        </SettingsSheet>

                        <NotificationDropdownMenu
                            messages={[
                                {
                                    id: '123123123',
                                    title: 'Wrong!',
                                    description:
                                        'Password Changed. if you are not you, please change it immediately.',
                                    link: '/'
                                }
                            ]}
                        />
                        <AvatarDropdownMenu />
                    </div>
                </nav>
                <main class="w-full">
                    <Suspense
                        fallback={
                            <Skeleton width={100} height={100} radius={10} />
                        }
                    >
                        {props.children}
                    </Suspense>
                </main>
            </div>
        </div>
    )
}

export default Home
