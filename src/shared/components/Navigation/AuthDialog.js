import React, { useState, useContext } from "react";

import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import { Button } from "@material-ui/core";
import { Slide } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";
import { AppBar } from "@material-ui/core";

import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: "2rem",
		maxWidth: "50rem",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && { children }}
		</div>
	);
};

const AuthDialog = (props) => {
	const classes = useStyles();
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [tabValue, setTabValue] = React.useState(0);

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const authSubmitHandler = async (event) => {
		event.preventDefault();

		if (isLoginMode) {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/users/login`,
					"POST",
					JSON.stringify({
						email,
						password,
					}),
					{
						"Content-Type": "application/json",
					}
				);
				auth.login(
					responseData.userId,
					responseData.name,
					responseData.image,
					responseData.token
				);
				props.toggleAuthOpen();
				enqueueSnackbar("Login Success", {
					variant: "success",
				});
			} catch (err) {
				enqueueSnackbar("Login Failed: " + err.message, {
					variant: "error",
				});
			}
		} else {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/users/signup`,
					"POST",
					JSON.stringify({
						name,
						email,
						password,
					}),
					{
						"Content-Type": "application/json",
					}
				);

				auth.login(
					responseData.userId,
					responseData.name,
					responseData.image,
					responseData.token
				);
				props.toggleAuthOpen();
				enqueueSnackbar("Sign Up Success", {
					variant: "success",
				});
			} catch (err) {
				enqueueSnackbar("Sign Up Failed: " + err.message, {
					variant: "error",
				});
			}
		}
	};

	return (
		<React.Fragment>
			<Dialog
				open={props.authOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={props.toggleAuthOpen}
			>
				<AppBar position="static" color="default">
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						indicatorColor="secondary"
						textColor="secondary"
						centered
					>
						<Tab
							label="Login"
							onClick={() => {
								setIsLoginMode(true);
							}}
						/>
						<Tab
							label="Sign Up"
							onClick={() => {
								setIsLoginMode(false);
							}}
						/>
					</Tabs>
				</AppBar>

				<Paper className={classes.paper}>
					<form className={classes.form} onSubmit={authSubmitHandler}>
						{!isLoginMode && (
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="name"
								label="Username"
								name="name"
								autoComplete="none"
								autoFocus={isLoginMode}
								onInput={handleNameChange}
							/>
						)}
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="none"
							autoFocus={!isLoginMode}
							onInput={handleEmailChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="none"
							onInput={handlePasswordChange}
						/>
						{isLoginMode && (
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
						)}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							{isLoginMode ? "Login" : "Sign Up"}
						</Button>
					</form>
				</Paper>
			</Dialog>
		</React.Fragment>
	);
};

export default AuthDialog;
