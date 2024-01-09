/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './node_modules/flowbite/**/*.js',
    './index.html',
    './src/pages/**/*.{vue,html,js}',
    './src/views/**/*.{vue,html,js}',
    './src/components/**/*.{vue,html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    import('flowbite/plugin'),
  ],
}

