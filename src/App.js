import React, { Suspense } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";
import { headerTheme } from "./themes";

import PrimarySearchAppBar from "./shared/components/Navigation/PrimarySearchAppBar";
import { CircularProgress } from "@material-ui/core";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const Users = React.lazy(() => import("./user/pages/Users"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

const Reviews = React.lazy(() => import("./reviews/pages/Reviews"));
const UserReviews = React.lazy(() => import("./reviews/pages/UserReviews"));
const HoardReviews = React.lazy(() => import("./reviews/pages/HoardReviews"));

const Hoards = React.lazy(() => import("./hoards/pages/Hoards"));
const UserHoards = React.lazy(() => import("./hoards/pages/UserHoards"));

const Movie = React.lazy(() => import("./movies/pages/Movie"));
const MovieResults = React.lazy(() => import("./movies/pages/MovieResults"));

const App = () => {
	const { token, login, logout, userId } = useAuth();

	let routes;

	if (token) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Hoards />
				</Route>
				<Route path="/users" exact>
					<Users />
				</Route>
				<Route path="/reviews" exact>
					<Reviews />
				</Route>
				<Route path="/movies/search/:title" exact>
					<MovieResults />
				</Route>
				<Route path="/movies/:movieId" exact>
					<Movie />
				</Route>
				<Route path="/:userId/reviews" exact>
					<UserReviews />
				</Route>
				<Route path="/:userId/hoards" exact>
					<UserHoards />
				</Route>
				<Route path="/hoards/:hoardId" exact>
					<HoardReviews />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Hoards />
				</Route>
				<Route path="/users" exact>
					<Users />
				</Route>
				<Route path="/reviews" exact>
					<Reviews />
				</Route>
				<Route path="/movies/search/:title" exact>
					<MovieResults />
				</Route>
				<Route path="/movies/:movieId" exact>
					<Movie />
				</Route>
				<Route path="/:userId/reviews" exact>
					<UserReviews />
				</Route>
				<Route path="/:userId/hoards" exact>
					<UserHoards />
				</Route>
				<Route path="/hoards/:hoardId" exact>
					<HoardReviews />
				</Route>
				<Route path="/auth">
					<Auth />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login: login,
				logout: logout,
			}}
		>
			<Router>
				<ThemeProvider theme={headerTheme}>
					<PrimarySearchAppBar />
					<main>
						<Suspense
							fallback={
								<div className="center">
									<CircularProgress />
								</div>
							}
						>
							{routes}
						</Suspense>
					</main>
				</ThemeProvider>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
