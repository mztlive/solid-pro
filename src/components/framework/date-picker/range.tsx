import DatePicker from "@rnwonder/solid-date-picker"
// import "./style.css"
import "@rnwonder/solid-date-picker/dist/style.css"
import "@rnwonder/solid-date-picker/themes/shad-cn-ui"

import type { DatePickerInputSJProps } from "@rnwonder/solid-date-picker/dist/components/DatePickerGroup"
import dayjs from "dayjs"
import { splitProps } from "solid-js"
import { cn } from "~/lib/utils"

interface DatePickerRangeProps extends DatePickerInputSJProps {}

const DatePickerRange = (props: DatePickerRangeProps) => {
	const [local, other] = splitProps(props, ["inputClass"])

	const standardInputClass =
		"h-8 border text-md px-4 rounded-md w-60 focus:outline-none focus:border-transparent hover:bg-muted hover:outline-none hover:border-transparent cursor-pointer"

	return (
		<div>
			<DatePicker
				{...other}
				type="range"
				twoMonthsDisplay
				renderInput={({ value, showDate }) => (
					<input
						class={cn(standardInputClass, local.inputClass)}
						value={`${dayjs(value().value.start).format("YYYY-MM-DD")} ~ ${dayjs(value().value.end).format("YYYY-MM-DD")}`}
						onClick={() => showDate()}
						placeholder="Select a date"
					/>
				)}
			/>
		</div>
	)
}

export default DatePickerRange
