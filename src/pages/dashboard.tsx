import { BarList } from "~/components/ui/bar-list"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { LineChart, PieChart } from "~/components/ui/charts"
import { Col, Grid } from "~/components/ui/grid"
import { showToast } from "~/components/ui/toast"
import { useLocale } from "~/i18n/lib"

const Dashboard = () => {
	const { t } = useLocale()

	const chartData = {
		labels: [
			"Jan 22",
			"Feb 22",
			"Mar 22",
			"Apr 22",
			"May 22",
			"Jun 22",
			"Jul 22",
			"Aug 22",
			"Sep 22",
			"Oct 22",
			"Nov 22",
			"Dec 22",
		],
		datasets: [
			{
				label: "SemiAnalysis",
				data: [
					2890, 2756, 3322, 3470, 3475, 3129, 3490, 2903, 2643, 2837,
					2954, 3239,
				],
				fill: true,
			},
			{
				label: "The Pragmatic Engineer",
				data: [
					2338, 2103, 2194, 2108, 1812, 1726, 1982, 2012, 2342, 2473,
					3848, 3736,
				],
				fill: true,
			},
		],
	}

	const barListDemo = [
		{
			name: "Twitter",
			value: 456,
			href: "https://twitter.com/tremorlabs",
		},
		{
			name: "Google",
			value: 351,
			href: "https://google.com",
		},
		{
			name: "GitHub",
			value: 271,
			href: "https://github.com/tremorlabs/tremor",
		},
		{
			name: "Reddit",
			value: 191,
			href: "https://reddit.com",
		},
		{
			name: "Youtube",
			value: 91,
			href: "https://www.youtube.com/@tremorlabs3079",
		},
		{
			name: "Youtube",
			value: 91,
			href: "https://www.youtube.com/@tremorlabs3079",
		},
		{
			name: "Youtube",
			value: 91,
			href: "https://www.youtube.com/@tremorlabs3079",
		},
		{
			name: "Youtube",
			value: 91,
			href: "https://www.youtube.com/@tremorlabs3079",
		},
	]

	return (
		<>
			<Grid
				cols={1}
				colsSm={1}
				colsMd={3}
				colsLg={4}
				class="w-full gap-4"
			>
				<Col span={1}>
					<Card>
						<CardHeader>
							<CardTitle>Title</CardTitle>
						</CardHeader>
						<CardContent>KPI 1</CardContent>
					</Card>
				</Col>
				<Col span={1}>
					<Card>
						<CardHeader>
							<CardTitle>Title</CardTitle>
						</CardHeader>
						<CardContent>KPI 1</CardContent>
					</Card>
				</Col>
				<Col span={1}>
					<Card>
						<CardHeader>
							<CardTitle>Title</CardTitle>
						</CardHeader>
						<CardContent>KPI 1</CardContent>
					</Card>
				</Col>
				<Col span={1}>
					<Card>
						<CardHeader>
							<CardTitle>Title</CardTitle>
						</CardHeader>
						<CardContent>KPI 1</CardContent>
					</Card>
				</Col>
			</Grid>
			<Card class="w-full mt-4 pr-8">
				<CardHeader>
					<CardTitle>Website Analytics</CardTitle>
				</CardHeader>
				<Grid cols={3} class="w-full p-4">
					<Col span={1}>
						<PieChart data={chartData} height={200} />
					</Col>
					<Col span={1}>
						<PieChart data={chartData} height={200} />
					</Col>
					<Col span={1}>
						<h3 class="font-medium">Website Analytics</h3>
						<p class="mt-4 flex items-center justify-between text-muted-foreground">
							<span>Source</span>
							<span>Views</span>
						</p>
						<BarList
							data={barListDemo}
							class="overflow-y-auto h-40"
						/>
					</Col>
				</Grid>
			</Card>
			<Grid cols={1} class="w-full mt-4">
				<Card>
					<CardHeader>
						<CardTitle>Line Chart</CardTitle>
					</CardHeader>
					<CardContent>
						<LineChart data={chartData} height={300} />
					</CardContent>
				</Card>
			</Grid>
			<Grid cols={1} class="w-full mt-4">
				<Card>
					<CardHeader>
						<CardTitle>Line Chart</CardTitle>
					</CardHeader>
					<CardContent>
						<LineChart data={chartData} height={300} />
					</CardContent>
				</Card>
			</Grid>
		</>
	)
}

export default Dashboard
