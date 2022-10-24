// Size of each piece
const data = [24, 24, 24, 24];
// background color for each piece
const pieColors = ['#06d6a0', '#219ebc', '#fde74c', '#5bc0be'];
// label for each piece
const label = ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'];

//Create chart
let chart = new Chart(wheel, {
	//Plugin for displaying text on pie chart
	plugins: [ChartDataLabels],
	//Chart Type Pie
	type: 'pie',
	data: {
		//Labels(values which are to be displayed on chart)
		labels: label,
		//Settings for dataset/pie
		datasets: [
			{
				backgroundColor: pieColors,
				data: data,
			},
		],
	},
	options: {
		//Responsive chart
		responsive: true,
		animation: { duration: 0 },
		plugins: {
			//hide tooltip and legend
			tooltip: true,
			legend: {
				display: false,
			},
			//display labels inside pie chart
			datalabels: {
				color: '#ffffff',
				formatter: (_, context) => context.chart.data.labels[context.dataIndex],
				font: { size: 18 },
			},
		},
	},
});

export default chart;
