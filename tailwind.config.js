/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",],
    theme: {
        extend: {
            colors: {
                'white': '#FFFFFF',
                'gray': {
                    100: '#f7fafc',
                    200: '#edf2f7',
                    800: '#2d3748',
                },
                'calender-border': '#a0a096'
            },
            flexGrow: {
                2: '2',
                3: '3',
                5: '5',
                6: '6',
                7: '7',
            },
        },
    },
    plugins: [
        // eslint-disable-next-line no-undef
        require("tailwind-scrollbar-hide")
    ],
}

