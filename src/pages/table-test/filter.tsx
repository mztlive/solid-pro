import RangeDatePicker from "~/components/framework/range-date-picker"
import { Button } from "~/components/ui/button"
import { Col } from "~/components/ui/grid"

import { Grid } from "~/components/ui/grid"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select"
import {
	TextField,
	TextFieldInput,
	TextFieldLabel,
} from "~/components/ui/text-field"
import { DateValue } from "@ark-ui/solid"
import { rangeDateForCurrentMonth } from "~/libs/datetime"
import { createMemo, createSignal } from "solid-js"
import { createStore } from "solid-js/store"

type UserTableFilterParams = {
	name: string
	status: string[]
	company: string
	date: [DateValue, DateValue]
}

interface FilterProps {
	onSearch: (params: UserTableFilterParams) => void
}

const Filter = (props: FilterProps) => {
	const [date, setDate] = createSignal<[DateValue, DateValue]>(
		rangeDateForCurrentMonth(),
	)

	const [baseParams, setBaseParams] = createStore({
		name: "",
		status: [],
		company: "",
		age: "",
	})

	const searchParams = createMemo<UserTableFilterParams>(() => ({
		...baseParams,
		date: date(),
	}))

	const reset = () => {
		setBaseParams({
			name: "",
			status: [],
			company: "",
			age: "",
		})
		setDate(rangeDateForCurrentMonth())
	}

	return (
		<>
			<Grid cols={4} class="gap-4">
				<Col span={1}>
					<TextField class="flex flex-row items-center">
						<TextFieldLabel class="w-[60px]">姓名：</TextFieldLabel>
						<TextFieldInput
							type="text"
							placeholder="请输入姓名"
							class="h-8"
							value={baseParams.name}
							onChange={(e) =>
								setBaseParams("name", e.currentTarget.value)
							}
						/>
					</TextField>
				</Col>
				<Col span={1}>
					<TextField class="flex flex-row items-center">
						<TextFieldLabel class="w-[60px]">年龄：</TextFieldLabel>
						<TextFieldInput
							type="number"
							placeholder="请输入年龄"
							class="h-8"
							value={baseParams.age}
							onChange={(e) =>
								setBaseParams("age", e.currentTarget.value)
							}
						/>
					</TextField>
				</Col>
				<Col span={1}>
					<TextField class="flex flex-row items-center">
						<TextFieldLabel class="w-[60px]">单位：</TextFieldLabel>
						<TextFieldInput
							type="text"
							placeholder="请输入单位"
							class="h-8"
							value={baseParams.company}
							onChange={(e) =>
								setBaseParams("company", e.currentTarget.value)
							}
						/>
					</TextField>
				</Col>

				<Col span={1} class="flex flex-row items-center gap-2">
					<span class="text-sm">状态：</span>
					<Select
						class="flex-1 shadow-none"
						multiple
						options={["待发货", "待支付"]}
						onChange={(e) => setBaseParams("status", e)}
						value={baseParams.status}
						itemComponent={(props) => (
							<SelectItem item={props.item}>
								{props.item.rawValue}
							</SelectItem>
						)}
					>
						<SelectTrigger>
							<SelectValue<string>>
								{(state) => state.selectedOption()}
							</SelectValue>
						</SelectTrigger>
						<SelectContent />
					</Select>
				</Col>
			</Grid>

			<Grid>
				<Col span={1} class="flex flex-row items-center gap-2">
					<span class="text-sm">时间：</span>
					<RangeDatePicker value={date()} onChange={setDate} />
				</Col>
			</Grid>

			<div class="flex flex-row justify-end gap-4">
				<Button
					size="sm"
					onClick={() => props.onSearch(searchParams())}
				>
					搜索
				</Button>
				<Button size="sm" variant="outline" onClick={reset}>
					重置
				</Button>
			</div>
		</>
	)
}

export default Filter
