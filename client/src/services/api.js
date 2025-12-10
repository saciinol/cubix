import axios from 'axios';
import { useAuthStore } from '../store';

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';

const api = axios.create({
	baseURL: `${BASE_URL}/api`,
	timeout: 20000,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().token;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		if (import.meta.env.MODE === 'development') {
			console.log('Making request to:', config.baseURL + config.url);
		}

		return config;
	},
	(error) => {
		if (import.meta.env.MODE === 'development') {
			console.error('Request setup error:', error);
		}
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		if (import.meta.env.MODE === 'development') {
			console.log('Response received:', response.status);
		}
		return response;
	},
	(error) => {
		// no response from server
		if (!error.response) {
			if (import.meta.env.MODE === 'development') {
				console.error('Network Error:', error.message);
			}

			const errorMessage = 'Network error. Please check your connection';

			return Promise.reject({
				message: errorMessage,
				type: 'network',
			});
		}

		const { status, data } = error.response;

		switch (status) {
			case 400:
				return Promise.reject({
					message: data?.message || 'Bad request. Please check your input.',
					errors: data?.errors || [],
					type: 'validation',
				});

			case 401:
				if (import.meta.env.MODE === 'development') {
					console.error('Unauthorized access');
				}

				// eslint-disable-next-line no-case-declarations
				const isLoginEndpoint = error.config.url.includes('/auth/login');

				if (isLoginEndpoint) {
					return Promise.reject({
						message: data?.message || 'Invalid credentials',
						type: 'auth',
					});
				}

				useAuthStore.getState().logout();
				window.location.href = '/login';

				return Promise.reject({
					message: 'Session expired. Please login again.',
					type: 'auth',
				});

			case 403:
				return Promise.reject({
					message: "You don't have permission to perform this action.",
					type: 'permission',
				});

			case 404:
				return Promise.reject({
					message: 'The requested resource was not found.',
					type: 'not_found',
				});

			case 409:
				return Promise.reject({
					message: data?.message || 'A conflict occurred.',
					type: 'conflict',
				});

			case 422:
				return Promise.reject({
					message: 'Please check your input and try again.',
					errors: data?.errors || [],
					type: 'validation',
				});

			case 500:
				return Promise.reject({
					message: 'Server error. Please try again later.',
					type: 'server',
				});

			default:
				return Promise.reject({
					message: data?.message || 'An unexpected error occurred.',
					type: 'unknown',
				});
		}
	}
);

export default api;
