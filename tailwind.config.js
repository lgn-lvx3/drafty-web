module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{tsx,ts}",
		"node_modules/daisyui/dist/**/*.js",
		"node_modules/react-daisyui/dist/**/*.js",
	],
	theme: {
		extend: {
			backgroundImage: {
				sm: "url('./assets/img/bg-sm.png')",
				md: "url('./assets/img/bg-md.png')",
			},
		},
	},
	plugins: [require("daisyui")],
};
