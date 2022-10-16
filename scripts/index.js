import questions from './data/questions.js';
const main = () => {
	document.querySelector('.wrapper').style.display = 'block';
	const wheel = document.getElementById('wheel');
	const spinBtn = document.getElementById('spin-btn');

	//Object that stores values of minimum and maximum angle for a value
	const rotationValues = [
		{ minDegree: 0, maxDegree: 90, value: 'Opsi A', questions: questions.opsiA },
		{ minDegree: 90, maxDegree: 180, value: 'Opsi D', questions: questions.opsiB },
		{ minDegree: 180, maxDegree: 270, value: 'Opsi C', questions: questions.opsiC },
		{ minDegree: 270, maxDegree: 360, value: 'Opsi B', questions: questions.opsiD },
	];

	// Size of each piece
	const data = [24, 24, 24, 24];
	// background color for each piece
	const pieColors = ['#06d6a0', '#219ebc', '#fde74c', '#5bc0be'];
	// label for each piece
	const label = ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'];

	//Create chart
	let myChart = new Chart(wheel, {
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

	//display value based on the randomAngle
	const valueGenerator = (angleValue) => {
		for (let i of rotationValues) {
			//if the angleValue is between min and max then display it
			if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
				Swal.fire({
					title: i.value,
					showConfirmButton: false,
					width: '40em',
					html: `
					<ol>
						<br><li>1. ${i.questions[0]}</li>
						<br><li>2. ${i.questions[1]}</li>
						<br><li>3. ${i.questions[2]}</li>
						<br><li>4. ${i.questions[3]}</li>
						<br><li>5. ${i.questions[4]}</li>
					</ol>
				`,
				});
				spinBtn.disabled = false;
				break;
			}
		}
	};

	//Spinner count
	let count = 0;
	//100 rotations for animation and last rotation for result
	let resultValue = 201;
	//Start spinning
	spinBtn.addEventListener('click', () => {
		spinBtn.disabled = true;
		//Generate random degrees to stop at
		let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
		//Interval for rotation animation
		let rotationInterval = window.setInterval(() => {
			//Set rotation for piechart
			myChart.options.rotation = myChart.options.rotation + resultValue;
			//Update chart with new value;
			myChart.update();
			//If rotation>360 reset it back to 0
			if (myChart.options.rotation >= 360) {
				count += 1;
				resultValue -= 10;
				myChart.options.rotation = 0;
			} else if (count > 15 && myChart.options.rotation == randomDegree) {
				valueGenerator(randomDegree);
				clearInterval(rotationInterval);
				count = 0;
				resultValue = 201;
			}
		}, 10);
	});
};
window.addEventListener('load', function () {
	Swal.fire({
		icon: 'success',
		title: 'Selamat Datang Di Spin Wheel',
		confirmButtonText: `Let's go`,
	}).then(main);
});
