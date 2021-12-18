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
                blueish1: "#a9d6e5",
                blueish2: "#89c2d9",
                blueish3: "#61a5c2",
                blueish4: "#468faf",
                blueish5: "#2c7da0",
                blueish6: "#2a6f97",
                blueish7: "#014f86",
                blueish8: "#01497c",
                blueish9: "#013a63",
                blueish10: "#012a4a",

                greenish1: "#d8f3dc",
                greenish2: "#b7e4c7",
                greenish3: "#95d5b2",
                greenish4: "#74c69d",
                greenish5: "#52b788",
                greenish6: "#40916c",
                greenish7: "#2d6a4f",
                greenish8: "#1b4332",
                greenish9: "#081c15",
            },
            fontFamily:{
                inter: "'Inter', sans-serif",
            },
        },

    },
    plugins: [
            require('@tailwindcss/aspect-ratio'),
            require('daisyui'),
            require('@tailwindcss/forms'),
            require('tailwind-scrollbar'),
            require('@themesberg/flowbite/plugin'),
            require('@themesberg/flowbite/plugin')


        ],
        variants: {
            scrollbar: ['rounded']
        }
}