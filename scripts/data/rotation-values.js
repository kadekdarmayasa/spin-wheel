import questions from './questions.js';

const rotationValues = [
	{ minDegree: 0, maxDegree: 90, value: 'Opsi A', questions: questions.opsiA },
	{ minDegree: 90, maxDegree: 180, value: 'Opsi D', questions: questions.opsiB },
	{ minDegree: 180, maxDegree: 270, value: 'Opsi C', questions: questions.opsiC },
	{ minDegree: 270, maxDegree: 360, value: 'Opsi B', questions: questions.opsiD },
];

export default rotationValues;
