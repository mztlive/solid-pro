// Start of Selection
import { AiOutlineCloudDownload, AiOutlineFileAdd } from "solid-icons/ai"
import { createSignal } from "solid-js"
import DatePickerRange from "~/components/framework/date-picker/range"
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
import ProTable from "~/components/framework/table/pro-table"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select"

const TableTest = () => {
	type User = {
		name: string
		age: number
		email: string
		gender: "男" | "女" | "其他"
		registrationDate: string
		status: "活跃" | "非活跃"
		profilePicture: string
		phone: string
		address: string
		company: string
		department: string
		position: string
		salary: number
		level: string
		skills: string[]
		education: string
		graduateSchool: string
		major: string
		entryDate: string
		birthDate: string
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
			phone: "13800138000",
			address: "北京市朝阳区某某街道",
			company: "某某科技有限公司",
			department: "研发部",
			position: "高级工程师",
			salary: 25000,
			level: "P6",
			skills: ["React", "TypeScript", "Node.js"],
			education: "硕士",
			graduateSchool: "北京大学",
			major: "计算机科学",
			entryDate: "2022-06-01",
			birthDate: "1993-01-01",
		},
		{
			name: "Jane",
			age: 21,
			email: "jane@doe.com",
			gender: "女",
			registrationDate: "2023-02-20",
			status: "非活跃",
			profilePicture: "https://via.placeholder.com/40",
			phone: "13900139000",
			address: "上海市浦东新区某某路",
			company: "某某网络科技",
			department: "产品部",
			position: "产品经理",
			salary: 22000,
			level: "P5",
			skills: ["产品设计", "用户研究", "数据分析"],
			education: "本科",
			graduateSchool: "复旦大学",
			major: "工商管理",
			entryDate: "2022-03-15",
			birthDate: "1994-05-15",
		},
		{
			name: "Doe",
			age: 22,
			email: "doe@doe.com",
			gender: "其他",
			registrationDate: "2023-03-10",
			status: "活跃",
			profilePicture: "https://via.placeholder.com/40",
			phone: "13700137000",
			address: "深圳市南山区某某路",
			company: "某某信息技术",
			department: "设计部",
			position: "UI设计师",
			salary: 18000,
			level: "P4",
			skills: ["UI设计", "交互设计", "Figma"],
			education: "本科",
			graduateSchool: "浙江大学",
			major: "视觉设计",
			entryDate: "2022-09-01",
			birthDate: "1995-08-20",
		},
	])

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

						<Col span={1} class="flex flex-row items-center gap-2">
							<span class="text-sm">状态：</span>
							<Select
								class="flex-1"
								multiple
								options={["待发货", "待支付"]}
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
								isSortable: false,
							},
							{
								id: "age",
								accessorKey: "age",
								header: "年龄",
								cell: ({ row }) => row.original.age,
							},
							{
								id: "phone",
								accessorKey: "phone",
								header: "电话",
								cell: ({ row }) => row.original.phone,
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
							},
							{
								id: "company",
								accessorKey: "company",
								header: "公司",
								cell: ({ row }) => row.original.company,
							},
							{
								id: "department",
								accessorKey: "department",
								header: "部门",
								cell: ({ row }) => row.original.department,
							},
							{
								id: "position",
								accessorKey: "position",
								header: "职位",
								cell: ({ row }) => row.original.position,
							},
							{
								id: "salary",
								accessorKey: "salary",
								header: "薪资",
								cell: ({ row }) => `¥${row.original.salary}`,
							},
							{
								id: "level",
								accessorKey: "level",
								header: "职级",
								cell: ({ row }) => row.original.level,
							},
							{
								id: "skills",
								accessorKey: "skills",
								header: "技能",
								cell: ({ row }) =>
									row.original.skills.join(", "),
							},
							{
								id: "education",
								accessorKey: "education",
								header: "学历",
								cell: ({ row }) => row.original.education,
							},
							{
								id: "graduateSchool",
								accessorKey: "graduateSchool",
								header: "毕业院校",
								cell: ({ row }) => row.original.graduateSchool,
							},
							{
								id: "major",
								accessorKey: "major",
								header: "专业",
								cell: ({ row }) => row.original.major,
							},
							{
								id: "registrationDate",
								accessorKey: "registrationDate",
								header: "注册日期",
								cell: ({ row }) =>
									row.original.registrationDate,
							},
							{
								id: "entryDate",
								accessorKey: "entryDate",
								header: "入职日期",
								cell: ({ row }) => row.original.entryDate,
							},
							{
								id: "birthDate",
								accessorKey: "birthDate",
								header: "出生日期",
								cell: ({ row }) => row.original.birthDate,
							},
							{
								id: "status",
								accessorKey: "status",
								header: "状态",
								cell: (props) => (
									<Badge>{props.row.original.status}</Badge>
								),
							},
							{
								id: "address",
								accessorKey: "address",
								header: "地址",
								cell: ({ row }) => row.original.address,
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
							},
							{
								id: "actions",
								accessorKey: "actions",
								header: "",
								cell: (props) => (
									<div class="flex gap-2">
										<Button
											variant="link"
											size="sm"
											onClick={(e) => {
												e.stopPropagation()
											}}
										>
											编辑
										</Button>
										<Button
											variant="link"
											size="sm"
											color="destructive"
											onClick={(e) => {
												e.stopPropagation()
											}}
										>
											删除
										</Button>
									</div>
								),
								isSortable: false,
								isPinned: "right",
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
		</div>
	)
}

export default TableTest
