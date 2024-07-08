import DatePicker from '@rnwonder/solid-date-picker'
import './style.css'
import '@rnwonder/solid-date-picker/dist/style.css'
import { DatePickerInputSJProps } from '@rnwonder/solid-date-picker/dist/components/DatePickerGroup'
import { cn } from '~/lib/utils'
import { splitProps } from 'solid-js'

interface DatePickerRangeProps extends DatePickerInputSJProps {}

const DatePickerRange = (props: DatePickerRangeProps) => {
    const [local, other] = splitProps(props, ['inputClass'])

    const standardInputClass =
        'h-8 border text-md px-4 rounded-md  focus:outline-none focus:border-transparent hover:bg-hover-muted hover:outline-none hover:border-transparent cursor-pointer'

    return (
        <div>
            <DatePicker
                {...other}
                type="range"
                twoMonthsDisplay
                renderInput={({ value, showDate }) => (
                    <input
                        class={cn(standardInputClass, local.inputClass)}
                        value={value().label}
                        onClick={() => showDate()}
                        placeholder="Select a date"
                    />
                )}
            />
        </div>
    )
}

export default DatePickerRange
