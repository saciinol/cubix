import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Feed from './pages/Feed';
import Layout from './components/Layout';
import Login from './pages/Login';
import { useAuthStore } from './store';
// import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuthStore();
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <Layout>{children}</Layout>;
};

const PublicRoute = ({ children }) => {
	const { isAuthenticated } = useAuthStore();

	if (isAuthenticated) {
		return <Navigate to="/feed" replace />;
	}

	return children;
};

function App() {
	// const { initAuth, isInitialized } = useAuthStore();

	// useEffect(() => {
	// 	initAuth();
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// if (!isInitialized) {
	// 	return (
	// 		<div className="min-h-screen flex items-center justify-center">
	// 			<Loader2 className="size-6 animate-spin" />
	// 		</div>
	// 	);
	// }

	return (
		<Router>
			<Routes>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path="/feed"
					element={
						<ProtectedRoute>
							<Feed />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
