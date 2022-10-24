import main from './data/main.js';

window.addEventListener('load', function () {
	Swal.fire({
		icon: 'success',
		title: 'Selamat Datang Di Spin Wheel',
		confirmButtonText: `<i class="fa-solid fa-play me-2"></i> Let's Play`,
	}).then(main);
});
