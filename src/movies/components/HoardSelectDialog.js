import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PermMediaSharpIcon from "@material-ui/icons/PermMediaSharp";

import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";

import { Divider, Typography, Slide, Badge } from "@material-ui/core";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const HoardSelectDialog = (props) => {
	const auth = useContext(AuthContext);
	const [hoardOpen, setHoardOpen] = useState(false);
	const [loadedHoards, setLoadedHoards] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [selected, setSelected] = useState();

	const handleHoardSelectOpen = (imdbID, Title, Poster) => {
		const movie = {imdbID, Title, Poster};
		setSelected(movie);
		setHoardOpen(true);
		fetchHoards();
	};

	const handleHoardSelectClose = () => {
		setHoardOpen(false);
	};

	const { children, ...newProps } = props;
	const childProps = React.cloneElement(children, {
		...newProps,
		onHoardSelectOpen: handleHoardSelectOpen,
	});

	const handleHoardSelect = (hid) => {
		console.log(hid);
		reviewSubmit(hid);
		handleHoardSelectClose();
	};

	const fetchHoards = async () => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/hoards/user/${auth.userId}`
			);

			console.log(responseData.hoards);
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

	return (
		<React.Fragment>
			{childProps}
			<Dialog
				open={hoardOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleHoardSelectClose}
			>
				<DialogTitle>Select Hoard</DialogTitle>
				<List>
					{loadedHoards &&
						loadedHoards.map((hoard) => (
							<ListItem
								button
								onClick={() => {
									handleHoardSelect(hoard.id);
								}}
							>
								<ListItemAvatar>
									<Badge badgeContent={hoard.reviews.count}>
										<PermMediaSharpIcon />
									</Badge>
								</ListItemAvatar>
								<ListItemText>{hoard.title}</ListItemText>
							</ListItem>
						))}

					<ListItem autoFocus button>
						<ListItemAvatar>
							<Avatar>
								<AddIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary="New Hoard"
							onClick={() => {
								props.onHoardCreateOpen();
							}}
						/>
					</ListItem>
				</List>
			</Dialog>
		</React.Fragment>
	);
};

export default HoardSelectDialog;
