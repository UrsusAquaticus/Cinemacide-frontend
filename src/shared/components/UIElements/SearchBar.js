import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./SearchBar.css";

//https://www.emgoto.com/react-search-bar/

const SearchBar = () => {
	const [search, setSearch] = useState("");
	const history = useHistory();

	const searchSubmitHandler = async (event) => {
		event.preventDefault();
		history.push(`/movies/search/${search}`);
		setSearch("");
	};

	return (
		<form className="searchbar__form" onSubmit={searchSubmitHandler}>
			<label htmlFor="header-search">
				<span className="visually-hidden">Search</span>
			</label>
			<input
				className="searchbar__input"
				type="text"
				placeholder="Search.."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type="submit" disabled={search === ""}>
				GO
			</button>
		</form>
	);
};

export default SearchBar;
