import { AiOutlineCloudDownload, AiOutlineFileAdd } from "solid-icons/ai"
import { createSignal } from "solid-js"
import DatePickerRange from "~/components/framework/date-picker/range"
import RadioGroup from "~/components/framework/radio-group"
import RangeDatePicker from "~/components/framework/range-date-picker"
import ProTable from "~/components/framework/table"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
import { Col, Grid } from "~/components/ui/grid"
import {
	Pagination,
	PaginationEllipsis,
	PaginationItem,
	PaginationItems,
	PaginationNext,
	PaginationPrevious,
} from "~/components/ui/pagination"

import {
	TextField,
	TextFieldInput,
	TextFieldLabel,
} from "~/components/ui/text-field"

const TableTest = () => {
	type User = {
		name: string
		age: number
		email: string
	}

	const [data] = createSignal<User[]>([
		{ name: "John", age: 20, email: "john@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Doe", age: 22, email: "doe@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
		{ name: "Jane", age: 21, email: "jane@doe.com" },
	])

	return (
		<>
			{/* <div class="my-4 flex flex-col gap-4 px-2 bg-background rounded-md p-4">
                
            </div> */}

			<Card hover="none" class="mb-4">
				<CardHeader />
				<CardContent class="flex flex-col gap-4">
					<Grid cols={4} class="gap-4">
						<Col span={1}>
							<TextField class="flex flex-row items-center">
								<TextFieldLabel class="w-[60px]">
									姓名：
								</TextFieldLabel>
								<TextFieldInput
									type="text"
									placeholder="请输入姓名"
									class="h-8"
								/>
							</TextField>
						</Col>
						<Col span={1}>
							<TextField class="flex flex-row items-center">
								<TextFieldLabel class="w-[60px]">
									年龄：
								</TextFieldLabel>
								<TextFieldInput
									type="number"
									placeholder="请输入年龄"
									class="h-8"
								/>
							</TextField>
						</Col>
						<Col span={1}>
							<TextField class="flex flex-row items-center">
								<TextFieldLabel class="w-[60px]">
									单位：
								</TextFieldLabel>
								<TextFieldInput
									type="text"
									placeholder="请输入单位"
									class="h-8"
								/>
							</TextField>
						</Col>
					</Grid>

					<Grid>
						<Col span={1} class="flex flex-row items-center">
							<span class="text-sm">状态：</span>
							<RadioGroup
								items={[
									{ value: "normal", label: "待支付" },
									{ value: "disabled", label: "待发货" },
								]}
							/>
						</Col>
					</Grid>

					<Grid>
						<Col span={1} class="flex flex-row items-center gap-2">
							<span class="text-sm">时间：</span>
							<DatePickerRange />
						</Col>
					</Grid>

					<div class="flex flex-row justify-end gap-4">
						<Button size="sm">搜索</Button>
						<Button size="sm" variant="outline">
							重置
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card hover="none" class=" border-none">
				<CardHeader>
					<div class="flex flex-row items-center gap-4">
						<Button variant="primary" size="xs">
							添加
							<AiOutlineFileAdd size={20} class="ml-2" />
						</Button>
						<Button variant="outline" size="xs">
							导出
							<AiOutlineCloudDownload size={20} class="ml-2" />
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<ProTable
						class="h-[400px]"
						data={data()}
						columns={[
							{
								accessorKey: "name",
								header: "姓名",
								cell: ({ row }) => row.original.name,
								width: "200px",
							},
							{
								accessorKey: "age",
								header: "年龄",
								cell: ({ row }) => row.original.age,
								width: "100px",
							},
							{
								accessorKey: "email",
								header: "邮箱",
								cell: (props) => (
									<Badge>{props.row.original.email}</Badge>
								),
							},
						]}
					/>
				</CardContent>
				<CardFooter class="flex justify-end">
					<Pagination
						count={10}
						fixedItems
						page={1}
						itemComponent={(props) => (
							<PaginationItem page={props.page}>
								{props.page}
							</PaginationItem>
						)}
						ellipsisComponent={() => <PaginationEllipsis />}
					>
						<PaginationPrevious />
						<PaginationItems />
						<PaginationNext />
					</Pagination>
				</CardFooter>
			</Card>
		</>
	)
}

export default TableTest
