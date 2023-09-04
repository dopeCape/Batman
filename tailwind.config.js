/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'dark': '#1B1D21', 
        'grey': '#A7A7A7',
        'grey2': '#7D818B',
        'grey3': '#A8AAB0',
        'grey4': '#DFDFDF',
        'grey5': '#4E4E4E',
        'grey6': '#3E4045', 
        // 'blue': '#3247CF',
        'bleach-red': "rgba(255, 199, 194, 0.5)",
      },
      spacing: {
        '4px': '4px',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
