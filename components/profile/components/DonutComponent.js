import { Doughnut, } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

export default function DonutComponent() {
	const leadCustGroupData1 = []
	let totalLeadCount = 0
	let colors = ['#3771c8', '#ba3939', '#34a853'] // blue, red, green
	let noLeads = true;

	const chartData = {
		labels: leadCustGroupData1?.map((v) => v.customerGroup),
		datasets: [
			{
				label: 'My First Dataset',
				data: leadCustGroupData1?.map((v) => v.leads),
				backgroundColor: leadCustGroupData1?.map((v) => v.color),
				hoverOffset: 0,
			},
		],
	};

	const options = {
		indexAxis: "x",
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	const emptyChartData = [
		{
			customerGroup: '',
			leads: 1,
			color: "#efefef",
		},
	];

	const chartData1 = {
		labels: emptyChartData.map((v) => v.customerGroup),
		datasets: [
			{
				label: 'My First Dataset',
				data: emptyChartData.map((v) => v.leads),
				backgroundColor: emptyChartData.map((v) => v.color),
				hoverOffset: 0,
			},
		],
	};

	const options1 = {
		indexAxis: "x",
		responsive: true,
		plugins: {
			tooltip: {
				filter: function (tooltipItem) {
					return tooltipItem.lead === 100
				}
			},
			legend: {
				display: false,
			},
		},
	};
	return (
		<>
			<div className="chart artwork_stats">
				{noLeads ? (
					<Doughnut data={chartData1} options={options1} />
				) : (
					<Doughnut data={chartData} options={options} />
				)}
				{/* <div className="lp_total_div">
						<div>{totalLeadCount}</div>
						<div>Total Leads</div>
					</div> */}
			</div>
			{/* <div className="lm_home_main_container">
					<h2>Customer Group</h2>
					<div className="lp_bottom_container">
						<div className="lp_bottom_divs lp_bottom_divs_headings">
							<div className="ls_color"></div>
							<div className="ls_heading">Customer Group</div>
							<div className="ls_heading">Leads</div>
						</div>
						{leadCustGroupData1?.map(ls => (
							<div className="lp_bottom_divs">
								<div className="ls_color" style={{ backgroundColor: ls.color }} ></div>
								<div className="ls">{ls.customerGroup}</div>
								<div className="ls">{ls.leads}</div>
							</div>
						))}
					</div>
				</div> */}
		</>
	)
}

