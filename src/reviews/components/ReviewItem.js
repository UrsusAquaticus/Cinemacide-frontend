import React, { useContext } from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Rating } from "@material-ui/lab";

import Button from "@material-ui/core/Button";
import { Dialog } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";

import EditMenu from "../../shared/components/EditMenu";
import { Fade } from "@material-ui/core";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import { useSnackbar } from "notistack";

const useStyles = makeStyles({
	root: {
		position: "relative",
		height: "10rem",
		width: "25rem",
		margin: "0.5rem",

		display: "flex",
		flexWrap: "nowrap",
	},
	area: {
		height: "inherit",
		display: "flex",
		flexWrap: "nowrap",
		justifyContent: "flex-start",

		transformOrigin: "center",
		transition: "transform 0.15s ease-in-out",
		"&:hover": { transform: "scale3d(1.01, 1.01, 1)" },
	},
	imageContainer: {
		height: "inherit",
		display: "flex",
		flexShrink: "0",
		justifyContent: "start",
		minHeight: 0,
		width: "10rem",
		overflow: "hidden",
	},
	image: {
		objectFit: "cover",
		width: "inherit",
	},
	text: {
		whiteSpace: " nowrap",
		textOverflow: "ellipsis",
		overflow: "hidden",

		"@supports (-webkit-line-clamp: 2)": {
			overflow: " hidden",
			textOverflow: "ellipsis",
			whiteSpace: "initial",
			display: "-webkit-box",
			"-webkit-line-clamp": "2",
			"-webkit-box-orient": "vertical",
		},
	},
});

const ReviewItem = (props) => {
	const auth = useContext(AuthContext);
	const classes = useStyles();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const {
		isLoading: isDeleting,
		error: deleteError,
		sendRequest: sendDeleteRequest,
		clearError: clearDeleteError,
	} = useHttpClient();
	const {
		isLoading: isPatching,
		error: patchError,
		sendRequest: sendPatchRequest,
		clearError: clearPatchError,
	} = useHttpClient();
	const [selectedId, setSelectedId] = useState();
	const [rating, setRating] = useState(props.rating);

	const showDeleteWarningHandler = (rid) => {
		setSelectedId(rid);
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setSelectedId();
		setShowConfirmModal(false);
	};

	const reviewHandler = async (newValue) => {
		console.log("Patch Start");
		try {
			await sendPatchRequest(
				`${process.env.REACT_APP_BACKEND_URL}/reviews/${props.id}`,
				"PATCH",
				JSON.stringify({
					rating: newValue,
					comment: "",
				}),
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				}
			);
			enqueueSnackbar(
				props.title +
					(newValue ? " " + newValue + " Stars" : " Rating Removed"),
				{ variant: "success" }
			);
			setRating(newValue);
		} catch (err) {
			enqueueSnackbar("Failed to Update: " + err.message, { variant: "error" });
		}
	};

	const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendDeleteRequest(
				`${process.env.REACT_APP_BACKEND_URL}/reviews/${selectedId}`,
				"DELETE",
				null,
				{
					Authorization: "Bearer " + auth.token,
				}
			);
			enqueueSnackbar("Review Deleted: ", {
				variant: "success",
			});
			props.onDelete(selectedId);
		} catch (err) {
			enqueueSnackbar("Failed to Delete Review: " + err.message, {
				variant: "error",
			});
		}
	};

	return (
		<React.Fragment>
			<Dialog
				open={showConfirmModal}
				onClose={cancelDeleteHandler}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
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
					<EditMenu
						visible={auth.userId === props.creator}
						onDelete={() => {
							showDeleteWarningHandler(props.id);
						}}
					/>
					<CardActionArea
						className={classes.area}
						onClick={() => {
							props.onMovieOpen(props.imdbID);
						}}
					>
						<div className={classes.imageContainer}>
							<img
								className={classes.image}
								alt={props.title}
								src={
									props.poster === "N/A"
										? "/NoImagePlaceholder.png"
										: props.poster
								}
							/>
						</div>
						<CardContent>
							<Typography
								className={classes.text}
								noWrap
								variant="h5"
								component="h1"
							>
								{props.title}
							</Typography>
							<Rating
								name={props.id + "-rating"}
								readOnly={auth.userId !== props.creator}
								disabled={isPatching}
								size="large"
								value={rating}
								defaultValue={props.rating}
								onMouseOver={(e) => e.stopPropagation()}
								onTouchStart={(e) => e.stopPropagation()}
								onMouseDown={(e) => e.stopPropagation()}
								onClick={(e) => e.stopPropagation()}
								onChange={(event, newValue) => {
									reviewHandler(newValue);
								}}
							/>
						</CardContent>
					</CardActionArea>
				</Card>
			</Fade>
		</React.Fragment>
	);
};

export default ReviewItem;
