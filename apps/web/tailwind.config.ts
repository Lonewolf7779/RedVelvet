import type { Config } from "tailwindcss";
import redVelvetPreset from "../../packages/ui/src/tailwind-preset";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [redVelvetPreset as unknown as Config],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
