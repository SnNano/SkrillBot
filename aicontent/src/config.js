const dev = {
	baseURL: "http://localhost:5000/api/",
	landingPageUrl: "http://localhost:3000",
	stripe: {
		monthly: "price_1Melj7HqMMxYnnotTiUydIMv",
		yearly: "price_1Meln5HqMMxYnnot5mVs0xKv"
	},
};
  
const prod = {
	baseURL: '/api/',
	landingPageUrl: "https://app.openaitemplate.com",
	stripe: {
		monthly: "price_1Melj7HqMMxYnnotTiUydIMv",
		yearly: "price_1Meln5HqMMxYnnot5mVs0xKv"
	},
};
  
const config = process.env.NODE_ENV === 'development'
	? dev
	: prod;
  
export default config;