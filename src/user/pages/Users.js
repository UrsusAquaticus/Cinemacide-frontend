import React, { useState, useEffect } from "react";

import UserDialog from "../components/UserDialog";
import UserList from "../components/UserList";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { useSnackbar } from "notistack";

const Users = () => {
	const [loadedUsers, setLoadedUsers] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/users`
				);

				setLoadedUsers(responseData.users);
			} catch (err) {
				enqueueSnackbar("Failed to Fetch Users: " + err.message, {
					variant: "error",
				});
			}
		};
		fetchUsers();
	}, [sendRequest]);

	return (
		<React.Fragment>
			{loadedUsers && (
				<UserDialog>
					<UserList loadedUsers={loadedUsers} />
				</UserDialog>
			)}
		</React.Fragment>
	);
};

export default Users;
