// tailwind.config.js
import daisyui from "daisyui"

export default {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",  // Add your paths here
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#F5A623', // Example color for "light" theme
            DEFAULT: '#FF5722', // Default primary color for the selected theme
          },
          secondary: {
            light: '#F1C40F', // Example color for "light" theme
            DEFAULT: '#FF9800',
          },
          accent: {
            light: '#1ABC9C',
            DEFAULT: '#009688',
          },
          // Add more colors for each theme
          'base-100': {
            light: '#ffffff',
            DEFAULT: '#f5f5f5',
          },
          'base-200': {
            light: '#f0f0f0',
            DEFAULT: '#e0e0e0',
          },
          'base-content': {
            light: '#333333',
            DEFAULT: '#000000',
          },
        },
      },
    },
    plugins: [
      require("daisyui"),
    ],
  };
  