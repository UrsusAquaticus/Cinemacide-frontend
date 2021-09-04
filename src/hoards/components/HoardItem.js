import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSnackbar } from "notistack";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";

import { Skeleton } from "@material-ui/lab";
import { Fade } from "@material-ui/core";

import EditMenu from "../../shared/components/EditMenu";

import ImageStack from "../../shared/components/ImageStack";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const useStyles = makeStyles({
	root: {
		position: "relative",
		margin: "0.5rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		transformOrigin: "center",
		transition: "transform 0.15s ease-in-out",
		"&:hover": { transform: "scale3d(1.01, 1.01, 1)" },
	},
	action: {
		width: "15rem",
	},
});

const HoardItem = (props) => {
	const auth = useContext(AuthContext);
	const classes = useStyles();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const { error, sendRequest, clearError } = useHttpClient();
	const [loadedReviews, setLoadedReviews] = useState();
	const [selectedId, setSelectedId] = useState();
	const [imagesLoading, setImagesLoading] = useState(true);

	const LinkRef = React.forwardRef((props, ref) => (
		<div ref={ref}>
			<NavLink exact {...props} />
		</div>
	));

	const imagesLoadedHandler = () => {
		setImagesLoading(false);
	};

	const showDeleteWarningHandler = (hid) => {
		setSelectedId(hid);
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setSelectedId();
		setShowConfirmModal(false);
	};

	const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/hoards/${selectedId}`,
				"DELETE",
				null,
				{
					Authorization: "Bearer " + auth.token,
				}
			);
			enqueueSnackbar("Hoard Deleted", { variant: "success" });
			props.onDelete(selectedId);
		} catch (err) {
			enqueueSnackbar("Failed to Delete: " + err.message, { variant: "error" });
		}
	};

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				let joinedIds = props.reviews.join("/");
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/reviews/multi/${joinedIds}`
				);
				setLoadedReviews(responseData.reviews);
			} catch (err) {
				enqueueSnackbar("Failed to Fetch Reviews: " + err.message, {
					variant: "error",
				});
			}
		};
		fetchReviews();
	}, [sendRequest]);

	return (
		<React.Fragment>
			<Dialog
				open={showConfirmModal}
				onClose={cancelDeleteHandler}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Delete Hoard?"}</DialogTitle>
				<DialogActions>
					<Button onClick={cancelDeleteHandler} color="primary">
						Cancel
					</Button>
					<Button onClick={confirmDeleteHandler} color="secondary" autoFocus>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
			<Fade
				in={true}
				mountOnEnter
				style={{ transitionDelay: props.number * 25 + "ms" }}
			>
				<Card className={classes.root} title={props.title}>
					{loadedReviews && (
						<React.Fragment>
							<EditMenu
								visible={auth.userId === props.creator && !imagesLoading}
								onDelete={() => {
									showDeleteWarningHandler(props.id);
								}}
							/>
							<CardActionArea
								className={classes.action}
								component={LinkRef}
								to={`/hoards/${props.id}`}
								style={{
									position: imagesLoading ? "absolute" : "static",
								}}
							>
								<Fade in={!imagesLoading}>
									<CardContent component={Card} raised>
										<Typography noWrap variant="h5" component="h1">
											{props.title}
										</Typography>
										<Box flexWrap="nowrap" flexDirection="row">
											<Typography noWrap variant="subtitle1" component="h3">
												{props.username + " | " + props.reviews.length}
											</Typography>
										</Box>
									</CardContent>
								</Fade>
								<ImageStack
									isLoading={imagesLoading}
									loadedReviews={loadedReviews}
									number={5}
									onLoadComplete={imagesLoadedHandler}
								/>
							</CardActionArea>
						</React.Fragment>
					)}
					<div
						style={{
							visibility: !imagesLoading ? "hidden" : "visible",
							position: !imagesLoading ? "absolute" : "static",
						}}
					>
						<CardContent>
							<Typography variant="h5">
								<Skeleton />
							</Typography>
							<Typography variant="subtitle1">
								<Skeleton />
							</Typography>
						</CardContent>
						<Skeleton variant="rect" width={"15rem"} height={"10rem"} />
					</div>
				</Card>
			</Fade>
		</React.Fragment>
	);
};

export default HoardItem;
