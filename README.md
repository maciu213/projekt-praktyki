Tailwind config file: 

// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue}", // Adjust this path to match where your files are located
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#1E90FF',
        'secondary-color': '#0066CC',
        'bg-light': '#F4F4F4',
        'bg-dark': '#333333',
        'text-light': '#FFFFFF',
        'text-dark': '#333333',
      },
    },
  },
  plugins: [],
}
