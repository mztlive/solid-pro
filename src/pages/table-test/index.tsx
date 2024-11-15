// Start of Selection
import { AiOutlineCloudDownload, AiOutlineFileAdd } from "solid-icons/ai"
import { createSignal } from "solid-js"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
import {
	Pagination,
	PaginationEllipsis,
	PaginationItem,
	PaginationItems,
	PaginationNext,
	PaginationPrevious,
} from "~/components/ui/pagination"

import ProTable from "~/components/framework/table/pro-table"

import { columns } from "./columns-def"
import { User } from "./types"
import Filter from "./filter"

const TableTest = () => {
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
					<Filter onSearch={(p) => console.log(p)} />
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
					<ProTable<User>
						onSelectionChange={handleSelectionChange}
						data={data()}
						columns={columns}
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
