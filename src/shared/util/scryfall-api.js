const axios = require("axios");

async function fetchNewCards() {
	var cards = {
		method: "GET",
		url: `https://api.scryfall.com/cards/search?q=year%3E%3D2021+include%3Aextras+unique%3Aprints&order=spoiled&as=grid&unique=prints`,
	};

	const response = await axios.request(cards);

	const data = response.data;

	if (!data || data.status === "ZERO_RESULTS") {
		const error = {
			message: "Could not find location for the specified address.",
			code: 422,
		};
		throw error;
	}

	return data;
}

exports.fetchNewCards = fetchNewCards;
