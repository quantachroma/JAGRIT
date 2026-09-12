import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        pine: "#044728",
        royal: "#4F46E5",
        card: "#FFFFFF",
        edge: "#E2E8F0"
      }
    }
  },
  plugins: []
};
export default config;
