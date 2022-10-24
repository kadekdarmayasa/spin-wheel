import rotationValues from './rotation-values.js';
import chart from './chart.js';

const main = () => {
	const wrapper = document.querySelector('.wrapper');
	const wheel = document.getElementById('wheel');
	const spinBtn = document.getElementById('spin-btn');
	const optBtn = document.getElementById('opt-btn');
	const modalBody = document.getElementById('modal-body');
	const modalTitle = document.querySelector('.modal-title');
	const ruleBtn = document.getElementById('rule-btn');

	ruleBtn.classList.remove('d-none');
	wrapper.style.display = 'block';

	ruleBtn.addEventListener('click', function () {
		modalTitle.innerHTML = 'Cara Bermain';
		modalBody.innerHTML = ` 
					<ul class="list-group">
							<li class="list-group-item">
								Tekan tombol spin untuk memulai
							</li>
							<li class="list-group-item">
								Ketika spin berhenti soal akan muncul sesuai dengan opsi yang ada
							</li>
							<li class="list-group-item">
								Masing - masing opsi terdapat 5 soal
							</li>
          </ul>`;
	});

	//display value based on the randomAngle
	const valueGenerator = (angleValue) => {
		for (let i of rotationValues) {
			//if the angleValue is between min and max then display it
			if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
				setTimeout(() => {
					optBtn.click();
				}, 500);
				optBtn.innerText = i.value;
				modalTitle.innerHTML = `Soal ${i.value}`;
				modalBody.innerHTML = `
					  <ul class="list-group">
							<li class="list-group-item">${i.questions[0]}</li>
							<li class="list-group-item">${i.questions[1]}</li>
							<li class="list-group-item">${i.questions[2]}</li>
							<li class="list-group-item">${i.questions[3]}</li>
							<li class="list-group-item">${i.questions[4]}</li>
          </ul>
				`;
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
			chart.options.rotation = chart.options.rotation + resultValue;
			//Update chart with new value;
			chart.update();
			//If rotation>360 reset it back to 0
			if (chart.options.rotation >= 360) {
				count += 1;
				resultValue -= 10;
				chart.options.rotation = 0;
			} else if (count > 15 && chart.options.rotation == randomDegree) {
				valueGenerator(randomDegree);
				clearInterval(rotationInterval);
				count = 0;
				resultValue = 201;
			}
		}, 10);
	});
};

export default main;
