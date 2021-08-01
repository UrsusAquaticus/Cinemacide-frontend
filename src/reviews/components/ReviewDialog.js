import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Divider, Typography, Slide } from "@material-ui/core";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const ReviewDialog = (props) => {
	const [reviewOpen, setReviewOpen] = React.useState(false);
	const [loadedReview, setLoadedReview] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const handleReviewOpen = (mid) => {
		setReviewOpen(true);
		setLoadedReview(null);
		fetchReview(mid);
	};

	const handleReviewClose = () => {
		setReviewOpen(false);
	};

	const fetchReview = async (reviewId) => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/reviews/${reviewId}`
			);
			setLoadedReview(responseData.review);
			console.log(responseData.review);
		} catch (err) {}
	};

	const { children, ...newProps } = props;
	const childProps = React.cloneElement(children, {
		...newProps,
		onReviewOpen: handleReviewOpen,
	});

	return (
		<React.Fragment>
			{childProps}
			<Dialog
				open={reviewOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleReviewClose}
			>
				{loadedReview && (
					<React.Fragment>
						<DialogTitle>
							<Typography variant="h4" component="h2">
								{loadedReview.Title}
							</Typography>
						</DialogTitle>
						<Divider />
						<DialogContent>
							{loadedReview.Rated} | {loadedReview.Runtime} | {loadedReview.Genre}{" "}
							| {loadedReview.Released}
							<Divider />
							<Typography>{loadedReview.Director}</Typography>
							<Divider />
							<Typography>{loadedReview.Writer}</Typography>
							<Divider />
							<Typography>{loadedReview.Actors}</Typography>
							<Divider />
							<Typography>{loadedReview.Plot}</Typography>
						</DialogContent>

						<DialogActions>
							<Button
								onClick={() => {
									props.onHoardSelectOpen(
										loadedReview.imdbID,
										loadedReview.Title,
										loadedReview.Poster
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

export default ReviewDialog;
