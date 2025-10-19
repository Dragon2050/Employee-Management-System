import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Base from "../pages/Base";
import Employee from "../pages/Employee";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import SignUp from "../pages/Signup";
import SignIn from "../pages/signin";
import SecureRoute from "./SecureRoute";

const secureRouteWrapper = (element) => <SecureRoute>{element}</SecureRoute>

const AppRoutes = () => {

  const routes = createBrowserRouter([
		{
			path: '/',
			element: secureRouteWrapper(<Base />),
			children: [
				{
					path:'home',
					element: secureRouteWrapper(<Home />)
				},
				{
					path: 'about',
					element: secureRouteWrapper(<About />)
				},
				{
					path: 'employees',
					element: secureRouteWrapper(<Employee />)
				},
				{
					path: 'profile',
					element: secureRouteWrapper(<Profile />)
				}
			],
		},
		{
			path: '/signin',
			element: <SignIn />
		},
		{
			path: '/signup',
			element: <SignUp />
		}
	]);

  return (<RouterProvider router={routes} />);
};

export default AppRoutes;