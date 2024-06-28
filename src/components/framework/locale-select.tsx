import { Locale, LocaleOption, useI18nContext } from '~/providers/i18n-provider'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select'
import { useLocale } from '~/i18n/lib'

const LocaleSelect = () => {
    const { t, locale, setLocale, localeOptions } = useLocale()

    const options = localeOptions.map((option) => option.label)

    const translateLocaleValue = (value: Locale) => {
        const localeItem = localeOptions.find(
            (option) => option.value === value
        )
        return localeItem?.label
    }

    return (
        <Select
            value={translateLocaleValue(locale())}
            options={options}
            onChange={(e) => {
                const localeItem = localeOptions.find(
                    (option) => option.label === e
                )

                if (localeItem) {
                    setLocale(localeItem.value)
                }
            }}
            placeholder={t.common.language_select_placeholder()}
            itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
        >
            <SelectTrigger aria-label="Fruit" class="w-[180px] h-8 mt-2">
                <SelectValue<string>>
                    {(state) => state.selectedOption()}
                </SelectValue>
            </SelectTrigger>
            <SelectContent />
        </Select>
    )
}

export default LocaleSelect
