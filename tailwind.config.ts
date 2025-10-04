import type {Config} from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default {
    content: [
        //
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['var(--font-serif)', 'serif'],
            },
            colors: {
                g: colors.stone,
                line: {
                    DEFAULT: colors.stone[200],
                    dark: colors.stone[800],
                },
                layer: {
                    0: {
                        DEFAULT: colors.stone[100],
                        dark: colors.stone[950],
                    },
                    1: {
                        DEFAULT: colors.white,
                        dark: colors.stone[900],
                    },
                },
                olive: '#292718',
                cream: '#F4F1DE',
            },
            keyframes: {
                blink: {
                    '0%, 100%': {opacity: '1'},
                    '50%': {opacity: '0'},
                },
            },
            animation: {
                blink: 'blink 1s infinite',
            },
        },
    },
    plugins: [],
} satisfies Config
