import { Resolver } from '@solid-primitives/i18n'
import { JSX } from 'solid-js'

export type MenuItem = {
    icon?: JSX.Element
    text: string | Resolver<string, string>
    children?: MenuItem[]
    description?: string | Resolver<string, string>
    href?: string
}
