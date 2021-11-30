const colors = require('tailwindcss/colors')

module.exports = {
    purge: ["./src/**/*.html", "./src/**/*.tsx", "./src/**/*.ts"],
    theme: {
        extend: {
            borderRadius: {
                button: "8px",
            },
            scale: {
                down: ".99",
                up: "1.01",
            },
            colors: {
                red: colors.red,
            },
            boxShadow: {
                button: "0 3px 25px 0 rgba(0, 0, 0, 0.3)",
                card: "0 3px 30px 0 rgba(0, 0, 0, 0.2)",
            },
        },
    },
    variants: {},
};
