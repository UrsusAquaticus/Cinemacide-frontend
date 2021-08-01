import React from "react";
import { makeStyles } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import CardActions from "@material-ui/core/CardActions";
import { IconButton } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MenuIcon from "@material-ui/icons/Menu";

import { AuthContext } from "../../shared/context/auth-context";

const useStyles = makeStyles({
	popper: {
		margin: "0!important",
		display: "flex",
		alignContent: "center",
		justifyContent: "center",
	},
	actions: {
		position: "absolute",
		right: 1,
		top: 1,
	},
});

const ItemMenu = (props) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<React.Fragment>
			<CardActions className={classes.actions}>
				<IconButton
					variant="contained"
					color="primary"
					onTouchStart={(e) => e.stopPropagation()}
					onMouseDown={(e) => e.stopPropagation()}
					ref={anchorRef}
					aria-controls={open ? "menu-list-grow" : undefined}
					aria-haspopup="true"
					onClick={(e) => {
						e.preventDefault();
						handleToggle();
					}}
				>
					<MenuIcon />
				</IconButton>
				<Popper
					className={classes.popper}
					open={open}
					anchorEl={anchorRef.current}
					role={undefined}
					transition
					disablePortal
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === "bottom" ? "center top" : "center bottom",
							}}
						>
							<ClickAwayListener onClickAway={handleClose}>
								<Paper>
									<MenuList
										autoFocusItem={open}
										id="menu-list-grow"
										onKeyDown={handleListKeyDown}
									>
										<IconButton
											variant="contained"
											color="primary"
											onTouchStart={(e) => e.stopPropagation()}
											onMouseDown={(e) => e.stopPropagation()}
											onClick={(e) => {
												e.preventDefault();
												props.onEdit();
											}}
										>
											<EditIcon />
										</IconButton>
										<IconButton
											variant="contained"
											color="secondary"
											onTouchStart={(e) => e.stopPropagation()}
											onMouseDown={(e) => e.stopPropagation()}
											onClick={(e) => {
												e.preventDefault();
												props.onDeleteWarning();
											}}
										>
											<DeleteIcon />
										</IconButton>
									</MenuList>
								</Paper>
							</ClickAwayListener>
						</Grow>
					)}
				</Popper>
			</CardActions>
		</React.Fragment>
	);
};

export default ItemMenu;
