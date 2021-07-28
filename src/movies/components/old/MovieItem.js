import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Attribute from "../../shared/components/UIElements/Attribute";
import { AuthContext } from "../../shared/context/auth-context";

const MovieItem = (props) => {
	const auth = useContext(AuthContext);

	return (
		<React.Fragment>
			{props.search && (
				<li className="search-item">
					<Card className="center">
						<div className="card-item__header vertical justify_inbetween">
							<Link
								className="card-item__image"
								to={`/movies/${props.imdbID}/`}
								style={{ textDecoration: "none" }}
							>
								<img
									src={
										props.Poster === "N/A"
											? "/NoImagePlaceholder.png"
											: props.Poster
									}
									alt={props.Title}
								/>
							</Link>
							<div>
								<h2>{props.Title}</h2>
								<div className="card-item__attributes">
									<Attribute className="divide" attribute={props.Type} />
									<Attribute className="divide" attribute={props.Year} />
								</div>
							</div>
						</div>
					</Card>
				</li>
			)}
			{!props.search && (
				<li className="card-item">
					<Card className="card-item__content">
						<div className="card-item__header vertical">
							<div className="horizontal bottom-line">
								<h2>{props.Title}</h2>
								{auth.isLoggedIn && (
									<Attribute
										className="align-right"
										to={`/reviews/${props.imdbID}/new`}
										attribute={"Review"}
									/>
								)}
							</div>
							<div className="card-item__attributes">
								<Attribute className="divide" attribute={props.Rated} />
								<Attribute className="divide" attribute={props.Runtime} />
								<Attribute className="divide" attribute={props.Genre} />
								<Attribute className="divide" attribute={props.Released} />
							</div>
						</div>
						<div className="card-item__body">
							<div className="card-item__image">
								<img
									src={
										props.Poster === "N/A"
											? "/NoImagePlaceholder.png"
											: props.Poster
									}
									alt={props.Title}
								/>
							</div>
							<div className="card-item__info vertical">
								<Attribute attribute={props.Director} label="Director:" />
								<Attribute attribute={props.Writer} label="Writers:" />
								<Attribute attribute={props.Actors} label="Actors:" />
								<hr />
								<Attribute attribute={props.Plot} />
							</div>
						</div>
					</Card>
				</li>
			)}
		</React.Fragment>
	);
};

export default MovieItem;
