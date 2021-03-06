import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Divider, Typography, Slide } from "@material-ui/core";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const UserDialog = (props) => {
	const [userOpen, setUserOpen] = React.useState(false);
	const [loadedUser, setLoadedUser] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleUserOpen = (mid) => {
		setUserOpen(true);
		setLoadedUser(null);
		fetchUser(mid);
	};

	const handleUserClose = () => {
		setUserOpen(false);
	};

	const fetchUser = async (userId) => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`
			);
			setLoadedUser(responseData.user);
		} catch (err) {
			enqueueSnackbar("Failed to Fetch User: " + err.message, {
				variant: "error",
			});
		}
	};

	const { children, ...newProps } = props;
	const childProps = React.cloneElement(children, {
		...newProps,
		onUserOpen: handleUserOpen,
	});

	return (
		<React.Fragment>
			{childProps}
			<Dialog
				open={userOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleUserClose}
			>
				{loadedUser && (
					<React.Fragment>
						<DialogTitle>
							<Typography variant="h4" component="h2">
								{loadedUser.name}
							</Typography>
						</DialogTitle>
						<Divider />
						<DialogContent></DialogContent>

						<DialogActions>
							<Button
								onClick={() => {
									props.onHoardSelectOpen(
										loadedUser.imdbID,
										loadedUser.Title,
										loadedUser.Poster
									);
								}}
								variant="contained"
								color="Secondary"
							>
								Hoard
							</Button>
						</DialogActions>
					</React.Fragment>
				)}
			</Dialog>
		</React.Fragment>
	);
};

export default UserDialog;
