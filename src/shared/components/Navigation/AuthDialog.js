import React, { useState, useContext } from "react";

import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Link } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";

import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../util/validators";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: "50rem",
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const AuthDialog = () => {
	const classes = useStyles();
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

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
				auth.login(responseData.userId, responseData.token);
			} catch (err) {}
		} else {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/users/signup`,
					"POST",
					JSON.stringify({
						email,
						password,
					}),
					{
						"Content-Type": "application/json",
					}
				);

				auth.login(responseData.userId, responseData.token);
			} catch (err) {}
		}
	};

	return (
		<React.Fragment>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={authSubmitHandler}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="none"
						autoFocus
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
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</React.Fragment>
	);
};

export default AuthDialog;
