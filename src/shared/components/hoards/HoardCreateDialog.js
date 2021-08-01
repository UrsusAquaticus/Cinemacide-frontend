import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
	TextField,
	FormGroup,
	FormControlLabel,
	Switch,
} from "@material-ui/core";

import { Slide } from "@material-ui/core";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const HoardCreateDialog = (props) => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [title, setTitle] = useState("");
	const [isPublic, setIsPublic] = useState(true);

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleIsPublicChange = (e) => {
		setIsPublic(e.target.checked);
	};

	const { children, ...newProps } = props;
	const childProps = React.cloneElement(children, {
		...newProps,
	});

	const HandleCreateSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await sendRequest(
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
			props.onCreate(response.hoard);
		} catch (err) {}
	};

	return (
		<React.Fragment>
			{childProps}
			<Dialog
				open={props.createOpen}
				TransitionComponent={Transition}
				onClose={props.onCreateClose}
			>
				<DialogTitle>Create Hoard</DialogTitle>
				<form onSubmit={HandleCreateSubmit}>
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
