import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import { Grid, Paper } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useSnackbar } from "notistack";

// import AuthDialog from "../../shared/components/Navigation/AuthDialog";
// import { AuthContext } from "../../shared/context/auth-context";

const useStyles = makeStyles({
	card: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		textAlign: "center",
		justifyItems: "center",
		textJustify: "center",
	},
	image: {
		maxHeight: "100%",
		height: "30rem",
		width: "auto",
	},
	linkWhite: {
		color: "#FFFFFFF",
		"&:hover": {
			color: "#EEEEEE",
		},
	},
});

const Home = (props) => {
	// const auth = useContext(AuthContext);
	// const [authOpen, setAuthOpen] = useState(props.showAuth);
	// const toggleAuthOpen = () => {
	// 	setAuthOpen(!authOpen);
	// };
	const styles = useStyles();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	//Hacky way to wake up backend server asap
	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const timeStart = new Date();
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/reviews/`
				);
				const timeEnd = new Date();
				const timeTaken = (timeEnd - timeStart) / 1000;
				//if response took more than 2 seconds, server probably woke up
				if (timeTaken > 2) enqueueSnackbar("Backend just woke up");
			} catch (err) {
				enqueueSnackbar("Failed to connect to backend", {
					variant: "error",
				});
			}
		};
		fetchReviews();
	}, [sendRequest]);

	return (
		<React.Fragment>
			{/* <AuthDialog authOpen={authOpen} toggleAuthOpen={toggleAuthOpen} /> */}
			<Grid container spacing={0} direction="column" alignItems="center">
				<Card>
					<CardContent direction="column" alignItems="center">
						<Typography align="center" variant="h3" component="h2">
							Temp Home Page
						</Typography>
						<Typography align="center" variant="subtitle1" component="h3">
							Heroku backend takes a couple seconds to wake up
						</Typography>
						<Typography align="center" variant="subtitle1" component="h3">
							Search media with the search bar
						</Typography>
						<Typography align="center" variant="subtitle1" component="h3">
							Menu Top Left
						</Typography>
						<a href="https://github.com/UrsusAquaticus/Cinemacide-frontend">
							<Typography align="center" variant="subtitle1" component="h3">
								Github Frontend
							</Typography>
						</a>

						<a href="https://github.com/UrsusAquaticus/Cinemacide-backend">
							<Typography align="center" variant="subtitle1" component="h3">
								Github Backend
							</Typography>
						</a>
					</CardContent>
				</Card>
			</Grid>
		</React.Fragment>
	);
};
export default Home;
