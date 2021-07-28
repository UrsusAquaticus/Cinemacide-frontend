import React, { Suspense } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";
import { headerTheme } from "./themes";

import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import PrimarySearchAppBar from "./shared/components/Navigation/PrimarySearchAppBar";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const Users = React.lazy(() => import("./user/pages/Users"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

const Reviews = React.lazy(() => import("./reviews/pages/Reviews"));
const NewReview = React.lazy(() => import("./reviews/pages/NewReview"));
const UserReviews = React.lazy(() => import("./reviews/pages/UserReviews"));
const UpdateReview = React.lazy(() => import("./reviews/pages/UpdateReview"));

const Hoards = React.lazy(() => import("./hoards/pages/Hoards"));
const NewHoard = React.lazy(() => import("./hoards/pages/NewHoard"));
const UserHoards = React.lazy(() => import("./hoards/pages/UserHoards"));
const UpdateHoard = React.lazy(() => import("./hoards/pages/UpdateHoard"));

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
				<Route path="/reviews/:movieId/new" exact>
					<NewReview />
				</Route>
				<Route path="/hoards/new" exact>
					<NewHoard />
				</Route>
				<Route path="/reviews/:reviewId">
					<UpdateReview />
				</Route>
				<Route path="/hoards/:hoardId">
					<UpdateHoard />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Reviews />
				</Route>
				<Route path="/users" exact>
					<Users />
				</Route>
				<Route path="/hoards" exact>
					<Hoards />
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
									<LoadingSpinner />
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
