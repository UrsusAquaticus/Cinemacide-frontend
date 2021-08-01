import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import UserDialog from "../components/UserDialog";
import UserList from "../components/UserList";
import HoardSelectDialog from "../../shared/components/hoards/HoardSelectDialog";
import HoardCreateDialog from "../../shared/components/hoards/HoardCreateDialog";

import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
	const [loadedUsers, setLoadedUsers] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/users`
				);

				setLoadedUsers(responseData.users);
			} catch (err) {}
		};
		fetchUsers();
	}, [sendRequest]);

	return (
		<React.Fragment>
			{isLoading && !loadedUsers && <CircularProgress />}
			{loadedUsers && (
				<HoardCreateDialog>
					<HoardSelectDialog>
						<UserDialog>
							<UserList loadedUsers={loadedUsers} />
						</UserDialog>
					</HoardSelectDialog>
				</HoardCreateDialog>
			)}
		</React.Fragment>
	);
};

export default Users;
