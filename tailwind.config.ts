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
          sm: '1.25rem',
          md: '1.25rem',
          lg: '1.5rem',
          xl: '1.5rem',
          '2xl': '1.5rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1440px',
          '2xl': '1740px',
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
