import React from "react";
import { Box } from "@material-ui/core";

import UserItem from "./UserItem";

const UserList = (props) => {
	return (
		<Box
			display="flex"
			flexDirection="row"
			flexWrap="wrap"
			justifyContent="center"
		>
			{props.loadedUsers.map((user) => (
				<UserItem
					key={user.id}
					{...user}
					onUserOpen={props.onUserOpen}
					onHoardSelectOpen={props.onHoardSelectOpen}
				/>
			))}
		</Box>
	);
};

export default UserList;
