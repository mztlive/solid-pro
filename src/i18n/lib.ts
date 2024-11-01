import * as i18n from "@solid-primitives/i18n"
import { createMemo, createRoot, createSignal } from "solid-js"
import { en } from "~/i18n/en"
import { vn } from "~/i18n/vn"
import { zh } from "~/i18n/zh"

export type Locale = "en" | "zh" | "vn"

export type I18nDictionaries = {
	en: typeof en
	zh: typeof zh
	vn: typeof vn
}

export interface LocaleOption {
	label: string
	value: Locale
	disabled?: boolean
}

const dictionaries: I18nDictionaries = {
	zh: zh,
	en: en,
	vn: vn,
}

const localeOptions: LocaleOption[] = [
	{ label: "English", value: "en" },
	{ label: "简体中文", value: "zh" },
	{ label: "Tiếng Việt", value: "vn" },
]

const i18nStore = createRoot(() => {
	console.log("i18n init.")
	const [locale, setLocale] = createSignal<Locale>("en")

	const dict = createMemo(() => i18n.flatten(dictionaries[locale()]))

	const translator = i18n.translator(() => dict(), i18n.resolveTemplate)

	const t: i18n.ChainedTranslator<I18nDictionaries[Locale], string> =
		i18n.chainedTranslator<I18nDictionaries[Locale], string>(
			dict(),
			translator,
		)

	return { locale, setLocale, t }
})

export const useLocale = () => {
	return {
		t: i18nStore.t,
		locale: i18nStore.locale,
		setLocale: i18nStore.setLocale,
		localeOptions,
	}
}
