/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Or if using `src` directory:
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        brush: ['var(--font-nanum-brush-script)'],
      },
      screens: {
        'r-sm': '375px',
        'r-md': '514px',
        'r-lg': '786px',
        'r-xl': '1080px',
      },
    },
  },
  plugins: [],
};
