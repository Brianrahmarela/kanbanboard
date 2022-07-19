/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			colors: {
				background: "#f3f3f3",
				basic: "#039bab",
				light: "#cfebed",
				navdis: "#62d0db"
			}
		}
	},
	plugins: []
};
