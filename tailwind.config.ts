import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0b",
        panel: "#151417",
        wine: "#7e2637",
        mist: "#e8c9d0",
      },
      boxShadow: { hush: "0 18px 55px rgba(0, 0, 0, .38)" },
    },
  },
  plugins: [],
};

export default config;
