import React, { useState, useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import PermMediaSharpIcon from "@material-ui/icons/PermMediaSharp";

import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import { Card } from "@material-ui/core";

import { Slide, Badge } from "@material-ui/core";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const HoardSelectDialog = (props) => {
	const auth = useContext(AuthContext);
	const [selectOpen, setSelectOpen] = useState(false);
	const [createOpen, setCreateOpen] = useState(false);
	const [loadedHoards, setLoadedHoards] = useState([]);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [selected, setSelected] = useState();

	const handleSelectOpen = (imdbID, Title, Poster) => {
		const movie = { imdbID, Title, Poster };
		setSelected(movie);
		setSelectOpen(true);
		fetchHoards();
	};

	const handleSelectClose = () => {
		setSelectOpen(false);
	};

	const handleCreateOpen = () => {
		setCreateOpen(true);
	};

	const handleCreateClose = () => {
		setCreateOpen(false);
	};

	const handleHoardSelect = (hoard) => {
		reviewSubmit(hoard.id);
		handleSelectClose();
	};

	const handleHoardCreate = (createdHoard) => {
		setCreateOpen(false);
		setLoadedHoards((prevHoards) => [...prevHoards, createdHoard]);
	};

	const fetchHoards = async () => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/hoards/user/${auth.userId}`
			);
			setLoadedHoards(responseData.hoards); // array of hoard
		} catch (err) {}
	};

	const reviewSubmit = async (hid) => {
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/reviews`,
				"POST",
				JSON.stringify({
					imdbID: selected.imdbID,
					title: selected.Title,
					poster: selected.Poster,
					rating: 0,
					comment: "",
					public: true,
					hoard: hid,
				}),
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				}
			);
		} catch (err) {}
	};

	const { children, ...newProps } = props;
	const childProps = React.cloneElement(children, {
		...newProps,
		onHoardSelectOpen: handleSelectOpen,
		onCreate: handleHoardCreate,
		onCreateClose: handleCreateClose,
		createOpen,
	});

	return (
		<React.Fragment>
			{childProps}
			<Dialog
				open={selectOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleSelectClose}
			>
				<Card>
					<DialogTitle>Select Hoard</DialogTitle>
				</Card>
				<List>
					{loadedHoards &&
						loadedHoards.map((hoard) => (
							<ListItem
								key={hoard.id}
								button
								onClick={() => {
									handleHoardSelect(hoard);
								}}
							>
								<ListItemAvatar>
									<Badge color="secondary" badgeContent={hoard.reviews.length}>
										<PermMediaSharpIcon />
									</Badge>
								</ListItemAvatar>
								<ListItemText>{hoard.title}</ListItemText>
							</ListItem>
						))}
				</List>

				<Card>
					<ListItem autoFocus button onClick={handleCreateOpen}>
						<ListItemAvatar>
							<AddIcon />
						</ListItemAvatar>
						<ListItemText primary="New Hoard" />
					</ListItem>
				</Card>
			</Dialog>
		</React.Fragment>
	);
};

export default HoardSelectDialog;
