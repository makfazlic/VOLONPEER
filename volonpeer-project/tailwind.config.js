module.exports = {
    content: [
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        screens: {
            'sm': '440px',
            // => @media (min-width: 640px) { ... }

            'md': '576px',
            // => @media (min-width: 768px) { ... }

            'lg': '768px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1025px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1680px',
            // => @media (min-width: 1536px) { ... }
        },

        extend: {
            colors: {
                blueish1: "#8ECAE6",
                blueish2: "#219EBC",
                blueish3: "#023047",
                yellowish: "#FFB703",
                orangeish: "#FB8500"
            },
            fontFamily:{
                inter: "'Inter', sans-serif",
            },
        },

    },
    plugins: [
            require('@tailwindcss/aspect-ratio'),
            require('daisyui'),
        ],
}