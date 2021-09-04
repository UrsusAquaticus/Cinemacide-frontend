import React, { useState, useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

import { Fade } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import { Card } from "@material-ui/core";

import { Slide, Badge } from "@material-ui/core";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import AuthDialog from "../Navigation/AuthDialog";

import { useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const HoardSelectDialog = (props) => {
	const auth = useContext(AuthContext);
	const [selectOpen, setSelectOpen] = useState(false);
	const [createOpen, setCreateOpen] = useState(false);
	const [loadedHoards, setLoadedHoards] = useState([]);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [selected, setSelected] = useState();

	const handleSelectOpen = (imdbID, Title, Poster) => {
		if (auth.isLoggedIn) {
			const movie = { imdbID, Title, Poster };
			setSelected(movie);
			fetchHoards();
		}
		setSelectOpen(true);
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
		} catch (err) {
			enqueueSnackbar("Failed to Fetch Hoards: " + err.message, {
				variant: "error",
			});
		}
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
			enqueueSnackbar("Added to Hoard", {
				variant: "success",
			});
		} catch (err) {
			enqueueSnackbar("Failed to Add to Hoard: " + err.message, {
				variant: "error",
			});
		}
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
			{!auth.isLoggedIn && (
				<AuthDialog authOpen={selectOpen} toggleAuthOpen={handleSelectClose} />
			)}
			{auth.isLoggedIn && (
				<Dialog
					open={selectOpen}
					TransitionComponent={Transition}
					keepMounted
					onClose={handleSelectClose}
				>
					<Card raised>
						<DialogTitle>SELECT HOARD</DialogTitle>
					</Card>
					<List>
						{!isLoading &&
							loadedHoards.length > 0 &&
							loadedHoards.map((hoard) => (
								<Fade in={loadedHoards} key={hoard.id}>
									<ListItem
										button
										onClick={() => {
											handleHoardSelect(hoard);
										}}
									>
										<ListItemAvatar>
											<Badge
												color="secondary"
												badgeContent={hoard.reviews.length}
											>
												<VideoLibraryIcon />
											</Badge>
										</ListItemAvatar>
										<ListItemText>{hoard.title}</ListItemText>
									</ListItem>
								</Fade>
							))}
						{isLoading &&
							[...Array(3)].map((e, i) => (
								<ListItem key={i}>
									<ListItemAvatar>
										<VideoLibraryIcon />
									</ListItemAvatar>
									<ListItemText>
										<Skeleton />
									</ListItemText>
								</ListItem>
							))}
					</List>

					<Card raised>
						<ListItem autoFocus button onClick={handleCreateOpen}>
							<ListItemAvatar>
								<AddIcon />
							</ListItemAvatar>
							<ListItemText primary="NEW HOARD" />
						</ListItem>
					</Card>
				</Dialog>
			)}
		</React.Fragment>
	);
};

export default HoardSelectDialog;
