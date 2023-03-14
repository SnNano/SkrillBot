const dev = {
	baseURL: "http://localhost:5000/api/",
	stripe: {
		monthly: "price_1MkybFDTXsIy5WCekelXeRiA",
		yearly: "price_1MkybFDTXsIy5WCew4FbegDc"
	},
};

const prod = {
	baseURL: 'https://api.skrillbot.com/api/',
	stripe: {
		monthly: "price_1MkybFDTXsIy5WCekelXeRiA",
		yearly: "price_1MkybFDTXsIy5WCew4FbegDc"
	},
};

const config = process.env.NODE_ENV === 'development'
	? dev
	: prod;

export default config;