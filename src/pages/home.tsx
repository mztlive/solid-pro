import {
    AiFillNotification,
    AiFillSetting,
    AiOutlineAlignLeft,
    AiOutlineAlignRight,
    AiOutlineDashboard,
    AiOutlineLeft,
    AiOutlineNotification,
    AiOutlineRight,
    AiOutlineSearch,
    AiTwotoneNotification,
    AiTwotoneSetting
} from 'solid-icons/ai'
import { IoLogOutSharp } from 'solid-icons/io'
import {
    Match,
    ParentProps,
    Show,
    Suspense,
    Switch,
    createSignal
} from 'solid-js'
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
import LocaleSelect from '~/components/framework/locale-select'
import AvatarDropdownMenu from '~/components/framework/avatar-dropdownmenu'
import SettingsSheet from '~/components/framework/settings-sheet'
import SearchInput from '~/components/framework/search-input'
import { Card } from '~/components/ui/card'
import { Timeline } from '~/components/ui/timeline'
import NotificationDropdownMenu from '~/components/framework/notification-dropdownmenu'
import ColorModeDropdownmenu from '~/components/framework/color-model-dropdownment'
import { useColorMode } from '@kobalte/core/color-mode'
import { SiBoxysvg } from 'solid-icons/si'
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbEllipsis
} from '~/components/ui/breadcrumb'

const Home = (props: ParentProps) => {
    const { t } = useI18nContext()

    const { colorMode } = useColorMode()

    const menus: MenuItem[] = [
        {
            text: t.menu.dashboard,
            icon: <AiOutlineDashboard size={20} />,
            children: [
                {
                    icon: <AiOutlineDashboard size={20} />,
                    text: 'test'
                }
            ]
        },
        {
            text: t.menu.dashboard,
            icon: <AiOutlineDashboard size={20} />,
            children: [
                {
                    icon: <AiOutlineDashboard size={20} />,
                    text: 'test'
                }
            ]
        },
        {
            text: t.menu.dashboard,
            icon: <AiOutlineDashboard size={20} />
        }
    ]

    const [collapsed, setCollapsed] = createSignal(false)

    return (
        <div class="h-screen w-full flex flex-col bg-background">
            <nav class="w-full fixed flex justify-between flex-row items-center pl-8 pr-16 py-8 h-14 sticky top-0 border-b border-muted">
                <div class="flex flex-row items-center gap-8">
                    {/* <img src="/logo.png" alt="logo" class="w-8 h-8" /> */}
                    <SiBoxysvg />
                    <span class="text-foreground">{colorMode()}</span>
                </div>
                <div class="flex flex-row items-center gap-8">
                    <SearchInput />
                    <ColorModeDropdownmenu />
                    <SettingsSheet>
                        <AiTwotoneSetting
                            size={22}
                            color={colorMode() == 'light' ? 'black' : 'white'}
                        />
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
            <main class="overflow-hidden w-full flex flex-row">
                {/* Sidebar */}
                <Sidebar menuItems={menus} />
                <div class="w-full px-10 py-2 flex flex-col">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbEllipsis />
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/components">
                                    Components
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink current>
                                    Breadcrumbs
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <Suspense
                        fallback={
                            <Skeleton width={100} height={100} radius={10} />
                        }
                    >
                        <div class="mt-4 pb-10 overflow-y-auto">
                            {props.children}
                        </div>
                    </Suspense>
                </div>
            </main>
        </div>
    )
}

export default Home
