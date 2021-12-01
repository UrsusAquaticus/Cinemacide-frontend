import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useEffect } from "react";

import { Grid, Paper } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";

// import AuthDialog from "../../shared/components/Navigation/AuthDialog";
// import { AuthContext } from "../../shared/context/auth-context";

import { useSnackbar } from "notistack";

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
});

const Home = (props) => {
	// const auth = useContext(AuthContext);
	// const [authOpen, setAuthOpen] = useState(props.showAuth);
	// const toggleAuthOpen = () => {
	// 	setAuthOpen(!authOpen);
	// };
	const styles = useStyles();
	const [loadedCards, setLoadedCards] = useState([]);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const responseData = await sendRequest(
					`https://api.scryfall.com/cards/search?q=year%3E%3D2021+include%3Aextras+unique%3Aprints&order=spoiled&as=grid&unique=prints`
				);

				setLoadedCards(responseData.data);
			} catch (err) {
				enqueueSnackbar("Failed to Fetch Cards: " + err.message, {
					variant: "error",
				});
			}
		};
		fetchCards();
	}, [sendRequest]);

	return (
		<React.Fragment>
			{/* <AuthDialog authOpen={authOpen} toggleAuthOpen={toggleAuthOpen} /> */}
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
			{loadedCards &&
				!isLoading &&
				loadedCards.map((card, ci) => (
					<Card className={styles.card} id={"card-" + ci}>
						{console.log(card.name)}
						<Typography>{card.name}</Typography>
						<a href={card.scryfall_uri}>
							{"image_uris" in card ? (
								<img
									className={styles.image}
									src={card.image_uris.normal || "/"}
								/>
							) : (
								card.card_faces.map((face, fi) => (
									<img
										className={styles.image}
										id={"face-" + fi}
										src={face.image_uris.normal || "/"}
									/>
								))
							)}
						</a>
					</Card>
				))}
		</React.Fragment>
	);
};
export default Home;
