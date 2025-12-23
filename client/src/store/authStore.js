import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, registerUser, validateToken } from '../services/authService';
import useProfileStore from './profileStore';

const useAuthStore = create(
	persist(
		(set, get) => ({
			// state
			user: null,
			token: null,
			isAuthenticated: false,
			isInitialized: false,
			isLoading: false,

			actions: {
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
					set({ isLoading: true });

					try {
						const { token, user } = await loginUser(email, password);
						set({
							user,
							token,
							isAuthenticated: true,
							isLoading: false,
						});
					} catch (error) {
						set({
							isLoading: false,
						});
						throw error;
					}
				},

				register: async (userData) => {
					set({ isLoading: true });

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
					});

					useProfileStore.getState().actions.clearAllProfiles();
				},
			},
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				user: state.user,
				token: state.token,
			}),
		}
	)
);

export default useAuthStore;

export const useUser = () => useAuthStore((state) => state.user);
export const useToken = () => useAuthStore((state) => state.token);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useIsInitialized = () => useAuthStore((state) => state.isInitialized);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthActions = () => useAuthStore((state) => state.actions);
