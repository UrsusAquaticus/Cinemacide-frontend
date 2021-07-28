import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import {
	TextField,
	FormGroup,
	FormControlLabel,
	Switch,
} from "@material-ui/core";

import { Divider, Typography, Slide, Badge } from "@material-ui/core";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const HoardCreateDialog = (props) => {
	const auth = useContext(AuthContext);
	const [hoardOpen, setHoardOpen] = useState(false);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [title, setTitle] = useState("");
	const [isPublic, setIsPublic] = useState(true);

	const handleHoardCreateOpen = () => {
		setHoardOpen(true);
	};

	const handleHoardCreateClose = () => {
		setHoardOpen(false);
	};

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleIsPublicChange = (e) => {
		setIsPublic(e.target.checked);
	};

	const { children, ...newProps } = props;
	const childProps = React.cloneElement(children, {
		...newProps,
		onHoardCreateOpen: handleHoardCreateOpen,
	});

	const createSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/hoards/`,
				"POST",
				JSON.stringify({
					title: title,
					public: isPublic,
				}),
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				}
			);
			setHoardOpen(false);
		} catch (err) {}
	};

	return (
		<React.Fragment>
			{childProps}
			<Dialog
				open={hoardOpen}
				TransitionComponent={Transition}
				onClose={handleHoardCreateClose}
			>
				<DialogTitle>Create Hoard</DialogTitle>
				<form onSubmit={createSubmitHandler}>
					<DialogContent>
						<FormGroup>
							<TextField label="Title" onChange={handleTitleChange} />
							<FormControlLabel
								control={
									<Switch
										checked={isPublic}
										onChange={handleIsPublicChange}
										name="isPublic"
									/>
								}
								label="Public"
							/>
						</FormGroup>
					</DialogContent>
					<DialogActions>
						<Button type="submit" variant="contained" color="secondary">
							Submit
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</React.Fragment>
	);
};

export default HoardCreateDialog;
