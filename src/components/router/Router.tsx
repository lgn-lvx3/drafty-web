import { lazy, Suspense } from "react";
import {
	BrowserRouter,
	Outlet,
	type RouteObject,
	useRoutes,
} from "react-router-dom";
import Loading from "~/components/shared/Loading";

const HomeScreen = lazy(() => import("~/components/screens/Home"));

function Layout() {
	return (
		<>
			{/* <NavBar /> */}
			<Outlet />
		</>
	);
}

function Routes() {
	const routes: RouteObject[] = [
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					index: true,
					element: <HomeScreen />,
				},
			],
		},
	];
	const element = useRoutes(routes);

	return <Suspense fallback={<Loading />}>{element}</Suspense>;
}

export default function Router() {
	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	);
}
