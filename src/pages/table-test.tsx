// Start of Selection
import { AiOutlineCloudDownload, AiOutlineFileAdd } from "solid-icons/ai"
import { createSignal } from "solid-js"
import { createStore } from "solid-js/store"
import ButtonRadioGroup from "~/components/framework/button-radio-group"
import DatePickerRange from "~/components/framework/date-picker/range"
import RadioGroup from "~/components/framework/radio-group"
import { Badge } from "~/components/ui/badge"
import { Avatar } from "~/components/ui/avatar"
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
import ProTable from "~/components/framework/table/pro-table"

const TableTest = () => {
	type User = {
		name: string
		age: number
		email: string
		gender: "男" | "女" | "其他"
		registrationDate: string
		status: "活跃" | "非活跃"
		profilePicture: string
	}

	const [data] = createSignal<User[]>([
		{
			name: "John",
			age: 20,
			email: "john@doe.com",
			gender: "男",
			registrationDate: "2023-01-15",
			status: "活跃",
			profilePicture: "https://via.placeholder.com/40",
		},
		{
			name: "Jane",
			age: 21,
			email: "jane@doe.com",
			gender: "女",
			registrationDate: "2023-02-20",
			status: "非活跃",
			profilePicture: "https://via.placeholder.com/40",
		},
		{
			name: "Doe",
			age: 22,
			email: "doe@doe.com",
			gender: "其他",
			registrationDate: "2023-03-10",
			status: "活跃",
			profilePicture: "https://via.placeholder.com/40",
		},
	])

	const [params, setParams] = createStore({
		name: "",
		age: 0,
		unit: "",
		status: "normal",
		time: [],
	})

	const handleSelectionChange = (selectedRows: User[]) => {
		console.log(selectedRows)
	}

	return (
		<div class="flex flex-col gap-4">
			<Card>
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
						<Col span={1} class="flex flex-row items-center gap-2">
							<span class="text-sm">状态：</span>
							<ButtonRadioGroup
								items={[
									{ value: "normal", label: "待支付" },
									{ value: "disabled", label: "待发货" },
								]}
								value={params.status}
								onChange={(value) => {
									setParams("status", value)
								}}
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

			<Card>
				<CardHeader class="flex-none">
					<div class="flex flex-row items-center gap-4">
						<Button variant="outline" size="xs" class="p-4">
							添加
							<AiOutlineFileAdd size={20} class="ml-2" />
						</Button>
						<Button variant="outline" size="xs" class="p-4">
							导出
							<AiOutlineCloudDownload size={20} class="ml-2" />
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<ProTable
						onSelectionChange={handleSelectionChange}
						data={data()}
						columns={[
							{
								id: "name",
								accessorKey: "name",
								header: "姓名",
								cell: ({ row }) => row.original.name,
								width: "200px",
								isSortable: false,
							},
							{
								id: "age",
								accessorKey: "age",
								header: "年龄",
								cell: ({ row }) => row.original.age,
								width: "100px",
							},
							{
								id: "email",
								accessorKey: "email",
								header: "邮箱",
								cell: (props) => (
									<Badge variant="outline">
										{props.row.original.email}
									</Badge>
								),
							},
							{
								id: "gender",
								accessorKey: "gender",
								header: "性别",
								cell: (props) => (
									<Badge>{props.row.original.gender}</Badge>
								),
								width: "80px",
							},
							{
								id: "registrationDate",
								accessorKey: "registrationDate",
								header: "注册日期",
								cell: ({ row }) =>
									row.original.registrationDate,
								width: "150px",
							},
							{
								id: "status",
								accessorKey: "status",
								header: "状态",
								cell: (props) => (
									<Badge>{props.row.original.status}</Badge>
								),
								width: "100px",
							},
							{
								id: "profilePicture",
								accessorKey: "profilePicture",
								header: "头像",
								cell: (props) => (
									<img
										src={props.row.original.profilePicture}
										alt={props.row.original.name}
										class="w-10 h-10 rounded-full"
									/>
								),
								width: "60px",
							},
							{
								id: "actions",
								accessorKey: "actions",
								header: "操作",
								cell: (props) => (
									<div class="flex gap-2">
										<Button variant="link" size="sm">
											编辑
										</Button>
										<Button
											variant="link"
											size="sm"
											color="destructive"
										>
											删除
										</Button>
									</div>
								),
								width: "150px",
							},
						]}
					/>
				</CardContent>
				<CardFooter class="flex justify-end flex-none">
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
		</div>
	)
}

export default TableTest
