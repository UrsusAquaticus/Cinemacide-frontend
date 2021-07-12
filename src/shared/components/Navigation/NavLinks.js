import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
	const auth = useContext(AuthContext);

	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/users" exact>
					Users
				</NavLink>
			</li>
			<li>
				<NavLink to="/hoards" exact>
					Hoards
				</NavLink>
			</li>
			{auth.isLoggedIn && (
				<li>
					<NavLink to={`/${auth.userId}/hoards`}>My Hoards</NavLink>
				</li>
			)}
			<li>
				<NavLink to="/" exact>
					Reviews
				</NavLink>
			</li>
			{auth.isLoggedIn && (
				<li>
					<NavLink to={`/${auth.userId}/reviews`}>My Reviews</NavLink>
				</li>
			)}
			{!auth.isLoggedIn && (
				<li>
					<NavLink to="/auth">Login</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<a onClick={auth.logout}>Logout</a>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
