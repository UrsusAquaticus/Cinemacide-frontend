import React, { Suspense } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const Users = React.lazy(() => import("./user/pages/Users"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

const Reviews = React.lazy(() => import("./reviews/pages/Reviews"));
const NewReview = React.lazy(() => import("./reviews/pages/NewReview"));
const UserReviews = React.lazy(() => import("./reviews/pages/UserReviews"));
const UpdateReview = React.lazy(() => import("./reviews/pages/UpdateReview"));

const Collections = React.lazy(() => import("./collections/pages/Collections"));
const NewCollection = React.lazy(() => import("./collections/pages/NewCollection"));
const UserCollections = React.lazy(() => import("./collections/pages/UserCollections"));
const UpdateCollection = React.lazy(() => import("./collections/pages/UpdateCollection"));

const Movie = React.lazy(() => import("./movies/pages/Movie"));
const MovieResults = React.lazy(() => import("./movies/pages/MovieResults"));

const App = () => {
	const { token, login, logout, userId } = useAuth();

	let routes;

	if (token) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Reviews />
				</Route>
				<Route path="/users" exact>
					<Users />
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
				<Route path="/:userId/collections" exact>
					<UserCollections />
				</Route>
				<Route path="/reviews/:movieId/new" exact>
					<NewReview />
				</Route>
				<Route path="/collections/:movieId/new" exact>
					<NewCollection />
				</Route>
				<Route path="/reviews/:reviewId">
					<UpdateReview />
				</Route>
				<Route path="/collections/:collectionId">
					<UpdateCollection />
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
				<Route path="/movies/search/:title" exact>
					<MovieResults />
				</Route>
				<Route path="/movies/:movieId" exact>
					<Movie />
				</Route>
				<Route path="/:userId/reviews" exact>
					<UserReviews />
				</Route>
				<Route path="/:userId/collections" exact>
					<UserCollections />
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
				<MainNavigation />
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
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
