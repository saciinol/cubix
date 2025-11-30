import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
	persist(
		(set, get) => ({
			// state
			user: null,
			token: null,
			isAuthenticated: false,
			isLoading: false,
			error: null,

			// actions
			setUser: (user) => {
				set({
					user,
					isAuthenticated: true,
					error: null,
				});
			},

			setToken: (token) => {
				set({ token });

				if (token) {
					localStorage.setItem('authToken', token);
				} else {
					localStorage.removeItem('authtoken');
				}
			},

			setLoading: (isLoading) => set({ isLoading }),

			setError: (error) => set({ error }),

			login: async (userData, token) => {
				set({ isLoading: true, error: null });

				try {
					get().setUser(userData);
					get().setToken(token);

					set({ isLoading: false });
				} catch (error) {
					set({
						error: error.message,
						isLoading: false,
					});
				}
			},

			logout: () => {
				set({
					user: null,
					token: null,
					isAuthenticated: false,
					error: null,
				});
				localStorage.removeItem('authtoken');
			},

			clearError: () => set({ error: null }),

			// check if user is authenticated
			checkAuth: () => {
				const token = localStorage.getItem('authtoken');
				const { user } = get();

				if (token && user) {
					set({
						isAuthenticated: true,
						token,
					});
				} else {
					get().logout();
				}
			},
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
