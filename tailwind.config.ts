import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '0.75rem',
          sm: '1rem',
          md: '1.25rem',
          lg: '1.5rem',
          xl: '1.5rem',
          '2xl': '1.5rem',
        },
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '2200px',
          '2xl': '2400px',
        },
      },
      colors: {
        dalaman: {
          blue: "hsl(var(--dalaman-blue) / <alpha-value>)",
          dark: "hsl(var(--dalaman-dark) / <alpha-value>)",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config; 