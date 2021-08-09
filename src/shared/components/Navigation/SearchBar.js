import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
	InputBase,
	makeStyles,
	Paper,
	Divider,
	IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

//https://www.emgoto.com/react-search-bar/

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 4,
		maxHeight: "2rem",
		display: "flex",
		alignItems: "center",
		width: "100%",
		marginRight: "0.5rem",
	},
	inputRoot: {
		paddingLeft: "0.5rem",
		width: "100%",
	},
	input: {
		marginLeft: theme.spacing(1),
		width: "100%",
		flex: 1,
	},
	inputInput: {
		transition: theme.transitions.create("width"),
	},
	iconButton: {
		padding: 5,
		height: "100%",
		width: "auto",
	},
	divider: {
		height: 28,
		margin: 4,
	},
}));

const SearchBar = () => {
	const classes = useStyles();
	const [search, setSearch] = useState("");
	const history = useHistory();

	const searchSubmitHandler = async (event) => {
		event.preventDefault();
		history.push(`/movies/search/${search}`);
		setSearch("");
	};

	return (
		<Paper
			component="form"
			className={classes.root}
			onSubmit={searchSubmitHandler}
		>
			<InputBase
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput,
				}}
				required
				placeholder="Search.."
				inputProps={{ "aria-label": "search" }}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<Divider className={classes.divider} orientation="vertical" />
			<IconButton
				type="submit"
				className={classes.iconButton}
				aria-label="search"
			>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};

export default SearchBar;
