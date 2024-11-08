import { Skeleton } from "~/components/ui/skeleton"
import { cn } from "~/libs/cn"

interface PageSkeletonProps {
	class?: string
}

const PageSkeleton = (props: PageSkeletonProps) => {
	return (
		<div class={cn("h-full w-full", props.class)}>
			<div class="flex flex-row w-full gap-4">
				<div class="h-40 w-1/3">
					<Skeleton radius={10} height={150} animate />
				</div>
				<div class="h-40 w-1/3">
					<Skeleton radius={10} height={150} animate />
				</div>
				<div class="h-40 w-1/3">
					<Skeleton radius={10} height={150} animate />
				</div>
			</div>

			<div class="flex flex-col w-full gap-2 mt-4">
				<div class="w-3/4">
					<Skeleton height={16} animate />
				</div>
				<div class="w-1/2">
					<Skeleton height={16} animate />
				</div>
				<div class="w-5/6">
					<Skeleton height={16} animate />
				</div>
				<div class="w-2/3">
					<Skeleton height={16} animate />
				</div>
				<div class="w-1/4">
					<Skeleton height={16} animate />
				</div>
			</div>

			<div class="flex flex-row w-full gap-4 mt-4">
				<Skeleton radius={10} height={200} animate />
			</div>

			<div class="flex flex-row w-full gap-4 mt-4">
				<div class="h-40 w-1/2">
					<Skeleton radius={10} height={300} animate />
				</div>
				<div class="h-40 w-1/2">
					<Skeleton radius={10} height={300} animate />
				</div>
			</div>
		</div>
	)
}

export default PageSkeleton
