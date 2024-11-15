import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { ColumnDef } from "@tanstack/solid-table"
import { type ProTableColumn } from "~/components/framework/table/types"
import { User } from "./types"

export const columns: ProTableColumn<User>[] = [
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
			<Badge variant="outline">{props.row.original.email}</Badge>
		),
	},
	{
		id: "gender",
		accessorKey: "gender",
		header: "性别",
		cell: (props) => <Badge>{props.row.original.gender}</Badge>,
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
		cell: ({ row }) => row.original.skills.join(", "),
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
		cell: ({ row }) => row.original.registrationDate,
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
		cell: (props) => <Badge>{props.row.original.status}</Badge>,
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
]
