import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Skeleton } from "@material-ui/lab";
import { Fade } from "@material-ui/core";

import { Divider, Typography, Slide } from "@material-ui/core";
import { useHttpClient } from "../hooks/http-hook";

import { useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const MovieDialog = (props) => {
	const [movieOpen, setMovieOpen] = React.useState(false);
	const [loadedMovie, setLoadedMovie] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleMovieOpen = (mid) => {
		setMovieOpen(true);
		setLoadedMovie(null);
		fetchMovie(mid);
	};

	const handleMovieClose = () => {
		setMovieOpen(false);
	};

	const fetchMovie = async (movieId) => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/movies/${movieId}`
			);
			setLoadedMovie(responseData.movie);
		} catch (err) {
			enqueueSnackbar("Failed to Fetch Movie: " + err.message, {
				variant: "error",
			});
		}
	};

	const { children, ...newProps } = props;
	const childProps = React.cloneElement(children, {
		...newProps,
		onMovieOpen: handleMovieOpen,
	});

	return (
		<React.Fragment>
			{childProps}
			<Dialog
				open={movieOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleMovieClose}
			>
				{loadedMovie && (
					<React.Fragment
						style={{
							position: "relative",
						}}
					>
						<Button
							style={{
								position: "absolute",
								right: 0,
								top: 0,
								zIndex: 2,
							}}
							onClick={() => {
								props.onHoardSelectOpen(
									loadedMovie.imdbID,
									loadedMovie.Title,
									loadedMovie.Poster
								);
							}}
							variant="contained"
							color="Secondary"
						>
							Hoard
						</Button>
						<DialogTitle>
							<Typography variant="h4" component="h2">
								{loadedMovie.Title}
							</Typography>
						</DialogTitle>
						<Divider />
						<DialogContent>
							{loadedMovie.Rated} | {loadedMovie.Runtime} | {loadedMovie.Genre}{" "}
							| {loadedMovie.Released}
							<Divider />
							<Typography>{loadedMovie.Director}</Typography>
							<Divider />
							<Typography>{loadedMovie.Writer}</Typography>
							<Divider />
							<Typography>{loadedMovie.Actors}</Typography>
							<Divider />
							<Typography>{loadedMovie.Plot}</Typography>
						</DialogContent>
					</React.Fragment>
				)}
				{!loadedMovie && (
					<React.Fragment>
						<DialogTitle>
							<Typography variant="h4" component="h2">
								<Skeleton />
							</Typography>
						</DialogTitle>
						<Divider />
						<DialogContent>
							<Typography>
								<Skeleton width={"35rem"}/>
							</Typography>
							<Divider />
							<Typography>
								<Skeleton />
							</Typography>
							<Divider />
							<Typography>
								<Skeleton />
							</Typography>
							<Divider />
							<Typography>
								<Skeleton />
							</Typography>
							<Divider />
							<Typography>
								<Skeleton />
								<Skeleton />
								<Skeleton />
								<Skeleton />
							</Typography>
						</DialogContent>
					</React.Fragment>
				)}
			</Dialog>
		</React.Fragment>
	);
};

export default MovieDialog;
