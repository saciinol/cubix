import axios from 'axios';

const BASE_URL = import.meta.env.MODE === 'development' ? 'localhost:3000' : '';

const api = axios.create({
	baseUrl: `${BASE_URL}/api`,
	timeout: 20000,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;
