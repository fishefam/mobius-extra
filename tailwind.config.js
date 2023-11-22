import flowbite from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,ts,svelte}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
  ],
  plugins: [flowbite()],
  theme: {
    extend: {},
  },
}
