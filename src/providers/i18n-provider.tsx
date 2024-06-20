import {
    Accessor,
    ParentProps,
    Setter,
    createContext,
    createMemo,
    createSignal,
    useContext
} from 'solid-js'
import { en } from '~/i18n/en'
import { zh } from '~/i18n/zh'
import { vn } from '~/i18n/vn'
import * as i18n from '@solid-primitives/i18n'

// 这里是有问题的，不知道为什么不多写一个 '' t就会报错
export type Locale = 'en' | 'zh' | 'vn' | ''

interface I18nContextProps {
    t: (key: string) => string
    locale: Accessor<Locale>
    setLocale: Setter<Locale>
    localeOptions: LocaleOption[]
}

export interface LocaleOption {
    label: string
    value: Locale
    disabled?: boolean
}

export const i18nContext = createContext<I18nContextProps>()

export const I18nProvider = (props: ParentProps) => {
    const dictionaries = {
        zh: zh,
        en: en,
        vn: vn
    }

    const localeOptions: LocaleOption[] = [
        { label: 'English', value: 'en' },
        { label: '简体中文', value: 'zh' },
        { label: 'Tiếng Việt', value: 'vn' }
    ]

    const [locale, setLocale] = createSignal<Locale>('en')
    const dict = createMemo(() => i18n.flatten(dictionaries[locale()]))

    const t = i18n.translator(dict)

    return (
        <i18nContext.Provider value={{ t, locale, setLocale, localeOptions }}>
            {props.children}
        </i18nContext.Provider>
    )
}

export const useI18nContext = () => {
    const context = useContext(i18nContext)
    if (!context) {
        throw new Error('useI18nProvider must be used within a I18nProvider')
    }
    return context
}
