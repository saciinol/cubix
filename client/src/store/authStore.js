import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, registerUser, validateToken } from '../services/authService';

const useAuthStore = create(
	persist(
		(set, get) => ({
			// state
			user: null,
			token: null,
			isAuthenticated: false,
			isInitialized: false,
			isLoading: false,
			error: null,

			// initialize auth on app load
			initAuth: async () => {
				const { token } = get();

				if (!token) {
					set({ isInitialized: true, isAuthenticated: false });
					return;
				}

				try {
					const user = await validateToken();
					set({
						user,
						isAuthenticated: true,
						isInitialized: true,
					});
					// eslint-disable-next-line no-unused-vars
				} catch (error) {
					get().logout();
					set({ isInitialized: true });
				}
			},

			login: async (email, password) => {
				set({ isLoading: true, error: null });

				try {
					const { user, token } = await loginUser(email, password);
					set({
						user,
						token,
						isAuthenticated: true,
						isLoading: false,
					});
				} catch (error) {
					set({
						error: error.response?.data?.message || error.message || 'Login failed',
						isLoading: false,
					});
					throw error;
				}
			},

			register: async (userData) => {
				set({ isLoading: true, error: null });

				try {
					const { user, token } = await registerUser(userData);
					set({
						user,
						token,
						isAuthenticated: true,
						isLoading: false,
					});
				} catch (error) {
					set({
						error: error.response?.data?.message || error.message || 'Registration failed',
						isLoading: false,
					});
					throw error;
				}
			},

			logout: () => {
				set({
					user: null,
					token: null,
					isAuthenticated: false,
					error: null,
				});
			},

			clearError: () => set({ error: null }),
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);

export default useAuthStore;
