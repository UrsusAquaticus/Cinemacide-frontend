import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
	//Must change in App.js as well.
	const [token, setToken] = useState(false);
	const [tokenExpDate, setTokenExpDate] = useState();
	const [userId, setUserId] = useState(false);
	const [name, setName] = useState(false);
	const [image, setImage] = useState(false);

	const login = useCallback((uid, _name, _image, _token, expDate) => {
		setUserId(uid);
		setName(_name);
		setImage(_image);
		setToken(_token);
		const tokenExpDate =
			expDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
		setTokenExpDate(tokenExpDate);
		localStorage.setItem(
			"userData",
			JSON.stringify({
				userId: uid,
				name: _name,
				image: _image,
				token: _token,
				expiration: tokenExpDate.toISOString(),
			})
		);
	}, []);

	const logout = useCallback(() => {
		setUserId(null);
		setName(null);
		setImage(null);
		setToken(null);
		setTokenExpDate(null);
		localStorage.removeItem("userData");
	}, []);

	useEffect(() => {
		if (token && tokenExpDate) {
			const remainingTime = tokenExpDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpDate]);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("userData"));
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			login(
				storedData.userId,
				storedData.name,
				storedData.image,
				storedData.token,
				new Date(storedData.expiration)
			);
		}
	}, [login]);

	return { token, login, logout, userId, name, image };
};
