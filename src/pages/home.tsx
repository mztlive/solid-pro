import { AiOutlineDashboard, AiTwotoneSetting } from 'solid-icons/ai'
import { ParentProps, Suspense } from 'solid-js'
import { MenuItem, Sidebar } from '~/components/ui/sidebar/sidebar'
import AvatarDropdownMenu from '~/components/framework/avatar-dropdownmenu'
import SettingsSheet from '~/components/framework/settings-sheet'
import SearchInput from '~/components/framework/search-input'
import NotificationDropdownMenu from '~/components/framework/notification-dropdownmenu'
import ColorModeDropdownmenu from '~/components/framework/color-model-dropdownment'
import { useColorMode } from '@kobalte/core/color-mode'
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbEllipsis
} from '~/components/ui/breadcrumb'
import PageSkeleton from '~/components/framework/page-skeleton'
import { useLocale } from '~/i18n/lib'

const Home = (props: ParentProps) => {
    const { t } = useLocale()

    const { colorMode } = useColorMode()

    const menus: MenuItem[] = [
        {
            text: t.menu.dashboard,
            icon: <AiOutlineDashboard size={20} />,
            href: '/'
        }
    ]

    return (
        <div class="flex flex-row h-screen w-full">
            <Sidebar menuItems={menus} />
            <div class="w-full flex flex-col bg-background">
                <nav class="w-full fixed flex justify-between flex-row items-center pl-8 pr-16 py-8 h-14 sticky top-0 border-b border-muted">
                    <div></div>
                    <div class="flex flex-row items-center gap-8">
                        <SearchInput />
                        <ColorModeDropdownmenu />
                        <SettingsSheet>
                            <AiTwotoneSetting
                                size={22}
                                color={
                                    colorMode() == 'light' ? 'black' : 'white'
                                }
                            />
                        </SettingsSheet>

                        <NotificationDropdownMenu
                            messages={[
                                {
                                    id: '123123123',
                                    title: 'Wrong!',
                                    description:
                                        'Password Changed. if you are not you, please change it immediately.',
                                    link: '/',
                                    type: 'error'
                                }
                            ]}
                        />
                        <AvatarDropdownMenu />
                    </div>
                </nav>
                <main class="overflow-hidden w-full px-10 py-2 flex flex-col">
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
                    <Suspense fallback={<PageSkeleton />}>
                        <div class="mt-4 pb-10 overflow-y-auto">
                            {props.children}
                        </div>
                    </Suspense>
                </main>
            </div>
        </div>
    )
}

export default Home
