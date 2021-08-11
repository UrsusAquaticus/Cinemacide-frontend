import React, { useState, useContext } from "react";

import { Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import AuthDialog from "../../shared/components/Navigation/AuthDialog";
import { AuthContext } from "../../shared/context/auth-context";

import { useSnackbar } from "notistack";

const Home = (props) => {
	const auth = useContext(AuthContext);
	const [authOpen, setAuthOpen] = useState(props.showAuth);
	const toggleAuthOpen = () => {
		setAuthOpen(!authOpen);
	};

	return (
		<React.Fragment>
			<AuthDialog authOpen={authOpen} toggleAuthOpen={toggleAuthOpen} />
			<Grid container spacing={0} direction="column" alignItems="center">
				<Card>
					<CardContent>
						<Typography variant="h3" component="h2">
							Temp Home Page
						</Typography>
						<Typography variant="subtitle1" component="h3">
							Menu Top Left
						</Typography>
						<Typography variant="subtitle1" component="h3">
							Search media with the search bar
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</React.Fragment>
	);
};
export default Home;