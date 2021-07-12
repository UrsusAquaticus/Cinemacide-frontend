import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import StarRating from "../../shared/components/UIElements/StarRating";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Attribute from "../../shared/components/UIElements/Attribute";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const HoardItem = (props) => {
	const auth = useContext(AuthContext);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const showDeleteWarningHandler = () => {
		console.log();
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

	const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/hoards/${props.id}`,
				"DELETE",
				null,
				{
					Authorization: "Bearer " + auth.token,
				}
			);
			props.onDelete(props.id);
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<Modal
				show={showConfirmModal}
				onCancel={cancelDeleteHandler}
				header="Are you sure?"
				footerClass="card-item__modal-actions"
				footer={
					<React.Fragment>
						<Button onClick={cancelDeleteHandler}>
							CANCEL
						</Button>
						<Button danger onClick={confirmDeleteHandler}>
							DELETE
						</Button>
					</React.Fragment>
				}
			>
				<p>
					Do you want to proceed and delete this hoard? Please note that it
					can't be undone thereafter.
				</p>
			</Modal>
			<li>
				{isLoading && <LoadingSpinner asOverlay />}
				<div className="card-item__header horizontal">
					{!props.compact && (
						<div className="card-item__image">
							<Link to={`/movies/${props.imdbID}`}>
								<img src={props.Poster} alt={props.Title} />
							</Link>
						</div>
					)}
					<div className="card-item__info vertical">
						{!props.compact && (
							<div className="horizontal bottom-line">
								<h2>{props.Title}</h2>
							</div>
						)}
						<StarRating stars={props.Rating} />
						<div className="card-item__attributes">
							<Attribute
								className="divide"
								attribute={new Date(props.Date).toDateString()}
							/>
							<Attribute
								className="divide"
								to={`/${props.Creator}/hoards`}
								attribute={"By " + props.Username}
							/>
							{auth.userId === props.Creator && (
								<Attribute
									className="divide"
									to={`/hoards/${props.id}`}
									attribute={"Edit"}
								/>
							)}
							{auth.userId === props.Creator && (
								<Attribute
									delete
									className="divide"
									onClick={showDeleteWarningHandler}
									attribute={"Delete"}
								/>
							)}
						</div>
						<div className="card-item__body">
							<Attribute attribute={props.Comment} />
						</div>
					</div>
				</div>
			</li>
		</React.Fragment>
	);
};

export default HoardItem;
