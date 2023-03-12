const dev = {
	baseURL: "https://api.skrillbot.com/api/",
	stripe: {
		monthly: "price_1MjBY1DTXsIy5WCeJiBynJRp",
		yearly: "price_1MkvdYDTXsIy5WCeqIrVH5OS"
	},
};

const prod = {
	baseURL: 'https://api.skrillbot.com/api/',
	stripe: {
		monthly: "price_1MjBY1DTXsIy5WCeJiBynJRp",
		yearly: "price_1MkvdYDTXsIy5WCeqIrVH5OS"
	},
};

const config = process.env.NODE_ENV === 'development'
	? dev
	: prod;

export default config;