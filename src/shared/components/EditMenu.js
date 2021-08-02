import React from "react";
import { makeStyles } from "@material-ui/core";

import { IconButton } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import EditIcon from "@material-ui/icons/Edit";
import SendIcon from "@material-ui/icons/Send";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

import { bindMenu } from "material-ui-popup-state/core";
import { usePopupState } from "material-ui-popup-state/hooks";
import { bindTrigger } from "material-ui-popup-state/hooks";

const useStyles = makeStyles({
	menu: {
		"& .MuiPaper-rounded": {
			borderRadius: "50px",
		},
	},
	item: {
		padding: 12,
	},
	topRight: {
		position: "absolute",
		right: 1,
		top: 1,
		zIndex: 2,
	},
});

const EditMenu = (props) => {
	const classes = useStyles();
	const popupState = usePopupState({
		variant: "popover",
		popupId: "menuPopover",
	});
	return (
		<React.Fragment>
			<IconButton
				onTouchStart={(e) => e.stopPropagation()}
				onMouseDown={(e) => e.stopPropagation()}
				onClick={(e) => {
					e.preventDefault();
				}}
				className={classes.topRight}
				variant="contained"
				{...bindTrigger(popupState)}
			>
				<MenuIcon />
			</IconButton>
			<Menu
				MenuListProps={{
					disablePadding: true,
				}}
				className={classes.menu}
				{...bindMenu(popupState)}
				transition
			>
				<MenuItem
					className={classes.item}
					component={IconButton}
					onClick={() => {
						popupState.close();
						props.onSend();
					}}
				>
					<SendIcon />
				</MenuItem>
				<MenuItem
					className={classes.item}
					component={IconButton}
					onClick={() => {
						popupState.close();
						props.onEdit();
					}}
				>
					<EditIcon />
				</MenuItem>
				<MenuItem
					className={classes.item}
					component={IconButton}
					onClick={() => {
						popupState.close();
						props.onDelete();
					}}
				>
					<DeleteForeverIcon />
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
};

export default EditMenu;
